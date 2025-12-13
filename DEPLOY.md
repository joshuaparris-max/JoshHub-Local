# JoshHub Deploy Checklist

## Environment Variables for Vercel

Set these in your Vercel project settings:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `ADMIN_PASSWORD` | Yes | Password for admin panel access |
| `NODE_ENV` | Auto | Set automatically to `production` |

## Local Development

```bash
# Install dependencies
npm install

# Push database schema
npm run db:push

# Seed database (first time only)
npm run db:seed

# Start development server
npm run dev
```

## Database Commands

```bash
npm run db:push      # Push schema changes to database
npm run db:generate  # Generate migration files
npm run db:migrate   # Run migrations
npm run db:seed      # Seed initial data
```

## Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## Vercel Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Full-stack JoshHub with admin panel"
   git push origin main
   ```

2. **Connect to Vercel**
   - Import your GitHub repo in Vercel
   - Set build command: `npm run build`
   - Set output directory: `dist/public`
   - Set install command: `npm install`

3. **Add Environment Variables**
   - Go to Settings > Environment Variables
   - Add `DATABASE_URL` (from your PostgreSQL provider)
   - Add `ADMIN_PASSWORD` (choose a strong password)

4. **Deploy**
   - Vercel will auto-deploy on push

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health` | No | Health check |
| GET | `/api/apps` | No | List all apps |
| GET | `/api/apps/:id` | No | Get single app |
| POST | `/api/apps` | Yes | Create app |
| PUT | `/api/apps/:id` | Yes | Update app |
| DELETE | `/api/apps/:id` | Yes | Delete app |

## Admin Access

- Navigate to `/admin`
- Enter your `ADMIN_PASSWORD`
- Or use query param: `/admin?token=YOUR_PASSWORD`

## Quick Test Plan

1. Visit `/` - Should show apps grid with "Needs Attention" section if any broken apps
2. Visit `/api/health` - Should return `{"status":"healthy"}`
3. Visit `/api/apps` - Should return array of apps
4. Visit `/admin` - Should show login form
5. Login with ADMIN_PASSWORD - Should show admin dashboard
6. Create/Edit/Delete an app - Changes should persist

## Known Limitations

- No rate limiting on API endpoints
- Session stored in sessionStorage (cleared on browser close)
- No email/notification for broken apps
- Image/icon selection limited to preset icons

## File Structure

```
├── client/           # Frontend (Vite + React)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── home.tsx      # Main apps page
│   │   │   ├── admin.tsx     # Admin CRUD panel
│   │   │   └── not-found.tsx
│   │   └── lib/
│   │       └── cache.ts      # localStorage caching
├── server/           # Backend (Express)
│   ├── routes.ts     # API routes with auth
│   └── storage.ts    # Database operations
├── shared/
│   └── schema.ts     # Drizzle schema + types
├── db/
│   ├── index.ts      # Database connection
│   └── seed.ts       # Seed script
└── DEPLOY.md         # This file
```
