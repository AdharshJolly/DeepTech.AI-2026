# Component Index

This file tracks reusable components in the architecture.

## Foundation
- **Typography**: Configured in `tailwind.config.ts` and Next.js `next/font`.
- **Colors**: Configured in `tailwind.config.ts`.

## Layout
- **Navbar**: Main navigation (sticky, transparent over hero, solid on scroll).
- **Footer**: Includes IEEE CS, GE Healthcare logos, links, copyright.

## UI Elements
- **Button**: Reusable CTA with variants (primary, secondary, outline).
- **Badge**: Small labels for tags (e.g., Physical AI, Robotics).
- **Section**: Wrapper component maintaining the 12-column responsive grid and 8px spacing scale.

## Domain Components
- **SpeakerCard**: Displays speaker photo, name, role, organization.
- **AgendaCard**: Displays time, session title, speaker, location.
- **CountdownTimer**: Displays time remaining to the event.
