# Pitch Deck Outline — StoryNova

> ILLUSTRATIVE Phase 1 sample from the Deck agent, mapped from the story_arc in `examples/01_narrative_schema.json`. In production the Deck agent renders this to .pptx / Google Slides via the Slides MCP; here it is shown as the slide plan.

---

**Slide 1 — Title**
StoryNova: the Narrative OS that keeps every sales asset telling one consistent, evidence-backed story.

**Slide 2 — The Problem**
Sales teams tell a different story in every asset, so buyers get mixed signals and reps lose deals they should win.
*Speaker note:* Open with the "three assets, three stories" pain most enablement leaders recognize instantly.

**Slide 3 — Why It Matters (Stakes)**
Inconsistent messaging quietly erodes win rates and makes every competitive cycle slower.
*Speaker note:* Tie to a metric the buyer already tracks (win rate vs. named competitors).

**Slide 4 — Our Approach (Solution)**
StoryNova's Narrative OS generates battle cards, objection guides, and decks from one cited narrative spine.
*Visual:* Diagram — one spine → three synchronized assets.

**Slide 5 — Proof**
One spine, three synchronized assets, every claim source-checked before it ships.
- One canonical spine powers every asset — internal://architecture/README#core-idea
- Every competitive claim is citation-gated — internal://agents/orchestrator.py#evidence-gate
- Objections grounded in real call + CRM data — crm://salesforce/closed-lost?window=90d

**Slide 6 — Next Step (CTA)**
Run your first competitor narrative in a 20-minute pilot.

---

*Rendering target when live:* `slides.render(deck)` → returns a Google Slides / .pptx URL (see `modules/pitch_deck.py`).

