# Mansoori Mobility

A responsive Next.js App Router + JavaScript (JS/JSX) + Tailwind CSS implementation inspired by the uploaded **Mansoori Mobility** product blueprint and UI concept appendix. The product combines a freight marketplace, car rentals, provider workspaces and operations/finance panels.

## Included

- Responsive public landing page with freight / rental search entry points and vehicle listing cards.
- Login and sign-up screens with role selection and a clearly labelled workspace-preview mode.
- Goods-owner dashboard, shipment form, shipment records and quote comparison.
- Carrier dashboard, load marketplace, fleet/driver record views and earnings overview.
- Driver trip checklist with demo milestone interactions and evidence action.
- Rental customer browse/search page and rental-host dashboard, vehicle, availability and reservation views.
- Platform admin overview, verification queue, bookings, vehicles, disputes, reports, settings and audit views.
- Finance overview, payment ledger, payout queue, refunds and reconciliation views.
- Support centre and demo ticket interactions.
- Shared brand mark, responsive sidebar navigation, tables, status badges, forms, stats cards and Lucide icons.
- Mongoose models for users, loads, quotes, vehicles, bookings, payments and immutable-style ledger entries.
- API starter routes for health, signup/login/logout/current session, loads, quotes, freight booking acceptance/milestones and vehicles.
- Session JWT in an HttpOnly cookie, password hashing with bcrypt, Zod input validation and role checks on write endpoints.
- Integer-paisa commission helper and an explicit freight state-transition helper.

## Run locally

Prerequisites: Node.js 20+ and npm.

```bash
npm install
# Windows Command Prompt:
copy .env.example .env.local
# macOS / Linux / Git Bash (use this instead of copy):
# cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

The **public pages and workspace previews work without a database**. The real auth and persistence API routes require MongoDB configuration; add valid values in `.env.local`:

```env
MONGODB_URI=mongodb+srv://...
SESSION_SECRET=use-a-random-secret-at-least-32-characters-long
FREIGHT_COMMISSION_BPS= # configure only after the commercial policy is approved
```

You can preview the main panels directly:

- `/shipper` — goods owner / shipper
- `/carrier` — transport owner / carrier
- `/driver` — driver workflow
- `/rentals` — car rental customer marketplace
- `/host` — rental host
- `/admin` — platform admin
- `/finance` — finance dashboard
- `/payments` — payment ledger view
- `/support` — support centre

Use `npm run lint` to check the JavaScript/JSX source after installing dependencies.

## API starter

- `GET /api/health`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/loads` / `POST /api/loads`
- `POST /api/loads/:loadId/quotes`
- `POST /api/quotes/:quoteId/accept` — requires approved `FREIGHT_COMMISSION_BPS` and MongoDB transaction support
- `PATCH /api/bookings/:bookingId/milestones` — checks freight state transitions, actor role, and pickup/POD evidence references
- `GET /api/vehicles` / `POST /api/vehicles`

Write endpoints check session identity and role on the server. Vehicle listings created through the API always enter `pending_review`; a client cannot mark itself verified.

## Important implementation boundary

The included screens contain sample records and some client-only demo interactions so the full UI can be evaluated before database and provider setup. The auth, load, quote acceptance, freight milestone and vehicle routes are starter APIs when configured, but most dashboard actions are not yet wired to persist every interaction through them. Do not treat sample prices, verification badges, statuses or transactions as live records.

No live payment collection, escrow/custody, refund, chargeback, split settlement or provider payout is implemented. Before enabling real payments, select a contracted payment/bank provider whose product explicitly supports the desired marketplace money flow, verify current Pakistan requirements with qualified advisers, then implement the provider-specific checkout, signed webhooks, idempotent refund/payout requests and settlement reconciliation. The in-app ledger is an accounting record, not evidence that Mansoori Mobility holds money.

## UI design tokens

- Midnight navy `#0F172A` and deep ocean `#102B40` — sidebar, hero and strong text
- Action blue `#2563EB` — links and selected actions
- Trust teal `#0D9488`, mint `#11C8A5` — primary actions, verified and completed states
- Warm amber `#F59E0B` — pending and attention states
- App background `#F4F8FB` / `#F8FAFC`, border `#E2E8F0`, secondary text `#64748B`
- 8px spacing rhythm, 10–14px card corners, white cards, restrained shadows, mobile-first layouts

## Suggested production hardening

1. Add server-side authorization for every private page, not only API mutations. Add MFA for privileged platform staff.
2. Wire all dashboard read/write operations to permission-checked server actions or route handlers and replace demo content with database results.
3. Implement private object storage and signed URLs for identity documents, vehicle documents, delivery proof and rental inspections.
4. Add the selected payment provider with signature-verified webhooks, idempotency, booking-time price/commission snapshots, refunds, payout attempts and reconciliation queues.
5. Add overlap-safe rental availability locks, test coverage for concurrent booking attempts, audit logs, notification retries, backup restore tests and staging/production separation.
