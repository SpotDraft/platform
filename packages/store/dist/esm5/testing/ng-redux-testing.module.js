/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { DevToolsExtension, NgRedux } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { MockDevToolsExtension } from './dev-tools.mock';
import { MockNgRedux } from './ng-redux.mock';
/** @type {?} */
var mockNgRedux = MockNgRedux.getInstance();
/**
 * @hidden
 * @return {?}
 */
export function _mockNgReduxFactory() {
    return mockNgRedux;
}
var NgReduxTestingModule = /** @class */ (function () {
    function NgReduxTestingModule() {
    }
    NgReduxTestingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    providers: [
                        { provide: NgRedux, useFactory: _mockNgReduxFactory },
                        { provide: DevToolsExtension, useClass: MockDevToolsExtension },
                    ],
                },] },
    ];
    return NgReduxTestingModule;
}());
export { NgReduxTestingModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVkdXgtdGVzdGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS90ZXN0aW5nLyIsInNvdXJjZXMiOlsibmctcmVkdXgtdGVzdGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFHOUMsSUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDOzs7OztBQUc5QyxNQUFNO0lBQ0osTUFBTSxDQUFDLFdBQVcsQ0FBQztDQUNwQjs7Ozs7Z0JBRUEsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxFQUFFO29CQUNYLFNBQVMsRUFBRTt3QkFDVCxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFO3dCQUNyRCxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUU7cUJBQ2hFO2lCQUNGOzsrQkFyQkQ7O1NBc0JhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRPRE86IFNlZSBpZiB0aGlzIGxpbnRpbmcgcnVsZSBjYW4gYmUgZW5hYmxlZCB3aXRoIG5ldyBidWlsZCBwcm9jZXNzIChuZy1wYWNrYWdyKVxuLy8gdHNsaW50OmRpc2FibGU6bm8taW1wbGljaXQtZGVwZW5kZW5jaWVzXG5pbXBvcnQgeyBEZXZUb29sc0V4dGVuc2lvbiwgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2NrRGV2VG9vbHNFeHRlbnNpb24gfSBmcm9tICcuL2Rldi10b29scy5tb2NrJztcbmltcG9ydCB7IE1vY2tOZ1JlZHV4IH0gZnJvbSAnLi9uZy1yZWR1eC5tb2NrJztcblxuLy8gTmVlZHMgdG8gYmUgaW5pdGlhbGl6ZWQgZWFybHkgc28gQHNlbGVjdCdzIHVzZSB0aGUgbW9ja2VkIHZlcnNpb24gdG9vLlxuY29uc3QgbW9ja05nUmVkdXggPSBNb2NrTmdSZWR1eC5nZXRJbnN0YW5jZSgpO1xuXG4vKiogQGhpZGRlbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9tb2NrTmdSZWR1eEZhY3RvcnkoKSB7XG4gIHJldHVybiBtb2NrTmdSZWR1eDtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogTmdSZWR1eCwgdXNlRmFjdG9yeTogX21vY2tOZ1JlZHV4RmFjdG9yeSB9LFxuICAgIHsgcHJvdmlkZTogRGV2VG9vbHNFeHRlbnNpb24sIHVzZUNsYXNzOiBNb2NrRGV2VG9vbHNFeHRlbnNpb24gfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdSZWR1eFRlc3RpbmdNb2R1bGUge31cbiJdfQ==