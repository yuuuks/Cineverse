# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cineverse is a full-stack movie streaming platform with a React frontend and Express.js backend connected to Supabase (PostgreSQL).

## Commands

### Development (both services at once)
```bash
npm run dev
```

### Individual services
```bash
# Frontend only
cd frontend && npm start

# Backend only
cd backend && npm run dev
```

### Frontend build & test
```bash
cd frontend && npm run build
cd frontend && npm test
```

## Architecture

### Monorepo Structure
- `frontend/` — React 19 SPA (Create React App, Tailwind CSS)
- `backend/` — Express 5 REST API
- Root `package.json` uses `concurrently` to run both

### Frontend (`frontend/src/`)
- **Routing** defined in `App.js`: public routes (`/`, `/watch/:movieId`) and admin routes (`/admin`, `/admin/add-movie`, `/admin/edit-movie/:movieId`, `/admin/manage-hero`)
- **API calls** go through `services/api.js` — an `ApiService` singleton using native `fetch`. Base URL is `REACT_APP_API_URL` env var (defaults to `http://localhost:5000/api`)
- **No global state management** — all state is local `useState`/`useEffect` per component
- **Styling**: Tailwind CSS with dark theme (`zinc-950` background) and red accent (`#dc2626`)

### Backend (`backend/`)
- `server.js` — Express entry point on port 5000, mounts routes at `/api/*`
- `config/supabase.js` — Supabase client initialized from `.env`
- `routes/movies.js` — Full CRUD on `movies` table
- `routes/categories.js` — Categories with movies (matched via `genres` array field)
- `routes/hero.js` — Active hero config (`hero_config` table, only one `is_active: true` at a time)

### Database (Supabase/PostgreSQL)
Key tables:
- **movies**: `id`, `title`, `year`, `duration`, `rating`, `poster`, `description`, `youtube_id`, `genres` (array), `is_featured`, `created_at`
- **categories**: `id`, `name`, `color` (Tailwind gradient class)
- **hero_config**: `id`, `movie_id` (FK), `is_active`, `created_at`

Movies link to categories via the `genres` array — categories are not a separate join table.

### YouTube Integration
Movies use `youtube_id` for trailers. The hero and watch pages require a valid YouTube ID. The `ManageHero` admin page validates `youtube_id` presence before setting a hero movie.

### Language
UI text and code comments are in **French**.
