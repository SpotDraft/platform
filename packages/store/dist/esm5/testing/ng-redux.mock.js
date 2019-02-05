/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux, } from '@angular-redux/store';
import { MockObservableStore } from './observable-store.mock';
/**
 * Convenience mock to make it easier to control selector
 * behaviour in unit tests.
 * @template T
 */
var MockNgRedux = /** @class */ (function (_super) {
    tslib_1.__extends(MockNgRedux, _super);
    /** @hidden */
    function MockNgRedux() {
        var _this = _super.call(this) || this;
        _this.mockRootStore = new MockObservableStore();
        _this.configureSubStore = /** @type {?} */ (_this.mockRootStore.configureSubStore);
        _this.dispatch = /** @type {?} */ (_this.mockRootStore.dispatch);
        _this.getState = /** @type {?} */ (_this.mockRootStore.getState);
        _this.subscribe = _this.mockRootStore.subscribe;
        _this.replaceReducer = _this.mockRootStore.replaceReducer;
        _this.select = _this.mockRootStore.select;
        _this.provideStore = function (_) { return undefined; };
        _this.configureStore = function (_, __, ___, ____) { return undefined; };
        // This hooks the mock up to @select.
        NgRedux.instance = /** @type {?} */ (_this);
        return _this;
    }
    /**
     * Returns a subject that's connected to any observable returned by the
     * given selector. You can use this subject to pump values into your
     * components or services under test; when they call .select or @select
     * in the context of a unit test, MockNgRedux will give them the values
     * you pushed onto your stub.
     */
    /**
     * Returns a subject that's connected to any observable returned by the
     * given selector. You can use this subject to pump values into your
     * components or services under test; when they call .select or \@select
     * in the context of a unit test, MockNgRedux will give them the values
     * you pushed onto your stub.
     * @template R, S
     * @param {?=} selector
     * @param {?=} comparator
     * @return {?}
     */
    MockNgRedux.getSelectorStub = /**
     * Returns a subject that's connected to any observable returned by the
     * given selector. You can use this subject to pump values into your
     * components or services under test; when they call .select or \@select
     * in the context of a unit test, MockNgRedux will give them the values
     * you pushed onto your stub.
     * @template R, S
     * @param {?=} selector
     * @param {?=} comparator
     * @return {?}
     */
    function (selector, comparator) {
        return MockNgRedux.getInstance().mockRootStore.getSelectorStub(selector, comparator);
    };
    /**
     * Returns a mock substore that allows you to set up selectorStubs for
     * any 'fractal' stores your app creates with NgRedux.configureSubStore.
     *
     * If your app creates deeply nested substores from other substores,
     * pass the chain of pathSelectors in as ordered arguments to mock
     * the nested substores out.
     * @param pathSelectors
     */
    /**
     * Returns a mock substore that allows you to set up selectorStubs for
     * any 'fractal' stores your app creates with NgRedux.configureSubStore.
     *
     * If your app creates deeply nested substores from other substores,
     * pass the chain of pathSelectors in as ordered arguments to mock
     * the nested substores out.
     * @template S
     * @param {...?} pathSelectors
     * @return {?}
     */
    MockNgRedux.getSubStore = /**
     * Returns a mock substore that allows you to set up selectorStubs for
     * any 'fractal' stores your app creates with NgRedux.configureSubStore.
     *
     * If your app creates deeply nested substores from other substores,
     * pass the chain of pathSelectors in as ordered arguments to mock
     * the nested substores out.
     * @template S
     * @param {...?} pathSelectors
     * @return {?}
     */
    function () {
        var pathSelectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pathSelectors[_i] = arguments[_i];
        }
        return pathSelectors.length
            ? (_a = MockNgRedux.getInstance().mockRootStore).getSubStore.apply(_a, tslib_1.__spread(pathSelectors)) : MockNgRedux.getInstance().mockRootStore;
        var _a;
    };
    /**
     * Reset all previously configured stubs.
     */
    /**
     * Reset all previously configured stubs.
     * @return {?}
     */
    MockNgRedux.reset = /**
     * Reset all previously configured stubs.
     * @return {?}
     */
    function () {
        MockNgRedux.getInstance().mockRootStore.reset();
        NgRedux.instance = /** @type {?} */ (MockNgRedux.mockInstance);
    };
    /**
     * Gets the singleton MockNgRedux instance. Useful for cases where your
     * tests need to spy on store methods, for example.
     */
    /**
     * Gets the singleton MockNgRedux instance. Useful for cases where your
     * tests need to spy on store methods, for example.
     * @return {?}
     */
    MockNgRedux.getInstance = /**
     * Gets the singleton MockNgRedux instance. Useful for cases where your
     * tests need to spy on store methods, for example.
     * @return {?}
     */
    function () {
        MockNgRedux.mockInstance = MockNgRedux.mockInstance || new MockNgRedux();
        return MockNgRedux.mockInstance;
    };
    /**
     * @deprecated Use MockNgRedux.getInstance() instead.
     */
    MockNgRedux.mockInstance = undefined;
    return MockNgRedux;
}(NgRedux));
export { MockNgRedux };
if (false) {
    /**
     * @deprecated Use MockNgRedux.getInstance() instead.
     * @type {?}
     */
    MockNgRedux.mockInstance;
    /** @type {?} */
    MockNgRedux.prototype.mockRootStore;
    /** @type {?} */
    MockNgRedux.prototype.configureSubStore;
    /** @type {?} */
    MockNgRedux.prototype.dispatch;
    /** @type {?} */
    MockNgRedux.prototype.getState;
    /** @type {?} */
    MockNgRedux.prototype.subscribe;
    /** @type {?} */
    MockNgRedux.prototype.replaceReducer;
    /** @type {?} */
    MockNgRedux.prototype.select;
    /** @type {?} */
    MockNgRedux.prototype.provideStore;
    /** @type {?} */
    MockNgRedux.prototype.configureStore;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVkdXgubW9jay5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL3Rlc3RpbmcvIiwic291cmNlcyI6WyJuZy1yZWR1eC5tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsT0FBTyxFQUVMLE9BQU8sR0FHUixNQUFNLHNCQUFzQixDQUFDO0FBVTlCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7O0lBS3JCLHVDQUFVO0lBbUVqRCxjQUFjO0lBQ2Q7UUFBQSxZQUNFLGlCQUFPLFNBR1I7OEJBakJ1QixJQUFJLG1CQUFtQixFQUFPO29EQUVsQyxLQUFJLENBQUMsYUFBYSxDQUFDLGlCQUF3QjsyQ0FDcEQsS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUF5QjsyQ0FDNUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUFlOzBCQUNqQyxLQUFJLENBQUMsYUFBYSxDQUFDLFNBQVM7K0JBQ3ZCLEtBQUksQ0FBQyxhQUFhLENBQUMsY0FBYzt1QkFJbEIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNOzZCQVMxQyxVQUFDLENBQWEsSUFBVyxPQUFBLFNBQVMsRUFBVCxDQUFTOytCQUNoQyxVQUNmLENBQTBCLEVBQzFCLEVBQU8sRUFDUCxHQUFrQixFQUNsQixJQUEyQixJQUNsQixPQUFBLFNBQVMsRUFBVCxDQUFTOztRQVRsQixPQUFPLENBQUMsUUFBUSxxQkFBRyxLQUFXLENBQUEsQ0FBQzs7S0FDaEM7SUFwRUQ7Ozs7OztPQU1HOzs7Ozs7Ozs7Ozs7SUFDSSwyQkFBZTs7Ozs7Ozs7Ozs7SUFBdEIsVUFDRSxRQUF5QixFQUN6QixVQUF1QjtRQUV2QixNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQzVELFFBQVEsRUFDUixVQUFVLENBQ1gsQ0FBQztLQUNIO0lBRUQ7Ozs7Ozs7O09BUUc7Ozs7Ozs7Ozs7OztJQUNJLHVCQUFXOzs7Ozs7Ozs7OztJQUFsQjtRQUNFLHVCQUFnQzthQUFoQyxVQUFnQyxFQUFoQyxxQkFBZ0MsRUFBaEMsSUFBZ0M7WUFBaEMsa0NBQWdDOztRQUVoQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU07WUFDekIsQ0FBQyxDQUFDLENBQUEsS0FBQSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFBLENBQUMsV0FBVyw0QkFBSSxhQUFhLEdBQ3RFLENBQUMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDOztLQUM3QztJQUVEOztPQUVHOzs7OztJQUNJLGlCQUFLOzs7O0lBQVo7UUFDRSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxRQUFRLHFCQUFHLFdBQVcsQ0FBQyxZQUFtQixDQUFBLENBQUM7S0FDcEQ7SUFFRDs7O09BR0c7Ozs7OztJQUNJLHVCQUFXOzs7OztJQUFsQjtRQUNFLFdBQVcsQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLFlBQVksSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ3pFLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO0tBQ2pDOzs7OytCQW5Ed0MsU0FBUztzQkF6QnBEO0VBdUJ5QyxPQUFPO1NBQW5DLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUT0RPOiBTZWUgaWYgdGhpcyBsaW50aW5nIHJ1bGUgY2FuIGJlIGVuYWJsZWQgd2l0aCBuZXcgYnVpbGQgcHJvY2VzcyAobmctcGFja2Fncilcbi8vIHRzbGludDpkaXNhYmxlOm5vLWltcGxpY2l0LWRlcGVuZGVuY2llc1xuLy8gdHNsaW50OmRpc2FibGU6bWVtYmVyLW9yZGVyaW5nXG5pbXBvcnQge1xuICBDb21wYXJhdG9yLFxuICBOZ1JlZHV4LFxuICBQYXRoU2VsZWN0b3IsXG4gIFNlbGVjdG9yLFxufSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQge1xuICBBbnlBY3Rpb24sXG4gIERpc3BhdGNoLFxuICBNaWRkbGV3YXJlLFxuICBSZWR1Y2VyLFxuICBTdG9yZSxcbiAgU3RvcmVFbmhhbmNlcixcbn0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTW9ja09ic2VydmFibGVTdG9yZSB9IGZyb20gJy4vb2JzZXJ2YWJsZS1zdG9yZS5tb2NrJztcbi8qKlxuICogQ29udmVuaWVuY2UgbW9jayB0byBtYWtlIGl0IGVhc2llciB0byBjb250cm9sIHNlbGVjdG9yXG4gKiBiZWhhdmlvdXIgaW4gdW5pdCB0ZXN0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIE1vY2tOZ1JlZHV4PFQgPSB7fT4gZXh0ZW5kcyBOZ1JlZHV4PFQ+IHtcbiAgLyoqIEBkZXByZWNhdGVkIFVzZSBNb2NrTmdSZWR1eC5nZXRJbnN0YW5jZSgpIGluc3RlYWQuICovXG4gIHN0YXRpYyBtb2NrSW5zdGFuY2U/OiBNb2NrTmdSZWR1eDxhbnk+ID0gdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3ViamVjdCB0aGF0J3MgY29ubmVjdGVkIHRvIGFueSBvYnNlcnZhYmxlIHJldHVybmVkIGJ5IHRoZVxuICAgKiBnaXZlbiBzZWxlY3Rvci4gWW91IGNhbiB1c2UgdGhpcyBzdWJqZWN0IHRvIHB1bXAgdmFsdWVzIGludG8geW91clxuICAgKiBjb21wb25lbnRzIG9yIHNlcnZpY2VzIHVuZGVyIHRlc3Q7IHdoZW4gdGhleSBjYWxsIC5zZWxlY3Qgb3IgQHNlbGVjdFxuICAgKiBpbiB0aGUgY29udGV4dCBvZiBhIHVuaXQgdGVzdCwgTW9ja05nUmVkdXggd2lsbCBnaXZlIHRoZW0gdGhlIHZhbHVlc1xuICAgKiB5b3UgcHVzaGVkIG9udG8geW91ciBzdHViLlxuICAgKi9cbiAgc3RhdGljIGdldFNlbGVjdG9yU3R1YjxSLCBTPihcbiAgICBzZWxlY3Rvcj86IFNlbGVjdG9yPFIsIFM+LFxuICAgIGNvbXBhcmF0b3I/OiBDb21wYXJhdG9yLFxuICApOiBTdWJqZWN0PFM+IHtcbiAgICByZXR1cm4gTW9ja05nUmVkdXguZ2V0SW5zdGFuY2UoKS5tb2NrUm9vdFN0b3JlLmdldFNlbGVjdG9yU3R1YjxTPihcbiAgICAgIHNlbGVjdG9yLFxuICAgICAgY29tcGFyYXRvcixcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBtb2NrIHN1YnN0b3JlIHRoYXQgYWxsb3dzIHlvdSB0byBzZXQgdXAgc2VsZWN0b3JTdHVicyBmb3JcbiAgICogYW55ICdmcmFjdGFsJyBzdG9yZXMgeW91ciBhcHAgY3JlYXRlcyB3aXRoIE5nUmVkdXguY29uZmlndXJlU3ViU3RvcmUuXG4gICAqXG4gICAqIElmIHlvdXIgYXBwIGNyZWF0ZXMgZGVlcGx5IG5lc3RlZCBzdWJzdG9yZXMgZnJvbSBvdGhlciBzdWJzdG9yZXMsXG4gICAqIHBhc3MgdGhlIGNoYWluIG9mIHBhdGhTZWxlY3RvcnMgaW4gYXMgb3JkZXJlZCBhcmd1bWVudHMgdG8gbW9ja1xuICAgKiB0aGUgbmVzdGVkIHN1YnN0b3JlcyBvdXQuXG4gICAqIEBwYXJhbSBwYXRoU2VsZWN0b3JzXG4gICAqL1xuICBzdGF0aWMgZ2V0U3ViU3RvcmU8Uz4oXG4gICAgLi4ucGF0aFNlbGVjdG9yczogUGF0aFNlbGVjdG9yW11cbiAgKTogTW9ja09ic2VydmFibGVTdG9yZTxTPiB7XG4gICAgcmV0dXJuIHBhdGhTZWxlY3RvcnMubGVuZ3RoXG4gICAgICA/IE1vY2tOZ1JlZHV4LmdldEluc3RhbmNlKCkubW9ja1Jvb3RTdG9yZS5nZXRTdWJTdG9yZSguLi5wYXRoU2VsZWN0b3JzKVxuICAgICAgOiBNb2NrTmdSZWR1eC5nZXRJbnN0YW5jZSgpLm1vY2tSb290U3RvcmU7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgYWxsIHByZXZpb3VzbHkgY29uZmlndXJlZCBzdHVicy5cbiAgICovXG4gIHN0YXRpYyByZXNldCgpOiB2b2lkIHtcbiAgICBNb2NrTmdSZWR1eC5nZXRJbnN0YW5jZSgpLm1vY2tSb290U3RvcmUucmVzZXQoKTtcbiAgICBOZ1JlZHV4Lmluc3RhbmNlID0gTW9ja05nUmVkdXgubW9ja0luc3RhbmNlIGFzIGFueTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBzaW5nbGV0b24gTW9ja05nUmVkdXggaW5zdGFuY2UuIFVzZWZ1bCBmb3IgY2FzZXMgd2hlcmUgeW91clxuICAgKiB0ZXN0cyBuZWVkIHRvIHNweSBvbiBzdG9yZSBtZXRob2RzLCBmb3IgZXhhbXBsZS5cbiAgICovXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICBNb2NrTmdSZWR1eC5tb2NrSW5zdGFuY2UgPSBNb2NrTmdSZWR1eC5tb2NrSW5zdGFuY2UgfHwgbmV3IE1vY2tOZ1JlZHV4KCk7XG4gICAgcmV0dXJuIE1vY2tOZ1JlZHV4Lm1vY2tJbnN0YW5jZTtcbiAgfVxuICAvL1xuICBwcml2YXRlIG1vY2tSb290U3RvcmUgPSBuZXcgTW9ja09ic2VydmFibGVTdG9yZTxhbnk+KCk7XG5cbiAgY29uZmlndXJlU3ViU3RvcmUgPSB0aGlzLm1vY2tSb290U3RvcmUuY29uZmlndXJlU3ViU3RvcmUgYXMgYW55O1xuICBkaXNwYXRjaCA9IHRoaXMubW9ja1Jvb3RTdG9yZS5kaXNwYXRjaCBhcyBEaXNwYXRjaDxhbnk+O1xuICBnZXRTdGF0ZSA9IHRoaXMubW9ja1Jvb3RTdG9yZS5nZXRTdGF0ZSBhcyBhbnk7XG4gIHN1YnNjcmliZSA9IHRoaXMubW9ja1Jvb3RTdG9yZS5zdWJzY3JpYmU7XG4gIHJlcGxhY2VSZWR1Y2VyID0gdGhpcy5tb2NrUm9vdFN0b3JlLnJlcGxhY2VSZWR1Y2VyO1xuICBzZWxlY3Q6IDxTZWxlY3RlZFR5cGU+KFxuICAgIHNlbGVjdG9yPzogU2VsZWN0b3I8VCwgU2VsZWN0ZWRUeXBlPixcbiAgICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbiAgKSA9PiBPYnNlcnZhYmxlPFNlbGVjdGVkVHlwZT4gPSB0aGlzLm1vY2tSb290U3RvcmUuc2VsZWN0O1xuXG4gIC8qKiBAaGlkZGVuICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgLy8gVGhpcyBob29rcyB0aGUgbW9jayB1cCB0byBAc2VsZWN0LlxuICAgIE5nUmVkdXguaW5zdGFuY2UgPSB0aGlzIGFzIGFueTtcbiAgfVxuXG4gIHByb3ZpZGVTdG9yZSA9IChfOiBTdG9yZTxhbnk+KTogdm9pZCA9PiB1bmRlZmluZWQ7XG4gIGNvbmZpZ3VyZVN0b3JlID0gKFxuICAgIF86IFJlZHVjZXI8YW55LCBBbnlBY3Rpb24+LFxuICAgIF9fOiBhbnksXG4gICAgX19fPzogTWlkZGxld2FyZVtdLFxuICAgIF9fX18/OiBTdG9yZUVuaGFuY2VyPGFueT5bXSxcbiAgKTogdm9pZCA9PiB1bmRlZmluZWQ7XG59XG4iXX0=