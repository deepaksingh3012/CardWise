// Card types
export interface Card {
  id: string;
  bank: string;
  name: string;
  type: 'credit' | 'debit';
  rewards: {
    dining: number;
    shopping: number;
    travel: number;
    fuel: number;
  };
}

// Offer types
export interface Offer {
  id: string;
  merchant: string;
  discount: string;
  eligibleCards: string[];
  expiry: string;
  category: 'food' | 'shopping' | 'travel' | 'fuel';
  recommendedCard?: string;
}

// Category types
export type Category = 'food' | 'shopping' | 'travel' | 'fuel';

export interface CategoryInfo {
  id: Category;
  name: string;
  icon: string;
  color: string;
}

// Recommendation types
export interface CardRecommendation {
  card: Card;
  reason: string;
  isBest: boolean;
}

// Export user types
export * from './user';