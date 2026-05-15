"""Credit card data model."""

from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class CreditCard:
    """Represents a user's credit card."""
    name: str
    issuer: str
    variant: Optional[str] = None

    def __str__(self) -> str:
        return self.name

    @property
    def display_name(self) -> str:
        """Full display name for the card."""
        return self.name

    @classmethod
    def from_string(cls, card_string: str, issuer: str = None) -> 'CreditCard':
        """Create a CreditCard from a string name and issuer."""
        if issuer and not card_string.startswith(issuer):
            name = f"{issuer} {card_string}"
        else:
            name = card_string
        return cls(name=name, issuer=issuer or 'Other')

    def to_dict(self) -> dict:
        return {'name': self.name, 'issuer': self.issuer, 'variant': self.variant}
