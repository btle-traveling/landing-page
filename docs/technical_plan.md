# BTLE Landing Page - Technical Architecture

> [!NOTE]
> This document governs the software architecture of the landing page repository. It focuses on performance, Astro best practices, and minimal JavaScript footprint.

## 1. Core Philosophy: "HTML First, JS Second"
We are building a Marketing Landing Page, not a Single Page Application (SPA).
*   Default State: Static HTML. The server pre-renders everything.
*   Exception: JavaScript is only permitted for interactive *islands* (e.g., the Chat Demo, complex mobile menu toggles).
*   Goal: Serve rich, pre-built HTML. Avoid loading a "universe of node_modules" on the client.

## 2. Technology Stack & Roles

### Astro (The Orchestrator)
*   Role: Static Site Generator (SSG).
*   Usage: All pages (src/pages/*.astro) and layout components (src/layouts/*.astro) must be .astro files.
*   Data Fetching: Do all data fetching (if any) at build time in the frontmatter ---.

### React (The Interactive Islands)
*   Role: Strictly for complex interactive UI components.
*   Usage:
    *   Chat Interface Demo: This *needs* state, so use React.
    *   Complex Forms: If we have a multi-step waitlist form, use React.
*   Constraint: DO NOT wrap the entire page in a React component. Use Astro for the layout and marketing sections.

### Tailwind CSS (The Styling Engine)
*   Role: Utility-first styling.
*   Config: Using standard Tailwind v4 (via @tailwindcss/vite).
*   Best Practice: Use semantic HTML tags (<section>, <article>, <header>) combined with utility classes.

### shadcn/ui (The Component Library)
*   Role: Accessible, reusable component primitives.
*   Strategy: "Copy-paste". We do NOT install a massive library. We only add the specific components we need (e.g., Button, Input) into src/components/ui.
*   Optimization: When using shadcn components in .astro files, they render as static HTML *unless* you explicitly hydrate them. Keep them static whenever possible.

## 3. Performance & Optimization Rules

### I. The "Island" Rule
Only hydrate components that *require* user interaction.
*   Bad: <Header client:load /> (If the header is just links, it doesn't need JS).
*   Good: <ChatWindow client:visible /> (Loads JS strictly when the user scrolls to it).
*   Good: <MobileMenu client:media="(max-width: 768px)" /> (Only loads JS on mobile).

### II. Asset Management
*   Images: ALWAYS use Astro's built-in <Image /> component for automatic optimization (WebP/AVIF conversion, lazy loading).
    astro
    import { Image } from 'astro:assets';
    import myImage from '../assets/my_image.png';
    <Image src={myImage} alt="Description" />
    
*   Fonts: Preload critical fonts. Use font-display: swap.

### III. Bundle Size Hygiene
*   Avoid heavyweight libraries (e.g., moment.js, full lodash). Use native browser APIs or lightweight alternatives (date-fns, clsx).
*   Check: Periodically check the build output to ensure no unexpected large chunks are generated.

## 4. Directory Structure Guidelines

src/
├── components/
│   ├── ui/               # Shadcn React components (Button, Input, etc.)
│   ├── marketing/        # Static Astro marketing sections (Hero, Features, Pricing)
│   └── interactive/      # Complex React Islands (ChatDemo, Calculator)
├── layouts/              # Astro Layouts (Layout.astro)
├── pages/                # Astro Routes (index.astro)
└── styles/               # Global CSS


## 5. Development Workflow
1.  Start with Astro: specific section? Build it as a .astro component first.
2.  Add Styles: Use Tailwind.
3.  Need Interaction?
    *   Simple toggle? Consider details/summary or vanilla JS script tag in Astro.
    *   Complex state? Create a React component and hydrate it with client:idle or client:visible.