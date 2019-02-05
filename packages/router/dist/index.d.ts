import { ModuleWithProviders } from '@angular/core';
import { UPDATE_LOCATION } from './actions';
import { RouterAction, routerReducer } from './reducer';
import { NgReduxRouter } from './router';
export declare class NgReduxRouterModule {
    static forRoot(): ModuleWithProviders;
}
export { NgReduxRouter, RouterAction, routerReducer, UPDATE_LOCATION };
