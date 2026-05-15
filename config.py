import os
from dotenv import load_dotenv

load_dotenv()


# ── API Keys ──
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')

# ── Flask ──
FLASK_PORT = int(os.getenv('FLASK_PORT', 5000))
FLASK_ENV = os.getenv('FLASK_ENV', 'development')
FLASK_SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'dev-secret-key-change-in-production')

# ── Gemini Model ──
GEMINI_MODEL = 'gemini-2.5-flash'
GEMINI_TEMPERATURE = 0.2
GEMINI_MAX_TOKENS = 65536

# ── Point Conversion Rates (₹ per point) ──
POINT_VALUES = {
    'HDFC': 0.50,
    'Axis': 0.20,
    'ICICI': 0.25,
    'SBI': 0.20,
    'Kotak': 0.25,
    'Amex': 0.40,
    'Other': 0.25,
}

# ── Default Portfolio ──
DEFAULT_CARDS = [
    'HDFC Diners Club Privilege',
    'HDFC Swiggy Credit Card',
    'HDFC Tata Neu Infinity',
    'Axis Neo RuPay Credit Card',
    'Axis MyZone Credit Card',
    'ICICI Sapphiro Credit Card',
]

# ── Search Categories ──
CATEGORY_QUERIES = {
    'all':       'Find ALL current offers, promotions, and benefits across all cards. Rank by maximum rupee value.',
    'travel':    'Find travel-related offers: airport lounge access, flight discounts, hotel benefits, travel insurance for all cards.',
    'dining':    'Find dining and food delivery offers: Swiggy, Zomato, restaurant cashback, dining rewards across all cards.',
    'shopping':  'Find shopping offers: Amazon, Flipkart, SmartBuy portal bonuses, e-commerce cashback across all cards.',
    'upi':       'Find UPI and bill payment offers: especially RuPay UPI rewards, utility bill cashback across all cards.',
    'milestone': 'Find milestone bonuses, renewal benefits, annual fee waivers, and spend-based rewards across all cards.',
    'custom':    '',  # user-provided query
}

# ── Offer Types ──
OFFER_TYPES = ['Travel', 'Dining', 'Shopping', 'Cashback', 'Milestone', 'UPI', 'Entertainment']

# ── Effort Levels ──
EFFORT_LEVELS = ['Low', 'Medium', 'High']

# ── Persistence ──
# Portfolio is persisted to a JSON file across server restarts.
import json

PORTFOLIO_FILE = os.getenv('PORTFOLIO_FILE', 'portfolio.json')

def load_portfolio():
    """Load the persisted portfolio list. Returns DEFAULT_CARDS if file missing or invalid."""
    try:
        with open(PORTFOLIO_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            if isinstance(data, list):
                return data
    except Exception:
        pass
    return list(DEFAULT_CARDS)

def save_portfolio(cards: list):
    """Save the portfolio list to the JSON file."""
    try:
        with open(PORTFOLIO_FILE, 'w', encoding='utf-8') as f:
            json.dump(cards, f, ensure_ascii=False, indent=2)
    except Exception:
        pass