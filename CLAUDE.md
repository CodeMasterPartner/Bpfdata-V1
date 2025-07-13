# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **hybrid Next.js/React application** with dual architecture:
- **Next.js App Router** structure in `/app` directory (currently minimal, with basic layout and backoffice page)
- **React SPA** structure in `/src` directory (main application logic)

The application is "BPFeedbackData" - a dashboard system for business feedback and analytics with authentication and role-based access control.

## Development Commands

```bash
# Development
npm run dev          # Start Next.js development server
yarn dev            # Alternative with yarn

# Build & Production
npm run build       # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
next lint           # Alternative lint command
```

## Architecture

### Dual Structure
- **Next.js App** (`/app`): Contains layout.tsx, globals.css, and a backoffice page
- **React SPA** (`/src`): Contains the main application logic with custom routing

### Key Directories
- `/src/pages/`: Dashboard pages (DashboardHomePage, ParticipationPage, ComparisonsPage, etc.)
- `/src/contexts/`: React contexts, primarily AuthContext for authentication
- `/src/services/`: Service layer (authService, dataService)
- `/src/components/`: Reusable components including DashboardLayout
- `/components/ui/`: Shadcn/ui component library components
- `/src/types/`: TypeScript type definitions

### Authentication & Routing
- Custom authentication system using AuthContext
- Client-side routing via AppRoutes component with state-based navigation
- Role-based permissions system
- Login page guards all authenticated routes

### UI Framework
- **Shadcn/ui**: Comprehensive component library built on Radix UI
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **Next Themes**: Theme switching support

### State Management
- React Context for authentication state
- Local state management with useState hooks
- Form handling with React Hook Form + Zod validation

## Important Patterns

### Page Navigation
Pages are navigated through `setCurrentPage` prop passed down from AppRoutes. The current implementation uses a switch statement to render different page components.

### Component Structure
- UI components follow Shadcn/ui patterns
- All components use TypeScript
- "use client" directive used for client-side components
- Shadcn components are in `/components/ui/` and custom components in `/src/components/`

### Authentication Flow
1. AuthProvider wraps the entire app
2. AppRoutes checks authentication status
3. Unauthenticated users see LoginPage
4. Authenticated users see DashboardLayout with nested pages

### Styling Approach
- Tailwind utility classes
- CSS variables for theming (defined in globals.css)
- Component variants using class-variance-authority
- Responsive design patterns

## Testing
No test framework currently configured. Check for test scripts in package.json or ask the user for testing preferences when implementing tests.