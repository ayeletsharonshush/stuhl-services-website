# Stuhl Services LLC Website

## Overview
Professional website for Stuhl Services LLC, a local remodeling company specializing in kitchens, bathrooms, basements, and custom work. Features a portfolio of before-and-after transformations and client testimonials.

## Tech Stack
- **Frontend**: React 19 + TypeScript
- **Backend**: Express 5 + TypeScript (tsx)
- **Database**: PostgreSQL (estimate_requests table)
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide React
- **Fonts**: Inter, DM Serif Display (Google Fonts)
- **Email**: Nodemailer (Gmail) — requires GMAIL_USER and GMAIL_APP_PASSWORD secrets

## Project Structure
```
├── index.html          # Entry HTML with Tailwind CDN config + OG meta tags
├── index.tsx           # React entry point
├── App.tsx             # Main app with section routing + floating buttons
├── types.ts            # TypeScript interfaces (Project, Testimonial, Section)
├── constants.tsx       # Project data and services list
├── components/
│   ├── Navbar.tsx      # Navigation bar (uses LogoBricks logo)
│   ├── Home.tsx        # Homepage with hero, services, stats, "Why Choose Us"
│   ├── Portfolio.tsx   # Project portfolio with before/after
│   ├── Contact.tsx     # Contact form (POSTs to /api/estimate)
│   ├── Footer.tsx      # Cream-colored footer with About, contact, "Where We Work" card
│   ├── Logo.tsx        # Old SVG logo component (unused)
│   └── LogoBricks.tsx  # Animated logo with 3D spin effect
├── server/
│   ├── index.ts        # Express server (port 3001 dev / 5000 prod)
│   ├── db.ts           # PostgreSQL connection and queries
│   └── email.ts        # Email notification via nodemailer/Gmail
├── public/
│   ├── logo-animations.css  # Logo animation keyframes
│   ├── images/              # Portfolio images, logo, og-image.png
│   └── proposal.html        # Proposal template
├── vite.config.ts      # Vite config (port 5000, proxies /api to :3001)
├── netlify.toml        # Netlify build config (npm run build, dist)
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies
```

## Running
- Dev: `npm run dev` — runs Express on port 3001 + Vite on port 5000 (with /api proxy)
- Production: `npm start` — runs Express on port 5000 serving built frontend + API
- Build: `npm run build` (outputs to `dist/`)

## Deployment
- **Replit**: Static deployment (build: npm run build, publicDir: dist)
- **Netlify**: Connected to GitHub repo `ayeletsharonshush/stuhl-services-website`, branch `main`
- **Domain**: stuhlservices.com (via Netlify)
- **Pipeline**: Replit code → push to GitHub → Netlify auto-deploys

## API Endpoints
- `POST /api/estimate` — Submit a free estimate request (saves to DB, sends email notification)
- `GET /api/estimates` — List all estimate requests (admin use)

## Database
- Table: `estimate_requests` (id, name, email, phone, project_type, message, created_at)

## Email Notifications
- Email not yet configured — needs GMAIL_USER and GMAIL_APP_PASSWORD environment secrets
- When configured, sends formatted HTML email to stuhlservices@gmail.com for each new estimate
- Without credentials, submissions are still saved to database (no data loss)

## Recent Changes
- Footer redesigned: cream background, "Where We Work" navy card with 2-column town grid, action-oriented contact buttons, social proof nudge
- Hero section: updated text, spacing adjustments
- Service cards: horizontal layout (icon beside text), darker background tint
- "Why Choose Us" section: dark navy gradient card with gold accents, bullet points, "Free Quote" button
- OG image added for social media link previews (og-image.png)
- Floating mobile buttons: "Start Your Project" + "Our Works" (gold, 60% transparent)
- Copyright updated to © 2021

## Notes
- Images referenced in constants.tsx are expected in `/images/` directory (public folder)
- Uses client-side section routing (not URL-based routing)
- Logo uses animated 3D spin effect from Kitchen-design project (LogoBricks component)
- GitHub token needed for pushing: create via GitHub Settings → Developer Settings → Personal Access Tokens
