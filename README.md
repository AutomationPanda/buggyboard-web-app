# BuggyBoard: A Simple Bug Tracker

_BuggyBoard_ is a small web app for tracking bugs. It is developed and maintained for educational purposes by [Pandy Knight](https://www.linkedin.com/in/andrew-leland-knight/), the [Automation Panda](https://automationpanda.com/).

> [!IMPORTANT]
> BuggyBoard is meant for **educational purposes only**.
> It is _not_ a production-ready app.
> It is meant for learning and tinkering.

![BuggyBoard logo](frontend/public/logo_readme.png)

## Quickstart

Fork the repository in GitHub.
Then, clone it to your local machine or run it with [GitHub Codespaces](https://docs.github.com/en/codespaces/quickstart).

Make sure you have [Node.js](https://nodejs.org/) installed.
Run the following commands to run the app:

```sh
npm install
npm run dev
```

## Features

- a sortable board to show all bugs
- modals to create, edit, and delete bugs
- a login page requiring proper user credentials

## Tech stack

- a fullstack [Node.js](https://nodejs.org/) app
- written in [TypeScript](https://www.typescriptlang.org/)
- with a [React](https://react.dev/) frontend
- using [Tailwind](https://tailwindcss.com/) for styling
- and an [Express](https://expressjs.com/) backend
- using a [SQLite](https://sqlite.org/) database

## Specs

BuggyBoard is built with *spec-driven development* and *context engineering* using AI coding agents.

All product and engineering context lives in the [`specs/`](specs/) directory.
The [constitution](specs/constitution.md) is the top-level guide.
Every change to the app should align with it and the specs it references.
New features must be specified under [`specs/features/`](specs/features/).

Instructions for [Claude](CLAUDE.md), [Cursor](.cursor/rules/read-specs.mdc), and [GitHub Copilot](.github/copilot-instructions.md) tell each coding agent to follow those specs.
