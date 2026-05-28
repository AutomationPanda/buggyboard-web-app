# BuggyBoard Project Constitution

This document is the **supreme reference** for how the BuggyBoard project operates. All work on the app—human and AI—shall align with it. When in doubt, this file and the specs it points to are the source of truth.

---

## Article I: Specs as the single source of context

All product and engineering context **shall** live in Markdown under `specs/`. Nothing in this project is "just understood"; it is written down here or in the documents this constitution names.

**Structure:**

| Path                      | Purpose                                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| **`specs/product/`**      | Product vision, glossary, braindump, personas, roadmap, and other product-management artifacts.          |
|                           | `product/vision.md` – What BuggyBoard is, theme, main views, user model.                                 |
|                           | `product/glossary.md` – Domain terms (Bug, Board, User).                                                 |
|                           | `product/braindump.md` – Raw intentions and decisions (source of "why").                                 |
| **`specs/features/*.md`** | One spec per feature: user stories, Gherkin, acceptance criteria.                                        |
| **`specs/design/`**       | UI/UX design context: color theme, typography, spacing, and other visual or interaction rules.          |
|                           | `design/theme.md` – Primary color (Savannah Beige), palette, and other theme tokens.                   |
| **`specs/engineering/`**  | Tech stack, coding standards, development process, folder structure, and other conventions.          |
|                           | `engineering/tech-stack.md` – Stack and constraints.                                                     |
|                           | `engineering/coding-standards.md` – Style, DDD, service layer, errors/linting.                           |
|                           | `engineering/development-process.md` – Spec-first, feature-by-feature, review pauses, progress tracking. |
|                           | `engineering/pipelines.md` – CI/CD pipeline: GitHub Actions, triggers, caching, HTML reports, artifacts. |
| **`specs/` (root)**       |                                                                                                          |
|                           | `constitution.md` – This file: the supreme reference for how we work.                                    |
|                           | `PROGRESS.md` – The single checklist of what’s done per feature; updated after each feature.             |

**Use in Cursor:** Reference **`@specs/`** for full context; **`@specs/features/01-login.md`** (or the relevant feature) for a given feature; **`@specs/constitution.md`** and **`@specs/engineering/development-process.md`** for how we work.

---

## Article II: Cursor rules shall enforce the specs

Cursor rules in `.cursor/rules/` (`.mdc` files with YAML frontmatter) **shall** give the AI persistent, project-specific instructions that match this constitution.

**Required:** An always-apply rule that directs the AI to read and follow the specs under `specs/`—including `specs/product/vision.md`, `specs/design/theme.md`, `specs/engineering/tech-stack.md`, `specs/engineering/coding-standards.md`, and `specs/engineering/development-process.md`—and to use the relevant file in `specs/features/` for each feature. When something is unclear, the AI **shall** ask the user before implementing.

**Optional:** File-specific rules (e.g. TypeScript, React, Express) may be added to lock in conventions; keep them short. If `specs/engineering/coding-standards.md` already covers a topic, the "read the specs" rule may suffice.

---

## Article III: Progress is tracked in one place

**`specs/PROGRESS.md`** is the single progress artifact. Each feature **shall** have a small checklist (e.g. spec written, backend, frontend, linter/errors resolved, review done). The AI **shall** update `PROGRESS.md` when a feature or step is completed and **shall** pause for human review after each feature.

---

## Article IV: The canonical workflow

1. The human adds or edits a feature spec in `specs/features/`.
2. The human directs the AI to implement using that spec (e.g. "Implement the feature in `@specs/features/XX-name.md`; follow `@specs/`").
3. The AI reads the relevant specs, implements, updates `specs/PROGRESS.md`, and stops for human review.
4. The human reviews; when ready, the human directs the AI to the next feature spec.

No feature **shall** be started until the previous one has been reviewed and the human has directed the next step.
