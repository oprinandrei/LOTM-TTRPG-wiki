---
name: Eldritch Victorian Narrative System
colors:
  surface: '#081422'
  surface-dim: '#081422'
  surface-bright: '#2e3a49'
  surface-container-lowest: '#030f1c'
  surface-container-low: '#101c2a'
  surface-container: '#14202e'
  surface-container-high: '#1f2b39'
  surface-container-highest: '#2a3644'
  on-surface: '#d7e3f7'
  on-surface-variant: '#bec9c5'
  inverse-surface: '#d7e3f7'
  inverse-on-surface: '#263140'
  outline: '#88938f'
  outline-variant: '#3f4946'
  surface-tint: '#8ad4c4'
  primary: '#8ad4c4'
  on-primary: '#00382f'
  primary-container: '#005f52'
  on-primary-container: '#8bd6c5'
  inverse-primary: '#176a5c'
  secondary: '#aecccc'
  on-secondary: '#183535'
  secondary-container: '#324e4e'
  on-secondary-container: '#a0bebe'
  tertiary: '#eeb3f0'
  on-tertiary: '#4a1e51'
  tertiary-container: '#724277'
  on-tertiary-container: '#f0b5f2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a5f1e0'
  primary-fixed-dim: '#8ad4c4'
  on-primary-fixed: '#00201b'
  on-primary-fixed-variant: '#005045'
  secondary-fixed: '#cae8e8'
  secondary-fixed-dim: '#aecccc'
  on-secondary-fixed: '#012020'
  on-secondary-fixed-variant: '#304b4c'
  tertiary-fixed: '#ffd6fe'
  tertiary-fixed-dim: '#eeb3f0'
  on-tertiary-fixed: '#32063a'
  on-tertiary-fixed-variant: '#633569'
  background: '#081422'
  on-background: '#d7e3f7'
  surface-variant: '#2a3644'
typography:
  headline-xl:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-page: 40px
  card-padding: 16px
  section-gap: 48px
---

## Brand & Style

The design system is rooted in a **Skeuomorphic-Video Game hybrid** aesthetic. It bridges the gap between a physical Victorian artifact and a modern digital RPG interface. The personality is scholarly yet dangerous, evoking the feeling of a secret investigator uncovering forbidden knowledge. 

The visual style utilizes **Tactile layering**; interfaces should feel like heavy parchment or vellum overlays atop dark, atmospheric depths. We employ "Mystic Modernism"—using clean, functional layouts common in high-end card-based video games (like *Hearthstone* or *Gwent*), but decorated with the intricate flourishes of 19th-century gothic print. The target audience expects immersion, legibility during complex gameplay, and a sense of "ritual" in every interaction.

## Colors

The palette for this design system is anchored in "Abyssal Teals" and "Ritual Purples." 

- **Primary Teal (#005F52)**: Used for interactive states, key iconography, and branding elements. It represents the "beyond."
- **Accent Purple (#AA75AE)**: Reserved for high-tier occult items, "Spirit Vision" modes, and critical magical successes.
- **Surface Palette**: Backgrounds utilize a dark gradient starting from a near-black Deep Teal (#0A1211) to provide depth.
- **Text & UI**: Muted Blue-Grey (#707C8D) and Light Teal (#C9E5E1) serve as the primary and secondary content colors, ensuring high legibility against dark backgrounds without the harshness of pure white.

## Typography

This design system employs a strict hierarchy between the "Narrative" and the "Mechanical." 

**Noto Serif** is the voice of the world. It is used for titles, lore entries, and headers. In high-level displays, it should be treated with a subtle text-shadow or a "glow" effect in the primary teal to suggest its mystical nature.

**Inter** is the functional layer. It handles all statistical data, character sheets, and body text. Its clean, utilitarian nature provides the necessary contrast to the ornate serif, ensuring that even during high-stakes TTRPG encounters, players can read their stats at a glance.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** system within a card-based structure. Content is organized into modular "panels" that resemble cards or ledger pages. 

The rhythm is generous; whitespace (or "dark-space") is used to prevent the occult decorations from feeling cluttered. We use a 12-column grid for desktop layouts, but allow for asymmetrical placements to mimic the feel of a desk covered in scattered documents. Elements should feel weighted and grounded, often anchored to the bottom or sides of the screen like a video game HUD.

## Elevation & Depth

Hierarchy is established through **Tonal Layering and Parchment Texturing**. 

1. **The Void (Base)**: The lowest level, a dark, slightly textured deep teal background.
2. **The Slate (Mid)**: UI containers using Muted Blue-Grey with 80% opacity and a subtle blur.
3. **The Document (Top)**: Interactive cards or focused modals using a "Light Teal" base with a parchment grain texture overlay.
4. **The Aura (Focus)**: Active elements do not use traditional drop shadows. Instead, they use "Ambient Glows" in Primary Teal (#005F52) or Accent Purple (#AA75AE) to suggest energy emanating from the object.

## Shapes

The shape language is "Sophisticated-Geometric." We use a **Soft (0.25rem)** roundedness for standard UI components to mimic the slightly worn edges of old paper or metal plates. 

Special decorative elements—such as portrait frames or "Potion" meters—should use octagonal or "clipped corner" shapes, referencing Victorian architectural motifs. Borders are never solid; they should appear as thin, metallic lines or etched filigree.

## Components

- **Buttons**: Primary buttons are solid Deep Teal with a "Gold-Leaf" (Light Teal) border. Hover states trigger a pulse of the Primary Teal glow. Secondary buttons use a ghost-style border with Noto Serif text in all-caps.
- **Cards**: The core unit of this design system. Cards have a subtle parchment texture and "engraved" borders. Header areas of cards are separated by a thin, glowing horizontal rule.
- **Inputs**: Text fields look like underlined spaces on a ledger. On focus, the underline glows and a small occult symbol appears at the trailing edge.
- **Chips/Badges**: Small, circular or hexagonal icons representing "Sequence" or "Pathway." They use Deep Purple backgrounds with high-contrast Light Teal icons.
- **Character Portraits**: Set in heavy, metallic frames with "Spirit Vision" color overlays (#AA75AE) when a status effect is active.
- **Progress Bars**: Representing "Sanity" or "Spirituality," these are thin and contain a subtle "liquid" animation, moving from Primary Teal to Deep Purple as they deplete.