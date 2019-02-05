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
export class NgReduxFormModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS8iLCJzb3VyY2VzIjpbIm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNyRCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7OztBQUV6QyxNQUFNLDJCQUEyQixPQUFxQjtJQUNwRCxNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDL0I7QUFrQkQsTUFBTTs7O1lBaEJMLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLHdCQUF3QjtvQkFDeEIsNkJBQTZCO2lCQUM5QjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSw2QkFBNkIsQ0FBQztnQkFDbEUsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxTQUFTO3dCQUNsQixVQUFVLEVBQUUsZ0JBQWdCO3dCQUM1QixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUM7cUJBQ2hCO2lCQUNGO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBOZ1JlZHV4Rm9ybUNvbm5lY3RNb2R1bGUgfSBmcm9tICcuL2Nvbm5lY3QnO1xuaW1wb3J0IHsgTmdSZWR1eEZvcm1Db25uZWN0QXJyYXlNb2R1bGUgfSBmcm9tICcuL2Nvbm5lY3QtYXJyYXknO1xuaW1wb3J0IHsgRm9ybVN0b3JlIH0gZnJvbSAnLi9mb3JtLXN0b3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1TdG9yZUZhY3RvcnkobmdSZWR1eDogTmdSZWR1eDxhbnk+KSB7XG4gIHJldHVybiBuZXcgRm9ybVN0b3JlKG5nUmVkdXgpO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBOZ1JlZHV4Rm9ybUNvbm5lY3RNb2R1bGUsXG4gICAgTmdSZWR1eEZvcm1Db25uZWN0QXJyYXlNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtOZ1JlZHV4Rm9ybUNvbm5lY3RNb2R1bGUsIE5nUmVkdXhGb3JtQ29ubmVjdEFycmF5TW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogRm9ybVN0b3JlLFxuICAgICAgdXNlRmFjdG9yeTogZm9ybVN0b3JlRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtOZ1JlZHV4XSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ1JlZHV4Rm9ybU1vZHVsZSB7fVxuIl19