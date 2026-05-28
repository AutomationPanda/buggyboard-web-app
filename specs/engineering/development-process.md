# Development Process

## Spec-First

- We use a **spec-first** development process.
- For every feature, there is a **written spec** (under `specs/features/`) that includes user stories, Gherkin scenarios, and other descriptions as needed.
- These specs are **kept as artifacts** of the process (not thrown away after implementation).

## Feature-by-Feature

1. The project is set up once, then we work on **one feature at a time**.
2. For each feature, the AI implements according to the feature spec and the rest of the specs under `specs/`.
3. **After each feature**, the AI **pauses** for the human to review before moving to the next feature.
4. When there is **uncertainty** about a decision, the AI should **ask** rather than assume.

## Progress Tracking

- Progress is tracked in **`specs/PROGRESS.md`** as checklists (e.g. spec written, backend done, frontend done, review done) per feature.
- The AI updates this file when a feature (or step) is completed.
