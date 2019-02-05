(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular-redux/store'), require('@angular/common'), require('@angular/core'), require('@angular/router'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@angular-redux/router', ['exports', '@angular-redux/store', '@angular/common', '@angular/core', '@angular/router', 'rxjs/operators'], factory) :
    (factory((global['angular-redux'] = global['angular-redux'] || {}, global['angular-redux'].router = {}),null,global.ng.common,global.ng.core,global.ng.router,global.rxjs.operators));
}(this, (function (exports,store,common,core,router,operators) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var UPDATE_LOCATION = '@angular-redux/router::UPDATE_LOCATION';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DefaultRouterState = '';
    /**
     * @param {?=} state
     * @param {?=} action
     * @return {?}
     */
    function routerReducer(state, action) {
        if (state === void 0) {
            state = DefaultRouterState;
        }
        switch (action.type) {
            case UPDATE_LOCATION:
                return action.payload || DefaultRouterState;
            default:
                return state;
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgReduxRouter = (function () {
        function NgReduxRouter(router$$1, ngRedux, applicationRef, location) {
            this.router = router$$1;
            this.ngRedux = ngRedux;
            this.applicationRef = applicationRef;
            this.location = location;
            this.initialized = false;
            this.selectLocationFromState = function (state) {
                return state.router;
            };
        }
        /**
         * Destroys the bindings between @angular-redux/router and @angular/router.
         * This method unsubscribes from both @angular-redux/router and @angular router, in case
         * your app needs to tear down the bindings without destroying Angular or Redux
         * at the same time.
         */
        /**
         * Destroys the bindings between \@angular-redux/router and \@angular/router.
         * This method unsubscribes from both \@angular-redux/router and \@angular router, in case
         * your app needs to tear down the bindings without destroying Angular or Redux
         * at the same time.
         * @return {?}
         */
        NgReduxRouter.prototype.destroy = /**
         * Destroys the bindings between \@angular-redux/router and \@angular/router.
         * This method unsubscribes from both \@angular-redux/router and \@angular router, in case
         * your app needs to tear down the bindings without destroying Angular or Redux
         * at the same time.
         * @return {?}
         */
            function () {
                if (this.urlStateSubscription) {
                    this.urlStateSubscription.unsubscribe();
                }
                if (this.reduxSubscription) {
                    this.reduxSubscription.unsubscribe();
                }
                this.initialized = false;
            };
        /**
         * Initialize the bindings between @angular-redux/router and @angular/router
         *
         * This should only be called once for the lifetime of your app, for
         * example in the constructor of your root component.
         *
         *
         * @param selectLocationFromState Optional: If your
         * router state is in a custom location, supply this argument to tell the
         * bindings where to find the router location in the state.
         * @param urlState$ Optional: If you have a custom setup
         * when listening to router changes, or use a different router than @angular/router
         * you can supply this argument as an Observable of the current url state.
         */
        /**
         * Initialize the bindings between \@angular-redux/router and \@angular/router
         *
         * This should only be called once for the lifetime of your app, for
         * example in the constructor of your root component.
         *
         *
         * @param {?=} selectLocationFromState Optional: If your
         * router state is in a custom location, supply this argument to tell the
         * bindings where to find the router location in the state.
         * @param {?=} urlState$ Optional: If you have a custom setup
         * when listening to router changes, or use a different router than \@angular/router
         * you can supply this argument as an Observable of the current url state.
         * @return {?}
         */
        NgReduxRouter.prototype.initialize = /**
         * Initialize the bindings between \@angular-redux/router and \@angular/router
         *
         * This should only be called once for the lifetime of your app, for
         * example in the constructor of your root component.
         *
         *
         * @param {?=} selectLocationFromState Optional: If your
         * router state is in a custom location, supply this argument to tell the
         * bindings where to find the router location in the state.
         * @param {?=} urlState$ Optional: If you have a custom setup
         * when listening to router changes, or use a different router than \@angular/router
         * you can supply this argument as an Observable of the current url state.
         * @return {?}
         */
            function (selectLocationFromState, urlState$) {
                if (selectLocationFromState === void 0) {
                    selectLocationFromState = function (state) { return state.router; };
                }
                if (this.initialized) {
                    throw new Error('@angular-redux/router already initialized! If you meant to re-initialize, call destroy first.');
                }
                this.selectLocationFromState = selectLocationFromState;
                this.urlState = urlState$ || this.getDefaultUrlStateObservable();
                this.listenToRouterChanges();
                this.listenToReduxChanges();
                this.initialized = true;
            };
        /**
         * @return {?}
         */
        NgReduxRouter.prototype.getDefaultUrlStateObservable = /**
         * @return {?}
         */
            function () {
                var _this = this;
                return this.router.events.pipe(operators.filter(function (event) { return event instanceof router.NavigationEnd; }), operators.map(function (event) { return _this.location.path(); }), operators.distinctUntilChanged());
            };
        /**
         * @param {?=} useInitial
         * @return {?}
         */
        NgReduxRouter.prototype.getLocationFromStore = /**
         * @param {?=} useInitial
         * @return {?}
         */
            function (useInitial) {
                if (useInitial === void 0) {
                    useInitial = false;
                }
                return (this.selectLocationFromState(this.ngRedux.getState()) ||
                    (useInitial ? this.initialLocation : ''));
            };
        /**
         * @return {?}
         */
        NgReduxRouter.prototype.listenToRouterChanges = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var handleLocationChange = function (location) {
                    if (_this.currentLocation === location) {
                        // Dont dispatch changes if we haven't changed location.
                        return;
                    }
                    _this.currentLocation = location;
                    if (_this.initialLocation === undefined) {
                        _this.initialLocation = location;
                        /** @type {?} */
                        var locationFromStore = _this.getLocationFromStore();
                        if (locationFromStore === _this.currentLocation) {
                            return;
                        }
                    }
                    _this.ngRedux.dispatch({
                        type: UPDATE_LOCATION,
                        payload: location,
                    });
                };
                if (this.urlState) {
                    this.urlStateSubscription = this.urlState.subscribe(handleLocationChange);
                }
            };
        /**
         * @return {?}
         */
        NgReduxRouter.prototype.listenToReduxChanges = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var handleLocationChange = function (location) {
                    if (_this.initialLocation === undefined) {
                        // Wait for router to set initial location.
                        return;
                    }
                    /** @type {?} */
                    var locationInStore = _this.getLocationFromStore(true);
                    if (_this.currentLocation === locationInStore) {
                        // Dont change router location if its equal to the one in the store.
                        return;
                    }
                    _this.currentLocation = location;
                    _this.router.navigateByUrl(location);
                };
                this.reduxSubscription = this.ngRedux
                    .select(function (state) { return _this.selectLocationFromState(state); })
                    .pipe(operators.distinctUntilChanged())
                    .subscribe(handleLocationChange);
            };
        NgReduxRouter.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        NgReduxRouter.ctorParameters = function () {
            return [
                { type: router.Router },
                { type: store.NgRedux },
                { type: core.ApplicationRef },
                { type: common.Location }
            ];
        };
        return NgReduxRouter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgReduxRouterModule = (function () {
        function NgReduxRouterModule() {
        }
        /**
         * @return {?}
         */
        NgReduxRouterModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: NgReduxRouterModule,
                    providers: [NgReduxRouter],
                };
            };
        NgReduxRouterModule.decorators = [
            { type: core.NgModule },
        ];
        return NgReduxRouterModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.NgReduxRouterModule = NgReduxRouterModule;
    exports.NgReduxRouter = NgReduxRouter;
    exports.routerReducer = routerReducer;
    exports.UPDATE_LOCATION = UPDATE_LOCATION;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1yZWR1eC1yb3V0ZXIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AYW5ndWxhci1yZWR1eC9yb3V0ZXIvYWN0aW9ucy50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvcm91dGVyL3JlZHVjZXIudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3JvdXRlci9yb3V0ZXIudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3JvdXRlci9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgVVBEQVRFX0xPQ0FUSU9OOiBzdHJpbmcgPSAnQGFuZ3VsYXItcmVkdXgvcm91dGVyOjpVUERBVEVfTE9DQVRJT04nO1xuIiwiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuXG5pbXBvcnQgeyBVUERBVEVfTE9DQVRJT04gfSBmcm9tICcuL2FjdGlvbnMnO1xuXG5leHBvcnQgY29uc3QgRGVmYXVsdFJvdXRlclN0YXRlOiBzdHJpbmcgPSAnJztcblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXJBY3Rpb24gZXh0ZW5kcyBBY3Rpb24ge1xuICBwYXlsb2FkPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91dGVyUmVkdWNlcihcbiAgc3RhdGU6IHN0cmluZyA9IERlZmF1bHRSb3V0ZXJTdGF0ZSxcbiAgYWN0aW9uOiBSb3V0ZXJBY3Rpb24sXG4pOiBzdHJpbmcge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBVUERBVEVfTE9DQVRJT046XG4gICAgICByZXR1cm4gYWN0aW9uLnBheWxvYWQgfHwgRGVmYXVsdFJvdXRlclN0YXRlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBcHBsaWNhdGlvblJlZiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRGVmYXVsdFVybFNlcmlhbGl6ZXIsXG4gIE5hdmlnYXRpb25DYW5jZWwsXG4gIE5hdmlnYXRpb25FbmQsXG4gIFJvdXRlcixcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVVBEQVRFX0xPQ0FUSU9OIH0gZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCB7IERlZmF1bHRSb3V0ZXJTdGF0ZSwgUm91dGVyQWN0aW9uIH0gZnJvbSAnLi9yZWR1Y2VyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nUmVkdXhSb3V0ZXIge1xuICBwcml2YXRlIGluaXRpYWxpemVkID0gZmFsc2U7XG4gIHByaXZhdGUgY3VycmVudExvY2F0aW9uPzogc3RyaW5nO1xuICBwcml2YXRlIGluaXRpYWxMb2NhdGlvbj86IHN0cmluZztcbiAgcHJpdmF0ZSB1cmxTdGF0ZT86IE9ic2VydmFibGU8c3RyaW5nPjtcblxuICBwcml2YXRlIHVybFN0YXRlU3Vic2NyaXB0aW9uPzogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHJlZHV4U3Vic2NyaXB0aW9uPzogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBuZ1JlZHV4OiBOZ1JlZHV4PGFueT4sXG4gICAgcHJpdmF0ZSBhcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXG4gICkge31cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIGJpbmRpbmdzIGJldHdlZW4gQGFuZ3VsYXItcmVkdXgvcm91dGVyIGFuZCBAYW5ndWxhci9yb3V0ZXIuXG4gICAqIFRoaXMgbWV0aG9kIHVuc3Vic2NyaWJlcyBmcm9tIGJvdGggQGFuZ3VsYXItcmVkdXgvcm91dGVyIGFuZCBAYW5ndWxhciByb3V0ZXIsIGluIGNhc2VcbiAgICogeW91ciBhcHAgbmVlZHMgdG8gdGVhciBkb3duIHRoZSBiaW5kaW5ncyB3aXRob3V0IGRlc3Ryb3lpbmcgQW5ndWxhciBvciBSZWR1eFxuICAgKiBhdCB0aGUgc2FtZSB0aW1lLlxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy51cmxTdGF0ZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy51cmxTdGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlZHV4U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlZHV4U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJpbmRpbmdzIGJldHdlZW4gQGFuZ3VsYXItcmVkdXgvcm91dGVyIGFuZCBAYW5ndWxhci9yb3V0ZXJcbiAgICpcbiAgICogVGhpcyBzaG91bGQgb25seSBiZSBjYWxsZWQgb25jZSBmb3IgdGhlIGxpZmV0aW1lIG9mIHlvdXIgYXBwLCBmb3JcbiAgICogZXhhbXBsZSBpbiB0aGUgY29uc3RydWN0b3Igb2YgeW91ciByb290IGNvbXBvbmVudC5cbiAgICpcbiAgICpcbiAgICogQHBhcmFtIHNlbGVjdExvY2F0aW9uRnJvbVN0YXRlIE9wdGlvbmFsOiBJZiB5b3VyXG4gICAqIHJvdXRlciBzdGF0ZSBpcyBpbiBhIGN1c3RvbSBsb2NhdGlvbiwgc3VwcGx5IHRoaXMgYXJndW1lbnQgdG8gdGVsbCB0aGVcbiAgICogYmluZGluZ3Mgd2hlcmUgdG8gZmluZCB0aGUgcm91dGVyIGxvY2F0aW9uIGluIHRoZSBzdGF0ZS5cbiAgICogQHBhcmFtIHVybFN0YXRlJCBPcHRpb25hbDogSWYgeW91IGhhdmUgYSBjdXN0b20gc2V0dXBcbiAgICogd2hlbiBsaXN0ZW5pbmcgdG8gcm91dGVyIGNoYW5nZXMsIG9yIHVzZSBhIGRpZmZlcmVudCByb3V0ZXIgdGhhbiBAYW5ndWxhci9yb3V0ZXJcbiAgICogeW91IGNhbiBzdXBwbHkgdGhpcyBhcmd1bWVudCBhcyBhbiBPYnNlcnZhYmxlIG9mIHRoZSBjdXJyZW50IHVybCBzdGF0ZS5cbiAgICovXG4gIGluaXRpYWxpemUoXG4gICAgc2VsZWN0TG9jYXRpb25Gcm9tU3RhdGU6IChzdGF0ZTogYW55KSA9PiBzdHJpbmcgPSBzdGF0ZSA9PiBzdGF0ZS5yb3V0ZXIsXG4gICAgdXJsU3RhdGUkPzogT2JzZXJ2YWJsZTxzdHJpbmc+IHwgdW5kZWZpbmVkLFxuICApIHtcbiAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQGFuZ3VsYXItcmVkdXgvcm91dGVyIGFscmVhZHkgaW5pdGlhbGl6ZWQhIElmIHlvdSBtZWFudCB0byByZS1pbml0aWFsaXplLCBjYWxsIGRlc3Ryb3kgZmlyc3QuJyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RMb2NhdGlvbkZyb21TdGF0ZSA9IHNlbGVjdExvY2F0aW9uRnJvbVN0YXRlO1xuXG4gICAgdGhpcy51cmxTdGF0ZSA9IHVybFN0YXRlJCB8fCB0aGlzLmdldERlZmF1bHRVcmxTdGF0ZU9ic2VydmFibGUoKTtcblxuICAgIHRoaXMubGlzdGVuVG9Sb3V0ZXJDaGFuZ2VzKCk7XG4gICAgdGhpcy5saXN0ZW5Ub1JlZHV4Q2hhbmdlcygpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RMb2NhdGlvbkZyb21TdGF0ZTogKHN0YXRlOiBhbnkpID0+IHN0cmluZyA9IHN0YXRlID0+XG4gICAgc3RhdGUucm91dGVyO1xuXG4gIHByaXZhdGUgZ2V0RGVmYXVsdFVybFN0YXRlT2JzZXJ2YWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIuZXZlbnRzLnBpcGUoXG4gICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSxcbiAgICAgIG1hcChldmVudCA9PiB0aGlzLmxvY2F0aW9uLnBhdGgoKSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldExvY2F0aW9uRnJvbVN0b3JlKHVzZUluaXRpYWw6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnNlbGVjdExvY2F0aW9uRnJvbVN0YXRlKHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpKSB8fFxuICAgICAgKHVzZUluaXRpYWwgPyB0aGlzLmluaXRpYWxMb2NhdGlvbiA6ICcnKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlblRvUm91dGVyQ2hhbmdlcygpIHtcbiAgICBjb25zdCBoYW5kbGVMb2NhdGlvbkNoYW5nZSA9IChsb2NhdGlvbjogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50TG9jYXRpb24gPT09IGxvY2F0aW9uKSB7XG4gICAgICAgIC8vIERvbnQgZGlzcGF0Y2ggY2hhbmdlcyBpZiB3ZSBoYXZlbid0IGNoYW5nZWQgbG9jYXRpb24uXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgIGlmICh0aGlzLmluaXRpYWxMb2NhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbExvY2F0aW9uID0gbG9jYXRpb247XG5cbiAgICAgICAgLy8gRmV0Y2ggaW5pdGlhbCBsb2NhdGlvbiBmcm9tIHN0b3JlIGFuZCBtYWtlIHN1cmVcbiAgICAgICAgLy8gd2UgZG9udCBkaXNwYXRoIGFuIGV2ZW50IGlmIHRoZSBjdXJyZW50IHVybCBlcXVhbHNcbiAgICAgICAgLy8gdGhlIGluaXRpYWwgdXJsLlxuICAgICAgICBjb25zdCBsb2NhdGlvbkZyb21TdG9yZSA9IHRoaXMuZ2V0TG9jYXRpb25Gcm9tU3RvcmUoKTtcbiAgICAgICAgaWYgKGxvY2F0aW9uRnJvbVN0b3JlID09PSB0aGlzLmN1cnJlbnRMb2NhdGlvbikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBVUERBVEVfTE9DQVRJT04sXG4gICAgICAgIHBheWxvYWQ6IGxvY2F0aW9uLFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGlmICh0aGlzLnVybFN0YXRlKSB7XG4gICAgICB0aGlzLnVybFN0YXRlU3Vic2NyaXB0aW9uID0gdGhpcy51cmxTdGF0ZS5zdWJzY3JpYmUoaGFuZGxlTG9jYXRpb25DaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuVG9SZWR1eENoYW5nZXMoKSB7XG4gICAgY29uc3QgaGFuZGxlTG9jYXRpb25DaGFuZ2UgPSAobG9jYXRpb246IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHRoaXMuaW5pdGlhbExvY2F0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gV2FpdCBmb3Igcm91dGVyIHRvIHNldCBpbml0aWFsIGxvY2F0aW9uLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxvY2F0aW9uSW5TdG9yZSA9IHRoaXMuZ2V0TG9jYXRpb25Gcm9tU3RvcmUodHJ1ZSk7XG4gICAgICBpZiAodGhpcy5jdXJyZW50TG9jYXRpb24gPT09IGxvY2F0aW9uSW5TdG9yZSkge1xuICAgICAgICAvLyBEb250IGNoYW5nZSByb3V0ZXIgbG9jYXRpb24gaWYgaXRzIGVxdWFsIHRvIHRoZSBvbmUgaW4gdGhlIHN0b3JlLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3VycmVudExvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKGxvY2F0aW9uKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZWR1eFN1YnNjcmlwdGlvbiA9IHRoaXMubmdSZWR1eFxuICAgICAgLnNlbGVjdChzdGF0ZSA9PiB0aGlzLnNlbGVjdExvY2F0aW9uRnJvbVN0YXRlKHN0YXRlKSlcbiAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gICAgICAuc3Vic2NyaWJlKGhhbmRsZUxvY2F0aW9uQ2hhbmdlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVQREFURV9MT0NBVElPTiB9IGZyb20gJy4vYWN0aW9ucyc7XG5pbXBvcnQgeyBSb3V0ZXJBY3Rpb24sIHJvdXRlclJlZHVjZXIgfSBmcm9tICcuL3JlZHVjZXInO1xuaW1wb3J0IHsgTmdSZWR1eFJvdXRlciB9IGZyb20gJy4vcm91dGVyJztcblxuQE5nTW9kdWxlKClcbmV4cG9ydCBjbGFzcyBOZ1JlZHV4Um91dGVyTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ1JlZHV4Um91dGVyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbTmdSZWR1eFJvdXRlcl0sXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgeyBOZ1JlZHV4Um91dGVyLCBSb3V0ZXJBY3Rpb24sIHJvdXRlclJlZHVjZXIsIFVQREFURV9MT0NBVElPTiB9O1xuIl0sIm5hbWVzIjpbInJvdXRlciIsImZpbHRlciIsIk5hdmlnYXRpb25FbmQiLCJtYXAiLCJkaXN0aW5jdFVudGlsQ2hhbmdlZCIsIkluamVjdGFibGUiLCJSb3V0ZXIiLCJOZ1JlZHV4IiwiQXBwbGljYXRpb25SZWYiLCJMb2NhdGlv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