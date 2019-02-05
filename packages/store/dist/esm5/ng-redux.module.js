/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule, NgZone } from '@angular/core';
import { DevToolsExtension } from './components/dev-tools';
import { NgRedux } from './components/ng-redux';
import { RootStore } from './components/root-store';
/**
 * @hidden
 * @param {?} ngZone
 * @return {?}
 */
export function _ngReduxFactory(ngZone) {
    return new RootStore(ngZone);
}
var NgReduxModule = /** @class */ (function () {
    function NgReduxModule() {
    }
    NgReduxModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        DevToolsExtension,
                        { provide: NgRedux, useFactory: _ngReduxFactory, deps: [NgZone] },
                    ],
                },] },
    ];
    return NgReduxModule;
}());
export { NgReduxModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVkdXgubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvIiwic291cmNlcyI6WyJuZy1yZWR1eC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzNELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7OztBQUdwRCxNQUFNLDBCQUEwQixNQUFjO0lBQzVDLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUM5Qjs7Ozs7Z0JBRUEsUUFBUSxTQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVCxpQkFBaUI7d0JBQ2pCLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFO3FCQUNsRTtpQkFDRjs7d0JBZkQ7O1NBZ0JhLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZXZUb29sc0V4dGVuc2lvbiB9IGZyb20gJy4vY29tcG9uZW50cy9kZXYtdG9vbHMnO1xuaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJy4vY29tcG9uZW50cy9uZy1yZWR1eCc7XG5pbXBvcnQgeyBSb290U3RvcmUgfSBmcm9tICcuL2NvbXBvbmVudHMvcm9vdC1zdG9yZSc7XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgZnVuY3Rpb24gX25nUmVkdXhGYWN0b3J5KG5nWm9uZTogTmdab25lKSB7XG4gIHJldHVybiBuZXcgUm9vdFN0b3JlKG5nWm9uZSk7XG59XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIERldlRvb2xzRXh0ZW5zaW9uLFxuICAgIHsgcHJvdmlkZTogTmdSZWR1eCwgdXNlRmFjdG9yeTogX25nUmVkdXhGYWN0b3J5LCBkZXBzOiBbTmdab25lXSB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ1JlZHV4TW9kdWxlIHt9XG4iXX0=