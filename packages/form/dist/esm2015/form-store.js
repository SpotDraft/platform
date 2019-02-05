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
export const FORM_CHANGED = '@@angular-redux/form/FORM_CHANGED';
export class FormStore {
    /**
     * @param {?} store
     */
    constructor(store) {
        this.store = store;
    }
    /**
     * @return {?}
     */
    getState() {
        return this.store.getState();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    subscribe(fn) {
        return this.store.subscribe(() => fn(this.getState()));
    }
    /**
     * @template T
     * @param {?} path
     * @param {?} form
     * @param {?} value
     * @return {?}
     */
    valueChanged(path, form, value) {
        this.store.dispatch({
            type: FORM_CHANGED,
            payload: {
                path,
                form,
                valid: form.valid === true,
                value,
            },
        });
    }
}
FormStore.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FormStore.ctorParameters = () => [
    { type: NgRedux }
];
if (false) {
    /** @type {?} */
    FormStore.prototype.store;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vIiwic291cmNlcyI6WyJmb3JtLXN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7Ozs7Ozs7OztBQWUvQyxhQUFhLFlBQVksR0FBRyxtQ0FBbUMsQ0FBQztBQUdoRSxNQUFNOzs7O0lBUUosWUFBb0IsS0FBbUI7UUFBbkIsVUFBSyxHQUFMLEtBQUssQ0FBYztLQUFJOzs7O0lBRTNDLFFBQVE7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjs7Ozs7SUFFRCxTQUFTLENBQUMsRUFBd0I7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3hEOzs7Ozs7OztJQUVELFlBQVksQ0FBSSxJQUFjLEVBQUUsSUFBWSxFQUFFLEtBQVE7UUFDcEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDbEIsSUFBSSxFQUFFLFlBQVk7WUFDbEIsT0FBTyxFQUFFO2dCQUNQLElBQUk7Z0JBQ0osSUFBSTtnQkFDSixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJO2dCQUMxQixLQUFLO2FBQ047U0FDRixDQUFDLENBQUM7S0FDSjs7O1lBN0JGLFVBQVU7Ozs7WUFqQkYsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuXG5pbXBvcnQgeyBBY3Rpb24sIFVuc3Vic2NyaWJlIH0gZnJvbSAncmVkdXgnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFic3RyYWN0U3RvcmU8Um9vdFN0YXRlPiB7XG4gIC8vLyBEaXNwYXRjaCBhbiBhY3Rpb25cbiAgZGlzcGF0Y2goYWN0aW9uOiBBY3Rpb24gJiB7IHBheWxvYWQ6IGFueSB9KTogdm9pZDtcblxuICAvLy8gUmV0cmlldmUgdGhlIGN1cnJlbnQgYXBwbGljYXRpb24gc3RhdGVcbiAgZ2V0U3RhdGUoKTogUm9vdFN0YXRlO1xuXG4gIC8vLyBTdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiB0aGUgc3RvcmVcbiAgc3Vic2NyaWJlKGZuOiAoc3RhdGU6IFJvb3RTdGF0ZSkgPT4gdm9pZCk6IFVuc3Vic2NyaWJlO1xufVxuXG5leHBvcnQgY29uc3QgRk9STV9DSEFOR0VEID0gJ0BAYW5ndWxhci1yZWR1eC9mb3JtL0ZPUk1fQ0hBTkdFRCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb3JtU3RvcmUge1xuICAvLy8gTk9URShjYm9uZCk6IFRoZSBkZWNsYXJhdGlvbiBvZiBzdG9yZSBpcyBtaXNsZWFkaW5nLiBUaGlzIGNsYXNzIGlzXG4gIC8vLyBhY3R1YWxseSBjYXBhYmxlIG9mIHRha2luZyBhIHBsYWluIFJlZHV4IHN0b3JlIG9yIGFuIE5nUmVkdXggaW5zdGFuY2UuXG4gIC8vLyBCdXQgaW4gb3JkZXIgdG8gbWFrZSB0aGUgbmcgZGVwZW5kZW5jeSBpbmplY3RvciB3b3JrIHByb3Blcmx5LCB3ZVxuICAvLy8gZGVjbGFyZSBpdCBhcyBhbiBOZ1JlZHV4IHR5cGUsIHNpbmNlIHRoZSBAYW5ndWxhci1yZWR1eC9zdG9yZSB1c2UgY2FzZSBpbnZvbHZlc1xuICAvLy8gY2FsbGluZyB0aGUgY29uc3RydWN0b3Igb2YgdGhpcyBjbGFzcyBtYW51YWxseSAoZnJvbSBjb25maWd1cmUudHMpLFxuICAvLy8gd2hlcmUgYSBwbGFpbiBzdG9yZSBjYW4gYmUgY2FzdCB0byBhbiBOZ1JlZHV4LiAoRm9yIG91ciBwdXJwb3NlcywgdGhleVxuICAvLy8gaGF2ZSBhbG1vc3QgaWRlbnRpY2FsIHNoYXBlcy4pXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IE5nUmVkdXg8YW55Pikge31cblxuICBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpO1xuICB9XG5cbiAgc3Vic2NyaWJlKGZuOiAoc3RhdGU6IGFueSkgPT4gdm9pZCk6IFVuc3Vic2NyaWJlIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zdWJzY3JpYmUoKCkgPT4gZm4odGhpcy5nZXRTdGF0ZSgpKSk7XG4gIH1cblxuICB2YWx1ZUNoYW5nZWQ8VD4ocGF0aDogc3RyaW5nW10sIGZvcm06IE5nRm9ybSwgdmFsdWU6IFQpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IEZPUk1fQ0hBTkdFRCxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgcGF0aCxcbiAgICAgICAgZm9ybSxcbiAgICAgICAgdmFsaWQ6IGZvcm0udmFsaWQgPT09IHRydWUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuIl19