# Battle Card — StoryNova vs. LinearDeck

> ILLUSTRATIVE Phase 1 sample output from the Battle Card agent, generated from `examples/01_narrative_schema.json`. LinearDeck is fictional; citations are placeholders.

## At a Glance
StoryNova is the Narrative OS that keeps every sales asset telling one consistent, evidence-backed story. LinearDeck is a template-first deck builder with a strong design library but no shared source of truth.

## Why We Win
| Claim | Proof point | Source |
|---|---|---|
| One canonical spine powers every asset | Battle card, objection guide, and deck are generated from the same schema, so messaging can't drift | internal://architecture/README#core-idea |
| Every competitive claim is citation-gated | The Critic agent blocks any unsourced claim before it ships | internal://agents/orchestrator.py#evidence-gate |
| Objections grounded in real call + CRM data | Built from actual transcripts and closed-lost reasons, not generic lists | crm://salesforce/closed-lost?window=90d |

## Landmines (Competitor Weaknesses to Raise)
- LinearDeck has no shared source of truth — decks and one-pagers drift apart.
- No automated fact-checking of competitive claims.

## Trap-Setting Discovery Questions
- "How do you keep your deck, one-pager, and objection responses saying the same thing when messaging changes?"
- "When a rep makes a competitive claim in a deck, how is it fact-checked before it reaches a buyer?"

## When You're Losing to LinearDeck
- **They point to a bigger template library** → "We optimize for message integrity and speed of update, not template count — and we import your existing brand kit."
- **They question our connectors** → "StoryNova works standalone on day one; CRM/call connectors simply sharpen objection handling over time."

