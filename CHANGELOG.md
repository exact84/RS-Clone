## [1.3.0](https://github.com/exact84/RS-Clone/compare/v1.2.0...v1.3.0) (2025-09-12)

### Features

* add auth guard ([13af4f5](https://github.com/exact84/RS-Clone/commit/13af4f5ded4d095a9a1ad48769967c1d9b36f772))
* implement authorization ([cf9ef98](https://github.com/exact84/RS-Clone/commit/cf9ef98a90b09c60999cb8cffe46811d2b8c786b))

### Bug Fixes

* add private key for form builder ([71d2c5f](https://github.com/exact84/RS-Clone/commit/71d2c5fb61e466dd32e6568c74e7da8a3b7e3cd8))
* change sequence of interceptors ([3242115](https://github.com/exact84/RS-Clone/commit/3242115b9ff3b501d2427f52ecb548964b9dfc56))
* fix auth guard ([28e675f](https://github.com/exact84/RS-Clone/commit/28e675feb82926b574174aa14f43215379998af8))
* fix password length check ([b9c9ceb](https://github.com/exact84/RS-Clone/commit/b9c9ceb544c38828e5190122f940a3087b555973))
* fix tests ([4560b2f](https://github.com/exact84/RS-Clone/commit/4560b2f4b8f732dfa19e66db8f433db09aae73ab))

### Refactoring

* update error handling; add disable submit button while pending request ([2da4c3c](https://github.com/exact84/RS-Clone/commit/2da4c3c608ec03d0aead843ad4a21f4b47088ffc))
* update public endpoints in backend ([39e1a6d](https://github.com/exact84/RS-Clone/commit/39e1a6d5841f216822b91915f260cefeed5e27d2))

## [1.2.0](https://github.com/exact84/RS-Clone/compare/v1.1.0...v1.2.0) (2025-09-12)

### Features

* free to watch ([#46](https://github.com/exact84/RS-Clone/issues/46)) ([ebff7d9](https://github.com/exact84/RS-Clone/commit/ebff7d96c1d9588c213c5406b24c31632afe780f))

### Chores

* add workflow names ([#43](https://github.com/exact84/RS-Clone/issues/43)) ([f322281](https://github.com/exact84/RS-Clone/commit/f32228144fc85507cccc1000a3119dfcfb1daad9))

# [1.1.0](https://github.com/exact84/RS-Clone/compare/v1.0.1...v1.1.0) (2025-09-11)


### Features

* add trending component ([#39](https://github.com/exact84/RS-Clone/issues/39)) ([4214941](https://github.com/exact84/RS-Clone/commit/4214941a441e6ce4e0f737e967fbdb62644459fe))

## [1.0.1](https://github.com/exact84/RS-Clone/compare/v1.0.0...v1.0.1) (2025-09-11)

# 1.0.0 (2025-09-09)


### Features

* environments setup ([#21](https://github.com/exact84/RS-Clone/issues/21)) ([33135e5](https://github.com/exact84/RS-Clone/commit/33135e5c84dda41589c59c12a8c3a586d58f4629))
* replace current custom version & changelog workflow ([#33](https://github.com/exact84/RS-Clone/issues/33)) ([e8f2971](https://github.com/exact84/RS-Clone/commit/e8f29719ac0c6274d90b95a49a7eb5979a439d5a))

## v0.6.0 (2025-09-08)

### Changes
- [v0.6.0] feat: add trailers section
Briefly describe what has been changed and why.


## v0.5.0 (2025-09-06)

### Changes
- [v0.5.0] Feature/http interceptors
Add interceptors for http requests


## v0.4.1 (2025-09-08)

### Changes
- [v0.4.0] Setup and fix tests
- Added test setup file
- Fixed and refactored unit tests
- Fix update-issue 


## v0.4.0 (2025-09-07)

### Changes
- [v0.4.0] Chore/automation and README

1. CI pipeline: lint + unit tests + build + preview. (20 pts).
 Add GitHub Actions which run lint, unit tests (test:ci), and production build (build:prod) on each push and pull request into dev or main branches.

2. Draft README with run steps, env variables, architecture diagram. (20 pts).

3. Release notes/changelog and issue templates. (10 pts).
 Add CHANGELOG.md file and an automated GitHub Actions workflow 
to keep it up to date. The workflow updates the changelog and version in package.json 
based on pull request metadata (title, description, labels). 
It also automatically updates the PR title with the new version.

4. Add GitHub Actions workflow that automatically updates checklist 
progress in issue descriptions. It recalculates completed tasks and points, 
refreshes section progress, and maintains an overall progress bar with totals. 
The workflow runs on issue creation, edits, or manually via workflow dispatch.


## v0.3.0 (2025-09-06)

### Changes

- [v0.3.0] Feature/auth-forms
Add auth form for signup and login


## v0.2.0 (2025-09-05)

### Changes

- [v0.2.0] Feature/header submenu
Add Submenu


## v0.1.0 (2025-09-03)

### Changes

- [v0.1.0] Feature/header
Add Header and menu
