/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Location } from '@angular/common';
import { ApplicationRef, Injectable } from '@angular/core';
import { NavigationEnd, Router, } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { UPDATE_LOCATION } from './actions';
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
export { NgReduxRouter };
if (false) {
    /** @type {?} */
    NgReduxRouter.prototype.initialized;
    /** @type {?} */
    NgReduxRouter.prototype.currentLocation;
    /** @type {?} */
    NgReduxRouter.prototype.initialLocation;
    /** @type {?} */
    NgReduxRouter.prototype.urlState;
    /** @type {?} */
    NgReduxRouter.prototype.urlStateSubscription;
    /** @type {?} */
    NgReduxRouter.prototype.reduxSubscription;
    /** @type {?} */
    NgReduxRouter.prototype.selectLocationFromState;
    /** @type {?} */
    NgReduxRouter.prototype.router;
    /** @type {?} */
    NgReduxRouter.prototype.ngRedux;
    /** @type {?} */
    NgReduxRouter.prototype.applicationRef;
    /** @type {?} */
    NgReduxRouter.prototype.location;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvcm91dGVyLyIsInNvdXJjZXMiOlsicm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFHTCxhQUFhLEVBQ2IsTUFBTSxHQUNQLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFDOztJQWExQyx1QkFDVSxRQUNBLFNBQ0EsZ0JBQ0E7UUFIQSxXQUFNLEdBQU4sTUFBTTtRQUNOLFlBQU8sR0FBUCxPQUFPO1FBQ1AsbUJBQWMsR0FBZCxjQUFjO1FBQ2QsYUFBUSxHQUFSLFFBQVE7MkJBWkksS0FBSzt1Q0FrRStCLFVBQUEsS0FBSztZQUM3RCxPQUFBLEtBQUssQ0FBQyxNQUFNO1FBQVosQ0FBWTtLQXREVjtJQUVKOzs7OztPQUtHOzs7Ozs7OztJQUNILCtCQUFPOzs7Ozs7O0lBQVA7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN6QztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7S0FDMUI7SUFFRDs7Ozs7Ozs7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QWUsS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDOztnQkFFN0MsTUFBTSxDQUFDO2FBQ1I7WUFFRCxLQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQztZQUNoQyxLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyQyxDQUFDO1FBRUYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxPQUFPO2FBQ2xDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQzthQUNwRCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzthQUM1QixTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7O2dCQXpJdEMsVUFBVTs7OztnQkFQVCxNQUFNO2dCQVBDLE9BQU87Z0JBRVAsY0FBYztnQkFEZCxRQUFROzt3QkFEakI7O1NBZWEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBcHBsaWNhdGlvblJlZiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRGVmYXVsdFVybFNlcmlhbGl6ZXIsXG4gIE5hdmlnYXRpb25DYW5jZWwsXG4gIE5hdmlnYXRpb25FbmQsXG4gIFJvdXRlcixcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVVBEQVRFX0xPQ0FUSU9OIH0gZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCB7IERlZmF1bHRSb3V0ZXJTdGF0ZSwgUm91dGVyQWN0aW9uIH0gZnJvbSAnLi9yZWR1Y2VyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nUmVkdXhSb3V0ZXIge1xuICBwcml2YXRlIGluaXRpYWxpemVkID0gZmFsc2U7XG4gIHByaXZhdGUgY3VycmVudExvY2F0aW9uPzogc3RyaW5nO1xuICBwcml2YXRlIGluaXRpYWxMb2NhdGlvbj86IHN0cmluZztcbiAgcHJpdmF0ZSB1cmxTdGF0ZT86IE9ic2VydmFibGU8c3RyaW5nPjtcblxuICBwcml2YXRlIHVybFN0YXRlU3Vic2NyaXB0aW9uPzogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHJlZHV4U3Vic2NyaXB0aW9uPzogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBuZ1JlZHV4OiBOZ1JlZHV4PGFueT4sXG4gICAgcHJpdmF0ZSBhcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXG4gICkge31cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIGJpbmRpbmdzIGJldHdlZW4gQGFuZ3VsYXItcmVkdXgvcm91dGVyIGFuZCBAYW5ndWxhci9yb3V0ZXIuXG4gICAqIFRoaXMgbWV0aG9kIHVuc3Vic2NyaWJlcyBmcm9tIGJvdGggQGFuZ3VsYXItcmVkdXgvcm91dGVyIGFuZCBAYW5ndWxhciByb3V0ZXIsIGluIGNhc2VcbiAgICogeW91ciBhcHAgbmVlZHMgdG8gdGVhciBkb3duIHRoZSBiaW5kaW5ncyB3aXRob3V0IGRlc3Ryb3lpbmcgQW5ndWxhciBvciBSZWR1eFxuICAgKiBhdCB0aGUgc2FtZSB0aW1lLlxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy51cmxTdGF0ZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy51cmxTdGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlZHV4U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlZHV4U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJpbmRpbmdzIGJldHdlZW4gQGFuZ3VsYXItcmVkdXgvcm91dGVyIGFuZCBAYW5ndWxhci9yb3V0ZXJcbiAgICpcbiAgICogVGhpcyBzaG91bGQgb25seSBiZSBjYWxsZWQgb25jZSBmb3IgdGhlIGxpZmV0aW1lIG9mIHlvdXIgYXBwLCBmb3JcbiAgICogZXhhbXBsZSBpbiB0aGUgY29uc3RydWN0b3Igb2YgeW91ciByb290IGNvbXBvbmVudC5cbiAgICpcbiAgICpcbiAgICogQHBhcmFtIHNlbGVjdExvY2F0aW9uRnJvbVN0YXRlIE9wdGlvbmFsOiBJZiB5b3VyXG4gICAqIHJvdXRlciBzdGF0ZSBpcyBpbiBhIGN1c3RvbSBsb2NhdGlvbiwgc3VwcGx5IHRoaXMgYXJndW1lbnQgdG8gdGVsbCB0aGVcbiAgICogYmluZGluZ3Mgd2hlcmUgdG8gZmluZCB0aGUgcm91dGVyIGxvY2F0aW9uIGluIHRoZSBzdGF0ZS5cbiAgICogQHBhcmFtIHVybFN0YXRlJCBPcHRpb25hbDogSWYgeW91IGhhdmUgYSBjdXN0b20gc2V0dXBcbiAgICogd2hlbiBsaXN0ZW5pbmcgdG8gcm91dGVyIGNoYW5nZXMsIG9yIHVzZSBhIGRpZmZlcmVudCByb3V0ZXIgdGhhbiBAYW5ndWxhci9yb3V0ZXJcbiAgICogeW91IGNhbiBzdXBwbHkgdGhpcyBhcmd1bWVudCBhcyBhbiBPYnNlcnZhYmxlIG9mIHRoZSBjdXJyZW50IHVybCBzdGF0ZS5cbiAgICovXG4gIGluaXRpYWxpemUoXG4gICAgc2VsZWN0TG9jYXRpb25Gcm9tU3RhdGU6IChzdGF0ZTogYW55KSA9PiBzdHJpbmcgPSBzdGF0ZSA9PiBzdGF0ZS5yb3V0ZXIsXG4gICAgdXJsU3RhdGUkPzogT2JzZXJ2YWJsZTxzdHJpbmc+IHwgdW5kZWZpbmVkLFxuICApIHtcbiAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQGFuZ3VsYXItcmVkdXgvcm91dGVyIGFscmVhZHkgaW5pdGlhbGl6ZWQhIElmIHlvdSBtZWFudCB0byByZS1pbml0aWFsaXplLCBjYWxsIGRlc3Ryb3kgZmlyc3QuJyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RMb2NhdGlvbkZyb21TdGF0ZSA9IHNlbGVjdExvY2F0aW9uRnJvbVN0YXRlO1xuXG4gICAgdGhpcy51cmxTdGF0ZSA9IHVybFN0YXRlJCB8fCB0aGlzLmdldERlZmF1bHRVcmxTdGF0ZU9ic2VydmFibGUoKTtcblxuICAgIHRoaXMubGlzdGVuVG9Sb3V0ZXJDaGFuZ2VzKCk7XG4gICAgdGhpcy5saXN0ZW5Ub1JlZHV4Q2hhbmdlcygpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RMb2NhdGlvbkZyb21TdGF0ZTogKHN0YXRlOiBhbnkpID0+IHN0cmluZyA9IHN0YXRlID0+XG4gICAgc3RhdGUucm91dGVyO1xuXG4gIHByaXZhdGUgZ2V0RGVmYXVsdFVybFN0YXRlT2JzZXJ2YWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIuZXZlbnRzLnBpcGUoXG4gICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSxcbiAgICAgIG1hcChldmVudCA9PiB0aGlzLmxvY2F0aW9uLnBhdGgoKSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldExvY2F0aW9uRnJvbVN0b3JlKHVzZUluaXRpYWw6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnNlbGVjdExvY2F0aW9uRnJvbVN0YXRlKHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpKSB8fFxuICAgICAgKHVzZUluaXRpYWwgPyB0aGlzLmluaXRpYWxMb2NhdGlvbiA6ICcnKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlblRvUm91dGVyQ2hhbmdlcygpIHtcbiAgICBjb25zdCBoYW5kbGVMb2NhdGlvbkNoYW5nZSA9IChsb2NhdGlvbjogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50TG9jYXRpb24gPT09IGxvY2F0aW9uKSB7XG4gICAgICAgIC8vIERvbnQgZGlzcGF0Y2ggY2hhbmdlcyBpZiB3ZSBoYXZlbid0IGNoYW5nZWQgbG9jYXRpb24uXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgIGlmICh0aGlzLmluaXRpYWxMb2NhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbExvY2F0aW9uID0gbG9jYXRpb247XG5cbiAgICAgICAgLy8gRmV0Y2ggaW5pdGlhbCBsb2NhdGlvbiBmcm9tIHN0b3JlIGFuZCBtYWtlIHN1cmVcbiAgICAgICAgLy8gd2UgZG9udCBkaXNwYXRoIGFuIGV2ZW50IGlmIHRoZSBjdXJyZW50IHVybCBlcXVhbHNcbiAgICAgICAgLy8gdGhlIGluaXRpYWwgdXJsLlxuICAgICAgICBjb25zdCBsb2NhdGlvbkZyb21TdG9yZSA9IHRoaXMuZ2V0TG9jYXRpb25Gcm9tU3RvcmUoKTtcbiAgICAgICAgaWYgKGxvY2F0aW9uRnJvbVN0b3JlID09PSB0aGlzLmN1cnJlbnRMb2NhdGlvbikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBVUERBVEVfTE9DQVRJT04sXG4gICAgICAgIHBheWxvYWQ6IGxvY2F0aW9uLFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGlmICh0aGlzLnVybFN0YXRlKSB7XG4gICAgICB0aGlzLnVybFN0YXRlU3Vic2NyaXB0aW9uID0gdGhpcy51cmxTdGF0ZS5zdWJzY3JpYmUoaGFuZGxlTG9jYXRpb25DaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuVG9SZWR1eENoYW5nZXMoKSB7XG4gICAgY29uc3QgaGFuZGxlTG9jYXRpb25DaGFuZ2UgPSAobG9jYXRpb246IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHRoaXMuaW5pdGlhbExvY2F0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gV2FpdCBmb3Igcm91dGVyIHRvIHNldCBpbml0aWFsIGxvY2F0aW9uLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxvY2F0aW9uSW5TdG9yZSA9IHRoaXMuZ2V0TG9jYXRpb25Gcm9tU3RvcmUodHJ1ZSk7XG4gICAgICBpZiAodGhpcy5jdXJyZW50TG9jYXRpb24gPT09IGxvY2F0aW9uSW5TdG9yZSkge1xuICAgICAgICAvLyBEb250IGNoYW5nZSByb3V0ZXIgbG9jYXRpb24gaWYgaXRzIGVxdWFsIHRvIHRoZSBvbmUgaW4gdGhlIHN0b3JlLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3VycmVudExvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKGxvY2F0aW9uKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZWR1eFN1YnNjcmlwdGlvbiA9IHRoaXMubmdSZWR1eFxuICAgICAgLnNlbGVjdChzdGF0ZSA9PiB0aGlzLnNlbGVjdExvY2F0aW9uRnJvbVN0YXRlKHN0YXRlKSlcbiAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gICAgICAuc3Vic2NyaWJlKGhhbmRsZUxvY2F0aW9uQ2hhbmdlKTtcbiAgfVxufVxuIl19