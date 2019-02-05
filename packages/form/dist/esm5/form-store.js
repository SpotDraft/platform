/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
/**
 * @record
 * @template RootState
 */
export function AbstractStore() { }
/** @type {?} */
AbstractStore.prototype.dispatch;
/** @type {?} */
AbstractStore.prototype.getState;
/** @type {?} */
AbstractStore.prototype.subscribe;
/** @type {?} */
export var FORM_CHANGED = '@@angular-redux/form/FORM_CHANGED';
var FormStore = /** @class */ (function () {
    /// NOTE(cbond): The declaration of store is misleading. This class is
    /// actually capable of taking a plain Redux store or an NgRedux instance.
    /// But in order to make the ng dependency injector work properly, we
    /// declare it as an NgRedux type, since the @angular-redux/store use case involves
    /// calling the constructor of this class manually (from configure.ts),
    /// where a plain store can be cast to an NgRedux. (For our purposes, they
    /// have almost identical shapes.)
    function FormStore(store) {
        this.store = store;
    }
    /**
     * @return {?}
     */
    FormStore.prototype.getState = /**
     * @return {?}
     */
    function () {
        return this.store.getState();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    FormStore.prototype.subscribe = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        var _this = this;
        return this.store.subscribe(function () { return fn(_this.getState()); });
    };
    /**
     * @template T
     * @param {?} path
     * @param {?} form
     * @param {?} value
     * @return {?}
     */
    FormStore.prototype.valueChanged = /**
     * @template T
     * @param {?} path
     * @param {?} form
     * @param {?} value
     * @return {?}
     */
    function (path, form, value) {
        this.store.dispatch({
            type: FORM_CHANGED,
            payload: {
                path: path,
                form: form,
                valid: form.valid === true,
                value: value,
            },
        });
    };
    FormStore.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FormStore.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    return FormStore;
}());
export { FormStore };
if (false) {
    /** @type {?} */
    FormStore.prototype.store;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vIiwic291cmNlcyI6WyJmb3JtLXN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7Ozs7Ozs7OztBQWUvQyxXQUFhLFlBQVksR0FBRyxtQ0FBbUMsQ0FBQzs7SUFJOUQsc0VBQXNFO0lBQ3RFLDBFQUEwRTtJQUMxRSxxRUFBcUU7SUFDckUsbUZBQW1GO0lBQ25GLHVFQUF1RTtJQUN2RSwwRUFBMEU7SUFDMUUsa0NBQWtDO0lBQ2xDLG1CQUFvQixLQUFtQjtRQUFuQixVQUFLLEdBQUwsS0FBSyxDQUFjO0tBQUk7Ozs7SUFFM0MsNEJBQVE7OztJQUFSO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7O0lBRUQsNkJBQVM7Ozs7SUFBVCxVQUFVLEVBQXdCO1FBQWxDLGlCQUVDO1FBREMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxFQUFFLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQW5CLENBQW1CLENBQUMsQ0FBQztLQUN4RDs7Ozs7Ozs7SUFFRCxnQ0FBWTs7Ozs7OztJQUFaLFVBQWdCLElBQWMsRUFBRSxJQUFZLEVBQUUsS0FBUTtRQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUNsQixJQUFJLEVBQUUsWUFBWTtZQUNsQixPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxNQUFBO2dCQUNKLElBQUksTUFBQTtnQkFDSixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJO2dCQUMxQixLQUFLLE9BQUE7YUFDTjtTQUNGLENBQUMsQ0FBQztLQUNKOztnQkE3QkYsVUFBVTs7OztnQkFqQkYsT0FBTzs7b0JBSmhCOztTQXNCYSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5cbmltcG9ydCB7IEFjdGlvbiwgVW5zdWJzY3JpYmUgfSBmcm9tICdyZWR1eCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWJzdHJhY3RTdG9yZTxSb290U3RhdGU+IHtcbiAgLy8vIERpc3BhdGNoIGFuIGFjdGlvblxuICBkaXNwYXRjaChhY3Rpb246IEFjdGlvbiAmIHsgcGF5bG9hZDogYW55IH0pOiB2b2lkO1xuXG4gIC8vLyBSZXRyaWV2ZSB0aGUgY3VycmVudCBhcHBsaWNhdGlvbiBzdGF0ZVxuICBnZXRTdGF0ZSgpOiBSb290U3RhdGU7XG5cbiAgLy8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIHRoZSBzdG9yZVxuICBzdWJzY3JpYmUoZm46IChzdGF0ZTogUm9vdFN0YXRlKSA9PiB2b2lkKTogVW5zdWJzY3JpYmU7XG59XG5cbmV4cG9ydCBjb25zdCBGT1JNX0NIQU5HRUQgPSAnQEBhbmd1bGFyLXJlZHV4L2Zvcm0vRk9STV9DSEFOR0VEJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1TdG9yZSB7XG4gIC8vLyBOT1RFKGNib25kKTogVGhlIGRlY2xhcmF0aW9uIG9mIHN0b3JlIGlzIG1pc2xlYWRpbmcuIFRoaXMgY2xhc3MgaXNcbiAgLy8vIGFjdHVhbGx5IGNhcGFibGUgb2YgdGFraW5nIGEgcGxhaW4gUmVkdXggc3RvcmUgb3IgYW4gTmdSZWR1eCBpbnN0YW5jZS5cbiAgLy8vIEJ1dCBpbiBvcmRlciB0byBtYWtlIHRoZSBuZyBkZXBlbmRlbmN5IGluamVjdG9yIHdvcmsgcHJvcGVybHksIHdlXG4gIC8vLyBkZWNsYXJlIGl0IGFzIGFuIE5nUmVkdXggdHlwZSwgc2luY2UgdGhlIEBhbmd1bGFyLXJlZHV4L3N0b3JlIHVzZSBjYXNlIGludm9sdmVzXG4gIC8vLyBjYWxsaW5nIHRoZSBjb25zdHJ1Y3RvciBvZiB0aGlzIGNsYXNzIG1hbnVhbGx5IChmcm9tIGNvbmZpZ3VyZS50cyksXG4gIC8vLyB3aGVyZSBhIHBsYWluIHN0b3JlIGNhbiBiZSBjYXN0IHRvIGFuIE5nUmVkdXguIChGb3Igb3VyIHB1cnBvc2VzLCB0aGV5XG4gIC8vLyBoYXZlIGFsbW9zdCBpZGVudGljYWwgc2hhcGVzLilcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogTmdSZWR1eDxhbnk+KSB7fVxuXG4gIGdldFN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFN0YXRlKCk7XG4gIH1cblxuICBzdWJzY3JpYmUoZm46IChzdGF0ZTogYW55KSA9PiB2b2lkKTogVW5zdWJzY3JpYmUge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnN1YnNjcmliZSgoKSA9PiBmbih0aGlzLmdldFN0YXRlKCkpKTtcbiAgfVxuXG4gIHZhbHVlQ2hhbmdlZDxUPihwYXRoOiBzdHJpbmdbXSwgZm9ybTogTmdGb3JtLCB2YWx1ZTogVCkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogRk9STV9DSEFOR0VELFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBwYXRoLFxuICAgICAgICBmb3JtLFxuICAgICAgICB2YWxpZDogZm9ybS52YWxpZCA9PT0gdHJ1ZSxcbiAgICAgICAgdmFsdWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iXX0=