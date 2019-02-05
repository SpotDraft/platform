/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { DevToolsExtension, NgRedux } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { MockDevToolsExtension } from './dev-tools.mock';
import { MockNgRedux } from './ng-redux.mock';
/** @type {?} */
const mockNgRedux = MockNgRedux.getInstance();
/**
 * @hidden
 * @return {?}
 */
export function _mockNgReduxFactory() {
    return mockNgRedux;
}
export class NgReduxTestingModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVkdXgtdGVzdGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS90ZXN0aW5nLyIsInNvdXJjZXMiOlsibmctcmVkdXgtdGVzdGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFHOUMsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDOzs7OztBQUc5QyxNQUFNO0lBQ0osTUFBTSxDQUFDLFdBQVcsQ0FBQztDQUNwQjtBQVNELE1BQU07OztZQVBMLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsRUFBRTtnQkFDWCxTQUFTLEVBQUU7b0JBQ1QsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRTtvQkFDckQsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFO2lCQUNoRTthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVE9ETzogU2VlIGlmIHRoaXMgbGludGluZyBydWxlIGNhbiBiZSBlbmFibGVkIHdpdGggbmV3IGJ1aWxkIHByb2Nlc3MgKG5nLXBhY2thZ3IpXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1pbXBsaWNpdC1kZXBlbmRlbmNpZXNcbmltcG9ydCB7IERldlRvb2xzRXh0ZW5zaW9uLCBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vY2tEZXZUb29sc0V4dGVuc2lvbiB9IGZyb20gJy4vZGV2LXRvb2xzLm1vY2snO1xuaW1wb3J0IHsgTW9ja05nUmVkdXggfSBmcm9tICcuL25nLXJlZHV4Lm1vY2snO1xuXG4vLyBOZWVkcyB0byBiZSBpbml0aWFsaXplZCBlYXJseSBzbyBAc2VsZWN0J3MgdXNlIHRoZSBtb2NrZWQgdmVyc2lvbiB0b28uXG5jb25zdCBtb2NrTmdSZWR1eCA9IE1vY2tOZ1JlZHV4LmdldEluc3RhbmNlKCk7XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgZnVuY3Rpb24gX21vY2tOZ1JlZHV4RmFjdG9yeSgpIHtcbiAgcmV0dXJuIG1vY2tOZ1JlZHV4O1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBOZ1JlZHV4LCB1c2VGYWN0b3J5OiBfbW9ja05nUmVkdXhGYWN0b3J5IH0sXG4gICAgeyBwcm92aWRlOiBEZXZUb29sc0V4dGVuc2lvbiwgdXNlQ2xhc3M6IE1vY2tEZXZUb29sc0V4dGVuc2lvbiB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ1JlZHV4VGVzdGluZ01vZHVsZSB7fVxuIl19