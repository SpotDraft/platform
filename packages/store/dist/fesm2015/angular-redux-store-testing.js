import { DevToolsExtension, NgRedux } from '@angular-redux/store';
import { Injectable, NgModule } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MockDevToolsExtension extends DevToolsExtension {
}
MockDevToolsExtension.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @hidden
 * @template State
 */
class MockObservableStore {
    constructor() {
        this.selections = {};
        this.subStores = {};
        this.getSelectorStub = (selector, comparator) => this.initSelectorStub(selector, comparator).subject;
        this.reset = () => {
            Object.keys(this.subStores).forEach(k => this.subStores[k].reset());
            this.selections = {};
            this.subStores = {};
        };
        this.dispatch = action => action;
        this.replaceReducer = () => null;
        this.getState = () => ({});
        this.subscribe = () => () => null;
        this.select = (selector, comparator) => {
            /** @type {?} */
            const stub = this.initSelectorStub(selector, comparator);
            return stub.comparator
                ? stub.subject.pipe(distinctUntilChanged(stub.comparator))
                : stub.subject;
        };
        this.configureSubStore = (basePath, _) => this.initSubStore(basePath);
        this.getSubStore = (...pathSelectors) => {
            const [first, ...rest] = pathSelectors;
            return /** @type {?} */ ((first
                ? this.initSubStore(first).getSubStore(...rest)
                : this));
        };
    }
    /**
     * @template SubState
     * @param {?} basePath
     * @return {?}
     */
    initSubStore(basePath) {
        /** @type {?} */
        const result = this.subStores[JSON.stringify(basePath)] ||
            new MockObservableStore();
        this.subStores[JSON.stringify(basePath)] = result;
        return result;
    }
    /**
     * @template SelectedState
     * @param {?=} selector
     * @param {?=} comparator
     * @return {?}
     */
    initSelectorStub(selector, comparator) {
        /** @type {?} */
        const key = selector ? selector.toString() : '';
        /** @type {?} */
        const record = this.selections[key] || {
            subject: new ReplaySubject(),
            comparator,
        };
        this.selections[key] = record;
        return record;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Convenience mock to make it easier to control selector
 * behaviour in unit tests.
 * @template T
 */
class MockNgRedux extends NgRedux {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const mockNgRedux = MockNgRedux.getInstance();
/**
 * @hidden
 * @return {?}
 */
function _mockNgReduxFactory() {
    return mockNgRedux;
}
class NgReduxTestingModule {
}
NgReduxTestingModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                providers: [
                    { provide: NgRedux, useFactory: _mockNgReduxFactory },
                    { provide: DevToolsExtension, useClass: MockDevToolsExtension },
                ],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgReduxTestingModule, MockDevToolsExtension, MockNgRedux, MockObservableStore, _mockNgReduxFactory as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1yZWR1eC1zdG9yZS10ZXN0aW5nLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS90ZXN0aW5nL2Rldi10b29scy5tb2NrLnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS90ZXN0aW5nL29ic2VydmFibGUtc3RvcmUubW9jay50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvdGVzdGluZy9uZy1yZWR1eC5tb2NrLnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS90ZXN0aW5nL25nLXJlZHV4LXRlc3RpbmcubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRPRE86IFNlZSBpZiB0aGlzIGxpbnRpbmcgcnVsZSBjYW4gYmUgZW5hYmxlZCB3aXRoIG5ldyBidWlsZCBwcm9jZXNzIChuZy1wYWNrYWdyKVxuLy8gdHNsaW50OmRpc2FibGU6bm8taW1wbGljaXQtZGVwZW5kZW5jaWVzXG5pbXBvcnQgeyBEZXZUb29sc0V4dGVuc2lvbiB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vY2tEZXZUb29sc0V4dGVuc2lvbiBleHRlbmRzIERldlRvb2xzRXh0ZW5zaW9uIHt9XG4iLCIvLyBUT0RPOiBTZWUgaWYgdGhpcyBsaW50aW5nIHJ1bGUgY2FuIGJlIGVuYWJsZWQgd2l0aCBuZXcgYnVpbGQgcHJvY2VzcyAobmctcGFja2Fncilcbi8vIHRzbGludDpkaXNhYmxlOm5vLWltcGxpY2l0LWRlcGVuZGVuY2llc1xuaW1wb3J0IHsgQ29tcGFyYXRvciwgUGF0aFNlbGVjdG9yLCBTZWxlY3RvciB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEFueUFjdGlvbiwgRGlzcGF0Y2gsIFJlZHVjZXIgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0b3JTdHViUmVjb3JkIHtcbiAgc3ViamVjdDogU3ViamVjdDxhbnk+O1xuICBjb21wYXJhdG9yOiBDb21wYXJhdG9yO1xufVxuXG4vKiogQGhpZGRlbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZWxlY3RvclN0dWJNYXAge1xuICBbc2VsZWN0b3I6IHN0cmluZ106IFNlbGVjdG9yU3R1YlJlY29yZDtcbn1cblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3ViU3RvcmVTdHViTWFwIHtcbiAgW2Jhc2VQYXRoOiBzdHJpbmddOiBNb2NrT2JzZXJ2YWJsZVN0b3JlPGFueT47XG59XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgY2xhc3MgTW9ja09ic2VydmFibGVTdG9yZTxTdGF0ZT4ge1xuICBzZWxlY3Rpb25zOiBTZWxlY3RvclN0dWJNYXAgPSB7fTtcbiAgc3ViU3RvcmVzOiBTdWJTdG9yZVN0dWJNYXAgPSB7fTtcblxuICBnZXRTZWxlY3RvclN0dWIgPSA8U2VsZWN0ZWRTdGF0ZT4oXG4gICAgc2VsZWN0b3I/OiBTZWxlY3RvcjxTdGF0ZSwgU2VsZWN0ZWRTdGF0ZT4sXG4gICAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4gICk6IFN1YmplY3Q8U2VsZWN0ZWRTdGF0ZT4gPT5cbiAgICB0aGlzLmluaXRTZWxlY3RvclN0dWI8U2VsZWN0ZWRTdGF0ZT4oc2VsZWN0b3IsIGNvbXBhcmF0b3IpLnN1YmplY3Q7XG5cbiAgcmVzZXQgPSAoKSA9PiB7XG4gICAgT2JqZWN0LmtleXModGhpcy5zdWJTdG9yZXMpLmZvckVhY2goayA9PiB0aGlzLnN1YlN0b3Jlc1trXS5yZXNldCgpKTtcbiAgICB0aGlzLnNlbGVjdGlvbnMgPSB7fTtcbiAgICB0aGlzLnN1YlN0b3JlcyA9IHt9O1xuICB9O1xuXG4gIGRpc3BhdGNoOiBEaXNwYXRjaDxBbnlBY3Rpb24+ID0gYWN0aW9uID0+IGFjdGlvbjtcbiAgcmVwbGFjZVJlZHVjZXIgPSAoKSA9PiBudWxsO1xuICBnZXRTdGF0ZSA9ICgpID0+ICh7fSk7XG4gIHN1YnNjcmliZSA9ICgpID0+ICgpID0+IG51bGw7XG5cbiAgc2VsZWN0ID0gPFNlbGVjdGVkU3RhdGU+KFxuICAgIHNlbGVjdG9yPzogU2VsZWN0b3I8YW55LCBTZWxlY3RlZFN0YXRlPixcbiAgICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbiAgKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcbiAgICBjb25zdCBzdHViID0gdGhpcy5pbml0U2VsZWN0b3JTdHViPFNlbGVjdGVkU3RhdGU+KHNlbGVjdG9yLCBjb21wYXJhdG9yKTtcbiAgICByZXR1cm4gc3R1Yi5jb21wYXJhdG9yXG4gICAgICA/IHN0dWIuc3ViamVjdC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKHN0dWIuY29tcGFyYXRvcikpXG4gICAgICA6IHN0dWIuc3ViamVjdDtcbiAgfTtcblxuICBjb25maWd1cmVTdWJTdG9yZSA9IDxTdWJTdGF0ZT4oXG4gICAgYmFzZVBhdGg6IFBhdGhTZWxlY3RvcixcbiAgICBfOiBSZWR1Y2VyPFN1YlN0YXRlLCBBbnlBY3Rpb24+LFxuICApOiBNb2NrT2JzZXJ2YWJsZVN0b3JlPFN1YlN0YXRlPiA9PiB0aGlzLmluaXRTdWJTdG9yZTxTdWJTdGF0ZT4oYmFzZVBhdGgpO1xuXG4gIGdldFN1YlN0b3JlID0gPFN1YlN0YXRlPihcbiAgICAuLi5wYXRoU2VsZWN0b3JzOiBQYXRoU2VsZWN0b3JbXVxuICApOiBNb2NrT2JzZXJ2YWJsZVN0b3JlPGFueT4gPT4ge1xuICAgIGNvbnN0IFtmaXJzdCwgLi4ucmVzdF0gPSBwYXRoU2VsZWN0b3JzO1xuICAgIHJldHVybiAoZmlyc3RcbiAgICAgID8gdGhpcy5pbml0U3ViU3RvcmUoZmlyc3QpLmdldFN1YlN0b3JlKC4uLnJlc3QpXG4gICAgICA6IHRoaXMpIGFzIE1vY2tPYnNlcnZhYmxlU3RvcmU8U3ViU3RhdGU+O1xuICB9O1xuXG4gIHByaXZhdGUgaW5pdFN1YlN0b3JlPFN1YlN0YXRlPihiYXNlUGF0aDogUGF0aFNlbGVjdG9yKSB7XG4gICAgY29uc3QgcmVzdWx0ID1cbiAgICAgIHRoaXMuc3ViU3RvcmVzW0pTT04uc3RyaW5naWZ5KGJhc2VQYXRoKV0gfHxcbiAgICAgIG5ldyBNb2NrT2JzZXJ2YWJsZVN0b3JlPFN1YlN0YXRlPigpO1xuICAgIHRoaXMuc3ViU3RvcmVzW0pTT04uc3RyaW5naWZ5KGJhc2VQYXRoKV0gPSByZXN1bHQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFNlbGVjdG9yU3R1YjxTZWxlY3RlZFN0YXRlPihcbiAgICBzZWxlY3Rvcj86IFNlbGVjdG9yPFN0YXRlLCBTZWxlY3RlZFN0YXRlPixcbiAgICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbiAgKTogU2VsZWN0b3JTdHViUmVjb3JkIHtcbiAgICBjb25zdCBrZXkgPSBzZWxlY3RvciA/IHNlbGVjdG9yLnRvU3RyaW5nKCkgOiAnJztcbiAgICBjb25zdCByZWNvcmQgPSB0aGlzLnNlbGVjdGlvbnNba2V5XSB8fCB7XG4gICAgICBzdWJqZWN0OiBuZXcgUmVwbGF5U3ViamVjdDxTZWxlY3RlZFN0YXRlPigpLFxuICAgICAgY29tcGFyYXRvcixcbiAgICB9O1xuXG4gICAgdGhpcy5zZWxlY3Rpb25zW2tleV0gPSByZWNvcmQ7XG4gICAgcmV0dXJuIHJlY29yZDtcbiAgfVxufVxuIiwiLy8gVE9ETzogU2VlIGlmIHRoaXMgbGludGluZyBydWxlIGNhbiBiZSBlbmFibGVkIHdpdGggbmV3IGJ1aWxkIHByb2Nlc3MgKG5nLXBhY2thZ3IpXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1pbXBsaWNpdC1kZXBlbmRlbmNpZXNcbi8vIHRzbGludDpkaXNhYmxlOm1lbWJlci1vcmRlcmluZ1xuaW1wb3J0IHtcbiAgQ29tcGFyYXRvcixcbiAgTmdSZWR1eCxcbiAgUGF0aFNlbGVjdG9yLFxuICBTZWxlY3Rvcixcbn0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHtcbiAgQW55QWN0aW9uLFxuICBEaXNwYXRjaCxcbiAgTWlkZGxld2FyZSxcbiAgUmVkdWNlcixcbiAgU3RvcmUsXG4gIFN0b3JlRW5oYW5jZXIsXG59IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1vY2tPYnNlcnZhYmxlU3RvcmUgfSBmcm9tICcuL29ic2VydmFibGUtc3RvcmUubW9jayc7XG4vKipcbiAqIENvbnZlbmllbmNlIG1vY2sgdG8gbWFrZSBpdCBlYXNpZXIgdG8gY29udHJvbCBzZWxlY3RvclxuICogYmVoYXZpb3VyIGluIHVuaXQgdGVzdHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBNb2NrTmdSZWR1eDxUID0ge30+IGV4dGVuZHMgTmdSZWR1eDxUPiB7XG4gIC8qKiBAZGVwcmVjYXRlZCBVc2UgTW9ja05nUmVkdXguZ2V0SW5zdGFuY2UoKSBpbnN0ZWFkLiAqL1xuICBzdGF0aWMgbW9ja0luc3RhbmNlPzogTW9ja05nUmVkdXg8YW55PiA9IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogUmV0dXJucyBhIHN1YmplY3QgdGhhdCdzIGNvbm5lY3RlZCB0byBhbnkgb2JzZXJ2YWJsZSByZXR1cm5lZCBieSB0aGVcbiAgICogZ2l2ZW4gc2VsZWN0b3IuIFlvdSBjYW4gdXNlIHRoaXMgc3ViamVjdCB0byBwdW1wIHZhbHVlcyBpbnRvIHlvdXJcbiAgICogY29tcG9uZW50cyBvciBzZXJ2aWNlcyB1bmRlciB0ZXN0OyB3aGVuIHRoZXkgY2FsbCAuc2VsZWN0IG9yIEBzZWxlY3RcbiAgICogaW4gdGhlIGNvbnRleHQgb2YgYSB1bml0IHRlc3QsIE1vY2tOZ1JlZHV4IHdpbGwgZ2l2ZSB0aGVtIHRoZSB2YWx1ZXNcbiAgICogeW91IHB1c2hlZCBvbnRvIHlvdXIgc3R1Yi5cbiAgICovXG4gIHN0YXRpYyBnZXRTZWxlY3RvclN0dWI8UiwgUz4oXG4gICAgc2VsZWN0b3I/OiBTZWxlY3RvcjxSLCBTPixcbiAgICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbiAgKTogU3ViamVjdDxTPiB7XG4gICAgcmV0dXJuIE1vY2tOZ1JlZHV4LmdldEluc3RhbmNlKCkubW9ja1Jvb3RTdG9yZS5nZXRTZWxlY3RvclN0dWI8Uz4oXG4gICAgICBzZWxlY3RvcixcbiAgICAgIGNvbXBhcmF0b3IsXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbW9jayBzdWJzdG9yZSB0aGF0IGFsbG93cyB5b3UgdG8gc2V0IHVwIHNlbGVjdG9yU3R1YnMgZm9yXG4gICAqIGFueSAnZnJhY3RhbCcgc3RvcmVzIHlvdXIgYXBwIGNyZWF0ZXMgd2l0aCBOZ1JlZHV4LmNvbmZpZ3VyZVN1YlN0b3JlLlxuICAgKlxuICAgKiBJZiB5b3VyIGFwcCBjcmVhdGVzIGRlZXBseSBuZXN0ZWQgc3Vic3RvcmVzIGZyb20gb3RoZXIgc3Vic3RvcmVzLFxuICAgKiBwYXNzIHRoZSBjaGFpbiBvZiBwYXRoU2VsZWN0b3JzIGluIGFzIG9yZGVyZWQgYXJndW1lbnRzIHRvIG1vY2tcbiAgICogdGhlIG5lc3RlZCBzdWJzdG9yZXMgb3V0LlxuICAgKiBAcGFyYW0gcGF0aFNlbGVjdG9yc1xuICAgKi9cbiAgc3RhdGljIGdldFN1YlN0b3JlPFM+KFxuICAgIC4uLnBhdGhTZWxlY3RvcnM6IFBhdGhTZWxlY3RvcltdXG4gICk6IE1vY2tPYnNlcnZhYmxlU3RvcmU8Uz4ge1xuICAgIHJldHVybiBwYXRoU2VsZWN0b3JzLmxlbmd0aFxuICAgICAgPyBNb2NrTmdSZWR1eC5nZXRJbnN0YW5jZSgpLm1vY2tSb290U3RvcmUuZ2V0U3ViU3RvcmUoLi4ucGF0aFNlbGVjdG9ycylcbiAgICAgIDogTW9ja05nUmVkdXguZ2V0SW5zdGFuY2UoKS5tb2NrUm9vdFN0b3JlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IGFsbCBwcmV2aW91c2x5IGNvbmZpZ3VyZWQgc3R1YnMuXG4gICAqL1xuICBzdGF0aWMgcmVzZXQoKTogdm9pZCB7XG4gICAgTW9ja05nUmVkdXguZ2V0SW5zdGFuY2UoKS5tb2NrUm9vdFN0b3JlLnJlc2V0KCk7XG4gICAgTmdSZWR1eC5pbnN0YW5jZSA9IE1vY2tOZ1JlZHV4Lm1vY2tJbnN0YW5jZSBhcyBhbnk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgc2luZ2xldG9uIE1vY2tOZ1JlZHV4IGluc3RhbmNlLiBVc2VmdWwgZm9yIGNhc2VzIHdoZXJlIHlvdXJcbiAgICogdGVzdHMgbmVlZCB0byBzcHkgb24gc3RvcmUgbWV0aG9kcywgZm9yIGV4YW1wbGUuXG4gICAqL1xuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgTW9ja05nUmVkdXgubW9ja0luc3RhbmNlID0gTW9ja05nUmVkdXgubW9ja0luc3RhbmNlIHx8IG5ldyBNb2NrTmdSZWR1eCgpO1xuICAgIHJldHVybiBNb2NrTmdSZWR1eC5tb2NrSW5zdGFuY2U7XG4gIH1cbiAgLy9cbiAgcHJpdmF0ZSBtb2NrUm9vdFN0b3JlID0gbmV3IE1vY2tPYnNlcnZhYmxlU3RvcmU8YW55PigpO1xuXG4gIGNvbmZpZ3VyZVN1YlN0b3JlID0gdGhpcy5tb2NrUm9vdFN0b3JlLmNvbmZpZ3VyZVN1YlN0b3JlIGFzIGFueTtcbiAgZGlzcGF0Y2ggPSB0aGlzLm1vY2tSb290U3RvcmUuZGlzcGF0Y2ggYXMgRGlzcGF0Y2g8YW55PjtcbiAgZ2V0U3RhdGUgPSB0aGlzLm1vY2tSb290U3RvcmUuZ2V0U3RhdGUgYXMgYW55O1xuICBzdWJzY3JpYmUgPSB0aGlzLm1vY2tSb290U3RvcmUuc3Vic2NyaWJlO1xuICByZXBsYWNlUmVkdWNlciA9IHRoaXMubW9ja1Jvb3RTdG9yZS5yZXBsYWNlUmVkdWNlcjtcbiAgc2VsZWN0OiA8U2VsZWN0ZWRUeXBlPihcbiAgICBzZWxlY3Rvcj86IFNlbGVjdG9yPFQsIFNlbGVjdGVkVHlwZT4sXG4gICAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4gICkgPT4gT2JzZXJ2YWJsZTxTZWxlY3RlZFR5cGU+ID0gdGhpcy5tb2NrUm9vdFN0b3JlLnNlbGVjdDtcblxuICAvKiogQGhpZGRlbiAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIC8vIFRoaXMgaG9va3MgdGhlIG1vY2sgdXAgdG8gQHNlbGVjdC5cbiAgICBOZ1JlZHV4Lmluc3RhbmNlID0gdGhpcyBhcyBhbnk7XG4gIH1cblxuICBwcm92aWRlU3RvcmUgPSAoXzogU3RvcmU8YW55Pik6IHZvaWQgPT4gdW5kZWZpbmVkO1xuICBjb25maWd1cmVTdG9yZSA9IChcbiAgICBfOiBSZWR1Y2VyPGFueSwgQW55QWN0aW9uPixcbiAgICBfXzogYW55LFxuICAgIF9fXz86IE1pZGRsZXdhcmVbXSxcbiAgICBfX19fPzogU3RvcmVFbmhhbmNlcjxhbnk+W10sXG4gICk6IHZvaWQgPT4gdW5kZWZpbmVkO1xufVxuIiwiLy8gVE9ETzogU2VlIGlmIHRoaXMgbGludGluZyBydWxlIGNhbiBiZSBlbmFibGVkIHdpdGggbmV3IGJ1aWxkIHByb2Nlc3MgKG5nLXBhY2thZ3IpXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1pbXBsaWNpdC1kZXBlbmRlbmNpZXNcbmltcG9ydCB7IERldlRvb2xzRXh0ZW5zaW9uLCBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vY2tEZXZUb29sc0V4dGVuc2lvbiB9IGZyb20gJy4vZGV2LXRvb2xzLm1vY2snO1xuaW1wb3J0IHsgTW9ja05nUmVkdXggfSBmcm9tICcuL25nLXJlZHV4Lm1vY2snO1xuXG4vLyBOZWVkcyB0byBiZSBpbml0aWFsaXplZCBlYXJseSBzbyBAc2VsZWN0J3MgdXNlIHRoZSBtb2NrZWQgdmVyc2lvbiB0b28uXG5jb25zdCBtb2NrTmdSZWR1eCA9IE1vY2tOZ1JlZHV4LmdldEluc3RhbmNlKCk7XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgZnVuY3Rpb24gX21vY2tOZ1JlZHV4RmFjdG9yeSgpIHtcbiAgcmV0dXJuIG1vY2tOZ1JlZHV4O1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBOZ1JlZHV4LCB1c2VGYWN0b3J5OiBfbW9ja05nUmVkdXhGYWN0b3J5IH0sXG4gICAgeyBwcm92aWRlOiBEZXZUb29sc0V4dGVuc2lvbiwgdXNlQ2xhc3M6IE1vY2tEZXZUb29sc0V4dGVuc2lvbiB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ1JlZHV4VGVzdGluZ01vZHVsZSB7fVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBLDJCQUltQyxTQUFRLGlCQUFpQjs7O1lBRDNELFVBQVU7Ozs7Ozs7QUNEWDs7OztBQW9CQTs7MEJBQ2dDLEVBQUU7eUJBQ0gsRUFBRTsrQkFFYixDQUNoQixRQUF5QyxFQUN6QyxVQUF1QixLQUV2QixJQUFJLENBQUMsZ0JBQWdCLENBQWdCLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQyxPQUFPO3FCQUU1RDtZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1NBQ3JCO3dCQUUrQixNQUFNLElBQUksTUFBTTs4QkFDL0IsTUFBTSxJQUFJO3dCQUNoQixPQUFPLEVBQUUsQ0FBQzt5QkFDVCxNQUFNLE1BQU0sSUFBSTtzQkFFbkIsQ0FDUCxRQUF1QyxFQUN2QyxVQUF1Qjs7WUFFdkIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFnQixRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDeEUsT0FBTyxJQUFJLENBQUMsVUFBVTtrQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2tCQUN4RCxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ2xCO2lDQUVtQixDQUNsQixRQUFzQixFQUN0QixDQUErQixLQUNHLElBQUksQ0FBQyxZQUFZLENBQVcsUUFBUSxDQUFDOzJCQUUzRCxDQUNaLEdBQUcsYUFBNkI7WUFFaEMsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQztZQUN2QywwQkFBUSxLQUFLO2tCQUNULElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDO2tCQUM3QyxJQUFJLEdBQW1DO1NBQzVDOzs7Ozs7O0lBRU8sWUFBWSxDQUFXLFFBQXNCOztRQUNuRCxNQUFNLE1BQU0sR0FDVixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEMsSUFBSSxtQkFBbUIsRUFBWSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUNsRCxPQUFPLE1BQU0sQ0FBQzs7Ozs7Ozs7SUFHUixnQkFBZ0IsQ0FDdEIsUUFBeUMsRUFDekMsVUFBdUI7O1FBRXZCLE1BQU0sR0FBRyxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDOztRQUNoRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJO1lBQ3JDLE9BQU8sRUFBRSxJQUFJLGFBQWEsRUFBaUI7WUFDM0MsVUFBVTtTQUNYLENBQUM7UUFFRixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUM5QixPQUFPLE1BQU0sQ0FBQzs7Q0FFakI7Ozs7OztBQ3ZGRDs7Ozs7QUFvQkEsaUJBQWlDLFNBQVEsT0FBVTs7OztJQW9FakQ7UUFDRSxLQUFLLEVBQUUsQ0FBQzs2QkFkYyxJQUFJLG1CQUFtQixFQUFPO21EQUVsQyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUF3QjswQ0FDcEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUF5QjswQ0FDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFlO3lCQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVM7OEJBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYztzQkFJbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNOzRCQVMxQyxDQUFDLENBQWEsS0FBVyxTQUFTOzhCQUNoQyxDQUNmLENBQTBCLEVBQzFCLEVBQU8sRUFDUCxHQUFrQixFQUNsQixJQUEyQixLQUNsQixTQUFTOztRQVRsQixPQUFPLENBQUMsUUFBUSxxQkFBRyxJQUFXLENBQUEsQ0FBQztLQUNoQzs7Ozs7Ozs7Ozs7O0lBN0RELE9BQU8sZUFBZSxDQUNwQixRQUF5QixFQUN6QixVQUF1QjtRQUV2QixPQUFPLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUM1RCxRQUFRLEVBQ1IsVUFBVSxDQUNYLENBQUM7S0FDSDs7Ozs7Ozs7Ozs7O0lBV0QsT0FBTyxXQUFXLENBQ2hCLEdBQUcsYUFBNkI7UUFFaEMsT0FBTyxhQUFhLENBQUMsTUFBTTtjQUN2QixXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLGFBQWEsQ0FBQztjQUNyRSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDO0tBQzdDOzs7OztJQUtELE9BQU8sS0FBSztRQUNWLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDaEQsT0FBTyxDQUFDLFFBQVEscUJBQUcsV0FBVyxDQUFDLFlBQW1CLENBQUEsQ0FBQztLQUNwRDs7Ozs7O0lBTUQsT0FBTyxXQUFXO1FBQ2hCLFdBQVcsQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLFlBQVksSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ3pFLE9BQU8sV0FBVyxDQUFDLFlBQVksQ0FBQztLQUNqQzs7Ozs7MkJBbkR3QyxTQUFTOzs7Ozs7QUN2QnBEO0FBTUEsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDOzs7OztBQUc5QztJQUNFLE9BQU8sV0FBVyxDQUFDO0NBQ3BCO0FBU0Q7OztZQVBDLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsRUFBRTtnQkFDWCxTQUFTLEVBQUU7b0JBQ1QsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRTtvQkFDckQsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFO2lCQUNoRTthQUNGOzs7Ozs7Ozs7Ozs7Ozs7In0=