(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular-redux/store'), require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@angular-redux/store/testing', ['exports', '@angular-redux/store', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (factory((global['angular-redux'] = global['angular-redux'] || {}, global['angular-redux'].store = global['angular-redux'].store || {}, global['angular-redux'].store.testing = {}),global['angular-redux'].store,global.ng.core,global.rxjs,global.rxjs.operators));
}(this, (function (exports,store,core,rxjs,operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var MockDevToolsExtension = (function (_super) {
        __extends(MockDevToolsExtension, _super);
        function MockDevToolsExtension() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MockDevToolsExtension.decorators = [
            { type: core.Injectable },
        ];
        return MockDevToolsExtension;
    }(store.DevToolsExtension));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @hidden
     * @template State
     */
    var /**
     * @hidden
     * @template State
     */ MockObservableStore = (function () {
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
                    ? stub.subject.pipe(operators.distinctUntilChanged(stub.comparator))
                    : stub.subject;
            };
            this.configureSubStore = function (basePath, _) { return _this.initSubStore(basePath); };
            this.getSubStore = function () {
                var pathSelectors = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    pathSelectors[_i] = arguments[_i];
                }
                var _a = __read(pathSelectors), first = _a[0], rest = _a.slice(1);
                return /** @type {?} */ ((first
                    ? (_b = _this.initSubStore(first)).getSubStore.apply(_b, __spread(rest)) : _this));
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
                    subject: new rxjs.ReplaySubject(),
                    comparator: comparator,
                };
                this.selections[key] = record;
                return record;
            };
        return MockObservableStore;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Convenience mock to make it easier to control selector
     * behaviour in unit tests.
     * @template T
     */
    var MockNgRedux = (function (_super) {
        __extends(MockNgRedux, _super);
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
            store.NgRedux.instance = /** @type {?} */ (_this);
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
                    ? (_a = MockNgRedux.getInstance().mockRootStore).getSubStore.apply(_a, __spread(pathSelectors)) : MockNgRedux.getInstance().mockRootStore;
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
                store.NgRedux.instance = /** @type {?} */ (MockNgRedux.mockInstance);
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
    }(store.NgRedux));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var mockNgRedux = MockNgRedux.getInstance();
    /**
     * @hidden
     * @return {?}
     */
    function _mockNgReduxFactory() {
        return mockNgRedux;
    }
    var NgReduxTestingModule = (function () {
        function NgReduxTestingModule() {
        }
        NgReduxTestingModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [],
                        providers: [
                            { provide: store.NgRedux, useFactory: _mockNgReduxFactory },
                            { provide: store.DevToolsExtension, useClass: MockDevToolsExtension },
                        ],
                    },] },
        ];
        return NgReduxTestingModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.NgReduxTestingModule = NgReduxTestingModule;
    exports.MockDevToolsExtension = MockDevToolsExtension;
    exports.MockNgRedux = MockNgRedux;
    exports.MockObservableStore = MockObservableStore;
    exports.ɵa = _mockNgReduxFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1yZWR1eC1zdG9yZS10ZXN0aW5nLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbbnVsbCwibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS90ZXN0aW5nL2Rldi10b29scy5tb2NrLnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS90ZXN0aW5nL29ic2VydmFibGUtc3RvcmUubW9jay50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvdGVzdGluZy9uZy1yZWR1eC5tb2NrLnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS90ZXN0aW5nL25nLXJlZHV4LXRlc3RpbmcubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiLy8gVE9ETzogU2VlIGlmIHRoaXMgbGludGluZyBydWxlIGNhbiBiZSBlbmFibGVkIHdpdGggbmV3IGJ1aWxkIHByb2Nlc3MgKG5nLXBhY2thZ3IpXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1pbXBsaWNpdC1kZXBlbmRlbmNpZXNcbmltcG9ydCB7IERldlRvb2xzRXh0ZW5zaW9uIH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja0RldlRvb2xzRXh0ZW5zaW9uIGV4dGVuZHMgRGV2VG9vbHNFeHRlbnNpb24ge31cbiIsIi8vIFRPRE86IFNlZSBpZiB0aGlzIGxpbnRpbmcgcnVsZSBjYW4gYmUgZW5hYmxlZCB3aXRoIG5ldyBidWlsZCBwcm9jZXNzIChuZy1wYWNrYWdyKVxuLy8gdHNsaW50OmRpc2FibGU6bm8taW1wbGljaXQtZGVwZW5kZW5jaWVzXG5pbXBvcnQgeyBDb21wYXJhdG9yLCBQYXRoU2VsZWN0b3IsIFNlbGVjdG9yIH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgQW55QWN0aW9uLCBEaXNwYXRjaCwgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKiogQGhpZGRlbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZWxlY3RvclN0dWJSZWNvcmQge1xuICBzdWJqZWN0OiBTdWJqZWN0PGFueT47XG4gIGNvbXBhcmF0b3I6IENvbXBhcmF0b3I7XG59XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgaW50ZXJmYWNlIFNlbGVjdG9yU3R1Yk1hcCB7XG4gIFtzZWxlY3Rvcjogc3RyaW5nXTogU2VsZWN0b3JTdHViUmVjb3JkO1xufVxuXG4vKiogQGhpZGRlbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdWJTdG9yZVN0dWJNYXAge1xuICBbYmFzZVBhdGg6IHN0cmluZ106IE1vY2tPYnNlcnZhYmxlU3RvcmU8YW55Pjtcbn1cblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBjbGFzcyBNb2NrT2JzZXJ2YWJsZVN0b3JlPFN0YXRlPiB7XG4gIHNlbGVjdGlvbnM6IFNlbGVjdG9yU3R1Yk1hcCA9IHt9O1xuICBzdWJTdG9yZXM6IFN1YlN0b3JlU3R1Yk1hcCA9IHt9O1xuXG4gIGdldFNlbGVjdG9yU3R1YiA9IDxTZWxlY3RlZFN0YXRlPihcbiAgICBzZWxlY3Rvcj86IFNlbGVjdG9yPFN0YXRlLCBTZWxlY3RlZFN0YXRlPixcbiAgICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbiAgKTogU3ViamVjdDxTZWxlY3RlZFN0YXRlPiA9PlxuICAgIHRoaXMuaW5pdFNlbGVjdG9yU3R1YjxTZWxlY3RlZFN0YXRlPihzZWxlY3RvciwgY29tcGFyYXRvcikuc3ViamVjdDtcblxuICByZXNldCA9ICgpID0+IHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLnN1YlN0b3JlcykuZm9yRWFjaChrID0+IHRoaXMuc3ViU3RvcmVzW2tdLnJlc2V0KCkpO1xuICAgIHRoaXMuc2VsZWN0aW9ucyA9IHt9O1xuICAgIHRoaXMuc3ViU3RvcmVzID0ge307XG4gIH07XG5cbiAgZGlzcGF0Y2g6IERpc3BhdGNoPEFueUFjdGlvbj4gPSBhY3Rpb24gPT4gYWN0aW9uO1xuICByZXBsYWNlUmVkdWNlciA9ICgpID0+IG51bGw7XG4gIGdldFN0YXRlID0gKCkgPT4gKHt9KTtcbiAgc3Vic2NyaWJlID0gKCkgPT4gKCkgPT4gbnVsbDtcblxuICBzZWxlY3QgPSA8U2VsZWN0ZWRTdGF0ZT4oXG4gICAgc2VsZWN0b3I/OiBTZWxlY3RvcjxhbnksIFNlbGVjdGVkU3RhdGU+LFxuICAgIGNvbXBhcmF0b3I/OiBDb21wYXJhdG9yLFxuICApOiBPYnNlcnZhYmxlPGFueT4gPT4ge1xuICAgIGNvbnN0IHN0dWIgPSB0aGlzLmluaXRTZWxlY3RvclN0dWI8U2VsZWN0ZWRTdGF0ZT4oc2VsZWN0b3IsIGNvbXBhcmF0b3IpO1xuICAgIHJldHVybiBzdHViLmNvbXBhcmF0b3JcbiAgICAgID8gc3R1Yi5zdWJqZWN0LnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoc3R1Yi5jb21wYXJhdG9yKSlcbiAgICAgIDogc3R1Yi5zdWJqZWN0O1xuICB9O1xuXG4gIGNvbmZpZ3VyZVN1YlN0b3JlID0gPFN1YlN0YXRlPihcbiAgICBiYXNlUGF0aDogUGF0aFNlbGVjdG9yLFxuICAgIF86IFJlZHVjZXI8U3ViU3RhdGUsIEFueUFjdGlvbj4sXG4gICk6IE1vY2tPYnNlcnZhYmxlU3RvcmU8U3ViU3RhdGU+ID0+IHRoaXMuaW5pdFN1YlN0b3JlPFN1YlN0YXRlPihiYXNlUGF0aCk7XG5cbiAgZ2V0U3ViU3RvcmUgPSA8U3ViU3RhdGU+KFxuICAgIC4uLnBhdGhTZWxlY3RvcnM6IFBhdGhTZWxlY3RvcltdXG4gICk6IE1vY2tPYnNlcnZhYmxlU3RvcmU8YW55PiA9PiB7XG4gICAgY29uc3QgW2ZpcnN0LCAuLi5yZXN0XSA9IHBhdGhTZWxlY3RvcnM7XG4gICAgcmV0dXJuIChmaXJzdFxuICAgICAgPyB0aGlzLmluaXRTdWJTdG9yZShmaXJzdCkuZ2V0U3ViU3RvcmUoLi4ucmVzdClcbiAgICAgIDogdGhpcykgYXMgTW9ja09ic2VydmFibGVTdG9yZTxTdWJTdGF0ZT47XG4gIH07XG5cbiAgcHJpdmF0ZSBpbml0U3ViU3RvcmU8U3ViU3RhdGU+KGJhc2VQYXRoOiBQYXRoU2VsZWN0b3IpIHtcbiAgICBjb25zdCByZXN1bHQgPVxuICAgICAgdGhpcy5zdWJTdG9yZXNbSlNPTi5zdHJpbmdpZnkoYmFzZVBhdGgpXSB8fFxuICAgICAgbmV3IE1vY2tPYnNlcnZhYmxlU3RvcmU8U3ViU3RhdGU+KCk7XG4gICAgdGhpcy5zdWJTdG9yZXNbSlNPTi5zdHJpbmdpZnkoYmFzZVBhdGgpXSA9IHJlc3VsdDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0U2VsZWN0b3JTdHViPFNlbGVjdGVkU3RhdGU+KFxuICAgIHNlbGVjdG9yPzogU2VsZWN0b3I8U3RhdGUsIFNlbGVjdGVkU3RhdGU+LFxuICAgIGNvbXBhcmF0b3I/OiBDb21wYXJhdG9yLFxuICApOiBTZWxlY3RvclN0dWJSZWNvcmQge1xuICAgIGNvbnN0IGtleSA9IHNlbGVjdG9yID8gc2VsZWN0b3IudG9TdHJpbmcoKSA6ICcnO1xuICAgIGNvbnN0IHJlY29yZCA9IHRoaXMuc2VsZWN0aW9uc1trZXldIHx8IHtcbiAgICAgIHN1YmplY3Q6IG5ldyBSZXBsYXlTdWJqZWN0PFNlbGVjdGVkU3RhdGU+KCksXG4gICAgICBjb21wYXJhdG9yLFxuICAgIH07XG5cbiAgICB0aGlzLnNlbGVjdGlvbnNba2V5XSA9IHJlY29yZDtcbiAgICByZXR1cm4gcmVjb3JkO1xuICB9XG59XG4iLCIvLyBUT0RPOiBTZWUgaWYgdGhpcyBsaW50aW5nIHJ1bGUgY2FuIGJlIGVuYWJsZWQgd2l0aCBuZXcgYnVpbGQgcHJvY2VzcyAobmctcGFja2Fncilcbi8vIHRzbGludDpkaXNhYmxlOm5vLWltcGxpY2l0LWRlcGVuZGVuY2llc1xuLy8gdHNsaW50OmRpc2FibGU6bWVtYmVyLW9yZGVyaW5nXG5pbXBvcnQge1xuICBDb21wYXJhdG9yLFxuICBOZ1JlZHV4LFxuICBQYXRoU2VsZWN0b3IsXG4gIFNlbGVjdG9yLFxufSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQge1xuICBBbnlBY3Rpb24sXG4gIERpc3BhdGNoLFxuICBNaWRkbGV3YXJlLFxuICBSZWR1Y2VyLFxuICBTdG9yZSxcbiAgU3RvcmVFbmhhbmNlcixcbn0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTW9ja09ic2VydmFibGVTdG9yZSB9IGZyb20gJy4vb2JzZXJ2YWJsZS1zdG9yZS5tb2NrJztcbi8qKlxuICogQ29udmVuaWVuY2UgbW9jayB0byBtYWtlIGl0IGVhc2llciB0byBjb250cm9sIHNlbGVjdG9yXG4gKiBiZWhhdmlvdXIgaW4gdW5pdCB0ZXN0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIE1vY2tOZ1JlZHV4PFQgPSB7fT4gZXh0ZW5kcyBOZ1JlZHV4PFQ+IHtcbiAgLyoqIEBkZXByZWNhdGVkIFVzZSBNb2NrTmdSZWR1eC5nZXRJbnN0YW5jZSgpIGluc3RlYWQuICovXG4gIHN0YXRpYyBtb2NrSW5zdGFuY2U/OiBNb2NrTmdSZWR1eDxhbnk+ID0gdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3ViamVjdCB0aGF0J3MgY29ubmVjdGVkIHRvIGFueSBvYnNlcnZhYmxlIHJldHVybmVkIGJ5IHRoZVxuICAgKiBnaXZlbiBzZWxlY3Rvci4gWW91IGNhbiB1c2UgdGhpcyBzdWJqZWN0IHRvIHB1bXAgdmFsdWVzIGludG8geW91clxuICAgKiBjb21wb25lbnRzIG9yIHNlcnZpY2VzIHVuZGVyIHRlc3Q7IHdoZW4gdGhleSBjYWxsIC5zZWxlY3Qgb3IgQHNlbGVjdFxuICAgKiBpbiB0aGUgY29udGV4dCBvZiBhIHVuaXQgdGVzdCwgTW9ja05nUmVkdXggd2lsbCBnaXZlIHRoZW0gdGhlIHZhbHVlc1xuICAgKiB5b3UgcHVzaGVkIG9udG8geW91ciBzdHViLlxuICAgKi9cbiAgc3RhdGljIGdldFNlbGVjdG9yU3R1YjxSLCBTPihcbiAgICBzZWxlY3Rvcj86IFNlbGVjdG9yPFIsIFM+LFxuICAgIGNvbXBhcmF0b3I/OiBDb21wYXJhdG9yLFxuICApOiBTdWJqZWN0PFM+IHtcbiAgICByZXR1cm4gTW9ja05nUmVkdXguZ2V0SW5zdGFuY2UoKS5tb2NrUm9vdFN0b3JlLmdldFNlbGVjdG9yU3R1YjxTPihcbiAgICAgIHNlbGVjdG9yLFxuICAgICAgY29tcGFyYXRvcixcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBtb2NrIHN1YnN0b3JlIHRoYXQgYWxsb3dzIHlvdSB0byBzZXQgdXAgc2VsZWN0b3JTdHVicyBmb3JcbiAgICogYW55ICdmcmFjdGFsJyBzdG9yZXMgeW91ciBhcHAgY3JlYXRlcyB3aXRoIE5nUmVkdXguY29uZmlndXJlU3ViU3RvcmUuXG4gICAqXG4gICAqIElmIHlvdXIgYXBwIGNyZWF0ZXMgZGVlcGx5IG5lc3RlZCBzdWJzdG9yZXMgZnJvbSBvdGhlciBzdWJzdG9yZXMsXG4gICAqIHBhc3MgdGhlIGNoYWluIG9mIHBhdGhTZWxlY3RvcnMgaW4gYXMgb3JkZXJlZCBhcmd1bWVudHMgdG8gbW9ja1xuICAgKiB0aGUgbmVzdGVkIHN1YnN0b3JlcyBvdXQuXG4gICAqIEBwYXJhbSBwYXRoU2VsZWN0b3JzXG4gICAqL1xuICBzdGF0aWMgZ2V0U3ViU3RvcmU8Uz4oXG4gICAgLi4ucGF0aFNlbGVjdG9yczogUGF0aFNlbGVjdG9yW11cbiAgKTogTW9ja09ic2VydmFibGVTdG9yZTxTPiB7XG4gICAgcmV0dXJuIHBhdGhTZWxlY3RvcnMubGVuZ3RoXG4gICAgICA/IE1vY2tOZ1JlZHV4LmdldEluc3RhbmNlKCkubW9ja1Jvb3RTdG9yZS5nZXRTdWJTdG9yZSguLi5wYXRoU2VsZWN0b3JzKVxuICAgICAgOiBNb2NrTmdSZWR1eC5nZXRJbnN0YW5jZSgpLm1vY2tSb290U3RvcmU7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgYWxsIHByZXZpb3VzbHkgY29uZmlndXJlZCBzdHVicy5cbiAgICovXG4gIHN0YXRpYyByZXNldCgpOiB2b2lkIHtcbiAgICBNb2NrTmdSZWR1eC5nZXRJbnN0YW5jZSgpLm1vY2tSb290U3RvcmUucmVzZXQoKTtcbiAgICBOZ1JlZHV4Lmluc3RhbmNlID0gTW9ja05nUmVkdXgubW9ja0luc3RhbmNlIGFzIGFueTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBzaW5nbGV0b24gTW9ja05nUmVkdXggaW5zdGFuY2UuIFVzZWZ1bCBmb3IgY2FzZXMgd2hlcmUgeW91clxuICAgKiB0ZXN0cyBuZWVkIHRvIHNweSBvbiBzdG9yZSBtZXRob2RzLCBmb3IgZXhhbXBsZS5cbiAgICovXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICBNb2NrTmdSZWR1eC5tb2NrSW5zdGFuY2UgPSBNb2NrTmdSZWR1eC5tb2NrSW5zdGFuY2UgfHwgbmV3IE1vY2tOZ1JlZHV4KCk7XG4gICAgcmV0dXJuIE1vY2tOZ1JlZHV4Lm1vY2tJbnN0YW5jZTtcbiAgfVxuICAvL1xuICBwcml2YXRlIG1vY2tSb290U3RvcmUgPSBuZXcgTW9ja09ic2VydmFibGVTdG9yZTxhbnk+KCk7XG5cbiAgY29uZmlndXJlU3ViU3RvcmUgPSB0aGlzLm1vY2tSb290U3RvcmUuY29uZmlndXJlU3ViU3RvcmUgYXMgYW55O1xuICBkaXNwYXRjaCA9IHRoaXMubW9ja1Jvb3RTdG9yZS5kaXNwYXRjaCBhcyBEaXNwYXRjaDxhbnk+O1xuICBnZXRTdGF0ZSA9IHRoaXMubW9ja1Jvb3RTdG9yZS5nZXRTdGF0ZSBhcyBhbnk7XG4gIHN1YnNjcmliZSA9IHRoaXMubW9ja1Jvb3RTdG9yZS5zdWJzY3JpYmU7XG4gIHJlcGxhY2VSZWR1Y2VyID0gdGhpcy5tb2NrUm9vdFN0b3JlLnJlcGxhY2VSZWR1Y2VyO1xuICBzZWxlY3Q6IDxTZWxlY3RlZFR5cGU+KFxuICAgIHNlbGVjdG9yPzogU2VsZWN0b3I8VCwgU2VsZWN0ZWRUeXBlPixcbiAgICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbiAgKSA9PiBPYnNlcnZhYmxlPFNlbGVjdGVkVHlwZT4gPSB0aGlzLm1vY2tSb290U3RvcmUuc2VsZWN0O1xuXG4gIC8qKiBAaGlkZGVuICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgLy8gVGhpcyBob29rcyB0aGUgbW9jayB1cCB0byBAc2VsZWN0LlxuICAgIE5nUmVkdXguaW5zdGFuY2UgPSB0aGlzIGFzIGFueTtcbiAgfVxuXG4gIHByb3ZpZGVTdG9yZSA9IChfOiBTdG9yZTxhbnk+KTogdm9pZCA9PiB1bmRlZmluZWQ7XG4gIGNvbmZpZ3VyZVN0b3JlID0gKFxuICAgIF86IFJlZHVjZXI8YW55LCBBbnlBY3Rpb24+LFxuICAgIF9fOiBhbnksXG4gICAgX19fPzogTWlkZGxld2FyZVtdLFxuICAgIF9fX18/OiBTdG9yZUVuaGFuY2VyPGFueT5bXSxcbiAgKTogdm9pZCA9PiB1bmRlZmluZWQ7XG59XG4iLCIvLyBUT0RPOiBTZWUgaWYgdGhpcyBsaW50aW5nIHJ1bGUgY2FuIGJlIGVuYWJsZWQgd2l0aCBuZXcgYnVpbGQgcHJvY2VzcyAobmctcGFja2Fncilcbi8vIHRzbGludDpkaXNhYmxlOm5vLWltcGxpY2l0LWRlcGVuZGVuY2llc1xuaW1wb3J0IHsgRGV2VG9vbHNFeHRlbnNpb24sIE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9ja0RldlRvb2xzRXh0ZW5zaW9uIH0gZnJvbSAnLi9kZXYtdG9vbHMubW9jayc7XG5pbXBvcnQgeyBNb2NrTmdSZWR1eCB9IGZyb20gJy4vbmctcmVkdXgubW9jayc7XG5cbi8vIE5lZWRzIHRvIGJlIGluaXRpYWxpemVkIGVhcmx5IHNvIEBzZWxlY3QncyB1c2UgdGhlIG1vY2tlZCB2ZXJzaW9uIHRvby5cbmNvbnN0IG1vY2tOZ1JlZHV4ID0gTW9ja05nUmVkdXguZ2V0SW5zdGFuY2UoKTtcblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfbW9ja05nUmVkdXhGYWN0b3J5KCkge1xuICByZXR1cm4gbW9ja05nUmVkdXg7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IE5nUmVkdXgsIHVzZUZhY3Rvcnk6IF9tb2NrTmdSZWR1eEZhY3RvcnkgfSxcbiAgICB7IHByb3ZpZGU6IERldlRvb2xzRXh0ZW5zaW9uLCB1c2VDbGFzczogTW9ja0RldlRvb2xzRXh0ZW5zaW9uIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5nUmVkdXhUZXN0aW5nTW9kdWxlIHt9XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJJbmplY3RhYmxlIiwiRGV2VG9vbHNFeHRlbnNpb24iLCJkaXN0aW5jdFVudGlsQ2hhbmdlZCIsIlJlcGxheVN1YmplY3QiLCJOZ1JlZHV4IiwiTmdNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztJQWNBO0lBRUEsSUFBSSxhQUFhLEdBQUcsVUFBUyxDQUFDLEVBQUUsQ0FBQztRQUM3QixhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7YUFDaEMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQy9FLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFFRix1QkFBMEIsQ0FBQyxFQUFFLENBQUM7UUFDMUIsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQixnQkFBZ0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUN2QyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7QUFFRCxvQkF3RnVCLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxD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