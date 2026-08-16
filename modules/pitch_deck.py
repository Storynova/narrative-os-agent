"""
Pitch Deck generator (Phase 1 prototype / experimental).

Maps the spine's story_arc (problem -> stakes -> solution -> proof -> CTA)
onto slides, then renders real output via the Slides MCP server
(python-pptx or Google Slides). Keeps messaging identical to the battle
card and objection guide because all three share the same spine.

PROPRIETARY / ALL RIGHTS RESERVED - Copyright (c) 2026 StoryNova.
"""


class DeckAgent:
    def __init__(self, slides_client=None):
        self.slides = slides_client    # MCP: renders to .pptx / Google Slides

    def generate(self, spine: dict, evidence: list) -> dict:
        arc = spine.get("story_arc", {})
        slides = [
            {"layout": "title", "title": spine.get("positioning")},
            {"layout": "problem", "title": "The Problem", "body": arc.get("problem")},
            {"layout": "stakes", "title": "Why It Matters", "body": arc.get("stakes")},
            {"layout": "solution", "title": "Our Approach", "body": arc.get("solution")},
            {"layout": "proof", "title": "Proof", "body": arc.get("proof"),
             "evidence": [d for d in spine.get("differentiators", [])]},
            {"layout": "cta", "title": "Next Step", "body": arc.get("call_to_action")},
        ]
        deck = {"type": "pitch_deck", "target": spine.get("target", {}).get("name"), "slides": slides}
        if self.slides:
            deck["rendered_url"] = self.slides.render(deck)   # via Slides MCP
        return deck

    def revise(self, draft: dict, issues: list) -> dict:
        return draft  # TODO: apply Critic issues

