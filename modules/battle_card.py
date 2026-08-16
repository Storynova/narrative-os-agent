"""
Battle Card generator (Phase 1 prototype / experimental).

Projects the CanonicalNarrativeSchema spine into a scannable, rep-facing
battle card: competitor at a glance, why we win, landmines to avoid,
and trap-setting questions. Every "why we win" line must carry a citation.

PROPRIETARY / ALL RIGHTS RESERVED - Copyright (c) 2026 StoryNova.
"""


class BattleCardAgent:
    def generate(self, spine: dict, evidence: list) -> dict:
        return {
            "type": "battle_card",
            "target": spine.get("target", {}).get("name"),
            "at_a_glance": spine.get("positioning"),
            "why_we_win": [
                {"claim": d["claim"], "proof": d["proof_point"], "citation": d["citation"]}
                for d in spine.get("differentiators", [])
            ],
            "landmines": spine.get("competitor_weaknesses", []),
            "trap_setting_questions": self._questions(spine),
            "handle_when_losing": spine.get("our_vulnerabilities", []),
        }

    def revise(self, draft: dict, issues: list) -> dict:
        # TODO: apply Critic issues (e.g. drop uncited claims)
        return draft

    def _questions(self, spine: dict) -> list:
        # Turn competitor weaknesses into discovery questions
        return [f"How do you handle: {w['weakness']}?" for w in spine.get("competitor_weaknesses", [])]

