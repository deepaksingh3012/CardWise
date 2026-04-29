# CardSense - Setup & Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git (optional)

### Installation Steps

1. **Navigate to the project directory**
   ```bash
   cd C:\Users\Deepak\Desktop\Applications\CardWise
   ```

2. **Install dependencies** (if not already done)
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to http://localhost:3000
   - The app will be running with hot reload enabled

## 📁 Project Structure

```
CardWise/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx             # Homepage
│   │   ├── layout.tsx           # Root layout
│   │   ├── globals.css          # Global styles
│   │   ├── add-card/            # Add card page
│   │   ├── category/            # Category pages
│   │   └── offer/               # Offer detail pages
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   └── features/            # Feature-specific components
│   ├── lib/
│   │   ├── design-system.ts     # Design tokens
│   │   └── mock-data.ts         # Mock data
│   └── types/
│       └── index.ts             # TypeScript types
├── public/                      # Static assets
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # Tailwind config
├── next.config.ts               # Next.js config
├── CLAUDE.md                    # Claude Code documentation
├── IMPLEMENTATION_SUMMARY.md    # Complete implementation details
└── COMPONENT_REFERENCE.md       # Component usage guide
```

## 🛠️ Development Commands

### Running the App
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Useful Commands
```bash
npm run dev -- --port 3001  # Run on different port
npm run build -- --debug    # Debug build
```

## 🎨 Customization Guide

### Changing Colors
Edit `src/lib/design-system.ts`:
```typescript
export const colors = {
  primary: '#2156F3',        // Change this
  // ... other colors
};
```

### Adding New Categories
Edit `src/lib/mock-data.ts`:
```typescript
export const categories: CategoryInfo[] = [
  // ... existing categories
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎬',
    color: '#FF6B9D',
  },
];
```

### Adding New Banks
Edit `src/lib/mock-data.ts`:
```typescript
export const banks = ['HDFC', 'Axis', /* ... */ 'YourBank'];

export const cardsByBank = {
  // ... existing banks
  'YourBank': ['Card1', 'Card2', 'Card3'],
};
```

## 🔧 Common Development Tasks

### Adding a New Page

1. **Create the page file**
   ```bash
   # For static route
   touch src/app/new-page/page.tsx

   # For dynamic route
   touch src/app/[dynamic]/page.tsx
   ```

2. **Add page content**
   ```tsx
   'use client';
   import React from 'react';
   import { Header } from '@/components/ui/Header';

   export default function NewPage() {
     return (
       <div className="min-h-screen bg-gray-50">
         <Header title="New Page" />
         <main className="max-w-lg mx-auto px-4 py-6">
           {/* Your content */}
         </main>
       </div>
     );
   }
   ```

### Creating a New Component

1. **Create component file**
   ```bash
   touch src/components/ui/YourComponent.tsx
   ```

2. **Add component code**
   ```tsx
   import React from 'react';

   interface YourComponentProps {
     // Define props
   }

   export const YourComponent: React.FC<YourComponentProps> = ({ /* props */ }) => {
     return (
       <div>
         {/* Component JSX */}
       </div>
     );
   };
   ```

### Adding New Types

Edit `src/types/index.ts`:
```typescript
export interface YourNewType {
  id: string;
  // Add other properties
}
```

## 🐛 Debugging Tips

### Common Issues

**Port already in use**
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- --port 3001
```

**Build errors**
```bash
# Clear Next.js cache
rm -rf .next
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

### Debug Mode

Add console.log statements:
```tsx
console.log('Debug:', { someVariable });
```

Use React DevTools:
- Install React DevTools browser extension
- Inspect component hierarchy and state

## 📱 Testing on Mobile

### Local Network Access
The dev server shows local network URL:
```
Network: http://192.168.1.8:3000
```

Use this URL to test on your mobile device on the same network.

### Responsive Testing
- Open browser DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Select different device presets

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=your_api_url
```

## 📚 Learning Resources

### Next.js Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Routing](https://nextjs.org/docs/app/building-your-application/routing)

### React Documentation
- [React Docs](https://react.dev)
- [Hooks](https://react.dev/reference/react)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Responsive Design](https://tailwindcss.com/docs/responsive-design)

### TypeScript
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [React + TypeScript](https://react-typescript-cheatsheet.netlify.app/)

## 🤝 Contributing

### Code Style
- Use TypeScript for all new files
- Follow existing component structure
- Keep components under 200 lines
- Use descriptive variable names

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "Add your feature"

# Push and create PR
git push origin feature/your-feature
```

### Before Submitting
- Run `npm run lint` to check code quality
- Test on mobile and desktop
- Ensure all pages load correctly
- Check for console errors

## 🔐 Security Considerations

### Never Commit
- API keys
- Passwords
- User data
- Environment variables

### Always Validate
- User inputs
- API responses
- File uploads
- External URLs

## 📞 Support

### Getting Help
- Check `CLAUDE.md` for architecture details
- Review `COMPONENT_REFERENCE.md` for component usage
- See `IMPLEMENTATION_SUMMARY.md` for complete overview

### Common Questions

**Q: How do I add a new API endpoint?**
A: Create API routes in `src/app/api/` directory.

**Q: How do I add state management?**
A: Currently using React hooks. For complex state, consider Context API or Zustand.

**Q: How do I add animations?**
A: Use Tailwind's transition utilities or Framer Motion for complex animations.

**Q: How do I optimize images?**
A: Use Next.js Image component: `import Image from 'next/image'`

---

Happy coding! 🎉