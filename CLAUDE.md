# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CardSense is a fintech mobile web application that helps users discover credit card offers and get recommendations on which card to use for different purchase categories. The app is built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Development Commands

### Start Development Server
```bash
npm run dev
```
Starts the Next.js development server on http://localhost:3000

### Build for Production
```bash
npm run build
```
Creates an optimized production build

### Start Production Server
```bash
npm start
```
Starts the production server (requires build first)

### Run Linter
```bash
npm run lint
```
Runs ESLint to check code quality

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **UI**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React hooks (useState, useRouter)
- **Icons**: Inline SVG icons

### Project Structure
```
src/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Homepage with categories and offers
│   ├── add-card/            # Add card flow
│   ├── category/[category]/ # Category-specific recommendations
│   └── offer/[offer]/       # Offer detail pages
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx       # Primary button component
│   │   ├── Card.tsx         # Card container component
│   │   └── Header.tsx       # Page header component
│   └── features/            # Feature-specific components
│       ├── CategoryChip.tsx # Category selection chips
│       ├── OfferCard.tsx    # Offer display card
│       └── RecommendationCard.tsx # Card recommendation display
├── lib/
│   ├── design-system.ts     # Design tokens (colors, typography, spacing)
│   └── mock-data.ts         # Mock data for cards, offers, categories
└── types/
    └── index.ts             # TypeScript type definitions
```

### Key Design Decisions

**Mobile-First Approach**: All components are designed for mobile screens with max-width containers and touch-friendly interactions.

**Component Hierarchy**: 
- UI components (Button, Card, Header) are generic and reusable
- Feature components (CategoryChip, OfferCard, RecommendationCard) contain business logic
- Pages orchestrate components and handle routing

**State Management**: Simple React state is used for local component state. No global state management is currently implemented.

**Data Flow**: Mock data is imported directly from `lib/mock-data.ts`. In production, this would be replaced with API calls.

**Routing**: Next.js App Router with dynamic routes for categories (`/category/[category]`) and offers (`/offer/[offer]`).

## Design System

### Colors
- Primary: #2156F3 (Blue)
- Background: #F5F7FA (Light gray)
- Text: #1A1A1A (Dark gray)
- Success: #10B981 (Green)

### Typography
- Font: Inter (via next/font/google)
- Sizes: 12px (xs) to 30px (3xl)
- Weights: 400 (normal) to 700 (bold)

### Spacing
- 8pt grid system (0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem, 4rem)

### Border Radius
- Small: 8px, Medium: 12px, Large: 16px, XL: 20px, 2XL: 24px

## Core Features

### Homepage
- Category selection chips (Food, Shopping, Travel, Fuel)
- Featured offers section
- Add cards CTA

### Add Card Flow
- Bank selection dropdown
- Multi-card selection with checkboxes
- Trust/security messaging

### Category Pages
- Best card recommendation (highlighted)
- Backup card options
- Category-specific offers
- "Why this card?" explanation

### Offer Details
- Offer information and expiry
- Recommended card with reasoning
- All eligible cards
- "Go to merchant" CTA

## Important UX Principles

1. **Decision Over Information**: Always show what the user should do first
2. **Zero Thinking Required**: Recommendations are clear and actionable
3. **Offer Priority**: If an offer exists, prioritize it over generic rewards
4. **Clear Explanations**: Every recommendation includes "Why this card?"
5. **Simple Interactions**: Avoid complex reward calculations in the UI

## Development Notes

### Adding New Features
1. Define types in `src/types/index.ts`
2. Add mock data to `src/lib/mock-data.ts`
3. Create reusable components in `src/components/`
4. Build pages in `src/app/`
5. Follow the existing component structure

### Styling Guidelines
- Use Tailwind utility classes
- Refer to design system tokens in `src/lib/design-system.ts`
- Maintain mobile-first responsive design
- Keep components under 200 lines when possible

### Testing
Currently no tests are implemented. When adding tests:
- Use React Testing Library for component tests
- Test user interactions and routing
- Mock API calls in test files

## Future Enhancements

- Backend API integration
- User authentication
- Real card data syncing
- Push notifications for new offers
- Analytics and tracking
- Offline support