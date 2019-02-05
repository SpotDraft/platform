/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgReduxFormConnectModule } from './connect';
import { NgReduxFormConnectArrayModule } from './connect-array';
import { FormStore } from './form-store';
/**
 * @param {?} ngRedux
 * @return {?}
 */
export function formStoreFactory(ngRedux) {
    return new FormStore(ngRedux);
}
var NgReduxFormModule = /** @class */ (function () {
    function NgReduxFormModule() {
    }
    NgReduxFormModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        NgReduxFormConnectModule,
                        NgReduxFormConnectArrayModule,
                    ],
                    exports: [NgReduxFormConnectModule, NgReduxFormConnectArrayModule],
                    providers: [
                        {
                            provide: FormStore,
                            useFactory: formStoreFactory,
                            deps: [NgRedux],
                        },
                    ],
                },] },
    ];
    return NgReduxFormModule;
}());
export { NgReduxFormModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS8iLCJzb3VyY2VzIjpbIm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNyRCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7OztBQUV6QyxNQUFNLDJCQUEyQixPQUFxQjtJQUNwRCxNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDL0I7Ozs7O2dCQUVBLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLHdCQUF3Qjt3QkFDeEIsNkJBQTZCO3FCQUM5QjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSw2QkFBNkIsQ0FBQztvQkFDbEUsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxTQUFTOzRCQUNsQixVQUFVLEVBQUUsZ0JBQWdCOzRCQUM1QixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUM7eUJBQ2hCO3FCQUNGO2lCQUNGOzs0QkEzQkQ7O1NBNEJhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE5nUmVkdXhGb3JtQ29ubmVjdE1vZHVsZSB9IGZyb20gJy4vY29ubmVjdCc7XG5pbXBvcnQgeyBOZ1JlZHV4Rm9ybUNvbm5lY3RBcnJheU1vZHVsZSB9IGZyb20gJy4vY29ubmVjdC1hcnJheSc7XG5pbXBvcnQgeyBGb3JtU3RvcmUgfSBmcm9tICcuL2Zvcm0tc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZm9ybVN0b3JlRmFjdG9yeShuZ1JlZHV4OiBOZ1JlZHV4PGFueT4pIHtcbiAgcmV0dXJuIG5ldyBGb3JtU3RvcmUobmdSZWR1eCk7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE5nUmVkdXhGb3JtQ29ubmVjdE1vZHVsZSxcbiAgICBOZ1JlZHV4Rm9ybUNvbm5lY3RBcnJheU1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW05nUmVkdXhGb3JtQ29ubmVjdE1vZHVsZSwgTmdSZWR1eEZvcm1Db25uZWN0QXJyYXlNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBGb3JtU3RvcmUsXG4gICAgICB1c2VGYWN0b3J5OiBmb3JtU3RvcmVGYWN0b3J5LFxuICAgICAgZGVwczogW05nUmVkdXhdLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5nUmVkdXhGb3JtTW9kdWxlIHt9XG4iXX0=