# Dwelloo UI Prototype - AI Coding Agent Instructions

## Project Overview
Dwelloo is a Next.js 15 web application for user-generated video reviews of multi-family properties. It's a **mobile-first UI prototype** deployed as a static export to GitHub Pages (`basePath: /dwelloodemo`). Focus on **component-driven development** with Figma-aligned design tokens.

## Architecture & Key Patterns

### Component Structure
- **Location**: `/components/{domain}/{ComponentName}.tsx`
- **Domains**: `ui/` (reusable), `layout/` (app shell), `property/` (property-specific), `video/` (video features)
- **Pattern**: Use `React.FC<Props>` with explicit interfaces; leverage `class-variance-authority (cva)` for multi-variant components
- **Example**: [PropertyCard.tsx](components/property/PropertyCard.tsx#L1) implements 6 display variants (near-you, newly-added, etc.) via conditional rendering

### Styling & Design Tokens
- **Engine**: Tailwind CSS v4 + PostCSS (not v3)
- **Design Source**: Figma screens (Dwelloo-MVP-v1.0) are source of truth for colors, spacing, shadows
- **Token Export**: [lib/design-tokens.ts](lib/design-tokens.ts) re-exports from `/constants/` (colors, typography, spacing, animations)
- **Custom Spacing**: Breakpoints are iPhone-first (xs: 375px, sm: 390px, md: 430px) not Tailwind defaults
- **Critical Pattern**: Use `cn()` utility from [lib/utils.ts](lib/utils.ts#L1) to safely merge Tailwind classes with `tailwind-merge`
- **Color Precedent**: Hardcoded hex values in components (e.g., `bg-[#0276C1]`) override design-tokens where Figma demands specificity

### Client vs Server Components
- Mark interactive components with `'use client'` (state, event handlers, hooks)
- Use Next.js `Link` for navigation; avoid hardcoded `<a>` tags
- Page routes are static ([app/page.tsx](app/page.tsx), [app/property/1/page.tsx](app/property/1/page.tsx))
- **Data Flow**: Mock data is hardcoded in page components (e.g., `NEAR_YOU_PROPERTIES` in page.tsx) — no API calls yet

### UI Component Library
- **Primitives**: Avatar, Badge, Button, Card, Modal, SearchBar, Input (all in [components/ui/](components/ui/))
- **Button Variants**: `primary` (blue CTA), `secondary` (light blue), `ghost`, `outline`, `glass` (frosted), `back` (navigation)
- **Sizes**: `sm`, `md` (default), `lg`, `xl`, `icon` — use `fullWidth={true}` for responsive buttons
- **Modal Sizes**: `sm`, `md`, `lg`, `xl`, `full` — handle `closeOnOverlayClick` and `closeOnEscape` for accessibility
- **Icons**: Use Lucide React (`lucide-react`) or inline SVGs with `currentColor` for consistency

## Development Workflows

### Build & Run
```bash
npm run dev              # Next.js dev server (http://localhost:3000)
npm run build           # Static export for GitHub Pages
npm run lint            # ESLint check
npm run lint:fix        # Auto-fix lint issues
npm run type-check      # tsc validation
npm run format          # Prettier format all files
npm run validate        # Full check: type-check + lint + format-check + tests
npm run ci              # CI pipeline: validate + build
```

### Testing
- **Unit/Integration**: Vitest + React Testing Library
- **E2E**: Playwright (commands: `test:e2e`, `test:e2e:ui`, `test:e2e:debug`)
- **Run Tests**: `npm run test:run` (headless), `npm run test:ui` (browser)
- **Coverage**: `npm run test:coverage`

### Environment & Deployment
- **Static Export**: `output: 'export'` in [next.config.ts](next.config.ts) (required for GitHub Pages)
- **Base Path**: `basePath: /dwelloodemo` injected in production
- **Images**: Unoptimized for static export; remote patterns whitelist `images.unsplash.com` and `*.googleusercontent.com`
- **Font**: Geist Sans from `geist/font/sans` (CSS variable: `--font-geist-sans`)

## Project-Specific Conventions

### Naming & Imports
- **Import Aliases**: Use `@/` for absolute imports (configured in `tsconfig.json`)
- **Component Export**: Always export as `export const ComponentName: React.FC<Props>`
- **Type Imports**: Prefix types with `type` (e.g., `export interface PropertyCardProps`)
- **Barrel Exports**: [components/ui/index.ts](components/ui/index.ts) aggregates exports

### Property & Video Data Models
- **Property**: `{ id, name, address, city, state, image, followers, videoCount?, rentMin?, rentMax?, bedrooms? }`
- **Video**: `{ id, thumbnailUrl, duration, likeCount, viewCount, user: { username, avatarUrl? }, property?: {...} }`
- **Mock Data Location**: Hardcoded in pages or components (no database yet)

### Common Utilities
- `cn(...classes)` — Tailwind-safe class merging (clsx + tailwind-merge)
- `formatNumber(num)` — Converts 9200 → "9.2K", 1000000 → "1.0M"
- `truncate(str, length)` — Text ellipsis
- `getInitials(name)` — Extract first letters for avatars

### Modal & Responsive Patterns
- Modals use [Modal.tsx](components/ui/Modal.tsx) base with custom overlays (e.g., `CommunityVoicesModal.tsx` for gradient scrims)
- Mobile-first: Hide desktop elements with `hidden md:block`, show mobile with `block md:hidden`
- Property cards use multiple `variant` props to switch layouts (horizontal, vertical, overlay)

## Code Quality Standards
- **TypeScript**: `strict: false` in tsconfig (loose-type mode for prototyping) — still export explicit component interfaces
- **Formatting**: Prettier (run `npm run format` before commits)
- **Linting**: ESLint + Next.js plugin; fix with `npm run lint:fix`
- **Type Safety**: Always define component `Props` interfaces with JSDoc comments
- **Testing**: Write unit tests for utilities and reusable components; E2E tests for user flows

## Critical Dependencies & Integration Points
- **Prisma**: Installed (with `postinstall: prisma generate`) but **not yet used** — backend auth/data layer TBD
- **Better Auth**: Listed but not integrated — future auth implementation
- **Tailwind v4 + PostCSS**: Requires `@tailwindcss/postcss` plugin (not legacy v3)
- **Next.js 15 + React 19**: Latest versions; watch for breaking changes in RC builds

## Common Gotchas
1. **Static Export**: No dynamic routes or API handlers in production; mock data only
2. **Image Sizes**: Always specify `sizes` prop on `<Image>` components for responsive behavior
3. **Hover States**: Test on actual iOS devices (breakpoint `xs: 375px` doesn't always match browser dev tools)
4. **Variant Handling**: Some components (PropertyCard, Button) use exhaustive if-blocks per variant—ensure new variants include all render paths
5. **Color Overrides**: Don't rely solely on Tailwind theme; Figma-specific hex values are expected in className
