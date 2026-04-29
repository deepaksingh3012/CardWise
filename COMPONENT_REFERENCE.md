# CardSense - Component Quick Reference

## 🎯 UI Components

### Button
**Location**: `src/components/ui/Button.tsx`

**Usage**:
```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="md" fullWidth onClick={handleClick}>
  Click me
</Button>
```

**Props**:
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `onClick`: function
- `disabled`: boolean

### Card
**Location**: `src/components/ui/Card.tsx`

**Usage**:
```tsx
import { Card } from '@/components/ui/Card';

<Card variant="highlighted" onClick={handleClick}>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

**Props**:
- `variant`: 'default' | 'highlighted' | 'success'
- `onClick`: function
- `children`: ReactNode
- `className`: string

### Header
**Location**: `src/components/ui/Header.tsx`

**Usage**:
```tsx
import { Header } from '@/components/ui/Header';

<Header
  title="Page Title"
  subtitle="Optional subtitle"
  showBackButton
  onBackClick={() => router.back()}
/>
```

**Props**:
- `title`: string
- `subtitle`: string (optional)
- `showBackButton`: boolean
- `onBackClick`: function

## 🎯 Feature Components

### CategoryChip
**Location**: `src/components/features/CategoryChip.tsx`

**Usage**:
```tsx
import { CategoryChip } from '@/components/features/CategoryChip';

<CategoryChip
  category={categoryInfo}
  isSelected={selectedCategory === categoryInfo.id}
  onClick={() => handleCategoryClick(categoryInfo.id)}
/>
```

**Props**:
- `category`: CategoryInfo object
- `isSelected`: boolean
- `onClick`: function

### OfferCard
**Location**: `src/components/features/OfferCard.tsx`

**Usage**:
```tsx
import { OfferCard } from '@/components/features/OfferCard';

<OfferCard
  offer={offerData}
  onViewOffer={(offerId) => router.push(`/offer/${offerId}`)}
/>
```

**Props**:
- `offer`: Offer object
- `onViewOffer`: function(offerId: string)

### RecommendationCard
**Location**: `src/components/features/RecommendationCard.tsx`

**Usage**:
```tsx
import { RecommendationCard } from '@/components/features/RecommendationCard';

<RecommendationCard
  recommendation={{
    card: cardData,
    reason: 'Best rewards for dining',
    isBest: true
  }}
/>
```

**Props**:
- `recommendation`: CardRecommendation object

## 🎯 Pages

### Homepage
**Location**: `src/app/page.tsx`

**Features**:
- Category selection chips
- Featured offers display
- Add cards CTA

**Key Functions**:
- `handleCategoryClick(categoryId)`: Navigate to category page
- `handleViewOffer(offerId)`: Navigate to offer details
- `handleAddCards()`: Navigate to add card flow

### Add Card Page
**Location**: `src/app/add-card/page.tsx`

**Features**:
- Bank selection dropdown
- Multi-card selection
- Trust messaging

**Key Functions**:
- `handleCardToggle(cardName)`: Add/remove card from selection
- `handleSaveCards()`: Save selected cards

### Category Page
**Location**: `src/app/category/[category]/page.tsx`

**Features**:
- Best card recommendation
- Backup card options
- Category-specific offers

**Key Functions**:
- `getRecommendations()`: Sort cards by reward rate
- `getReasonForCard(card, category)`: Generate recommendation reason

### Offer Detail Page
**Location**: `src/app/offer/[offer]/page.tsx`

**Features**:
- Offer information display
- Recommended card highlighting
- Eligible cards listing

**Key Functions**:
- `handleGoToMerchant()`: Open merchant website

## 🎯 Data Structures

### Card
```typescript
interface Card {
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
```

### Offer
```typescript
interface Offer {
  id: string;
  merchant: string;
  discount: string;
  eligibleCards: string[];
  expiry: string;
  category: 'food' | 'shopping' | 'travel' | 'fuel';
  recommendedCard?: string;
}
```

### CategoryInfo
```typescript
interface CategoryInfo {
  id: Category;
  name: string;
  icon: string;
  color: string;
}
```

### CardRecommendation
```typescript
interface CardRecommendation {
  card: Card;
  reason: string;
  isBest: boolean;
}
```

## 🎯 Utility Functions

### Mock Data Access
```typescript
import { mockCards, mockOffers, categories, banks, cardsByBank } from '@/lib/mock-data';

// Get all cards
const allCards = mockCards;

// Get offers by category
const foodOffers = mockOffers.filter(o => o.category === 'food');

// Get category info
const foodCategory = categories.find(c => c.id === 'food');

// Get cards by bank
const hdfcCards = cardsByBank['HDFC'];
```

### Design System Tokens
```typescript
import { colors, typography, spacing, borderRadius, shadows } from '@/lib/design-system';

// Use in inline styles or Tailwind config
const primaryColor = colors.primary;
const headingFont = typography.fontSize.xl;
```

## 🎯 Routing Patterns

### Dynamic Routes
```typescript
// Category pages
router.push(`/category/${categoryId}`)

// Offer details
router.push(`/offer/${offerId}`)

// Back navigation
router.back()
```

### URL Parameters
```typescript
// In dynamic route pages
const params = useParams();
const categoryId = params.category as string;
const offerId = params.offer as string;
```

## 🎯 Common Patterns

### Loading States
```typescript
const [loading, setLoading] = useState(false);

const handleClick = async () => {
  setLoading(true);
  try {
    await someAsyncOperation();
  } finally {
    setLoading(false);
  }
};

<Button disabled={loading}>
  {loading ? 'Loading...' : 'Submit'}
</Button>
```

### Error Handling
```typescript
const [error, setError] = useState<string | null>(null);

const handleOperation = async () => {
  try {
    await someOperation();
  } catch (err) {
    setError('Something went wrong');
  }
};

{error && <div className="text-red-600">{error}</div>}
```

### Conditional Rendering
```typescript
{condition && (
  <Component />
)}

{condition ? (
  <ComponentA />
) : (
  <ComponentB />
)}

{items.map(item => (
  <Component key={item.id} item={item} />
))}
```

## 🎯 Styling Guidelines

### Tailwind Classes
```tsx
// Spacing
className="p-4 m-2 gap-3"

// Colors
className="bg-blue-500 text-white hover:bg-blue-600"

// Typography
className="text-lg font-bold text-gray-900"

// Layout
className="flex flex-col items-center justify-between"

// Borders
className="border-2 border-gray-200 rounded-xl"

// Shadows
className="shadow-md hover:shadow-lg"
```

### Responsive Design
```tsx
// Mobile-first approach
className="max-w-lg mx-auto px-4 py-6"

// Conditional classes
className={`base-classes ${condition ? 'conditional-classes' : ''}`}
```

This quick reference provides all the essential information needed to work with the CardSense codebase effectively!