# Product Requirements Document (PRD)
## King David Service Website — kds-three-henna.vercel.app

**Version:** 1.0  
**Date:** March 13, 2026  
**Status:** Draft  
**Prepared By:** User Testing Review  

---

## 1. Overview

King David Service (KDS) is a premier integrated ecosystem of luxury services, enterprise technology, global logistics, and commodity trading. The website serves as the primary digital presence for the brand, targeting discerning corporate clientele, enterprise partners, and investors.

The goal of this PRD is to define the requirements needed to bring the website to a production-ready, credibility-grade standard — fixing critical bugs, completing unfinished content sections, and improving overall user experience.

---

## 2. Objectives

- Establish the website as a trustworthy, polished digital front for a premium corporate brand
- Ensure all pages are fully populated with real, accurate content
- Fix all broken UI elements and functional bugs
- Improve navigation clarity and page-to-page flow
- Strengthen credibility signals for enterprise clients and investors

---

## 3. Scope

This PRD covers the following pages and components:

| Page / Component | Scope |
|---|---|
| Homepage (`/en`) | Bug fixes, content polish, interactive map |
| About Page (`/en/about`) | Full content build-out |
| Contact Page (`/en/contact`) | Form validation and functionality |
| Insights / Blog (`/en/insights`) | Article detail pages, real content |
| Investor Relations Section | Form fields, download functionality |
| Ecosystem Platform Pages | Content completion, navigation |
| Footer | Completeness and consistency |
| Language Switcher (EN/ID) | Functional parity check |

---

## 4. Functional Requirements

### 4.1 Homepage (`/en`)

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Fix hero headline — `<br/>` HTML tag must render as a line break, not plain text | 🔴 Critical |
| FR-02 | Partner logos section must display real logos, not single-letter placeholders | 🟠 High |
| FR-03 | Portfolio section must include project images, descriptions, and links per item | 🟠 High |
| FR-04 | Insight article cards must link to individual article detail pages | 🟠 High |
| FR-05 | "Discover" scroll indicator must be interactive (smooth scroll to next section) | 🟡 Medium |
| FR-06 | Global Infrastructure map must be truly interactive (clickable nodes/regions) | 🟡 Medium |
| FR-07 | Stats counters (142%, 450+, 12 Countries) should animate on scroll into view | 🟢 Low |

---

### 4.2 About Page (`/en/about`)

| ID | Requirement | Priority |
|---|---|---|
| FR-08 | Add full company story / founding narrative section | 🔴 Critical |
| FR-09 | Add Mission & Vision statements | 🔴 Critical |
| FR-10 | Add Leadership / Team section with names, titles, and photos | 🟠 High |
| FR-11 | Add company values or differentiator section | 🟡 Medium |
| FR-12 | Add a timeline or milestone section showing company growth | 🟢 Low |

---

### 4.3 Insights / Blog (`/en/insights`)

| ID | Requirement | Priority |
|---|---|---|
| FR-13 | Each article card must link to a unique article detail page (`/en/insights/[slug]`) | 🔴 Critical |
| FR-14 | All article body descriptions must contain unique, real content (no duplicated placeholder text) | 🔴 Critical |
| FR-15 | Article publish dates must reflect accurate and non-future dates | 🟠 High |
| FR-16 | Article detail page must include: title, author, date, category tag, body content, and related articles | 🟠 High |

---

### 4.4 Contact Page (`/en/contact`)

| ID | Requirement | Priority |
|---|---|---|
| FR-17 | Contact form must include: Full Name, Email Address, Company Name, and Message fields | 🟠 High |
| FR-18 | Form must validate inputs before submission (required fields, valid email format) | 🟠 High |
| FR-19 | Form must show a success or error state after submission | 🟠 High |
| FR-20 | Add direct contact details: phone number, email address, office location | 🟡 Medium |

---

### 4.5 Investor Relations Section

| ID | Requirement | Priority |
|---|---|---|
| FR-21 | "Request Investor Deck" form must include visible input fields (Name, Email, Company) | 🔴 Critical |
| FR-22 | Form submission must trigger an email notification or CRM entry | 🟠 High |
| FR-23 | "Download Annual Report" button must link to a valid, downloadable PDF | 🟠 High |

---

### 4.6 Footer

| ID | Requirement | Priority |
|---|---|---|
| FR-24 | Footer Ecosystem section must list all 7 platforms (currently missing Gold Miles, Creathinks, Tala Bhojana) | 🟠 High |
| FR-25 | Privacy Policy and Terms of Service pages must contain real legal content | 🟡 Medium |

---

### 4.7 Navigation & Language

| ID | Requirement | Priority |
|---|---|---|
| FR-26 | EN/ID language switcher must produce fully translated Indonesian content on `/id` routes | 🟠 High |
| FR-27 | All ecosystem platform pages must include a breadcrumb or back navigation element | 🟡 Medium |

---

## 5. Non-Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| NFR-01 | All pages must load in under 3 seconds on a standard broadband connection | 🟠 High |
| NFR-02 | Website must be fully responsive on mobile, tablet, and desktop | 🟠 High |
| NFR-03 | All images must include descriptive `alt` attributes for accessibility | 🟡 Medium |
| NFR-04 | Website must pass basic SEO requirements: meta titles, descriptions, and OG tags per page | 🟡 Medium |
| NFR-05 | All external links must open in a new tab | 🟢 Low |

---

## 6. Out of Scope

- Backend CRM or ERP integration (future phase)
- E-commerce or booking functionality
- User authentication or client portal
- Mobile app development

---

## 7. Assumptions

- Real partner logos, team photos, and article content will be provided by the KDS team
- The PDF for the Annual Report download exists or will be created
- The interactive map will use an existing map library (e.g. Mapbox or Google Maps)

---

## 8. Success Metrics

| Metric | Target |
|---|---|
| Hero renders correctly with no visible HTML tags | 100% |
| All 7 platforms accessible from footer | 100% |
| About page has ≥ 4 distinct content sections | ✅ |
| All insight articles link to unique detail pages | 100% |
| Contact form successfully submits and shows feedback | ✅ |
| Investor Deck form includes all required input fields | ✅ |

---

## 9. Open Questions

1. Who is responsible for writing real article content for the Insights section?
2. Are the partner companies (Global Bank Corp, Ocean Freight Ltd, etc.) real clients or placeholders?
3. Is the `/id` Indonesian version being actively maintained or is it a future milestone?
4. What is the intended action when a visitor submits the Contact or Investor form — email, CRM, Slack notification?

---

*End of Document*
