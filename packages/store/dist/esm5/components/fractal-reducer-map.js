/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { getIn } from '../utils/get-in';
import { setIn } from '../utils/set-in';
/** @type {?} */
var reducerMap = {};
/** @type {?} */
var composeReducers = function () {
    var reducers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        reducers[_i] = arguments[_i];
    }
    return function (state, action) {
        return reducers.reduce(function (subState, reducer) { return reducer(subState, action); }, state);
    };
};
var ɵ0 = composeReducers;
/**
 * @param {?} rootReducer Call this on your root reducer to enable SubStore
 * functionality for pre-configured stores (e.g. using NgRedux.provideStore()).
 * NgRedux.configureStore
 * does it for you under the hood.
 * @return {?}
 */
export function enableFractalReducers(rootReducer) {
    reducerMap = {};
    return composeReducers(rootFractalReducer, rootReducer);
}
/**
 * @hidden
 * @param {?} basePath
 * @param {?} localReducer
 * @return {?}
 */
export function registerFractalReducer(basePath, localReducer) {
    /** @type {?} */
    var existingFractalReducer = reducerMap[JSON.stringify(basePath)];
    if (existingFractalReducer && existingFractalReducer !== localReducer) {
        throw new Error("attempt to overwrite fractal reducer for basePath " + basePath);
    }
    reducerMap[JSON.stringify(basePath)] = localReducer;
}
/**
 * @hidden
 * @param {?} basePath
 * @param {?} nextLocalReducer
 * @return {?}
 */
export function replaceLocalReducer(basePath, nextLocalReducer) {
    reducerMap[JSON.stringify(basePath)] = nextLocalReducer;
}
/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
function rootFractalReducer(state, action) {
    if (state === void 0) { state = {}; }
    /** @type {?} */
    var fractalKey = action['@angular-redux::fractalkey'];
    /** @type {?} */
    var fractalPath = fractalKey ? JSON.parse(fractalKey) : [];
    /** @type {?} */
    var localReducer = reducerMap[fractalKey || ''];
    return fractalKey && localReducer
        ? setIn(state, fractalPath, localReducer(getIn(state, fractalPath), action))
        : state;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhY3RhbC1yZWR1Y2VyLW1hcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9mcmFjdGFsLXJlZHVjZXItbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUd4QyxJQUFJLFVBQVUsR0FBOEMsRUFBRSxDQUFDOztBQUUvRCxJQUFNLGVBQWUsR0FBRztJQUN0QixrQkFBc0M7U0FBdEMsVUFBc0MsRUFBdEMscUJBQXNDLEVBQXRDLElBQXNDO1FBQXRDLDZCQUFzQzs7SUFDVixPQUFBLFVBQUMsS0FBVSxFQUFFLE1BQWlCO1FBQzFELE9BQUEsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFDLFFBQVEsRUFBRSxPQUFPLElBQUssT0FBQSxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUF6QixDQUF5QixFQUFFLEtBQUssQ0FBQztJQUF4RSxDQUF3RTtBQUQ1QyxDQUM0QyxDQUFDOzs7Ozs7Ozs7QUFRM0UsTUFBTSxnQ0FBZ0MsV0FBb0M7SUFDeEUsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUNoQixNQUFNLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLFdBQVcsQ0FBQyxDQUFDO0NBQ3pEOzs7Ozs7O0FBR0QsTUFBTSxpQ0FDSixRQUFzQixFQUN0QixZQUFxQzs7SUFFckMsSUFBTSxzQkFBc0IsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLEVBQUUsQ0FBQyxDQUFDLHNCQUFzQixJQUFJLHNCQUFzQixLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDdEUsTUFBTSxJQUFJLEtBQUssQ0FDYix1REFBcUQsUUFBVSxDQUNoRSxDQUFDO0tBQ0g7SUFFRCxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQztDQUNyRDs7Ozs7OztBQUdELE1BQU0sOEJBQ0osUUFBc0IsRUFDdEIsZ0JBQXlDO0lBRXpDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7Q0FDekQ7Ozs7OztBQUVELDRCQUNFLEtBQWMsRUFDZCxNQUE2RDtJQUQ3RCxzQkFBQSxFQUFBLFVBQWM7O0lBR2QsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLDRCQUE0QixDQUFDLENBQUM7O0lBQ3hELElBQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOztJQUM3RCxJQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sQ0FBQyxVQUFVLElBQUksWUFBWTtRQUMvQixDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztDQUNYIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW55QWN0aW9uLCBSZWR1Y2VyIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgZ2V0SW4gfSBmcm9tICcuLi91dGlscy9nZXQtaW4nO1xuaW1wb3J0IHsgc2V0SW4gfSBmcm9tICcuLi91dGlscy9zZXQtaW4nO1xuaW1wb3J0IHsgUGF0aFNlbGVjdG9yIH0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuXG5sZXQgcmVkdWNlck1hcDogeyBbaWQ6IHN0cmluZ106IFJlZHVjZXI8YW55LCBBbnlBY3Rpb24+IH0gPSB7fTtcblxuY29uc3QgY29tcG9zZVJlZHVjZXJzID0gKFxuICAuLi5yZWR1Y2VyczogUmVkdWNlcjxhbnksIEFueUFjdGlvbj5bXVxuKTogUmVkdWNlcjxhbnksIEFueUFjdGlvbj4gPT4gKHN0YXRlOiBhbnksIGFjdGlvbjogQW55QWN0aW9uKSA9PlxuICByZWR1Y2Vycy5yZWR1Y2UoKHN1YlN0YXRlLCByZWR1Y2VyKSA9PiByZWR1Y2VyKHN1YlN0YXRlLCBhY3Rpb24pLCBzdGF0ZSk7XG5cbi8qKlxuICogQHBhcmFtIHJvb3RSZWR1Y2VyIENhbGwgdGhpcyBvbiB5b3VyIHJvb3QgcmVkdWNlciB0byBlbmFibGUgU3ViU3RvcmVcbiAqIGZ1bmN0aW9uYWxpdHkgZm9yIHByZS1jb25maWd1cmVkIHN0b3JlcyAoZS5nLiB1c2luZyBOZ1JlZHV4LnByb3ZpZGVTdG9yZSgpKS5cbiAqIE5nUmVkdXguY29uZmlndXJlU3RvcmVcbiAqIGRvZXMgaXQgZm9yIHlvdSB1bmRlciB0aGUgaG9vZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZUZyYWN0YWxSZWR1Y2Vycyhyb290UmVkdWNlcjogUmVkdWNlcjxhbnksIEFueUFjdGlvbj4pIHtcbiAgcmVkdWNlck1hcCA9IHt9O1xuICByZXR1cm4gY29tcG9zZVJlZHVjZXJzKHJvb3RGcmFjdGFsUmVkdWNlciwgcm9vdFJlZHVjZXIpO1xufVxuXG4vKiogQGhpZGRlbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRnJhY3RhbFJlZHVjZXIoXG4gIGJhc2VQYXRoOiBQYXRoU2VsZWN0b3IsXG4gIGxvY2FsUmVkdWNlcjogUmVkdWNlcjxhbnksIEFueUFjdGlvbj4sXG4pOiB2b2lkIHtcbiAgY29uc3QgZXhpc3RpbmdGcmFjdGFsUmVkdWNlciA9IHJlZHVjZXJNYXBbSlNPTi5zdHJpbmdpZnkoYmFzZVBhdGgpXTtcbiAgaWYgKGV4aXN0aW5nRnJhY3RhbFJlZHVjZXIgJiYgZXhpc3RpbmdGcmFjdGFsUmVkdWNlciAhPT0gbG9jYWxSZWR1Y2VyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYGF0dGVtcHQgdG8gb3ZlcndyaXRlIGZyYWN0YWwgcmVkdWNlciBmb3IgYmFzZVBhdGggJHtiYXNlUGF0aH1gLFxuICAgICk7XG4gIH1cblxuICByZWR1Y2VyTWFwW0pTT04uc3RyaW5naWZ5KGJhc2VQYXRoKV0gPSBsb2NhbFJlZHVjZXI7XG59XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZUxvY2FsUmVkdWNlcihcbiAgYmFzZVBhdGg6IFBhdGhTZWxlY3RvcixcbiAgbmV4dExvY2FsUmVkdWNlcjogUmVkdWNlcjxhbnksIEFueUFjdGlvbj4sXG4pOiB2b2lkIHtcbiAgcmVkdWNlck1hcFtKU09OLnN0cmluZ2lmeShiYXNlUGF0aCldID0gbmV4dExvY2FsUmVkdWNlcjtcbn1cblxuZnVuY3Rpb24gcm9vdEZyYWN0YWxSZWR1Y2VyKFxuICBzdGF0ZToge30gPSB7fSxcbiAgYWN0aW9uOiBBbnlBY3Rpb24gJiB7ICdAYW5ndWxhci1yZWR1eDo6ZnJhY3RhbGtleSc/OiBzdHJpbmcgfSxcbikge1xuICBjb25zdCBmcmFjdGFsS2V5ID0gYWN0aW9uWydAYW5ndWxhci1yZWR1eDo6ZnJhY3RhbGtleSddO1xuICBjb25zdCBmcmFjdGFsUGF0aCA9IGZyYWN0YWxLZXkgPyBKU09OLnBhcnNlKGZyYWN0YWxLZXkpIDogW107XG4gIGNvbnN0IGxvY2FsUmVkdWNlciA9IHJlZHVjZXJNYXBbZnJhY3RhbEtleSB8fCAnJ107XG4gIHJldHVybiBmcmFjdGFsS2V5ICYmIGxvY2FsUmVkdWNlclxuICAgID8gc2V0SW4oc3RhdGUsIGZyYWN0YWxQYXRoLCBsb2NhbFJlZHVjZXIoZ2V0SW4oc3RhdGUsIGZyYWN0YWxQYXRoKSwgYWN0aW9uKSlcbiAgICA6IHN0YXRlO1xufVxuIl19