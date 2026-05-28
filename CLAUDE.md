# BuggyBoard: Use Specs as Context

When working on the **BuggyBoard** web app (bug tracker SUT for the Playwright course):

1. **Read the constitution** (`specs/constitution.md`) and the specs under `specs/` before implementing. Use at least:
   - `specs/product/vision.md` – what we're building
   - `specs/design/theme.md` – color theme and UI/UX design rules
   - `specs/engineering/tech-stack.md` – stack and constraints
   - `specs/engineering/coding-standards.md` – style and architecture
   - `specs/engineering/development-process.md` – spec-first, feature-by-feature, pause for review
   - `specs/engineering/test-automation-patterns.md` – POM, atomic tests, Arrange-Act-Assert
   - `specs/engineering/pipelines.md` – CI/CD pipeline conventions (GitHub Actions, triggers, caching, artifacts)
2. **For a feature**, use the corresponding spec in `specs/features/` (e.g. `specs/features/01-login.md`).
3. **Update** `specs/PROGRESS.md` when a feature or step is completed.
4. **Pause for review** after each feature; do not start the next feature until the user directs.
5. **Ask the user** when a decision is unclear instead of assuming.
6. **Write atomic tests rather than grand tours** so that every test focuses on one thing and is easier to debug when it fails.
   - See `specs/engineering/test-automation-patterns.md` for full rules.
   - Tests must use Page Object classes from `tests/pages/`; never write raw `page.*` call chains directly in test files.
   - Tests should follow the Arrange-Act-Assert pattern.
   - Each test should be independent and not rely on the state left by previous tests.
