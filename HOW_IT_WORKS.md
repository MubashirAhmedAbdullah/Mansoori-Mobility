# How Mansoori Mobility Works

## 1. What the application is

Mansoori Mobility brings two services under one responsive platform: freight transport for moving goods and car rentals for customer journeys. Shared navigation, support patterns, identity foundations, and administration sit around distinct freight and rental booking workflows.

## 2. Technology

- **Next.js App Router:** route pages live inside `app/`.
- **JavaScript/JSX:** UI components are JavaScript React components.
- **Tailwind CSS v4:** visual styles are Tailwind utility candidates, preserving the previous design.
- **DM Sans + Manrope:** the previous typography is unchanged.
- **Lucide React:** interface icons.

## 3. Important folders

- `app/`: route pages and root layout.
- `components/`: shared header, footer, brand, booking widget, dashboard shell, authentication screens, and scroll-motion component.
- `lib/demo-data.js`: sample marketplace/dashboard records.
- `public/`: static assets (add logos/images here when needed).
- `app/globals.css`: Tailwind import, theme variables, base reset, and scroll-motion keyframes/runtime observer rules.
- `README.md`: setup commands and route overview.

## 4. Main user journeys

### Public visitor
Browse the landing page, then choose freight transport or car rentals. The booking widget and service pages provide navigation into the two marketplaces.

### Goods owner / shipper
Open `/shipper/dashboard` to view sample shipments and use `/shipper/loads/new` to enter a new shipment request. The form demonstrates the UI flow; real data persistence is not yet connected.

### Carrier / vehicle owner
Open `/carrier/dashboard` to inspect example loads, fleet/driver areas, and earnings-oriented views.

### Driver
Open `/driver/dashboard` to see assigned-job and delivery workflow examples.

### Car-rental customer
Visit `/rentals` to browse sample vehicles and `/renter/dashboard` for example reservations.

### Rental host
Open `/host/dashboard` for vehicle inventory, reservations, inspections, and earnings examples.

### Administrator
Open `/admin/dashboard` for sample marketplace oversight and operations panels.

## 5. Running the project

From this project folder, run:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` in your browser. Use `Ctrl+C` to stop the development server.

## 6. Changing the design

Use Tailwind classes directly in JSX for layout, responsive breakpoints, spacing, typography, borders, colors, hover states, and focus states. The theme is based on the original palette: navy `#0f172a`, action blue `#2563eb`, trust teal `#0d9488`, amber `#f59e0b`, and soft background `#f8fafc`. Headings use Manrope; body text uses DM Sans. `app/globals.css` keeps the scroll-reveal keyframes and rules because the `ScrollMotion` component adds observer classes at runtime.

## 7. Production work still required

- Replace demo login with secure real authentication and role/ownership checks.
- Connect MongoDB and server-side validation.
- Add private storage and access controls for vehicle/identity/delivery documents.
- Connect a contracted payment provider and verify signed webhooks.
- Implement immutable ledger entries, reconciled refunds, and provider-supported payouts.
- Enforce freight and rental booking state transitions, availability locks, cancellation rules, and dispute holds.
- Add tests, monitoring, backups, privacy/legal review, and MFA for staff accounts.

**Important:** the current booking, payment, and payout screens demonstrate product flows only. They do not process real payments or safely hold customer funds.
