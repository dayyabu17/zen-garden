# Zen Garden — Large-Scale Implementation Roadmap

**Version:** 1.0  
**Date:** 2026-02-13  
**Project Type:** Full-stack creative platform (React + Node/Express)  
**Current State:** Functional drawing app with gallery + server persistence  
**Target State:** Immersive, multiplayer, ritual-driven, creative ecosystem

---

## 1) Vision & Product North Star

Zen Garden evolves from a solo drawing tool into a living creative world where people:
- Create expressive ink art with high-fidelity tools.
- Join real-time collaborative rituals.
- Explore immersive galleries and story-rich outputs.
- Build long-term artistic identity and progression.

### North Star Outcome
Create the most emotionally resonant digital ink experience by combining:
1. **Deep creation quality** (brush physics, replay, exports).
2. **Meaningful social creation** (multiplayer rituals).
3. **Transformative immersion** (3D/AR/world layers).
4. **Long-term retention systems** (quests, seasonal worlds, mentorship).

---

## 2) Strategic Themes

1. **Creative Depth**
   - Advanced brush engine, stroke control, time-lapse, studio replay.

2. **Collaborative Presence**
   - Real-time rooms, ritual sessions, synchronized canvas states.

3. **Worldbuilding & Narrative**
   - Living world logic, seasonal evolution, generated story cards.

4. **Embodied Interaction**
   - Biofeedback mode, voice-to-stroke mapping, ambient soundscapes.

5. **Distribution & Display**
   - Museum mode, social exports, event-grade fullscreen experiences.

---

## 3) Big Feature Pillars (Macro Scope)

## Pillar A — Living World Canvas (AI Garden)
**Goal:** Every artwork contributes to a persistent world model.

### Core Capabilities
- Persistent global world state (zones, seasons, weather patterns).
- Artwork-to-world transformation pipeline.
- Daily/weekly world evolution jobs.
- Personal and global world impact dashboards.

### Deliverables
- World schema + simulation services.
- Mapping engine from stroke metrics to world variables.
- World timeline UI.
- “Your impact this week” report cards.

---

## Pillar B — Multiplayer Zen Rituals
**Goal:** Real-time collaborative drawing for synchronous group experiences.

### Core Capabilities
- Rooms/lobbies with invite links.
- Presence indicators + cursor trails.
- Shared state conflict-free drawing sync.
- Ritual format templates (silent mode, mirrored mode, conductor mode).

### Deliverables
- WebSocket infrastructure.
- Session lifecycle management.
- Collaborative canvas protocol.
- Moderator controls + anti-grief protections.

---

## Pillar C — Immersive 3D Ink Temple
**Goal:** Transform 2D art into explorable 3D environments.

### Core Capabilities
- Stroke extrusion/particle conversion.
- Camera navigation + atmospheric effects.
- Interactive scene replay.
- Gallery-to-temple conversion.

### Deliverables
- Three.js rendering module.
- Stroke-to-mesh conversion engine.
- Performance profile for desktop/mobile tiers.
- Temple mode page + controls.

---

## Pillar D — Ritual Quests & Master Paths
**Goal:** Long-term progression that teaches style and discipline.

### Core Capabilities
- Path systems (Stillness, Flow, Precision, Minimalism).
- Quest rules + reward trees.
- Skill telemetry and milestone unlocks.
- Seasonal reset and prestige loops.

### Deliverables
- Progression service and schema.
- Quest configuration admin panel.
- Reward inventory and unlock rendering.
- Analytics funnel for quest completion.

---

## Pillar E — Story Engine + Museum Mode
**Goal:** Convert artworks into narrative and exhibition-ready artifacts.

### Core Capabilities
- Automated title/haiku/story generation.
- Curated “story cards” per artwork.
- Public installation mode (hands-off autoplay).
- Event playlists and transitions.

### Deliverables
- Content generation microservice.
- Story card templates.
- Museum display runtime.
- Playlist scheduling and kiosk controls.

---

## 4) Program Timeline (12-Month Plan)

## Phase 0 — Foundations (Weeks 1–4)
**Objective:** Prepare architecture for scale before major features.

### Workstreams
- Monorepo conventions + linting/test standards.
- Shared types/contracts for client-server APIs.
- Auth/session foundation (guest + account modes).
- Observability baseline (logs, metrics, tracing IDs).
- CI pipeline hardening.

### Exit Criteria
- Stable deployment flow.
- Versioned API contracts.
- Error budgets and baseline SLO metrics defined.

---

## Phase 1 — Creation Depth (Weeks 5–10)
**Objective:** Upgrade creation experience quality.

### Feature Set
- Brush personalities.
- Undo/redo architecture.
- Replay studio mode.
- Export presets + timelapse generation.

### Exit Criteria
- <30ms average stroke render latency on supported devices.
- Replay determinism across sessions.
- Export success rate >99% for supported formats.

---

## Phase 2 — Multiplayer Core (Weeks 11–18)
**Objective:** Launch collaborative drawing rooms.

### Feature Set
- Room creation/join flow.
- Presence + synchronized drawing.
- Ritual templates (3 initial modes).
- Session replay storage.

### Exit Criteria
- 50 concurrent users per room target.
- Median sync delay <150ms.
- Session reliability >99% without data loss.

---

## Phase 3 — World Systems (Weeks 19–28)
**Objective:** Introduce living world mechanics.

### Feature Set
- World state model + simulation jobs.
- Artwork impact mapper.
- Global world timeline visualization.
- Personal impact dashboard.

### Exit Criteria
- Daily evolution jobs complete within SLA.
- Stable world state snapshots and rollback strategy.
- World-impact engagement metrics available.

---

## Phase 4 — Immersive Layer (Weeks 29–38)
**Objective:** Deploy 3D Ink Temple + Museum Mode.

### Feature Set
- 2D-to-3D conversion.
- Temple navigation and atmospheric rendering.
- Museum playlists and autoplay scenes.
- Event mode controls.

### Exit Criteria
- 60 FPS target on mid/high tier devices.
- Controlled degradation for low-end devices.
- Exhibition mode runs unattended for 4+ hours.

---

## Phase 5 — Progression & Narrative (Weeks 39–48)
**Objective:** Add retention systems and generated storytelling.

### Feature Set
- Master paths and quests.
- Reward unlock system.
- Story/haiku/title generation.
- Seasonal world cycles.

### Exit Criteria
- D7 and D30 retention lift vs baseline.
- Quest completion funnel instrumented end-to-end.
- Narrative quality reviewed with product rubric.

---

## Phase 6 — Scale, Growth, Partnerships (Weeks 49–52)
**Objective:** Prepare for partnerships and public events.

### Feature Set
- Public APIs (event integrations).
- Creator profiles and featured collections.
- Partner dashboard for exhibitions.
- Performance and cost optimization pass.

### Exit Criteria
- Signed pilot-ready platform package.
- Cost per active user within target model.
- Incident response and on-call playbooks finalized.

---

## 5) Detailed Architecture Roadmap

## Current Architecture (as inferred)
- Client: React + Vite with hooks/context.
- Server: Node + Express with art routes/controllers.
- Persistence: Artwork model.

## Target Architecture

### Client Layer
- **Canvas Engine Module:** deterministic stroke rendering and playback.
- **Realtime Module:** WebSocket connection, presence, conflict handling.
- **World Module:** map/timeline/impact views.
- **Immersive Module:** Three.js scenes.
- **Quest Module:** mission state, rewards, progression UI.

### Server Layer
- **API Gateway:** auth, routing, rate limits.
- **Art Service:** save/fetch/version artwork.
- **Realtime Service:** room orchestration + broadcast.
- **World Simulation Service:** scheduled evolutions and impact aggregation.
- **Narrative Service:** title/haiku/story generation pipeline.
- **Analytics Service:** event ingestion + dashboards.

### Data Layer
- **Operational DB:** users, art, sessions, quests.
- **Event Store:** append-only activity logs.
- **Blob Storage:** exports, timelapses, replays.
- **Cache:** room state and hot query acceleration.

---

## 6) API & Data Contract Evolution

## New Domain Entities
- `UserProfile`
- `RitualSession`
- `RoomParticipant`
- `StrokeEvent`
- `ReplayAsset`
- `WorldState`
- `WorldImpact`
- `QuestDefinition`
- `QuestProgress`
- `RewardInventory`
- `StoryCard`

## Suggested API Families
- `/api/art/*`
- `/api/replay/*`
- `/api/rooms/*`
- `/api/rituals/*`
- `/api/world/*`
- `/api/quests/*`
- `/api/story/*`
- `/api/admin/*`

## Compatibility Rule
Maintain backward-compatible APIs for at least two minor versions while migrating legacy clients.

---

## 7) Frontend Implementation Backlog (by Area)

## Canvas Engine
- Deterministic path serialization.
- Brush strategy system (`dry`, `wet`, `bamboo`, `mist`).
- Stroke smoothing with pressure/velocity modulation.
- History stack for undo/redo at stroke granularity.

## Replay/Export
- Keyframe generation from stroke arrays.
- Variable speed replay timeline.
- Export presets (poster, wallpaper, social formats).
- Timelapse renderer with progress and failure recovery.

## Multiplayer UI
- Room lobby and invite management.
- Participant presence chips and live cursors.
- Ritual HUD (timer, mode, conductor cues).
- Session summary modal and replay publish flow.

## World UI
- Interactive world map and influence overlays.
- Personal contribution dashboard.
- Seasonal changes and timeline scrubber.

## Progression UI
- Path selection journey.
- Quest list and milestone tracker.
- Reward inventory and unlock previews.

---

## 8) Backend Implementation Backlog (by Area)

## Realtime Infrastructure
- Socket gateway with namespace strategy.
- Room lifecycle and heartbeat handling.
- State reconciliation and late-join sync.
- Abuse controls and moderation tools.

## World Simulation
- Daily cron/event-driven world ticks.
- Mapping rules from artwork metrics to world deltas.
- Snapshotting and rollback.
- Drift detection alerts.

## Narrative Pipeline
- Structured prompt templates.
- Content moderation and quality guardrails.
- Deterministic generation fallback mode.
- Story card storage and retrieval.

## Quest/Progression
- Rule engine for quest completion.
- Reward issuance and inventory updates.
- Anti-cheat validation for telemetry events.

---

## 9) Non-Functional Requirements

## Performance
- Canvas interactions feel instantaneous on target devices.
- Realtime payload efficiency and adaptive throttling.
- Predictable memory footprint under long sessions.

## Reliability
- Graceful degradation when realtime fails.
- Idempotent write endpoints.
- Replay and export recoverability.

## Security & Safety
- Auth hardening and session protection.
- Input validation for all art/session payloads.
- Rate limiting and abuse prevention.
- Moderation workflows for public galleries.

## Accessibility
- Keyboard-navigable major flows.
- Screen-reader metadata for core screens.
- Color-contrast compliance for interface overlays.

---

## 10) Testing & Quality Plan

## Test Layers
1. **Unit:** brush logic, reducers, utility transforms.
2. **Integration:** API contracts, room sync logic, quest engine.
3. **E2E:** create art → save → replay → publish → gallery view.
4. **Load:** realtime room concurrency and world job throughput.
5. **Soak:** long-running museum mode and memory leak detection.

## Release Gates
- No P0/P1 defects open.
- Critical user journeys pass automated E2E.
- Error-rate and latency SLOs within threshold for 7-day canary.

---

## 11) Analytics & Success Metrics

## Product Metrics
- Daily active creators.
- Avg. session duration.
- Artworks created per user/week.
- Replay/share rate.
- Ritual participation rate.
- Quest completion rate.

## Technical Metrics
- Stroke render latency.
- Realtime sync latency and disconnect rate.
- API p95 latency.
- Export success/failure rate.
- World simulation job reliability.

## Business/Impact Metrics
- D7/D30 retention.
- Creator cohort growth.
- Event/partnership activation count.

---

## 12) Team Topology & Ownership

## Suggested Squads
1. **Creation Squad** — canvas, brushes, replay, export.
2. **Realtime Squad** — rooms, rituals, synchronization.
3. **World Squad** — simulation, map, seasonal logic.
4. **Narrative/Progression Squad** — quests, story cards, rewards.
5. **Platform Squad** — infra, observability, CI/CD, security.

## Cross-Functional Roles
- Product management, design systems, QA automation, DevOps/SRE, data analytics, moderation operations.

---

## 13) Risks, Dependencies, Mitigations

## Risk: Realtime complexity causes instability
- **Mitigation:** staged rollout, room size caps, chaos tests, robust reconnect logic.

## Risk: 3D mode underperforms on lower-end devices
- **Mitigation:** quality tiers, adaptive effects, fallback to 2D immersive mode.

## Risk: Generated narratives feel generic
- **Mitigation:** domain-tuned templates, rubric-based evaluation, hybrid deterministic features.

## Risk: Scope explosion across pillars
- **Mitigation:** strict phase gates, MVP slicing, feature flags, quarterly reprioritization.

## Risk: Moderation burden with public collaboration
- **Mitigation:** reporting tools, content policies, room-level controls, automated triage.

---

## 14) Rollout Strategy

## Environment Strategy
- Dev → Staging → Canary → Production.

## Feature Delivery Strategy
- Feature flags by pillar.
- Invite-only alpha cohorts.
- Progressive percentage rollouts.
- Kill-switch readiness for high-risk modules.

## Communication Strategy
- Public changelog per release.
- Creator community updates.
- Event playbooks for museum/exhibition partners.

---

## 15) Suggested Quarterly Objectives (OKR Style)

## Q1 Objective: Upgrade core creation excellence
- KR1: Launch brush personalities and replay studio.
- KR2: Improve export reliability to >99%.
- KR3: Reduce average stroke latency by 40% from baseline.

## Q2 Objective: Ship high-quality collaborative rituals
- KR1: Launch room-based realtime sessions.
- KR2: Achieve median sync latency <150ms.
- KR3: Reach 20% weekly ritual participation among active users.

## Q3 Objective: Establish living world engagement loop
- KR1: Ship world timeline and impact mapping.
- KR2: Reach 30% weekly return driven by world updates.
- KR3: Maintain simulation job success >99.5%.

## Q4 Objective: Drive retention through progression and narrative
- KR1: Launch quest system and rewards.
- KR2: Increase D30 retention by 15%.
- KR3: Reach 35% story-card share rate among completed artworks.

---

## 16) Immediate Next 30 Days (Actionable Kickoff)

1. Finalize technical RFCs for:
   - Realtime protocol.
   - Stroke event schema.
   - Replay determinism contract.

2. Build Phase 0 platform baseline:
   - Shared API contracts.
   - Logging/tracing with correlation IDs.
   - CI quality gates and release checklist.

3. Start Phase 1 feature implementation:
   - Undo/redo engine.
   - Brush strategy system.
   - Replay timeline controls.

4. Launch alpha readiness checklist:
   - Internal playtest scripts.
   - Bug triage rubric.
   - Feature flag toggles and rollback rehearsals.

---

## 17) Legacy Codebase Mapping (Current Files → Roadmap Work)

## Existing Frontend Anchors
- `client/src/components/ZenCanvas.jsx` → Canvas engine extensions.
- `client/src/hooks/useDraw.js` → Brush physics, stroke serialization, undo/redo.
- `client/src/hooks/useReplay.js` → Replay studio and timelapse groundwork.
- `client/src/pages/Gallery.jsx` → Story cards, world overlays, museum playlists.
- `client/src/components/WashiDock.jsx` → Advanced creation controls.
- `client/src/services/artService.js` → API expansion for replay/quests/world.

## Existing Backend Anchors
- `server/index.js` → Realtime gateway entry, middleware hardening.
- `server/controllers/artController.js` → Versioned save/fetch and metadata enrichments.
- `server/models/Art.js` → Schema extensions (tags, session links, story cards).
- `server/routes/artRoutes.js` → Route evolution and compatibility pathing.

---

## 18) Definition of Done (Global)

A roadmap item is complete when:
- Functional acceptance criteria are met.
- Automated test coverage is added for critical paths.
- Telemetry events are implemented and documented.
- Feature flag + rollback plan exists.
- Documentation is updated for product, engineering, and ops.

---

## 19) Closing Note

This roadmap intentionally prioritizes a **platform leap** rather than incremental polish. Execution discipline is critical: enforce phase boundaries, ship behind feature flags, and validate each pillar with measurable user impact before broad expansion.

When in doubt, prioritize this sequence:
1. Creation quality.
2. Realtime collaboration.
3. Persistent world value.
4. Immersive and narrative expansion.
