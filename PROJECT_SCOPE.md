# Project scope derived from the supplied PDF

This implementation follows the provided product blueprint and visual concepts rather than introducing a separate product direction.

## Product areas

1. Public visitor — marketplace landing, transport search, car rental search, how it works and sign-in/sign-up.
2. Goods owner / shipper — shipment request, quote comparison, booking progression, recent activity, documents, payments and support.
3. Carrier / vehicle owner — load marketplace, quotes, booked jobs, fleet, drivers, delivery proof and earnings.
4. Driver — assigned job, route/stop summary, pickup checklist, in-transit updates and delivery proof action.
5. Rental customer — car search, category/price filters, vehicle detail/booking entry point and payment status entry point.
6. Rental host — vehicle inventory, availability, reservations, inspections, earnings and reviews.
7. Admin — platform metrics, users/KYC, vehicle moderation, bookings, disputes, configuration, reports and audit logs.
8. Finance — payment ledger, reconciliation, refund/payout queues and provider settlement status.
9. Support — tickets and case entry points related to freight, rentals and payments.

## Core product rules represented in the UI/model starter

- One identity system can carry several provider/customer roles; staff privileges should be separate in production.
- Freight and rental use distinct lifecycle/status models.
- Freight loads are created by shippers; carriers should be verified before they accept paid work.
- Rental availability needs overlap-safe booking control before production.
- Price and commission terms should be frozen at booking agreement and disclosed before payment.
- Delivery proof / return inspection and customer confirmation are prerequisites to payout eligibility under the chosen policy.
- Disputes, failed payments and payout failures require a manual review path.
- Financial amounts are represented in integer paisa in the backend starter.
- Live funds movement must be performed through a contracted provider-supported flow, not an in-app wallet or self-described escrow.
