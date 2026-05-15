"""Offer data model."""

from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class Offer:
    """Represents a credit card offer."""
    rank: int
    card: str
    offer_name: str
    offer_type: str
    description: str
    value_estimate: float
    expiration: str
    activation_required: bool = False
    effort_level: str = 'Medium'
    action_steps: List[str] = field(default_factory=list)

    @classmethod
    def from_dict(cls, data: dict) -> 'Offer':
        """Create an Offer from a dictionary."""
        return cls(
            rank=data.get('rank', 0),
            card=data.get('card', ''),
            offer_name=data.get('offer_name', ''),
            offer_type=data.get('offer_type', ''),
            description=data.get('description', ''),
            value_estimate=float(data.get('value_estimate', 0)),
            expiration=data.get('expiration', 'Ongoing'),
            activation_required=data.get('activation_required', False),
            effort_level=data.get('effort_level', 'Medium'),
            action_steps=data.get('action_steps', []),
        )

    def to_dict(self) -> dict:
        return {
            'rank': self.rank,
            'card': self.card,
            'offer_name': self.offer_name,
            'offer_type': self.offer_type,
            'description': self.description,
            'value_estimate': self.value_estimate,
            'expiration': self.expiration,
            'activation_required': self.activation_required,
            'effort_level': self.effort_level,
            'action_steps': self.action_steps,
        }
