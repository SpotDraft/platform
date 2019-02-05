/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { UPDATE_LOCATION } from './actions';
/** @type {?} */
export var DefaultRouterState = '';
/**
 * @record
 */
export function RouterAction() { }
/** @type {?|undefined} */
RouterAction.prototype.payload;
/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
export function routerReducer(state, action) {
    if (state === void 0) { state = DefaultRouterState; }
    switch (action.type) {
        case UPDATE_LOCATION:
            return action.payload || DefaultRouterState;
        default:
            return state;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L3JvdXRlci8iLCJzb3VyY2VzIjpbInJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxXQUFXLENBQUM7O0FBRTVDLFdBQWEsa0JBQWtCLEdBQVcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7QUFNN0MsTUFBTSx3QkFDSixLQUFrQyxFQUNsQyxNQUFvQjtJQURwQixzQkFBQSxFQUFBLDBCQUFrQztJQUdsQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwQixLQUFLLGVBQWU7WUFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksa0JBQWtCLENBQUM7UUFDOUM7WUFDRSxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2hCO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7IFVQREFURV9MT0NBVElPTiB9IGZyb20gJy4vYWN0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0Um91dGVyU3RhdGU6IHN0cmluZyA9ICcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckFjdGlvbiBleHRlbmRzIEFjdGlvbiB7XG4gIHBheWxvYWQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3V0ZXJSZWR1Y2VyKFxuICBzdGF0ZTogc3RyaW5nID0gRGVmYXVsdFJvdXRlclN0YXRlLFxuICBhY3Rpb246IFJvdXRlckFjdGlvbixcbik6IHN0cmluZyB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFVQREFURV9MT0NBVElPTjpcbiAgICAgIHJldHVybiBhY3Rpb24ucGF5bG9hZCB8fCBEZWZhdWx0Um91dGVyU3RhdGU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuIl19