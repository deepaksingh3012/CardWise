# CardWise — Credit Card Offers Agent

## Project Overview

CardWise is a web application that helps users discover and optimize credit card offers in the Indian market. Users manage their personal credit card portfolio through a UI, and the agent searches the web (via Gemini API) to find active offers, ranking them by estimated rupee value.

## Tech Stack

- **Backend**: Python (Flask or FastAPI)
- **Frontend**: Web UI (served by Python backend) — reuse and modernize the existing HTML/JS design
- **AI/Search**: Gemini API (2.0 Flash or newer) with Google Search grounding for real-time offer discovery
- **Future**: Migrate to Claude API when ready

## Core Features

### 1. Portfolio Management (UI-based)
- Users can add/remove credit cards from their portfolio via the UI
- Each card entry includes: card name, issuer (HDFC, Axis, ICICI, SBI, etc.), card variant
- Portfolio persists in the session (later: localStorage or backend persistence)
- Default cards (pre-loaded):
  - HDFC Diners Club Privilege
  - HDFC Swiggy Credit Card
  - HDFC Tata Neu Infinity
  - Axis Neo RuPay Credit Card
  - Axis MyZone Credit Card
  - ICICI Sapphiro Credit Card

### 2. Offer Discovery
- Category-based search filters:
  - All Offers (maximum value)
  - Travel, Lounge & Hotels
  - Dining & Food Delivery
  - Shopping & E-commerce
  - UPI & Bill Payments
  - Milestone & Renewal Bonuses
  - Custom Query
- Agent uses Gemini API with Google Search grounding to find current, active offers
- Only returns offers for cards in the user's portfolio

### 3. Offer Display (Web UI)
- Summary bar: total offers, combined estimated value, best single offer, easy wins count
- Offer cards with:
  - Card name & issuer
  - Offer title and description
  - Estimated rupee value (with point conversion: HDFC ≈ ₹0.50/point, Axis EDGE ≈ ₹0.20, ICICI ≈ ₹0.25)
  - Offer type badge (Travel, Dining, Shopping, Cashback, Milestone, UPI, Entertainment)
  - Effort level (Low/Medium/High)
  - Expiration date
  - Activation required flag
  - Step-by-step claim instructions
  - Source links (bank pages, CardInsider, Deal4Loans, etc.)

## Project Structure (Planned)

```
Agent_CardWise/
├── CLAUDE.md
├── app.py                 # Python backend (Flask/FastAPI)
├── config.py              # Configuration, API keys, constants
├── agents/
│   ├── __init__.py
│   └── gemini_agent.py   # Gemini API integration & search logic
├── models/
│   ├── __init__.py
│   ├── card.py           # Credit card data model
│   └── offer.py          # Offer data model
├── static/
│   ├── index.html        # Main UI (evolved from credit-card-offers-agent-gemini.html)
│   ├── style.css         # Styles (newspaper-style design)
│   └── app.js            # Frontend JS logic
├── templates/             # If using Flask
│   └── index.html
├── requirements.txt       # Python dependencies
└── .env.example          # Environment variable template
```

## Key Design Decisions

- **Gemini API**: Used for now via `google-generativeai` Python SDK with `tools: [{google_search: {}}]` for real-time web search
- **Offer Value Estimation**: Agent converts reward points to rupee values using card-specific conversion rates
- **JSON-Only Response**: Gemini is prompted to return structured JSON (no markdown) for easy parsing
- **Point Conversion Rates**:
  - HDFC reward points: ₹0.50 per point
  - Axis EDGE points: ₹0.20 per point
  - ICICI reward points: ₹0.25 per point

## API Integration Notes

### Gemini API Setup
- Users provide their API key via UI or environment variable
- Get free key at: https://aistudio.google.com/app/apikey
- Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
- Uses `google_search` tool for grounding

### System Prompt Structure
The Gemini system prompt includes:
1. User's current portfolio (dynamic, based on UI)
2. Search instructions for current/active offers
3. Value estimation rules
4. JSON response format specification

## Current State

- `credit-card-offers-agent-gemini.html` — single-file prototype with hardcoded API key (line 640), static portfolio, and Gemini integration
- Needs refactoring into proper Python + HTML/CSS/JS structure
- API key is currently hardcoded — must be moved to env var or UI input

## Development Guidelines

- Keep the newspaper-style aesthetic (Playfair Display + Space Mono fonts, cream/ink color scheme)
- Maintain responsive design (mobile-friendly)
- Never hardcode API keys in source files
- Validate Gemini JSON responses before rendering
- Handle API errors gracefully with user-friendly messages
- Preserve the ticker animation and progress bar loading states from the prototype
