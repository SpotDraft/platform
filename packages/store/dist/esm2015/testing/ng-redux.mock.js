/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgRedux, } from '@angular-redux/store';
import { MockObservableStore } from './observable-store.mock';
/**
 * Convenience mock to make it easier to control selector
 * behaviour in unit tests.
 * @template T
 */
export class MockNgRedux extends NgRedux {
    /**
     * @hidden
     */
    constructor() {
        super();
        this.mockRootStore = new MockObservableStore();
        this.configureSubStore = /** @type {?} */ (this.mockRootStore.configureSubStore);
        this.dispatch = /** @type {?} */ (this.mockRootStore.dispatch);
        this.getState = /** @type {?} */ (this.mockRootStore.getState);
        this.subscribe = this.mockRootStore.subscribe;
        this.replaceReducer = this.mockRootStore.replaceReducer;
        this.select = this.mockRootStore.select;
        this.provideStore = (_) => undefined;
        this.configureStore = (_, __, ___, ____) => undefined;
        // This hooks the mock up to @select.
        NgRedux.instance = /** @type {?} */ (this);
    }
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
    static getSelectorStub(selector, comparator) {
        return MockNgRedux.getInstance().mockRootStore.getSelectorStub(selector, comparator);
    }
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
    static getSubStore(...pathSelectors) {
        return pathSelectors.length
            ? MockNgRedux.getInstance().mockRootStore.getSubStore(...pathSelectors)
            : MockNgRedux.getInstance().mockRootStore;
    }
    /**
     * Reset all previously configured stubs.
     * @return {?}
     */
    static reset() {
        MockNgRedux.getInstance().mockRootStore.reset();
        NgRedux.instance = /** @type {?} */ (MockNgRedux.mockInstance);
    }
    /**
     * Gets the singleton MockNgRedux instance. Useful for cases where your
     * tests need to spy on store methods, for example.
     * @return {?}
     */
    static getInstance() {
        MockNgRedux.mockInstance = MockNgRedux.mockInstance || new MockNgRedux();
        return MockNgRedux.mockInstance;
    }
}
/**
 * @deprecated Use MockNgRedux.getInstance() instead.
 */
MockNgRedux.mockInstance = undefined;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVkdXgubW9jay5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL3Rlc3RpbmcvIiwic291cmNlcyI6WyJuZy1yZWR1eC5tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBRUwsT0FBTyxHQUdSLE1BQU0sc0JBQXNCLENBQUM7QUFVOUIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7OztBQUs5RCxNQUFNLGtCQUEyQixTQUFRLE9BQVU7Ozs7SUFvRWpEO1FBQ0UsS0FBSyxFQUFFLENBQUM7NkJBZGMsSUFBSSxtQkFBbUIsRUFBTzttREFFbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBd0I7MENBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBeUI7MENBQzVDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBZTt5QkFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTOzhCQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWM7c0JBSWxCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTTs0QkFTMUMsQ0FBQyxDQUFhLEVBQVEsRUFBRSxDQUFDLFNBQVM7OEJBQ2hDLENBQ2YsQ0FBMEIsRUFDMUIsRUFBTyxFQUNQLEdBQWtCLEVBQ2xCLElBQTJCLEVBQ3JCLEVBQUUsQ0FBQyxTQUFTOztRQVRsQixPQUFPLENBQUMsUUFBUSxxQkFBRyxJQUFXLENBQUEsQ0FBQztLQUNoQzs7Ozs7Ozs7Ozs7O0lBN0RELE1BQU0sQ0FBQyxlQUFlLENBQ3BCLFFBQXlCLEVBQ3pCLFVBQXVCO1FBRXZCLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FDNUQsUUFBUSxFQUNSLFVBQVUsQ0FDWCxDQUFDO0tBQ0g7Ozs7Ozs7Ozs7OztJQVdELE1BQU0sQ0FBQyxXQUFXLENBQ2hCLEdBQUcsYUFBNkI7UUFFaEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNO1lBQ3pCLENBQUMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLGFBQWEsQ0FBQztZQUN2RSxDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQztLQUM3Qzs7Ozs7SUFLRCxNQUFNLENBQUMsS0FBSztRQUNWLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDaEQsT0FBTyxDQUFDLFFBQVEscUJBQUcsV0FBVyxDQUFDLFlBQW1CLENBQUEsQ0FBQztLQUNwRDs7Ozs7O0lBTUQsTUFBTSxDQUFDLFdBQVc7UUFDaEIsV0FBVyxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsWUFBWSxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7UUFDekUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7S0FDakM7Ozs7OzJCQW5Ed0MsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRPRE86IFNlZSBpZiB0aGlzIGxpbnRpbmcgcnVsZSBjYW4gYmUgZW5hYmxlZCB3aXRoIG5ldyBidWlsZCBwcm9jZXNzIChuZy1wYWNrYWdyKVxuLy8gdHNsaW50OmRpc2FibGU6bm8taW1wbGljaXQtZGVwZW5kZW5jaWVzXG4vLyB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmdcbmltcG9ydCB7XG4gIENvbXBhcmF0b3IsXG4gIE5nUmVkdXgsXG4gIFBhdGhTZWxlY3RvcixcbiAgU2VsZWN0b3IsXG59IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7XG4gIEFueUFjdGlvbixcbiAgRGlzcGF0Y2gsXG4gIE1pZGRsZXdhcmUsXG4gIFJlZHVjZXIsXG4gIFN0b3JlLFxuICBTdG9yZUVuaGFuY2VyLFxufSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNb2NrT2JzZXJ2YWJsZVN0b3JlIH0gZnJvbSAnLi9vYnNlcnZhYmxlLXN0b3JlLm1vY2snO1xuLyoqXG4gKiBDb252ZW5pZW5jZSBtb2NrIHRvIG1ha2UgaXQgZWFzaWVyIHRvIGNvbnRyb2wgc2VsZWN0b3JcbiAqIGJlaGF2aW91ciBpbiB1bml0IHRlc3RzLlxuICovXG5leHBvcnQgY2xhc3MgTW9ja05nUmVkdXg8VCA9IHt9PiBleHRlbmRzIE5nUmVkdXg8VD4ge1xuICAvKiogQGRlcHJlY2F0ZWQgVXNlIE1vY2tOZ1JlZHV4LmdldEluc3RhbmNlKCkgaW5zdGVhZC4gKi9cbiAgc3RhdGljIG1vY2tJbnN0YW5jZT86IE1vY2tOZ1JlZHV4PGFueT4gPSB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdWJqZWN0IHRoYXQncyBjb25uZWN0ZWQgdG8gYW55IG9ic2VydmFibGUgcmV0dXJuZWQgYnkgdGhlXG4gICAqIGdpdmVuIHNlbGVjdG9yLiBZb3UgY2FuIHVzZSB0aGlzIHN1YmplY3QgdG8gcHVtcCB2YWx1ZXMgaW50byB5b3VyXG4gICAqIGNvbXBvbmVudHMgb3Igc2VydmljZXMgdW5kZXIgdGVzdDsgd2hlbiB0aGV5IGNhbGwgLnNlbGVjdCBvciBAc2VsZWN0XG4gICAqIGluIHRoZSBjb250ZXh0IG9mIGEgdW5pdCB0ZXN0LCBNb2NrTmdSZWR1eCB3aWxsIGdpdmUgdGhlbSB0aGUgdmFsdWVzXG4gICAqIHlvdSBwdXNoZWQgb250byB5b3VyIHN0dWIuXG4gICAqL1xuICBzdGF0aWMgZ2V0U2VsZWN0b3JTdHViPFIsIFM+KFxuICAgIHNlbGVjdG9yPzogU2VsZWN0b3I8UiwgUz4sXG4gICAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4gICk6IFN1YmplY3Q8Uz4ge1xuICAgIHJldHVybiBNb2NrTmdSZWR1eC5nZXRJbnN0YW5jZSgpLm1vY2tSb290U3RvcmUuZ2V0U2VsZWN0b3JTdHViPFM+KFxuICAgICAgc2VsZWN0b3IsXG4gICAgICBjb21wYXJhdG9yLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG1vY2sgc3Vic3RvcmUgdGhhdCBhbGxvd3MgeW91IHRvIHNldCB1cCBzZWxlY3RvclN0dWJzIGZvclxuICAgKiBhbnkgJ2ZyYWN0YWwnIHN0b3JlcyB5b3VyIGFwcCBjcmVhdGVzIHdpdGggTmdSZWR1eC5jb25maWd1cmVTdWJTdG9yZS5cbiAgICpcbiAgICogSWYgeW91ciBhcHAgY3JlYXRlcyBkZWVwbHkgbmVzdGVkIHN1YnN0b3JlcyBmcm9tIG90aGVyIHN1YnN0b3JlcyxcbiAgICogcGFzcyB0aGUgY2hhaW4gb2YgcGF0aFNlbGVjdG9ycyBpbiBhcyBvcmRlcmVkIGFyZ3VtZW50cyB0byBtb2NrXG4gICAqIHRoZSBuZXN0ZWQgc3Vic3RvcmVzIG91dC5cbiAgICogQHBhcmFtIHBhdGhTZWxlY3RvcnNcbiAgICovXG4gIHN0YXRpYyBnZXRTdWJTdG9yZTxTPihcbiAgICAuLi5wYXRoU2VsZWN0b3JzOiBQYXRoU2VsZWN0b3JbXVxuICApOiBNb2NrT2JzZXJ2YWJsZVN0b3JlPFM+IHtcbiAgICByZXR1cm4gcGF0aFNlbGVjdG9ycy5sZW5ndGhcbiAgICAgID8gTW9ja05nUmVkdXguZ2V0SW5zdGFuY2UoKS5tb2NrUm9vdFN0b3JlLmdldFN1YlN0b3JlKC4uLnBhdGhTZWxlY3RvcnMpXG4gICAgICA6IE1vY2tOZ1JlZHV4LmdldEluc3RhbmNlKCkubW9ja1Jvb3RTdG9yZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBhbGwgcHJldmlvdXNseSBjb25maWd1cmVkIHN0dWJzLlxuICAgKi9cbiAgc3RhdGljIHJlc2V0KCk6IHZvaWQge1xuICAgIE1vY2tOZ1JlZHV4LmdldEluc3RhbmNlKCkubW9ja1Jvb3RTdG9yZS5yZXNldCgpO1xuICAgIE5nUmVkdXguaW5zdGFuY2UgPSBNb2NrTmdSZWR1eC5tb2NrSW5zdGFuY2UgYXMgYW55O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHNpbmdsZXRvbiBNb2NrTmdSZWR1eCBpbnN0YW5jZS4gVXNlZnVsIGZvciBjYXNlcyB3aGVyZSB5b3VyXG4gICAqIHRlc3RzIG5lZWQgdG8gc3B5IG9uIHN0b3JlIG1ldGhvZHMsIGZvciBleGFtcGxlLlxuICAgKi9cbiAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgIE1vY2tOZ1JlZHV4Lm1vY2tJbnN0YW5jZSA9IE1vY2tOZ1JlZHV4Lm1vY2tJbnN0YW5jZSB8fCBuZXcgTW9ja05nUmVkdXgoKTtcbiAgICByZXR1cm4gTW9ja05nUmVkdXgubW9ja0luc3RhbmNlO1xuICB9XG4gIC8vXG4gIHByaXZhdGUgbW9ja1Jvb3RTdG9yZSA9IG5ldyBNb2NrT2JzZXJ2YWJsZVN0b3JlPGFueT4oKTtcblxuICBjb25maWd1cmVTdWJTdG9yZSA9IHRoaXMubW9ja1Jvb3RTdG9yZS5jb25maWd1cmVTdWJTdG9yZSBhcyBhbnk7XG4gIGRpc3BhdGNoID0gdGhpcy5tb2NrUm9vdFN0b3JlLmRpc3BhdGNoIGFzIERpc3BhdGNoPGFueT47XG4gIGdldFN0YXRlID0gdGhpcy5tb2NrUm9vdFN0b3JlLmdldFN0YXRlIGFzIGFueTtcbiAgc3Vic2NyaWJlID0gdGhpcy5tb2NrUm9vdFN0b3JlLnN1YnNjcmliZTtcbiAgcmVwbGFjZVJlZHVjZXIgPSB0aGlzLm1vY2tSb290U3RvcmUucmVwbGFjZVJlZHVjZXI7XG4gIHNlbGVjdDogPFNlbGVjdGVkVHlwZT4oXG4gICAgc2VsZWN0b3I/OiBTZWxlY3RvcjxULCBTZWxlY3RlZFR5cGU+LFxuICAgIGNvbXBhcmF0b3I/OiBDb21wYXJhdG9yLFxuICApID0+IE9ic2VydmFibGU8U2VsZWN0ZWRUeXBlPiA9IHRoaXMubW9ja1Jvb3RTdG9yZS5zZWxlY3Q7XG5cbiAgLyoqIEBoaWRkZW4gKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICAvLyBUaGlzIGhvb2tzIHRoZSBtb2NrIHVwIHRvIEBzZWxlY3QuXG4gICAgTmdSZWR1eC5pbnN0YW5jZSA9IHRoaXMgYXMgYW55O1xuICB9XG5cbiAgcHJvdmlkZVN0b3JlID0gKF86IFN0b3JlPGFueT4pOiB2b2lkID0+IHVuZGVmaW5lZDtcbiAgY29uZmlndXJlU3RvcmUgPSAoXG4gICAgXzogUmVkdWNlcjxhbnksIEFueUFjdGlvbj4sXG4gICAgX186IGFueSxcbiAgICBfX18/OiBNaWRkbGV3YXJlW10sXG4gICAgX19fXz86IFN0b3JlRW5oYW5jZXI8YW55PltdLFxuICApOiB2b2lkID0+IHVuZGVmaW5lZDtcbn1cbiJdfQ==