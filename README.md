# StacQ

Digital queue management SaaS for Nigerian businesses.

## Features
- Business registration & login (JWT)
- Real-time queue dashboard (Socket.io)
- Customer join flow (no login required)
- Status management (Serve, Skip, Remove)

## Tech Stack
- **Frontend**: React + Vite, Tailwind CSS, Socket.io-client
- **Backend**: Node.js, Express, Socket.io
- **Database**: PostgreSQL (Neon)
- **Deployment**: Vercel (Frontend), Render (Backend)

## Getting Started
1. Clone the repo: `git clone https://github.com/Dav-Nelson/stacq.git`
2. Configure `.env` files in `/client` and `/server` using `.env.example` templates.
3. Run backend: `cd server && npm install && npm run dev`
4. Run frontend: `cd client && npm install && npm run dev`
