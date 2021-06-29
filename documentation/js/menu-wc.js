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
                    <a href="index.html" data-type="index-link">caiu documentation</a>
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
                                <a href="modules/AccordionModule.html" data-type="entity-link">AccordionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AccordionModule-7ba2695f9487c576877a749f8222392d"' : 'data-target="#xs-components-links-module-AccordionModule-7ba2695f9487c576877a749f8222392d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AccordionModule-7ba2695f9487c576877a749f8222392d"' :
                                            'id="xs-components-links-module-AccordionModule-7ba2695f9487c576877a749f8222392d"' }>
                                            <li class="link">
                                                <a href="components/AccordionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AccordionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AddressModule.html" data-type="entity-link">AddressModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AddressModule-359fd7729c1fbb73593f8459502e67d0"' : 'data-target="#xs-components-links-module-AddressModule-359fd7729c1fbb73593f8459502e67d0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AddressModule-359fd7729c1fbb73593f8459502e67d0"' :
                                            'id="xs-components-links-module-AddressModule-359fd7729c1fbb73593f8459502e67d0"' }>
                                            <li class="link">
                                                <a href="components/AddressComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddressComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddressFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddressFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InlineAddressComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InlineAddressComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StatePickerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StatePickerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AddressModule-359fd7729c1fbb73593f8459502e67d0"' : 'data-target="#xs-pipes-links-module-AddressModule-359fd7729c1fbb73593f8459502e67d0"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AddressModule-359fd7729c1fbb73593f8459502e67d0"' :
                                            'id="xs-pipes-links-module-AddressModule-359fd7729c1fbb73593f8459502e67d0"' }>
                                            <li class="link">
                                                <a href="pipes/AddressPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddressPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AnimationsModule.html" data-type="entity-link">AnimationsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-39b0bc9c8fd5ad60ec59d72cf4adad6f"' : 'data-target="#xs-components-links-module-AppModule-39b0bc9c8fd5ad60ec59d72cf4adad6f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-39b0bc9c8fd5ad60ec59d72cf4adad6f"' :
                                            'id="xs-components-links-module-AppModule-39b0bc9c8fd5ad60ec59d72cf4adad6f"' }>
                                            <li class="link">
                                                <a href="components/AccordionDemoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AccordionDemoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarDemoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarDemoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditorDemoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditorDemoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileControlComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileControlComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileUploadDemoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileUploadDemoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuditModule.html" data-type="entity-link">AuditModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuditModule-67ea550eae36d66c531ead32a8e1b127"' : 'data-target="#xs-components-links-module-AuditModule-67ea550eae36d66c531ead32a8e1b127"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuditModule-67ea550eae36d66c531ead32a8e1b127"' :
                                            'id="xs-components-links-module-AuditModule-67ea550eae36d66c531ead32a8e1b127"' }>
                                            <li class="link">
                                                <a href="components/AuditFieldsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuditFieldsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AuditHistoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuditHistoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AuditHistoryLinkComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuditHistoryLinkComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BreadcrumbsModule.html" data-type="entity-link">BreadcrumbsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BreadcrumbsModule-104ec1248aead170e3649f98b40ae72a"' : 'data-target="#xs-components-links-module-BreadcrumbsModule-104ec1248aead170e3649f98b40ae72a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BreadcrumbsModule-104ec1248aead170e3649f98b40ae72a"' :
                                            'id="xs-components-links-module-BreadcrumbsModule-104ec1248aead170e3649f98b40ae72a"' }>
                                            <li class="link">
                                                <a href="components/BreadcrumbsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BreadcrumbsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CalendarModule.html" data-type="entity-link">CalendarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CalendarModule-f811bb0128ff1cff1ee543de419b4a2b"' : 'data-target="#xs-components-links-module-CalendarModule-f811bb0128ff1cff1ee543de419b4a2b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CalendarModule-f811bb0128ff1cff1ee543de419b4a2b"' :
                                            'id="xs-components-links-module-CalendarModule-f811bb0128ff1cff1ee543de419b4a2b"' }>
                                            <li class="link">
                                                <a href="components/CalendarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarDayComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarDayComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarDayEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarDayEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarDayEventsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarDayEventsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarDayViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarDayViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarDaysComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarDaysComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarEventComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarEventComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarEventFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarEventFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarEventViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarEventViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarKeyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarKeyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CollageModule.html" data-type="entity-link">CollageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CollageModule-62ae7d8de78bfb4dffbf4d266242c3e9"' : 'data-target="#xs-components-links-module-CollageModule-62ae7d8de78bfb4dffbf4d266242c3e9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CollageModule-62ae7d8de78bfb4dffbf4d266242c3e9"' :
                                            'id="xs-components-links-module-CollageModule-62ae7d8de78bfb4dffbf4d266242c3e9"' }>
                                            <li class="link">
                                                <a href="components/CollageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CollageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContainerModule.html" data-type="entity-link">ContainerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ContainerModule-a805d26d2f3e18c70f1b74aa16d33d7b"' : 'data-target="#xs-components-links-module-ContainerModule-a805d26d2f3e18c70f1b74aa16d33d7b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContainerModule-a805d26d2f3e18c70f1b74aa16d33d7b"' :
                                            'id="xs-components-links-module-ContainerModule-a805d26d2f3e18c70f1b74aa16d33d7b"' }>
                                            <li class="link">
                                                <a href="components/ContainerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContainerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatepickerModule.html" data-type="entity-link">DatepickerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DatepickerModule-49a1e15a44b5a6223b60d60e3edf5080"' : 'data-target="#xs-components-links-module-DatepickerModule-49a1e15a44b5a6223b60d60e3edf5080"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DatepickerModule-49a1e15a44b5a6223b60d60e3edf5080"' :
                                            'id="xs-components-links-module-DatepickerModule-49a1e15a44b5a6223b60d60e3edf5080"' }>
                                            <li class="link">
                                                <a href="components/DatepickerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DatepickerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DaterangeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DaterangeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DialogModule.html" data-type="entity-link">DialogModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DialogModule-af6b921faa4d5e7816af1c0115074947"' : 'data-target="#xs-components-links-module-DialogModule-af6b921faa4d5e7816af1c0115074947"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DialogModule-af6b921faa4d5e7816af1c0115074947"' :
                                            'id="xs-components-links-module-DialogModule-af6b921faa4d5e7816af1c0115074947"' }>
                                            <li class="link">
                                                <a href="components/AutoLogoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AutoLogoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmDeleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UnsavedChangesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UnsavedChangesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EditorModule.html" data-type="entity-link">EditorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EditorModule-90d22ed7da41115a2ce818f06697dedc"' : 'data-target="#xs-components-links-module-EditorModule-90d22ed7da41115a2ce818f06697dedc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EditorModule-90d22ed7da41115a2ce818f06697dedc"' :
                                            'id="xs-components-links-module-EditorModule-90d22ed7da41115a2ce818f06697dedc"' }>
                                            <li class="link">
                                                <a href="components/EditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditorWindowComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditorWindowComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EffectsModule.html" data-type="entity-link">EffectsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ErrorsModule.html" data-type="entity-link">ErrorsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EventsModule.html" data-type="entity-link">EventsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EventsModule-ac7a9a221e301be44ec13ef8c7875d62"' : 'data-target="#xs-injectables-links-module-EventsModule-ac7a9a221e301be44ec13ef8c7875d62"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EventsModule-ac7a9a221e301be44ec13ef8c7875d62"' :
                                        'id="xs-injectables-links-module-EventsModule-ac7a9a221e301be44ec13ef8c7875d62"' }>
                                        <li class="link">
                                            <a href="injectables/EventEffects.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EventEffects</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EventsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EventsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FileUploadModule.html" data-type="entity-link">FileUploadModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FileUploadModule-cf9a009f0641ace8b3fa382f7848bf14"' : 'data-target="#xs-components-links-module-FileUploadModule-cf9a009f0641ace8b3fa382f7848bf14"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FileUploadModule-cf9a009f0641ace8b3fa382f7848bf14"' :
                                            'id="xs-components-links-module-FileUploadModule-cf9a009f0641ace8b3fa382f7848bf14"' }>
                                            <li class="link">
                                                <a href="components/FileControlComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileControlComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FilePreviewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilePreviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileUploadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileUploadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UploadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UploaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UploadsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FormsModule.html" data-type="entity-link">FormsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GridModule.html" data-type="entity-link">GridModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GridModule-bfa951a669ea57e2e0aeb67e9b06e479"' : 'data-target="#xs-components-links-module-GridModule-bfa951a669ea57e2e0aeb67e9b06e479"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GridModule-bfa951a669ea57e2e0aeb67e9b06e479"' :
                                            'id="xs-components-links-module-GridModule-bfa951a669ea57e2e0aeb67e9b06e479"' }>
                                            <li class="link">
                                                <a href="components/GridCellComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GridCellComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GridColumnComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GridColumnComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GridComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GridComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SimpleGridComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SimpleGridComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HeaderModule.html" data-type="entity-link">HeaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HeaderModule-1a4b3eefb013ace4af50e06711bf9073"' : 'data-target="#xs-components-links-module-HeaderModule-1a4b3eefb013ace4af50e06711bf9073"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeaderModule-1a4b3eefb013ace4af50e06711bf9073"' :
                                            'id="xs-components-links-module-HeaderModule-1a4b3eefb013ace4af50e06711bf9073"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HttpModule.html" data-type="entity-link">HttpModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HubModule.html" data-type="entity-link">HubModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LibraryModule.html" data-type="entity-link">LibraryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LibraryModule-f292e976d84c45613760f48a4396c856"' : 'data-target="#xs-components-links-module-LibraryModule-f292e976d84c45613760f48a4396c856"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LibraryModule-f292e976d84c45613760f48a4396c856"' :
                                            'id="xs-components-links-module-LibraryModule-f292e976d84c45613760f48a4396c856"' }>
                                            <li class="link">
                                                <a href="components/LibraryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LibraryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LookupModule.html" data-type="entity-link">LookupModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NavbarModule.html" data-type="entity-link">NavbarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NavbarModule-c7d8a8c660f5f63dce9b08ccb9669a60"' : 'data-target="#xs-components-links-module-NavbarModule-c7d8a8c660f5f63dce9b08ccb9669a60"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NavbarModule-c7d8a8c660f5f63dce9b08ccb9669a60"' :
                                            'id="xs-components-links-module-NavbarModule-c7d8a8c660f5f63dce9b08ccb9669a60"' }>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotFoundModule.html" data-type="entity-link">NotFoundModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NotFoundModule-36b360650b4cf0a5a9a9a2835b787d91"' : 'data-target="#xs-components-links-module-NotFoundModule-36b360650b4cf0a5a9a9a2835b787d91"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NotFoundModule-36b360650b4cf0a5a9a9a2835b787d91"' :
                                            'id="xs-components-links-module-NotFoundModule-36b360650b4cf0a5a9a9a2835b787d91"' }>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotFoundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PhoneNumberModule.html" data-type="entity-link">PhoneNumberModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PhoneNumberModule-c942330e5c78d9702539da8cbade608a"' : 'data-target="#xs-components-links-module-PhoneNumberModule-c942330e5c78d9702539da8cbade608a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PhoneNumberModule-c942330e5c78d9702539da8cbade608a"' :
                                            'id="xs-components-links-module-PhoneNumberModule-c942330e5c78d9702539da8cbade608a"' }>
                                            <li class="link">
                                                <a href="components/PhoneNumberComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PhoneNumberComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PipesModule.html" data-type="entity-link">PipesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-PipesModule-70a4a5b0c0f5df3d6991d1b2a919b8a2"' : 'data-target="#xs-pipes-links-module-PipesModule-70a4a5b0c0f5df3d6991d1b2a919b8a2"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-PipesModule-70a4a5b0c0f5df3d6991d1b2a919b8a2"' :
                                            'id="xs-pipes-links-module-PipesModule-70a4a5b0c0f5df3d6991d1b2a919b8a2"' }>
                                            <li class="link">
                                                <a href="pipes/ListPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/PadLeftPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PadLeftPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/PhoneNumberPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PhoneNumberPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SafeHtmlPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SafeHtmlPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TimeAgoPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimeAgoPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/YesNoPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">YesNoPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RouterModule.html" data-type="entity-link">RouterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SidenavModule.html" data-type="entity-link">SidenavModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SidenavModule-19797745992dbf73d5f2d51cd6fd14c1"' : 'data-target="#xs-components-links-module-SidenavModule-19797745992dbf73d5f2d51cd6fd14c1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SidenavModule-19797745992dbf73d5f2d51cd6fd14c1"' :
                                            'id="xs-components-links-module-SidenavModule-19797745992dbf73d5f2d51cd6fd14c1"' }>
                                            <li class="link">
                                                <a href="components/SidenavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidenavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SocialIconsModule.html" data-type="entity-link">SocialIconsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SocialIconsModule-6f31033ff028529101edd90ba0b8d4c5"' : 'data-target="#xs-components-links-module-SocialIconsModule-6f31033ff028529101edd90ba0b8d4c5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SocialIconsModule-6f31033ff028529101edd90ba0b8d4c5"' :
                                            'id="xs-components-links-module-SocialIconsModule-6f31033ff028529101edd90ba0b8d4c5"' }>
                                            <li class="link">
                                                <a href="components/SocialIconsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SocialIconsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StorageModule.html" data-type="entity-link">StorageModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StoreModule.html" data-type="entity-link">StoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TileModule.html" data-type="entity-link">TileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TileModule-6aad523b7ec71c5f22490ca3beae2a1b"' : 'data-target="#xs-components-links-module-TileModule-6aad523b7ec71c5f22490ca3beae2a1b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TileModule-6aad523b7ec71c5f22490ca3beae2a1b"' :
                                            'id="xs-components-links-module-TileModule-6aad523b7ec71c5f22490ca3beae2a1b"' }>
                                            <li class="link">
                                                <a href="components/TileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TimeModule.html" data-type="entity-link">TimeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TimeModule-71adf4844980c9eebce17f710740e4b8"' : 'data-target="#xs-components-links-module-TimeModule-71adf4844980c9eebce17f710740e4b8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TimeModule-71adf4844980c9eebce17f710740e4b8"' :
                                            'id="xs-components-links-module-TimeModule-71adf4844980c9eebce17f710740e4b8"' }>
                                            <li class="link">
                                                <a href="components/DateTimeControlComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DateTimeControlComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TimeControlComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimeControlComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TimerModule.html" data-type="entity-link">TimerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TimerModule-422d65ee40c2204fc4fca1850c15e40e"' : 'data-target="#xs-components-links-module-TimerModule-422d65ee40c2204fc4fca1850c15e40e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TimerModule-422d65ee40c2204fc4fca1850c15e40e"' :
                                            'id="xs-components-links-module-TimerModule-422d65ee40c2204fc4fca1850c15e40e"' }>
                                            <li class="link">
                                                <a href="components/TimerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-TimerModule-422d65ee40c2204fc4fca1850c15e40e"' : 'data-target="#xs-pipes-links-module-TimerModule-422d65ee40c2204fc4fca1850c15e40e"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-TimerModule-422d65ee40c2204fc4fca1850c15e40e"' :
                                            'id="xs-pipes-links-module-TimerModule-422d65ee40c2204fc4fca1850c15e40e"' }>
                                            <li class="link">
                                                <a href="pipes/TimerPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimerPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WallpaperModule.html" data-type="entity-link">WallpaperModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WallpaperModule-1f260d40b8769104d85e7ac82a764bde"' : 'data-target="#xs-components-links-module-WallpaperModule-1f260d40b8769104d85e7ac82a764bde"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WallpaperModule-1f260d40b8769104d85e7ac82a764bde"' :
                                            'id="xs-components-links-module-WallpaperModule-1f260d40b8769104d85e7ac82a764bde"' }>
                                            <li class="link">
                                                <a href="components/WallpaperComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WallpaperComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WidgetsModule.html" data-type="entity-link">WidgetsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WidgetsModule-6442946079185ddf83fbac1c6f4fd406"' : 'data-target="#xs-components-links-module-WidgetsModule-6442946079185ddf83fbac1c6f4fd406"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WidgetsModule-6442946079185ddf83fbac1c6f4fd406"' :
                                            'id="xs-components-links-module-WidgetsModule-6442946079185ddf83fbac1c6f4fd406"' }>
                                            <li class="link">
                                                <a href="components/WidgetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WidgetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WidgetsMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WidgetsMenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                <a href="classes/ActionStore.html" data-type="entity-link">ActionStore</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActivatedRoutePayload.html" data-type="entity-link">ActivatedRoutePayload</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddLookupPayload.html" data-type="entity-link">AddLookupPayload</a>
                            </li>
                            <li class="link">
                                <a href="classes/Address.html" data-type="entity-link">Address</a>
                            </li>
                            <li class="link">
                                <a href="classes/Alert.html" data-type="entity-link">Alert</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppActions.html" data-type="entity-link">AppActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Audited.html" data-type="entity-link">Audited</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuditHistory.html" data-type="entity-link">AuditHistory</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuditHistoryRow.html" data-type="entity-link">AuditHistoryRow</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseEntity.html" data-type="entity-link">BaseEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseQueryModel.html" data-type="entity-link">BaseQueryModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Breadcrumbs.html" data-type="entity-link">Breadcrumbs</a>
                            </li>
                            <li class="link">
                                <a href="classes/Calendar.html" data-type="entity-link">Calendar</a>
                            </li>
                            <li class="link">
                                <a href="classes/CalendarDay.html" data-type="entity-link">CalendarDay</a>
                            </li>
                            <li class="link">
                                <a href="classes/CalendarEvent.html" data-type="entity-link">CalendarEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/CalendarEventType.html" data-type="entity-link">CalendarEventType</a>
                            </li>
                            <li class="link">
                                <a href="classes/Collage.html" data-type="entity-link">Collage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Collection.html" data-type="entity-link">Collection</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColumnMetadata.html" data-type="entity-link">ColumnMetadata</a>
                            </li>
                            <li class="link">
                                <a href="classes/Config.html" data-type="entity-link">Config</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConfigActions.html" data-type="entity-link">ConfigActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/Coordinates.html" data-type="entity-link">Coordinates</a>
                            </li>
                            <li class="link">
                                <a href="classes/CurrentUser.html" data-type="entity-link">CurrentUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/CurrentUserActions.html" data-type="entity-link">CurrentUserActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomRoute.html" data-type="entity-link">CustomRoute</a>
                            </li>
                            <li class="link">
                                <a href="classes/DateHelper.html" data-type="entity-link">DateHelper</a>
                            </li>
                            <li class="link">
                                <a href="classes/DateRange.html" data-type="entity-link">DateRange</a>
                            </li>
                            <li class="link">
                                <a href="classes/DateTime.html" data-type="entity-link">DateTime</a>
                            </li>
                            <li class="link">
                                <a href="classes/DialogAction.html" data-type="entity-link">DialogAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/DialogModel.html" data-type="entity-link">DialogModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Dimensions.html" data-type="entity-link">Dimensions</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditorForm.html" data-type="entity-link">EditorForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/Email.html" data-type="entity-link">Email</a>
                            </li>
                            <li class="link">
                                <a href="classes/Error.html" data-type="entity-link">Error</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorActions.html" data-type="entity-link">ErrorActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/Event.html" data-type="entity-link">Event</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventActions.html" data-type="entity-link">EventActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/Events.html" data-type="entity-link">Events</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExampleForm.html" data-type="entity-link">ExampleForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link">File</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileUpload.html" data-type="entity-link">FileUpload</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileUploadForm.html" data-type="entity-link">FileUploadForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileUploads.html" data-type="entity-link">FileUploads</a>
                            </li>
                            <li class="link">
                                <a href="classes/Filters.html" data-type="entity-link">Filters</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormActions.html" data-type="entity-link">FormActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormArray.html" data-type="entity-link">FormArray</a>
                            </li>
                            <li class="link">
                                <a href="classes/Grid.html" data-type="entity-link">Grid</a>
                            </li>
                            <li class="link">
                                <a href="classes/GridColumn.html" data-type="entity-link">GridColumn</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpActions.html" data-type="entity-link">HttpActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpDeletePayload.html" data-type="entity-link">HttpDeletePayload</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpGetPayload.html" data-type="entity-link">HttpGetPayload</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpOptions.html" data-type="entity-link">HttpOptions</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpPostPayload.html" data-type="entity-link">HttpPostPayload</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpPutPayload.html" data-type="entity-link">HttpPutPayload</a>
                            </li>
                            <li class="link">
                                <a href="classes/Image.html" data-type="entity-link">Image</a>
                            </li>
                            <li class="link">
                                <a href="classes/LazyRoute.html" data-type="entity-link">LazyRoute</a>
                            </li>
                            <li class="link">
                                <a href="classes/Login.html" data-type="entity-link">Login</a>
                            </li>
                            <li class="link">
                                <a href="classes/Lookup.html" data-type="entity-link">Lookup</a>
                            </li>
                            <li class="link">
                                <a href="classes/LookupActions.html" data-type="entity-link">LookupActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/Lookups.html" data-type="entity-link">Lookups</a>
                            </li>
                            <li class="link">
                                <a href="classes/LookupValue.html" data-type="entity-link">LookupValue</a>
                            </li>
                            <li class="link">
                                <a href="classes/Message.html" data-type="entity-link">Message</a>
                            </li>
                            <li class="link">
                                <a href="classes/Messages.html" data-type="entity-link">Messages</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessagesActions.html" data-type="entity-link">MessagesActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessageSubscription.html" data-type="entity-link">MessageSubscription</a>
                            </li>
                            <li class="link">
                                <a href="classes/Metadata.html" data-type="entity-link">Metadata</a>
                            </li>
                            <li class="link">
                                <a href="classes/MilitaryDateTime.html" data-type="entity-link">MilitaryDateTime</a>
                            </li>
                            <li class="link">
                                <a href="classes/MilitaryTime.html" data-type="entity-link">MilitaryTime</a>
                            </li>
                            <li class="link">
                                <a href="classes/Month.html" data-type="entity-link">Month</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewUser.html" data-type="entity-link">NewUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderedItem.html" data-type="entity-link">OrderedItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ordering.html" data-type="entity-link">Ordering</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrganizationsActions.html" data-type="entity-link">OrganizationsActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permutation.html" data-type="entity-link">Permutation</a>
                            </li>
                            <li class="link">
                                <a href="classes/PhoneNumber.html" data-type="entity-link">PhoneNumber</a>
                            </li>
                            <li class="link">
                                <a href="classes/PropertyMetadata.html" data-type="entity-link">PropertyMetadata</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryItem.html" data-type="entity-link">QueryItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryModel.html" data-type="entity-link">QueryModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Question.html" data-type="entity-link">Question</a>
                            </li>
                            <li class="link">
                                <a href="classes/Questions.html" data-type="entity-link">Questions</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionsModel.html" data-type="entity-link">QuestionsModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Redirect.html" data-type="entity-link">Redirect</a>
                            </li>
                            <li class="link">
                                <a href="classes/RedirectActions.html" data-type="entity-link">RedirectActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/Redirects.html" data-type="entity-link">Redirects</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPassword.html" data-type="entity-link">ResetPassword</a>
                            </li>
                            <li class="link">
                                <a href="classes/RouterActions.html" data-type="entity-link">RouterActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/RouterState.html" data-type="entity-link">RouterState</a>
                            </li>
                            <li class="link">
                                <a href="classes/RouteSegment.html" data-type="entity-link">RouteSegment</a>
                            </li>
                            <li class="link">
                                <a href="classes/Search.html" data-type="entity-link">Search</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchResults.html" data-type="entity-link">SearchResults</a>
                            </li>
                            <li class="link">
                                <a href="classes/SidenavActions.html" data-type="entity-link">SidenavActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/Storage.html" data-type="entity-link">Storage</a>
                            </li>
                            <li class="link">
                                <a href="classes/StorageActions.html" data-type="entity-link">StorageActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/StreamActions.html" data-type="entity-link">StreamActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/StyleModel.html" data-type="entity-link">StyleModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tile.html" data-type="entity-link">Tile</a>
                            </li>
                            <li class="link">
                                <a href="classes/Time.html" data-type="entity-link">Time</a>
                            </li>
                            <li class="link">
                                <a href="classes/Timer.html" data-type="entity-link">Timer</a>
                            </li>
                            <li class="link">
                                <a href="classes/Token.html" data-type="entity-link">Token</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tree.html" data-type="entity-link">Tree</a>
                            </li>
                            <li class="link">
                                <a href="classes/TreeItem.html" data-type="entity-link">TreeItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateValuePayload.html" data-type="entity-link">UpdateValuePayload</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRoles.html" data-type="entity-link">UserRoles</a>
                            </li>
                            <li class="link">
                                <a href="classes/Validators.html" data-type="entity-link">Validators</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewConfig.html" data-type="entity-link">ViewConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewSettings.html" data-type="entity-link">ViewSettings</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewSettingsActions.html" data-type="entity-link">ViewSettingsActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/VisitedRoute.html" data-type="entity-link">VisitedRoute</a>
                            </li>
                            <li class="link">
                                <a href="classes/Weekday.html" data-type="entity-link">Weekday</a>
                            </li>
                            <li class="link">
                                <a href="classes/Widget.html" data-type="entity-link">Widget</a>
                            </li>
                            <li class="link">
                                <a href="classes/Widgets.html" data-type="entity-link">Widgets</a>
                            </li>
                            <li class="link">
                                <a href="classes/WidgetsActions.html" data-type="entity-link">WidgetsActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/Window.html" data-type="entity-link">Window</a>
                            </li>
                            <li class="link">
                                <a href="classes/WindowActions.html" data-type="entity-link">WindowActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/WindowResize.html" data-type="entity-link">WindowResize</a>
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
                                    <a href="injectables/ActionsEffects.html" data-type="entity-link">ActionsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorEffects.html" data-type="entity-link">ErrorEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorsService.html" data-type="entity-link">ErrorsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventEffects.html" data-type="entity-link">EventEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventsService.html" data-type="entity-link">EventsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalErrorsService.html" data-type="entity-link">GlobalErrorsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpCommands.html" data-type="entity-link">HttpCommands</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpEffects.html" data-type="entity-link">HttpEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpService.html" data-type="entity-link">HttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HubService.html" data-type="entity-link">HubService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LibraryService.html" data-type="entity-link">LibraryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LookupService.html" data-type="entity-link">LookupService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessagesEffects.html" data-type="entity-link">MessagesEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RouterEffects.html" data-type="entity-link">RouterEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RouterService.html" data-type="entity-link">RouterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageEffects.html" data-type="entity-link">StorageEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageService.html" data-type="entity-link">StorageService</a>
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
                                <a href="guards/AuthenticatedGuard.html" data-type="entity-link">AuthenticatedGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/CanDeactivateGuard.html" data-type="entity-link">CanDeactivateGuard</a>
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
                                <a href="interfaces/Action.html" data-type="entity-link">Action</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActionWithKey.html" data-type="entity-link">ActionWithKey</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActionWithPayload.html" data-type="entity-link">ActionWithPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AggregateDescriptor.html" data-type="entity-link">AggregateDescriptor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Audit.html" data-type="entity-link">Audit</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CanComponentDeactivate.html" data-type="entity-link">CanComponentDeactivate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompositeFilterDescriptor.html" data-type="entity-link">CompositeFilterDescriptor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataResult.html" data-type="entity-link">DataResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataStateChangeEvent.html" data-type="entity-link">DataStateChangeEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Dictionary.html" data-type="entity-link">Dictionary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Distance.html" data-type="entity-link">Distance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Editor.html" data-type="entity-link">Editor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditorEvent.html" data-type="entity-link">EditorEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorOutlet.html" data-type="entity-link">ErrorOutlet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorPayload.html" data-type="entity-link">ErrorPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventObj.html" data-type="entity-link">EventObj</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExampleFlatNode.html" data-type="entity-link">ExampleFlatNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterDescriptor.html" data-type="entity-link">FilterDescriptor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FoodNode.html" data-type="entity-link">FoodNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GridDataResult.html" data-type="entity-link">GridDataResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupableSettings.html" data-type="entity-link">GroupableSettings</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupDescriptor.html" data-type="entity-link">GroupDescriptor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HasId.html" data-type="entity-link">HasId</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HasMetadata.html" data-type="entity-link">HasMetadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HttpAction.html" data-type="entity-link">HttpAction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HttpActionPayload.html" data-type="entity-link">HttpActionPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStateObj.html" data-type="entity-link">IStateObj</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageChangeEvent.html" data-type="entity-link">PageChangeEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Reducers.html" data-type="entity-link">Reducers</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouterEvent.html" data-type="entity-link">RouterEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SortDescriptor.html" data-type="entity-link">SortDescriptor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Type.html" data-type="entity-link">Type</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TypeConstructor.html" data-type="entity-link">TypeConstructor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UnsafeAction.html" data-type="entity-link">UnsafeAction</a>
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
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
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