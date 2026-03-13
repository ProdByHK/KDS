# Product Requirements Document — Fix Version 2.0
## King David Service Website — Frontend Only

**Version:** 2.2  
**Date:** March 13, 2026  
**Status:** Active  
**Scope:** Frontend Only — No backend, no API, no database  
**Based On:** Live site audit — https://kds-three-henna.vercel.app/en  

---

## 1. Overview

This PRD is a focused fix document based on a live re-audit of the King David Service website. All 7 issues listed below are **currently broken or incomplete** on the live site as of March 13, 2026. Every fix in this document is **frontend-only** — no backend or API work is required.

---

## 2. Broken Issues — Fix Requirements

---

### 🔴 FR-01 — Hero Headline Renders Literal `<br/>` Tag

**Page:** Homepage (`/en`)  
**Problem:** The hero title displays the raw HTML string `<br/>` as visible text instead of rendering a line break. This is the first thing every visitor sees.  
**Root Cause:** The `<br/>` tag is likely inside a plain string in a JSON/translation file or a template literal instead of JSX.

**Frontend Fix:**
```jsx
// ❌ WRONG — renders as plain text
<h1>{"Elevating <br/> Corporate Standards"}</h1>

// ✅ CORRECT — use JSX line break
<h1>
  Elevating <br />
  Corporate Standards
</h1>

// ✅ ALTERNATIVE — use two spans
<h1>
  <span className="block">Elevating</span>
  <span className="block">Corporate Standards</span>
</h1>
```

**Files to check:**
- `app/[locale]/page.tsx` — hero section
- Any i18n translation JSON files (e.g. `messages/en.json`) — remove `<br/>` from string values and handle in JSX

**Acceptance Criteria:**
- [ ] Hero displays "Elevating" and "Corporate Standards" on two lines
- [ ] No visible HTML tags appear anywhere in the hero
- [ ] Renders correctly on mobile and desktop

---

### 🔴 FR-02 — About Page Has No Content

**Page:** About (`/en/about`)  
**Problem:** The About page contains only one sentence and then jumps straight to the footer. Enterprise clients always visit the About page before reaching out — an empty page destroys credibility.

**Frontend Fix:** Build out the following 4 sections using placeholder content. Add `{/* TODO: Replace with real content */}` comments throughout.

**Section 1 — Company Story**
```jsx
<section>
  <h2>Our Story</h2>
  <p>
    Founded with a vision to redefine corporate services in Southeast Asia,
    King David Service was built on the belief that enterprise clients
    deserve a seamlessly integrated partner — one that handles logistics,
    technology, hospitality, and trading under a single, trusted roof.
    {/* TODO: Replace with real founding story */}
  </p>
</section>
```

**Section 2 — Mission & Vision**
```jsx
<section>
  <div>
    <h3>Our Mission</h3>
    <p>To elevate corporate standards by delivering integrated,
    world-class services that solve complex business challenges
    with precision and excellence.</p>
    {/* TODO: Replace with real mission statement */}
  </div>
  <div>
    <h3>Our Vision</h3>
    <p>To become the most trusted ecosystem partner for enterprise
    corporations across Asia and beyond.</p>
    {/* TODO: Replace with real vision statement */}
  </div>
</section>
```

**Section 3 — Leadership Team**
```jsx
// Use placeholder avatar (gray circle with initials)
// Layout: 3-column grid on desktop, 1-column on mobile
<section>
  <h2>Our Leadership</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {leaders.map(leader => (
      <div key={leader.name}>
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <span>{leader.initials}</span>
        </div>
        <h4>{leader.name}</h4>
        <p>{leader.title}</p>
      </div>
    ))}
  </div>
  {/* TODO: Replace placeholder data with real team photos and bios */}
</section>
```

**Section 4 — Core Values**
```jsx
// 3–4 value cards with icon + title + description
// Use lucide-react icons (no new dependencies needed)
```

**Acceptance Criteria:**
- [ ] About page has minimum 4 distinct sections
- [ ] All sections are responsive (mobile + desktop)
- [ ] No section is empty or shows only a heading
- [ ] TODO comments mark all placeholder content

---

### 🔴 FR-03 — Insight Articles Link to Listing Page Instead of Detail Page

**Page:** Homepage (`/en`) and Insights listing (`/en/insights`)  
**Problem:** Both article cards use `href="/en/insights"` — clicking an article just reloads the listing page. Users cannot read any article.

**Frontend Fix — Part A: Update article card links**
```jsx
// ❌ WRONG
<Link href="/en/insights">

// ✅ CORRECT — use article slug
<Link href={`/en/insights/${article.slug}`}>
```

**Frontend Fix — Part B: Create article detail page**

Create file: `app/[locale]/insights/[slug]/page.tsx`

```tsx
// Minimum required sections on the detail page:
// 1. Back button → /en/insights
// 2. Category tag + publish date
// 3. Article title (h1)
// 4. Author name
// 5. Article body content
// 6. Related articles section (2 cards)

export default function InsightDetailPage({ params }) {
  // TODO: Replace with real data fetching
  return (
    <article>
      <Link href="/en/insights">← Back to Insights</Link>
      <span>{article.category}</span>
      <span>{article.date}</span>
      <h1>{article.title}</h1>
      <p>By {article.author}</p>
      <div>{article.body}</div>
    </article>
  )
}
```

**Acceptance Criteria:**
- [ ] Each article card links to `/en/insights/[slug]`
- [ ] Detail page renders without errors
- [ ] Back button navigates to `/en/insights`
- [ ] Detail page shows: category, date, title, author, body

---

### 🔴 FR-04 — Duplicate Article Descriptions

**Page:** Homepage Insights section + `/en/insights` listing  
**Problem:** Both articles share the exact same description: *"Analysis and strategic perspectives from the King David proprietary intelligence division on global market shifts."*

**Frontend Fix:** Replace with unique placeholder descriptions per article.

```jsx
// Article 1 — Logistics
description: "A deep dive into how multi-modal freight is reshaping 
supply chain strategy across Indonesia, Malaysia, and Vietnam — 
and what enterprise shippers must prepare for in 2026."

// Article 2 — Technology  
description: "Legacy enterprise systems don't have to be a liability. 
This piece explores practical AI integration strategies that deliver 
ROI without requiring a full infrastructure overhaul."

// TODO: Replace with real editorial content
```

**Also fix:** Update article dates to non-future dates:
- Article 1: `February 18, 2026` (was Oct 24, 2026)
- Article 2: `January 30, 2026` (was Oct 18, 2026)

**Acceptance Criteria:**
- [ ] No two articles share the same description text
- [ ] All article dates are in the past (before March 13, 2026)

---

### 🟠 FR-05 — Investor Deck Form Has No Input Fields

**Page:** Homepage — Investor Relations section  
**Problem:** The "Request Investor Deck" section shows a "Submit Request" button but has no visible form fields. Users cannot actually submit a request.

**Frontend Fix:** Add a form with client-side state only — no backend required.

```tsx
"use client"
import { useState } from "react"

export function InvestorDeckForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "" })
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle")

  const handleSubmit = () => {
    // Validate
    if (!form.name || !form.email || !form.company) return
    if (!/\S+@\S+\.\S+/.test(form.email)) return

    // Simulate submission (no backend needed)
    setStatus("loading")
    setTimeout(() => setStatus("success"), 1200)
    // TODO: Wire up to real backend or email service later
  }

  if (status === "success") {
    return <p>✅ Thank you! We'll send your investor deck within 24 hours.</p>
  }

  return (
    <div>
      <input placeholder="Full Name" value={form.name}
        onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Work Email" value={form.email}
        onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Company Name" value={form.company}
        onChange={e => setForm({...form, company: e.target.value})} />
      <button onClick={handleSubmit} disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Submit Request"}
      </button>
    </div>
  )
}
```

**Acceptance Criteria:**
- [ ] Form shows: Full Name, Work Email, Company Name fields
- [ ] Submit button is disabled while loading
- [ ] Success message appears after simulated submission
- [ ] No backend or API call is made

---

### 🟠 FR-06 — Partner Logos Are Single-Letter Placeholders

**Page:** Homepage — Partner Ecosystem section  
**Problem:** Each partner shows only a single letter (G, O, T, L, A, P) in a circle. For a premium brand targeting enterprise clients, this looks unprofessional.

**Frontend Fix:** Replace letter circles with styled placeholder cards showing full name + category badge + generic icon.

```tsx
// Use lucide-react for icons — no new dependencies needed
import { Building2, Ship, Cpu, Car, Wheat, Hotel } from "lucide-react"

const partners = [
  { name: "Global Bank Corp",   category: "Strategic",    icon: Building2 },
  { name: "Ocean Freight Ltd",  category: "Logistics",    icon: Ship      },
  { name: "Tech Innovators",    category: "Technology",   icon: Cpu       },
  { name: "Luxury Motors",      category: "Transport",    icon: Car       },
  { name: "AgriTrade Global",   category: "Commodities",  icon: Wheat     },
  { name: "Premium Hotels",     category: "Hospitality",  icon: Hotel     },
]

// Render each as a card with: icon + full name + category tag
// TODO: Replace with real partner logos when available
```

**Acceptance Criteria:**
- [ ] No single-letter circles visible
- [ ] Each partner card shows: icon, full name, category tag
- [ ] Cards are consistent in size and style
- [ ] TODO comment marks where real logos should go

---

### 🟠 FR-07 — Footer Missing 3 Ecosystem Platforms

**Page:** All pages (Footer component)  
**Problem:** Footer Ecosystem section lists only 4 of 7 platforms. Gold Miles, Creathinks, and Tala Bhojana are missing — this creates a broken, inconsistent experience.

**Frontend Fix:** Add the 3 missing platforms to the footer Ecosystem links.

```tsx
// Current footer (incomplete):
const ecosystemLinks = [
  { label: "Koonang Digital",  href: "/en/ecosystem/koonang"   },
  { label: "Carry Logistics",  href: "/en/ecosystem/carry"     },
  { label: "Gold Lion Premium",href: "/en/ecosystem/gold-lion" },
  { label: "PasarX Commodities",href: "/en/ecosystem/pasarx"  },
]

// ✅ Fixed footer (all 7 platforms):
const ecosystemLinks = [
  { label: "Koonang Digital",   href: "/en/ecosystem/koonang"      },
  { label: "Carry Logistics",   href: "/en/ecosystem/carry"        },
  { label: "Gold Lion Premium", href: "/en/ecosystem/gold-lion"    },
  { label: "PasarX Commodities",href: "/en/ecosystem/pasarx"      },
  { label: "Gold Miles Travel", href: "/en/ecosystem/gold-miles"   }, // ← ADD
  { label: "Creathinks Agency", href: "/en/ecosystem/creathinks"   }, // ← ADD
  { label: "Tala Bhojana F&B",  href: "/en/ecosystem/tala-bhojana"}, // ← ADD
]
```

**Acceptance Criteria:**
- [ ] Footer Ecosystem section shows all 7 platform links
- [ ] All 7 links are valid and navigate to correct pages
- [ ] Footer layout remains consistent on mobile and desktop

---

## 3. Imagery Requirements — Contextual Visuals

> **Goal:** Every major content section must include imagery that is contextually aligned with its text — creating a cohesive, professional, and visually rich narrative for enterprise visitors.

All images must use **Next.js `<Image />`** component with proper `alt`, `width`, `height`, and `placeholder="blur"`. For sections without real assets yet, use **Unsplash Source URLs** as temporary placeholders — they are free, high-quality, and contextually searchable.

```tsx
// Standard image pattern for all sections
import Image from "next/image"

<Image
  src="https://images.unsplash.com/photo-[ID]?auto=format&fit=crop&w=800&q=80"
  alt="Descriptive alt text"
  width={800}
  height={500}
  className="rounded-2xl object-cover w-full"
  // TODO: Replace with real brand photography
/>
```

---

### IMG-01 — Insights Section (Homepage + `/en/insights`)

Each article card must include a **cover image** that visually represents the article topic. The image should sit above the title with a subtle dark gradient overlay to keep text readable.

**Article 1 — "The Future of Multi-Modal Freight in SE Asia"**
```tsx
// Contextual theme: logistics, shipping, freight, Southeast Asia ports
src="https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=800&q=80"
alt="Container ships at a Southeast Asian port at dusk"

// Overlay for text readability:
<div className="relative overflow-hidden rounded-t-2xl h-48">
  <Image src={...} alt={...} fill className="object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
</div>
```

**Article 2 — "AI Integration Strategies for Legacy Enterprise"**
```tsx
// Contextual theme: technology, AI, data, enterprise systems
src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80"
alt="Abstract AI neural network visualization on dark background"
```

**Insight Detail Page (`/en/insights/[slug]`)**
```tsx
// Full-width hero banner image at top of article
// 16:9 ratio, full width, with title overlaid on dark gradient
<div className="relative w-full h-[420px]">
  <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
  <div className="absolute bottom-8 left-8 right-8">
    <span className="category-tag">{article.category}</span>
    <h1 className="text-white text-4xl font-bold mt-2">{article.title}</h1>
  </div>
</div>
```

**Acceptance Criteria:**
- [ ] Every article card has a unique, contextually relevant cover image
- [ ] Images do not stretch or distort — `object-cover` applied
- [ ] Text overlaid on images has a dark gradient for readability
- [ ] Article detail page has a full-width banner image

---

### IMG-02 — Platform Cards Section (Homepage + `/en/ecosystem`)

Each of the 7 platform cards must include a **background or thumbnail image** that visually represents the platform's industry. Apply a glass overlay on top so the card text remains premium and legible.

```tsx
// Pattern: image as card background + glass overlay
<div className="relative overflow-hidden rounded-2xl h-64 group">

  {/* Background image */}
  <Image src={platform.image} alt={platform.name} fill className="object-cover
    group-hover:scale-105 transition-transform duration-500" />

  {/* Glass overlay */}
  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]
                  group-hover:bg-black/40 transition-all duration-300" />

  {/* Card content */}
  <div className="absolute inset-0 p-6 flex flex-col justify-end">
    <span className="text-amber-400 text-xs uppercase tracking-widest">
      {platform.category}
    </span>
    <h3 className="text-white text-xl font-bold mt-1">{platform.name}</h3>
    <p className="text-white/70 text-sm mt-2">{platform.description}</p>
  </div>
</div>
```

**Platform Image Map — Unsplash Placeholders:**

| Platform | Theme | Suggested Search Term |
|---|---|---|
| KOONANG | Enterprise tech, code, dashboards | `"enterprise software dark"` |
| CARRY | Shipping, logistics, freight, warehouses | `"logistics shipping containers"` |
| GOLD LION | Luxury cars, VIP transport, limousines | `"luxury car vip black"` |
| PASARX | Commodities, agriculture, trading floors | `"commodity trading coffee spices"` |
| GOLD MILES | Business travel, airports, premium hotels | `"business travel airport lounge"` |
| CREATHINKS | Creative agency, design, branding | `"creative agency branding studio"` |
| TALA BHOJANA | Premium dining, catering, corporate food | `"corporate catering fine dining"` |

```tsx
// TODO: Replace all Unsplash URLs with real KDS brand photography per platform
const platforms = [
  {
    name: "KOONANG",
    category: "Digital Integration",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    // dark tech/server room visual
  },
  {
    name: "CARRY",
    category: "Logistics & Supply Chain",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    // shipping containers port
  },
  {
    name: "GOLD LION",
    category: "Transportation",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    // luxury black car
  },
  {
    name: "PASARX",
    category: "Commodity Trading",
    image: "https://images.unsplash.com/photo-1595665593673-bf1ad72905c0?auto=format&fit=crop&w=800&q=80",
    // coffee/spice commodities
  },
  {
    name: "GOLD MILES",
    category: "Travel & Hospitality",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    // airport / business travel
  },
  {
    name: "CREATHINKS",
    category: "Creative & Marketing",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    // design / branding studio
  },
  {
    name: "TALA BHOJANA",
    category: "Food & Beverage",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    // premium corporate catering
  },
]
```

**Acceptance Criteria:**
- [ ] All 7 platform cards display a unique, industry-relevant background image
- [ ] Glass overlay is applied over each image so text is legible
- [ ] Cards have a subtle zoom effect on hover (`group-hover:scale-105`)
- [ ] Images render correctly on mobile (stacked) and desktop (grid)

---

### IMG-03 — Selected Portfolio Section (Homepage)

Each of the 3 portfolio cards must include a **project preview image** — a mockup, screenshot, or representative visual that shows the type of work delivered.

```tsx
// Pattern: image fills card top half, content fills bottom half
<div className="glass rounded-2xl overflow-hidden group">

  {/* Project image — top half */}
  <div className="relative h-52 overflow-hidden">
    <Image
      src={project.image}
      alt={`${project.title} project preview`}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-500"
    />
    {/* Sector badge overlaid on image */}
    <span className="absolute top-4 left-4 px-3 py-1 rounded-full
                     bg-black/50 backdrop-blur-sm text-amber-400
                     text-xs uppercase tracking-widest">
      {project.sector}
    </span>
  </div>

  {/* Project content — bottom half */}
  <div className="p-6">
    <h3 className="text-white text-lg font-bold">{project.title}</h3>
    <p className="text-white/60 text-sm mt-2">{project.description}</p>
    <button className="mt-4 text-amber-400 text-sm hover:underline">
      View Project →
    </button>
  </div>
</div>
```

**Portfolio Image Map:**

| Project | Sector | Image Theme | Suggested Unsplash Term |
|---|---|---|---|
| National Logistics Hub | Gov Sector | Government building, data center, national infrastructure | `"government data center infrastructure"` |
| Premium Fintech App | Banking Sector | Mobile banking UI, financial dashboard, fintech | `"fintech mobile banking app dark"` |
| Enterprise Resource Dashboard | Mining Corp | Mining operations, industrial dashboard, resource management | `"mining operations industrial dashboard"` |

```tsx
// TODO: Replace with real project screenshots or mockups
const portfolio = [
  {
    title: "National Logistics Hub",
    sector: "Gov Sector",
    description: "A centralized logistics management platform built for a national government agency, handling fleet tracking, inventory, and real-time shipment visibility.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Premium Fintech App",
    sector: "Banking Sector",
    description: "A white-label mobile banking application delivering premium UX for a regional bank's high-net-worth clientele, with real-time portfolio and transaction tools.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Enterprise Resource Dashboard",
    sector: "Mining Corp",
    description: "A real-time ERP dashboard integrating field operations, procurement, and supply chain data for a large-scale mining corporation across 3 sites.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
]
```

**Acceptance Criteria:**
- [ ] All 3 portfolio cards display a unique, sector-relevant project image
- [ ] Each card includes: sector badge, project title, description, and View Project button
- [ ] Hover zoom applied to all project images
- [ ] Cards use the GlassCard component from DS-03

---

### IMG-04 — Market Insights Section (Homepage)

The homepage Market Insights preview section (showing 2 article teasers) must display **thumbnail images** alongside each article — consistent with how the full Insights page renders cards.

```tsx
// Compact horizontal card layout for homepage teaser
<div className="glass rounded-2xl overflow-hidden flex flex-col md:flex-row group">

  {/* Thumbnail — left on desktop, top on mobile */}
  <div className="relative w-full md:w-48 h-40 md:h-auto flex-shrink-0">
    <Image
      src={article.image}
      alt={article.title}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-500"
    />
  </div>

  {/* Article content — right side */}
  <div className="p-5 flex flex-col justify-between">
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-amber-400 text-xs uppercase tracking-widest">
          {article.category}
        </span>
        <span className="text-white/30 text-xs">{article.date}</span>
      </div>
      <h3 className="text-white font-semibold text-base leading-snug">
        {article.title}
      </h3>
      <p className="text-white/50 text-sm mt-2 line-clamp-2">
        {article.description}
      </p>
    </div>
    <Link href={`/en/insights/${article.slug}`}
          className="text-amber-400 text-sm mt-3 hover:underline self-start">
      Read Article →
    </Link>
  </div>
</div>
```

**Acceptance Criteria:**
- [ ] Both homepage article teasers display a contextual thumbnail image
- [ ] Thumbnail is left-aligned on desktop, stacked on top on mobile
- [ ] Images match the article topic (logistics / AI/tech)
- [ ] "Read Article →" link goes to the correct detail page slug

---

### IMG-05 — Image Technical Standards

All images across the site must follow these technical rules:

| Rule | Requirement |
|---|---|
| Component | Always use `next/image` — never `<img>` tags |
| Alt text | Descriptive, unique, context-specific for every image |
| Object fit | `object-cover` for all card/banner images |
| Aspect ratio | Cards: 16:9 · Thumbnails: 4:3 · Hero/Banner: 21:9 |
| Max width | Compress to max 800px wide for card images, 1400px for banners |
| Placeholder | Use `placeholder="blur"` with `blurDataURL` on all images |
| Performance | Add `priority` prop only to above-the-fold images (hero) |
| TODO marker | Every Unsplash URL must have `// TODO: Replace with real brand photography` |

---

## 4. Design System — Glassmorphism Theme

King David Service will adopt a **Glassmorphism** visual style to reinforce its premium, enterprise-grade identity. This is applied on top of the existing dark background — no full redesign required.

> **Why Glassmorphism and not Liquid Glass?**
> Liquid Glass is playful and consumer-facing (think iOS apps). Glassmorphism is refined, corporate, and trusted by premium fintech and luxury SaaS brands. It fits KDS's "discerning clientele" positioning perfectly.

---

### DS-01 — Core Glass Token (Tailwind + CSS)

Add to your `globals.css` or a dedicated `glass.css` file:

```css
/* globals.css */
:root {
  --glass-bg:      rgba(255, 255, 255, 0.06);
  --glass-border:  rgba(255, 255, 255, 0.12);
  --glass-shadow:  0 8px 32px rgba(0, 0, 0, 0.36);
  --glass-blur:    blur(16px);
  --glass-radius:  16px;

  /* Accent glow — use KDS gold/amber if brand color exists */
  --glass-glow:    rgba(212, 175, 100, 0.15);
}

.glass {
  background:           var(--glass-bg);
  backdrop-filter:      var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border:               1px solid var(--glass-border);
  border-radius:        var(--glass-radius);
  box-shadow:           var(--glass-shadow);
}

.glass-hover {
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
.glass-hover:hover {
  background:  rgba(255, 255, 255, 0.10);
  box-shadow:  0 8px 40px var(--glass-glow);
}
```

Add to `tailwind.config.ts` for utility access:
```js
theme: {
  extend: {
    backdropBlur: { glass: '16px' },
    backgroundColor: {
      glass: 'rgba(255, 255, 255, 0.06)',
    },
    borderColor: {
      glass: 'rgba(255, 255, 255, 0.12)',
    }
  }
}
```

---

### DS-02 — Animated Background (Hero)

Replace the static hero background with a soft animated gradient to give the site a "living" premium feel:

```tsx
// components/GlassBackground.tsx
export function GlassBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base dark layer */}
      <div className="absolute inset-0 bg-[#080c14]" />

      {/* Animated gradient blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px]
                      rounded-full opacity-20 blur-[120px] animate-pulse
                      bg-gradient-to-br from-amber-600 to-yellow-400" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px]
                      rounded-full opacity-15 blur-[100px] animate-pulse
                      bg-gradient-to-br from-blue-800 to-indigo-600
                      [animation-delay:2s]" />
      <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px]
                      rounded-full opacity-10 blur-[80px] animate-pulse
                      bg-gradient-to-br from-amber-400 to-orange-600
                      [animation-delay:4s]" />
    </div>
  )
}
```

---

### DS-03 — Glass Card Component

Reusable glass card to apply to: platform cards, partner cards, portfolio cards, stat counters, and the investor form.

```tsx
// components/ui/GlassCard.tsx
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export function GlassCard({ children, className, hover = true, glow = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6",
        hover && "glass-hover cursor-pointer",
        glow && "ring-1 ring-amber-400/20",
        className
      )}
    >
      {children}
    </div>
  )
}
```

---

### DS-04 — Glass Navbar

Update the existing navbar to use the glass style:

```tsx
<nav className="fixed top-0 w-full z-50
                bg-white/5 backdrop-blur-xl
                border-b border-white/10
                shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
  {/* existing nav content */}
</nav>
```

---

### DS-05 — Apply Glass to These Components (Priority Order)

| # | Component | Where | Effect |
|---|---|---|---|
| 1 | Navbar | All pages | Frosted glass bar, always visible |
| 2 | Platform cards | Homepage + Ecosystem | Glass card with hover glow |
| 3 | Partner cards | Homepage | Glass card replacing letter circles |
| 4 | Stat counters | Homepage + Investor section | Glass pill with gold accent border |
| 5 | Investor form | Homepage | Glass panel, inputs with glass bg |
| 6 | Portfolio cards | Homepage | Glass card with gradient overlay |
| 7 | Article cards | Insights page | Glass card with category tag glow |
| 8 | About sections | About page | Glass panels for each section |
| 9 | Contact form | Contact page | Full glass form panel |
| 10 | Footer | All pages | Subtle glass top border separator |

---

### DS-06 — Glass Input Fields

All form inputs (Contact, Investor Deck) should use glass styling:

```tsx
<input
  className="w-full px-4 py-3 rounded-xl
             bg-white/5 border border-white/10
             text-white placeholder-white/40
             backdrop-blur-sm
             focus:outline-none focus:border-amber-400/50
             focus:bg-white/8 focus:ring-1 focus:ring-amber-400/30
             transition-all duration-300"
  placeholder="Full Name"
/>
```

---

### DS-07 — Glass Rules & Don'ts

| ✅ DO | ❌ DON'T |
|---|---|
| Use `backdrop-blur` on dark backgrounds | Apply glass on white/light backgrounds |
| Keep blur between 12px–20px | Use blur over 24px (too heavy) |
| Use subtle gold glow on hover | Use bright neon glows |
| Keep glass bg opacity 5%–10% | Go above 15% opacity (loses effect) |
| Animate with `transition` only | Add heavy keyframe animations to glass |
| Test on Safari (needs `-webkit-backdrop-filter`) | Forget the `-webkit-` prefix |

---

### DS-08 — Updated Ground Rules (with Glassmorphism)

Add to Section 4 Frontend Ground Rules:
- ✅ Use `backdrop-blur` and `bg-white/[x]` Tailwind utilities for all glass effects
- ✅ Always include `-webkit-backdrop-filter` for Safari support
- ✅ Glass components must remain readable — text contrast ratio ≥ 4.5:1
- ✅ All glass animations use `transition` only — no heavy keyframes
- ✅ Test glassmorphism on: Chrome, Safari, Firefox, and mobile Safari

---

## 5. Implementation Order

Work through fixes in this exact order — bugs first, then imagery, then glassmorphism:

| # | ID | Fix | Est. Effort |
|---|---|---|---|
| 1 | FR-01 | Hero `<br/>` tag | ~15 min |
| 2 | FR-07 | Footer missing platforms | ~10 min |
| 3 | FR-04 | Duplicate article descriptions + dates | ~15 min |
| 4 | FR-03 | Article links + detail page | ~45 min |
| 5 | FR-05 | Investor Deck form fields | ~30 min |
| 6 | FR-06 | Partner logo cards | ~30 min |
| 7 | FR-02 | About page content sections | ~60 min |
| 8 | IMG-01 | Imagery — Insights section + detail page | ~30 min |
| 9 | IMG-02 | Imagery — Platform cards (all 7) | ~30 min |
| 10 | IMG-03 | Imagery — Selected Portfolio (all 3) | ~25 min |
| 11 | IMG-04 | Imagery — Market Insights homepage teasers | ~20 min |
| 12 | DS-01 | Add glass CSS tokens + Tailwind config | ~15 min |
| 13 | DS-02 | Animated background blobs (hero) | ~20 min |
| 14 | DS-03/04 | GlassCard + Glass Navbar components | ~30 min |
| 15 | DS-05 | Apply glass to all 10 components | ~60 min |
| 16 | DS-06 | Glass input fields on all forms | ~20 min |

**Total estimated frontend effort: ~7 hours**

---

## 6. Frontend Ground Rules

- ✅ Use only Next.js, Tailwind CSS, TypeScript, and lucide-react
- ✅ All form interactions use React `useState` — no backend calls
- ✅ All placeholder content must have `{/* TODO: Replace with real content */}` comments
- ✅ All new sections must be responsive: mobile-first with Tailwind breakpoints
- ✅ Do NOT install new npm packages unless absolutely necessary
- ✅ Do NOT modify any existing API routes, server actions, or database files
- ✅ Use `next/image` with `width`, `height`, and `alt` for all images
- ✅ Use `next/link` for all internal navigation

---

## 7. Acceptance Checklist (Sign-off)

Before marking this PRD complete, verify all of the following on the live deployed site:

**Bug Fixes**
- [ ] FR-01: Hero title shows no `<br/>` text
- [ ] FR-02: About page has 4+ visible content sections
- [ ] FR-03: Clicking an article navigates to a detail page at `/en/insights/[slug]`
- [ ] FR-04: Both articles have unique descriptions and past-dated dates
- [ ] FR-05: Investor Deck form shows 3 input fields and a success message on submit
- [ ] FR-06: Partner section shows full name cards, not single letters
- [ ] FR-07: Footer shows all 7 ecosystem platform links

**Imagery**
- [ ] IMG-01: Every insight article card has a unique, contextually relevant cover image
- [ ] IMG-01: Insight detail page has a full-width banner image with title overlay
- [ ] IMG-02: All 7 platform cards show a unique industry-relevant background image
- [ ] IMG-02: Platform card images have glass overlay — text is legible
- [ ] IMG-03: All 3 portfolio cards show a sector-relevant project preview image
- [ ] IMG-03: Each portfolio card has sector badge, description, and View Project button
- [ ] IMG-04: Both homepage Market Insight teasers show contextual thumbnail images
- [ ] IMG-05: All images use `next/image`, have descriptive `alt` text, and `object-cover`

**Glassmorphism**
- [ ] DS: Navbar has glass frosted effect on all pages
- [ ] DS: All platform, partner, and portfolio cards use GlassCard component
- [ ] DS: Hero has animated gradient background blobs
- [ ] DS: All form inputs have glass styling with gold focus ring
- [ ] DS: Glassmorphism renders correctly on Chrome, Safari, and mobile

---

*End of Document — PRD Fix v2.2*
