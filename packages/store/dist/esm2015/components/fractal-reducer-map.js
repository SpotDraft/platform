/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { getIn } from '../utils/get-in';
import { setIn } from '../utils/set-in';
/** @type {?} */
let reducerMap = {};
/** @type {?} */
const composeReducers = (...reducers) => (state, action) => reducers.reduce((subState, reducer) => reducer(subState, action), state);
const ɵ0 = composeReducers;
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
    const existingFractalReducer = reducerMap[JSON.stringify(basePath)];
    if (existingFractalReducer && existingFractalReducer !== localReducer) {
        throw new Error(`attempt to overwrite fractal reducer for basePath ${basePath}`);
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
function rootFractalReducer(state = {}, action) {
    /** @type {?} */
    const fractalKey = action['@angular-redux::fractalkey'];
    /** @type {?} */
    const fractalPath = fractalKey ? JSON.parse(fractalKey) : [];
    /** @type {?} */
    const localReducer = reducerMap[fractalKey || ''];
    return fractalKey && localReducer
        ? setIn(state, fractalPath, localReducer(getIn(state, fractalPath), action))
        : state;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhY3RhbC1yZWR1Y2VyLW1hcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9mcmFjdGFsLXJlZHVjZXItbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUd4QyxJQUFJLFVBQVUsR0FBOEMsRUFBRSxDQUFDOztBQUUvRCxNQUFNLGVBQWUsR0FBRyxDQUN0QixHQUFHLFFBQW1DLEVBQ2IsRUFBRSxDQUFDLENBQUMsS0FBVSxFQUFFLE1BQWlCLEVBQUUsRUFBRSxDQUM5RCxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7O0FBUTNFLE1BQU0sZ0NBQWdDLFdBQW9DO0lBQ3hFLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDaEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRSxXQUFXLENBQUMsQ0FBQztDQUN6RDs7Ozs7OztBQUdELE1BQU0saUNBQ0osUUFBc0IsRUFDdEIsWUFBcUM7O0lBRXJDLE1BQU0sc0JBQXNCLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNwRSxFQUFFLENBQUMsQ0FBQyxzQkFBc0IsSUFBSSxzQkFBc0IsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sSUFBSSxLQUFLLENBQ2IscURBQXFELFFBQVEsRUFBRSxDQUNoRSxDQUFDO0tBQ0g7SUFFRCxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQztDQUNyRDs7Ozs7OztBQUdELE1BQU0sOEJBQ0osUUFBc0IsRUFDdEIsZ0JBQXlDO0lBRXpDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7Q0FDekQ7Ozs7OztBQUVELDRCQUNFLFFBQVksRUFBRSxFQUNkLE1BQTZEOztJQUU3RCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQzs7SUFDeEQsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7O0lBQzdELE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUM7SUFDbEQsTUFBTSxDQUFDLFVBQVUsSUFBSSxZQUFZO1FBQy9CLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM1RSxDQUFDLENBQUMsS0FBSyxDQUFDO0NBQ1giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbnlBY3Rpb24sIFJlZHVjZXIgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBnZXRJbiB9IGZyb20gJy4uL3V0aWxzL2dldC1pbic7XG5pbXBvcnQgeyBzZXRJbiB9IGZyb20gJy4uL3V0aWxzL3NldC1pbic7XG5pbXBvcnQgeyBQYXRoU2VsZWN0b3IgfSBmcm9tICcuL3NlbGVjdG9ycyc7XG5cbmxldCByZWR1Y2VyTWFwOiB7IFtpZDogc3RyaW5nXTogUmVkdWNlcjxhbnksIEFueUFjdGlvbj4gfSA9IHt9O1xuXG5jb25zdCBjb21wb3NlUmVkdWNlcnMgPSAoXG4gIC4uLnJlZHVjZXJzOiBSZWR1Y2VyPGFueSwgQW55QWN0aW9uPltdXG4pOiBSZWR1Y2VyPGFueSwgQW55QWN0aW9uPiA9PiAoc3RhdGU6IGFueSwgYWN0aW9uOiBBbnlBY3Rpb24pID0+XG4gIHJlZHVjZXJzLnJlZHVjZSgoc3ViU3RhdGUsIHJlZHVjZXIpID0+IHJlZHVjZXIoc3ViU3RhdGUsIGFjdGlvbiksIHN0YXRlKTtcblxuLyoqXG4gKiBAcGFyYW0gcm9vdFJlZHVjZXIgQ2FsbCB0aGlzIG9uIHlvdXIgcm9vdCByZWR1Y2VyIHRvIGVuYWJsZSBTdWJTdG9yZVxuICogZnVuY3Rpb25hbGl0eSBmb3IgcHJlLWNvbmZpZ3VyZWQgc3RvcmVzIChlLmcuIHVzaW5nIE5nUmVkdXgucHJvdmlkZVN0b3JlKCkpLlxuICogTmdSZWR1eC5jb25maWd1cmVTdG9yZVxuICogZG9lcyBpdCBmb3IgeW91IHVuZGVyIHRoZSBob29kLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlRnJhY3RhbFJlZHVjZXJzKHJvb3RSZWR1Y2VyOiBSZWR1Y2VyPGFueSwgQW55QWN0aW9uPikge1xuICByZWR1Y2VyTWFwID0ge307XG4gIHJldHVybiBjb21wb3NlUmVkdWNlcnMocm9vdEZyYWN0YWxSZWR1Y2VyLCByb290UmVkdWNlcik7XG59XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJGcmFjdGFsUmVkdWNlcihcbiAgYmFzZVBhdGg6IFBhdGhTZWxlY3RvcixcbiAgbG9jYWxSZWR1Y2VyOiBSZWR1Y2VyPGFueSwgQW55QWN0aW9uPixcbik6IHZvaWQge1xuICBjb25zdCBleGlzdGluZ0ZyYWN0YWxSZWR1Y2VyID0gcmVkdWNlck1hcFtKU09OLnN0cmluZ2lmeShiYXNlUGF0aCldO1xuICBpZiAoZXhpc3RpbmdGcmFjdGFsUmVkdWNlciAmJiBleGlzdGluZ0ZyYWN0YWxSZWR1Y2VyICE9PSBsb2NhbFJlZHVjZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgYXR0ZW1wdCB0byBvdmVyd3JpdGUgZnJhY3RhbCByZWR1Y2VyIGZvciBiYXNlUGF0aCAke2Jhc2VQYXRofWAsXG4gICAgKTtcbiAgfVxuXG4gIHJlZHVjZXJNYXBbSlNPTi5zdHJpbmdpZnkoYmFzZVBhdGgpXSA9IGxvY2FsUmVkdWNlcjtcbn1cblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTG9jYWxSZWR1Y2VyKFxuICBiYXNlUGF0aDogUGF0aFNlbGVjdG9yLFxuICBuZXh0TG9jYWxSZWR1Y2VyOiBSZWR1Y2VyPGFueSwgQW55QWN0aW9uPixcbik6IHZvaWQge1xuICByZWR1Y2VyTWFwW0pTT04uc3RyaW5naWZ5KGJhc2VQYXRoKV0gPSBuZXh0TG9jYWxSZWR1Y2VyO1xufVxuXG5mdW5jdGlvbiByb290RnJhY3RhbFJlZHVjZXIoXG4gIHN0YXRlOiB7fSA9IHt9LFxuICBhY3Rpb246IEFueUFjdGlvbiAmIHsgJ0Bhbmd1bGFyLXJlZHV4OjpmcmFjdGFsa2V5Jz86IHN0cmluZyB9LFxuKSB7XG4gIGNvbnN0IGZyYWN0YWxLZXkgPSBhY3Rpb25bJ0Bhbmd1bGFyLXJlZHV4OjpmcmFjdGFsa2V5J107XG4gIGNvbnN0IGZyYWN0YWxQYXRoID0gZnJhY3RhbEtleSA/IEpTT04ucGFyc2UoZnJhY3RhbEtleSkgOiBbXTtcbiAgY29uc3QgbG9jYWxSZWR1Y2VyID0gcmVkdWNlck1hcFtmcmFjdGFsS2V5IHx8ICcnXTtcbiAgcmV0dXJuIGZyYWN0YWxLZXkgJiYgbG9jYWxSZWR1Y2VyXG4gICAgPyBzZXRJbihzdGF0ZSwgZnJhY3RhbFBhdGgsIGxvY2FsUmVkdWNlcihnZXRJbihzdGF0ZSwgZnJhY3RhbFBhdGgpLCBhY3Rpb24pKVxuICAgIDogc3RhdGU7XG59XG4iXX0=