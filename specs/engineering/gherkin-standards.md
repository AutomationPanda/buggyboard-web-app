# Gherkin standards

When writing acceptance criteria in feature specs under `specs/features/`, follow these rules so scenarios stay consistent, automatable, and readable.

## BDD best practices

- Gherkin scenarios must follow **BDD best practices**.
- Each scenario must focus on **one individual behavior** independently. One scenario = one observable behavior or outcome.

## Step order: Given, When, Then

- Steps must follow the **strict order**: **Given**, then **When**, then **Then**—and then the scenario is finished.
- **Given** sets up the context (preconditions, state).
- **When** describes the action or event (what the user or system does).
- **Then** describes the expected outcome (observable result).
- Do **not** repeat another When/Then pair in the same scenario. If you want to describe a second action and its outcome, that is a **distinct behavior**—put it in a **separate scenario**.

## One When/Then per scenario

- Each **When** (action) and its **Then** (outcome) represent one behavior. If you have a second When/Then pair (e.g. "When the user does X again, Then Y"), split it into a second scenario with its own Given/When/Then.

## Gherkin syntax

- Use **Cucumber-style Gherkin** syntax: `Feature`, `Scenario`, `Scenario Outline`, `Given`, `When`, `Then`, `And`, `But`, `Examples`. Follow the [Cucumber Gherkin reference](https://cucumber.io/docs/gherkin/reference/) for keywords and structure.

## Readability

- Scenarios should **not** have an excessive number of lines. Keep each scenario short enough to be **readable and understandable** at a glance. Prefer multiple focused scenarios over one long scenario with many steps.
