/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { UPDATE_LOCATION } from './actions';
import { routerReducer } from './reducer';
import { NgReduxRouter } from './router';
export class NgReduxRouterModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: NgReduxRouterModule,
            providers: [NgReduxRouter],
        };
    }
}
NgReduxRouterModule.decorators = [
    { type: NgModule },
];
export { NgReduxRouter, routerReducer, UPDATE_LOCATION };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1yZWR1eC9yb3V0ZXIvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM1QyxPQUFPLEVBQWdCLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR3pDLE1BQU07Ozs7SUFDSixNQUFNLENBQUMsT0FBTztRQUNaLE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO1NBQzNCLENBQUM7S0FDSDs7O1lBUEYsUUFBUTs7QUFVVCxPQUFPLEVBQUUsYUFBYSxFQUFnQixhQUFhLEVBQUUsZUFBZSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVVBEQVRFX0xPQ0FUSU9OIH0gZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCB7IFJvdXRlckFjdGlvbiwgcm91dGVyUmVkdWNlciB9IGZyb20gJy4vcmVkdWNlcic7XG5pbXBvcnQgeyBOZ1JlZHV4Um91dGVyIH0gZnJvbSAnLi9yb3V0ZXInO1xuXG5ATmdNb2R1bGUoKVxuZXhwb3J0IGNsYXNzIE5nUmVkdXhSb3V0ZXJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5nUmVkdXhSb3V0ZXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtOZ1JlZHV4Um91dGVyXSxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCB7IE5nUmVkdXhSb3V0ZXIsIFJvdXRlckFjdGlvbiwgcm91dGVyUmVkdWNlciwgVVBEQVRFX0xPQ0FUSU9OIH07XG4iXX0=