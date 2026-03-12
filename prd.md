# KING DAVID SERVICE
## Full Stack Technical Architecture
> Frontend • Backend • Database Schema • Folder Structure • Platform Breakdown

---

## 1. Full Stack Overview

The King David Service ecosystem requires a robust, scalable full-stack architecture capable of handling a corporate landing site, multi-platform ecosystem directory, partner dashboards, bookings, logistics data, and future SaaS features.

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js 14 (App Router) | SSR, SEO, multilingual routing, ecosystem pages |
| Styling | Tailwind CSS + Framer Motion | Dark luxury UI, cinematic micro-animations |
| UI Components | shadcn/ui | Accessible, customizable component system |
| Backend API | Node.js + Express | REST API — bookings, inquiries, partner data |
| ORM + DB | PostgreSQL + Prisma | Relational data across all 7 platforms |
| Auth | Clerk (or NextAuth.js) | Multi-role: admin, partner, investor, user |
| CMS | Sanity.io | Insights, news, and ecosystem content |
| Search | Meilisearch | Service discovery across platforms |
| Payments | Stripe + Midtrans | International + Indonesian market |
| Storage | Cloudflare R2 | Partner assets, documents, images |
| Maps | Mapbox | Interactive ecosystem coverage map |
| Email | Resend | Transactional and notification emails |
| Frontend Host | Vercel | Edge deployment, ISR, global CDN |
| Backend Host | Railway / Render | Managed Node.js deployment |

---

## 2. Project Folder Structure

### 2.1 Root Monorepo Layout

The project uses a monorepo pattern to house both the frontend and backend in one repository, with shared types and utilities.

```
king-david-service/
├── apps/
│   ├── web/                  # Next.js 14 frontend
│   └── api/                  # Node.js + Express backend
├── packages/
│   ├── database/             # Prisma schema + migrations
│   ├── types/                # Shared TypeScript types
│   └── utils/                # Shared helper functions
├── .env.example
├── package.json              # Root workspace config
└── turbo.json                # Turborepo build pipeline
```

---

### 2.2 Frontend (apps/web)

```
apps/web/
├── app/                      # Next.js App Router
│   ├── [locale]/             # i18n — /en, /id, /zh
│   │   ├── layout.tsx        # Root layout with nav + footer
│   │   ├── page.tsx          # Homepage
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── ecosystem/
│   │   │   ├── page.tsx      # Ecosystem overview
│   │   │   └── [platform]/   # Dynamic platform pages
│   │   │       └── page.tsx  # e.g. /ecosystem/carry
│   │   ├── insights/
│   │   │   ├── page.tsx      # Blog index
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Article page
│   │   ├── partnership/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   └── api/                  # Next.js API routes (thin proxies)
│       └── contact/
│           └── route.ts
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── layout/               # Navbar, Footer, Sidebar
│   ├── home/                 # Hero, PlatformGrid, EcosystemMap
│   ├── platform/             # PlatformCard, PlatformDetail
│   ├── insights/             # BlogCard, ArticleRenderer
│   └── shared/               # Buttons, Badges, Loaders
├── lib/
│   ├── sanity.ts             # Sanity client + GROQ queries
│   ├── api.ts                # Axios API client
│   ├── i18n.ts               # next-intl config
│   └── mapbox.ts             # Mapbox config
├── public/
│   ├── images/
│   └── fonts/
├── styles/
│   └── globals.css
├── messages/                 # i18n translation files
│   ├── en.json
│   ├── id.json
│   └── zh.json
├── middleware.ts             # i18n + auth middleware
├── next.config.ts
└── tailwind.config.ts
```

---

### 2.3 Backend (apps/api)

```
apps/api/
├── src/
│   ├── index.ts              # Express app entry point
│   ├── config/
│   │   ├── database.ts       # Prisma client singleton
│   │   ├── env.ts            # Zod-validated env vars
│   │   └── cors.ts
│   ├── routes/
│   │   ├── index.ts          # Route aggregator
│   │   ├── platforms.ts      # GET /platforms, GET /platforms/:slug
│   │   ├── bookings.ts       # POST /bookings (Gold Lion, Gold Miles)
│   │   ├── inquiries.ts      # POST /inquiries (partnership, contact)
│   │   ├── partners.ts       # Partner CRUD
│   │   ├── logistics.ts      # CARRY shipment tracking
│   │   └── auth.ts           # JWT + Clerk webhooks
│   ├── controllers/          # Request handlers
│   │   ├── platforms.controller.ts
│   │   ├── bookings.controller.ts
│   │   ├── inquiries.controller.ts
│   │   └── partners.controller.ts
│   ├── services/             # Business logic
│   │   ├── booking.service.ts
│   │   ├── email.service.ts  # Resend integration
│   │   ├── payment.service.ts# Stripe + Midtrans
│   │   └── logistics.service.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── validate.middleware.ts
│   │   └── error.middleware.ts
│   └── types/
│       └── express.d.ts
├── prisma -> packages/database/prisma (symlink)
├── tsconfig.json
└── package.json
```

---

### 2.4 Database Package (packages/database)

```
packages/database/
├── prisma/
│   ├── schema.prisma         # Full database schema
│   └── migrations/           # Migration history
├── src/
│   ├── client.ts             # Prisma client export
│   └── seed.ts               # Seed script for platforms
└── package.json
```

---

## 3. PostgreSQL Database Schema

The schema is organized around the King David ecosystem. Core entities are Users, Platforms, Partners, Bookings, Inquiries, and Logistics.

### 3.1 Core Tables

| Table | Description |
|---|---|
| `users` | All system users — admins, partners, investors, clients |
| `platforms` | The 7 ecosystem platforms (CARRY, KOONANG, etc.) |
| `services` | Individual services under each platform |
| `partners` | Partner businesses registered in the ecosystem |
| `partner_platforms` | Many-to-many: partners linked to platforms |
| `bookings` | Bookings for Gold Lion, Gold Miles, Tala Bhojana |
| `inquiries` | Contact/partnership form submissions |
| `shipments` | CARRY logistics shipment records |
| `commodities` | PasarX commodity listings |
| `projects` | KOONANG digital project requests |
| `campaigns` | Creathinks campaign requests |
| `insights` | Pulled from Sanity CMS via webhook/sync |

---

### 3.2 Prisma Schema

```prisma
// packages/database/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── USERS ──────────────────────────────────────────
model User {
  id        String   @id @default(cuid())
  clerkId   String   @unique
  email     String   @unique
  name      String
  role      Role     @default(CLIENT)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  partner   Partner?
  bookings  Booking[]
  inquiries Inquiry[]
}

enum Role {
  ADMIN
  PARTNER
  INVESTOR
  CLIENT
}

// ─── PLATFORMS ──────────────────────────────────────
model Platform {
  id          String   @id @default(cuid())
  slug        String   @unique  // 'carry', 'koonang', etc.
  name        String
  tagline     String
  description String
  icon        String   // Cloudflare R2 URL
  coverImage  String
  isActive    Boolean  @default(true)
  sortOrder   Int      @default(0)

  services  Service[]
  partners  PartnerPlatform[]
  bookings  Booking[]
}

// ─── SERVICES ───────────────────────────────────────
model Service {
  id          String   @id @default(cuid())
  platformId  String
  name        String
  description String
  price       Float?
  currency    String   @default("IDR")
  isActive    Boolean  @default(true)

  platform Platform @relation(fields: [platformId], references: [id])
  bookings Booking[]
}

// ─── PARTNERS ───────────────────────────────────────
model Partner {
  id          String      @id @default(cuid())
  userId      String      @unique
  companyName String
  logo        String?
  country     String
  tier        PartnerTier @default(BASIC)
  isVerified  Boolean     @default(false)
  createdAt   DateTime    @default(now())

  user      User              @relation(fields: [userId], references: [id])
  platforms PartnerPlatform[]
}

enum PartnerTier {
  BASIC
  PREMIUM
  ENTERPRISE
}

model PartnerPlatform {
  partnerId  String
  platformId String
  joinedAt   DateTime @default(now())

  partner  Partner  @relation(fields: [partnerId], references: [id])
  platform Platform @relation(fields: [platformId], references: [id])

  @@id([partnerId, platformId])
}

// ─── BOOKINGS ───────────────────────────────────────
model Booking {
  id          String        @id @default(cuid())
  userId      String?
  platformId  String
  serviceId   String?
  status      BookingStatus @default(PENDING)
  totalAmount Float
  currency    String        @default("IDR")
  details     Json          // Platform-specific data (see per-platform JSON below)
  paymentRef  String?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  user     User?     @relation(fields: [userId], references: [id])
  platform Platform  @relation(fields: [platformId], references: [id])
  service  Service?  @relation(fields: [serviceId], references: [id])
}

enum BookingStatus {
  PENDING
  CONFIRMED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

// ─── INQUIRIES ──────────────────────────────────────
model Inquiry {
  id        String      @id @default(cuid())
  userId    String?
  type      InquiryType
  name      String
  email     String
  company   String?
  message   String
  status    String      @default("OPEN")
  createdAt DateTime    @default(now())

  user User? @relation(fields: [userId], references: [id])
}

enum InquiryType {
  GENERAL
  PARTNERSHIP
  INVESTOR
  PLATFORM_SPECIFIC
}

// ─── SHIPMENTS (CARRY) ──────────────────────────────
model Shipment {
  id           String         @id @default(cuid())
  trackingCode String         @unique
  type         ShipmentType
  origin       String
  destination  String
  status       ShipmentStatus @default(PROCESSING)
  weight       Float?
  estimatedAt  DateTime?
  deliveredAt  DateTime?
  details      Json
  createdAt    DateTime       @default(now())
}

enum ShipmentType {
  COURIER
  CARGO
  SEA_FREIGHT
  AIR_FREIGHT
  INTERNATIONAL
}

enum ShipmentStatus {
  PROCESSING
  IN_TRANSIT
  CUSTOMS
  DELIVERED
  FAILED
}

// ─── COMMODITIES (PASARX) ───────────────────────────
model Commodity {
  id          String   @id @default(cuid())
  name        String
  category    String   // coffee, spices, agriculture
  origin      String
  pricePerKg  Float
  currency    String   @default("USD")
  available   Float    // kg available
  images      String[]
  description String
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
}
```

---

## 4. Platform-by-Platform Breakdown

### 4.1 KOONANG — Digital Integration Hub

> KOONANG is likely to become the dev arm that builds and maintains the entire KDS ecosystem. Its own platform page should showcase case studies, technology stacks, and client outcomes.

**Key Frontend Components:**
- `ServiceGrid` — displays ERP, CRM, POS, mobile app, AI services
- `CaseStudyCarousel` — showcase past projects
- `ProjectInquiryForm` — collects scoped project briefs

**Key API Endpoints:**

| Endpoint | Description |
|---|---|
| `POST /api/projects/inquire` | Submit a new digital project brief |
| `GET /api/projects/services` | List all KOONANG service types |
| `GET /api/projects/:id` | Get project status (for client portal) |

**Booking `details` JSON shape:**
```json
{
  "serviceType": "ERP | CRM | mobile_app | ai_automation",
  "projectScope": "string",
  "estimatedBudget": 0,
  "timeline": "string",
  "techStack": ["string"],
  "attachmentUrl": "optional string"
}
```

---

### 4.2 CARRY — Logistics Aggregator

> CARRY is the most complex platform technically. It needs real-time shipment tracking, multi-modal logistics (sea, air, courier), and a rate calculator. It will eventually integrate with third-party courier APIs.

**Key Frontend Components:**
- `ShipmentTracker` — real-time tracking input and status timeline
- `RateCalculator` — origin, destination, weight, method → estimated cost
- `LogisticsTypeSelector` — Courier / Cargo / Sea / Air / International

**Key API Endpoints:**

| Endpoint | Description |
|---|---|
| `POST /api/logistics/quote` | Get shipping quote based on params |
| `POST /api/logistics/book` | Create a shipment booking |
| `GET /api/logistics/track/:code` | Track shipment by tracking code |
| `GET /api/logistics/shipments` | List user's shipments (auth required) |

**Third-party Integrations (Phase 2):**
- JNE / TIKI / SiCepat — Indonesian domestic courier APIs
- DHL / FedEx — international freight APIs
- Pelni / SPIL — sea freight tracking

---

### 4.3 GOLD LION — Premium Transportation

> Gold Lion is a booking-first platform. Core flow: select vehicle → choose date/time → confirm booking → payment. Similar to a luxury Grab/Uber but with fixed corporate/VIP pricing.

**Key Frontend Components:**
- `VehicleFleetGrid` — luxury vehicle cards with specs and pricing
- `BookingWizard` — multi-step: vehicle → route → datetime → passenger details → payment
- `DriverProfileCard` — photo, rating, languages spoken

**Booking `details` JSON shape:**
```json
{
  "vehicleType": "sedan | suv | limousine | van",
  "pickupAddress": "string",
  "dropoffAddress": "string",
  "pickupDatetime": "ISO8601 string",
  "passengerCount": 0,
  "driverNote": "optional string",
  "isRoundTrip": false,
  "corporateAccountId": "optional string"
}
```

---

### 4.4 PASARX — Commodity Trading

> PasarX is closest to an e-commerce/marketplace. It needs product listings, search/filter by category and origin, and a B2B inquiry/order flow for global buyers.

**Key Frontend Components:**
- `CommodityMarketplace` — grid with filter by category, origin, price
- `ProductDetailPage` — specs, pricing, availability, seller info
- `BuyerInquiryForm` — send RFQ (Request for Quote) to seller

**Meilisearch index config:**
```json
{
  "indexName": "commodities",
  "searchableAttributes": ["name", "category", "origin", "description"],
  "filterableAttributes": ["category", "origin", "isActive", "currency"],
  "sortableAttributes": ["pricePerKg", "available", "createdAt"]
}
```

---

### 4.5 GOLD MILES — Premium Travel

> Handles luxury travel packages, corporate travel, business trips, events, and immigration assistance.

| Feature | Implementation |
|---|---|
| Travel Package Listings | Fetched from Sanity CMS (rich content + images) |
| Custom Trip Builder | Multi-step form → Inquiry → Manual quote |
| Corporate Travel Portal | Partner dashboard with travel budget tracking |
| Immigration Assistance | Inquiry form → case tracking in admin |
| Corporate Events | Event booking with venue, catering, transport bundled |

---

### 4.6 CREATHINKS — Digital Marketing & Creative

> Service-catalog style platform. Clients browse service packages, view portfolio work, and submit project briefs.

**Key Frontend Components:**
- `PortfolioGallery` — filterable by type (social media, branding, merchandise)
- `ServicePackageCards` — with pricing tiers (Basic / Pro / Enterprise)
- `BriefSubmissionForm` — campaign type, budget, timeline, brand assets upload

---

### 4.7 TALA BHOJANA — Catering Aggregator

> Event-based catering bookings. Needs date-based availability, headcount pricing, and menu selection.

**Booking `details` JSON shape:**
```json
{
  "eventType": "wedding | corporate | event | premium_dining",
  "eventDate": "ISO8601 string",
  "guestCount": 0,
  "venueAddress": "string",
  "menuPackage": "string",
  "dietaryRequirements": ["string"],
  "setupRequired": false,
  "additionalServices": ["string"]
}
```

---

## 5. API Architecture & Auth Flow

### 5.1 REST API Structure

| Route Prefix | Scope |
|---|---|
| `/api/platforms` | Platform listing, detail, services |
| `/api/bookings` | Create, read, update bookings (auth) |
| `/api/inquiries` | Contact, partnership, investor forms |
| `/api/logistics` | CARRY: quote, book, track |
| `/api/commodities` | PasarX: listings, search, RFQ |
| `/api/partners` | Partner CRUD, dashboard data (auth) |
| `/api/auth` | Clerk webhook sync, token verify |
| `/api/admin` | Admin dashboard (ADMIN role only) |

---

### 5.2 Authentication Flow (Clerk)

Clerk handles all auth UI and session management. The backend verifies JWTs from Clerk on protected routes.

```typescript
// auth.middleware.ts
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

export const requireAuth = ClerkExpressRequireAuth();

export const requireRole = (roles: Role[]) => async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: { clerkId: req.auth.userId }
  });
  if (!user || !roles.includes(user.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  req.dbUser = user;
  next();
};
```

---

## 6. Environment Variables

| Variable | Service / Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `CLERK_SECRET_KEY` | Clerk backend authentication |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk frontend |
| `STRIPE_SECRET_KEY` | Stripe payments (international) |
| `MIDTRANS_SERVER_KEY` | Midtrans payments (Indonesia) |
| `SANITY_PROJECT_ID` | Sanity CMS project |
| `SANITY_TOKEN` | Sanity read token |
| `MEILISEARCH_HOST` | Meilisearch instance URL |
| `MEILISEARCH_API_KEY` | Meilisearch admin key |
| `CLOUDFLARE_R2_BUCKET` | R2 storage bucket name |
| `CLOUDFLARE_R2_ACCESS_KEY` | R2 access credentials |
| `RESEND_API_KEY` | Resend transactional email |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox public token |

---

## 7. Development Phase Roadmap

| Phase | Scope | Timeline Estimate |
|---|---|---|
| Phase 1 | Corporate site — Home, About, Ecosystem overview, Contact, basic CMS | 4–6 weeks |
| Phase 2 | Platform pages, multilingual (EN + ID), partner directory, Insights blog | 4–5 weeks |
| Phase 3 | Booking flows (Gold Lion, Gold Miles, Tala Bhojana), payment integration | 5–6 weeks |
| Phase 4 | CARRY logistics — quote, book, track. PasarX commodity marketplace | 5–6 weeks |
| Phase 5 | Partner dashboard, admin panel, SaaS accounts, affiliate tracking | 6–8 weeks |
| Phase 6 | Full API ecosystem, third-party courier integrations, investor portal | Ongoing |

---

> **Recommended Next Step:** Scaffold the Next.js 14 monorepo with Turborepo, set up the Prisma schema with seed data for all 7 platforms, and build the homepage with the ecosystem platform grid. Once the frontend shell is solid, layer in API endpoints platform by platform.
