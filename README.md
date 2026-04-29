# CardSense - Smart Credit Card Recommendations

A modern fintech mobile web application that helps users discover credit card offers and get instant recommendations on which card to use for different purchase categories. Now with **user authentication** and **personalized recommendations**!

![CardSense](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎯 Features

### Core Features
- **🔐 User Authentication**: Secure login and signup with persistent sessions
- **👤 Personalized Recommendations**: AI-powered suggestions based on your cards
- **🎯 Category-Based**: Get recommendations for Food, Shopping, Travel, and Fuel
- **🎁 Offer Discovery**: Find the best offers for your specific cards
- **📱 Mobile-First**: Optimized for mobile devices with touch-friendly interface
- **🧠 Zero Thinking Required**: Clear, actionable recommendations
- **🔒 Trust & Security**: No sensitive data collection required

### Personalization Features
- **👋 Personalized Greetings**: Welcome messages with user's name
- **💳 Your Cards Only**: See recommendations only for cards you own
- **📊 User Dashboard**: View your profile and card collection
- **🔔 Smart Notifications**: Get alerts for relevant offers
- **🎯 Tailored Offers**: Offers filtered to match your card portfolio

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd CardWise

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials

For testing purposes, use these credentials:

**Login:**
- Email: `rahul@example.com`
- Password: `demo123`

**Or signup with any email and password `demo123`**

## 📱 Screens

### Authentication Screens
- **Login Page** (`/login`)
  - Email and password authentication
  - Form validation and error handling
  - Remember me functionality
  - Link to signup page

- **Signup Page** (`/signup`)
  - Name, email, phone, and password fields
  - Real-time validation
  - User profile creation
  - Automatic login after signup

### Main Application Screens
- **Homepage** (`/`)
  - Personalized greeting with user's name
  - Category selection chips
  - Featured offers filtered for user's cards
  - Add cards call-to-action
  - User profile quick access

- **User Profile** (`/profile`)
  - User information display
  - Card collection overview
  - Preferences management
  - Account settings
  - Logout functionality

- **Add Card Flow** (`/add-card`)
  - Bank selection dropdown
  - Multi-card selection
  - Trust and security messaging
  - Card addition to user profile

- **Category Pages** (`/category/[category]`)
  - Best card recommendation from user's cards
  - Backup card options from user's collection
  - Category-specific offers for user's cards
  - "Why this card?" explanations

- **Offer Details** (`/offer/[offer]`)
  - Offer information and expiry
  - Recommended card from user's collection
  - All eligible cards from user's portfolio
  - "Go to merchant" action

## 🎨 Design System

### Colors
- **Primary**: #2156F3 (Blue)
- **Background**: #F5F7FA (Light gray)
- **Text**: #1A1A1A (Dark gray)
- **Success**: #10B981 (Green)

### Typography
- **Font**: Inter
- **Sizes**: 12px - 30px
- **Weights**: 400 - 700

### Spacing
- 8pt grid system
- Consistent padding and margins

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API + Hooks
- **Authentication**: Custom Auth Context
- **Icons**: Inline SVG
- **Storage**: LocalStorage for session persistence

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Homepage (personalized)
│   ├── layout.tsx           # Root layout with providers
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── profile/             # User profile page
│   ├── add-card/            # Add card flow
│   ├── category/[category]/ # Category recommendations
│   └── offer/[offer]/       # Offer details
├── components/
│   ├── Providers.tsx        # App providers (AuthContext)
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx       # Button component
│   │   ├── Card.tsx         # Card component
│   │   ├── Header.tsx       # Header component
│   │   └── Input.tsx        # Input component (new)
│   └── features/            # Feature-specific components
│       ├── CategoryChip.tsx # Category selection
│       ├── OfferCard.tsx    # Offer display
│       └── RecommendationCard.tsx # Card recommendations
├── contexts/
│   └── AuthContext.tsx      # Authentication context
├── lib/
│   ├── design-system.ts     # Design tokens
│   └── mock-data.ts         # Mock data (users, cards, offers)
└── types/
    ├── index.ts             # Main types
    └── user.ts              # User authentication types
```

## 🧩 Components

### UI Components
- **Button**: Primary, secondary, outline, and ghost variants
- **Card**: Default, highlighted, and success variants
- **Header**: With back button and subtitle support
- **Input**: Form input with validation support

### Feature Components
- **CategoryChip**: Category selection with icons
- **OfferCard**: Offer display with merchant info
- **RecommendationCard**: Card recommendation with rewards

### Context & Providers
- **AuthProvider**: Authentication state management
- **Providers**: Root provider wrapper

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Development Workflow

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make your changes**
   - Edit components in `src/components/`
   - Add pages in `src/app/`
   - Update types in `src/types/`
   - Modify context in `src/contexts/`

3. **Test your changes**
   ```bash
   npm run dev
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Add your feature"
   git push origin feature/your-feature
   ```

## 📚 Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Complete architecture and development guide
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Detailed implementation overview
- **[COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md)** - Component usage guide
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Setup and development instructions
- **[PROJECT_COMPLETE.md](./PROJECT_COMPLETE.md)** - Project completion summary

## 🎯 Key Features

### Smart Recommendations
- Algorithm-based card sorting by reward rates
- Personalized to user's card collection
- Clear "Best card" highlighting
- Backup options for flexibility

### User Authentication
- Secure login and signup flows
- Persistent sessions with localStorage
- User profile management
- Card collection tracking

### Offer Discovery
- Category-specific offer matching
- Personalized to user's cards
- Expiry date tracking
- Merchant integration ready

### User Experience
- Zero thinking required
- Clear action items
- Trust and security focused
- Personalized content

## 🔐 Security

- No sensitive data collection
- Clear privacy messaging
- Secure card handling
- Transparent data usage
- Local storage for session management
- Password validation

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=your_api_url
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by modern fintech apps like CRED and Google Pay
- Built with Next.js and React
- Styled with Tailwind CSS
- Authentication powered by React Context API

## 📞 Support

For questions or support:
- Check the documentation in the project root
- Review the component reference guide
- Open an issue on GitHub

## 🔄 Recent Updates

### v2.0 - Authentication & Personalization
- ✅ Added user authentication (login/signup)
- ✅ Implemented personalized recommendations
- ✅ Created user profile page
- ✅ Added user context and state management
- ✅ Updated all pages to use user data
- ✅ Enhanced offer filtering based on user's cards
- ✅ Added persistent sessions with localStorage

---

**Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS**