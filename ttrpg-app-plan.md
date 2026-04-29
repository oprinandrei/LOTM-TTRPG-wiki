# TTRPG Web App — Project Plan & Architecture Reference

> A Lord of Mysteries-inspired TTRPG system. This app serves as a quick-access reference for rules and character/NPC statblocks, for the GM and players.

---

## 1. Hosting & Stack

| Concern | Decision |
|---|---|
| Hosting | GitHub Pages (free, static) |
| Framework | Astro |
| Styling | Tailwind CSS (or Astro scoped CSS, or both) |
| Search | Pagefind |
| Interactivity | Minimal — Astro Islands for session trackers only |

**Why Astro:**
- Outputs fully static HTML — perfect for GitHub Pages
- Zero JS shipped by default; fast on mobile at the table
- Content Collections for typed, schema-validated content files
- Islands Architecture for isolating the few interactive components needed

---

## 2. Project Structure

```
src/
  content/
    characters/         ← Player character YAML files
    npcs/               ← NPC/enemy statblock YAML files
    rules/              ← Rules MDX files (actions, conditions, etc.)
    pathways/           ← Pathway & Sequence definitions YAML files
  components/
    ui/                 ← Generic primitives (Card, Badge, StatRow, SectionHeader)
    character/          ← Character-specific components (HpTracker, SkillList, AbilityCard)
    rules/              ← Rules-specific components (RuleCard, ConditionCard)
  pages/
    index.astro
    characters/
      [slug].astro
    rules/
      [slug].astro
    pathways/
      [slug].astro
  layouts/
    BaseLayout.astro
    CharacterLayout.astro
    RulesLayout.astro
```

---

## 3. Content Modelling

### 3.1 Format Decisions

| Content Type | Format | Reason |
|---|---|---|
| Rules (actions, conditions, turns) | MDX | Prose-heavy, benefits from Markdown; MDX allows embedded components if needed |
| Pathways & Sequences | YAML | Structured data, no prose needed |
| Player Characters | YAML (with frontmatter) | Structured data; optionally add freetext notes below frontmatter |
| NPCs / Enemies | YAML | Flat structure, similar to PC but simpler |

**Note on duplication:** Sequence abilities are intentionally duplicated between the Pathways section (canonical reference) and individual character files. This keeps character files self-contained and simplifies rendering.

---

### 3.2 Pathway Schema

```yaml
# src/content/pathways/fool.yaml
name: Fool
description: "Masters of luck, deception, and fate."
sequences:
  - number: 9
    name: Seer
    potion: Seer Potion
    ingredients:
      - Beyonder characteristic of a Seer
      - ...
    abilities:
      - name: Clairvoyance
        description: "Allows the user to perceive hidden truths..."
  - number: 8
    name: Clown
    # ...
```

---

### 3.3 Player Character Schema

```yaml
# src/content/characters/klein-moretti.yaml
name: Klein Moretti
pathway: Fool
sequence: 9
sequenceName: Seer
background: "Former Loen civil servant, now a Beyonder navigating Backlund's underworld."

hp:
  max: 40

sanity:
  max: 60

digestion:
  total: 3       # Total potion slots
  digested: 1    # Slots currently digested

attributes:
  strength: 10
  dexterity: 14
  constitution: 12
  intelligence: 16
  wisdom: 14
  charisma: 13

skills:
  acrobatics:   { attribute: dexterity,     proficient: false }
  history:      { attribute: intelligence,  proficient: true  }
  occult:       { attribute: intelligence,  proficient: true  }
  perception:   { attribute: wisdom,        proficient: false }
  # ... full skill list

abilities:
  - name: Clairvoyance
    source: "Seer (Sequence 9)"
    description: "Allows the user to perceive hidden truths and..."

items:
  - name: Azik's Copper Whistle
    description: "A mysterious whistle with unknown origins."
```

**Key design decisions:**
- `hp.current` and `sanity.current` are **not** stored in YAML — they are managed client-side (see Section 5)
- Skills store **intent** (which attribute, proficient or not), not calculated values. The modifier is computed at render time from attributes + sequence-derived proficiency bonus. This means updating an attribute score automatically updates all dependent skills.
- Abilities and items are inline arrays — character files are fully self-contained.

---

### 3.4 NPC Schema

Similar to PC but flatter — no skills block, simplified ability list, add a difficulty rating field.

---

## 4. Astro Content Collections

Defined in `src/content/config.ts` using Zod schemas. Provides:
- **Type safety** — build fails if a file is missing required fields or has wrong types
- **Typed queries** — `getCollection('characters')` returns fully typed data
- **Autocomplete** in components

### Accessing content in pages

```astro
---
import { getEntry } from 'astro:content';
const character = await getEntry('characters', 'klein-moretti');
---
```

### Passing data to components via Props

Components declare typed props interfaces:

```astro
---
// Badge.astro
interface Props {
  label: string;
  variant?: 'sequence' | 'pathway' | 'status';
}
const { label, variant = 'sequence' } = Astro.props;
---
<span class={`badge badge--${variant}`}>{label}</span>
```

Usage:
```astro
<Badge label={character.data.sequenceName} variant="sequence" />
<Badge label={character.data.pathway} variant="pathway" />
```

**Pattern:** For complex components, pass the entire `CollectionEntry` object rather than individual fields. This keeps parent components clean and avoids updating prop signatures when the schema changes.

---

## 5. Session Trackers (Interactive Islands)

**What lives here:** Current HP, current Sanity, Digestion tracker — values that change mid-session.

**Architecture:**
- YAML provides `max` values (static, rendered at build time)
- A small Astro Island component manages `current` values in `localStorage`
- The component receives `maxHp` etc. as props from the static page
- Marked with `client:load` directive so it hydrates on the client

**localStorage key convention:**  
Use namespaced keys to avoid collisions between characters:  
`character-{slug}-hp`, `character-{slug}-sanity`, `character-{slug}-digestion`

**UX considerations:**
- Simple +/- counter UI, usable at the table on mobile
- "Reset to max" button for between-session resets
- Store `max` alongside `current` in localStorage to detect drift if max changes after a level-up

---

## 6. UI Component Architecture

### Primitive components (`src/components/ui/`)

| Component | Purpose |
|---|---|
| `Card.astro` | Base container, variants: elevated / bordered / flat |
| `Badge.astro` | Inline label — Sequence number, Pathway name, status conditions |
| `StatRow.astro` | Label/value pair, used throughout statblocks |
| `SectionHeader.astro` | Consistent section headings within a page |

### Domain components (`src/components/character/`, `src/components/rules/`)

Built by composing primitives. Examples:
- `CharacterHeader.astro` — name, pathway badge, sequence badge
- `SkillList.astro` — renders full skill block with computed modifiers
- `AbilityCard.astro` — single ability with name, source, description
- `HpTracker.astro` — interactive island for HP (client:load)
- `RuleCard.astro` — a rules section card for actions/conditions pages

### Visual language

The app should reflect the Lord of Mysteries aesthetic: dark backgrounds, aged/Victorian feel, atmospheric typography. Establish a design token set early (colors, spacing, type scale) so all components share a consistent language.

---

## 7. Search (Pagefind)

**How it works:**
1. Astro builds the static site to `dist/`
2. Pagefind crawls the generated HTML and produces a static search index
3. Index files are served by GitHub Pages alongside the site
4. Search runs entirely in the browser — no server required

**Integration:**
```bash
npx pagefind --site dist
```
Hook into the Astro build command via the official Astro Pagefind integration so it runs automatically.

**Controlling what gets indexed:**

```astro
<article data-pagefind-body>
  <h1 data-pagefind-weight="10">{rule.title}</h1>
  <div>{rule.content}</div>
</article>

<nav data-pagefind-ignore>...</nav>
```

**Filtering by content type:**

Tag content at build time so players can scope searches:
```astro
<div data-pagefind-filter="category[data-category]" data-category="conditions">
```

**Custom search UI:**  
Use Pagefind's JavaScript API directly rather than the default widget, to match the app's visual language.

**Limitation:** Pagefind indexes build-time HTML only. localStorage tracker values are not searchable — which is intentional.

---

## 8. Deployment

Astro provides an official GitHub Actions workflow for GitHub Pages. Drop it into `.github/workflows/` and it handles build + deploy automatically on push to main.

Build command adds Pagefind as a post-build step:
```json
"build": "astro build && pagefind --site dist"
```

---

## 9. Open Questions / Future Considerations

- **Proficiency bonus formula** — define how sequence level maps to proficiency bonus, so `SkillList.astro` can compute it consistently
- **NPC statblock schema** — finalise fields (difficulty rating, abilities, loot, etc.)
- **MDX components for rules** — decide if any rules pages need interactive elements (collapsible sections, term tooltips)
- **Mobile UX at the table** — prioritise legibility and tracker usability on small screens from the start
