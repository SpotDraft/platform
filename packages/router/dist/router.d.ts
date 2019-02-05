import { NgRedux } from '@angular-redux/store';
import { Location } from '@angular/common';
import { ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
export declare class NgReduxRouter {
    private router;
    private ngRedux;
    private applicationRef;
    private location;
    private initialized;
    private currentLocation?;
    private initialLocation?;
    private urlState?;
    private urlStateSubscription?;
    private reduxSubscription?;
    constructor(router: Router, ngRedux: NgRedux<any>, applicationRef: ApplicationRef, location: Location);
    /**
     * Destroys the bindings between @angular-redux/router and @angular/router.
     * This method unsubscribes from both @angular-redux/router and @angular router, in case
     * your app needs to tear down the bindings without destroying Angular or Redux
     * at the same time.
     */
    destroy(): void;
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
    initialize(selectLocationFromState?: (state: any) => string, urlState$?: Observable<string> | undefined): void;
    private selectLocationFromState;
    private getDefaultUrlStateObservable();
    private getLocationFromStore(useInitial?);
    private listenToRouterChanges();
    private listenToReduxChanges();
}
