(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/operators'), require('redux'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@angular-redux/store', ['exports', '@angular/core', 'rxjs/operators', 'redux', 'rxjs'], factory) :
    (factory((global['angular-redux'] = global['angular-redux'] || {}, global['angular-redux'].store = {}),global.ng.core,global.rxjs.operators,null,global.rxjs));
}(this, (function (exports,core,operators,redux,rxjs) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * This is the public interface of \@angular-redux/store. It wraps the global
     * redux store and adds a few other add on methods. It's what you'll inject
     * into your Angular application as a service.
     * @abstract
     * @template RootState
     */
    var NgRedux = (function () {
        function NgRedux() {
        }
        /**
         * \@hidden, \@deprecated
         */
        NgRedux.instance = undefined;
        return NgRedux;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var environment = ((typeof window !== 'undefined'
        ? window
        : {}));
    /**
     * An angular-2-ified version of the Redux DevTools chrome extension.
     */
    var DevToolsExtension = (function () {
        /** @hidden */
        function DevToolsExtension(appRef, ngRedux) {
            var _this = this;
            this.appRef = appRef;
            this.ngRedux = ngRedux;
            /**
             * A wrapper for the Chrome Extension Redux DevTools.
             * Makes sure state changes triggered by the extension
             * trigger Angular2's change detector.
             *
             * @argument options: dev tool options; same
             * format as described here:
             * [zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md]
             */
            this.enhancer = function (options) {
                /** @type {?} */
                var subscription;
                if (!_this.isEnabled()) {
                    return null;
                } /** @type {?} */
                ((
                // Make sure changes from dev tools update angular's view.
                // Make sure changes from dev tools update angular's view.
                _this.getDevTools())).listen(function (_a) {
                    var type = _a.type;
                    if (type === 'START') {
                        subscription = _this.ngRedux.subscribe(function () {
                            if (!core.NgZone.isInAngularZone()) {
                                _this.appRef.tick();
                            }
                        });
                    }
                    else if (type === 'STOP') {
                        subscription();
                    }
                });
                return /** @type {?} */ ((_this.getDevTools()))(options || {});
            };
            /**
             * Returns true if the extension is installed and enabled.
             */
            this.isEnabled = function () { return !!_this.getDevTools(); };
            /**
             * Returns the redux devtools enhancer.
             */
            this.getDevTools = function () {
                return environment &&
                    (environment.__REDUX_DEVTOOLS_EXTENSION__ || environment.devToolsExtension);
            };
        }
        DevToolsExtension.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        DevToolsExtension.ctorParameters = function () {
            return [
                { type: core.ApplicationRef },
                { type: NgRedux }
            ];
        };
        return DevToolsExtension;
    }());

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
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
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
    /**
     * Gets a deeply-nested property value from an object, given a 'path'
     * of property names or array indices.
     *
     * @hidden
     * @param {?} v
     * @param {?} pathElems
     * @return {?}
     */
    function getIn(v, pathElems) {
        if (!v) {
            return v;
        }
        // If this is an ImmutableJS structure, use existing getIn function
        if ('function' === typeof v.getIn) {
            return v.getIn(pathElems);
        }
        var _a = __read(pathElems), firstElem = _a[0], restElems = _a.slice(1);
        if (undefined === v[firstElem]) {
            return undefined;
        }
        if (restElems.length === 0) {
            return v[firstElem];
        }
        return getIn(v[firstElem], restElems);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * Sets a deeply-nested property value from an object, given a 'path'
     * of property names or array indices. Path elements are created if
     * not there already. Does not mutate the given object.
     *
     * @hidden
      @type {?} */
    var setIn = function (obj, _a, value) {
        var _b = __read(_a), firstElem = _b[0], restElems = _b.slice(1);
        return 'function' === typeof (obj[firstElem] || {}).setIn
            ? __assign({}, obj, (_c = {}, _c[firstElem] = obj[firstElem].setIn(restElems, value), _c)) : __assign({}, obj, (_d = {}, _d[firstElem] = restElems.length === 0
            ? value
            : setIn(obj[firstElem] || {}, restElems, value), _d));
        var _c, _d;
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var reducerMap = {};
    /** @type {?} */
    var composeReducers = function () {
        var reducers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            reducers[_i] = arguments[_i];
        }
        return function (state, action) {
            return reducers.reduce(function (subState, reducer) { return reducer(subState, action); }, state);
        };
    };
    /**
     * @param {?} rootReducer Call this on your root reducer to enable SubStore
     * functionality for pre-configured stores (e.g. using NgRedux.provideStore()).
     * NgRedux.configureStore
     * does it for you under the hood.
     * @return {?}
     */
    function enableFractalReducers(rootReducer) {
        reducerMap = {};
        return composeReducers(rootFractalReducer, rootReducer);
    }
    /**
     * @hidden
     * @param {?} basePath
     * @param {?} localReducer
     * @return {?}
     */
    function registerFractalReducer(basePath, localReducer) {
        /** @type {?} */
        var existingFractalReducer = reducerMap[JSON.stringify(basePath)];
        if (existingFractalReducer && existingFractalReducer !== localReducer) {
            throw new Error("attempt to overwrite fractal reducer for basePath " + basePath);
        }
        reducerMap[JSON.stringify(basePath)] = localReducer;
    }
    /**
     * @hidden
     * @param {?} basePath
     * @param {?} nextLocalReducer
     * @return {?}
     */
    function replaceLocalReducer(basePath, nextLocalReducer) {
        reducerMap[JSON.stringify(basePath)] = nextLocalReducer;
    }
    /**
     * @param {?=} state
     * @param {?=} action
     * @return {?}
     */
    function rootFractalReducer(state, action) {
        if (state === void 0) {
            state = {};
        }
        /** @type {?} */
        var fractalKey = action['@angular-redux::fractalkey'];
        /** @type {?} */
        var fractalPath = fractalKey ? JSON.parse(fractalKey) : [];
        /** @type {?} */
        var localReducer = reducerMap[fractalKey || ''];
        return fractalKey && localReducer
            ? setIn(state, fractalPath, localReducer(getIn(state, fractalPath), action))
            : state;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * OPTIONS_KEY: this is per-class (static) and holds the config from the
     * \@SubStore decorator.
      @type {?} */
    var OPTIONS_KEY = '@angular-redux::substore::class::options';
    /** *
     * INSTANCE_SUBSTORE_KEY, INSTANCE_SELECTIONS_KEY: these are per-instance
     * (non-static) and holds references to the substores/selected observables
     * to be used by an instance of a decorated class. I'm not using
     * reflect-metadata here because I want
     *
     * 1. different instances to have different substores in the case where
     * `basePathMethodName` is dynamic.
     * 2. the instance substore to be garbage collected when the instance is no
     * longer reachable.
     * This is therefore an own-property on the actual instance of the decorated
     * class.
      @type {?} */
    var INSTANCE_SUBSTORE_KEY = '@angular-redux::substore::instance::store';
    /** @type {?} */
    var INSTANCE_SELECTIONS_KEY = '@angular-redux::substore::instance::selections';
    /** *
     * Used to detect when the base path changes - this allows components to
     * dynamically adjust their selections if necessary.
      @type {?} */
    var INSTANCE_BASE_PATH_KEY = '@angular-redux::substore::instance::basepath';
    /** @type {?} */
    var getClassOptions = function (decoratedInstance) {
        return decoratedInstance.constructor[OPTIONS_KEY];
    };
    /** *
     * @hidden
      @type {?} */
    var setClassOptions = function (decoratedClassConstructor, options) {
        decoratedClassConstructor[OPTIONS_KEY] = options;
    };
    /** @type {?} */
    var setInstanceStore = function (decoratedInstance, store) { return (decoratedInstance[INSTANCE_SUBSTORE_KEY] = store); };
    /** @type {?} */
    var getInstanceStore = function (decoratedInstance) {
        return decoratedInstance[INSTANCE_SUBSTORE_KEY];
    };
    /** @type {?} */
    var getInstanceSelectionMap = function (decoratedInstance) {
        /** @type {?} */
        var map = decoratedInstance[INSTANCE_SELECTIONS_KEY] || {};
        decoratedInstance[INSTANCE_SELECTIONS_KEY] = map;
        return map;
    };
    /** @type {?} */
    var hasBasePathChanged = function (decoratedInstance, basePath) {
        return decoratedInstance[INSTANCE_BASE_PATH_KEY] !== (basePath || []).toString();
    };
    /** @type {?} */
    var setInstanceBasePath = function (decoratedInstance, basePath) {
        decoratedInstance[INSTANCE_BASE_PATH_KEY] = (basePath || []).toString();
    };
    /** @type {?} */
    var clearInstanceState = function (decoratedInstance) {
        decoratedInstance[INSTANCE_SELECTIONS_KEY] = null;
        decoratedInstance[INSTANCE_SUBSTORE_KEY] = null;
        decoratedInstance[INSTANCE_BASE_PATH_KEY] = null;
    };
    /** *
     * Gets the store associated with a decorated instance (e.g. a
     * component or service)
     * @hidden
      @type {?} */
    var getBaseStore = function (decoratedInstance) {
        // The root store hasn't been set up yet.
        if (!NgRedux.instance) {
            return undefined;
        }
        /** @type {?} */
        var options = getClassOptions(decoratedInstance);
        // This is not decorated with `@WithSubStore`. Return the root store.
        if (!options) {
            return NgRedux.instance;
        }
        /** @type {?} */
        var basePath = decoratedInstance[options.basePathMethodName]();
        if (hasBasePathChanged(decoratedInstance, basePath)) {
            clearInstanceState(decoratedInstance);
            setInstanceBasePath(decoratedInstance, basePath);
        }
        if (!basePath) {
            return NgRedux.instance;
        }
        /** @type {?} */
        var store = getInstanceStore(decoratedInstance);
        if (!store) {
            setInstanceStore(decoratedInstance, NgRedux.instance.configureSubStore(basePath, options.localReducer));
        }
        return getInstanceStore(decoratedInstance);
    };
    /** *
     * Creates an Observable from the given selection parameters,
     * rooted at decoratedInstance's store, and caches it on the
     * instance for future use.
     * @hidden
      @type {?} */
    var getInstanceSelection = function (decoratedInstance, key, selector, transformer, comparator) {
        /** @type {?} */
        var store = getBaseStore(decoratedInstance);
        if (store) {
            /** @type {?} */
            var selections = getInstanceSelectionMap(decoratedInstance);
            selections[key] =
                selections[key] ||
                    (!transformer
                        ? store.select(selector, comparator)
                        : store.select(selector).pipe(function (obs$) { return transformer(obs$, decoratedInstance); }, operators.distinctUntilChanged(comparator)));
            return selections[key];
        }
        return undefined;
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Auto-dispatches the return value of the decorated function.
     *
     * Decorate a function creator method with \@dispatch and its return
     * value will automatically be passed to ngRedux.dispatch() for you.
     * @return {?}
     */
    function dispatch() {
        return function decorate(target, key, descriptor) {
            /** @type {?} */
            var originalMethod;
            /** @type {?} */
            var wrapped = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                /** @type {?} */
                var result = originalMethod.apply(this, args);
                if (result !== false) {
                    /** @type {?} */
                    var store = getBaseStore(this) || NgRedux.instance;
                    if (store) {
                        store.dispatch(result);
                    }
                }
                return result;
            };
            descriptor = descriptor || Object.getOwnPropertyDescriptor(target, key);
            if (descriptor === undefined) {
                /** @type {?} */
                var dispatchDescriptor = {
                    get: function () { return wrapped; },
                    set: function (setMethod) { return (originalMethod = setMethod); },
                };
                Object.defineProperty(target, key, dispatchDescriptor);
                return dispatchDescriptor;
            }
            else {
                originalMethod = descriptor.value;
                descriptor.value = wrapped;
                return descriptor;
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Selects an observable from the store, and attaches it to the decorated
     * property.
     *
     * ```ts
     *  import { select } from '\@angular-redux/store';
     *
     *  class SomeClass {
     * \@select(['foo','bar']) foo$: Observable<string>
     * }
     * ```
     *
     * @template T
     * @param {?=} selector
     * A selector function, property name string, or property name path
     * (array of strings/array indices) that locates the store data to be
     * selected
     *
     * @param {?=} comparator Function used to determine if this selector has changed.
     * @return {?}
     */
    function select(selector, comparator) {
        return function (target, key) {
            /** @type {?} */
            var adjustedSelector = selector
                ? selector
                : String(key).lastIndexOf('$') === String(key).length - 1
                    ? String(key).substring(0, String(key).length - 1)
                    : key;
            decorate(adjustedSelector, undefined, comparator)(target, key);
        };
    }
    /**
     * Selects an observable using the given path selector, and runs it through the
     * given transformer function. A transformer function takes the store
     * observable as an input and returns a derived observable from it. That derived
     *  observable is run through distinctUntilChanges with the given optional
     * comparator and attached to the store property.
     *
     * Think of a Transformer as a FunctionSelector that operates on observables
     * instead of values.
     *
     * ```ts
     * import { select$ } from 'angular-redux/store';
     *
     * export const debounceAndTriple = obs$ => obs$
     *  .debounce(300)
     *  .map(x => 3 * x);
     *
     * class Foo {
     * \@select$(['foo', 'bar'], debounceAndTriple)
     *  readonly debouncedFooBar$: Observable<number>;
     * }
     * ```
     * @template T
     * @param {?} selector
     * @param {?} transformer
     * @param {?=} comparator
     * @return {?}
     */
    function select$(selector, transformer, comparator) {
        return decorate(selector, transformer, comparator);
    }
    /**
     * @param {?} selector
     * @param {?=} transformer
     * @param {?=} comparator
     * @return {?}
     */
    function decorate(selector, transformer, comparator) {
        return function decorator(target, key) {
            /**
             * @this {?}
             * @return {?}
             */
            function getter() {
                return getInstanceSelection(this, key, selector, transformer, comparator);
            }
            // Replace decorated property with a getter that returns the observable.
            if (delete target[key]) {
                Object.defineProperty(target, key, {
                    get: getter,
                    enumerable: true,
                    configurable: true,
                });
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Modifies the behaviour of any `\@select`, `\@select$`, or `\@dispatch`
     * decorators to operate on a substore defined by the IFractalStoreOptions.
     *
     * See:
     * https://github.com/angular-redux/store/blob/master/articles/fractal-store.md
     * for more information about SubStores.
     * @param {?} __0
     * @return {?}
     */
    function WithSubStore(_a) {
        var basePathMethodName = _a.basePathMethodName, localReducer = _a.localReducer;
        return function decorate(constructor) {
            setClassOptions(constructor, {
                basePathMethodName: basePathMethodName,
                localReducer: localReducer,
            });
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * @hidden
      @type {?} */
    var assert = function (condition, message) {
        if (!condition) {
            throw new Error(message);
        }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * @hidden
      @type {?} */
    var sniffSelectorType = function (selector) {
        return !selector
            ? 'nil'
            : Array.isArray(selector)
                ? 'path'
                : 'function' === typeof selector
                    ? 'function'
                    : 'property';
    };
    /** *
     * @hidden
      @type {?} */
    var resolver = function (selector) {
        return ({
            property: function (state) {
                return state ? state[(selector)] : undefined;
            },
            path: function (state) { return getIn(state, /** @type {?} */ (selector)); },
            function: /** @type {?} */ (selector),
            nil: function (state) { return state; },
        });
    };
    /** *
     * @hidden
      @type {?} */
    var resolveToFunctionSelector = function (selector) { return resolver(selector)[sniffSelectorType(selector)]; };

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
     */ SubStore = (function () {
        function SubStore(rootStore, basePath, localReducer) {
            var _this = this;
            this.rootStore = rootStore;
            this.basePath = basePath;
            this.dispatch = function (action) {
                return _this.rootStore.dispatch(__assign({}, ((action)), { '@angular-redux::fractalkey': JSON.stringify(_this.basePath) }));
            };
            this.getState = function () { return getIn(_this.rootStore.getState(), _this.basePath); };
            this.configureSubStore = function (basePath, localReducer) {
                return new SubStore(_this.rootStore, __spread(_this.basePath, basePath), localReducer);
            };
            this.select = function (selector, comparator) {
                return _this.rootStore.select(_this.basePath).pipe(operators.map(resolveToFunctionSelector(selector)), operators.distinctUntilChanged(comparator));
            };
            this.subscribe = function (listener) {
                /** @type {?} */
                var subscription = _this.select().subscribe(listener);
                return function () { return subscription.unsubscribe(); };
            };
            this.replaceReducer = function (nextLocalReducer) {
                return replaceLocalReducer(_this.basePath, nextLocalReducer);
            };
            registerFractalReducer(basePath, localReducer);
        }
        return SubStore;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @hidden
     * @template RootState
     */
    var /**
     * @hidden
     * @template RootState
     */ RootStore = (function (_super) {
        __extends(RootStore, _super);
        function RootStore(ngZone) {
            var _this = _super.call(this) || this;
            _this.ngZone = ngZone;
            _this.store = undefined;
            _this.configureStore = function (rootReducer, initState, middleware, enhancers) {
                if (middleware === void 0) {
                    middleware = [];
                }
                if (enhancers === void 0) {
                    enhancers = [];
                }
                assert(!_this.store, 'Store already configured!');
                // Variable-arity compose in typescript FTW.
                // Variable-arity compose in typescript FTW.
                _this.setStore(redux.compose.apply(null, __spread([redux.applyMiddleware.apply(void 0, __spread(middleware))], enhancers))(redux.createStore)(enableFractalReducers(rootReducer), initState));
            };
            _this.provideStore = function (store) {
                assert(!_this.store, 'Store already configured!');
                _this.setStore(store);
            };
            _this.getState = function () { return ((_this.store)).getState(); };
            _this.subscribe = function (listener) { return ((_this.store)).subscribe(listener); };
            _this.replaceReducer = function (nextReducer) {
                /** @type {?} */ ((_this.store)).replaceReducer(nextReducer);
            };
            _this.dispatch = function (action) {
                assert(!!_this.store, 'Dispatch failed: did you forget to configure your store? ' +
                    'https://github.com/angular-redux/@angular-redux/core/blob/master/' +
                    'README.md#quick-start');
                if (!core.NgZone.isInAngularZone()) {
                    return _this.ngZone.run(function () { return ((_this.store)).dispatch(action); });
                }
                else {
                    return /** @type {?} */ ((_this.store)).dispatch(action);
                }
            };
            _this.select = function (selector, comparator) {
                return _this.store$.pipe(operators.distinctUntilChanged(), operators.map(resolveToFunctionSelector(selector)), operators.distinctUntilChanged(comparator));
            };
            _this.configureSubStore = function (basePath, localReducer) {
                return new SubStore(_this, basePath, localReducer);
            };
            _this.storeToObservable = function (store) {
                return new rxjs.Observable(function (observer) {
                    observer.next(store.getState());
                    /** @type {?} */
                    var unsubscribeFromRedux = store.subscribe(function () {
                        return observer.next(store.getState());
                    });
                    return function () {
                        unsubscribeFromRedux();
                        observer.complete();
                    };
                });
            };
            NgRedux.instance = _this;
            _this.store$ = /** @type {?} */ (new rxjs.BehaviorSubject(undefined).pipe(operators.filter(function (n) { return n !== undefined; }), operators.switchMap(function (observableStore) { return (observableStore); })));
            return _this;
        }
        /**
         * @param {?} store
         * @return {?}
         */
        RootStore.prototype.setStore = /**
         * @param {?} store
         * @return {?}
         */
            function (store) {
                this.store = store;
                /** @type {?} */
                var storeServable = this.storeToObservable(store);
                this.store$.next(/** @type {?} */ (storeServable));
            };
        return RootStore;
    }(NgRedux));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @hidden
     * @param {?} ngZone
     * @return {?}
     */
    function _ngReduxFactory(ngZone) {
        return new RootStore(ngZone);
    }
    var NgReduxModule = (function () {
        function NgReduxModule() {
        }
        NgReduxModule.decorators = [
            { type: core.NgModule, args: [{
                        providers: [
                            DevToolsExtension,
                            { provide: NgRedux, useFactory: _ngReduxFactory, deps: [core.NgZone] },
                        ],
                    },] },
        ];
        return NgReduxModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.NgRedux = NgRedux;
    exports.NgReduxModule = NgReduxModule;
    exports.DevToolsExtension = DevToolsExtension;
    exports.enableFractalReducers = enableFractalReducers;
    exports.select = select;
    exports.select$ = select$;
    exports.dispatch = dispatch;
    exports.WithSubStore = WithSubStore;
    exports.ɵb = RootStore;
    exports.ɵa = _ngReduxFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1yZWR1eC1zdG9yZS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL2NvbXBvbmVudHMvbmctcmVkdXgudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL2NvbXBvbmVudHMvZGV2LXRvb2xzLnRzIixudWxsLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL3V0aWxzL2dldC1pbi50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvdXRpbHMvc2V0LWluLnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS9jb21wb25lbnRzL2ZyYWN0YWwtcmVkdWNlci1tYXAudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL2RlY29yYXRvcnMvaGVscGVycy50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvZGVjb3JhdG9ycy9kaXNwYXRjaC50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvZGVjb3JhdG9ycy9zZWxlY3QudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL2RlY29yYXRvcnMvd2l0aC1zdWItc3RvcmUudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL3V0aWxzL2Fzc2VydC50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvY29tcG9uZW50cy9zZWxlY3RvcnMudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL2NvbXBvbmVudHMvc3ViLXN0b3JlLnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS9jb21wb25lbnRzL3Jvb3Qtc3RvcmUudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL25nLXJlZHV4Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBbnlBY3Rpb24sXG4gIERpc3BhdGNoLFxuICBNaWRkbGV3YXJlLFxuICBSZWR1Y2VyLFxuICBTdG9yZSxcbiAgU3RvcmVFbmhhbmNlcixcbiAgVW5zdWJzY3JpYmUsXG59IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9ic2VydmFibGVTdG9yZSB9IGZyb20gJy4vb2JzZXJ2YWJsZS1zdG9yZSc7XG5pbXBvcnQgeyBDb21wYXJhdG9yLCBQYXRoU2VsZWN0b3IsIFNlbGVjdG9yIH0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIHB1YmxpYyBpbnRlcmZhY2Ugb2YgQGFuZ3VsYXItcmVkdXgvc3RvcmUuIEl0IHdyYXBzIHRoZSBnbG9iYWxcbiAqIHJlZHV4IHN0b3JlIGFuZCBhZGRzIGEgZmV3IG90aGVyIGFkZCBvbiBtZXRob2RzLiBJdCdzIHdoYXQgeW91J2xsIGluamVjdFxuICogaW50byB5b3VyIEFuZ3VsYXIgYXBwbGljYXRpb24gYXMgYSBzZXJ2aWNlLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdSZWR1eDxSb290U3RhdGU+IGltcGxlbWVudHMgT2JzZXJ2YWJsZVN0b3JlPFJvb3RTdGF0ZT4ge1xuICAvKiogQGhpZGRlbiwgQGRlcHJlY2F0ZWQgKi9cbiAgc3RhdGljIGluc3RhbmNlPzogT2JzZXJ2YWJsZVN0b3JlPGFueT4gPSB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgYSBSZWR1eCBzdG9yZSBhbmQgYWxsb3dzIE5nUmVkdXggdG8gb2JzZXJ2ZSBhbmQgZGlzcGF0Y2hcbiAgICogdG8gaXQuXG4gICAqXG4gICAqIFRoaXMgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uY2UgZm9yIHRoZSBsaWZldGltZSBvZiB5b3VyIGFwcCwgZm9yXG4gICAqIGV4YW1wbGUgaW4gdGhlIGNvbnN0cnVjdG9yIG9mIHlvdXIgcm9vdCBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSByb290UmVkdWNlciBZb3VyIGFwcCdzIHJvb3QgcmVkdWNlclxuICAgKiBAcGFyYW0gaW5pdFN0YXRlIFlvdXIgYXBwJ3MgaW5pdGlhbCBzdGF0ZVxuICAgKiBAcGFyYW0gbWlkZGxld2FyZSBPcHRpb25hbCBSZWR1eCBtaWRkbGV3YXJlc1xuICAgKiBAcGFyYW0gZW5oYW5jZXJzIE9wdGlvbmFsIFJlZHV4IHN0b3JlIGVuaGFuY2Vyc1xuICAgKi9cbiAgYWJzdHJhY3QgY29uZmlndXJlU3RvcmU6IChcbiAgICByb290UmVkdWNlcjogUmVkdWNlcjxSb290U3RhdGUsIEFueUFjdGlvbj4sXG4gICAgaW5pdFN0YXRlOiBSb290U3RhdGUsXG4gICAgbWlkZGxld2FyZT86IE1pZGRsZXdhcmVbXSxcbiAgICBlbmhhbmNlcnM/OiBTdG9yZUVuaGFuY2VyPFJvb3RTdGF0ZT5bXSxcbiAgKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBY2NlcHRzIGEgUmVkdXggc3RvcmUsIHRoZW4gc2V0cyBpdCBpbiBOZ1JlZHV4IGFuZFxuICAgKiBhbGxvd3MgTmdSZWR1eCB0byBvYnNlcnZlIGFuZCBkaXNwYXRjaCB0byBpdC5cbiAgICpcbiAgICogVGhpcyBzaG91bGQgb25seSBiZSBjYWxsZWQgb25jZSBmb3IgdGhlIGxpZmV0aW1lIG9mIHlvdXIgYXBwLCBmb3JcbiAgICogZXhhbXBsZSBpbiB0aGUgY29uc3RydWN0b3Igb2YgeW91ciByb290IGNvbXBvbmVudC4gSWYgY29uZmlndXJlU3RvcmVcbiAgICogaGFzIGJlZW4gdXNlZCB0aGlzIGNhbm5vdCBiZSB1c2VkLlxuICAgKlxuICAgKiBAcGFyYW0gc3RvcmUgWW91ciBhcHAncyBzdG9yZVxuICAgKi9cbiAgYWJzdHJhY3QgcHJvdmlkZVN0b3JlOiAoc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4pID0+IHZvaWQ7XG5cbiAgLy8gUmVkdXggU3RvcmUgbWV0aG9kc1xuICBhYnN0cmFjdCBkaXNwYXRjaDogRGlzcGF0Y2g8QW55QWN0aW9uPjtcbiAgYWJzdHJhY3QgZ2V0U3RhdGU6ICgpID0+IFJvb3RTdGF0ZTtcbiAgYWJzdHJhY3Qgc3Vic2NyaWJlOiAobGlzdGVuZXI6ICgpID0+IHZvaWQpID0+IFVuc3Vic2NyaWJlO1xuICBhYnN0cmFjdCByZXBsYWNlUmVkdWNlcjogKG5leHRSZWR1Y2VyOiBSZWR1Y2VyPFJvb3RTdGF0ZSwgQW55QWN0aW9uPikgPT4gdm9pZDtcblxuICAvLyBPYnNlcnZhYmxlU3RvcmUgbWV0aG9kcy5cbiAgYWJzdHJhY3Qgc2VsZWN0OiA8U2VsZWN0ZWRUeXBlPihcbiAgICBzZWxlY3Rvcj86IFNlbGVjdG9yPFJvb3RTdGF0ZSwgU2VsZWN0ZWRUeXBlPixcbiAgICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbiAgKSA9PiBPYnNlcnZhYmxlPFNlbGVjdGVkVHlwZT47XG4gIGFic3RyYWN0IGNvbmZpZ3VyZVN1YlN0b3JlOiA8U3ViU3RhdGU+KFxuICAgIGJhc2VQYXRoOiBQYXRoU2VsZWN0b3IsXG4gICAgbG9jYWxSZWR1Y2VyOiBSZWR1Y2VyPFN1YlN0YXRlLCBBbnlBY3Rpb24+LFxuICApID0+IE9ic2VydmFibGVTdG9yZTxTdWJTdGF0ZT47XG59XG4iLCJpbXBvcnQgeyBBcHBsaWNhdGlvblJlZiwgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbnlBY3Rpb24sIFN0b3JlRW5oYW5jZXIsIFVuc3Vic2NyaWJlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgRW5oYW5jZXJPcHRpb25zIH0gZnJvbSAncmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uJztcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICcuL25nLXJlZHV4JztcblxuZXhwb3J0IGludGVyZmFjZSBSZWR1eERldlRvb2xzIHtcbiAgKG9wdGlvbnM6IEVuaGFuY2VyT3B0aW9ucyk6IFN0b3JlRW5oYW5jZXI8YW55PjtcbiAgbGlzdGVuOiAoXG4gICAgb25NZXNzYWdlOiAobWVzc2FnZTogQW55QWN0aW9uKSA9PiB2b2lkLFxuICAgIGluc3RhbmNlSWQ/OiBzdHJpbmcsXG4gICkgPT4gdm9pZDtcbn1cblxuaW50ZXJmYWNlIFdpbmRvd1dpdGhSZWR1eERldlRvb2xzIGV4dGVuZHMgV2luZG93IHtcbiAgX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXz86IFJlZHV4RGV2VG9vbHM7XG4gIGRldlRvb2xzRXh0ZW5zaW9uPzogUmVkdXhEZXZUb29scztcbn1cblxuY29uc3QgZW52aXJvbm1lbnQ6IFdpbmRvd1dpdGhSZWR1eERldlRvb2xzID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gID8gd2luZG93XG4gIDoge30pIGFzIFdpbmRvd1dpdGhSZWR1eERldlRvb2xzO1xuXG4vKipcbiAqIEFuIGFuZ3VsYXItMi1pZmllZCB2ZXJzaW9uIG9mIHRoZSBSZWR1eCBEZXZUb29scyBjaHJvbWUgZXh0ZW5zaW9uLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGV2VG9vbHNFeHRlbnNpb24ge1xuICAvKiogQGhpZGRlbiAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsIHByaXZhdGUgbmdSZWR1eDogTmdSZWR1eDxhbnk+KSB7fVxuXG4gIC8qKlxuICAgKiBBIHdyYXBwZXIgZm9yIHRoZSBDaHJvbWUgRXh0ZW5zaW9uIFJlZHV4IERldlRvb2xzLlxuICAgKiBNYWtlcyBzdXJlIHN0YXRlIGNoYW5nZXMgdHJpZ2dlcmVkIGJ5IHRoZSBleHRlbnNpb25cbiAgICogdHJpZ2dlciBBbmd1bGFyMidzIGNoYW5nZSBkZXRlY3Rvci5cbiAgICpcbiAgICogQGFyZ3VtZW50IG9wdGlvbnM6IGRldiB0b29sIG9wdGlvbnM7IHNhbWVcbiAgICogZm9ybWF0IGFzIGRlc2NyaWJlZCBoZXJlOlxuICAgKiBbemFsbW94aXN1cy9yZWR1eC1kZXZ0b29scy1leHRlbnNpb24vYmxvYi9tYXN0ZXIvZG9jcy9BUEkvQXJndW1lbnRzLm1kXVxuICAgKi9cbiAgZW5oYW5jZXIgPSAob3B0aW9ucz86IEVuaGFuY2VyT3B0aW9ucykgPT4ge1xuICAgIGxldCBzdWJzY3JpcHRpb246IFVuc3Vic2NyaWJlO1xuICAgIGlmICghdGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIGNoYW5nZXMgZnJvbSBkZXYgdG9vbHMgdXBkYXRlIGFuZ3VsYXIncyB2aWV3LlxuICAgIHRoaXMuZ2V0RGV2VG9vbHMoKSEubGlzdGVuKCh7IHR5cGUgfSkgPT4ge1xuICAgICAgaWYgKHR5cGUgPT09ICdTVEFSVCcpIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0gdGhpcy5uZ1JlZHV4LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgaWYgKCFOZ1pvbmUuaXNJbkFuZ3VsYXJab25lKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwUmVmLnRpY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnU1RPUCcpIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXREZXZUb29scygpIShvcHRpb25zIHx8IHt9KTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBleHRlbnNpb24gaXMgaW5zdGFsbGVkIGFuZCBlbmFibGVkLlxuICAgKi9cbiAgaXNFbmFibGVkID0gKCkgPT4gISF0aGlzLmdldERldlRvb2xzKCk7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJlZHV4IGRldnRvb2xzIGVuaGFuY2VyLlxuICAgKi9cbiAgZ2V0RGV2VG9vbHMgPSAoKSA9PlxuICAgIGVudmlyb25tZW50ICYmXG4gICAgKGVudmlyb25tZW50Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX18gfHwgZW52aXJvbm1lbnQuZGV2VG9vbHNFeHRlbnNpb24pO1xufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCIvKipcbiAqIEdldHMgYSBkZWVwbHktbmVzdGVkIHByb3BlcnR5IHZhbHVlIGZyb20gYW4gb2JqZWN0LCBnaXZlbiBhICdwYXRoJ1xuICogb2YgcHJvcGVydHkgbmFtZXMgb3IgYXJyYXkgaW5kaWNlcy5cbiAqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbihcbiAgdjogYW55IHwgdW5kZWZpbmVkLFxuICBwYXRoRWxlbXM6IChzdHJpbmcgfCBudW1iZXIpW10sXG4pOiBhbnkgfCB1bmRlZmluZWQge1xuICBpZiAoIXYpIHtcbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIC8vIElmIHRoaXMgaXMgYW4gSW1tdXRhYmxlSlMgc3RydWN0dXJlLCB1c2UgZXhpc3RpbmcgZ2V0SW4gZnVuY3Rpb25cbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiB2LmdldEluKSB7XG4gICAgcmV0dXJuIHYuZ2V0SW4ocGF0aEVsZW1zKTtcbiAgfVxuXG4gIGNvbnN0IFtmaXJzdEVsZW0sIC4uLnJlc3RFbGVtc10gPSBwYXRoRWxlbXM7XG5cbiAgaWYgKHVuZGVmaW5lZCA9PT0gdltmaXJzdEVsZW1dKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmIChyZXN0RWxlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHZbZmlyc3RFbGVtXTtcbiAgfVxuXG4gIHJldHVybiBnZXRJbih2W2ZpcnN0RWxlbV0sIHJlc3RFbGVtcyk7XG59XG4iLCIvKipcbiAqIFNldHMgYSBkZWVwbHktbmVzdGVkIHByb3BlcnR5IHZhbHVlIGZyb20gYW4gb2JqZWN0LCBnaXZlbiBhICdwYXRoJ1xuICogb2YgcHJvcGVydHkgbmFtZXMgb3IgYXJyYXkgaW5kaWNlcy4gUGF0aCBlbGVtZW50cyBhcmUgY3JlYXRlZCBpZlxuICogbm90IHRoZXJlIGFscmVhZHkuIERvZXMgbm90IG11dGF0ZSB0aGUgZ2l2ZW4gb2JqZWN0LlxuICpcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGNvbnN0IHNldEluID0gKFxuICBvYmo6IGFueSxcbiAgW2ZpcnN0RWxlbSwgLi4ucmVzdEVsZW1zXTogKHN0cmluZyB8IG51bWJlcilbXSxcbiAgdmFsdWU6IGFueSxcbik6IG9iamVjdCA9PlxuICAnZnVuY3Rpb24nID09PSB0eXBlb2YgKG9ialtmaXJzdEVsZW1dIHx8IHt9KS5zZXRJblxuICAgID8ge1xuICAgICAgICAuLi5vYmosXG4gICAgICAgIFtmaXJzdEVsZW1dOiBvYmpbZmlyc3RFbGVtXS5zZXRJbihyZXN0RWxlbXMsIHZhbHVlKSxcbiAgICAgIH1cbiAgICA6IHtcbiAgICAgICAgLi4ub2JqLFxuICAgICAgICBbZmlyc3RFbGVtXTpcbiAgICAgICAgICByZXN0RWxlbXMubGVuZ3RoID09PSAwXG4gICAgICAgICAgICA/IHZhbHVlXG4gICAgICAgICAgICA6IHNldEluKG9ialtmaXJzdEVsZW1dIHx8IHt9LCByZXN0RWxlbXMsIHZhbHVlKSxcbiAgICAgIH07XG4iLCJpbXBvcnQgeyBBbnlBY3Rpb24sIFJlZHVjZXIgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBnZXRJbiB9IGZyb20gJy4uL3V0aWxzL2dldC1pbic7XG5pbXBvcnQgeyBzZXRJbiB9IGZyb20gJy4uL3V0aWxzL3NldC1pbic7XG5pbXBvcnQgeyBQYXRoU2VsZWN0b3IgfSBmcm9tICcuL3NlbGVjdG9ycyc7XG5cbmxldCByZWR1Y2VyTWFwOiB7IFtpZDogc3RyaW5nXTogUmVkdWNlcjxhbnksIEFueUFjdGlvbj4gfSA9IHt9O1xuXG5jb25zdCBjb21wb3NlUmVkdWNlcnMgPSAoXG4gIC4uLnJlZHVjZXJzOiBSZWR1Y2VyPGFueSwgQW55QWN0aW9uPltdXG4pOiBSZWR1Y2VyPGFueSwgQW55QWN0aW9uPiA9PiAoc3RhdGU6IGFueSwgYWN0aW9uOiBBbnlBY3Rpb24pID0+XG4gIHJlZHVjZXJzLnJlZHVjZSgoc3ViU3RhdGUsIHJlZHVjZXIpID0+IHJlZHVjZXIoc3ViU3RhdGUsIGFjdGlvbiksIHN0YXRlKTtcblxuLyoqXG4gKiBAcGFyYW0gcm9vdFJlZHVjZXIgQ2FsbCB0aGlzIG9uIHlvdXIgcm9vdCByZWR1Y2VyIHRvIGVuYWJsZSBTdWJTdG9yZVxuICogZnVuY3Rpb25hbGl0eSBmb3IgcHJlLWNvbmZpZ3VyZWQgc3RvcmVzIChlLmcuIHVzaW5nIE5nUmVkdXgucHJvdmlkZVN0b3JlKCkpLlxuICogTmdSZWR1eC5jb25maWd1cmVTdG9yZVxuICogZG9lcyBpdCBmb3IgeW91IHVuZGVyIHRoZSBob29kLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlRnJhY3RhbFJlZHVjZXJzKHJvb3RSZWR1Y2VyOiBSZWR1Y2VyPGFueSwgQW55QWN0aW9uPikge1xuICByZWR1Y2VyTWFwID0ge307XG4gIHJldHVybiBjb21wb3NlUmVkdWNlcnMocm9vdEZyYWN0YWxSZWR1Y2VyLCByb290UmVkdWNlcik7XG59XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJGcmFjdGFsUmVkdWNlcihcbiAgYmFzZVBhdGg6IFBhdGhTZWxlY3RvcixcbiAgbG9jYWxSZWR1Y2VyOiBSZWR1Y2VyPGFueSwgQW55QWN0aW9uPixcbik6IHZvaWQge1xuICBjb25zdCBleGlzdGluZ0ZyYWN0YWxSZWR1Y2VyID0gcmVkdWNlck1hcFtKU09OLnN0cmluZ2lmeShiYXNlUGF0aCldO1xuICBpZiAoZXhpc3RpbmdGcmFjdGFsUmVkdWNlciAmJiBleGlzdGluZ0ZyYWN0YWxSZWR1Y2VyICE9PSBsb2NhbFJlZHVjZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgYXR0ZW1wdCB0byBvdmVyd3JpdGUgZnJhY3RhbCByZWR1Y2VyIGZvciBiYXNlUGF0aCAke2Jhc2VQYXRofWAsXG4gICAgKTtcbiAgfVxuXG4gIHJlZHVjZXJNYXBbSlNPTi5zdHJpbmdpZnkoYmFzZVBhdGgpXSA9IGxvY2FsUmVkdWNlcjtcbn1cblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTG9jYWxSZWR1Y2VyKFxuICBiYXNlUGF0aDogUGF0aFNlbGVjdG9yLFxuICBuZXh0TG9jYWxSZWR1Y2VyOiBSZWR1Y2VyPGFueSwgQW55QWN0aW9uPixcbik6IHZvaWQge1xuICByZWR1Y2VyTWFwW0pTT04uc3RyaW5naWZ5KGJhc2VQYXRoKV0gPSBuZXh0TG9jYWxSZWR1Y2VyO1xufVxuXG5mdW5jdGlvbiByb290RnJhY3RhbFJlZHVjZXIoXG4gIHN0YXRlOiB7fSA9IHt9LFxuICBhY3Rpb246IEFueUFjdGlvbiAmIHsgJ0Bhbmd1bGFyLXJlZHV4OjpmcmFjdGFsa2V5Jz86IHN0cmluZyB9LFxuKSB7XG4gIGNvbnN0IGZyYWN0YWxLZXkgPSBhY3Rpb25bJ0Bhbmd1bGFyLXJlZHV4OjpmcmFjdGFsa2V5J107XG4gIGNvbnN0IGZyYWN0YWxQYXRoID0gZnJhY3RhbEtleSA/IEpTT04ucGFyc2UoZnJhY3RhbEtleSkgOiBbXTtcbiAgY29uc3QgbG9jYWxSZWR1Y2VyID0gcmVkdWNlck1hcFtmcmFjdGFsS2V5IHx8ICcnXTtcbiAgcmV0dXJuIGZyYWN0YWxLZXkgJiYgbG9jYWxSZWR1Y2VyXG4gICAgPyBzZXRJbihzdGF0ZSwgZnJhY3RhbFBhdGgsIGxvY2FsUmVkdWNlcihnZXRJbihzdGF0ZSwgZnJhY3RhbFBhdGgpLCBhY3Rpb24pKVxuICAgIDogc3RhdGU7XG59XG4iLCJpbXBvcnQgeyBBbnlBY3Rpb24sIFJlZHVjZXIgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICcuLi9jb21wb25lbnRzL25nLXJlZHV4JztcbmltcG9ydCB7IE9ic2VydmFibGVTdG9yZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvb2JzZXJ2YWJsZS1zdG9yZSc7XG5pbXBvcnQge1xuICBDb21wYXJhdG9yLFxuICBQYXRoU2VsZWN0b3IsXG4gIFNlbGVjdG9yLFxuICBUcmFuc2Zvcm1lcixcbn0gZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3RvcnMnO1xuXG4vKipcbiAqIFVzZWQgd2l0aCB0aGUgYEBXaXRoU3ViU3RvcmVgIGNsYXNzIGRlY29yYXRvciB0byBkZWZpbmUgYSBTdWJTdG9yZSAoQUtBIGFcbiAqIGZyYWN0YWwgc3RvcmUpLlxuICpcbiAqIEZvciBtb3JlIGluZm8gb24gc3Vic3RvcmVzLCBzZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyLXJlZHV4L3N0b3JlL2Jsb2IvbWFzdGVyL2FydGljbGVzL2ZyYWN0YWwtc3RvcmUubWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGcmFjdGFsU3RvcmVPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIGFuIGluc3RhbmNlIG1ldGhvZCB0aGF0IHdpbGwgZGVmaW5lIHRoZVxuICAgKiBiYXNlIHBhdGggZm9yIHRoZSBzdWJTdG9yZS4gVGhpcyBtZXRob2QgaXMgZXhwZWN0ZWQgdG8gcmV0dXJuIGFuIGFycmF5XG4gICAqIG9mIHByb3BlcnR5IG5hbWVzIG9yIHVuZGVmaW5lZC9udWxsLlxuICAgKi9cbiAgYmFzZVBhdGhNZXRob2ROYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBsb2NhbFJlZHVjZXIgZm9yIHRoZSBzdWJzdG9yZSBpbiBxdWVzdGlvbi5cbiAgICovXG4gIGxvY2FsUmVkdWNlcjogUmVkdWNlcjxhbnksIEFueUFjdGlvbj47XG59XG5cbi8qKlxuICogT1BUSU9OU19LRVk6IHRoaXMgaXMgcGVyLWNsYXNzIChzdGF0aWMpIGFuZCBob2xkcyB0aGUgY29uZmlnIGZyb20gdGhlXG4gKiBAU3ViU3RvcmUgZGVjb3JhdG9yLlxuICovXG5jb25zdCBPUFRJT05TX0tFWSA9ICdAYW5ndWxhci1yZWR1eDo6c3Vic3RvcmU6OmNsYXNzOjpvcHRpb25zJztcblxuLyoqXG4gKiBJTlNUQU5DRV9TVUJTVE9SRV9LRVksIElOU1RBTkNFX1NFTEVDVElPTlNfS0VZOiB0aGVzZSBhcmUgcGVyLWluc3RhbmNlXG4gKiAobm9uLXN0YXRpYykgYW5kIGhvbGRzIHJlZmVyZW5jZXMgdG8gdGhlIHN1YnN0b3Jlcy9zZWxlY3RlZCBvYnNlcnZhYmxlc1xuICogdG8gYmUgdXNlZCBieSBhbiBpbnN0YW5jZSBvZiBhIGRlY29yYXRlZCBjbGFzcy4gSSdtIG5vdCB1c2luZ1xuICogcmVmbGVjdC1tZXRhZGF0YSBoZXJlIGJlY2F1c2UgSSB3YW50XG4gKlxuICogMS4gZGlmZmVyZW50IGluc3RhbmNlcyB0byBoYXZlIGRpZmZlcmVudCBzdWJzdG9yZXMgaW4gdGhlIGNhc2Ugd2hlcmVcbiAqIGBiYXNlUGF0aE1ldGhvZE5hbWVgIGlzIGR5bmFtaWMuXG4gKiAyLiB0aGUgaW5zdGFuY2Ugc3Vic3RvcmUgdG8gYmUgZ2FyYmFnZSBjb2xsZWN0ZWQgd2hlbiB0aGUgaW5zdGFuY2UgaXMgbm9cbiAqIGxvbmdlciByZWFjaGFibGUuXG4gKiBUaGlzIGlzIHRoZXJlZm9yZSBhbiBvd24tcHJvcGVydHkgb24gdGhlIGFjdHVhbCBpbnN0YW5jZSBvZiB0aGUgZGVjb3JhdGVkXG4gKiBjbGFzcy5cbiAqL1xuY29uc3QgSU5TVEFOQ0VfU1VCU1RPUkVfS0VZID0gJ0Bhbmd1bGFyLXJlZHV4OjpzdWJzdG9yZTo6aW5zdGFuY2U6OnN0b3JlJztcbmNvbnN0IElOU1RBTkNFX1NFTEVDVElPTlNfS0VZID1cbiAgJ0Bhbmd1bGFyLXJlZHV4OjpzdWJzdG9yZTo6aW5zdGFuY2U6OnNlbGVjdGlvbnMnO1xuXG4vKipcbiAqIFVzZWQgdG8gZGV0ZWN0IHdoZW4gdGhlIGJhc2UgcGF0aCBjaGFuZ2VzIC0gdGhpcyBhbGxvd3MgY29tcG9uZW50cyB0b1xuICogZHluYW1pY2FsbHkgYWRqdXN0IHRoZWlyIHNlbGVjdGlvbnMgaWYgbmVjZXNzYXJ5LlxuICovXG5jb25zdCBJTlNUQU5DRV9CQVNFX1BBVEhfS0VZID0gJ0Bhbmd1bGFyLXJlZHV4OjpzdWJzdG9yZTo6aW5zdGFuY2U6OmJhc2VwYXRoJztcblxuY29uc3QgZ2V0Q2xhc3NPcHRpb25zID0gKGRlY29yYXRlZEluc3RhbmNlOiBhbnkpOiBGcmFjdGFsU3RvcmVPcHRpb25zID0+XG4gIGRlY29yYXRlZEluc3RhbmNlLmNvbnN0cnVjdG9yW09QVElPTlNfS0VZXTtcblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBjb25zdCBzZXRDbGFzc09wdGlvbnMgPSAoXG4gIGRlY29yYXRlZENsYXNzQ29uc3RydWN0b3I6IGFueSxcbiAgb3B0aW9uczogRnJhY3RhbFN0b3JlT3B0aW9ucyxcbik6IHZvaWQgPT4ge1xuICBkZWNvcmF0ZWRDbGFzc0NvbnN0cnVjdG9yW09QVElPTlNfS0VZXSA9IG9wdGlvbnM7XG59O1xuXG4vLyBJIHdhbnQgdGhlIHN0b3JlIHRvIGJlIHNhdmVkIG9uIHRoZSBhY3R1YWwgaW5zdGFuY2Ugc29cbi8vIDEuIGRpZmZlcmVudCBpbnN0YW5jZXMgY2FuIGhhdmUgZGlzdGluY3Qgc3Vic3RvcmVzIGlmIG5lY2Vzc2FyeVxuLy8gMi4gdGhlIHN1YnN0b3JlL3NlbGVjdGlvbnMgd2lsbCBiZSBtYXJrZWQgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbiB3aGVuIHRoZVxuLy8gICAgaW5zdGFuY2UgaXMgZGVzdHJveWVkLlxuY29uc3Qgc2V0SW5zdGFuY2VTdG9yZSA9IChcbiAgZGVjb3JhdGVkSW5zdGFuY2U6IGFueSxcbiAgc3RvcmU/OiBPYnNlcnZhYmxlU3RvcmU8YW55PixcbikgPT4gKGRlY29yYXRlZEluc3RhbmNlW0lOU1RBTkNFX1NVQlNUT1JFX0tFWV0gPSBzdG9yZSk7XG5cbmNvbnN0IGdldEluc3RhbmNlU3RvcmUgPSAoZGVjb3JhdGVkSW5zdGFuY2U6IGFueSk6IE9ic2VydmFibGVTdG9yZTxhbnk+ID0+XG4gIGRlY29yYXRlZEluc3RhbmNlW0lOU1RBTkNFX1NVQlNUT1JFX0tFWV07XG5cbmNvbnN0IGdldEluc3RhbmNlU2VsZWN0aW9uTWFwID0gKGRlY29yYXRlZEluc3RhbmNlOiBhbnkpID0+IHtcbiAgY29uc3QgbWFwID0gZGVjb3JhdGVkSW5zdGFuY2VbSU5TVEFOQ0VfU0VMRUNUSU9OU19LRVldIHx8IHt9O1xuICBkZWNvcmF0ZWRJbnN0YW5jZVtJTlNUQU5DRV9TRUxFQ1RJT05TX0tFWV0gPSBtYXA7XG4gIHJldHVybiBtYXA7XG59O1xuXG5jb25zdCBoYXNCYXNlUGF0aENoYW5nZWQgPSAoXG4gIGRlY29yYXRlZEluc3RhbmNlOiBhbnksXG4gIGJhc2VQYXRoPzogUGF0aFNlbGVjdG9yLFxuKTogYm9vbGVhbiA9PlxuICBkZWNvcmF0ZWRJbnN0YW5jZVtJTlNUQU5DRV9CQVNFX1BBVEhfS0VZXSAhPT0gKGJhc2VQYXRoIHx8IFtdKS50b1N0cmluZygpO1xuXG5jb25zdCBzZXRJbnN0YW5jZUJhc2VQYXRoID0gKFxuICBkZWNvcmF0ZWRJbnN0YW5jZTogYW55LFxuICBiYXNlUGF0aD86IFBhdGhTZWxlY3Rvcixcbik6IHZvaWQgPT4ge1xuICBkZWNvcmF0ZWRJbnN0YW5jZVtJTlNUQU5DRV9CQVNFX1BBVEhfS0VZXSA9IChiYXNlUGF0aCB8fCBbXSkudG9TdHJpbmcoKTtcbn07XG5cbmNvbnN0IGNsZWFySW5zdGFuY2VTdGF0ZSA9IChkZWNvcmF0ZWRJbnN0YW5jZTogYW55KSA9PiB7XG4gIGRlY29yYXRlZEluc3RhbmNlW0lOU1RBTkNFX1NFTEVDVElPTlNfS0VZXSA9IG51bGw7XG4gIGRlY29yYXRlZEluc3RhbmNlW0lOU1RBTkNFX1NVQlNUT1JFX0tFWV0gPSBudWxsO1xuICBkZWNvcmF0ZWRJbnN0YW5jZVtJTlNUQU5DRV9CQVNFX1BBVEhfS0VZXSA9IG51bGw7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHN0b3JlIGFzc29jaWF0ZWQgd2l0aCBhIGRlY29yYXRlZCBpbnN0YW5jZSAoZS5nLiBhXG4gKiBjb21wb25lbnQgb3Igc2VydmljZSlcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEJhc2VTdG9yZSA9IChcbiAgZGVjb3JhdGVkSW5zdGFuY2U6IGFueSxcbik6IE9ic2VydmFibGVTdG9yZTxhbnk+IHwgdW5kZWZpbmVkID0+IHtcbiAgLy8gVGhlIHJvb3Qgc3RvcmUgaGFzbid0IGJlZW4gc2V0IHVwIHlldC5cbiAgaWYgKCFOZ1JlZHV4Lmluc3RhbmNlKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IG9wdGlvbnMgPSBnZXRDbGFzc09wdGlvbnMoZGVjb3JhdGVkSW5zdGFuY2UpO1xuXG4gIC8vIFRoaXMgaXMgbm90IGRlY29yYXRlZCB3aXRoIGBAV2l0aFN1YlN0b3JlYC4gUmV0dXJuIHRoZSByb290IHN0b3JlLlxuICBpZiAoIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gTmdSZWR1eC5pbnN0YW5jZTtcbiAgfVxuXG4gIC8vIER5bmFtaWMgYmFzZSBwYXRoIHN1cHBvcnQ6XG4gIGNvbnN0IGJhc2VQYXRoID0gZGVjb3JhdGVkSW5zdGFuY2Vbb3B0aW9ucy5iYXNlUGF0aE1ldGhvZE5hbWVdKCk7XG4gIGlmIChoYXNCYXNlUGF0aENoYW5nZWQoZGVjb3JhdGVkSW5zdGFuY2UsIGJhc2VQYXRoKSkge1xuICAgIGNsZWFySW5zdGFuY2VTdGF0ZShkZWNvcmF0ZWRJbnN0YW5jZSk7XG4gICAgc2V0SW5zdGFuY2VCYXNlUGF0aChkZWNvcmF0ZWRJbnN0YW5jZSwgYmFzZVBhdGgpO1xuICB9XG5cbiAgaWYgKCFiYXNlUGF0aCkge1xuICAgIHJldHVybiBOZ1JlZHV4Lmluc3RhbmNlO1xuICB9XG5cbiAgY29uc3Qgc3RvcmUgPSBnZXRJbnN0YW5jZVN0b3JlKGRlY29yYXRlZEluc3RhbmNlKTtcbiAgaWYgKCFzdG9yZSkge1xuICAgIHNldEluc3RhbmNlU3RvcmUoXG4gICAgICBkZWNvcmF0ZWRJbnN0YW5jZSxcbiAgICAgIE5nUmVkdXguaW5zdGFuY2UuY29uZmlndXJlU3ViU3RvcmUoYmFzZVBhdGgsIG9wdGlvbnMubG9jYWxSZWR1Y2VyKSxcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGdldEluc3RhbmNlU3RvcmUoZGVjb3JhdGVkSW5zdGFuY2UpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIE9ic2VydmFibGUgZnJvbSB0aGUgZ2l2ZW4gc2VsZWN0aW9uIHBhcmFtZXRlcnMsXG4gKiByb290ZWQgYXQgZGVjb3JhdGVkSW5zdGFuY2UncyBzdG9yZSwgYW5kIGNhY2hlcyBpdCBvbiB0aGVcbiAqIGluc3RhbmNlIGZvciBmdXR1cmUgdXNlLlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY29uc3QgZ2V0SW5zdGFuY2VTZWxlY3Rpb24gPSA8VD4oXG4gIGRlY29yYXRlZEluc3RhbmNlOiBhbnksXG4gIGtleTogc3RyaW5nIHwgc3ltYm9sLFxuICBzZWxlY3RvcjogU2VsZWN0b3I8YW55LCBUPixcbiAgdHJhbnNmb3JtZXI/OiBUcmFuc2Zvcm1lcjxhbnksIFQ+LFxuICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbikgPT4ge1xuICBjb25zdCBzdG9yZSA9IGdldEJhc2VTdG9yZShkZWNvcmF0ZWRJbnN0YW5jZSk7XG5cbiAgaWYgKHN0b3JlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9ucyA9IGdldEluc3RhbmNlU2VsZWN0aW9uTWFwKGRlY29yYXRlZEluc3RhbmNlKTtcblxuICAgIHNlbGVjdGlvbnNba2V5XSA9XG4gICAgICBzZWxlY3Rpb25zW2tleV0gfHxcbiAgICAgICghdHJhbnNmb3JtZXJcbiAgICAgICAgPyBzdG9yZS5zZWxlY3Qoc2VsZWN0b3IsIGNvbXBhcmF0b3IpXG4gICAgICAgIDogc3RvcmUuc2VsZWN0KHNlbGVjdG9yKS5waXBlKFxuICAgICAgICAgICAgb2JzJCA9PiB0cmFuc2Zvcm1lcihvYnMkLCBkZWNvcmF0ZWRJbnN0YW5jZSksXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZChjb21wYXJhdG9yKSxcbiAgICAgICAgICApKTtcblxuICAgIHJldHVybiBzZWxlY3Rpb25zW2tleV07XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcbiIsImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICcuLi9jb21wb25lbnRzL25nLXJlZHV4JztcbmltcG9ydCB7IGdldEJhc2VTdG9yZSB9IGZyb20gJy4vaGVscGVycyc7XG5cbi8qKlxuICogQXV0by1kaXNwYXRjaGVzIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGRlY29yYXRlZCBmdW5jdGlvbi5cbiAqXG4gKiBEZWNvcmF0ZSBhIGZ1bmN0aW9uIGNyZWF0b3IgbWV0aG9kIHdpdGggQGRpc3BhdGNoIGFuZCBpdHMgcmV0dXJuXG4gKiB2YWx1ZSB3aWxsIGF1dG9tYXRpY2FsbHkgYmUgcGFzc2VkIHRvIG5nUmVkdXguZGlzcGF0Y2goKSBmb3IgeW91LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2goKTogUHJvcGVydHlEZWNvcmF0b3Ige1xuICByZXR1cm4gZnVuY3Rpb24gZGVjb3JhdGUoXG4gICAgdGFyZ2V0OiBvYmplY3QsXG4gICAga2V5OiBzdHJpbmcgfCBzeW1ib2wgfCBudW1iZXIsXG4gICAgZGVzY3JpcHRvcj86IFByb3BlcnR5RGVzY3JpcHRvcixcbiAgKTogUHJvcGVydHlEZXNjcmlwdG9yIHtcbiAgICBsZXQgb3JpZ2luYWxNZXRob2Q6ICgpID0+IHZvaWQ7XG5cbiAgICBjb25zdCB3cmFwcGVkID0gZnVuY3Rpb24odGhpczogYW55LCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gb3JpZ2luYWxNZXRob2QuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICBpZiAocmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBzdG9yZSA9IGdldEJhc2VTdG9yZSh0aGlzKSB8fCBOZ1JlZHV4Lmluc3RhbmNlO1xuICAgICAgICBpZiAoc3RvcmUpIHtcbiAgICAgICAgICBzdG9yZS5kaXNwYXRjaChyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICBkZXNjcmlwdG9yID0gZGVzY3JpcHRvciB8fCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgICBpZiAoZGVzY3JpcHRvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBkaXNwYXRjaERlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvciA9IHtcbiAgICAgICAgZ2V0OiAoKSA9PiB3cmFwcGVkLFxuICAgICAgICBzZXQ6IHNldE1ldGhvZCA9PiAob3JpZ2luYWxNZXRob2QgPSBzZXRNZXRob2QpLFxuICAgICAgfTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZGlzcGF0Y2hEZXNjcmlwdG9yKTtcbiAgICAgIHJldHVybiBkaXNwYXRjaERlc2NyaXB0b3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9yaWdpbmFsTWV0aG9kID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSB3cmFwcGVkO1xuICAgICAgcmV0dXJuIGRlc2NyaXB0b3I7XG4gICAgfVxuICB9O1xufVxuIiwiaW1wb3J0IHsgQ29tcGFyYXRvciwgU2VsZWN0b3IsIFRyYW5zZm9ybWVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3RvcnMnO1xuaW1wb3J0IHsgZ2V0SW5zdGFuY2VTZWxlY3Rpb24gfSBmcm9tICcuL2hlbHBlcnMnO1xuXG4vKipcbiAqIFNlbGVjdHMgYW4gb2JzZXJ2YWJsZSBmcm9tIHRoZSBzdG9yZSwgYW5kIGF0dGFjaGVzIGl0IHRvIHRoZSBkZWNvcmF0ZWRcbiAqIHByb3BlcnR5LlxuICpcbiAqIGBgYHRzXG4gKiAgaW1wb3J0IHsgc2VsZWN0IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuICpcbiAqICBjbGFzcyBTb21lQ2xhc3Mge1xuICogICAgQHNlbGVjdChbJ2ZvbycsJ2JhciddKSBmb28kOiBPYnNlcnZhYmxlPHN0cmluZz5cbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBzZWxlY3RvclxuICogQSBzZWxlY3RvciBmdW5jdGlvbiwgcHJvcGVydHkgbmFtZSBzdHJpbmcsIG9yIHByb3BlcnR5IG5hbWUgcGF0aFxuICogKGFycmF5IG9mIHN0cmluZ3MvYXJyYXkgaW5kaWNlcykgdGhhdCBsb2NhdGVzIHRoZSBzdG9yZSBkYXRhIHRvIGJlXG4gKiBzZWxlY3RlZFxuICpcbiAqIEBwYXJhbSBjb21wYXJhdG9yIEZ1bmN0aW9uIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHRoaXMgc2VsZWN0b3IgaGFzIGNoYW5nZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8VD4oXG4gIHNlbGVjdG9yPzogU2VsZWN0b3I8YW55LCBUPixcbiAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4pOiBQcm9wZXJ0eURlY29yYXRvciB7XG4gIHJldHVybiAodGFyZ2V0OiBhbnksIGtleTogc3RyaW5nIHwgc3ltYm9sKTogdm9pZCA9PiB7XG4gICAgY29uc3QgYWRqdXN0ZWRTZWxlY3RvciA9IHNlbGVjdG9yXG4gICAgICA/IHNlbGVjdG9yXG4gICAgICA6IFN0cmluZyhrZXkpLmxhc3RJbmRleE9mKCckJykgPT09IFN0cmluZyhrZXkpLmxlbmd0aCAtIDFcbiAgICAgICAgPyBTdHJpbmcoa2V5KS5zdWJzdHJpbmcoMCwgU3RyaW5nKGtleSkubGVuZ3RoIC0gMSlcbiAgICAgICAgOiBrZXk7XG4gICAgZGVjb3JhdGUoYWRqdXN0ZWRTZWxlY3RvciwgdW5kZWZpbmVkLCBjb21wYXJhdG9yKSh0YXJnZXQsIGtleSk7XG4gIH07XG59XG5cbi8qKlxuICogU2VsZWN0cyBhbiBvYnNlcnZhYmxlIHVzaW5nIHRoZSBnaXZlbiBwYXRoIHNlbGVjdG9yLCBhbmQgcnVucyBpdCB0aHJvdWdoIHRoZVxuICogZ2l2ZW4gdHJhbnNmb3JtZXIgZnVuY3Rpb24uIEEgdHJhbnNmb3JtZXIgZnVuY3Rpb24gdGFrZXMgdGhlIHN0b3JlXG4gKiBvYnNlcnZhYmxlIGFzIGFuIGlucHV0IGFuZCByZXR1cm5zIGEgZGVyaXZlZCBvYnNlcnZhYmxlIGZyb20gaXQuIFRoYXQgZGVyaXZlZFxuICogIG9ic2VydmFibGUgaXMgcnVuIHRocm91Z2ggZGlzdGluY3RVbnRpbENoYW5nZXMgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9uYWxcbiAqIGNvbXBhcmF0b3IgYW5kIGF0dGFjaGVkIHRvIHRoZSBzdG9yZSBwcm9wZXJ0eS5cbiAqXG4gKiBUaGluayBvZiBhIFRyYW5zZm9ybWVyIGFzIGEgRnVuY3Rpb25TZWxlY3RvciB0aGF0IG9wZXJhdGVzIG9uIG9ic2VydmFibGVzXG4gKiBpbnN0ZWFkIG9mIHZhbHVlcy5cbiAqXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgc2VsZWN0JCB9IGZyb20gJ2FuZ3VsYXItcmVkdXgvc3RvcmUnO1xuICpcbiAqIGV4cG9ydCBjb25zdCBkZWJvdW5jZUFuZFRyaXBsZSA9IG9icyQgPT4gb2JzJFxuICogIC5kZWJvdW5jZSgzMDApXG4gKiAgLm1hcCh4ID0+IDMgKiB4KTtcbiAqXG4gKiBjbGFzcyBGb28ge1xuICogIEBzZWxlY3QkKFsnZm9vJywgJ2JhciddLCBkZWJvdW5jZUFuZFRyaXBsZSlcbiAqICByZWFkb25seSBkZWJvdW5jZWRGb29CYXIkOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdCQ8VD4oXG4gIHNlbGVjdG9yOiBTZWxlY3RvcjxhbnksIFQ+LFxuICB0cmFuc2Zvcm1lcjogVHJhbnNmb3JtZXI8YW55LCBUPixcbiAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4pOiBQcm9wZXJ0eURlY29yYXRvciB7XG4gIHJldHVybiBkZWNvcmF0ZShzZWxlY3RvciwgdHJhbnNmb3JtZXIsIGNvbXBhcmF0b3IpO1xufVxuXG5mdW5jdGlvbiBkZWNvcmF0ZShcbiAgc2VsZWN0b3I6IFNlbGVjdG9yPGFueSwgYW55PixcbiAgdHJhbnNmb3JtZXI/OiBUcmFuc2Zvcm1lcjxhbnksIGFueT4sXG4gIGNvbXBhcmF0b3I/OiBDb21wYXJhdG9yLFxuKTogUHJvcGVydHlEZWNvcmF0b3Ige1xuICByZXR1cm4gZnVuY3Rpb24gZGVjb3JhdG9yKHRhcmdldDogYW55LCBrZXkpOiB2b2lkIHtcbiAgICBmdW5jdGlvbiBnZXR0ZXIodGhpczogYW55KSB7XG4gICAgICByZXR1cm4gZ2V0SW5zdGFuY2VTZWxlY3Rpb24odGhpcywga2V5LCBzZWxlY3RvciwgdHJhbnNmb3JtZXIsIGNvbXBhcmF0b3IpO1xuICAgIH1cblxuICAgIC8vIFJlcGxhY2UgZGVjb3JhdGVkIHByb3BlcnR5IHdpdGggYSBnZXR0ZXIgdGhhdCByZXR1cm5zIHRoZSBvYnNlcnZhYmxlLlxuICAgIGlmIChkZWxldGUgdGFyZ2V0W2tleV0pIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwge1xuICAgICAgICBnZXQ6IGdldHRlcixcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuIiwiaW1wb3J0IHsgRnJhY3RhbFN0b3JlT3B0aW9ucywgc2V0Q2xhc3NPcHRpb25zIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuLyoqXG4gKiBNb2RpZmllcyB0aGUgYmVoYXZpb3VyIG9mIGFueSBgQHNlbGVjdGAsIGBAc2VsZWN0JGAsIG9yIGBAZGlzcGF0Y2hgXG4gKiBkZWNvcmF0b3JzIHRvIG9wZXJhdGUgb24gYSBzdWJzdG9yZSBkZWZpbmVkIGJ5IHRoZSBJRnJhY3RhbFN0b3JlT3B0aW9ucy5cbiAqXG4gKiBTZWU6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci1yZWR1eC9zdG9yZS9ibG9iL21hc3Rlci9hcnRpY2xlcy9mcmFjdGFsLXN0b3JlLm1kXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCBTdWJTdG9yZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBXaXRoU3ViU3RvcmUoe1xuICBiYXNlUGF0aE1ldGhvZE5hbWUsXG4gIGxvY2FsUmVkdWNlcixcbn06IEZyYWN0YWxTdG9yZU9wdGlvbnMpOiBDbGFzc0RlY29yYXRvciB7XG4gIHJldHVybiBmdW5jdGlvbiBkZWNvcmF0ZShjb25zdHJ1Y3RvcjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICBzZXRDbGFzc09wdGlvbnMoY29uc3RydWN0b3IsIHtcbiAgICAgIGJhc2VQYXRoTWV0aG9kTmFtZSxcbiAgICAgIGxvY2FsUmVkdWNlcixcbiAgICB9KTtcbiAgfTtcbn1cbiIsIi8qKiBAaGlkZGVuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0ID0gKGNvbmRpdGlvbjogYm9vbGVhbiwgbWVzc2FnZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZ2V0SW4gfSBmcm9tICcuLi91dGlscy9nZXQtaW4nO1xuXG4vKipcbiAqIEN1c3RvbSBlcXVhbGl0eSBjaGVja2VyIHRoYXQgY2FuIGJlIHVzZWQgd2l0aCBgLnNlbGVjdGAgYW5kIGBAc2VsZWN0YC5cbiAqIGBgYHRzXG4gKiBjb25zdCBjdXN0b21Db21wYXJlOiBDb21wYXJhdG9yID0gKHg6IGFueSwgeTogYW55KSA9PiB7XG4gKiAgcmV0dXJuIHguaWQgPT09IHkuaWRcbiAqIH1cbiAqXG4gKiBAc2VsZWN0KHNlbGVjdG9yLCBjdXN0b21Db21wYXJlKVxuICogYGBgXG4gKi9cbmV4cG9ydCB0eXBlIENvbXBhcmF0b3IgPSAoeDogYW55LCB5OiBhbnkpID0+IGJvb2xlYW47XG5leHBvcnQgdHlwZSBUcmFuc2Zvcm1lcjxSb290U3RhdGUsIFY+ID0gKFxuICBzdG9yZSQ6IE9ic2VydmFibGU8Um9vdFN0YXRlPixcbiAgc2NvcGU6IGFueSxcbikgPT4gT2JzZXJ2YWJsZTxWPjtcbmV4cG9ydCB0eXBlIFByb3BlcnR5U2VsZWN0b3IgPSBzdHJpbmcgfCBudW1iZXIgfCBzeW1ib2w7XG5leHBvcnQgdHlwZSBQYXRoU2VsZWN0b3IgPSAoc3RyaW5nIHwgbnVtYmVyKVtdO1xuZXhwb3J0IHR5cGUgRnVuY3Rpb25TZWxlY3RvcjxSb290U3RhdGUsIFM+ID0gKChzOiBSb290U3RhdGUpID0+IFMpO1xuZXhwb3J0IHR5cGUgU2VsZWN0b3I8Um9vdFN0YXRlLCBTPiA9XG4gIHwgUHJvcGVydHlTZWxlY3RvclxuICB8IFBhdGhTZWxlY3RvclxuICB8IEZ1bmN0aW9uU2VsZWN0b3I8Um9vdFN0YXRlLCBTPjtcblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBjb25zdCBzbmlmZlNlbGVjdG9yVHlwZSA9IDxSb290U3RhdGUsIFM+KFxuICBzZWxlY3Rvcj86IFNlbGVjdG9yPFJvb3RTdGF0ZSwgUz4sXG4pID0+XG4gICFzZWxlY3RvclxuICAgID8gJ25pbCdcbiAgICA6IEFycmF5LmlzQXJyYXkoc2VsZWN0b3IpXG4gICAgICA/ICdwYXRoJ1xuICAgICAgOiAnZnVuY3Rpb24nID09PSB0eXBlb2Ygc2VsZWN0b3JcbiAgICAgICAgPyAnZnVuY3Rpb24nXG4gICAgICAgIDogJ3Byb3BlcnR5JztcblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBjb25zdCByZXNvbHZlciA9IDxSb290U3RhdGUsIFM+KHNlbGVjdG9yPzogU2VsZWN0b3I8Um9vdFN0YXRlLCBTPikgPT4gKHtcbiAgcHJvcGVydHk6IChzdGF0ZTogYW55KSA9PlxuICAgIHN0YXRlID8gc3RhdGVbc2VsZWN0b3IgYXMgUHJvcGVydHlTZWxlY3Rvcl0gOiB1bmRlZmluZWQsXG4gIHBhdGg6IChzdGF0ZTogUm9vdFN0YXRlKSA9PiBnZXRJbihzdGF0ZSwgc2VsZWN0b3IgYXMgUGF0aFNlbGVjdG9yKSxcbiAgZnVuY3Rpb246IHNlbGVjdG9yIGFzIEZ1bmN0aW9uU2VsZWN0b3I8Um9vdFN0YXRlLCBTPixcbiAgbmlsOiAoc3RhdGU6IFJvb3RTdGF0ZSkgPT4gc3RhdGUsXG59KTtcblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBjb25zdCByZXNvbHZlVG9GdW5jdGlvblNlbGVjdG9yID0gPFJvb3RTdGF0ZSwgUz4oXG4gIHNlbGVjdG9yPzogU2VsZWN0b3I8Um9vdFN0YXRlLCBTPixcbikgPT4gcmVzb2x2ZXIoc2VsZWN0b3IpW3NuaWZmU2VsZWN0b3JUeXBlKHNlbGVjdG9yKV07XG4iLCJpbXBvcnQgeyBBbnlBY3Rpb24sIERpc3BhdGNoLCBSZWR1Y2VyIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgZ2V0SW4gfSBmcm9tICcuLi91dGlscy9nZXQtaW4nO1xuaW1wb3J0IHtcbiAgcmVnaXN0ZXJGcmFjdGFsUmVkdWNlcixcbiAgcmVwbGFjZUxvY2FsUmVkdWNlcixcbn0gZnJvbSAnLi9mcmFjdGFsLXJlZHVjZXItbWFwJztcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICcuL25nLXJlZHV4JztcbmltcG9ydCB7IE9ic2VydmFibGVTdG9yZSB9IGZyb20gJy4vb2JzZXJ2YWJsZS1zdG9yZSc7XG5pbXBvcnQge1xuICBDb21wYXJhdG9yLFxuICBQYXRoU2VsZWN0b3IsXG4gIHJlc29sdmVUb0Z1bmN0aW9uU2VsZWN0b3IsXG4gIFNlbGVjdG9yLFxufSBmcm9tICcuL3NlbGVjdG9ycyc7XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgY2xhc3MgU3ViU3RvcmU8U3RhdGU+IGltcGxlbWVudHMgT2JzZXJ2YWJsZVN0b3JlPFN0YXRlPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm9vdFN0b3JlOiBOZ1JlZHV4PGFueT4sXG4gICAgcHJpdmF0ZSBiYXNlUGF0aDogUGF0aFNlbGVjdG9yLFxuICAgIGxvY2FsUmVkdWNlcjogUmVkdWNlcjxTdGF0ZSwgQW55QWN0aW9uPixcbiAgKSB7XG4gICAgcmVnaXN0ZXJGcmFjdGFsUmVkdWNlcihiYXNlUGF0aCwgbG9jYWxSZWR1Y2VyKTtcbiAgfVxuXG4gIGRpc3BhdGNoOiBEaXNwYXRjaDxBbnlBY3Rpb24+ID0gYWN0aW9uID0+XG4gICAgdGhpcy5yb290U3RvcmUuZGlzcGF0Y2goe1xuICAgICAgLi4uKGFjdGlvbiBhcyBhbnkpLFxuICAgICAgJ0Bhbmd1bGFyLXJlZHV4OjpmcmFjdGFsa2V5JzogSlNPTi5zdHJpbmdpZnkodGhpcy5iYXNlUGF0aCksXG4gICAgfSk7XG5cbiAgZ2V0U3RhdGUgPSAoKTogU3RhdGUgPT4gZ2V0SW4odGhpcy5yb290U3RvcmUuZ2V0U3RhdGUoKSwgdGhpcy5iYXNlUGF0aCk7XG5cbiAgY29uZmlndXJlU3ViU3RvcmUgPSA8U3ViU3RhdGU+KFxuICAgIGJhc2VQYXRoOiBQYXRoU2VsZWN0b3IsXG4gICAgbG9jYWxSZWR1Y2VyOiBSZWR1Y2VyPFN1YlN0YXRlLCBBbnlBY3Rpb24+LFxuICApOiBPYnNlcnZhYmxlU3RvcmU8U3ViU3RhdGU+ID0+XG4gICAgbmV3IFN1YlN0b3JlPFN1YlN0YXRlPihcbiAgICAgIHRoaXMucm9vdFN0b3JlLFxuICAgICAgWy4uLnRoaXMuYmFzZVBhdGgsIC4uLmJhc2VQYXRoXSxcbiAgICAgIGxvY2FsUmVkdWNlcixcbiAgICApO1xuXG4gIHNlbGVjdCA9IDxTZWxlY3RlZFN0YXRlPihcbiAgICBzZWxlY3Rvcj86IFNlbGVjdG9yPFN0YXRlLCBTZWxlY3RlZFN0YXRlPixcbiAgICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbiAgKTogT2JzZXJ2YWJsZTxTZWxlY3RlZFN0YXRlPiA9PlxuICAgIHRoaXMucm9vdFN0b3JlLnNlbGVjdDxTdGF0ZT4odGhpcy5iYXNlUGF0aCkucGlwZShcbiAgICAgIG1hcChyZXNvbHZlVG9GdW5jdGlvblNlbGVjdG9yKHNlbGVjdG9yKSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZChjb21wYXJhdG9yKSxcbiAgICApO1xuXG4gIHN1YnNjcmliZSA9IChsaXN0ZW5lcjogKCkgPT4gdm9pZCk6ICgoKSA9PiB2b2lkKSA9PiB7XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gdGhpcy5zZWxlY3QoKS5zdWJzY3JpYmUobGlzdGVuZXIpO1xuICAgIHJldHVybiAoKSA9PiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfTtcblxuICByZXBsYWNlUmVkdWNlciA9IChuZXh0TG9jYWxSZWR1Y2VyOiBSZWR1Y2VyPFN0YXRlLCBBbnlBY3Rpb24+KSA9PlxuICAgIHJlcGxhY2VMb2NhbFJlZHVjZXIodGhpcy5iYXNlUGF0aCwgbmV4dExvY2FsUmVkdWNlcik7XG59XG4iLCJpbXBvcnQge1xuICBBbnlBY3Rpb24sXG4gIGFwcGx5TWlkZGxld2FyZSxcbiAgY29tcG9zZSxcbiAgY3JlYXRlU3RvcmUsXG4gIERpc3BhdGNoLFxuICBNaWRkbGV3YXJlLFxuICBSZWR1Y2VyLFxuICBTdG9yZSxcbiAgU3RvcmVFbmhhbmNlcixcbiAgVW5zdWJzY3JpYmUsXG59IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IHsgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uL3V0aWxzL2Fzc2VydCc7XG5pbXBvcnQgeyBlbmFibGVGcmFjdGFsUmVkdWNlcnMgfSBmcm9tICcuL2ZyYWN0YWwtcmVkdWNlci1tYXAnO1xuaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJy4vbmctcmVkdXgnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZVN0b3JlIH0gZnJvbSAnLi9vYnNlcnZhYmxlLXN0b3JlJztcbmltcG9ydCB7XG4gIENvbXBhcmF0b3IsXG4gIFBhdGhTZWxlY3RvcixcbiAgcmVzb2x2ZVRvRnVuY3Rpb25TZWxlY3RvcixcbiAgU2VsZWN0b3IsXG59IGZyb20gJy4vc2VsZWN0b3JzJztcbmltcG9ydCB7IFN1YlN0b3JlIH0gZnJvbSAnLi9zdWItc3RvcmUnO1xuXG4vKiogQGhpZGRlbiAqL1xuZXhwb3J0IGNsYXNzIFJvb3RTdG9yZTxSb290U3RhdGU+IGV4dGVuZHMgTmdSZWR1eDxSb290U3RhdGU+IHtcbiAgcHJpdmF0ZSBzdG9yZTogU3RvcmU8Um9vdFN0YXRlPiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBzdG9yZSQ6IEJlaGF2aW9yU3ViamVjdDxSb290U3RhdGU+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgTmdSZWR1eC5pbnN0YW5jZSA9IHRoaXM7XG4gICAgdGhpcy5zdG9yZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFJvb3RTdGF0ZSB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKS5waXBlKFxuICAgICAgZmlsdGVyKG4gPT4gbiAhPT0gdW5kZWZpbmVkKSxcbiAgICAgIHN3aXRjaE1hcChvYnNlcnZhYmxlU3RvcmUgPT4gb2JzZXJ2YWJsZVN0b3JlIGFzIGFueSksXG4gICAgICAvLyBUT0RPOiBmaXggdGhpcz8gbmVlZGluZyB0byBleHBsaWNpdGx5IGNhc3QgdGhpcyBpcyB3cm9uZ1xuICAgICkgYXMgQmVoYXZpb3JTdWJqZWN0PFJvb3RTdGF0ZT47XG4gIH1cblxuICBjb25maWd1cmVTdG9yZSA9IChcbiAgICByb290UmVkdWNlcjogUmVkdWNlcjxSb290U3RhdGUsIEFueUFjdGlvbj4sXG4gICAgaW5pdFN0YXRlOiBSb290U3RhdGUsXG4gICAgbWlkZGxld2FyZTogTWlkZGxld2FyZVtdID0gW10sXG4gICAgZW5oYW5jZXJzOiBTdG9yZUVuaGFuY2VyPFJvb3RTdGF0ZT5bXSA9IFtdLFxuICApOiB2b2lkID0+IHtcbiAgICBhc3NlcnQoIXRoaXMuc3RvcmUsICdTdG9yZSBhbHJlYWR5IGNvbmZpZ3VyZWQhJyk7XG5cbiAgICAvLyBWYXJpYWJsZS1hcml0eSBjb21wb3NlIGluIHR5cGVzY3JpcHQgRlRXLlxuICAgIHRoaXMuc2V0U3RvcmUoXG4gICAgICBjb21wb3NlLmFwcGx5KG51bGwsIFthcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZSksIC4uLmVuaGFuY2Vyc10pKFxuICAgICAgICBjcmVhdGVTdG9yZSxcbiAgICAgICkoZW5hYmxlRnJhY3RhbFJlZHVjZXJzKHJvb3RSZWR1Y2VyKSwgaW5pdFN0YXRlKSxcbiAgICApO1xuICB9O1xuXG4gIHByb3ZpZGVTdG9yZSA9IChzdG9yZTogU3RvcmU8Um9vdFN0YXRlPikgPT4ge1xuICAgIGFzc2VydCghdGhpcy5zdG9yZSwgJ1N0b3JlIGFscmVhZHkgY29uZmlndXJlZCEnKTtcbiAgICB0aGlzLnNldFN0b3JlKHN0b3JlKTtcbiAgfTtcblxuICBnZXRTdGF0ZSA9ICgpOiBSb290U3RhdGUgPT4gdGhpcy5zdG9yZSEuZ2V0U3RhdGUoKTtcblxuICBzdWJzY3JpYmUgPSAobGlzdGVuZXI6ICgpID0+IHZvaWQpOiBVbnN1YnNjcmliZSA9PlxuICAgIHRoaXMuc3RvcmUhLnN1YnNjcmliZShsaXN0ZW5lcik7XG5cbiAgcmVwbGFjZVJlZHVjZXIgPSAobmV4dFJlZHVjZXI6IFJlZHVjZXI8Um9vdFN0YXRlLCBBbnlBY3Rpb24+KTogdm9pZCA9PiB7XG4gICAgdGhpcy5zdG9yZSEucmVwbGFjZVJlZHVjZXIobmV4dFJlZHVjZXIpO1xuICB9O1xuXG4gIGRpc3BhdGNoOiBEaXNwYXRjaDxBbnlBY3Rpb24+ID0gPEEgZXh0ZW5kcyBBbnlBY3Rpb24+KGFjdGlvbjogQSk6IEEgPT4ge1xuICAgIGFzc2VydChcbiAgICAgICEhdGhpcy5zdG9yZSxcbiAgICAgICdEaXNwYXRjaCBmYWlsZWQ6IGRpZCB5b3UgZm9yZ2V0IHRvIGNvbmZpZ3VyZSB5b3VyIHN0b3JlPyAnICtcbiAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyLXJlZHV4L0Bhbmd1bGFyLXJlZHV4L2NvcmUvYmxvYi9tYXN0ZXIvJyArXG4gICAgICAgICdSRUFETUUubWQjcXVpY2stc3RhcnQnLFxuICAgICk7XG5cbiAgICBpZiAoIU5nWm9uZS5pc0luQW5ndWxhclpvbmUoKSkge1xuICAgICAgcmV0dXJuIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLnN0b3JlIS5kaXNwYXRjaChhY3Rpb24pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc3RvcmUhLmRpc3BhdGNoKGFjdGlvbik7XG4gICAgfVxuICB9O1xuXG4gIHNlbGVjdCA9IDxTZWxlY3RlZFR5cGU+KFxuICAgIHNlbGVjdG9yPzogU2VsZWN0b3I8Um9vdFN0YXRlLCBTZWxlY3RlZFR5cGU+LFxuICAgIGNvbXBhcmF0b3I/OiBDb21wYXJhdG9yLFxuICApOiBPYnNlcnZhYmxlPFNlbGVjdGVkVHlwZT4gPT5cbiAgICB0aGlzLnN0b3JlJC5waXBlKFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgIG1hcChyZXNvbHZlVG9GdW5jdGlvblNlbGVjdG9yKHNlbGVjdG9yKSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZChjb21wYXJhdG9yKSxcbiAgICApO1xuXG4gIGNvbmZpZ3VyZVN1YlN0b3JlID0gPFN1YlN0YXRlPihcbiAgICBiYXNlUGF0aDogUGF0aFNlbGVjdG9yLFxuICAgIGxvY2FsUmVkdWNlcjogUmVkdWNlcjxTdWJTdGF0ZSwgQW55QWN0aW9uPixcbiAgKTogT2JzZXJ2YWJsZVN0b3JlPFN1YlN0YXRlPiA9PlxuICAgIG5ldyBTdWJTdG9yZTxTdWJTdGF0ZT4odGhpcywgYmFzZVBhdGgsIGxvY2FsUmVkdWNlcik7XG5cbiAgcHJpdmF0ZSBzZXRTdG9yZShzdG9yZTogU3RvcmU8Um9vdFN0YXRlPikge1xuICAgIHRoaXMuc3RvcmUgPSBzdG9yZTtcbiAgICBjb25zdCBzdG9yZVNlcnZhYmxlID0gdGhpcy5zdG9yZVRvT2JzZXJ2YWJsZShzdG9yZSk7XG4gICAgdGhpcy5zdG9yZSQubmV4dChzdG9yZVNlcnZhYmxlIGFzIGFueSk7XG4gIH1cblxuICBwcml2YXRlIHN0b3JlVG9PYnNlcnZhYmxlID0gKFxuICAgIHN0b3JlOiBTdG9yZTxSb290U3RhdGU+LFxuICApOiBPYnNlcnZhYmxlPFJvb3RTdGF0ZT4gPT5cbiAgICBuZXcgT2JzZXJ2YWJsZTxSb290U3RhdGU+KChvYnNlcnZlcjogT2JzZXJ2ZXI8Um9vdFN0YXRlPikgPT4ge1xuICAgICAgb2JzZXJ2ZXIubmV4dChzdG9yZS5nZXRTdGF0ZSgpKTtcbiAgICAgIGNvbnN0IHVuc3Vic2NyaWJlRnJvbVJlZHV4ID0gc3RvcmUuc3Vic2NyaWJlKCgpID0+XG4gICAgICAgIG9ic2VydmVyLm5leHQoc3RvcmUuZ2V0U3RhdGUoKSksXG4gICAgICApO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgdW5zdWJzY3JpYmVGcm9tUmVkdXgoKTtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH07XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZXZUb29sc0V4dGVuc2lvbiB9IGZyb20gJy4vY29tcG9uZW50cy9kZXYtdG9vbHMnO1xuaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJy4vY29tcG9uZW50cy9uZy1yZWR1eCc7XG5pbXBvcnQgeyBSb290U3RvcmUgfSBmcm9tICcuL2NvbXBvbmVudHMvcm9vdC1zdG9yZSc7XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgZnVuY3Rpb24gX25nUmVkdXhGYWN0b3J5KG5nWm9uZTogTmdab25lKSB7XG4gIHJldHVybiBuZXcgUm9vdFN0b3JlKG5nWm9uZSk7XG59XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIERldlRvb2xzRXh0ZW5zaW9uLFxuICAgIHsgcHJvdmlkZTogTmdSZWR1eCwgdXNlRmFjdG9yeTogX25nUmVkdXhGYWN0b3J5LCBkZXBzOiBbTmdab25lXSB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ1JlZHV4TW9kdWxlIHt9XG4iXSwibmFtZXMiOlsiTmdab25lIiwiSW5qZWN0YWJsZSIsIkFwcGxpY2F0aW9uUmVmIiwiZGlzdGluY3RVbnRpbENoYW5nZWQiLCJtYXAiLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsImNvbXBvc2UiLCJhcHBseU1pZGRsZXdhcmUiLCJjcmVhdGVTdG9yZSIsIk9ic2VydmFibGUiLCJCZWhhdmlvclN1YmplY3QiLCJmaWx0ZXIiLCJzd2l0Y2hNYXAiLCJOZ01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJBb0IyQyxTQUFTO3NCQXBCcEQ7Ozs7Ozs7QUNBQTtJQWtCQSxJQUFNLFdBQVcsS0FBNkIsT0FBTyxNQUFNLEtBQUssV0FBVztVQUN2RSxNQUFNO1VBQ04sRUFBRSxHQUE2Qjs7Ozs7O1FBUWpDLDJCQUFvQixNQUFzQixFQUFVLE9BQXFCO1lBQXpFLGlCQUE2RTtZQUF6RCxXQUFNLEdBQU4sTUFBTSxDQUFnQjtZQUFVLFlBQU8sR0FBUCxPQUFPLENBQWM7Ozs7Ozs7Ozs7NEJBVzlELFVBQUMsT0FBeUI7O2dCQUNuQyxJQUFJLFlBQVksQ0FBYztnQkFDOUIsSUFBSSxDQUFDLEtBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtvQkFDckIsT0FBTyxJQUFJLENBQUM7aUJBQ2I7Ozs7Z0JBR0QsS0FBSSxDQUFDLFdBQVcsRUFBRSxHQUFFLE1BQU0sQ0FBQyxVQUFDLEVBQVE7d0JBQU4sY0FBSTtvQkFDaEMsSUFBSSxJQUFJLEtBQUssT0FB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