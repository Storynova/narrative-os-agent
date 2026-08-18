# NarrativeOS - Design System & Visual Elements

> Phase 1 - Experimental Prototype
> Proprietary / All Rights Reserved - Copyright (c) 2026 Mahima Singh / StoryNova
> Source of truth: tokens below are captured from the live NarrativeOS app (css/styles.css).

## 1. Design Principles

Dark-first. NarrativeOS is a focused, low-glare workspace. Dark surfaces keep
attention on the content and the generated story assets.

Calm confidence. Indigo-to-violet accents signal intelligence and premium
craft without shouting. Color is used to guide, not to decorate.

One system, many assets. The same tokens drive the product UI and every
exported asset, so a battle card and a pitch deck feel like siblings.

## 2. Color Tokens

### Surfaces
| Token | Value | Use |
| --- | --- | --- |
| bg-primary | #0a0a0f | App background |
| bg-secondary | #12121a | Panels, sidebar |
| bg-tertiary | #1a1a24 | Raised sections |
| bg-card | rgba(26,26,36,0.8) | Cards |
| bg-hover | rgba(99,102,241,0.1) | Hover state |

### Accent
| Token | Value | Use |
| --- | --- | --- |
| accent-primary | #6366f1 | Primary actions, indigo |
| accent-secondary | #8b5cf6 | Secondary accent, violet |
| accent-gradient | linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%) | Hero, CTAs, headings |

### Semantic
| Token | Value | Meaning |
| --- | --- | --- |
| success | #10b981 | Wins, positive |
| warning | #f59e0b | Caution, "be honest" |
| error | #ef4444 | Loss, blocker |
| info | #3b82f6 | Neutral note |

### Text
| Token | Value | Use |
| --- | --- | --- |
| text-primary | #f8fafc | Headlines, body |
| text-secondary | #94a3b8 | Supporting text |
| text-tertiary | #64748b | Meta, timestamps |
| text-muted | #475569 | Disabled |

### Borders
border: rgba(148,163,184,0.1) - default. border-hover: rgba(148,163,184,0.2).

## 3. Typography

Primary typeface: Inter (fallback: -apple-system, BlinkMacSystemFont, sans-serif).
Monospace: JetBrains Mono (for code, tokens, IDs).

Scale guidance: display/hero uses the accent gradient as text fill; section
headings use text-primary at 600-700 weight; body uses text-primary/secondary at
400-500. Keep line length comfortable and lean on whitespace.

## 4. Spacing Scale (rem)

space-1 0.25 | space-2 0.5 | space-3 0.75 | space-4 1 | space-5 1.25 |
space-6 1.5 | space-8 2 | space-10 2.5 | space-12 3 | space-16 4.

Use the scale as-is; avoid arbitrary pixel values so rhythm stays consistent.

## 5. Radius

sm 0.375rem | md 0.5rem | lg 0.75rem | xl 1rem | 2xl 1.5rem | full 9999px.
Cards use lg-xl; pills and avatars use full.

## 6. Elevation (Shadows)

sm  0 1px 2px rgba(0,0,0,0.2)
md  0 4px 6px -1px rgba(0,0,0,0.3), 0 2px 4px -1px rgba(0,0,0,0.2)
lg  0 10px 15px -3px rgba(0,0,0,0.4), 0 4px 6px -2px rgba(0,0,0,0.2)
xl  0 20px 25px -5px rgba(0,0,0,0.5), 0 10px 10px -5px rgba(0,0,0,0.2)
glow 0 0 40px rgba(99,102,241,0.15)  (reserved for hero / focus moments)

## 7. Logo & Wordmark

Mark: rounded-square glyph filled with the accent gradient. Wordmark:
"NarrativeOS" in Inter, with a small trademark tick. Minimum clear space equal
to the height of the "N". Never stretch, recolor the gradient, or place the mark
on a busy photo without a scrim.

## 8. Components (Baseline)

Buttons. Primary: accent gradient fill, white text, radius-md. Secondary:
transparent with border, text-primary. Destructive: error color text on subtle
tinted background.

Cards. bg-card, 1px default border, radius-lg-xl, shadow-md, lift + accent
border on hover.

Badges/Pills. Tinted accent background (~15% opacity), uppercase micro-label,
radius-full.

## 9. Asset Export Style

Exported assets (battle cards, pitch decks) inherit these tokens: dark surface,
gradient headings, semantic colors for win/loss/caution, Inter type. This is what
makes every NarrativeOS output instantly recognizable.

---
*Phase 1 experimental prototype. Tokens reflect the current live build and may
evolve; treat this as a living reference, not a frozen spec.*

