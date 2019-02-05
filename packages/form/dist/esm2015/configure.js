/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { FormStore } from './form-store';
/** @type {?} */
export const provideReduxForms = (store) => {
    /** @type {?} */
    const abstractStore = wrap(store);
    return [
        { provide: FormStore, useValue: new FormStore(/** @type {?} */ (abstractStore)) },
    ];
};
/** @type {?} */
const wrap = (store) => {
    /** @type {?} */
    const dispatch = (action) => store.dispatch(action);
    /** @type {?} */
    const getState = () => /** @type {?} */ (store.getState());
    /** @type {?} */
    const subscribe = (fn) => store.subscribe(() => fn(store.getState()));
    return { dispatch, getState, subscribe };
};
const ɵ0 = wrap;
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS8iLCJzb3VyY2VzIjpbImNvbmZpZ3VyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7O0FBS3hELGFBQWEsaUJBQWlCLEdBQUcsQ0FBSSxLQUFxQixFQUFFLEVBQUU7O0lBQzVELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVsQyxNQUFNLENBQUM7UUFDTCxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksU0FBUyxtQkFBQyxhQUFvQixFQUFDLEVBQUU7S0FDdEUsQ0FBQztDQUNILENBQUM7O0FBRUYsTUFBTSxJQUFJLEdBQUcsQ0FBSSxLQUFxQixFQUFvQixFQUFFOztJQUMxRCxNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQWMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7SUFFNUQsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUFFLG1CQUFDLEtBQUssQ0FBQyxRQUFRLEVBQU8sQ0FBQSxDQUFDOztJQUU3QyxNQUFNLFNBQVMsR0FBRyxDQUFDLEVBQXNCLEVBQUUsRUFBRSxDQUMzQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTlDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUM7Q0FDMUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiwgU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7IEFic3RyYWN0U3RvcmUsIEZvcm1TdG9yZSB9IGZyb20gJy4vZm9ybS1zdG9yZSc7XG5cbi8vLyBVc2UgdGhpcyBmdW5jdGlvbiBpbiB5b3VyIHByb3ZpZGVycyBsaXN0IGlmIHlvdSBhcmUgbm90IHVzaW5nIEBhbmd1bGFyLXJlZHV4L2NvcmUuXG4vLy8gVGhpcyB3aWxsIGFsbG93IHlvdSB0byBwcm92aWRlIGEgcHJlZXhpc3Rpbmcgc3RvcmUgdGhhdCB5b3UgaGF2ZSBhbHJlYWR5XG4vLy8gY29uZmlndXJlZCwgcmF0aGVyIHRoYW4gbGV0dGluZyBAYW5ndWxhci1yZWR1eC9jb3JlIGNyZWF0ZSBvbmUgZm9yIHlvdS5cbmV4cG9ydCBjb25zdCBwcm92aWRlUmVkdXhGb3JtcyA9IDxUPihzdG9yZTogU3RvcmU8VD4gfCBhbnkpID0+IHtcbiAgY29uc3QgYWJzdHJhY3RTdG9yZSA9IHdyYXAoc3RvcmUpO1xuXG4gIHJldHVybiBbXG4gICAgeyBwcm92aWRlOiBGb3JtU3RvcmUsIHVzZVZhbHVlOiBuZXcgRm9ybVN0b3JlKGFic3RyYWN0U3RvcmUgYXMgYW55KSB9LFxuICBdO1xufTtcblxuY29uc3Qgd3JhcCA9IDxUPihzdG9yZTogU3RvcmU8VD4gfCBhbnkpOiBBYnN0cmFjdFN0b3JlPFQ+ID0+IHtcbiAgY29uc3QgZGlzcGF0Y2ggPSAoYWN0aW9uOiBBY3Rpb24pID0+IHN0b3JlLmRpc3BhdGNoKGFjdGlvbik7XG5cbiAgY29uc3QgZ2V0U3RhdGUgPSAoKSA9PiBzdG9yZS5nZXRTdGF0ZSgpIGFzIFQ7XG5cbiAgY29uc3Qgc3Vic2NyaWJlID0gKGZuOiAoc3RhdGU6IFQpID0+IHZvaWQpID0+XG4gICAgc3RvcmUuc3Vic2NyaWJlKCgpID0+IGZuKHN0b3JlLmdldFN0YXRlKCkpKTtcblxuICByZXR1cm4geyBkaXNwYXRjaCwgZ2V0U3RhdGUsIHN1YnNjcmliZSB9O1xufTtcbiJdfQ==