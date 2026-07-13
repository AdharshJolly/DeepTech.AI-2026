# Design Tokens

Based on the official IEEE Computer Society Brand Identity (MasterDoc Section 7).

## Colors (Primary Palette)

| Name         | CSS Variable       | Hex       | Tailwind Class   |
| ------------ | ------------------ | --------- | ---------------- |
| IEEE Orange  | `--color-ieee-orange` | `#FFA300` | `bg-ieee-orange` |
| Process Cyan | `--color-ieee-cyan`   | `#00B5E2` | `bg-ieee-cyan`   |
| IEEE Blue    | `--color-ieee-blue`   | `#00629B` | `bg-ieee-blue`   |
| Gray         | `--color-ieee-gray`   | `#75787B` | `bg-ieee-gray`   |
| Black        | `--color-ieee-black`  | `#000000` | `bg-ieee-black`  |
| White        | `--color-ieee-white`  | `#FFFFFF` | `bg-ieee-white`  |

*Note: Use 80% / 60% / 40% / 20% opacity variants for UI states (hover, disabled, backgrounds).*

## Typography

- **Primary Headings**: Montserrat (Light, Regular, Medium, Semibold, Bold)
- **Body**: Open Sans

## Spacing & Grid

- **Spacing Scale**: 8px (Tailwind default `1` = 0.25rem = 4px, so base sizing aligns naturally with Tailwind steps `2`, `4`, `8`, etc.)
- **Grid**: 12-column responsive layout.

## Motion Guidelines

- Ensure transitions are smooth (target 60fps).
- Only subtle motion.
- Respect `prefers-reduced-motion` settings.
