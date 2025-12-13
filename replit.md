# JoshHub - App Hub Platform

## Overview

JoshHub is a personal application hub that displays and manages a curated collection of applications and tools. It features a public-facing homepage showcasing apps with animated cards, and a password-protected admin panel for CRUD operations. The application uses a modern React frontend with a Node.js/Express backend, backed by PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, with localStorage caching for offline resilience
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **Animations**: Framer Motion for card animations and transitions
- **Build Tool**: Vite with custom plugins for meta images and Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript compiled with tsx (development) and esbuild (production)
- **API Pattern**: RESTful JSON API with `/api` prefix
- **Authentication**: Simple token-based auth for admin routes using `ADMIN_PASSWORD` environment variable
- **Static Serving**: Express serves the built React app in production

### Data Storage
- **Database**: PostgreSQL via `pg` driver
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Schema Location**: `shared/schema.ts` contains the `apps` table definition
- **Validation**: Zod schemas generated from Drizzle schemas using `drizzle-zod`

### Key Design Decisions

1. **Shared Schema Pattern**: Database schema is defined in `shared/schema.ts` and shared between frontend and backend for type safety. Insert and update schemas are derived using `drizzle-zod`.

2. **Client-Side Caching**: The frontend caches app data in localStorage with a 7-day staleness threshold, providing offline fallback when the API is unreachable.

3. **Monorepo Structure**: Single repository with `client/`, `server/`, `shared/`, and `db/` directories. The build process compiles both frontend (Vite) and backend (esbuild) into `dist/`.

4. **Admin Authentication**: Simple bearer token authentication comparing against `ADMIN_PASSWORD` environment variable. No session management or user accounts.

5. **Icon System**: Apps store icon names as strings (e.g., "Terminal", "Layers") which map to Lucide React icons on the frontend.

## External Dependencies

### Database
- **PostgreSQL**: Required external database. Connection string provided via `DATABASE_URL` environment variable. Uses SSL in production.

### Environment Variables
| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `ADMIN_PASSWORD` | Yes | Password for admin panel access |
| `NODE_ENV` | Auto | Set to `production` for production builds |

### Third-Party Libraries
- **Radix UI**: Accessible UI primitives (dialogs, dropdowns, tooltips, etc.)
- **TanStack Query**: Server state management and caching
- **Drizzle ORM**: Type-safe database operations
- **Framer Motion**: Animation library for React
- **Lucide React**: Icon library

### Development Commands
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Run production build
npm run db:push      # Push schema changes to database
```