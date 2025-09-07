# RS-Clone Movie DB

Angular Final Project 2025  
Task: https://github.com/rolling-scopes-school/tasks/tree/master/angular/modules/rsclone

## Project Description

**Movie DB** is a full-stack web application that allows users to manage their personal movie database.  
Users can register or log in (via email/password or Google), search for movies through the TMDb API, view detailed movie pages, and create personal collections such as favorites, watched, or "to watch".  
Custom lists and user libraries make it easy to organize and track everything you watch.

## Technology Stack

Angular 20,  
RxJS, Signals,  
TypeScript,  
Netlify (CD),  
GitHub Actions (CI),  
ESLint, Prettier, Husky.

## Installation & Run

> > Описать развёртывание Бэка

```bash
git clone https://github.com/exact84/RS-Clone.git
npm install
npm start
```

Open http://localhost:4200 in the browser.

## Available Scripts

npm start - start local dev server at http://localhost:4200  
npm run build - development build  
npm run build:prod - production build  
npm run lint - run ESLint  
npm run lint:fix - lint with auto-fix  
npm run prettier - format code with Prettier  
npm run prepare - install husky,  
npm run test - run unit tests  
npm run test:ci - run unit tests in headless mode (for CI)  
npm run watch - rebuild in watch mode

## Environment Variables

Create a .env file in the project root:

API_URL=https://api.example.com
...

> > Описать все переменные окружения

## Architecture

#### Main components:

Frontend (Angular) — SPA client  
Backend (NestJS) — API for authentication and user data  
TMDb API — external movie database integration  
User DB — favorites, watched, custom lists

> > Тут всё описать все модули что получаться в итоге, можно со схемой взаимодействия

```mermaid
graph TD;
    A[Angular Frontend] -->|HTTP| N[REST API];
    N --> B[Backend NestJS];
    B --> D[(Database)];
    A --> R[NgRx Store];
    R --> C[Components];
```

## CI/CD

### CI (Continuous Integration):

- GitHub Actions run lint, unit tests (test:ci), and production build (build:prod) on each push and pull request into dev or main branches.
```mermaid
graph TD;
    A[Pull Request to dev/main] --> B[Checkout]
    B --> C[Setup Node.js 20]
    C --> D[Install deps: npm ci]
    D --> E[Lint]
    E --> F[Unit tests]
    F --> G[Build production]
```

CD (Continuous Deployment):

- Netlify automatically deploys the latest `dev` branch to the production environment.
- For each Pull Request, Netlify creates a **Deploy Preview** — a temporary live environment to test changes before merging.

### Changelog pipeline

The workflow updates the changelog and version in package.json 
based on pull request metadata (title, description, labels). 
It also automatically updates the PR title with the new version.

In the repository settings, you need to enable the parameter:
Settings → Actions → General → Workflow permissions → “Read and write permissions”

```mermaid
graph TD;
    A[Create/Edit PR] -->|Trigger GitHub Action| B[Checkout PR Branch];
    B --> C[Setup Node.js and jq];
    C --> D[Detect Bump Type from Labels];
    D -->|major/minor/patch| E{Is PR Opened?};
    E -->|Yes| F[Bump Version in package.json];
    E -->|No| G[Skip Version Bump];
    F --> H[Update CHANGELOG.md with PR Title/Body];
    G --> H;
    H --> I[Pull with Rebase from PR Branch];
    I --> J{Are There Changes to Commit?};
    J -->|Yes| K[Commit Changes to PR];
    J -->|No| L[Skip Commit and Push];
    K --> M[Update PR Title with Version];
    L --> M;
    M --> N[Push to PR Branch];
```

## Short rationale:

> > in README (5–7 lines) explain where you chose signals vs RxJS and why (clarity, perf, simplicity). (10 pts)

## Performance budget

> > in README + measured Lighthouse gains. (20 pts)

```

```
