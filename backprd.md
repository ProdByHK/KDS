# King David Service — Backend PRD
## Product Requirements Document · API & Server Layer

---

## 1. Overview

This document defines the backend requirements for the King David Service ecosystem. The backend serves as the data and business logic layer for all 7 platforms and the corporate website. The frontend will consume this API exclusively.

**Backend is responsible for:**
- Serving platform, service, and partner data to the frontend
- Handling bookings, inquiries, and form submissions
- Managing authentication and role-based access
- Processing payments via Stripe and Midtrans
- Tracking logistics for CARRY
- Powering partner and admin dashboards

---

## 2. Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Runtime | Node.js 20+ | Stable, widely supported |
| Framework | Express.js | Lightweight, flexible, easy to scale per-route |
| Language | TypeScript (strict) | Type safety across frontend and backend |
| ORM | Prisma | Type-safe DB queries, easy migrations |
| Database | PostgreSQL | Relational, handles complex ecosystem relationships |
| Auth | Clerk (webhook sync) | Handles auth UI on frontend, backend only verifies JWT |
| Validation | Zod | Schema validation for all request bodies |
| Email | Resend | Transactional emails (booking confirm, inquiry notify) |
| Payments | Stripe + Midtrans | Stripe for international, Midtrans for Indonesia |
| Storage | Cloudflare R2 | Partner assets, booking attachments |
| Search Sync | Meilisearch | Syncs commodity and service data for frontend search |
| Task Queue | BullMQ + Redis | Background jobs (email sends, payment webhooks) |
| Logging | Winston | Structured server logs |
| API Docs | Swagger / OpenAPI | Auto-generated from route definitions |

---

## 3. Project Structure

```
apps/api/
├── src/
│   ├── index.ts                  # Express app entry + server start
│   ├── app.ts                    # Express app setup (middleware, routes)
│   ├── config/
│   │   ├── env.ts                # Zod-validated environment variables
│   │   ├── database.ts           # Prisma client singleton
│   │   ├── redis.ts              # Redis client for BullMQ
│   │   ├── cors.ts               # CORS config (whitelist frontend domains)
│   │   └── swagger.ts            # OpenAPI setup
│   ├── routes/
│   │   ├── index.ts              # Aggregates all routers
│   │   ├── platforms.routes.ts
│   │   ├── services.routes.ts
│   │   ├── bookings.routes.ts
│   │   ├── inquiries.routes.ts
│   │   ├── partners.routes.ts
│   │   ├── logistics.routes.ts
│   │   ├── commodities.routes.ts
│   │   ├── auth.routes.ts
│   │   └── admin.routes.ts
│   ├── controllers/
│   │   ├── platforms.controller.ts
│   │   ├── bookings.controller.ts
│   │   ├── inquiries.controller.ts
│   │   ├── partners.controller.ts
│   │   ├── logistics.controller.ts
│   │   ├── commodities.controller.ts
│   │   └── admin.controller.ts
│   ├── services/
│   │   ├── booking.service.ts    # Booking creation + status updates
│   │   ├── email.service.ts      # Resend email templates
│   │   ├── payment.service.ts    # Stripe + Midtrans integration
│   │   ├── storage.service.ts    # Cloudflare R2 uploads
│   │   ├── logistics.service.ts  # CARRY quote + tracking logic
│   │   ├── search.service.ts     # Meilisearch sync
│   │   └── clerk.service.ts      # Clerk user sync
│   ├── middleware/
│   │   ├── auth.middleware.ts    # Clerk JWT verification
│   │   ├── role.middleware.ts    # Role-based access control
│   │   ├── validate.middleware.ts# Zod request validation
│   │   ├── error.middleware.ts   # Global error handler
│   │   └── rateLimit.middleware.ts
│   ├── queues/
│   │   ├── email.queue.ts        # Background email jobs
│   │   └── payment.queue.ts      # Payment webhook processing
│   ├── schemas/
│   │   ├── booking.schema.ts     # Zod schemas for booking requests
│   │   ├── inquiry.schema.ts
│   │   ├── partner.schema.ts
│   │   └── logistics.schema.ts
│   └── types/
│       ├── express.d.ts          # Extend Express Request with dbUser
│       └── index.ts              # Shared types
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── tsconfig.json
├── .env.example
└── package.json
```

---

## 4. Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/kingdavid

# Auth
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Payments
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
MIDTRANS_IS_PRODUCTION=false

# Email
RESEND_API_KEY=
EMAIL_FROM=no-reply@kingdavidservice.com

# Storage
CLOUDFLARE_R2_BUCKET=
CLOUDFLARE_R2_ACCOUNT_ID=
CLOUDFLARE_R2_ACCESS_KEY=
CLOUDFLARE_R2_SECRET_KEY=

# Search
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_API_KEY=

# Redis (BullMQ)
REDIS_URL=redis://localhost:6379

# App
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

## 5. API Endpoints

### 5.1 Platforms

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/platforms` | Public | List all active platforms |
| GET | `/api/platforms/:slug` | Public | Get single platform by slug |
| GET | `/api/platforms/:slug/services` | Public | List services for a platform |
| PATCH | `/api/platforms/:id` | ADMIN | Update platform details |

---

### 5.2 Bookings

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/bookings` | Optional | Create a new booking |
| GET | `/api/bookings` | USER | Get current user's bookings |
| GET | `/api/bookings/:id` | USER | Get single booking detail |
| PATCH | `/api/bookings/:id/cancel` | USER | Cancel a booking |
| PATCH | `/api/bookings/:id/status` | ADMIN | Update booking status |
| GET | `/api/admin/bookings` | ADMIN | List all bookings with filters |

**Booking request body (platform-agnostic wrapper):**
```typescript
{
  platformSlug: string        // 'gold-lion' | 'gold-miles' | 'tala-bhojana' | 'koonang' | 'creathinks'
  serviceId?: string
  totalAmount: number
  currency: string            // 'IDR' | 'USD'
  details: Record<string, any> // Platform-specific JSON (see Section 7)
  paymentMethod: 'stripe' | 'midtrans'
}
```

---

### 5.3 Inquiries

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/inquiries` | Public | Submit contact / partnership / investor inquiry |
| GET | `/api/admin/inquiries` | ADMIN | List all inquiries |
| PATCH | `/api/admin/inquiries/:id` | ADMIN | Update inquiry status |

**Inquiry request body:**
```typescript
{
  type: 'GENERAL' | 'PARTNERSHIP' | 'INVESTOR' | 'PLATFORM_SPECIFIC'
  name: string
  email: string
  company?: string
  platformSlug?: string
  message: string
}
```

---

### 5.4 Partners

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/partners` | Public | List verified partners (for ecosystem directory) |
| GET | `/api/partners/:id` | Public | Get partner profile |
| POST | `/api/partners` | USER | Register as a partner |
| PATCH | `/api/partners/:id` | PARTNER | Update own partner profile |
| POST | `/api/partners/:id/platforms` | PARTNER | Join a platform |
| GET | `/api/partners/me/dashboard` | PARTNER | Dashboard data (bookings, leads, stats) |
| PATCH | `/api/admin/partners/:id/verify` | ADMIN | Verify a partner |

---

### 5.5 Logistics (CARRY)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/logistics/quote` | Public | Get shipping rate quote |
| POST | `/api/logistics/book` | Optional | Book a shipment |
| GET | `/api/logistics/track/:code` | Public | Track shipment by tracking code |
| GET | `/api/logistics/shipments` | USER | List user's shipments |
| PATCH | `/api/admin/logistics/:id/status` | ADMIN | Update shipment status |

**Quote request body:**
```typescript
{
  type: 'COURIER' | 'CARGO' | 'SEA_FREIGHT' | 'AIR_FREIGHT' | 'INTERNATIONAL'
  origin: string
  destination: string
  weightKg: number
  dimensionsCm?: { length: number; width: number; height: number }
}
```

---

### 5.6 Commodities (PASARX)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/commodities` | Public | List commodities (paginated, filterable) |
| GET | `/api/commodities/:id` | Public | Get commodity detail |
| POST | `/api/commodities/:id/rfq` | Public | Submit Request for Quote to seller |
| POST | `/api/admin/commodities` | ADMIN | Create commodity listing |
| PATCH | `/api/admin/commodities/:id` | ADMIN | Update commodity listing |

**Query params for listing:**
```
?category=coffee&origin=Aceh&minPrice=5&maxPrice=20&currency=USD&page=1&limit=12
```

---

### 5.7 Auth (Clerk Sync)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/webhook` | Clerk signature | Sync Clerk user events to DB |
| GET | `/api/auth/me` | USER | Get current user's DB record + role |

---

### 5.8 Payments

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/payments/stripe/intent` | USER | Create Stripe payment intent |
| POST | `/api/payments/stripe/webhook` | Stripe signature | Handle Stripe events |
| POST | `/api/payments/midtrans/token` | USER | Get Midtrans Snap token |
| POST | `/api/payments/midtrans/webhook` | Midtrans signature | Handle Midtrans notifications |

---

## 6. Authentication & Authorization

### Roles
```
ADMIN      → Full access to everything
PARTNER    → Own profile, own bookings, dashboard
INVESTOR   → Read-only investor relations data
CLIENT     → Create bookings, submit inquiries, track shipments
```

### Middleware pattern
```typescript
// Public route
router.get('/platforms', getPlatforms)

// Authenticated route
router.get('/bookings', requireAuth, getMyBookings)

// Role-restricted route
router.patch('/admin/bookings/:id', requireAuth, requireRole(['ADMIN']), updateBookingStatus)
```

### Clerk webhook sync
When a user signs up via Clerk on the frontend, Clerk fires a webhook to `POST /api/auth/webhook`. The backend creates the user record in PostgreSQL and assigns the default `CLIENT` role.

---

## 7. Platform-Specific Booking JSON Shapes

Each platform stores its specific booking data in the `details` JSON column of the `Booking` table.

### GOLD LION — Transportation
```typescript
{
  vehicleType: 'sedan' | 'suv' | 'limousine' | 'van'
  pickupAddress: string
  dropoffAddress: string
  pickupDatetime: string        // ISO8601
  passengerCount: number
  isRoundTrip: boolean
  driverNote?: string
  corporateAccountId?: string
}
```

### GOLD MILES — Travel
```typescript
{
  travelType: 'package' | 'corporate' | 'business_trip' | 'event' | 'immigration'
  destination: string
  departureDatetime: string     // ISO8601
  returnDatetime?: string
  passengerCount: number
  packageId?: string
  specialRequirements?: string
}
```

### TALA BHOJANA — Catering
```typescript
{
  eventType: 'wedding' | 'corporate' | 'event' | 'premium_dining'
  eventDate: string             // ISO8601
  guestCount: number
  venueAddress: string
  menuPackage: string
  dietaryRequirements: string[]
  setupRequired: boolean
  additionalServices: string[]
}
```

### KOONANG — Digital Services
```typescript
{
  serviceType: 'website' | 'mobile_app' | 'ERP' | 'CRM' | 'POS' | 'ai_automation'
  projectScope: string
  estimatedBudget: number
  timeline: string
  techPreferences?: string[]
  attachmentUrl?: string
}
```

### CREATHINKS — Creative Services
```typescript
{
  serviceType: 'social_media' | 'branding' | 'campaign' | 'merchandise'
  campaignBrief: string
  targetAudience: string
  budget: number
  deadline: string              // ISO8601
  brandAssetsUrl?: string
}
```

---

## 8. Email Notifications

Trigger emails via Resend for the following events:

| Trigger | Recipient | Template |
|---|---|---|
| Booking created | User + Admin | Booking confirmation with details |
| Booking confirmed | User | Booking approved by team |
| Booking cancelled | User | Cancellation confirmation |
| Inquiry submitted | Admin | New inquiry notification |
| Partner registered | Admin | New partner awaiting verification |
| Partner verified | Partner | Welcome to the ecosystem |
| Payment successful | User | Payment receipt |
| Shipment status update | User | CARRY tracking update |

All emails are processed via BullMQ queue to avoid blocking the API response.

---

## 9. Error Handling

All errors must return a consistent JSON shape:

```typescript
// Success
{ success: true, data: T, message?: string }

// Error
{ success: false, error: string, code?: string, details?: any }
```

### HTTP Status Codes
```
200 → OK
201 → Created
400 → Bad Request (validation error)
401 → Unauthorized (not logged in)
403 → Forbidden (wrong role)
404 → Not Found
409 → Conflict (duplicate)
422 → Unprocessable Entity
429 → Rate Limited
500 → Internal Server Error
```

---

## 10. Rate Limiting

| Route Group | Limit |
|---|---|
| Public GET routes | 200 requests / 15 min per IP |
| POST /inquiries | 5 requests / hour per IP |
| POST /bookings | 20 requests / hour per user |
| POST /auth/webhook | No limit (verified by signature) |
| Admin routes | 500 requests / 15 min per user |

---

## 11. Development Phase Roadmap

| Phase | Scope |
|---|---|
| Phase 1 | Project setup, Prisma schema, seed data, platform + services endpoints |
| Phase 2 | Auth (Clerk webhook sync), inquiry endpoints, email notifications |
| Phase 3 | Booking system (Gold Lion, Gold Miles, Tala Bhojana) + payment integration |
| Phase 4 | CARRY logistics (quote, book, track) + PasarX commodities + Meilisearch sync |
| Phase 5 | Partner registration, partner dashboard, admin panel endpoints |
| Phase 6 | KOONANG + Creathinks project/campaign request flows, investor portal |

---

## 12. Agent Instructions

You are a senior backend engineer. Your task is to build the King David Service backend API based on this PRD.

**Before writing any code:**
- Read this entire PRD document
- Read the database schema in the architecture document
- Understand all 7 platforms and their booking JSON shapes in Section 7

**Rules:**
- Use exactly the tech stack defined in Section 2
- Every request body must be validated with Zod before hitting the controller
- Every protected route must go through `requireAuth` middleware
- All responses must follow the consistent JSON shape in Section 9
- Never expose internal Prisma errors to the client — catch and format them
- Use the BullMQ queue for all email sends, never send inline
- Ask before making assumptions about business logic not covered in this PRD
