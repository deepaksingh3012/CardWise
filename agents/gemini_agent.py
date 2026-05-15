"""Gemini API agent for credit card offer discovery using REST API."""

import json
import re
import requests

from config import (
    GEMINI_API_KEY,
    GEMINI_MODEL,
    GEMINI_TEMPERATURE,
    GEMINI_MAX_TOKENS,
    POINT_VALUES,
    CATEGORY_QUERIES,
)

class GeminiAgent:
    """Agent that uses Gemini REST API to find credit card offers."""

    def __init__(self, api_key: str = None):
        self.api_key = api_key or GEMINI_API_KEY
        if not self.api_key:
            raise ValueError("Gemini API key is required. Set GEMINI_API_KEY in .env")
        
        # Base URL for the Google AI Gemini API
        self.url = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent?key={self.api_key}"

    def build_system_prompt(self, portfolio_cards: list) -> str:
        """Build the system prompt with the user's portfolio."""
        portfolio_text = '\n'.join(
            f"{i+1}. {card}" for i, card in enumerate(portfolio_cards)
        )
        point_rates = '\n'.join(
            f"- {issuer} reward points ≈ ₹{rate}/point"
            for issuer, rate in POINT_VALUES.items()
        )

        return f"""You are an expert credit card benefits optimizer for the Indian market.

USER PORTFOLIO:
{portfolio_text}

YOUR TASK:
Find CURRENT, ACTIVE offers and promotions for each of these exact cards as of today. 
Focus on:
- Milestone bonuses, multipliers (10X, 5X), Travel, Dining, and Shopping portal bonuses.

RULES:
1. Only include offers for cards listed above.
2. Estimate rupee value using these rates:
{point_rates}
3. RESPONSE FORMAT — return ONLY valid JSON, no markdown, no preamble:
{{
  "generated_at": "ISO date string",
  "total_estimated_value": <number>,
  "offers": [
    {{
      "rank": <number>,
      "card": "<exact card name>",
      "offer_name": "<short punchy title>",
      "offer_type": "<Travel|Dining|Shopping|Cashback|Milestone>",
      "description": "<specific description>",
      "value_estimate": <number>,
      "expiration": "<date>",
      "activation_required": <true|false>,
      "effort_level": "<Low|Medium|High>",
      "action_steps": ["step 1"]
    }}
  ],
  "sources": ["url"]
}}"""

    def search_offers(self, portfolio_cards: list, category: str = 'all',
                      custom_query: str = '') -> dict:
        """Search for offers using direct HTTP POST requests."""
        if not portfolio_cards:
            return {'error': 'No cards in portfolio'}

        system_prompt = self.build_system_prompt(portfolio_cards)
        user_query = custom_query if category == 'custom' and custom_query else CATEGORY_QUERIES.get(category, CATEGORY_QUERIES['all'])

        # Construct the payload for the REST API
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": f"System Instructions: {system_prompt}"},
                        {"text": f"User Request: {user_query}"}
                    ]
                }
            ],
            "generationConfig": {
                "temperature": GEMINI_TEMPERATURE,
                "maxOutputTokens": GEMINI_MAX_TOKENS,
                "responseMimeType": "application/json" # Forces JSON output if supported by model
            }
        }

        # Uncomment if you have access to Google Search Tool via API
        # payload["tools"] = [{"google_search_retrieval": {}}]

        try:
            response = requests.post(
                self.url,
                headers={'Content-Type': 'application/json'},
                data=json.dumps(payload)
            )
            response.raise_for_status()
            res_json = response.json()
            print("\n==RES=====\n",res_json,"\n========\n") 
            #res_json='''({'candidates': [{'content': {'parts': [{'text': '{\n  "generated_at": "2024-06-14T00:00:00Z",\n  "total_estimated_value": 240900,\n  "offers": [\n    {\n      "rank": 1,\n      "card": "HDFC Diners Club Privilege",\n      "offer_name": "SmartBuy 10X Reward Points",\n      "offer_type": "Travel",\n      "description": "Earn 10X Reward Points (equivalent to 13.3% back) on spends via HDFC Bank SmartBuy portal for Flights, Hotels, Bus, Train, and Instant Vouchers.'}], 'role': 'model'}, 'finishReason': 'MAX_TOKENS', 'index': 0}], 'usageMetadata': {'promptTokenCount': 447, 'candidatesTokenCount': 151, 'totalTokenCount': 4528, 'promptTokensDetails': [{'modality': 'TEXT', 'tokenCount': 447}], 'thoughtsTokenCount': 3930, 'serviceTier': 'standard'}, 'modelVersion': 'gemini-2.5-flash', 'responseId': '_9QBariMCJmcjuMPgsXc8Qw'})'''
            # Navigate the response structure: candidates -> content -> parts -> text
            raw_text = res_json['candidates'][0]['content']['parts'][0]['text']

            # Clean markdown if the model still includes it despite the prompt
            raw_text = re.sub(r'```json\s*', '', raw_text, flags=re.IGNORECASE)
            raw_text = re.sub(r'```\s*', '', raw_text).strip()
            print("\n ==RAW=====\n",raw_text,"\n ========\n")
            return json.loads(raw_text)

        except requests.exceptions.RequestException as e:         
            return {'error': f'HTTP Request failed: {str(e)}'}
        except (KeyError, IndexError) as e:
            return {'error': f'Unexpected API response structure: {str(e)}'}
        except json.JSONDecodeError as e:
            return {'error': f'Failed to parse JSON response: {str(e)}'}
        except Exception as e:
            return {'error': str(e)}