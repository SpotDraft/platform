import { NgRedux } from '@angular-redux/store';
import { Location } from '@angular/common';
import { ApplicationRef, Injectable, NgModule } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

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
    if (state === void 0) { state = DefaultRouterState; }
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
var NgReduxRouter = /** @class */ (function () {
    function NgReduxRouter(router, ngRedux, applicationRef, location) {
        this.router = router;
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
        if (selectLocationFromState === void 0) { selectLocationFromState = function (state) { return state.router; }; }
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
        return this.router.events.pipe(filter(function (event) { return event instanceof NavigationEnd; }), map(function (event) { return _this.location.path(); }), distinctUntilChanged());
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
        if (useInitial === void 0) { useInitial = false; }
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
            .pipe(distinctUntilChanged())
            .subscribe(handleLocationChange);
    };
    NgReduxRouter.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NgReduxRouter.ctorParameters = function () { return [
        { type: Router },
        { type: NgRedux },
        { type: ApplicationRef },
        { type: Location }
    ]; };
    return NgReduxRouter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgReduxRouterModule = /** @class */ (function () {
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
        { type: NgModule },
    ];
    return NgReduxRouterModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgReduxRouterModule, NgReduxRouter, routerReducer, UPDATE_LOCATION };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1yZWR1eC1yb3V0ZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bhbmd1bGFyLXJlZHV4L3JvdXRlci9hY3Rpb25zLnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9yb3V0ZXIvcmVkdWNlci50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvcm91dGVyL3JvdXRlci50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvcm91dGVyL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBVUERBVEVfTE9DQVRJT046IHN0cmluZyA9ICdAYW5ndWxhci1yZWR1eC9yb3V0ZXI6OlVQREFURV9MT0NBVElPTic7XG4iLCJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7IFVQREFURV9MT0NBVElPTiB9IGZyb20gJy4vYWN0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0Um91dGVyU3RhdGU6IHN0cmluZyA9ICcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckFjdGlvbiBleHRlbmRzIEFjdGlvbiB7XG4gIHBheWxvYWQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3V0ZXJSZWR1Y2VyKFxuICBzdGF0ZTogc3RyaW5nID0gRGVmYXVsdFJvdXRlclN0YXRlLFxuICBhY3Rpb246IFJvdXRlckFjdGlvbixcbik6IHN0cmluZyB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFVQREFURV9MT0NBVElPTjpcbiAgICAgIHJldHVybiBhY3Rpb24ucGF5bG9hZCB8fCBEZWZhdWx0Um91dGVyU3RhdGU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFwcGxpY2F0aW9uUmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBEZWZhdWx0VXJsU2VyaWFsaXplcixcbiAgTmF2aWdhdGlvbkNhbmNlbCxcbiAgTmF2aWdhdGlvbkVuZCxcbiAgUm91dGVyLFxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVUERBVEVfTE9DQVRJT04gfSBmcm9tICcuL2FjdGlvbnMnO1xuaW1wb3J0IHsgRGVmYXVsdFJvdXRlclN0YXRlLCBSb3V0ZXJBY3Rpb24gfSBmcm9tICcuL3JlZHVjZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdSZWR1eFJvdXRlciB7XG4gIHByaXZhdGUgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBjdXJyZW50TG9jYXRpb24/OiBzdHJpbmc7XG4gIHByaXZhdGUgaW5pdGlhbExvY2F0aW9uPzogc3RyaW5nO1xuICBwcml2YXRlIHVybFN0YXRlPzogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIHByaXZhdGUgdXJsU3RhdGVTdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgcmVkdXhTdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIG5nUmVkdXg6IE5nUmVkdXg8YW55PixcbiAgICBwcml2YXRlIGFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgYmluZGluZ3MgYmV0d2VlbiBAYW5ndWxhci1yZWR1eC9yb3V0ZXIgYW5kIEBhbmd1bGFyL3JvdXRlci5cbiAgICogVGhpcyBtZXRob2QgdW5zdWJzY3JpYmVzIGZyb20gYm90aCBAYW5ndWxhci1yZWR1eC9yb3V0ZXIgYW5kIEBhbmd1bGFyIHJvdXRlciwgaW4gY2FzZVxuICAgKiB5b3VyIGFwcCBuZWVkcyB0byB0ZWFyIGRvd24gdGhlIGJpbmRpbmdzIHdpdGhvdXQgZGVzdHJveWluZyBBbmd1bGFyIG9yIFJlZHV4XG4gICAqIGF0IHRoZSBzYW1lIHRpbWUuXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnVybFN0YXRlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnVybFN0YXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVkdXhTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVkdXhTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmluZGluZ3MgYmV0d2VlbiBAYW5ndWxhci1yZWR1eC9yb3V0ZXIgYW5kIEBhbmd1bGFyL3JvdXRlclxuICAgKlxuICAgKiBUaGlzIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbmNlIGZvciB0aGUgbGlmZXRpbWUgb2YgeW91ciBhcHAsIGZvclxuICAgKiBleGFtcGxlIGluIHRoZSBjb25zdHJ1Y3RvciBvZiB5b3VyIHJvb3QgY29tcG9uZW50LlxuICAgKlxuICAgKlxuICAgKiBAcGFyYW0gc2VsZWN0TG9jYXRpb25Gcm9tU3RhdGUgT3B0aW9uYWw6IElmIHlvdXJcbiAgICogcm91dGVyIHN0YXRlIGlzIGluIGEgY3VzdG9tIGxvY2F0aW9uLCBzdXBwbHkgdGhpcyBhcmd1bWVudCB0byB0ZWxsIHRoZVxuICAgKiBiaW5kaW5ncyB3aGVyZSB0byBmaW5kIHRoZSByb3V0ZXIgbG9jYXRpb24gaW4gdGhlIHN0YXRlLlxuICAgKiBAcGFyYW0gdXJsU3RhdGUkIE9wdGlvbmFsOiBJZiB5b3UgaGF2ZSBhIGN1c3RvbSBzZXR1cFxuICAgKiB3aGVuIGxpc3RlbmluZyB0byByb3V0ZXIgY2hhbmdlcywgb3IgdXNlIGEgZGlmZmVyZW50IHJvdXRlciB0aGFuIEBhbmd1bGFyL3JvdXRlclxuICAgKiB5b3UgY2FuIHN1cHBseSB0aGlzIGFyZ3VtZW50IGFzIGFuIE9ic2VydmFibGUgb2YgdGhlIGN1cnJlbnQgdXJsIHN0YXRlLlxuICAgKi9cbiAgaW5pdGlhbGl6ZShcbiAgICBzZWxlY3RMb2NhdGlvbkZyb21TdGF0ZTogKHN0YXRlOiBhbnkpID0+IHN0cmluZyA9IHN0YXRlID0+IHN0YXRlLnJvdXRlcixcbiAgICB1cmxTdGF0ZSQ/OiBPYnNlcnZhYmxlPHN0cmluZz4gfCB1bmRlZmluZWQsXG4gICkge1xuICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdAYW5ndWxhci1yZWR1eC9yb3V0ZXIgYWxyZWFkeSBpbml0aWFsaXplZCEgSWYgeW91IG1lYW50IHRvIHJlLWluaXRpYWxpemUsIGNhbGwgZGVzdHJveSBmaXJzdC4nLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdExvY2F0aW9uRnJvbVN0YXRlID0gc2VsZWN0TG9jYXRpb25Gcm9tU3RhdGU7XG5cbiAgICB0aGlzLnVybFN0YXRlID0gdXJsU3RhdGUkIHx8IHRoaXMuZ2V0RGVmYXVsdFVybFN0YXRlT2JzZXJ2YWJsZSgpO1xuXG4gICAgdGhpcy5saXN0ZW5Ub1JvdXRlckNoYW5nZXMoKTtcbiAgICB0aGlzLmxpc3RlblRvUmVkdXhDaGFuZ2VzKCk7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdExvY2F0aW9uRnJvbVN0YXRlOiAoc3RhdGU6IGFueSkgPT4gc3RyaW5nID0gc3RhdGUgPT5cbiAgICBzdGF0ZS5yb3V0ZXI7XG5cbiAgcHJpdmF0ZSBnZXREZWZhdWx0VXJsU3RhdGVPYnNlcnZhYmxlKCkge1xuICAgIHJldHVybiB0aGlzLnJvdXRlci5ldmVudHMucGlwZShcbiAgICAgIGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpLFxuICAgICAgbWFwKGV2ZW50ID0+IHRoaXMubG9jYXRpb24ucGF0aCgpKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TG9jYXRpb25Gcm9tU3RvcmUodXNlSW5pdGlhbDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuc2VsZWN0TG9jYXRpb25Gcm9tU3RhdGUodGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkpIHx8XG4gICAgICAodXNlSW5pdGlhbCA/IHRoaXMuaW5pdGlhbExvY2F0aW9uIDogJycpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuVG9Sb3V0ZXJDaGFuZ2VzKCkge1xuICAgIGNvbnN0IGhhbmRsZUxvY2F0aW9uQ2hhbmdlID0gKGxvY2F0aW9uOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRMb2NhdGlvbiA9PT0gbG9jYXRpb24pIHtcbiAgICAgICAgLy8gRG9udCBkaXNwYXRjaCBjaGFuZ2VzIGlmIHdlIGhhdmVuJ3QgY2hhbmdlZCBsb2NhdGlvbi5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgaWYgKHRoaXMuaW5pdGlhbExvY2F0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsTG9jYXRpb24gPSBsb2NhdGlvbjtcblxuICAgICAgICAvLyBGZXRjaCBpbml0aWFsIGxvY2F0aW9uIGZyb20gc3RvcmUgYW5kIG1ha2Ugc3VyZVxuICAgICAgICAvLyB3ZSBkb250IGRpc3BhdGggYW4gZXZlbnQgaWYgdGhlIGN1cnJlbnQgdXJsIGVxdWFsc1xuICAgICAgICAvLyB0aGUgaW5pdGlhbCB1cmwuXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uRnJvbVN0b3JlID0gdGhpcy5nZXRMb2NhdGlvbkZyb21TdG9yZSgpO1xuICAgICAgICBpZiAobG9jYXRpb25Gcm9tU3RvcmUgPT09IHRoaXMuY3VycmVudExvY2F0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFVQREFURV9MT0NBVElPTixcbiAgICAgICAgcGF5bG9hZDogbG9jYXRpb24sXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMudXJsU3RhdGUpIHtcbiAgICAgIHRoaXMudXJsU3RhdGVTdWJzY3JpcHRpb24gPSB0aGlzLnVybFN0YXRlLnN1YnNjcmliZShoYW5kbGVMb2NhdGlvbkNoYW5nZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Ub1JlZHV4Q2hhbmdlcygpIHtcbiAgICBjb25zdCBoYW5kbGVMb2NhdGlvbkNoYW5nZSA9IChsb2NhdGlvbjogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAodGhpcy5pbml0aWFsTG9jYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBXYWl0IGZvciByb3V0ZXIgdG8gc2V0IGluaXRpYWwgbG9jYXRpb24uXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbG9jYXRpb25JblN0b3JlID0gdGhpcy5nZXRMb2NhdGlvbkZyb21TdG9yZSh0cnVlKTtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRMb2NhdGlvbiA9PT0gbG9jYXRpb25JblN0b3JlKSB7XG4gICAgICAgIC8vIERvbnQgY2hhbmdlIHJvdXRlciBsb2NhdGlvbiBpZiBpdHMgZXF1YWwgdG8gdGhlIG9uZSBpbiB0aGUgc3RvcmUuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwobG9jYXRpb24pO1xuICAgIH07XG5cbiAgICB0aGlzLnJlZHV4U3Vic2NyaXB0aW9uID0gdGhpcy5uZ1JlZHV4XG4gICAgICAuc2VsZWN0KHN0YXRlID0+IHRoaXMuc2VsZWN0TG9jYXRpb25Gcm9tU3RhdGUoc3RhdGUpKVxuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSlcbiAgICAgIC5zdWJzY3JpYmUoaGFuZGxlTG9jYXRpb25DaGFuZ2UpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVVBEQVRFX0xPQ0FUSU9OIH0gZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCB7IFJvdXRlckFjdGlvbiwgcm91dGVyUmVkdWNlciB9IGZyb20gJy4vcmVkdWNlcic7XG5pbXBvcnQgeyBOZ1JlZHV4Um91dGVyIH0gZnJvbSAnLi9yb3V0ZXInO1xuXG5ATmdNb2R1bGUoKVxuZXhwb3J0IGNsYXNzIE5nUmVkdXhSb3V0ZXJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5nUmVkdXhSb3V0ZXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtOZ1JlZHV4Um91dGVyXSxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCB7IE5nUmVkdXhSb3V0ZXIsIFJvdXRlckFjdGlvbiwgcm91dGVyUmVkdWNlciwgVVBEQVRFX0xPQ0FUSU9OIH07XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxJQUFhLGVBQWUsR0FBVyx3Q0FBd0M7Ozs7OztBQ0UvRTtBQUVBLElBQWEsa0JBQWtCLEdBQVcsRUFBRSxDQUFDOzs7Ozs7QUFNN0MsdUJBQ0UsS0FBa0MsRUFDbEMs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