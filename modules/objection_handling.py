"""
Objection Handling generator (Phase 1 prototype / experimental).

Cross-references the spine's "our_vulnerabilities" with REAL objections mined
from CRM + call-intelligence MCP servers (Salesforce/HubSpot, Gong/Chorus),
then produces feel-felt-found style responses, each backed by a proof point.

This is what keeps objection handling grounded in your actual sales reality
instead of generic filler.

PROPRIETARY / ALL RIGHTS RESERVED - Copyright (c) 2026 StoryNova.
"""


class ObjectionAgent:
    def __init__(self, crm_client=None, calls_client=None):
        self.crm = crm_client          # MCP: logged objections, closed-lost reasons
        self.calls = calls_client      # MCP: objections mined from transcripts

    def generate(self, spine: dict, evidence: list) -> dict:
        real_objections = self._mine_real_objections(spine)
        entries = []
        for obj in real_objections:
            entries.append({
                "objection": obj["text"],
                "frequency": obj.get("frequency"),
                "response": self._feel_felt_found(obj, spine),
                "proof_point": self._best_proof(obj, spine),
            })
        return {"type": "objection_guide", "target": spine.get("target", {}).get("name"), "entries": entries}

    def revise(self, draft: dict, issues: list) -> dict:
        return draft  # TODO: apply Critic issues

    def _mine_real_objections(self, spine: dict) -> list:
        # Combine known vulnerabilities with CRM/call data when clients are wired
        base = [{"text": v["vulnerability"], "reframe": v.get("reframe")} for v in spine.get("our_vulnerabilities", [])]
        if self.crm:
            base += self.crm.top_objections(spine.get("target", {}).get("name"))
        return base

    def _feel_felt_found(self, obj: dict, spine: dict) -> str:
        return obj.get("reframe") or "TODO: reframe from spine differentiators"

    def _best_proof(self, obj: dict, spine: dict):
        diffs = spine.get("differentiators", [])
        return diffs[0] if diffs else None

