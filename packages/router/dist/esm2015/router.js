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
export class NgReduxRouter {
    /**
     * @param {?} router
     * @param {?} ngRedux
     * @param {?} applicationRef
     * @param {?} location
     */
    constructor(router, ngRedux, applicationRef, location) {
        this.router = router;
        this.ngRedux = ngRedux;
        this.applicationRef = applicationRef;
        this.location = location;
        this.initialized = false;
        this.selectLocationFromState = state => state.router;
    }
    /**
     * Destroys the bindings between \@angular-redux/router and \@angular/router.
     * This method unsubscribes from both \@angular-redux/router and \@angular router, in case
     * your app needs to tear down the bindings without destroying Angular or Redux
     * at the same time.
     * @return {?}
     */
    destroy() {
        if (this.urlStateSubscription) {
            this.urlStateSubscription.unsubscribe();
        }
        if (this.reduxSubscription) {
            this.reduxSubscription.unsubscribe();
        }
        this.initialized = false;
    }
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
    initialize(selectLocationFromState = state => state.router, urlState$) {
        if (this.initialized) {
            throw new Error('@angular-redux/router already initialized! If you meant to re-initialize, call destroy first.');
        }
        this.selectLocationFromState = selectLocationFromState;
        this.urlState = urlState$ || this.getDefaultUrlStateObservable();
        this.listenToRouterChanges();
        this.listenToReduxChanges();
        this.initialized = true;
    }
    /**
     * @return {?}
     */
    getDefaultUrlStateObservable() {
        return this.router.events.pipe(filter(event => event instanceof NavigationEnd), map(event => this.location.path()), distinctUntilChanged());
    }
    /**
     * @param {?=} useInitial
     * @return {?}
     */
    getLocationFromStore(useInitial = false) {
        return (this.selectLocationFromState(this.ngRedux.getState()) ||
            (useInitial ? this.initialLocation : ''));
    }
    /**
     * @return {?}
     */
    listenToRouterChanges() {
        /** @type {?} */
        const handleLocationChange = (location) => {
            if (this.currentLocation === location) {
                // Dont dispatch changes if we haven't changed location.
                return;
            }
            this.currentLocation = location;
            if (this.initialLocation === undefined) {
                this.initialLocation = location;
                /** @type {?} */
                const locationFromStore = this.getLocationFromStore();
                if (locationFromStore === this.currentLocation) {
                    return;
                }
            }
            this.ngRedux.dispatch({
                type: UPDATE_LOCATION,
                payload: location,
            });
        };
        if (this.urlState) {
            this.urlStateSubscription = this.urlState.subscribe(handleLocationChange);
        }
    }
    /**
     * @return {?}
     */
    listenToReduxChanges() {
        /** @type {?} */
        const handleLocationChange = (location) => {
            if (this.initialLocation === undefined) {
                // Wait for router to set initial location.
                return;
            }
            /** @type {?} */
            const locationInStore = this.getLocationFromStore(true);
            if (this.currentLocation === locationInStore) {
                // Dont change router location if its equal to the one in the store.
                return;
            }
            this.currentLocation = location;
            this.router.navigateByUrl(location);
        };
        this.reduxSubscription = this.ngRedux
            .select(state => this.selectLocationFromState(state))
            .pipe(distinctUntilChanged())
            .subscribe(handleLocationChange);
    }
}
NgReduxRouter.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NgReduxRouter.ctorParameters = () => [
    { type: Router },
    { type: NgRedux },
    { type: ApplicationRef },
    { type: Location }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvcm91dGVyLyIsInNvdXJjZXMiOlsicm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFHTCxhQUFhLEVBQ2IsTUFBTSxHQUNQLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBSTVDLE1BQU07Ozs7Ozs7SUFTSixZQUNVLFFBQ0EsU0FDQSxnQkFDQTtRQUhBLFdBQU0sR0FBTixNQUFNO1FBQ04sWUFBTyxHQUFQLE9BQU87UUFDUCxtQkFBYyxHQUFkLGNBQWM7UUFDZCxhQUFRLEdBQVIsUUFBUTsyQkFaSSxLQUFLO3VDQWtFK0IsS0FBSyxDQUFDLEVBQUUsQ0FDaEUsS0FBSyxDQUFDLE1BQU07S0F0RFY7Ozs7Ozs7O0lBUUosT0FBTztRQUNMLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3pDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEM7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztLQUMxQjs7Ozs7Ozs7Ozs7Ozs7OztJQWdCRCxVQUFVLENBQ1IsMEJB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QyxDQUFDO1NBQ3JDLENBQUM7UUFFRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLE9BQU87YUFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQzVCLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOzs7O1lBekl0QyxVQUFVOzs7O1lBUFQsTUFBTTtZQVBDLE9BQU87WUFFUCxjQUFjO1lBRGQsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBcHBsaWNhdGlvblJlZiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRGVmYXVsdFVybFNlcmlhbGl6ZXIsXG4gIE5hdmlnYXRpb25DYW5jZWwsXG4gIE5hdmlnYXRpb25FbmQsXG4gIFJvdXRlcixcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVVBEQVRFX0xPQ0FUSU9OIH0gZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCB7IERlZmF1bHRSb3V0ZXJTdGF0ZSwgUm91dGVyQWN0aW9uIH0gZnJvbSAnLi9yZWR1Y2VyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nUmVkdXhSb3V0ZXIge1xuICBwcml2YXRlIGluaXRpYWxpemVkID0gZmFsc2U7XG4gIHByaXZhdGUgY3VycmVudExvY2F0aW9uPzogc3RyaW5nO1xuICBwcml2YXRlIGluaXRpYWxMb2NhdGlvbj86IHN0cmluZztcbiAgcHJpdmF0ZSB1cmxTdGF0ZT86IE9ic2VydmFibGU8c3RyaW5nPjtcblxuICBwcml2YXRlIHVybFN0YXRlU3Vic2NyaXB0aW9uPzogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHJlZHV4U3Vic2NyaXB0aW9uPzogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBuZ1JlZHV4OiBOZ1JlZHV4PGFueT4sXG4gICAgcHJpdmF0ZSBhcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXG4gICkge31cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIGJpbmRpbmdzIGJldHdlZW4gQGFuZ3VsYXItcmVkdXgvcm91dGVyIGFuZCBAYW5ndWxhci9yb3V0ZXIuXG4gICAqIFRoaXMgbWV0aG9kIHVuc3Vic2NyaWJlcyBmcm9tIGJvdGggQGFuZ3VsYXItcmVkdXgvcm91dGVyIGFuZCBAYW5ndWxhciByb3V0ZXIsIGluIGNhc2VcbiAgICogeW91ciBhcHAgbmVlZHMgdG8gdGVhciBkb3duIHRoZSBiaW5kaW5ncyB3aXRob3V0IGRlc3Ryb3lpbmcgQW5ndWxhciBvciBSZWR1eFxuICAgKiBhdCB0aGUgc2FtZSB0aW1lLlxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy51cmxTdGF0ZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy51cmxTdGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlZHV4U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlZHV4U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJpbmRpbmdzIGJldHdlZW4gQGFuZ3VsYXItcmVkdXgvcm91dGVyIGFuZCBAYW5ndWxhci9yb3V0ZXJcbiAgICpcbiAgICogVGhpcyBzaG91bGQgb25seSBiZSBjYWxsZWQgb25jZSBmb3IgdGhlIGxpZmV0aW1lIG9mIHlvdXIgYXBwLCBmb3JcbiAgICogZXhhbXBsZSBpbiB0aGUgY29uc3RydWN0b3Igb2YgeW91ciByb290IGNvbXBvbmVudC5cbiAgICpcbiAgICpcbiAgICogQHBhcmFtIHNlbGVjdExvY2F0aW9uRnJvbVN0YXRlIE9wdGlvbmFsOiBJZiB5b3VyXG4gICAqIHJvdXRlciBzdGF0ZSBpcyBpbiBhIGN1c3RvbSBsb2NhdGlvbiwgc3VwcGx5IHRoaXMgYXJndW1lbnQgdG8gdGVsbCB0aGVcbiAgICogYmluZGluZ3Mgd2hlcmUgdG8gZmluZCB0aGUgcm91dGVyIGxvY2F0aW9uIGluIHRoZSBzdGF0ZS5cbiAgICogQHBhcmFtIHVybFN0YXRlJCBPcHRpb25hbDogSWYgeW91IGhhdmUgYSBjdXN0b20gc2V0dXBcbiAgICogd2hlbiBsaXN0ZW5pbmcgdG8gcm91dGVyIGNoYW5nZXMsIG9yIHVzZSBhIGRpZmZlcmVudCByb3V0ZXIgdGhhbiBAYW5ndWxhci9yb3V0ZXJcbiAgICogeW91IGNhbiBzdXBwbHkgdGhpcyBhcmd1bWVudCBhcyBhbiBPYnNlcnZhYmxlIG9mIHRoZSBjdXJyZW50IHVybCBzdGF0ZS5cbiAgICovXG4gIGluaXRpYWxpemUoXG4gICAgc2VsZWN0TG9jYXRpb25Gcm9tU3RhdGU6IChzdGF0ZTogYW55KSA9PiBzdHJpbmcgPSBzdGF0ZSA9PiBzdGF0ZS5yb3V0ZXIsXG4gICAgdXJsU3RhdGUkPzogT2JzZXJ2YWJsZTxzdHJpbmc+IHwgdW5kZWZpbmVkLFxuICApIHtcbiAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQGFuZ3VsYXItcmVkdXgvcm91dGVyIGFscmVhZHkgaW5pdGlhbGl6ZWQhIElmIHlvdSBtZWFudCB0byByZS1pbml0aWFsaXplLCBjYWxsIGRlc3Ryb3kgZmlyc3QuJyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RMb2NhdGlvbkZyb21TdGF0ZSA9IHNlbGVjdExvY2F0aW9uRnJvbVN0YXRlO1xuXG4gICAgdGhpcy51cmxTdGF0ZSA9IHVybFN0YXRlJCB8fCB0aGlzLmdldERlZmF1bHRVcmxTdGF0ZU9ic2VydmFibGUoKTtcblxuICAgIHRoaXMubGlzdGVuVG9Sb3V0ZXJDaGFuZ2VzKCk7XG4gICAgdGhpcy5saXN0ZW5Ub1JlZHV4Q2hhbmdlcygpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RMb2NhdGlvbkZyb21TdGF0ZTogKHN0YXRlOiBhbnkpID0+IHN0cmluZyA9IHN0YXRlID0+XG4gICAgc3RhdGUucm91dGVyO1xuXG4gIHByaXZhdGUgZ2V0RGVmYXVsdFVybFN0YXRlT2JzZXJ2YWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIuZXZlbnRzLnBpcGUoXG4gICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSxcbiAgICAgIG1hcChldmVudCA9PiB0aGlzLmxvY2F0aW9uLnBhdGgoKSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldExvY2F0aW9uRnJvbVN0b3JlKHVzZUluaXRpYWw6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnNlbGVjdExvY2F0aW9uRnJvbVN0YXRlKHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpKSB8fFxuICAgICAgKHVzZUluaXRpYWwgPyB0aGlzLmluaXRpYWxMb2NhdGlvbiA6ICcnKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlblRvUm91dGVyQ2hhbmdlcygpIHtcbiAgICBjb25zdCBoYW5kbGVMb2NhdGlvbkNoYW5nZSA9IChsb2NhdGlvbjogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50TG9jYXRpb24gPT09IGxvY2F0aW9uKSB7XG4gICAgICAgIC8vIERvbnQgZGlzcGF0Y2ggY2hhbmdlcyBpZiB3ZSBoYXZlbid0IGNoYW5nZWQgbG9jYXRpb24uXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgIGlmICh0aGlzLmluaXRpYWxMb2NhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbExvY2F0aW9uID0gbG9jYXRpb247XG5cbiAgICAgICAgLy8gRmV0Y2ggaW5pdGlhbCBsb2NhdGlvbiBmcm9tIHN0b3JlIGFuZCBtYWtlIHN1cmVcbiAgICAgICAgLy8gd2UgZG9udCBkaXNwYXRoIGFuIGV2ZW50IGlmIHRoZSBjdXJyZW50IHVybCBlcXVhbHNcbiAgICAgICAgLy8gdGhlIGluaXRpYWwgdXJsLlxuICAgICAgICBjb25zdCBsb2NhdGlvbkZyb21TdG9yZSA9IHRoaXMuZ2V0TG9jYXRpb25Gcm9tU3RvcmUoKTtcbiAgICAgICAgaWYgKGxvY2F0aW9uRnJvbVN0b3JlID09PSB0aGlzLmN1cnJlbnRMb2NhdGlvbikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBVUERBVEVfTE9DQVRJT04sXG4gICAgICAgIHBheWxvYWQ6IGxvY2F0aW9uLFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGlmICh0aGlzLnVybFN0YXRlKSB7XG4gICAgICB0aGlzLnVybFN0YXRlU3Vic2NyaXB0aW9uID0gdGhpcy51cmxTdGF0ZS5zdWJzY3JpYmUoaGFuZGxlTG9jYXRpb25DaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuVG9SZWR1eENoYW5nZXMoKSB7XG4gICAgY29uc3QgaGFuZGxlTG9jYXRpb25DaGFuZ2UgPSAobG9jYXRpb246IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHRoaXMuaW5pdGlhbExvY2F0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gV2FpdCBmb3Igcm91dGVyIHRvIHNldCBpbml0aWFsIGxvY2F0aW9uLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxvY2F0aW9uSW5TdG9yZSA9IHRoaXMuZ2V0TG9jYXRpb25Gcm9tU3RvcmUodHJ1ZSk7XG4gICAgICBpZiAodGhpcy5jdXJyZW50TG9jYXRpb24gPT09IGxvY2F0aW9uSW5TdG9yZSkge1xuICAgICAgICAvLyBEb250IGNoYW5nZSByb3V0ZXIgbG9jYXRpb24gaWYgaXRzIGVxdWFsIHRvIHRoZSBvbmUgaW4gdGhlIHN0b3JlLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3VycmVudExvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKGxvY2F0aW9uKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZWR1eFN1YnNjcmlwdGlvbiA9IHRoaXMubmdSZWR1eFxuICAgICAgLnNlbGVjdChzdGF0ZSA9PiB0aGlzLnNlbGVjdExvY2F0aW9uRnJvbVN0YXRlKHN0YXRlKSlcbiAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gICAgICAuc3Vic2NyaWJlKGhhbmRsZUxvY2F0aW9uQ2hhbmdlKTtcbiAgfVxufVxuIl19