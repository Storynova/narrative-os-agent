"""
StoryNova Narrative OS - Orchestrator Agent (Phase 1 prototype / experimental)

Planner-worker supervisor. Owns the loop:
    plan -> gather context -> draft -> critique -> revise -> assemble

All sub-agents read/write a shared NarrativeState built on the
CanonicalNarrativeSchema (see schema/narrative_schema.json). Nothing ships
unless the Critic verifies every claim against a cited source.

PROPRIETARY / ALL RIGHTS RESERVED - Copyright (c) 2026 StoryNova.
This is a scaffold. Wire real LLM + MCP clients before use.
"""

from dataclasses import dataclass, field
from typing import Literal

Artifact = Literal["battle_card", "objection_guide", "pitch_deck"]


@dataclass
class NarrativeState:
    brief: str
    spine: dict = field(default_factory=dict)      # CanonicalNarrativeSchema instance
    evidence: list = field(default_factory=list)   # cited facts from Research agent
    artifacts: dict = field(default_factory=dict)  # rendered outputs by name
    approved: bool = False


class Orchestrator:
    def __init__(self, research, narrative, generators, critic):
        self.research = research          # Research agent
        self.narrative = narrative        # Narrative agent (builds the spine)
        self.generators = generators      # {"battle_card": ..., "objection_guide": ..., "pitch_deck": ...}
        self.critic = critic              # Critic / QA agent

    def run(self, brief: str, wants: list[Artifact]) -> NarrativeState:
        state = NarrativeState(brief=brief)

        # 1. gather cited context
        state.evidence = self.research.gather(brief)

        # 2. build the canonical spine once
        state.spine = self.narrative.build_spine(brief, state.evidence)

        # 3. project the spine into each requested artifact
        for name in wants:
            draft = self.generators[name].generate(state.spine, state.evidence)
            review = self.critic.review(draft, state.evidence)
            while not review.passed:
                draft = self.generators[name].revise(draft, review.issues)
                review = self.critic.review(draft, state.evidence)
            state.artifacts[name] = draft

        # 4. human approval gate happens outside this loop
        return state


if __name__ == "__main__":
    print("Orchestrator scaffold - inject real agents + MCP clients to run.")

