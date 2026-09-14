# Pingly

Pingly is a monitoring/notification project (frontend + backend). This repository contains a React + Vite frontend and a Node backend.

- Live demo: https://pingly-frontend.onrender.com
- Repo: https://github.com/PriyanshiZunke/Pingly

## Tech

- Frontend: React, Vite, Tailwind
- Backend: Node, Express (Mongoose/MongoDB)

## Prerequisites

- Node.js (18+ recommended)
- npm
- A MongoDB instance or connection string for the backend

## Install

Install dependencies for both projects:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Run (development)

Start the backend in one terminal:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

## Build (production)

```bash
cd frontend
npm run build

cd ../backend
npm run build
```

## Project layout

```
Pingly/
├── backend/     # Node backend (scripts in package.json: dev, start, build)
├── frontend/    # React + Vite frontend (dev/build)
├── .gitignore   # Repo-level ignore (preferred)
```

## Notes

- The repository previously included a `frontend/README.md` and a frontend-level `.gitignore`; those have been consolidated — keep the root `.gitignore` only.
- If you deploy, ensure environment variables for MongoDB (or other services) are configured for the backend.

## Deploy / Live

- Frontend: static site (Vite build -> `dist`) hosted on Render (or any static host). Example demo: https://pingly-frontend.onrender.com
- Backend: Node/Express Web Service. Important env vars:
	- `FRONTEND_URL` — frontend origin (no trailing slash), e.g. `https://pingly-frontend.onrender.com`
	- `MONGO_URI` — MongoDB connection string
	- `CLERK_SECRET_KEY`, `CLERK_PUBLISHABLE_KEY`, `CLERK_WEBHOOK_SIGNING_SECRET` — Clerk credentials if using Clerk auth

For Render: configure the frontend as a Static Site (root = `frontend`, build command `npm install && npm run build`, publish `dist`) and the backend as a Web Service (root = `backend`, build `npm install`, start `npm start`, health check `/health`).

If you want, I can add example `.env` templates or help run the app locally.
