import { Card, Offer, CategoryInfo, Category, User } from '@/types';

// Mock Cards Data
export const mockCards: Card[] = [
  {
    id: '1',
    bank: 'HDFC',
    name: 'Regalia',
    type: 'credit',
    rewards: {
      dining: 5,
      shopping: 2,
      travel: 4,
      fuel: 1,
    },
  },
  {
    id: '2',
    bank: 'Axis',
    name: 'Ace',
    type: 'credit',
    rewards: {
      dining: 4,
      shopping: 5,
      travel: 2,
      fuel: 3,
    },
  },
  {
    id: '3',
    bank: 'ICICI',
    name: 'Amazon Pay',
    type: 'credit',
    rewards: {
      dining: 2,
      shopping: 4,
      travel: 1,
      fuel: 2,
    },
  },
];

// Mock Offers Data
export const mockOffers: Offer[] = [
  {
    id: '1',
    merchant: 'Swiggy',
    discount: '20% OFF',
    eligibleCards: ['1'],
    expiry: '2025-05-31',
    category: 'food',
    recommendedCard: '1',
  },
  {
    id: '2',
    merchant: 'Zomato',
    discount: '₹150 OFF',
    eligibleCards: ['2'],
    expiry: '2025-06-15',
    category: 'food',
    recommendedCard: '2',
  },
  {
    id: '3',
    merchant: 'Amazon',
    discount: '10% Cashback',
    eligibleCards: ['3'],
    expiry: '2025-05-20',
    category: 'shopping',
    recommendedCard: '3',
  },
  {
    id: '4',
    merchant: 'Myntra',
    discount: '15% OFF',
    eligibleCards: ['2'],
    expiry: '2025-06-01',
    category: 'shopping',
    recommendedCard: '2',
  },
  {
    id: '5',
    merchant: 'MakeMyTrip',
    discount: '₹2000 OFF',
    eligibleCards: ['1'],
    expiry: '2025-07-31',
    category: 'travel',
    recommendedCard: '1',
  },
  {
    id: '6',
    merchant: 'HP Petrol',
    discount: '1% Cashback',
    eligibleCards: ['2'],
    expiry: '2025-12-31',
    category: 'fuel',
    recommendedCard: '2',
  },
];

// Category Information
export const categories: CategoryInfo[] = [
  {
    id: 'food',
    name: 'Food',
    icon: '🍔',
    color: '#FF6B6B',
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: '🛒',
    color: '#4ECDC4',
  },
  {
    id: 'travel',
    name: 'Travel',
    icon: '✈️',
    color: '#45B7D1',
  },
  {
    id: 'fuel',
    name: 'Fuel',
    icon: '⛽',
    color: '#96CEB4',
  },
];

// Bank Options
export const banks = ['HDFC', 'Axis', 'ICICI', 'SBI', 'Kotak', 'HSBC'];

// Card Options by Bank
export const cardsByBank: Record<string, string[]> = {
  HDFC: ['Regalia', 'Infinia', 'Millennia', 'Titanium'],
  Axis: ['Ace', 'Flipkart', 'My Zone', 'Burgundy'],
  ICICI: ['Amazon Pay', 'Coral', 'Rubyx', 'Emerald'],
  SBI: ['SimplyClick', 'Elite', 'Prime', 'Contactless'],
  Kotak: ['811', 'PVR', 'Insignia', 'Royal'],
  HSBC: ['Premier', 'SmartValue', 'Advance', 'Platinum'],
};

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    phone: '+91 98765 43210',
    avatar: '👨‍💼',
    cards: ['1', '2'], // HDFC Regalia and Axis Ace
    preferences: {
      notifications: true,
      emailUpdates: true,
    },
    createdAt: '2024-01-15',
  },
  {
    id: 'user2',
    name: 'Priya Patel',
    email: 'priya@example.com',
    phone: '+91 98765 43211',
    avatar: '👩‍💼',
    cards: ['3'], // ICICI Amazon Pay
    preferences: {
      notifications: true,
      emailUpdates: false,
    },
    createdAt: '2024-02-20',
  },
];

// Demo user for login
export const demoUser = mockUsers[0];