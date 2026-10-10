# Mansoori Mobility

Mansoori Mobility is a responsive freight transport and car-rental marketplace starter built with **Next.js App Router, JavaScript/JSX, Tailwind CSS v4, and Lucide icons**.

## Design preservation note

This version preserves the typography and visual design from the previous animated project: **DM Sans** for body text and **Manrope** for headings, the original navy/blue/teal palette, spacing, card shapes, dashboards, role-specific screens, and existing motion behavior. The stylesheet-driven component visuals have been migrated to Tailwind utility candidates, including arbitrary utilities for exact original CSS values. Tailwind Preflight is intentionally not imported, avoiding a browser-reset redesign; remaining global CSS is limited to the original base typography, theme variables, status badges, and scroll-motion/keyframe behavior that uses runtime-added classes.

## Run locally

1. Open this folder in VS Code.
2. Make sure Node.js 20.9 or newer is installed.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

## Main routes

- `/` – public landing page
- `/freight` – freight marketplace
- `/rentals` – car-rental marketplace
- `/login` and `/signup` – demo entry screens
- `/dashboard` – role chooser/demo dashboard
- `/shipper/dashboard` and `/shipper/loads/new` – shipper workspace and load form
- `/carrier/dashboard` – carrier workspace
- `/driver/dashboard` – driver workspace
- `/renter/dashboard` – rental customer workspace
- `/host/dashboard` – rental host workspace
- `/admin/dashboard` – administrator workspace

## Tailwind and fonts

Tailwind v4 is loaded from `app/globals.css` with its theme and utilities layers only. Tailwind Preflight is intentionally omitted to preserve the previous browser defaults and design. The same Google Fonts used in the previous UI are retained: DM Sans and Manrope. Add responsive styling in JSX with Tailwind utilities; use the theme variables in `:root` when you need the existing palette.

## Demo scope

The interface uses sample data and browser-local demo behavior. Real authentication/authorization, MongoDB persistence, secure document storage, payment provider webhooks, commission reconciliation, refunds, and payouts must be integrated before production use. Do not use demo status or payout screens as evidence of real money movement.
