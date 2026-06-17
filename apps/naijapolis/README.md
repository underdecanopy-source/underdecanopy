# PoliForge OS

An open-source, modular political campaign management platform built specifically for Nigerian electoral conditions. Inspired by NationBuilder, PoliForge OS delivers a unified supporter tracking system, offline-first canvassing tools, Nigerian payment integration, and USSD fallback — all deployable on Netlify.

## Features

- **Activity Feed** — Real-time unified stream of every campaign action: donations, door-knocks, RSVPs, volunteer signups, advocacy messages, pledges
- **People Database** — Voter/supporter CRM linked to INEC polling unit codes
- **Finance Module** — Donation recording, pledge tracking, fundraiser progress (Paystack/Flutterwave/Bank Transfer/Cash)
- **Events & RSVPs** — Create rallies and mobilization events with RSVP tracking
- **Goals Dashboard** — Visual progress tracking for donations, volunteers, canvasses, and RSVPs
- **Canvassing** — Door-knock logging with support-level rating and offline sync status
- **Advocacy (ActionButton)** — Constituent-to-candidate messaging with issue categorisation
- **Settings** — Campaign configuration for name, party, state/LGA, payment provider, and timezone

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start (React 19 + SSR) |
| Routing | TanStack Router v1 (file-based) |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Storage | Netlify Blobs |
| Language | TypeScript 5.7 (strict) |
| Deployment | Netlify |

## Running Locally

```bash
# Install dependencies
npm install

# Start with Netlify CLI (recommended — enables Blobs emulation)
netlify dev

# Or start Vite directly (Blobs won't work without Netlify context)
npm run dev
```

The app runs on `http://localhost:8888` with `netlify dev`, or `http://localhost:3000` with `npm run dev`.

## Environment Variables

No environment variables are required for basic operation. The app seeds itself with demo data on first run.

For production, configure Paystack/Flutterwave webhook secrets and Africa's Talking USSD credentials in your Netlify environment settings.

## Architecture

See `agents.md` for a detailed architecture overview and coding conventions.
