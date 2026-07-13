# Architecture Decision Records (ADRs)

## 1. Next.js Framework Selection
**Context**: The event website needs to be high-performance, SEO-friendly, and maintainable.
**Decision**: Use Next.js 14+ with App Router.
**Rationale**: Native SEO support, server-side rendering, and strict architecture suit the premium nature of the conference.

## 2. Styling Solution
**Context**: We need a flexible styling system that adheres strictly to the IEEE CS design language.
**Decision**: Tailwind CSS with strict theme configuration.
**Rationale**: Allows rapid UI development while constraining colors and spacing to the official design tokens.

## 3. UI and Motion
**Context**: "Motion should be subtle... Every animation must have a purpose."
**Decision**: Use Framer Motion for scroll-reveals and subtle hover states. Respect `prefers-reduced-motion`.
**Rationale**: Framer Motion allows precise control over animation timing and accessibility compliance.
