# StoryNova Narrative OS Agent

> **Phase 1 — Experimental Prototype.** This repository is built purely for prototype and experimentation purposes. Nothing here is production-ready. APIs, schemas, and structure will change.

An AI agent for the StoryNova **Narrative OS** storytelling engine that automates the creation of **battle cards**, **objection-handling guides**, and **pitch decks** — all derived from a single canonical narrative spine so messaging stays consistent across every asset.

## Legal Notice — Proprietary / All Rights Reserved

Copyright (c) 2026 Mahima Singh / StoryNova. All rights reserved.

"StoryNova" and "Narrative OS" are proprietary names and works. This project, its name, concepts, code, and documentation are proprietary and confidential. No license is granted for use, copying, modification, or distribution by any third party without prior written permission of the owner. This notice documents intent of ownership; formal trademark/IP protection requires separate legal registration.

## Core Idea

Battle cards, objection handling, and pitch decks are not separate outputs. They are all projections of one **Canonical Narrative Schema** (positioning, differentiators, proof points, personas, story arc). Generate the spine once, then render it into each format.

## Agent Architecture

Planner-worker (supervisor) pattern:

- **Orchestrator** — receives the brief, plans, dispatches to specialists, runs the loop: plan -> gather context -> draft -> critique -> revise -> assemble.
- **Research agent** — gathers competitor / prospect / market facts with citations.
- **Narrative agent** — builds the canonical positioning spine.
- **Battle Card agent** — projects the spine into a rep-facing card.
- **Objection agent** — maps vulnerabilities to real objections + rebuttals.
- **Deck agent** — maps the story arc onto slides.
- **Critic / QA agent** — verifies every claim against source evidence before shipping.

The loop is evidence-gated: no claim ships without a citation the Critic can verify.

## MCP Servers

Knowledge & retrieval: vector store (pgvector/Pinecone/Qdrant), web search/fetch, filesystem.
CRM & sales data: Salesforce/HubSpot, Gong/Chorus call intelligence.
Generation & output: Slides (python-pptx / Google Slides), Docs (Google Docs/Notion), design assets.
Memory & coordination: memory MCP (narrative spine + versioning), planning MCP.

See mcp/mcp.config.example.json.

## Context Frameworks

- Source-attributed RAG with three tiers: authoritative internal, evidence, style/template.
- Structured context engineering — typed, minimal context per sub-agent.
- Canonical Narrative Schema (see schema/narrative_schema.json).
- Guardrails: schema validation + claims-checker + human approval gate.
- Stack: LangGraph / OpenAI Agents SDK, MCP, Pydantic, promptfoo/LangSmith evals.

## Repo Structure

    agents/    orchestrator + sub-agents
    schema/    canonical narrative schema
    mcp/       MCP server config
    modules/   battle card, objection, pitch deck generators
