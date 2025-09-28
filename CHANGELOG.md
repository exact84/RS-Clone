## [1.24.3](https://github.com/exact84/RS-Clone/compare/v1.24.2...v1.24.3) (2025-09-28)

### Bug Fixes

* fix scroll, params for popular ([0a7898c](https://github.com/exact84/RS-Clone/commit/0a7898c04f78c7e77b2275a6cde801f1567e7a54))

## [1.24.2](https://github.com/exact84/RS-Clone/compare/v1.24.1...v1.24.2) (2025-09-28)

### Bug Fixes

* add comment about untracked() ([f810f35](https://github.com/exact84/RS-Clone/commit/f810f359c97e28bc36bc95e6acf07a2f5e3ec7bc))
* add fetchpriority ([d7d31f2](https://github.com/exact84/RS-Clone/commit/d7d31f220358c30d22de278abf7c97dfab1c10b2))
* add title to Home ([775151a](https://github.com/exact84/RS-Clone/commit/775151aecd7be448b66d7d7235867e0e6d815b17))

### Refactoring

* cleaning and performancing ([8de1acb](https://github.com/exact84/RS-Clone/commit/8de1acb129eb86a557db6688189391556f3784f5))

## [1.24.1](https://github.com/exact84/RS-Clone/compare/v1.24.0...v1.24.1) (2025-09-28)

### Refactoring

* add titles ([e5de890](https://github.com/exact84/RS-Clone/commit/e5de8909902775654747139aaf6a10df021554a6))
* replace service to common movie service ([08ea8f8](https://github.com/exact84/RS-Clone/commit/08ea8f881e80cbd68a6f0c82d2d1c5ab01e47dd0))
* replace service to common movie service ([d55cf6d](https://github.com/exact84/RS-Clone/commit/d55cf6de74aa4b592103edab1cfc6713ee9c2036))

## [1.24.0](https://github.com/exact84/RS-Clone/compare/v1.23.0...v1.24.0) (2025-09-28)

### Features

* add inputs to tests ([d97deae](https://github.com/exact84/RS-Clone/commit/d97deae793fd6007cdc24d4e16d9f35e57102796))

### Refactoring

* implement base class in movies/popular, implement withComponentInputBinding() for movies children ([0d3ecf1](https://github.com/exact84/RS-Clone/commit/0d3ecf19dbee4cd78be5d665ea1edca85dae926b))

## [1.23.0](https://github.com/exact84/RS-Clone/compare/v1.22.0...v1.23.0) (2025-09-28)

### Features

* implement top-rated page with common service and injectionToken ([e7144ff](https://github.com/exact84/RS-Clone/commit/e7144ff59d6cfbe46954feb3d22d859a2ff8dedb))

## [1.22.0](https://github.com/exact84/RS-Clone/compare/v1.21.0...v1.22.0) (2025-09-28)

### Features

* add abstract movie-class, upcoming and now-playing ([028f7d6](https://github.com/exact84/RS-Clone/commit/028f7d63b7234b057e208c9b892787db0cf19d09))
* add now-plaing movies component ([0bcd1c0](https://github.com/exact84/RS-Clone/commit/0bcd1c0f1f4511512dcfee5ab7c85b096fad2b79))

### Bug Fixes

* change endpoints in services ([61c2d4d](https://github.com/exact84/RS-Clone/commit/61c2d4d7c94ed7057deb1ff374281ab91e61860d))
* fix styles, remove redundant code ([786739c](https://github.com/exact84/RS-Clone/commit/786739c1f35c9511ab8dbed170bded2a8d31e61e))
* now-playing-service.spec.ts ([143eeaa](https://github.com/exact84/RS-Clone/commit/143eeaa511990aa6857d07f9d4c0305961520cac))

## [1.21.0](https://github.com/exact84/RS-Clone/compare/v1.20.0...v1.21.0) (2025-09-27)

### Features

* add Sentry for error monitoring, logging and tracing ([7e182b6](https://github.com/exact84/RS-Clone/commit/7e182b632db0a5e225f6280475a41cf76e6a92be))

## [1.20.0](https://github.com/exact84/RS-Clone/compare/v1.19.1...v1.20.0) (2025-09-27)

### Features

* implement creation of new list ([8e011c3](https://github.com/exact84/RS-Clone/commit/8e011c33acbf9f0c1b1f16d6c12e7361830a984d))

### Bug Fixes

* fix input width ([195d62f](https://github.com/exact84/RS-Clone/commit/195d62f00ec1fd714afb39ea507018273c76d426))
* fix loading from empty ids array ([e402088](https://github.com/exact84/RS-Clone/commit/e40208870627d3d53215c0f74ee23cd827766ac5))

## [1.19.1](https://github.com/exact84/RS-Clone/compare/v1.19.0...v1.19.1) (2025-09-27)

### Refactoring

* implement horizontal-slider for hope-page components ([8b82fad](https://github.com/exact84/RS-Clone/commit/8b82fad7718b175d76e97a6d971c29f6ce5a2054))

## [1.19.0](https://github.com/exact84/RS-Clone/compare/v1.18.0...v1.19.0) (2025-09-27)

### Features

* add ARIA & Keyboard navigation for seach and filter ([dfb3309](https://github.com/exact84/RS-Clone/commit/dfb330948fc1e78130bc9e07050c88650a8761c3))
* add input for search result page ([224fffb](https://github.com/exact84/RS-Clone/commit/224fffb96feae8c6fbbb87ff881c08a1b3be031c))
* add movie-filters ([1c67c8f](https://github.com/exact84/RS-Clone/commit/1c67c8f041c3bde183796291fa55054176677d3c))
* add route for movie-search-filter, add tests for movie-search-filter and services. ([04c0b82](https://github.com/exact84/RS-Clone/commit/04c0b823095af31e47485e22360ae56befa530c1))
* add search section into home and add search page. ([68c2d45](https://github.com/exact84/RS-Clone/commit/68c2d45ca285fd66293569788f782091125e76a5))
* add tests for movie-search ([f3dd2f3](https://github.com/exact84/RS-Clone/commit/f3dd2f3ba4c2e7718e54fd778d77d7fd933610b2))

### Bug Fixes

* add finalize loading.set(false) ([6754ec3](https://github.com/exact84/RS-Clone/commit/6754ec3804f0cbe200f9611bb6f244015f965c49))
* keywords search and pagination in movie-search-filter ([6888b71](https://github.com/exact84/RS-Clone/commit/6888b718d383b4e0d14f3d298a3fc935efbfad5d))
* minor fix country filter ([d96aa54](https://github.com/exact84/RS-Clone/commit/d96aa54640f6bc5b3e457f9a79c7b8789a0ca594))
* set focus after search and reset ([2af009b](https://github.com/exact84/RS-Clone/commit/2af009b041643bac4928c97a683a06f31f705e30))

### Refactoring

* move into separate menu movie-search-filter and refactor it ([545bb3f](https://github.com/exact84/RS-Clone/commit/545bb3f34d4fa8192899e4e3faccbffb3b85e6b8))
* movie-searh-filter & movie-service for meeting the criteria list ([441738d](https://github.com/exact84/RS-Clone/commit/441738dbb1a306df3424ee991130e815a79809cd))

## [1.18.0](https://github.com/exact84/RS-Clone/compare/v1.17.1...v1.18.0) (2025-09-26)

### Features

* add favourites.state.spec.ts ([f680c46](https://github.com/exact84/RS-Clone/commit/f680c46b7dc8bc9324c65c79e5cb7bd0474a5535))
* add mock-data and test-conditions for movie-details and person-details services ([cc068d1](https://github.com/exact84/RS-Clone/commit/cc068d1e6bce3f6d9582381783e0f165d0cc6681))
* add mock-data for testing services in home page ([dfe04ff](https://github.com/exact84/RS-Clone/commit/dfe04ffb8c4ada1da99c00e7d7829326b38bccaf))
* add profile.state.spec.ts ([2d3b89d](https://github.com/exact84/RS-Clone/commit/2d3b89d4872a4ab22b07e3548176d3e7b47e2157))
* add tests to api-error-service.spec.ts ([d4a0812](https://github.com/exact84/RS-Clone/commit/d4a0812f8b98fc5d575a0045ea402a5c74a417a2))
* add tests to headers-interseptor.spec.ts ([4213dea](https://github.com/exact84/RS-Clone/commit/4213dea9686d9e760dd27dba4c1cbedce68cb84c))
* add tests to http-interceptor.spec.ts ([c854a4f](https://github.com/exact84/RS-Clone/commit/c854a4fdd3da8dc07bd1f6338e2aa8f70195a69f))

## [1.17.1](https://github.com/exact84/RS-Clone/compare/v1.17.0...v1.17.1) (2025-09-26)

### Refactoring

* add spinner, fix styles ([bf1076c](https://github.com/exact84/RS-Clone/commit/bf1076c174aaccfafced550153effe1beb44e5bf))
* delete toggle for change password ([9e44e98](https://github.com/exact84/RS-Clone/commit/9e44e9867703a63bb95339e16d3892c5232d4fdd))
* update layout ([aaafe78](https://github.com/exact84/RS-Clone/commit/aaafe784e31bf5e98947f3c90aa28ab33b601bde))
* update styles ([a6c6d1e](https://github.com/exact84/RS-Clone/commit/a6c6d1e8767f8e80302b4fc0b3fc16b34618dbaa))

## [1.17.0](https://github.com/exact84/RS-Clone/compare/v1.16.0...v1.17.0) (2025-09-25)

### Features

* apply auth guards ([ab3b5f7](https://github.com/exact84/RS-Clone/commit/ab3b5f77e45b82e527d7619c6872a29335a2e1d1))

### Bug Fixes

* fix async validator ([94d07b5](https://github.com/exact84/RS-Clone/commit/94d07b5dc3f839c1c72136fa043dc324c16af81e))

## [1.16.0](https://github.com/exact84/RS-Clone/compare/v1.15.0...v1.16.0) (2025-09-25)

### Features

* add button component ([797a4c4](https://github.com/exact84/RS-Clone/commit/797a4c4d0db284d2af9a769efcadc19b525a7043))
* add loading more data ([d81c099](https://github.com/exact84/RS-Clone/commit/d81c0991ac80c4f60929859ffd18e0f1ef5aa52c))

### Refactoring

* add scroll loading ([4ddbbb0](https://github.com/exact84/RS-Clone/commit/4ddbbb090374667d9810ce67206acb3169725662))
* change color to more contrast ([0716416](https://github.com/exact84/RS-Clone/commit/07164167224e36fb0ba732b24ef877ca8f763853))
* disable lazy scroll on change genre ([2f7d978](https://github.com/exact84/RS-Clone/commit/2f7d9780ceb0b59840d8e6a2fc704a54ba47fb69))
* update styles ([8bd3378](https://github.com/exact84/RS-Clone/commit/8bd3378b3eea6781e024c8aa954edc11ad635a51))

## [1.15.0](https://github.com/exact84/RS-Clone/compare/v1.14.1...v1.15.0) (2025-09-24)

### Features

* implement burger menu ([eb67184](https://github.com/exact84/RS-Clone/commit/eb67184e274e44731649660edfe3e87d32da5ce1))
* implement spinner ([799f944](https://github.com/exact84/RS-Clone/commit/799f94419d494b8952e8df4ba9ed7eaecf476f80))

### Bug Fixes

* fix changing burger classes on menu interaction ([783a9c9](https://github.com/exact84/RS-Clone/commit/783a9c9af92f89fbdf006986e64d9774a0387169))

### Refactoring

* add spinner on loading status ([533a358](https://github.com/exact84/RS-Clone/commit/533a358523bec3dc5ea40e923d909c93798ddd13))
* change errors messages ([b91ced8](https://github.com/exact84/RS-Clone/commit/b91ced88be66be706d4b849063cbe8d15e221381))
* fix auth styles ([43d3626](https://github.com/exact84/RS-Clone/commit/43d3626033e6712ae7aeec8924bd536d8c76f346))
* update styles ([2400167](https://github.com/exact84/RS-Clone/commit/24001670381f246db00730f21318cf909941252c))

## [1.14.1](https://github.com/exact84/RS-Clone/compare/v1.14.0...v1.14.1) (2025-09-24)

### Refactoring

* implement withComponentInputBinding() for movie-details ([e8bccc3](https://github.com/exact84/RS-Clone/commit/e8bccc30e7afcc8e515aef6b09c6ec8f91b784e5))
* implement withComponentInputBinding() for person-card page ([f12ebf8](https://github.com/exact84/RS-Clone/commit/f12ebf8984d27251f1c0ea55add327e648164eb2))
* implement withComponentInputBinding() on not-found page ([0732f54](https://github.com/exact84/RS-Clone/commit/0732f5445b4ff46eaa5db92c72cfb0e07e24e814))

## [1.14.0](https://github.com/exact84/RS-Clone/compare/v1.13.1...v1.14.0) (2025-09-23)

### Features

* add hover to all cards ([597e61a](https://github.com/exact84/RS-Clone/commit/597e61a1597d15dbf9fb335b037a7b7119140a02))

### Bug Fixes

* fix viewTransition for person-card ([ab32636](https://github.com/exact84/RS-Clone/commit/ab32636cdcaa832dc21d9f4276f9a4c870123e40))
* route in casted-in slider ([f4c83f6](https://github.com/exact84/RS-Clone/commit/f4c83f68a91a74b501b8587d53e3fcc64633446f))

## [1.13.1](https://github.com/exact84/RS-Clone/compare/v1.13.0...v1.13.1) (2025-09-23)

### Refactoring

* add error message for loading lists ([c95b7f8](https://github.com/exact84/RS-Clone/commit/c95b7f85d8d5de680aa8dfae1d8badaaf83945d4))
* add loading indicator, delete unused styles ([170a086](https://github.com/exact84/RS-Clone/commit/170a086c844b86d0fc869595db0e1bf7b5009534))
* add toggle for favourites lists ([5c058af](https://github.com/exact84/RS-Clone/commit/5c058af1ee02568bcb934c7caf97761fee78022f))
* add typing for computed signal ([1d72a6a](https://github.com/exact84/RS-Clone/commit/1d72a6a2690236f23e32d967084d27cdf2d225e8))
* delete separated button for deleting item from favourites ([2b95ea7](https://github.com/exact84/RS-Clone/commit/2b95ea7bc055c8fbcd18a50ae749091b552cd82d))
* update store reducers ([c93ed10](https://github.com/exact84/RS-Clone/commit/c93ed105ee71d2c065dc5a0225cfa81b74516501))

## [1.13.0](https://github.com/exact84/RS-Clone/compare/v1.12.0...v1.13.0) (2025-09-22)

### Features

* add popular-movies component with tabs ([983de05](https://github.com/exact84/RS-Clone/commit/983de05f88380a9dc7983c947a42170abe184e4a))

## [1.12.0](https://github.com/exact84/RS-Clone/compare/v1.11.0...v1.12.0) (2025-09-22)

### Features

* add favourites menu ([d4f5bfa](https://github.com/exact84/RS-Clone/commit/d4f5bfaf28aa82c3c2465c2f8503db4147d9ebf2))
* add favourites-menu ([0f92d04](https://github.com/exact84/RS-Clone/commit/0f92d0409495dd130b9a431e10492cabceb1ceb4))
* add layout for favourites page ([1336a31](https://github.com/exact84/RS-Clone/commit/1336a3108881c28b400f299266550bd1903aae9b))
* add method for loading card ([d75086b](https://github.com/exact84/RS-Clone/commit/d75086b9f35ef1e43d4477cf1d61a22619a5705a))
* add navigation to favourites ([0ef6dfc](https://github.com/exact84/RS-Clone/commit/0ef6dfc03a5bb40a5e046c3469b8e543901054be))
* implement favourites store ([311d45a](https://github.com/exact84/RS-Clone/commit/311d45a2c1546746aa7cfd3f83be41c44c036f11))

### Bug Fixes

* resolve conflict ([42e8321](https://github.com/exact84/RS-Clone/commit/42e8321f743ff2a74a8e313fdb2c5c9f2759f488))
* resolve conflict ([54fb0b4](https://github.com/exact84/RS-Clone/commit/54fb0b43280e5b09570bccc23a64a8052cb8f8f9))

### Refactoring

* add conditional events ([597e8fc](https://github.com/exact84/RS-Clone/commit/597e8fc5d85999b9d7487f45c221e3101dad507a))
* add dispatch load favourites on successful login ([afcfa4e](https://github.com/exact84/RS-Clone/commit/afcfa4ee238c1230cf65fc4c8f6edc9b29f62f40))
* add event ([b03f23c](https://github.com/exact84/RS-Clone/commit/b03f23cb694fc0d876dd6625c0d3071085f7d584))
* add favourites menu to details card ([d996746](https://github.com/exact84/RS-Clone/commit/d996746818ac98f68f7360b9358acc1d826df1e3))
* add favourites menu to details card ([785616f](https://github.com/exact84/RS-Clone/commit/785616fad44594f61fe89b023a1b2c45d37b24b9))
* add favourites-menu to details card ([dd15ce8](https://github.com/exact84/RS-Clone/commit/dd15ce8f2b55b8a5f071692de36b5fa6c70c07c1))
* add filled icon ([e52b83c](https://github.com/exact84/RS-Clone/commit/e52b83c7dd52fcb268d6d16de64007181e7f6d83))
* add message if user is not authorized ([50f7456](https://github.com/exact84/RS-Clone/commit/50f74568beab8dd0b20e2232336a433633ca41db))
* add profile store to profile component ([0571e5e](https://github.com/exact84/RS-Clone/commit/0571e5e7c0bb02e46b211df5f6c35c533c8e1677))
* delete info about favourites ([7b6f128](https://github.com/exact84/RS-Clone/commit/7b6f128a5aea58ac1da8798c345c5b81da2da63a))
* move getting favourites lists from service to component ([a9ff686](https://github.com/exact84/RS-Clone/commit/a9ff686ab9eca8e460f4b82bcfd1dcfa3d20bdb8))
* rename computed signal for favourites ([da4036b](https://github.com/exact84/RS-Clone/commit/da4036ba0682ee7f45173085c1c34e124046caff))
* rename icon ([4154a89](https://github.com/exact84/RS-Clone/commit/4154a89d57511506eaa1898c261f5d44ba60b7e9))
* show icon only for authorized users ([43f9899](https://github.com/exact84/RS-Clone/commit/43f9899bff3a91236785f7d9981af1286b24af18))
* update app styles ([e17bc67](https://github.com/exact84/RS-Clone/commit/e17bc67287fccf9e397c416fd1e7fbd795d0fc17))
* update arguments in methods ([0a0865d](https://github.com/exact84/RS-Clone/commit/0a0865da5860928eccf3f10952e0a4c3d8f6e733))
* update auth handling ([43f8aa2](https://github.com/exact84/RS-Clone/commit/43f8aa2815090a51991195d2866d3e4cc82c84a9))
* update favourites model according changes in backend ([193ac02](https://github.com/exact84/RS-Clone/commit/193ac020fbd86cb5cf0a74ef848f033bc2d5bf97))
* update favourites store ([d12b562](https://github.com/exact84/RS-Clone/commit/d12b562d90f4683a0efac50bb6a0ca1046c62476))
* update icon container and styles ([e9da443](https://github.com/exact84/RS-Clone/commit/e9da4438f3959f01433efb7c32138785b8571529))
* update loading favourites ([f3e06d7](https://github.com/exact84/RS-Clone/commit/f3e06d7540fca4b0a0820d91741cd14c5230fb74))
* update menu layout ([7b37fe8](https://github.com/exact84/RS-Clone/commit/7b37fe8c03ad48d9f499f2e8bb76083991c8459b))
* update state ([7904b30](https://github.com/exact84/RS-Clone/commit/7904b30580e3dacbc26445e1026c57468ab86e25))

## [1.11.0](https://github.com/exact84/RS-Clone/compare/v1.10.0...v1.11.0) (2025-09-21)

### Features

* add person-details page with the main card ([c05e186](https://github.com/exact84/RS-Clone/commit/c05e1861ff8d953cc4836aa79ba1cc75254e44db))
* add redirect from movie-details card to person-details card ([5c3b816](https://github.com/exact84/RS-Clone/commit/5c3b816491b65257759f959bba3c543d999a4d17))
* add slider with casted in movies to person-details ([3898d17](https://github.com/exact84/RS-Clone/commit/3898d171af79e550cb83f0fc2f0d9bc2215b7cef))

### Bug Fixes

* add error handling to person-details casted-in ([e723f8e](https://github.com/exact84/RS-Clone/commit/e723f8ecf45d0700d28defb49a6bb8b6171d0b2a))
* fix tests ([68cb9a3](https://github.com/exact84/RS-Clone/commit/68cb9a3348fa87f23847a3710415497fdc9dcc5e))
* separate handling errors in template ([1573d58](https://github.com/exact84/RS-Clone/commit/1573d589f80084041fe80d8e6360621c3219e9ec))

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
