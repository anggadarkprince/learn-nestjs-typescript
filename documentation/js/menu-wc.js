'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-typescript-starter documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-be16b69909c41f15e6b16d33bad5af407ec9b1c3c0a93cab776151a87d6466a6632e6bc6b745296b7744e5523fcf1e0a41e390e1028f9c172ea682057216eb22"' : 'data-target="#xs-controllers-links-module-AppModule-be16b69909c41f15e6b16d33bad5af407ec9b1c3c0a93cab776151a87d6466a6632e6bc6b745296b7744e5523fcf1e0a41e390e1028f9c172ea682057216eb22"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-be16b69909c41f15e6b16d33bad5af407ec9b1c3c0a93cab776151a87d6466a6632e6bc6b745296b7744e5523fcf1e0a41e390e1028f9c172ea682057216eb22"' :
                                            'id="xs-controllers-links-module-AppModule-be16b69909c41f15e6b16d33bad5af407ec9b1c3c0a93cab776151a87d6466a6632e6bc6b745296b7744e5523fcf1e0a41e390e1028f9c172ea682057216eb22"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-be16b69909c41f15e6b16d33bad5af407ec9b1c3c0a93cab776151a87d6466a6632e6bc6b745296b7744e5523fcf1e0a41e390e1028f9c172ea682057216eb22"' : 'data-target="#xs-injectables-links-module-AppModule-be16b69909c41f15e6b16d33bad5af407ec9b1c3c0a93cab776151a87d6466a6632e6bc6b745296b7744e5523fcf1e0a41e390e1028f9c172ea682057216eb22"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-be16b69909c41f15e6b16d33bad5af407ec9b1c3c0a93cab776151a87d6466a6632e6bc6b745296b7744e5523fcf1e0a41e390e1028f9c172ea682057216eb22"' :
                                        'id="xs-injectables-links-module-AppModule-be16b69909c41f15e6b16d33bad5af407ec9b1c3c0a93cab776151a87d6466a6632e6bc6b745296b7744e5523fcf1e0a41e390e1028f9c172ea682057216eb22"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthenticationModule.html" data-type="entity-link" >AuthenticationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthenticationModule-3afad226ab5764b6f2328841a34d26a016551410bfc55767cc1946f28b2aa00bd78d24bc3b4b9ad635613fb065aada66c59279628ad3f893a1ef9ffb9f0fc6a9"' : 'data-target="#xs-controllers-links-module-AuthenticationModule-3afad226ab5764b6f2328841a34d26a016551410bfc55767cc1946f28b2aa00bd78d24bc3b4b9ad635613fb065aada66c59279628ad3f893a1ef9ffb9f0fc6a9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthenticationModule-3afad226ab5764b6f2328841a34d26a016551410bfc55767cc1946f28b2aa00bd78d24bc3b4b9ad635613fb065aada66c59279628ad3f893a1ef9ffb9f0fc6a9"' :
                                            'id="xs-controllers-links-module-AuthenticationModule-3afad226ab5764b6f2328841a34d26a016551410bfc55767cc1946f28b2aa00bd78d24bc3b4b9ad635613fb065aada66c59279628ad3f893a1ef9ffb9f0fc6a9"' }>
                                            <li class="link">
                                                <a href="controllers/AuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/TwoFactorAuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwoFactorAuthenticationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthenticationModule-3afad226ab5764b6f2328841a34d26a016551410bfc55767cc1946f28b2aa00bd78d24bc3b4b9ad635613fb065aada66c59279628ad3f893a1ef9ffb9f0fc6a9"' : 'data-target="#xs-injectables-links-module-AuthenticationModule-3afad226ab5764b6f2328841a34d26a016551410bfc55767cc1946f28b2aa00bd78d24bc3b4b9ad635613fb065aada66c59279628ad3f893a1ef9ffb9f0fc6a9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthenticationModule-3afad226ab5764b6f2328841a34d26a016551410bfc55767cc1946f28b2aa00bd78d24bc3b4b9ad635613fb065aada66c59279628ad3f893a1ef9ffb9f0fc6a9"' :
                                        'id="xs-injectables-links-module-AuthenticationModule-3afad226ab5764b6f2328841a34d26a016551410bfc55767cc1946f28b2aa00bd78d24bc3b4b9ad635613fb065aada66c59279628ad3f893a1ef9ffb9f0fc6a9"' }>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtRefreshTokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtRefreshTokenStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtTwoFactorStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtTwoFactorStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TwoFactorAuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwoFactorAuthenticationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesModule.html" data-type="entity-link" >CategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CategoriesModule-9c7a891a7fcfa8313b7461ed1bb161ad2d3301f44ba754d38c74f731335127bb1731dcea531c18962009948b15c9718896c0e2f8f50d10fa6f0a1dafcac3159b"' : 'data-target="#xs-controllers-links-module-CategoriesModule-9c7a891a7fcfa8313b7461ed1bb161ad2d3301f44ba754d38c74f731335127bb1731dcea531c18962009948b15c9718896c0e2f8f50d10fa6f0a1dafcac3159b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoriesModule-9c7a891a7fcfa8313b7461ed1bb161ad2d3301f44ba754d38c74f731335127bb1731dcea531c18962009948b15c9718896c0e2f8f50d10fa6f0a1dafcac3159b"' :
                                            'id="xs-controllers-links-module-CategoriesModule-9c7a891a7fcfa8313b7461ed1bb161ad2d3301f44ba754d38c74f731335127bb1731dcea531c18962009948b15c9718896c0e2f8f50d10fa6f0a1dafcac3159b"' }>
                                            <li class="link">
                                                <a href="controllers/CategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CategoriesModule-9c7a891a7fcfa8313b7461ed1bb161ad2d3301f44ba754d38c74f731335127bb1731dcea531c18962009948b15c9718896c0e2f8f50d10fa6f0a1dafcac3159b"' : 'data-target="#xs-injectables-links-module-CategoriesModule-9c7a891a7fcfa8313b7461ed1bb161ad2d3301f44ba754d38c74f731335127bb1731dcea531c18962009948b15c9718896c0e2f8f50d10fa6f0a1dafcac3159b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoriesModule-9c7a891a7fcfa8313b7461ed1bb161ad2d3301f44ba754d38c74f731335127bb1731dcea531c18962009948b15c9718896c0e2f8f50d10fa6f0a1dafcac3159b"' :
                                        'id="xs-injectables-links-module-CategoriesModule-9c7a891a7fcfa8313b7461ed1bb161ad2d3301f44ba754d38c74f731335127bb1731dcea531c18962009948b15c9718896c0e2f8f50d10fa6f0a1dafcac3159b"' }>
                                        <li class="link">
                                            <a href="injectables/CategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChargeModule.html" data-type="entity-link" >ChargeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ChargeModule-2fb0bff7a90794c5acf224705e7205d515e8e76e9330d7bdc990b1874371ef80ea1535111c5f01a96d8b30cf7a85db9691f2f6ad726b338eabb31da929d6eb33"' : 'data-target="#xs-controllers-links-module-ChargeModule-2fb0bff7a90794c5acf224705e7205d515e8e76e9330d7bdc990b1874371ef80ea1535111c5f01a96d8b30cf7a85db9691f2f6ad726b338eabb31da929d6eb33"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ChargeModule-2fb0bff7a90794c5acf224705e7205d515e8e76e9330d7bdc990b1874371ef80ea1535111c5f01a96d8b30cf7a85db9691f2f6ad726b338eabb31da929d6eb33"' :
                                            'id="xs-controllers-links-module-ChargeModule-2fb0bff7a90794c5acf224705e7205d515e8e76e9330d7bdc990b1874371ef80ea1535111c5f01a96d8b30cf7a85db9691f2f6ad726b338eabb31da929d6eb33"' }>
                                            <li class="link">
                                                <a href="controllers/ChargeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChargeController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatModule.html" data-type="entity-link" >ChatModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ChatModule-13b09cda5595290dceb2d927a5b5d15971c2b8fc7b39d7d7c49b386eb49766b7a2ac7b4c4ed49a857735559b857371bc7b7b430520390ad5548978fd996b8871"' : 'data-target="#xs-injectables-links-module-ChatModule-13b09cda5595290dceb2d927a5b5d15971c2b8fc7b39d7d7c49b386eb49766b7a2ac7b4c4ed49a857735559b857371bc7b7b430520390ad5548978fd996b8871"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChatModule-13b09cda5595290dceb2d927a5b5d15971c2b8fc7b39d7d7c49b386eb49766b7a2ac7b4c4ed49a857735559b857371bc7b7b430520390ad5548978fd996b8871"' :
                                        'id="xs-injectables-links-module-ChatModule-13b09cda5595290dceb2d927a5b5d15971c2b8fc7b39d7d7c49b386eb49766b7a2ac7b4c4ed49a857735559b857371bc7b7b430520390ad5548978fd996b8871"' }>
                                        <li class="link">
                                            <a href="injectables/ChatService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentsModule.html" data-type="entity-link" >CommentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CommentsModule-540556958311612a006477eb97de7651ef86ee8c1ccc53acd2b8495f6d6d34ca721f33a079ec4a7f037787725b75cc4e3fcf89d7eda3bf41da8966abcf884148"' : 'data-target="#xs-controllers-links-module-CommentsModule-540556958311612a006477eb97de7651ef86ee8c1ccc53acd2b8495f6d6d34ca721f33a079ec4a7f037787725b75cc4e3fcf89d7eda3bf41da8966abcf884148"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CommentsModule-540556958311612a006477eb97de7651ef86ee8c1ccc53acd2b8495f6d6d34ca721f33a079ec4a7f037787725b75cc4e3fcf89d7eda3bf41da8966abcf884148"' :
                                            'id="xs-controllers-links-module-CommentsModule-540556958311612a006477eb97de7651ef86ee8c1ccc53acd2b8495f6d6d34ca721f33a079ec4a7f037787725b75cc4e3fcf89d7eda3bf41da8966abcf884148"' }>
                                            <li class="link">
                                                <a href="controllers/CommentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CreditCardsModule.html" data-type="entity-link" >CreditCardsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CreditCardsModule-bad53d18484bdb2a14e30f00764a8d6e337489b1d7a89a104b63f4a18821cbd77b45aea7ca8633c74ab23a096fe1f66fdf5a7d48e962420ed9eab496ac20203b"' : 'data-target="#xs-controllers-links-module-CreditCardsModule-bad53d18484bdb2a14e30f00764a8d6e337489b1d7a89a104b63f4a18821cbd77b45aea7ca8633c74ab23a096fe1f66fdf5a7d48e962420ed9eab496ac20203b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CreditCardsModule-bad53d18484bdb2a14e30f00764a8d6e337489b1d7a89a104b63f4a18821cbd77b45aea7ca8633c74ab23a096fe1f66fdf5a7d48e962420ed9eab496ac20203b"' :
                                            'id="xs-controllers-links-module-CreditCardsModule-bad53d18484bdb2a14e30f00764a8d6e337489b1d7a89a104b63f4a18821cbd77b45aea7ca8633c74ab23a096fe1f66fdf5a7d48e962420ed9eab496ac20203b"' }>
                                            <li class="link">
                                                <a href="controllers/CreditCardsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreditCardsController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EmailConfirmationModule.html" data-type="entity-link" >EmailConfirmationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-EmailConfirmationModule-cf4496c079de82b11b9365d45b1cd8097cb806f5c3522c1b974ba600c640212bfda72d8388a29d1495f18c2c5b75b0689c5c55b291dd04e5c5715e5df0d7de54"' : 'data-target="#xs-controllers-links-module-EmailConfirmationModule-cf4496c079de82b11b9365d45b1cd8097cb806f5c3522c1b974ba600c640212bfda72d8388a29d1495f18c2c5b75b0689c5c55b291dd04e5c5715e5df0d7de54"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmailConfirmationModule-cf4496c079de82b11b9365d45b1cd8097cb806f5c3522c1b974ba600c640212bfda72d8388a29d1495f18c2c5b75b0689c5c55b291dd04e5c5715e5df0d7de54"' :
                                            'id="xs-controllers-links-module-EmailConfirmationModule-cf4496c079de82b11b9365d45b1cd8097cb806f5c3522c1b974ba600c640212bfda72d8388a29d1495f18c2c5b75b0689c5c55b291dd04e5c5715e5df0d7de54"' }>
                                            <li class="link">
                                                <a href="controllers/EmailConfirmationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailConfirmationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EmailConfirmationModule-cf4496c079de82b11b9365d45b1cd8097cb806f5c3522c1b974ba600c640212bfda72d8388a29d1495f18c2c5b75b0689c5c55b291dd04e5c5715e5df0d7de54"' : 'data-target="#xs-injectables-links-module-EmailConfirmationModule-cf4496c079de82b11b9365d45b1cd8097cb806f5c3522c1b974ba600c640212bfda72d8388a29d1495f18c2c5b75b0689c5c55b291dd04e5c5715e5df0d7de54"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailConfirmationModule-cf4496c079de82b11b9365d45b1cd8097cb806f5c3522c1b974ba600c640212bfda72d8388a29d1495f18c2c5b75b0689c5c55b291dd04e5c5715e5df0d7de54"' :
                                        'id="xs-injectables-links-module-EmailConfirmationModule-cf4496c079de82b11b9365d45b1cd8097cb806f5c3522c1b974ba600c640212bfda72d8388a29d1495f18c2c5b75b0689c5c55b291dd04e5c5715e5df0d7de54"' }>
                                        <li class="link">
                                            <a href="injectables/EmailConfirmationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailConfirmationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailModule.html" data-type="entity-link" >EmailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EmailModule-1d21d44ddd4693528d71fdd27a641d0c9cc6f86b9a6a7e30126f6b09e7d1fa575ede76580ca75de0ef2aee788830990fde5981378c650e1aafa3fc3594e53d2c"' : 'data-target="#xs-injectables-links-module-EmailModule-1d21d44ddd4693528d71fdd27a641d0c9cc6f86b9a6a7e30126f6b09e7d1fa575ede76580ca75de0ef2aee788830990fde5981378c650e1aafa3fc3594e53d2c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailModule-1d21d44ddd4693528d71fdd27a641d0c9cc6f86b9a6a7e30126f6b09e7d1fa575ede76580ca75de0ef2aee788830990fde5981378c650e1aafa3fc3594e53d2c"' :
                                        'id="xs-injectables-links-module-EmailModule-1d21d44ddd4693528d71fdd27a641d0c9cc6f86b9a6a7e30126f6b09e7d1fa575ede76580ca75de0ef2aee788830990fde5981378c650e1aafa3fc3594e53d2c"' }>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailSchedulingModule.html" data-type="entity-link" >EmailSchedulingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-EmailSchedulingModule-85707beebf7a2f19bf9b95ca275d4ae2951143e226c3a2167a0cccb8865134602c7c904893b1a167d8e94cfc8227c92e04b4620a9e12b617ef05b1c3f0f38aa9"' : 'data-target="#xs-controllers-links-module-EmailSchedulingModule-85707beebf7a2f19bf9b95ca275d4ae2951143e226c3a2167a0cccb8865134602c7c904893b1a167d8e94cfc8227c92e04b4620a9e12b617ef05b1c3f0f38aa9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmailSchedulingModule-85707beebf7a2f19bf9b95ca275d4ae2951143e226c3a2167a0cccb8865134602c7c904893b1a167d8e94cfc8227c92e04b4620a9e12b617ef05b1c3f0f38aa9"' :
                                            'id="xs-controllers-links-module-EmailSchedulingModule-85707beebf7a2f19bf9b95ca275d4ae2951143e226c3a2167a0cccb8865134602c7c904893b1a167d8e94cfc8227c92e04b4620a9e12b617ef05b1c3f0f38aa9"' }>
                                            <li class="link">
                                                <a href="controllers/EmailSchedulingController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailSchedulingController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EmailSchedulingModule-85707beebf7a2f19bf9b95ca275d4ae2951143e226c3a2167a0cccb8865134602c7c904893b1a167d8e94cfc8227c92e04b4620a9e12b617ef05b1c3f0f38aa9"' : 'data-target="#xs-injectables-links-module-EmailSchedulingModule-85707beebf7a2f19bf9b95ca275d4ae2951143e226c3a2167a0cccb8865134602c7c904893b1a167d8e94cfc8227c92e04b4620a9e12b617ef05b1c3f0f38aa9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailSchedulingModule-85707beebf7a2f19bf9b95ca275d4ae2951143e226c3a2167a0cccb8865134602c7c904893b1a167d8e94cfc8227c92e04b4620a9e12b617ef05b1c3f0f38aa9"' :
                                        'id="xs-injectables-links-module-EmailSchedulingModule-85707beebf7a2f19bf9b95ca275d4ae2951143e226c3a2167a0cccb8865134602c7c904893b1a167d8e94cfc8227c92e04b4620a9e12b617ef05b1c3f0f38aa9"' }>
                                        <li class="link">
                                            <a href="injectables/EmailSchedulingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailSchedulingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FilesModule-4a6acc72530f50c9bdb7e5c4ad2652ac4eb3951a824d57125934b7da9ccb1806c91d7c19cb26b494c19fea60725cc0a0f7d772ba3c15d775e1c44adb7e5075c1"' : 'data-target="#xs-injectables-links-module-FilesModule-4a6acc72530f50c9bdb7e5c4ad2652ac4eb3951a824d57125934b7da9ccb1806c91d7c19cb26b494c19fea60725cc0a0f7d772ba3c15d775e1c44adb7e5075c1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-4a6acc72530f50c9bdb7e5c4ad2652ac4eb3951a824d57125934b7da9ccb1806c91d7c19cb26b494c19fea60725cc0a0f7d772ba3c15d775e1c44adb7e5075c1"' :
                                        'id="xs-injectables-links-module-FilesModule-4a6acc72530f50c9bdb7e5c4ad2652ac4eb3951a824d57125934b7da9ccb1806c91d7c19cb26b494c19fea60725cc0a0f7d772ba3c15d775e1c44adb7e5075c1"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GoogleAuthenticationModule.html" data-type="entity-link" >GoogleAuthenticationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-GoogleAuthenticationModule-1e3d06d3ba415c34d5474ede0577a614c4953e6dc4416ff7fdefe39c5b961feab06d974ab8a629bd263b4a3b5fb13ee77a1ba3f2785963f0e0553527cfab3e51"' : 'data-target="#xs-controllers-links-module-GoogleAuthenticationModule-1e3d06d3ba415c34d5474ede0577a614c4953e6dc4416ff7fdefe39c5b961feab06d974ab8a629bd263b4a3b5fb13ee77a1ba3f2785963f0e0553527cfab3e51"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-GoogleAuthenticationModule-1e3d06d3ba415c34d5474ede0577a614c4953e6dc4416ff7fdefe39c5b961feab06d974ab8a629bd263b4a3b5fb13ee77a1ba3f2785963f0e0553527cfab3e51"' :
                                            'id="xs-controllers-links-module-GoogleAuthenticationModule-1e3d06d3ba415c34d5474ede0577a614c4953e6dc4416ff7fdefe39c5b961feab06d974ab8a629bd263b4a3b5fb13ee77a1ba3f2785963f0e0553527cfab3e51"' }>
                                            <li class="link">
                                                <a href="controllers/GoogleAuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAuthenticationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-GoogleAuthenticationModule-1e3d06d3ba415c34d5474ede0577a614c4953e6dc4416ff7fdefe39c5b961feab06d974ab8a629bd263b4a3b5fb13ee77a1ba3f2785963f0e0553527cfab3e51"' : 'data-target="#xs-injectables-links-module-GoogleAuthenticationModule-1e3d06d3ba415c34d5474ede0577a614c4953e6dc4416ff7fdefe39c5b961feab06d974ab8a629bd263b4a3b5fb13ee77a1ba3f2785963f0e0553527cfab3e51"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GoogleAuthenticationModule-1e3d06d3ba415c34d5474ede0577a614c4953e6dc4416ff7fdefe39c5b961feab06d974ab8a629bd263b4a3b5fb13ee77a1ba3f2785963f0e0553527cfab3e51"' :
                                        'id="xs-injectables-links-module-GoogleAuthenticationModule-1e3d06d3ba415c34d5474ede0577a614c4953e6dc4416ff7fdefe39c5b961feab06d974ab8a629bd263b4a3b5fb13ee77a1ba3f2785963f0e0553527cfab3e51"' }>
                                        <li class="link">
                                            <a href="injectables/GoogleAuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAuthenticationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-HealthModule-6e62ee4ed1c4b120ab382d5c4c641fa96c9586f2aad7d8e82556fb16ba2bbf6dc6cbf941eb1953f8895a8aedcbd78a4315e57c6233191da54005b67a26393efd"' : 'data-target="#xs-controllers-links-module-HealthModule-6e62ee4ed1c4b120ab382d5c4c641fa96c9586f2aad7d8e82556fb16ba2bbf6dc6cbf941eb1953f8895a8aedcbd78a4315e57c6233191da54005b67a26393efd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-6e62ee4ed1c4b120ab382d5c4c641fa96c9586f2aad7d8e82556fb16ba2bbf6dc6cbf941eb1953f8895a8aedcbd78a4315e57c6233191da54005b67a26393efd"' :
                                            'id="xs-controllers-links-module-HealthModule-6e62ee4ed1c4b120ab382d5c4c641fa96c9586f2aad7d8e82556fb16ba2bbf6dc6cbf941eb1953f8895a8aedcbd78a4315e57c6233191da54005b67a26393efd"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoggerModule.html" data-type="entity-link" >LoggerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LoggerModule-5a509d8d55ea86ac473fd801f9124c6e0efc4a58b68fd8df306b7d3fba8269829ea760626a6ef3b1e09a57de5dcdcb5d33900e3805ddcd19f2f50e4245f2a77c"' : 'data-target="#xs-injectables-links-module-LoggerModule-5a509d8d55ea86ac473fd801f9124c6e0efc4a58b68fd8df306b7d3fba8269829ea760626a6ef3b1e09a57de5dcdcb5d33900e3805ddcd19f2f50e4245f2a77c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoggerModule-5a509d8d55ea86ac473fd801f9124c6e0efc4a58b68fd8df306b7d3fba8269829ea760626a6ef3b1e09a57de5dcdcb5d33900e3805ddcd19f2f50e4245f2a77c"' :
                                        'id="xs-injectables-links-module-LoggerModule-5a509d8d55ea86ac473fd801f9124c6e0efc4a58b68fd8df306b7d3fba8269829ea760626a6ef3b1e09a57de5dcdcb5d33900e3805ddcd19f2f50e4245f2a77c"' }>
                                        <li class="link">
                                            <a href="injectables/CustomLogger.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomLogger</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LogsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OptimizeModule.html" data-type="entity-link" >OptimizeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OptimizeModule-40fe0c6b6d302650174ac20c15dc2fb0649fe11ad927b278060a5a53cc327b4446842ceb115eaebcf2e0bc1226e2f5e383515e90233f8f5c1ed9bc319eac02e6"' : 'data-target="#xs-controllers-links-module-OptimizeModule-40fe0c6b6d302650174ac20c15dc2fb0649fe11ad927b278060a5a53cc327b4446842ceb115eaebcf2e0bc1226e2f5e383515e90233f8f5c1ed9bc319eac02e6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OptimizeModule-40fe0c6b6d302650174ac20c15dc2fb0649fe11ad927b278060a5a53cc327b4446842ceb115eaebcf2e0bc1226e2f5e383515e90233f8f5c1ed9bc319eac02e6"' :
                                            'id="xs-controllers-links-module-OptimizeModule-40fe0c6b6d302650174ac20c15dc2fb0649fe11ad927b278060a5a53cc327b4446842ceb115eaebcf2e0bc1226e2f5e383515e90233f8f5c1ed9bc319eac02e6"' }>
                                            <li class="link">
                                                <a href="controllers/OptimizeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OptimizeController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PostsModule-1f99d9523343a57dd2c37050e307d8f1d25499d7bb01ec9c31ccd471a2810d2ec94d37e498f97af5e3b8f697f76ad435dcd55e0f00c99ed682e0d47a59d0eafa"' : 'data-target="#xs-controllers-links-module-PostsModule-1f99d9523343a57dd2c37050e307d8f1d25499d7bb01ec9c31ccd471a2810d2ec94d37e498f97af5e3b8f697f76ad435dcd55e0f00c99ed682e0d47a59d0eafa"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-1f99d9523343a57dd2c37050e307d8f1d25499d7bb01ec9c31ccd471a2810d2ec94d37e498f97af5e3b8f697f76ad435dcd55e0f00c99ed682e0d47a59d0eafa"' :
                                            'id="xs-controllers-links-module-PostsModule-1f99d9523343a57dd2c37050e307d8f1d25499d7bb01ec9c31ccd471a2810d2ec94d37e498f97af5e3b8f697f76ad435dcd55e0f00c99ed682e0d47a59d0eafa"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PostsModule-1f99d9523343a57dd2c37050e307d8f1d25499d7bb01ec9c31ccd471a2810d2ec94d37e498f97af5e3b8f697f76ad435dcd55e0f00c99ed682e0d47a59d0eafa"' : 'data-target="#xs-injectables-links-module-PostsModule-1f99d9523343a57dd2c37050e307d8f1d25499d7bb01ec9c31ccd471a2810d2ec94d37e498f97af5e3b8f697f76ad435dcd55e0f00c99ed682e0d47a59d0eafa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-1f99d9523343a57dd2c37050e307d8f1d25499d7bb01ec9c31ccd471a2810d2ec94d37e498f97af5e3b8f697f76ad435dcd55e0f00c99ed682e0d47a59d0eafa"' :
                                        'id="xs-injectables-links-module-PostsModule-1f99d9523343a57dd2c37050e307d8f1d25499d7bb01ec9c31ccd471a2810d2ec94d37e498f97af5e3b8f697f76ad435dcd55e0f00c99ed682e0d47a59d0eafa"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductCategoriesModule.html" data-type="entity-link" >ProductCategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductCategoriesModule-055a0790c617bccfb395dbaf6131c072df04cfdce3e4c3343c06bd1550d3103ed7b76565902334f51bdaca3064381365881782ae2df0f12e0212048c9367d12b"' : 'data-target="#xs-controllers-links-module-ProductCategoriesModule-055a0790c617bccfb395dbaf6131c072df04cfdce3e4c3343c06bd1550d3103ed7b76565902334f51bdaca3064381365881782ae2df0f12e0212048c9367d12b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductCategoriesModule-055a0790c617bccfb395dbaf6131c072df04cfdce3e4c3343c06bd1550d3103ed7b76565902334f51bdaca3064381365881782ae2df0f12e0212048c9367d12b"' :
                                            'id="xs-controllers-links-module-ProductCategoriesModule-055a0790c617bccfb395dbaf6131c072df04cfdce3e4c3343c06bd1550d3103ed7b76565902334f51bdaca3064381365881782ae2df0f12e0212048c9367d12b"' }>
                                            <li class="link">
                                                <a href="controllers/ProductCategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductCategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductCategoriesModule-055a0790c617bccfb395dbaf6131c072df04cfdce3e4c3343c06bd1550d3103ed7b76565902334f51bdaca3064381365881782ae2df0f12e0212048c9367d12b"' : 'data-target="#xs-injectables-links-module-ProductCategoriesModule-055a0790c617bccfb395dbaf6131c072df04cfdce3e4c3343c06bd1550d3103ed7b76565902334f51bdaca3064381365881782ae2df0f12e0212048c9367d12b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductCategoriesModule-055a0790c617bccfb395dbaf6131c072df04cfdce3e4c3343c06bd1550d3103ed7b76565902334f51bdaca3064381365881782ae2df0f12e0212048c9367d12b"' :
                                        'id="xs-injectables-links-module-ProductCategoriesModule-055a0790c617bccfb395dbaf6131c072df04cfdce3e4c3343c06bd1550d3103ed7b76565902334f51bdaca3064381365881782ae2df0f12e0212048c9367d12b"' }>
                                        <li class="link">
                                            <a href="injectables/ProductCategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductCategoriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductsModule-85c955ec02f4df36be19fe2b7ea895b6def2aedbfd766a13b29afaaecc46b2526a1f59b8eb84f1723d9a6f5ed221712b940b74babaffc340e6dcee7105d0fdce"' : 'data-target="#xs-controllers-links-module-ProductsModule-85c955ec02f4df36be19fe2b7ea895b6def2aedbfd766a13b29afaaecc46b2526a1f59b8eb84f1723d9a6f5ed221712b940b74babaffc340e6dcee7105d0fdce"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-85c955ec02f4df36be19fe2b7ea895b6def2aedbfd766a13b29afaaecc46b2526a1f59b8eb84f1723d9a6f5ed221712b940b74babaffc340e6dcee7105d0fdce"' :
                                            'id="xs-controllers-links-module-ProductsModule-85c955ec02f4df36be19fe2b7ea895b6def2aedbfd766a13b29afaaecc46b2526a1f59b8eb84f1723d9a6f5ed221712b940b74babaffc340e6dcee7105d0fdce"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductsModule-85c955ec02f4df36be19fe2b7ea895b6def2aedbfd766a13b29afaaecc46b2526a1f59b8eb84f1723d9a6f5ed221712b940b74babaffc340e6dcee7105d0fdce"' : 'data-target="#xs-injectables-links-module-ProductsModule-85c955ec02f4df36be19fe2b7ea895b6def2aedbfd766a13b29afaaecc46b2526a1f59b8eb84f1723d9a6f5ed221712b940b74babaffc340e6dcee7105d0fdce"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-85c955ec02f4df36be19fe2b7ea895b6def2aedbfd766a13b29afaaecc46b2526a1f59b8eb84f1723d9a6f5ed221712b940b74babaffc340e6dcee7105d0fdce"' :
                                        'id="xs-injectables-links-module-ProductsModule-85c955ec02f4df36be19fe2b7ea895b6def2aedbfd766a13b29afaaecc46b2526a1f59b8eb84f1723d9a6f5ed221712b940b74babaffc340e6dcee7105d0fdce"' }>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PubSubModule.html" data-type="entity-link" >PubSubModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SmsModule.html" data-type="entity-link" >SmsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SmsModule-36a2179062b38da19c338d9e70cb09ce27a636ce3f11f50750f780b055c7749bb675d62b892f7b0d7fae01d857290729ad99136b12178a18fdbbfc362eefbca4"' : 'data-target="#xs-controllers-links-module-SmsModule-36a2179062b38da19c338d9e70cb09ce27a636ce3f11f50750f780b055c7749bb675d62b892f7b0d7fae01d857290729ad99136b12178a18fdbbfc362eefbca4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SmsModule-36a2179062b38da19c338d9e70cb09ce27a636ce3f11f50750f780b055c7749bb675d62b892f7b0d7fae01d857290729ad99136b12178a18fdbbfc362eefbca4"' :
                                            'id="xs-controllers-links-module-SmsModule-36a2179062b38da19c338d9e70cb09ce27a636ce3f11f50750f780b055c7749bb675d62b892f7b0d7fae01d857290729ad99136b12178a18fdbbfc362eefbca4"' }>
                                            <li class="link">
                                                <a href="controllers/SmsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SmsModule-36a2179062b38da19c338d9e70cb09ce27a636ce3f11f50750f780b055c7749bb675d62b892f7b0d7fae01d857290729ad99136b12178a18fdbbfc362eefbca4"' : 'data-target="#xs-injectables-links-module-SmsModule-36a2179062b38da19c338d9e70cb09ce27a636ce3f11f50750f780b055c7749bb675d62b892f7b0d7fae01d857290729ad99136b12178a18fdbbfc362eefbca4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SmsModule-36a2179062b38da19c338d9e70cb09ce27a636ce3f11f50750f780b055c7749bb675d62b892f7b0d7fae01d857290729ad99136b12178a18fdbbfc362eefbca4"' :
                                        'id="xs-injectables-links-module-SmsModule-36a2179062b38da19c338d9e70cb09ce27a636ce3f11f50750f780b055c7749bb675d62b892f7b0d7fae01d857290729ad99136b12178a18fdbbfc362eefbca4"' }>
                                        <li class="link">
                                            <a href="injectables/SmsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StripeModule.html" data-type="entity-link" >StripeModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StripeModule-524b4e9a500f786e98cc03d056f58f87ac900859d34708acb2ab3f1109bd9107106ee51d7cc2f84de1562c6f62b02a50216c478cc0e6727ac64d7e416e6c4b82"' : 'data-target="#xs-injectables-links-module-StripeModule-524b4e9a500f786e98cc03d056f58f87ac900859d34708acb2ab3f1109bd9107106ee51d7cc2f84de1562c6f62b02a50216c478cc0e6727ac64d7e416e6c4b82"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StripeModule-524b4e9a500f786e98cc03d056f58f87ac900859d34708acb2ab3f1109bd9107106ee51d7cc2f84de1562c6f62b02a50216c478cc0e6727ac64d7e416e6c4b82"' :
                                        'id="xs-injectables-links-module-StripeModule-524b4e9a500f786e98cc03d056f58f87ac900859d34708acb2ab3f1109bd9107106ee51d7cc2f84de1562c6f62b02a50216c478cc0e6727ac64d7e416e6c4b82"' }>
                                        <li class="link">
                                            <a href="injectables/StripeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StripeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StripeWebhookModule.html" data-type="entity-link" >StripeWebhookModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-StripeWebhookModule-bec16cd3b5ffe320ae904776fcadbffc203e1f6921381297bdacb33f5a46593b067d1c2db4e08d28177f9ddb885574a5bb7a3fc4c2fb0f74f19edf97e181901b"' : 'data-target="#xs-controllers-links-module-StripeWebhookModule-bec16cd3b5ffe320ae904776fcadbffc203e1f6921381297bdacb33f5a46593b067d1c2db4e08d28177f9ddb885574a5bb7a3fc4c2fb0f74f19edf97e181901b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StripeWebhookModule-bec16cd3b5ffe320ae904776fcadbffc203e1f6921381297bdacb33f5a46593b067d1c2db4e08d28177f9ddb885574a5bb7a3fc4c2fb0f74f19edf97e181901b"' :
                                            'id="xs-controllers-links-module-StripeWebhookModule-bec16cd3b5ffe320ae904776fcadbffc203e1f6921381297bdacb33f5a46593b067d1c2db4e08d28177f9ddb885574a5bb7a3fc4c2fb0f74f19edf97e181901b"' }>
                                            <li class="link">
                                                <a href="controllers/StripeWebhookController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StripeWebhookController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StripeWebhookModule-bec16cd3b5ffe320ae904776fcadbffc203e1f6921381297bdacb33f5a46593b067d1c2db4e08d28177f9ddb885574a5bb7a3fc4c2fb0f74f19edf97e181901b"' : 'data-target="#xs-injectables-links-module-StripeWebhookModule-bec16cd3b5ffe320ae904776fcadbffc203e1f6921381297bdacb33f5a46593b067d1c2db4e08d28177f9ddb885574a5bb7a3fc4c2fb0f74f19edf97e181901b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StripeWebhookModule-bec16cd3b5ffe320ae904776fcadbffc203e1f6921381297bdacb33f5a46593b067d1c2db4e08d28177f9ddb885574a5bb7a3fc4c2fb0f74f19edf97e181901b"' :
                                        'id="xs-injectables-links-module-StripeWebhookModule-bec16cd3b5ffe320ae904776fcadbffc203e1f6921381297bdacb33f5a46593b067d1c2db4e08d28177f9ddb885574a5bb7a3fc4c2fb0f74f19edf97e181901b"' }>
                                        <li class="link">
                                            <a href="injectables/StripeWebhookService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StripeWebhookService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscribersGrpcModule.html" data-type="entity-link" >SubscribersGrpcModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SubscribersGrpcModule-b727b3e06642ba9d0c25061d38fb9e3ca6fbff9a47f5ea5f39be0e87e687b8fca6c8492effdd2f48f22a566b80a95f046caada72901e724bb13d143b3305a2f5"' : 'data-target="#xs-controllers-links-module-SubscribersGrpcModule-b727b3e06642ba9d0c25061d38fb9e3ca6fbff9a47f5ea5f39be0e87e687b8fca6c8492effdd2f48f22a566b80a95f046caada72901e724bb13d143b3305a2f5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscribersGrpcModule-b727b3e06642ba9d0c25061d38fb9e3ca6fbff9a47f5ea5f39be0e87e687b8fca6c8492effdd2f48f22a566b80a95f046caada72901e724bb13d143b3305a2f5"' :
                                            'id="xs-controllers-links-module-SubscribersGrpcModule-b727b3e06642ba9d0c25061d38fb9e3ca6fbff9a47f5ea5f39be0e87e687b8fca6c8492effdd2f48f22a566b80a95f046caada72901e724bb13d143b3305a2f5"' }>
                                            <li class="link">
                                                <a href="controllers/SubscribersGrpcController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersGrpcController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscribersModule.html" data-type="entity-link" >SubscribersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SubscribersModule-838185f7fbfab8905bbf04b0261bd16abc9c737410abd423628afe51703029f62f6c0941023f48416f4df8cf1c78c19f71184892e567d876cface0d57a4a2d93"' : 'data-target="#xs-controllers-links-module-SubscribersModule-838185f7fbfab8905bbf04b0261bd16abc9c737410abd423628afe51703029f62f6c0941023f48416f4df8cf1c78c19f71184892e567d876cface0d57a4a2d93"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscribersModule-838185f7fbfab8905bbf04b0261bd16abc9c737410abd423628afe51703029f62f6c0941023f48416f4df8cf1c78c19f71184892e567d876cface0d57a4a2d93"' :
                                            'id="xs-controllers-links-module-SubscribersModule-838185f7fbfab8905bbf04b0261bd16abc9c737410abd423628afe51703029f62f6c0941023f48416f4df8cf1c78c19f71184892e567d876cface0d57a4a2d93"' }>
                                            <li class="link">
                                                <a href="controllers/SubscribersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscriptionModule.html" data-type="entity-link" >SubscriptionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SubscriptionModule-929227d5ccc5135cf1b42b17bf6638031058fb54da4e5501a0b16da09ace4228275b5bb02fb47ae5120f5e7af2db04aef42520dc5f009240e7d83c03dc6a46e3"' : 'data-target="#xs-controllers-links-module-SubscriptionModule-929227d5ccc5135cf1b42b17bf6638031058fb54da4e5501a0b16da09ace4228275b5bb02fb47ae5120f5e7af2db04aef42520dc5f009240e7d83c03dc6a46e3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscriptionModule-929227d5ccc5135cf1b42b17bf6638031058fb54da4e5501a0b16da09ace4228275b5bb02fb47ae5120f5e7af2db04aef42520dc5f009240e7d83c03dc6a46e3"' :
                                            'id="xs-controllers-links-module-SubscriptionModule-929227d5ccc5135cf1b42b17bf6638031058fb54da4e5501a0b16da09ace4228275b5bb02fb47ae5120f5e7af2db04aef42520dc5f009240e7d83c03dc6a46e3"' }>
                                            <li class="link">
                                                <a href="controllers/SubscriptionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscriptionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SubscriptionModule-929227d5ccc5135cf1b42b17bf6638031058fb54da4e5501a0b16da09ace4228275b5bb02fb47ae5120f5e7af2db04aef42520dc5f009240e7d83c03dc6a46e3"' : 'data-target="#xs-injectables-links-module-SubscriptionModule-929227d5ccc5135cf1b42b17bf6638031058fb54da4e5501a0b16da09ace4228275b5bb02fb47ae5120f5e7af2db04aef42520dc5f009240e7d83c03dc6a46e3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubscriptionModule-929227d5ccc5135cf1b42b17bf6638031058fb54da4e5501a0b16da09ace4228275b5bb02fb47ae5120f5e7af2db04aef42520dc5f009240e7d83c03dc6a46e3"' :
                                        'id="xs-injectables-links-module-SubscriptionModule-929227d5ccc5135cf1b42b17bf6638031058fb54da4e5501a0b16da09ace4228275b5bb02fb47ae5120f5e7af2db04aef42520dc5f009240e7d83c03dc6a46e3"' }>
                                        <li class="link">
                                            <a href="injectables/SubscriptionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscriptionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-20686ecc6d643d4834c63efbf5ff87c39ff081f11b3d77ac353799cc34caaf7d53514ef0aca4cd0c64b403dcdf478718503d7dbdf13e78cd60983a5d1c7bf0cf"' : 'data-target="#xs-controllers-links-module-UsersModule-20686ecc6d643d4834c63efbf5ff87c39ff081f11b3d77ac353799cc34caaf7d53514ef0aca4cd0c64b403dcdf478718503d7dbdf13e78cd60983a5d1c7bf0cf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-20686ecc6d643d4834c63efbf5ff87c39ff081f11b3d77ac353799cc34caaf7d53514ef0aca4cd0c64b403dcdf478718503d7dbdf13e78cd60983a5d1c7bf0cf"' :
                                            'id="xs-controllers-links-module-UsersModule-20686ecc6d643d4834c63efbf5ff87c39ff081f11b3d77ac353799cc34caaf7d53514ef0aca4cd0c64b403dcdf478718503d7dbdf13e78cd60983a5d1c7bf0cf"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-20686ecc6d643d4834c63efbf5ff87c39ff081f11b3d77ac353799cc34caaf7d53514ef0aca4cd0c64b403dcdf478718503d7dbdf13e78cd60983a5d1c7bf0cf"' : 'data-target="#xs-injectables-links-module-UsersModule-20686ecc6d643d4834c63efbf5ff87c39ff081f11b3d77ac353799cc34caaf7d53514ef0aca4cd0c64b403dcdf478718503d7dbdf13e78cd60983a5d1c7bf0cf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-20686ecc6d643d4834c63efbf5ff87c39ff081f11b3d77ac353799cc34caaf7d53514ef0aca4cd0c64b403dcdf478718503d7dbdf13e78cd60983a5d1c7bf0cf"' :
                                        'id="xs-injectables-links-module-UsersModule-20686ecc6d643d4834c63efbf5ff87c39ff081f11b3d77ac353799cc34caaf7d53514ef0aca4cd0c64b403dcdf478718503d7dbdf13e78cd60983a5d1c7bf0cf"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthenticationController.html" data-type="entity-link" >AuthenticationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CategoriesController.html" data-type="entity-link" >CategoriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ChargeController.html" data-type="entity-link" >ChargeController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CommentsController.html" data-type="entity-link" >CommentsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CreditCardsController.html" data-type="entity-link" >CreditCardsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EmailConfirmationController.html" data-type="entity-link" >EmailConfirmationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EmailSchedulingController.html" data-type="entity-link" >EmailSchedulingController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/GoogleAuthenticationController.html" data-type="entity-link" >GoogleAuthenticationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OptimizeController.html" data-type="entity-link" >OptimizeController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductCategoriesController.html" data-type="entity-link" >ProductCategoriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductsController.html" data-type="entity-link" >ProductsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SmsController.html" data-type="entity-link" >SmsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/StripeWebhookController.html" data-type="entity-link" >StripeWebhookController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubscribersController.html" data-type="entity-link" >SubscribersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubscribersGrpcController.html" data-type="entity-link" >SubscribersGrpcController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubscriptionsController.html" data-type="entity-link" >SubscriptionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TwoFactorAuthenticationController.html" data-type="entity-link" >TwoFactorAuthenticationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Address.html" data-type="entity-link" >Address</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Category.html" data-type="entity-link" >Category</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Comment.html" data-type="entity-link" >Comment</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Log.html" data-type="entity-link" >Log</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Message.html" data-type="entity-link" >Message</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PrivateFile.html" data-type="entity-link" >PrivateFile</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Product.html" data-type="entity-link" >Product</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ProductCategory.html" data-type="entity-link" >ProductCategory</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PublicFile.html" data-type="entity-link" >PublicFile</a>
                                </li>
                                <li class="link">
                                    <a href="entities/StripeEvent.html" data-type="entity-link" >StripeEvent</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddCreditCardDto.html" data-type="entity-link" >AddCreditCardDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Author.html" data-type="entity-link" >Author</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryNotFoundException.html" data-type="entity-link" >CategoryNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChatGateway.html" data-type="entity-link" >ChatGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/CheckVerificationCodeDto.html" data-type="entity-link" >CheckVerificationCodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConfirmEmailDto.html" data-type="entity-link" >ConfirmEmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateChargeDto.html" data-type="entity-link" >CreateChargeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentCommand.html" data-type="entity-link" >CreateCommentCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentDto.html" data-type="entity-link" >CreateCommentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentHandler.html" data-type="entity-link" >CreateCommentHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLogDto.html" data-type="entity-link" >CreateLogDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostInput.html" data-type="entity-link" >CreatePostInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductCategoryDto.html" data-type="entity-link" >CreateProductCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriberDto.html" data-type="entity-link" >CreateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseLogger.html" data-type="entity-link" >DatabaseLogger</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailScheduleDto.html" data-type="entity-link" >EmailScheduleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindOneParams.html" data-type="entity-link" >FindOneParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetCommentsDto.html" data-type="entity-link" >GetCommentsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetCommentsHandler.html" data-type="entity-link" >GetCommentsHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetCommentsQuery.html" data-type="entity-link" >GetCommentsQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/ObjectWithId.html" data-type="entity-link" >ObjectWithId</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationParams.html" data-type="entity-link" >PaginationParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/Post.html" data-type="entity-link" >Post</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostNotFoundException.html" data-type="entity-link" >PostNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostsResolver.html" data-type="entity-link" >PostsResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetDefaultCreditCardDto.html" data-type="entity-link" >SetDefaultCreditCardDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Timestamp.html" data-type="entity-link" >Timestamp</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenVerificationDto.html" data-type="entity-link" >TokenVerificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TwoFactorAuthenticationCodeDto.html" data-type="entity-link" >TwoFactorAuthenticationCodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePostDto.html" data-type="entity-link" >UpdatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link" >AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoriesService.html" data-type="entity-link" >CategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChatService.html" data-type="entity-link" >ChatService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomLogger.html" data-type="entity-link" >CustomLogger</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ElasticsearchHealthIndicator.html" data-type="entity-link" >ElasticsearchHealthIndicator</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailConfirmationService.html" data-type="entity-link" >EmailConfirmationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailSchedulingService.html" data-type="entity-link" >EmailSchedulingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailService.html" data-type="entity-link" >EmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExcludeNullInterceptor.html" data-type="entity-link" >ExcludeNullInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAuthenticationService.html" data-type="entity-link" >GoogleAuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GraphqlJwtAuthGuard.html" data-type="entity-link" >GraphqlJwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpCacheInterceptor.html" data-type="entity-link" >HttpCacheInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpLogsMiddleware.html" data-type="entity-link" >HttpLogsMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthenticationGuard.html" data-type="entity-link" >JwtAuthenticationGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshGuard.html" data-type="entity-link" >JwtRefreshGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshTokenStrategy.html" data-type="entity-link" >JwtRefreshTokenStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtTwoFactorGuard.html" data-type="entity-link" >JwtTwoFactorGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtTwoFactorStrategy.html" data-type="entity-link" >JwtTwoFactorStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthenticationGuard.html" data-type="entity-link" >LocalAuthenticationGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogsService.html" data-type="entity-link" >LogsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostLoader.html" data-type="entity-link" >PostLoader</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductCategoriesService.html" data-type="entity-link" >ProductCategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsService.html" data-type="entity-link" >ProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SmsService.html" data-type="entity-link" >SmsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StripeService.html" data-type="entity-link" >StripeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StripeWebhookService.html" data-type="entity-link" >StripeWebhookService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscriptionsService.html" data-type="entity-link" >SubscriptionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TwoFactorAuthenticationService.html" data-type="entity-link" >TwoFactorAuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/EmailConfirmationGuard.html" data-type="entity-link" >EmailConfirmationGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BookProperties.html" data-type="entity-link" >BookProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CarProperties.html" data-type="entity-link" >CarProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestWithRawBody.html" data-type="entity-link" >RequestWithRawBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestWithUser.html" data-type="entity-link" >RequestWithUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubscriberGrpc.html" data-type="entity-link" >SubscriberGrpc</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubscribersGrpcService.html" data-type="entity-link" >SubscribersGrpcService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenPayload.html" data-type="entity-link" >TokenPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VerificationTokenPayload.html" data-type="entity-link" >VerificationTokenPayload</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});