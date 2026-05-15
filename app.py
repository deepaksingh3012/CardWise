"""CardWise Flask application."""

import os
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv

load_dotenv()

from config import (
    GEMINI_API_KEY, DEFAULT_CARDS, FLASK_PORT, FLASK_SECRET_KEY, load_portfolio, save_portfolio
)
from agents.gemini_agent import GeminiAgent

app = Flask(__name__)
app.secret_key = FLASK_SECRET_KEY





# ── Index ──
@app.route('/')
def index():
    """Serve the main page."""
    return render_template('index.html')


# ── Portfolio Management (persistent) ──
def _get_portfolio() -> list:
    """Load persisted portfolio list."""
    return load_portfolio()


def _set_portfolio(cards: list):
    """Save portfolio list persistently."""
    save_portfolio(cards)

@app.route('/api/portfolio', methods=['GET'])
def get_portfolio():
    """Get current portfolio cards."""
    cards = _get_portfolio()
    return jsonify({'cards': cards, 'count': len(cards)})


@app.route('/api/portfolio', methods=['POST'])
def add_card():
    """Add a card to the portfolio."""
    
    data = request.get_json()
    card_name = data.get('name', '').strip()
    issuer = data.get('issuer', 'Other').strip()

    if not card_name:
        return jsonify({'error': 'Card name is required'}), 400

    full_name = card_name if card_name.startswith(issuer) else f"{issuer} {card_name}"

    portfolio = _get_portfolio()
    if full_name in portfolio:
        return jsonify({'error': 'Card already in portfolio'}), 400

    portfolio.append(full_name)
    _set_portfolio(portfolio)
    return jsonify({'cards': portfolio, 'count': len(portfolio)})


@app.route('/api/portfolio/<int:index>', methods=['DELETE'])
def remove_card(index):
    """Remove a card from the portfolio by index."""
    
    portfolio = _get_portfolio()
    if index < 0 or index >= len(portfolio):
        return jsonify({'error': 'Invalid card index'}), 400

    portfolio.pop(index)
    _set_portfolio(portfolio)
    return jsonify({'cards': portfolio, 'count': len(portfolio)})


@app.route('/api/portfolio/reset', methods=['POST'])
def reset_portfolio():
    """Reset portfolio to default cards."""
    
    _set_portfolio(list(DEFAULT_CARDS))
    portfolio = _get_portfolio()
    return jsonify({'cards': portfolio, 'count': len(portfolio)})


# ── Search ──
@app.route('/api/search', methods=['POST'])
def search_offers():
    """Search for offers using Gemini agent."""
    
    data = request.get_json()
    api_key = data.get('api_key', '').strip() or GEMINI_API_KEY
    category = data.get('category', 'all')
    custom_query = data.get('custom_query', '').strip()

    if not api_key:
        return jsonify({'error': 'Gemini API key is required'}), 400

    portfolio = _get_portfolio()
    if not portfolio:
        return jsonify({'error': 'No cards in portfolio'}), 400

    try:
        agent = GeminiAgent(api_key=api_key)
        results = agent.search_offers(portfolio, category, custom_query)

        if 'error' in results:
            return jsonify(results), 500

        return jsonify(results)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'portfolio_count': len(_get_portfolio()),
        'gemini_configured': bool(GEMINI_API_KEY),
        'logged_in': False
    })


if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', FLASK_PORT))
    app.run(debug=(os.getenv('FLASK_ENV') == 'development'), port=port)