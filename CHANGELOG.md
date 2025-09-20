## [1.10.0](https://github.com/exact84/RS-Clone/compare/v1.9.0...v1.10.0) (2025-09-20)

### Features

* add footer ([d9ad9a4](https://github.com/exact84/RS-Clone/commit/d9ad9a4e9e78882447a1084c56761e30d44c1b1b))

### Bug Fixes

* don't add progress if no checkboxes, update-issue pipeline ([f98468e](https://github.com/exact84/RS-Clone/commit/f98468ef7c276710641aa4532112c0def7f49893))

### Refactoring

* replace static github links with [@for](https://github.com/for) ([12322c1](https://github.com/exact84/RS-Clone/commit/12322c1514e3371e232d4dd2a3b57b2b96be86ed))

## [1.9.0](https://github.com/exact84/RS-Clone/compare/v1.8.2...v1.9.0) (2025-09-19)

### Features

* add people component with pagination ([dee6485](https://github.com/exact84/RS-Clone/commit/dee6485a7f6812f701a85f3923a3bbf3513fe54e))

### Bug Fixes

* remove ; from card ([dc62c67](https://github.com/exact84/RS-Clone/commit/dc62c67c06d212a67268c5de2233cf07e5c7e649))
* remove redundant code ([51bdbca](https://github.com/exact84/RS-Clone/commit/51bdbca643bcb79418d5c086ea26f0192d9b3e6a))

### Refactoring

* move colors to _colors.scss ([5d0a4b0](https://github.com/exact84/RS-Clone/commit/5d0a4b028e61034b8982e2f7970679a58f1b96db))

## [1.8.2](https://github.com/exact84/RS-Clone/compare/v1.8.1...v1.8.2) (2025-09-18)

### Bug Fixes

* route for movie-details page ([6a19573](https://github.com/exact84/RS-Clone/commit/6a195730b58b43d10e08588ab34c180ac37b40de))

## [1.8.1](https://github.com/exact84/RS-Clone/compare/v1.8.0...v1.8.1) (2025-09-17)

### Bug Fixes

* fix styles for main layout ([31ec249](https://github.com/exact84/RS-Clone/commit/31ec249b5a849dacb636fbebec697e273950ecb1))
* header links on small screens ([5e94d93](https://github.com/exact84/RS-Clone/commit/5e94d93bb8387a91e47db6c712ed1a8cc9c57bcf))
* menu click on large screens ([c4c2b6f](https://github.com/exact84/RS-Clone/commit/c4c2b6fca408f58e394e2570e6516ff9cd4e0261))

## [1.8.0](https://github.com/exact84/RS-Clone/compare/v1.7.1...v1.8.0) (2025-09-17)

### Features

* add cast slider ([2b84c67](https://github.com/exact84/RS-Clone/commit/2b84c67bf139557a8fcbe6f612550659db2aa263))
* add recomendations slider ([2f052c5](https://github.com/exact84/RS-Clone/commit/2f052c517653d1d1298f9bbfd354c96b47a5cf9f))
* add recomendations slider ([36f34cb](https://github.com/exact84/RS-Clone/commit/36f34cb24956102b34dba6e635dd4e1bd1eaaa5e))
* add recomendations slider ([0f57a00](https://github.com/exact84/RS-Clone/commit/0f57a0017f3b423da28d7e317b0a3659ef9124a8))
* implement watch-trailer in movie-details-card ([cfb5682](https://github.com/exact84/RS-Clone/commit/cfb5682c95bdb48b8b48d774f4f18c06b4bfc4cb))

### Bug Fixes

* correct query param handling in Netlify function ([23517d2](https://github.com/exact84/RS-Clone/commit/23517d25ac69b1c0c14100fe17f45b341d5d664e))
* fallback & types ([44baa75](https://github.com/exact84/RS-Clone/commit/44baa7526dda58dfe1eb84390991ed58fabe0ddf))
* install missing dependencies ([355b5f8](https://github.com/exact84/RS-Clone/commit/355b5f8dcc05bb9ceb9cbfb5484d9efa2c25e965))
* proper error handling for failed requests ([110e450](https://github.com/exact84/RS-Clone/commit/110e45000338b3d63d034cc1bad4520b281e9bab))
* remove redundant code ([a450f40](https://github.com/exact84/RS-Clone/commit/a450f407ac7a78020f54968a8276ec62971a4e00))
* resolve conflict in _colors.scss during rebase ([a238fd7](https://github.com/exact84/RS-Clone/commit/a238fd782a9364f6d93c9adb5b9922083314ffc7))
* resolve merge conflict ([5d72908](https://github.com/exact84/RS-Clone/commit/5d7290869921ba38c3b56cb5a40ab36086989675))

### Refactoring

* add error-handling and loader to movie-details ([23063d6](https://github.com/exact84/RS-Clone/commit/23063d654b2b76a99729a6ede57a14e80e092bc3))
* add initial value to movie-details-card ([1250d08](https://github.com/exact84/RS-Clone/commit/1250d084423a827d9245c4c0f723af50a8019154))
* ensure scroll reset on route change ([dc10bee](https://github.com/exact84/RS-Clone/commit/dc10beed688c4309f93d25ff2f8a17123498810c))
* implement api-error-handler ([d7f9577](https://github.com/exact84/RS-Clone/commit/d7f95775ef2a929c2e0599196797b44da9d65d91))
* movie-details page implement reactive routeParams for updating page when choosing recommendations, add loading state and error handling for each method ([98574b1](https://github.com/exact84/RS-Clone/commit/98574b1035cc96ef0d81ce0b617d76290df78f7c))

## [1.7.1](https://github.com/exact84/RS-Clone/compare/v1.7.0...v1.7.1) (2025-09-16)

### Refactoring

* apply auth-guard for auth route ([c431a04](https://github.com/exact84/RS-Clone/commit/c431a04c24fff22307f3c62162c002205930e536))
* change canActivate to canMatch ([5fa45d9](https://github.com/exact84/RS-Clone/commit/5fa45d92bbc168ceba3faf8366a982f6b496c7f3))
* update auth-guard and checkAuth ([e6d618e](https://github.com/exact84/RS-Clone/commit/e6d618e317b90561e8d663c9555b41887e62da7e))
* update styles ([cf32b1c](https://github.com/exact84/RS-Clone/commit/cf32b1c3d980549f8fb490d0805fd180a2860286))

## [1.7.0](https://github.com/exact84/RS-Clone/compare/v1.6.0...v1.7.0) (2025-09-15)

### Features

* add auth state ([5fc904a](https://github.com/exact84/RS-Clone/commit/5fc904a8d66ea1c71d2558adf39536b3879eca96))

### Bug Fixes

* fix logout icon ([45a5f48](https://github.com/exact84/RS-Clone/commit/45a5f483eff40106b184a09e3f020c1ae855a5f1))
* fix menu hiding ([53c8a9b](https://github.com/exact84/RS-Clone/commit/53c8a9b9e6d0fe4206c689276eb22e4ba5fad17f))
* fix test ([ec0a2de](https://github.com/exact84/RS-Clone/commit/ec0a2de9defaf65c1f8db0ff769ddfdd356b73be))

### Refactoring

* add profile link and icon ([fb485e0](https://github.com/exact84/RS-Clone/commit/fb485e0ead76e8fb30baabfdf4896409697b53f5))
* refactor header layout ([1620d19](https://github.com/exact84/RS-Clone/commit/1620d194897cd6c69f9c5b9c0614026c4cbb8bcc))

## [1.6.0](https://github.com/exact84/RS-Clone/compare/v1.5.0...v1.6.0) (2025-09-14)

### Features

* implement profile page ([195eb8d](https://github.com/exact84/RS-Clone/commit/195eb8da628efe6706c9b2deffd723d919b22bae))

### Bug Fixes

* fix disabling button ([2c0dc8d](https://github.com/exact84/RS-Clone/commit/2c0dc8df9425d3ceb046857becd2b9b0fe4ec604))

### Refactoring

* add passing field names for isMatchPassword ([e35caf8](https://github.com/exact84/RS-Clone/commit/e35caf828338b9c97e2bedbbc4c84cfa7cdc4d9f))
* move generatePasswordValidationErrors to shared validators ([be9e0e0](https://github.com/exact84/RS-Clone/commit/be9e0e0b7ac3978193c501a3be12275541b82962))
* move password form to separate component ([64d14dc](https://github.com/exact84/RS-Clone/commit/64d14dc2a29e08f9d3d5c43cb022246ca8b5c6a5))
* move profile route in children of main route ([6f058e4](https://github.com/exact84/RS-Clone/commit/6f058e48fb9c7f660a5e9f76cb21a6e50d7b1298))
* move styles for forms to shared styles ([28a5a88](https://github.com/exact84/RS-Clone/commit/28a5a88815ebd86a4a012c56636f5268de571f52))
* move validators to shared ([f78c8b2](https://github.com/exact84/RS-Clone/commit/f78c8b29c8af9d46cbee7ceaef21431ba363a2ae))

## [1.5.0](https://github.com/exact84/RS-Clone/compare/v1.4.0...v1.5.0) (2025-09-13)

### Features

* add not found page content ([368f6f3](https://github.com/exact84/RS-Clone/commit/368f6f38254c7caad5288bf22bc308e4678a48ad))

## [1.4.0](https://github.com/exact84/RS-Clone/compare/v1.3.0...v1.4.0) (2025-09-12)

### Features

* add rating-badge component ([5e8bf31](https://github.com/exact84/RS-Clone/commit/5e8bf3172b145bad2a3567b913ee1f4d96cacb55))

### Bug Fixes

* remove redundant code ([1127934](https://github.com/exact84/RS-Clone/commit/1127934bc352ef41c5ec4cbcab5009fbec532692))
* remove redundant code ([52159a2](https://github.com/exact84/RS-Clone/commit/52159a29c71bdf0523369d19cbdea8398f5b04ad))

### Refactoring

* declare magic number as const stroke_dasharray_total, move to constants ([54bb726](https://github.com/exact84/RS-Clone/commit/54bb726df96b78731186f2e6eb97ceb7328b07d0))

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
