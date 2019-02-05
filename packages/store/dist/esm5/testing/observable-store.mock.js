/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
/**
 * @hidden
 * @record
 */
export function SelectorStubRecord() { }
/** @type {?} */
SelectorStubRecord.prototype.subject;
/** @type {?} */
SelectorStubRecord.prototype.comparator;
/**
 * @hidden
 * @record
 */
export function SelectorStubMap() { }
/**
 * @hidden
 * @record
 */
export function SubStoreStubMap() { }
/**
 * @hidden
 * @template State
 */
var /**
 * @hidden
 * @template State
 */
MockObservableStore = /** @class */ (function () {
    function MockObservableStore() {
        var _this = this;
        this.selections = {};
        this.subStores = {};
        this.getSelectorStub = function (selector, comparator) {
            return _this.initSelectorStub(selector, comparator).subject;
        };
        this.reset = function () {
            Object.keys(_this.subStores).forEach(function (k) { return _this.subStores[k].reset(); });
            _this.selections = {};
            _this.subStores = {};
        };
        this.dispatch = function (action) { return action; };
        this.replaceReducer = function () { return null; };
        this.getState = function () { return ({}); };
        this.subscribe = function () { return function () { return null; }; };
        this.select = function (selector, comparator) {
            /** @type {?} */
            var stub = _this.initSelectorStub(selector, comparator);
            return stub.comparator
                ? stub.subject.pipe(distinctUntilChanged(stub.comparator))
                : stub.subject;
        };
        this.configureSubStore = function (basePath, _) { return _this.initSubStore(basePath); };
        this.getSubStore = function () {
            var pathSelectors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                pathSelectors[_i] = arguments[_i];
            }
            var _a = tslib_1.__read(pathSelectors), first = _a[0], rest = _a.slice(1);
            return /** @type {?} */ ((first
                ? (_b = _this.initSubStore(first)).getSubStore.apply(_b, tslib_1.__spread(rest)) : _this));
            var _b;
        };
    }
    /**
     * @template SubState
     * @param {?} basePath
     * @return {?}
     */
    MockObservableStore.prototype.initSubStore = /**
     * @template SubState
     * @param {?} basePath
     * @return {?}
     */
    function (basePath) {
        /** @type {?} */
        var result = this.subStores[JSON.stringify(basePath)] ||
            new MockObservableStore();
        this.subStores[JSON.stringify(basePath)] = result;
        return result;
    };
    /**
     * @template SelectedState
     * @param {?=} selector
     * @param {?=} comparator
     * @return {?}
     */
    MockObservableStore.prototype.initSelectorStub = /**
     * @template SelectedState
     * @param {?=} selector
     * @param {?=} comparator
     * @return {?}
     */
    function (selector, comparator) {
        /** @type {?} */
        var key = selector ? selector.toString() : '';
        /** @type {?} */
        var record = this.selections[key] || {
            subject: new ReplaySubject(),
            comparator: comparator,
        };
        this.selections[key] = record;
        return record;
    };
    return MockObservableStore;
}());
/**
 * @hidden
 * @template State
 */
export { MockObservableStore };
if (false) {
    /** @type {?} */
    MockObservableStore.prototype.selections;
    /** @type {?} */
    MockObservableStore.prototype.subStores;
    /** @type {?} */
    MockObservableStore.prototype.getSelectorStub;
    /** @type {?} */
    MockObservableStore.prototype.reset;
    /** @type {?} */
    MockObservableStore.prototype.dispatch;
    /** @type {?} */
    MockObservableStore.prototype.replaceReducer;
    /** @type {?} */
    MockObservableStore.prototype.getState;
    /** @type {?} */
    MockObservableStore.prototype.subscribe;
    /** @type {?} */
    MockObservableStore.prototype.select;
    /** @type {?} */
    MockObservableStore.prototype.configureSubStore;
    /** @type {?} */
    MockObservableStore.prototype.getSubStore;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZS1zdG9yZS5tb2NrLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvdGVzdGluZy8iLCJzb3VyY2VzIjpbIm9ic2VydmFibGUtc3RvcmUubW9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUlBLE9BQU8sRUFBYyxhQUFhLEVBQVcsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CdEQ7Ozs7QUFBQTs7OzBCQUNnQyxFQUFFO3lCQUNILEVBQUU7K0JBRWIsVUFDaEIsUUFBeUMsRUFDekMsVUFBdUI7WUFFdkIsT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQWdCLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQyxPQUFPO1FBQWxFLENBQWtFO3FCQUU1RDtZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQXpCLENBQXlCLENBQUMsQ0FBQztZQUNwRSxLQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUNyQixLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztTQUNyQjt3QkFFK0IsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLEVBQU4sQ0FBTTs4QkFDL0IsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJO3dCQUNoQixjQUFNLE9BQUEsQ0FBQyxFQUFFLENBQUMsRUFBSixDQUFJO3lCQUNULGNBQU0sT0FBQSxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksRUFBVixDQUFVO3NCQUVuQixVQUNQLFFBQXVDLEVBQ3ZDLFVBQXVCOztZQUV2QixJQUFNLElBQUksR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQWdCLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN4RSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVU7Z0JBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzFELENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ2xCO2lDQUVtQixVQUNsQixRQUFzQixFQUN0QixDQUErQixJQUNHLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBVyxRQUFRLENBQUMsRUFBckMsQ0FBcUM7MkJBRTNEO1lBQ1osdUJBQWdDO2lCQUFoQyxVQUFnQyxFQUFoQyxxQkFBZ0MsRUFBaEMsSUFBZ0M7Z0JBQWhDLGtDQUFnQzs7WUFFaEMsd0NBQU8sYUFBSyxFQUFFLGtCQUFPLENBQWtCO1lBQ3ZDLE1BQU0sbUJBQUMsQ0FBQyxLQUFLO2dCQUNYLENBQUMsQ0FBQyxDQUFBLEtBQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDLFdBQVcsNEJBQUksSUFBSSxHQUM5QyxDQUFDLENBQUMsS0FBSSxDQUFrQyxFQUFDOztTQUM1Qzs7Ozs7OztJQUVPLDBDQUFZOzs7OztjQUFXLFFBQXNCOztRQUNuRCxJQUFNLE1BQU0sR0FDVixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEMsSUFBSSxtQkFBbUIsRUFBWSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFDOzs7Ozs7OztJQUdSLDhDQUFnQjs7Ozs7O2NBQ3RCLFFBQXlDLEVBQ3pDLFVBQXVCOztRQUV2QixJQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOztRQUNoRCxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJO1lBQ3JDLE9BQU8sRUFBRSxJQUFJLGFBQWEsRUFBaUI7WUFDM0MsVUFBVSxZQUFBO1NBQ1gsQ0FBQztRQUVGLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUM7OzhCQXhGbEI7SUEwRkMsQ0FBQTs7Ozs7QUFsRUQsK0JBa0VDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVE9ETzogU2VlIGlmIHRoaXMgbGludGluZyBydWxlIGNhbiBiZSBlbmFibGVkIHdpdGggbmV3IGJ1aWxkIHByb2Nlc3MgKG5nLXBhY2thZ3IpXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1pbXBsaWNpdC1kZXBlbmRlbmNpZXNcbmltcG9ydCB7IENvbXBhcmF0b3IsIFBhdGhTZWxlY3RvciwgU2VsZWN0b3IgfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBBbnlBY3Rpb24sIERpc3BhdGNoLCBSZWR1Y2VyIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgaW50ZXJmYWNlIFNlbGVjdG9yU3R1YlJlY29yZCB7XG4gIHN1YmplY3Q6IFN1YmplY3Q8YW55PjtcbiAgY29tcGFyYXRvcjogQ29tcGFyYXRvcjtcbn1cblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0b3JTdHViTWFwIHtcbiAgW3NlbGVjdG9yOiBzdHJpbmddOiBTZWxlY3RvclN0dWJSZWNvcmQ7XG59XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgaW50ZXJmYWNlIFN1YlN0b3JlU3R1Yk1hcCB7XG4gIFtiYXNlUGF0aDogc3RyaW5nXTogTW9ja09ic2VydmFibGVTdG9yZTxhbnk+O1xufVxuXG4vKiogQGhpZGRlbiAqL1xuZXhwb3J0IGNsYXNzIE1vY2tPYnNlcnZhYmxlU3RvcmU8U3RhdGU+IHtcbiAgc2VsZWN0aW9uczogU2VsZWN0b3JTdHViTWFwID0ge307XG4gIHN1YlN0b3JlczogU3ViU3RvcmVTdHViTWFwID0ge307XG5cbiAgZ2V0U2VsZWN0b3JTdHViID0gPFNlbGVjdGVkU3RhdGU+KFxuICAgIHNlbGVjdG9yPzogU2VsZWN0b3I8U3RhdGUsIFNlbGVjdGVkU3RhdGU+LFxuICAgIGNvbXBhcmF0b3I/OiBDb21wYXJhdG9yLFxuICApOiBTdWJqZWN0PFNlbGVjdGVkU3RhdGU+ID0+XG4gICAgdGhpcy5pbml0U2VsZWN0b3JTdHViPFNlbGVjdGVkU3RhdGU+KHNlbGVjdG9yLCBjb21wYXJhdG9yKS5zdWJqZWN0O1xuXG4gIHJlc2V0ID0gKCkgPT4ge1xuICAgIE9iamVjdC5rZXlzKHRoaXMuc3ViU3RvcmVzKS5mb3JFYWNoKGsgPT4gdGhpcy5zdWJTdG9yZXNba10ucmVzZXQoKSk7XG4gICAgdGhpcy5zZWxlY3Rpb25zID0ge307XG4gICAgdGhpcy5zdWJTdG9yZXMgPSB7fTtcbiAgfTtcblxuICBkaXNwYXRjaDogRGlzcGF0Y2g8QW55QWN0aW9uPiA9IGFjdGlvbiA9PiBhY3Rpb247XG4gIHJlcGxhY2VSZWR1Y2VyID0gKCkgPT4gbnVsbDtcbiAgZ2V0U3RhdGUgPSAoKSA9PiAoe30pO1xuICBzdWJzY3JpYmUgPSAoKSA9PiAoKSA9PiBudWxsO1xuXG4gIHNlbGVjdCA9IDxTZWxlY3RlZFN0YXRlPihcbiAgICBzZWxlY3Rvcj86IFNlbGVjdG9yPGFueSwgU2VsZWN0ZWRTdGF0ZT4sXG4gICAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4gICk6IE9ic2VydmFibGU8YW55PiA9PiB7XG4gICAgY29uc3Qgc3R1YiA9IHRoaXMuaW5pdFNlbGVjdG9yU3R1YjxTZWxlY3RlZFN0YXRlPihzZWxlY3RvciwgY29tcGFyYXRvcik7XG4gICAgcmV0dXJuIHN0dWIuY29tcGFyYXRvclxuICAgICAgPyBzdHViLnN1YmplY3QucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZChzdHViLmNvbXBhcmF0b3IpKVxuICAgICAgOiBzdHViLnN1YmplY3Q7XG4gIH07XG5cbiAgY29uZmlndXJlU3ViU3RvcmUgPSA8U3ViU3RhdGU+KFxuICAgIGJhc2VQYXRoOiBQYXRoU2VsZWN0b3IsXG4gICAgXzogUmVkdWNlcjxTdWJTdGF0ZSwgQW55QWN0aW9uPixcbiAgKTogTW9ja09ic2VydmFibGVTdG9yZTxTdWJTdGF0ZT4gPT4gdGhpcy5pbml0U3ViU3RvcmU8U3ViU3RhdGU+KGJhc2VQYXRoKTtcblxuICBnZXRTdWJTdG9yZSA9IDxTdWJTdGF0ZT4oXG4gICAgLi4ucGF0aFNlbGVjdG9yczogUGF0aFNlbGVjdG9yW11cbiAgKTogTW9ja09ic2VydmFibGVTdG9yZTxhbnk+ID0+IHtcbiAgICBjb25zdCBbZmlyc3QsIC4uLnJlc3RdID0gcGF0aFNlbGVjdG9ycztcbiAgICByZXR1cm4gKGZpcnN0XG4gICAgICA/IHRoaXMuaW5pdFN1YlN0b3JlKGZpcnN0KS5nZXRTdWJTdG9yZSguLi5yZXN0KVxuICAgICAgOiB0aGlzKSBhcyBNb2NrT2JzZXJ2YWJsZVN0b3JlPFN1YlN0YXRlPjtcbiAgfTtcblxuICBwcml2YXRlIGluaXRTdWJTdG9yZTxTdWJTdGF0ZT4oYmFzZVBhdGg6IFBhdGhTZWxlY3Rvcikge1xuICAgIGNvbnN0IHJlc3VsdCA9XG4gICAgICB0aGlzLnN1YlN0b3Jlc1tKU09OLnN0cmluZ2lmeShiYXNlUGF0aCldIHx8XG4gICAgICBuZXcgTW9ja09ic2VydmFibGVTdG9yZTxTdWJTdGF0ZT4oKTtcbiAgICB0aGlzLnN1YlN0b3Jlc1tKU09OLnN0cmluZ2lmeShiYXNlUGF0aCldID0gcmVzdWx0O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIGluaXRTZWxlY3RvclN0dWI8U2VsZWN0ZWRTdGF0ZT4oXG4gICAgc2VsZWN0b3I/OiBTZWxlY3RvcjxTdGF0ZSwgU2VsZWN0ZWRTdGF0ZT4sXG4gICAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4gICk6IFNlbGVjdG9yU3R1YlJlY29yZCB7XG4gICAgY29uc3Qga2V5ID0gc2VsZWN0b3IgPyBzZWxlY3Rvci50b1N0cmluZygpIDogJyc7XG4gICAgY29uc3QgcmVjb3JkID0gdGhpcy5zZWxlY3Rpb25zW2tleV0gfHwge1xuICAgICAgc3ViamVjdDogbmV3IFJlcGxheVN1YmplY3Q8U2VsZWN0ZWRTdGF0ZT4oKSxcbiAgICAgIGNvbXBhcmF0b3IsXG4gICAgfTtcblxuICAgIHRoaXMuc2VsZWN0aW9uc1trZXldID0gcmVjb3JkO1xuICAgIHJldHVybiByZWNvcmQ7XG4gIH1cbn1cbiJdfQ==