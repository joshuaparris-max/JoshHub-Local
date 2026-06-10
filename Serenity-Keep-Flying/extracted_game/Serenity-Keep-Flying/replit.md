# Serenity: Keep Flying — Interactive Text Adventure

## Overview

This is a **Firefly/Serenity-themed interactive text adventure game** built as a full-stack web application. Players explore the spaceship Serenity and various locations (Persephone, Rim Outpost, Relay Station) through text commands, interacting with NPCs from the show, managing ship systems, and completing quests. The game features a retro CRT terminal aesthetic with scanline effects, phosphor glow, and monospace fonts.

The app supports authenticated cloud save/load via Replit Auth, with game state persisted as JSON in PostgreSQL.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (React SPA)
- **Framework**: React with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router) with two main routes: `/` (landing) and `/game` (gameplay)
- **State Management**: React Query (`@tanstack/react-query`) for server state (saves, auth); local `useState` via custom `useGame` hook for game engine state
- **UI Library**: shadcn/ui components (new-york style) built on Radix UI primitives with Tailwind CSS
- **Styling**: Tailwind CSS with custom CRT/terminal theme — dark background (#0a0908), amber/gold accents (#d4944c), sepia text (#c8b88a). Fonts: Fira Code (body), VT323 (headings)
- **Key Components**:
  - `Terminal` — scrollable log output with color-coded message types (system, error, success, NPC dialogue)
  - `StatusPanel` — right sidebar showing ship systems (hull, fuel, heat), player stats, inventory
  - `SaveManager` — dialog for cloud save/load/delete operations
  - `GamePage` — main game screen with command input, terminal, and status panel
  - `LandingPage` — CRT-styled login screen with typewriter effects

### Game Engine
- **Location**: `client/src/hooks/use-game.ts` and `client/src/lib/game-data.ts`
- **Design**: Pure client-side text adventure engine. All game data (rooms, items, NPCs, dialogue trees, initial state) defined in `game-data.ts`
- **Game State** (`GameState`): Contains player location, inventory, ship status (hull/fuel/heat/docked location), room modifications, NPC states, quest flags, credits, combat stats, and a scrolling log
- **Commands**: Text parser handles standard adventure commands (look, go, take, drop, use, talk, inventory, etc.)
- **World**: ~17 rooms across 4 areas (Serenity ship interior, Persephone, Rim Outpost, Relay Station), ~20 items, ~5 NPCs with dialogue trees

### Backend (Express + Node.js)
- **Framework**: Express.js with TypeScript, run via `tsx` in development
- **API Structure**: RESTful routes defined in `shared/routes.ts` with Zod validation schemas
- **Routes**:
  - `GET /api/auth/user` — get current authenticated user
  - `GET /api/saves` — list user's game saves
  - `POST /api/saves` — create a new save (game state stored as JSONB)
  - `GET /api/saves/:id` — load a specific save
  - `DELETE /api/saves/:id` — delete a save
- **Storage Layer**: `server/storage.ts` implements `IStorage` interface with `DatabaseStorage` class using Drizzle ORM
- **Build**: esbuild bundles server for production; Vite builds client to `dist/public`

### Database (PostgreSQL + Drizzle ORM)
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema** (`shared/schema.ts` and `shared/models/auth.ts`):
  - `sessions` — session storage for Replit Auth (sid, sess JSONB, expire)
  - `users` — user profiles (id, email, firstName, lastName, profileImageUrl, timestamps)
  - `game_saves` — save slots (id, userId FK, name, data JSONB, timestamps)
- **Migrations**: Managed via `drizzle-kit push` (schema push approach, not migration files)
- **Connection**: `server/db.ts` creates a `pg.Pool` from `DATABASE_URL` environment variable

### Authentication (Replit Auth via OpenID Connect)
- **Location**: `server/replit_integrations/auth/`
- **Mechanism**: OpenID Connect with Replit as identity provider, using `openid-client` and Passport.js
- **Session Storage**: PostgreSQL-backed sessions via `connect-pg-simple`
- **User Management**: Auto-upsert on login via `authStorage.upsertUser()`
- **Required env vars**: `DATABASE_URL`, `SESSION_SECRET`, `REPL_ID`, `ISSUER_URL` (defaults to Replit OIDC)

### Shared Code (`shared/`)
- Database schemas and types used by both client and server
- API route definitions with Zod schemas for type-safe request/response validation
- Path aliases: `@shared/*` maps to `./shared/*`

## External Dependencies

- **PostgreSQL**: Primary database for users, sessions, and game saves. Required via `DATABASE_URL` environment variable
- **Replit Auth (OpenID Connect)**: Authentication provider. Uses Replit's OIDC endpoint for user identity
- **Google Fonts**: Fira Code, VT323, DM Sans, Geist Mono, Architects Daughter loaded via CDN
- **Key npm packages**:
  - `drizzle-orm` + `drizzle-kit` — database ORM and schema management
  - `express` + `express-session` — HTTP server and session middleware
  - `passport` + `openid-client` — authentication
  - `connect-pg-simple` — PostgreSQL session store
  - `@tanstack/react-query` — client-side data fetching/caching
  - `wouter` — client-side routing
  - `zod` + `drizzle-zod` — runtime validation
  - `shadcn/ui` components (Radix UI + Tailwind CSS)
  - `date-fns` — date formatting for save timestamps
  - `lucide-react` — icons