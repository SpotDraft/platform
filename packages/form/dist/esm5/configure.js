/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { FormStore } from './form-store';
/** @type {?} */
export var provideReduxForms = function (store) {
    /** @type {?} */
    var abstractStore = wrap(store);
    return [
        { provide: FormStore, useValue: new FormStore(/** @type {?} */ (abstractStore)) },
    ];
};
/** @type {?} */
var wrap = function (store) {
    /** @type {?} */
    var dispatch = function (action) { return store.dispatch(action); };
    /** @type {?} */
    var getState = function () { return (store.getState()); };
    /** @type {?} */
    var subscribe = function (fn) {
        return store.subscribe(function () { return fn(store.getState()); });
    };
    return { dispatch: dispatch, getState: getState, subscribe: subscribe };
};
var ɵ0 = wrap;
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS8iLCJzb3VyY2VzIjpbImNvbmZpZ3VyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7O0FBS3hELFdBQWEsaUJBQWlCLEdBQUcsVUFBSSxLQUFxQjs7SUFDeEQsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWxDLE1BQU0sQ0FBQztRQUNMLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxTQUFTLG1CQUFDLGFBQW9CLEVBQUMsRUFBRTtLQUN0RSxDQUFDO0NBQ0gsQ0FBQzs7QUFFRixJQUFNLElBQUksR0FBRyxVQUFJLEtBQXFCOztJQUNwQyxJQUFNLFFBQVEsR0FBRyxVQUFDLE1BQWMsSUFBSyxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQXRCLENBQXNCLENBQUM7O0lBRTVELElBQU0sUUFBUSxHQUFHLHNCQUFNLEtBQUssQ0FBQyxRQUFRLEVBQU8sSUFBQSxDQUFDOztJQUU3QyxJQUFNLFNBQVMsR0FBRyxVQUFDLEVBQXNCO1FBQ3ZDLE9BQUEsS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFwQixDQUFvQixDQUFDO0lBQTNDLENBQTJDLENBQUM7SUFFOUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxVQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsU0FBUyxXQUFBLEVBQUUsQ0FBQztDQUMxQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uLCBTdG9yZSB9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IHsgQWJzdHJhY3RTdG9yZSwgRm9ybVN0b3JlIH0gZnJvbSAnLi9mb3JtLXN0b3JlJztcblxuLy8vIFVzZSB0aGlzIGZ1bmN0aW9uIGluIHlvdXIgcHJvdmlkZXJzIGxpc3QgaWYgeW91IGFyZSBub3QgdXNpbmcgQGFuZ3VsYXItcmVkdXgvY29yZS5cbi8vLyBUaGlzIHdpbGwgYWxsb3cgeW91IHRvIHByb3ZpZGUgYSBwcmVleGlzdGluZyBzdG9yZSB0aGF0IHlvdSBoYXZlIGFscmVhZHlcbi8vLyBjb25maWd1cmVkLCByYXRoZXIgdGhhbiBsZXR0aW5nIEBhbmd1bGFyLXJlZHV4L2NvcmUgY3JlYXRlIG9uZSBmb3IgeW91LlxuZXhwb3J0IGNvbnN0IHByb3ZpZGVSZWR1eEZvcm1zID0gPFQ+KHN0b3JlOiBTdG9yZTxUPiB8IGFueSkgPT4ge1xuICBjb25zdCBhYnN0cmFjdFN0b3JlID0gd3JhcChzdG9yZSk7XG5cbiAgcmV0dXJuIFtcbiAgICB7IHByb3ZpZGU6IEZvcm1TdG9yZSwgdXNlVmFsdWU6IG5ldyBGb3JtU3RvcmUoYWJzdHJhY3RTdG9yZSBhcyBhbnkpIH0sXG4gIF07XG59O1xuXG5jb25zdCB3cmFwID0gPFQ+KHN0b3JlOiBTdG9yZTxUPiB8IGFueSk6IEFic3RyYWN0U3RvcmU8VD4gPT4ge1xuICBjb25zdCBkaXNwYXRjaCA9IChhY3Rpb246IEFjdGlvbikgPT4gc3RvcmUuZGlzcGF0Y2goYWN0aW9uKTtcblxuICBjb25zdCBnZXRTdGF0ZSA9ICgpID0+IHN0b3JlLmdldFN0YXRlKCkgYXMgVDtcblxuICBjb25zdCBzdWJzY3JpYmUgPSAoZm46IChzdGF0ZTogVCkgPT4gdm9pZCkgPT5cbiAgICBzdG9yZS5zdWJzY3JpYmUoKCkgPT4gZm4oc3RvcmUuZ2V0U3RhdGUoKSkpO1xuXG4gIHJldHVybiB7IGRpc3BhdGNoLCBnZXRTdGF0ZSwgc3Vic2NyaWJlIH07XG59O1xuIl19