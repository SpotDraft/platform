import { ApplicationRef, Injectable, NgZone, NgModule } from '@angular/core';
import { __extends, __spread, __assign, __read } from 'tslib';
import { distinctUntilChanged, map, filter, switchMap } from 'rxjs/operators';
import { applyMiddleware, compose, createStore } from 'redux';
import { BehaviorSubject, Observable } from 'rxjs';

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
var NgRedux = /** @class */ (function () {
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
var environment = /** @type {?} */ ((typeof window !== 'undefined'
    ? window
    : {}));
/**
 * An angular-2-ified version of the Redux DevTools chrome extension.
 */
var DevToolsExtension = /** @class */ (function () {
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
                        if (!NgZone.isInAngularZone()) {
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
        { type: Injectable },
    ];
    /** @nocollapse */
    DevToolsExtension.ctorParameters = function () { return [
        { type: ApplicationRef },
        { type: NgRedux }
    ]; };
    return DevToolsExtension;
}());

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
    if (state === void 0) { state = {}; }
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
    var map$$1 = decoratedInstance[INSTANCE_SELECTIONS_KEY] || {};
    decoratedInstance[INSTANCE_SELECTIONS_KEY] = map$$1;
    return map$$1;
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
                    : store.select(selector).pipe(function (obs$) { return transformer(obs$, decoratedInstance); }, distinctUntilChanged(comparator)));
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
var resolver = function (selector) { return ({
    property: function (state) {
        return state ? state[/** @type {?} */ (selector)] : undefined;
    },
    path: function (state) { return getIn(state, /** @type {?} */ (selector)); },
    function: /** @type {?} */ (selector),
    nil: function (state) { return state; },
}); };
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
 */
SubStore = /** @class */ (function () {
    function SubStore(rootStore, basePath, localReducer) {
        var _this = this;
        this.rootStore = rootStore;
        this.basePath = basePath;
        this.dispatch = function (action) {
            return _this.rootStore.dispatch(__assign({}, (/** @type {?} */ (action)), { '@angular-redux::fractalkey': JSON.stringify(_this.basePath) }));
        };
        this.getState = function () { return getIn(_this.rootStore.getState(), _this.basePath); };
        this.configureSubStore = function (basePath, localReducer) {
            return new SubStore(_this.rootStore, __spread(_this.basePath, basePath), localReducer);
        };
        this.select = function (selector, comparator) {
            return _this.rootStore.select(_this.basePath).pipe(map(resolveToFunctionSelector(selector)), distinctUntilChanged(comparator));
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
var  /**
 * @hidden
 * @template RootState
 */
RootStore = /** @class */ (function (_super) {
    __extends(RootStore, _super);
    function RootStore(ngZone) {
        var _this = _super.call(this) || this;
        _this.ngZone = ngZone;
        _this.store = undefined;
        _this.configureStore = function (rootReducer, initState, middleware, enhancers) {
            if (middleware === void 0) { middleware = []; }
            if (enhancers === void 0) { enhancers = []; }
            assert(!_this.store, 'Store already configured!');
            // Variable-arity compose in typescript FTW.
            // Variable-arity compose in typescript FTW.
            _this.setStore(compose.apply(null, __spread([applyMiddleware.apply(void 0, __spread(middleware))], enhancers))(createStore)(enableFractalReducers(rootReducer), initState));
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
            if (!NgZone.isInAngularZone()) {
                return _this.ngZone.run(function () { return ((_this.store)).dispatch(action); });
            }
            else {
                return /** @type {?} */ ((_this.store)).dispatch(action);
            }
        };
        _this.select = function (selector, comparator) {
            return _this.store$.pipe(distinctUntilChanged(), map(resolveToFunctionSelector(selector)), distinctUntilChanged(comparator));
        };
        _this.configureSubStore = function (basePath, localReducer) {
            return new SubStore(_this, basePath, localReducer);
        };
        _this.storeToObservable = function (store) {
            return new Observable(function (observer) {
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
        _this.store$ = /** @type {?} */ (new BehaviorSubject(undefined).pipe(filter(function (n) { return n !== undefined; }), switchMap(function (observableStore) { return (observableStore); })));
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
var NgReduxModule = /** @class */ (function () {
    function NgReduxModule() {
    }
    NgReduxModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        DevToolsExtension,
                        { provide: NgRedux, useFactory: _ngReduxFactory, deps: [NgZone] },
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

export { NgRedux, NgReduxModule, DevToolsExtension, enableFractalReducers, select, select$, dispatch, WithSubStore, RootStore as ɵb, _ngReduxFactory as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1yZWR1eC1zdG9yZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvY29tcG9uZW50cy9uZy1yZWR1eC50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvY29tcG9uZW50cy9kZXYtdG9vbHMudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL3V0aWxzL2dldC1pbi50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvdXRpbHMvc2V0LWluLnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS9jb21wb25lbnRzL2ZyYWN0YWwtcmVkdWNlci1tYXAudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL2RlY29yYXRvcnMvaGVscGVycy50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvZGVjb3JhdG9ycy9kaXNwYXRjaC50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvZGVjb3JhdG9ycy9zZWxlY3QudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL2RlY29yYXRvcnMvd2l0aC1zdWItc3RvcmUudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL3V0aWxzL2Fzc2VydC50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvY29tcG9uZW50cy9zZWxlY3RvcnMudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL2NvbXBvbmVudHMvc3ViLXN0b3JlLnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS9jb21wb25lbnRzL3Jvb3Qtc3RvcmUudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL25nLXJlZHV4Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBbnlBY3Rpb24sXG4gIERpc3BhdGNoLFxuICBNaWRkbGV3YXJlLFxuICBSZWR1Y2VyLFxuICBTdG9yZSxcbiAgU3RvcmVFbmhhbmNlcixcbiAgVW5zdWJzY3JpYmUsXG59IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9ic2VydmFibGVTdG9yZSB9IGZyb20gJy4vb2JzZXJ2YWJsZS1zdG9yZSc7XG5pbXBvcnQgeyBDb21wYXJhdG9yLCBQYXRoU2VsZWN0b3IsIFNlbGVjdG9yIH0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIHB1YmxpYyBpbnRlcmZhY2Ugb2YgQGFuZ3VsYXItcmVkdXgvc3RvcmUuIEl0IHdyYXBzIHRoZSBnbG9iYWxcbiAqIHJlZHV4IHN0b3JlIGFuZCBhZGRzIGEgZmV3IG90aGVyIGFkZCBvbiBtZXRob2RzLiBJdCdzIHdoYXQgeW91J2xsIGluamVjdFxuICogaW50byB5b3VyIEFuZ3VsYXIgYXBwbGljYXRpb24gYXMgYSBzZXJ2aWNlLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdSZWR1eDxSb290U3RhdGU+IGltcGxlbWVudHMgT2JzZXJ2YWJsZVN0b3JlPFJvb3RTdGF0ZT4ge1xuICAvKiogQGhpZGRlbiwgQGRlcHJlY2F0ZWQgKi9cbiAgc3RhdGljIGluc3RhbmNlPzogT2JzZXJ2YWJsZVN0b3JlPGFueT4gPSB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgYSBSZWR1eCBzdG9yZSBhbmQgYWxsb3dzIE5nUmVkdXggdG8gb2JzZXJ2ZSBhbmQgZGlzcGF0Y2hcbiAgICogdG8gaXQuXG4gICAqXG4gICAqIFRoaXMgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uY2UgZm9yIHRoZSBsaWZldGltZSBvZiB5b3VyIGFwcCwgZm9yXG4gICAqIGV4YW1wbGUgaW4gdGhlIGNvbnN0cnVjdG9yIG9mIHlvdXIgcm9vdCBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSByb290UmVkdWNlciBZb3VyIGFwcCdzIHJvb3QgcmVkdWNlclxuICAgKiBAcGFyYW0gaW5pdFN0YXRlIFlvdXIgYXBwJ3MgaW5pdGlhbCBzdGF0ZVxuICAgKiBAcGFyYW0gbWlkZGxld2FyZSBPcHRpb25hbCBSZWR1eCBtaWRkbGV3YXJlc1xuICAgKiBAcGFyYW0gZW5oYW5jZXJzIE9wdGlvbmFsIFJlZHV4IHN0b3JlIGVuaGFuY2Vyc1xuICAgKi9cbiAgYWJzdHJhY3QgY29uZmlndXJlU3RvcmU6IChcbiAgICByb290UmVkdWNlcjogUmVkdWNlcjxSb290U3RhdGUsIEFueUFjdGlvbj4sXG4gICAgaW5pdFN0YXRlOiBSb290U3RhdGUsXG4gICAgbWlkZGxld2FyZT86IE1pZGRsZXdhcmVbXSxcbiAgICBlbmhhbmNlcnM/OiBTdG9yZUVuaGFuY2VyPFJvb3RTdGF0ZT5bXSxcbiAgKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBY2NlcHRzIGEgUmVkdXggc3RvcmUsIHRoZW4gc2V0cyBpdCBpbiBOZ1JlZHV4IGFuZFxuICAgKiBhbGxvd3MgTmdSZWR1eCB0byBvYnNlcnZlIGFuZCBkaXNwYXRjaCB0byBpdC5cbiAgICpcbiAgICogVGhpcyBzaG91bGQgb25seSBiZSBjYWxsZWQgb25jZSBmb3IgdGhlIGxpZmV0aW1lIG9mIHlvdXIgYXBwLCBmb3JcbiAgICogZXhhbXBsZSBpbiB0aGUgY29uc3RydWN0b3Igb2YgeW91ciByb290IGNvbXBvbmVudC4gSWYgY29uZmlndXJlU3RvcmVcbiAgICogaGFzIGJlZW4gdXNlZCB0aGlzIGNhbm5vdCBiZSB1c2VkLlxuICAgKlxuICAgKiBAcGFyYW0gc3RvcmUgWW91ciBhcHAncyBzdG9yZVxuICAgKi9cbiAgYWJzdHJhY3QgcHJvdmlkZVN0b3JlOiAoc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4pID0+IHZvaWQ7XG5cbiAgLy8gUmVkdXggU3RvcmUgbWV0aG9kc1xuICBhYnN0cmFjdCBkaXNwYXRjaDogRGlzcGF0Y2g8QW55QWN0aW9uPjtcbiAgYWJzdHJhY3QgZ2V0U3RhdGU6ICgpID0+IFJvb3RTdGF0ZTtcbiAgYWJzdHJhY3Qgc3Vic2NyaWJlOiAobGlzdGVuZXI6ICgpID0+IHZvaWQpID0+IFVuc3Vic2NyaWJlO1xuICBhYnN0cmFjdCByZXBsYWNlUmVkdWNlcjogKG5leHRSZWR1Y2VyOiBSZWR1Y2VyPFJvb3RTdGF0ZSwgQW55QWN0aW9uPikgPT4gdm9pZDtcblxuICAvLyBPYnNlcnZhYmxlU3RvcmUgbWV0aG9kcy5cbiAgYWJzdHJhY3Qgc2VsZWN0OiA8U2VsZWN0ZWRUeXBlPihcbiAgICBzZWxlY3Rvcj86IFNlbGVjdG9yPFJvb3RTdGF0ZSwgU2VsZWN0ZWRUeXBlPixcbiAgICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbiAgKSA9PiBPYnNlcnZhYmxlPFNlbGVjdGVkVHlwZT47XG4gIGFic3RyYWN0IGNvbmZpZ3VyZVN1YlN0b3JlOiA8U3ViU3RhdGU+KFxuICAgIGJhc2VQYXRoOiBQYXRoU2VsZWN0b3IsXG4gICAgbG9jYWxSZWR1Y2VyOiBSZWR1Y2VyPFN1YlN0YXRlLCBBbnlBY3Rpb24+LFxuICApID0+IE9ic2VydmFibGVTdG9yZTxTdWJTdGF0ZT47XG59XG4iLCJpbXBvcnQgeyBBcHBsaWNhdGlvblJlZiwgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbnlBY3Rpb24sIFN0b3JlRW5oYW5jZXIsIFVuc3Vic2NyaWJlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgRW5oYW5jZXJPcHRpb25zIH0gZnJvbSAncmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uJztcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICcuL25nLXJlZHV4JztcblxuZXhwb3J0IGludGVyZmFjZSBSZWR1eERldlRvb2xzIHtcbiAgKG9wdGlvbnM6IEVuaGFuY2VyT3B0aW9ucyk6IFN0b3JlRW5oYW5jZXI8YW55PjtcbiAgbGlzdGVuOiAoXG4gICAgb25NZXNzYWdlOiAobWVzc2FnZTogQW55QWN0aW9uKSA9PiB2b2lkLFxuICAgIGluc3RhbmNlSWQ/OiBzdHJpbmcsXG4gICkgPT4gdm9pZDtcbn1cblxuaW50ZXJmYWNlIFdpbmRvd1dpdGhSZWR1eERldlRvb2xzIGV4dGVuZHMgV2luZG93IHtcbiAgX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXz86IFJlZHV4RGV2VG9vbHM7XG4gIGRldlRvb2xzRXh0ZW5zaW9uPzogUmVkdXhEZXZUb29scztcbn1cblxuY29uc3QgZW52aXJvbm1lbnQ6IFdpbmRvd1dpdGhSZWR1eERldlRvb2xzID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gID8gd2luZG93XG4gIDoge30pIGFzIFdpbmRvd1dpdGhSZWR1eERldlRvb2xzO1xuXG4vKipcbiAqIEFuIGFuZ3VsYXItMi1pZmllZCB2ZXJzaW9uIG9mIHRoZSBSZWR1eCBEZXZUb29scyBjaHJvbWUgZXh0ZW5zaW9uLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGV2VG9vbHNFeHRlbnNpb24ge1xuICAvKiogQGhpZGRlbiAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsIHByaXZhdGUgbmdSZWR1eDogTmdSZWR1eDxhbnk+KSB7fVxuXG4gIC8qKlxuICAgKiBBIHdyYXBwZXIgZm9yIHRoZSBDaHJvbWUgRXh0ZW5zaW9uIFJlZHV4IERldlRvb2xzLlxuICAgKiBNYWtlcyBzdXJlIHN0YXRlIGNoYW5nZXMgdHJpZ2dlcmVkIGJ5IHRoZSBleHRlbnNpb25cbiAgICogdHJpZ2dlciBBbmd1bGFyMidzIGNoYW5nZSBkZXRlY3Rvci5cbiAgICpcbiAgICogQGFyZ3VtZW50IG9wdGlvbnM6IGRldiB0b29sIG9wdGlvbnM7IHNhbWVcbiAgICogZm9ybWF0IGFzIGRlc2NyaWJlZCBoZXJlOlxuICAgKiBbemFsbW94aXN1cy9yZWR1eC1kZXZ0b29scy1leHRlbnNpb24vYmxvYi9tYXN0ZXIvZG9jcy9BUEkvQXJndW1lbnRzLm1kXVxuICAgKi9cbiAgZW5oYW5jZXIgPSAob3B0aW9ucz86IEVuaGFuY2VyT3B0aW9ucykgPT4ge1xuICAgIGxldCBzdWJzY3JpcHRpb246IFVuc3Vic2NyaWJlO1xuICAgIGlmICghdGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIGNoYW5nZXMgZnJvbSBkZXYgdG9vbHMgdXBkYXRlIGFuZ3VsYXIncyB2aWV3LlxuICAgIHRoaXMuZ2V0RGV2VG9vbHMoKSEubGlzdGVuKCh7IHR5cGUgfSkgPT4ge1xuICAgICAgaWYgKHR5cGUgPT09ICdTVEFSVCcpIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0gdGhpcy5uZ1JlZHV4LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgaWYgKCFOZ1pvbmUuaXNJbkFuZ3VsYXJab25lKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwUmVmLnRpY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnU1RPUCcpIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXREZXZUb29scygpIShvcHRpb25zIHx8IHt9KTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBleHRlbnNpb24gaXMgaW5zdGFsbGVkIGFuZCBlbmFibGVkLlxuICAgKi9cbiAgaXNFbmFibGVkID0gKCkgPT4gISF0aGlzLmdldERldlRvb2xzKCk7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJlZHV4IGRldnRvb2xzIGVuaGFuY2VyLlxuICAgKi9cbiAgZ2V0RGV2VG9vbHMgPSAoKSA9PlxuICAgIGVudmlyb25tZW50ICYmXG4gICAgKGVudmlyb25tZW50Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX18gfHwgZW52aXJvbm1lbnQuZGV2VG9vbHNFeHRlbnNpb24pO1xufVxuIiwiLyoqXG4gKiBHZXRzIGEgZGVlcGx5LW5lc3RlZCBwcm9wZXJ0eSB2YWx1ZSBmcm9tIGFuIG9iamVjdCwgZ2l2ZW4gYSAncGF0aCdcbiAqIG9mIHByb3BlcnR5IG5hbWVzIG9yIGFycmF5IGluZGljZXMuXG4gKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW4oXG4gIHY6IGFueSB8IHVuZGVmaW5lZCxcbiAgcGF0aEVsZW1zOiAoc3RyaW5nIHwgbnVtYmVyKVtdLFxuKTogYW55IHwgdW5kZWZpbmVkIHtcbiAgaWYgKCF2KSB7XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICAvLyBJZiB0aGlzIGlzIGFuIEltbXV0YWJsZUpTIHN0cnVjdHVyZSwgdXNlIGV4aXN0aW5nIGdldEluIGZ1bmN0aW9uXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2Ygdi5nZXRJbikge1xuICAgIHJldHVybiB2LmdldEluKHBhdGhFbGVtcyk7XG4gIH1cblxuICBjb25zdCBbZmlyc3RFbGVtLCAuLi5yZXN0RWxlbXNdID0gcGF0aEVsZW1zO1xuXG4gIGlmICh1bmRlZmluZWQgPT09IHZbZmlyc3RFbGVtXSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAocmVzdEVsZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB2W2ZpcnN0RWxlbV07XG4gIH1cblxuICByZXR1cm4gZ2V0SW4odltmaXJzdEVsZW1dLCByZXN0RWxlbXMpO1xufVxuIiwiLyoqXG4gKiBTZXRzIGEgZGVlcGx5LW5lc3RlZCBwcm9wZXJ0eSB2YWx1ZSBmcm9tIGFuIG9iamVjdCwgZ2l2ZW4gYSAncGF0aCdcbiAqIG9mIHByb3BlcnR5IG5hbWVzIG9yIGFycmF5IGluZGljZXMuIFBhdGggZWxlbWVudHMgYXJlIGNyZWF0ZWQgaWZcbiAqIG5vdCB0aGVyZSBhbHJlYWR5LiBEb2VzIG5vdCBtdXRhdGUgdGhlIGdpdmVuIG9iamVjdC5cbiAqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRJbiA9IChcbiAgb2JqOiBhbnksXG4gIFtmaXJzdEVsZW0sIC4uLnJlc3RFbGVtc106IChzdHJpbmcgfCBudW1iZXIpW10sXG4gIHZhbHVlOiBhbnksXG4pOiBvYmplY3QgPT5cbiAgJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIChvYmpbZmlyc3RFbGVtXSB8fCB7fSkuc2V0SW5cbiAgICA/IHtcbiAgICAgICAgLi4ub2JqLFxuICAgICAgICBbZmlyc3RFbGVtXTogb2JqW2ZpcnN0RWxlbV0uc2V0SW4ocmVzdEVsZW1zLCB2YWx1ZSksXG4gICAgICB9XG4gICAgOiB7XG4gICAgICAgIC4uLm9iaixcbiAgICAgICAgW2ZpcnN0RWxlbV06XG4gICAgICAgICAgcmVzdEVsZW1zLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgPyB2YWx1ZVxuICAgICAgICAgICAgOiBzZXRJbihvYmpbZmlyc3RFbGVtXSB8fCB7fSwgcmVzdEVsZW1zLCB2YWx1ZSksXG4gICAgICB9O1xuIiwiaW1wb3J0IHsgQW55QWN0aW9uLCBSZWR1Y2VyIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgZ2V0SW4gfSBmcm9tICcuLi91dGlscy9nZXQtaW4nO1xuaW1wb3J0IHsgc2V0SW4gfSBmcm9tICcuLi91dGlscy9zZXQtaW4nO1xuaW1wb3J0IHsgUGF0aFNlbGVjdG9yIH0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuXG5sZXQgcmVkdWNlck1hcDogeyBbaWQ6IHN0cmluZ106IFJlZHVjZXI8YW55LCBBbnlBY3Rpb24+IH0gPSB7fTtcblxuY29uc3QgY29tcG9zZVJlZHVjZXJzID0gKFxuICAuLi5yZWR1Y2VyczogUmVkdWNlcjxhbnksIEFueUFjdGlvbj5bXVxuKTogUmVkdWNlcjxhbnksIEFueUFjdGlvbj4gPT4gKHN0YXRlOiBhbnksIGFjdGlvbjogQW55QWN0aW9uKSA9PlxuICByZWR1Y2Vycy5yZWR1Y2UoKHN1YlN0YXRlLCByZWR1Y2VyKSA9PiByZWR1Y2VyKHN1YlN0YXRlLCBhY3Rpb24pLCBzdGF0ZSk7XG5cbi8qKlxuICogQHBhcmFtIHJvb3RSZWR1Y2VyIENhbGwgdGhpcyBvbiB5b3VyIHJvb3QgcmVkdWNlciB0byBlbmFibGUgU3ViU3RvcmVcbiAqIGZ1bmN0aW9uYWxpdHkgZm9yIHByZS1jb25maWd1cmVkIHN0b3JlcyAoZS5nLiB1c2luZyBOZ1JlZHV4LnByb3ZpZGVTdG9yZSgpKS5cbiAqIE5nUmVkdXguY29uZmlndXJlU3RvcmVcbiAqIGRvZXMgaXQgZm9yIHlvdSB1bmRlciB0aGUgaG9vZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZUZyYWN0YWxSZWR1Y2Vycyhyb290UmVkdWNlcjogUmVkdWNlcjxhbnksIEFueUFjdGlvbj4pIHtcbiAgcmVkdWNlck1hcCA9IHt9O1xuICByZXR1cm4gY29tcG9zZVJlZHVjZXJzKHJvb3RGcmFjdGFsUmVkdWNlciwgcm9vdFJlZHVjZXIpO1xufVxuXG4vKiogQGhpZGRlbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRnJhY3RhbFJlZHVjZXIoXG4gIGJhc2VQYXRoOiBQYXRoU2VsZWN0b3IsXG4gIGxvY2FsUmVkdWNlcjogUmVkdWNlcjxhbnksIEFueUFjdGlvbj4sXG4pOiB2b2lkIHtcbiAgY29uc3QgZXhpc3RpbmdGcmFjdGFsUmVkdWNlciA9IHJlZHVjZXJNYXBbSlNPTi5zdHJpbmdpZnkoYmFzZVBhdGgpXTtcbiAgaWYgKGV4aXN0aW5nRnJhY3RhbFJlZHVjZXIgJiYgZXhpc3RpbmdGcmFjdGFsUmVkdWNlciAhPT0gbG9jYWxSZWR1Y2VyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYGF0dGVtcHQgdG8gb3ZlcndyaXRlIGZyYWN0YWwgcmVkdWNlciBmb3IgYmFzZVBhdGggJHtiYXNlUGF0aH1gLFxuICAgICk7XG4gIH1cblxuICByZWR1Y2VyTWFwW0pTT04uc3RyaW5naWZ5KGJhc2VQYXRoKV0gPSBsb2NhbFJlZHVjZXI7XG59XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZUxvY2FsUmVkdWNlcihcbiAgYmFzZVBhdGg6IFBhdGhTZWxlY3RvcixcbiAgbmV4dExvY2FsUmVkdWNlcjogUmVkdWNlcjxhbnksIEFueUFjdGlvbj4sXG4pOiB2b2lkIHtcbiAgcmVkdWNlck1hcFtKU09OLnN0cmluZ2lmeShiYXNlUGF0aCldID0gbmV4dExvY2FsUmVkdWNlcjtcbn1cblxuZnVuY3Rpb24gcm9vdEZyYWN0YWxSZWR1Y2VyKFxuICBzdGF0ZToge30gPSB7fSxcbiAgYWN0aW9uOiBBbnlBY3Rpb24gJiB7ICdAYW5ndWxhci1yZWR1eDo6ZnJhY3RhbGtleSc/OiBzdHJpbmcgfSxcbikge1xuICBjb25zdCBmcmFjdGFsS2V5ID0gYWN0aW9uWydAYW5ndWxhci1yZWR1eDo6ZnJhY3RhbGtleSddO1xuICBjb25zdCBmcmFjdGFsUGF0aCA9IGZyYWN0YWxLZXkgPyBKU09OLnBhcnNlKGZyYWN0YWxLZXkpIDogW107XG4gIGNvbnN0IGxvY2FsUmVkdWNlciA9IHJlZHVjZXJNYXBbZnJhY3RhbEtleSB8fCAnJ107XG4gIHJldHVybiBmcmFjdGFsS2V5ICYmIGxvY2FsUmVkdWNlclxuICAgID8gc2V0SW4oc3RhdGUsIGZyYWN0YWxQYXRoLCBsb2NhbFJlZHVjZXIoZ2V0SW4oc3RhdGUsIGZyYWN0YWxQYXRoKSwgYWN0aW9uKSlcbiAgICA6IHN0YXRlO1xufVxuIiwiaW1wb3J0IHsgQW55QWN0aW9uLCBSZWR1Y2VyIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnLi4vY29tcG9uZW50cy9uZy1yZWR1eCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlU3RvcmUgfSBmcm9tICcuLi9jb21wb25lbnRzL29ic2VydmFibGUtc3RvcmUnO1xuaW1wb3J0IHtcbiAgQ29tcGFyYXRvcixcbiAgUGF0aFNlbGVjdG9yLFxuICBTZWxlY3RvcixcbiAgVHJhbnNmb3JtZXIsXG59IGZyb20gJy4uL2NvbXBvbmVudHMvc2VsZWN0b3JzJztcblxuLyoqXG4gKiBVc2VkIHdpdGggdGhlIGBAV2l0aFN1YlN0b3JlYCBjbGFzcyBkZWNvcmF0b3IgdG8gZGVmaW5lIGEgU3ViU3RvcmUgKEFLQSBhXG4gKiBmcmFjdGFsIHN0b3JlKS5cbiAqXG4gKiBGb3IgbW9yZSBpbmZvIG9uIHN1YnN0b3Jlcywgc2VlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci1yZWR1eC9zdG9yZS9ibG9iL21hc3Rlci9hcnRpY2xlcy9mcmFjdGFsLXN0b3JlLm1kXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRnJhY3RhbFN0b3JlT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiBhbiBpbnN0YW5jZSBtZXRob2QgdGhhdCB3aWxsIGRlZmluZSB0aGVcbiAgICogYmFzZSBwYXRoIGZvciB0aGUgc3ViU3RvcmUuIFRoaXMgbWV0aG9kIGlzIGV4cGVjdGVkIHRvIHJldHVybiBhbiBhcnJheVxuICAgKiBvZiBwcm9wZXJ0eSBuYW1lcyBvciB1bmRlZmluZWQvbnVsbC5cbiAgICovXG4gIGJhc2VQYXRoTWV0aG9kTmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgbG9jYWxSZWR1Y2VyIGZvciB0aGUgc3Vic3RvcmUgaW4gcXVlc3Rpb24uXG4gICAqL1xuICBsb2NhbFJlZHVjZXI6IFJlZHVjZXI8YW55LCBBbnlBY3Rpb24+O1xufVxuXG4vKipcbiAqIE9QVElPTlNfS0VZOiB0aGlzIGlzIHBlci1jbGFzcyAoc3RhdGljKSBhbmQgaG9sZHMgdGhlIGNvbmZpZyBmcm9tIHRoZVxuICogQFN1YlN0b3JlIGRlY29yYXRvci5cbiAqL1xuY29uc3QgT1BUSU9OU19LRVkgPSAnQGFuZ3VsYXItcmVkdXg6OnN1YnN0b3JlOjpjbGFzczo6b3B0aW9ucyc7XG5cbi8qKlxuICogSU5TVEFOQ0VfU1VCU1RPUkVfS0VZLCBJTlNUQU5DRV9TRUxFQ1RJT05TX0tFWTogdGhlc2UgYXJlIHBlci1pbnN0YW5jZVxuICogKG5vbi1zdGF0aWMpIGFuZCBob2xkcyByZWZlcmVuY2VzIHRvIHRoZSBzdWJzdG9yZXMvc2VsZWN0ZWQgb2JzZXJ2YWJsZXNcbiAqIHRvIGJlIHVzZWQgYnkgYW4gaW5zdGFuY2Ugb2YgYSBkZWNvcmF0ZWQgY2xhc3MuIEknbSBub3QgdXNpbmdcbiAqIHJlZmxlY3QtbWV0YWRhdGEgaGVyZSBiZWNhdXNlIEkgd2FudFxuICpcbiAqIDEuIGRpZmZlcmVudCBpbnN0YW5jZXMgdG8gaGF2ZSBkaWZmZXJlbnQgc3Vic3RvcmVzIGluIHRoZSBjYXNlIHdoZXJlXG4gKiBgYmFzZVBhdGhNZXRob2ROYW1lYCBpcyBkeW5hbWljLlxuICogMi4gdGhlIGluc3RhbmNlIHN1YnN0b3JlIHRvIGJlIGdhcmJhZ2UgY29sbGVjdGVkIHdoZW4gdGhlIGluc3RhbmNlIGlzIG5vXG4gKiBsb25nZXIgcmVhY2hhYmxlLlxuICogVGhpcyBpcyB0aGVyZWZvcmUgYW4gb3duLXByb3BlcnR5IG9uIHRoZSBhY3R1YWwgaW5zdGFuY2Ugb2YgdGhlIGRlY29yYXRlZFxuICogY2xhc3MuXG4gKi9cbmNvbnN0IElOU1RBTkNFX1NVQlNUT1JFX0tFWSA9ICdAYW5ndWxhci1yZWR1eDo6c3Vic3RvcmU6Omluc3RhbmNlOjpzdG9yZSc7XG5jb25zdCBJTlNUQU5DRV9TRUxFQ1RJT05TX0tFWSA9XG4gICdAYW5ndWxhci1yZWR1eDo6c3Vic3RvcmU6Omluc3RhbmNlOjpzZWxlY3Rpb25zJztcblxuLyoqXG4gKiBVc2VkIHRvIGRldGVjdCB3aGVuIHRoZSBiYXNlIHBhdGggY2hhbmdlcyAtIHRoaXMgYWxsb3dzIGNvbXBvbmVudHMgdG9cbiAqIGR5bmFtaWNhbGx5IGFkanVzdCB0aGVpciBzZWxlY3Rpb25zIGlmIG5lY2Vzc2FyeS5cbiAqL1xuY29uc3QgSU5TVEFOQ0VfQkFTRV9QQVRIX0tFWSA9ICdAYW5ndWxhci1yZWR1eDo6c3Vic3RvcmU6Omluc3RhbmNlOjpiYXNlcGF0aCc7XG5cbmNvbnN0IGdldENsYXNzT3B0aW9ucyA9IChkZWNvcmF0ZWRJbnN0YW5jZTogYW55KTogRnJhY3RhbFN0b3JlT3B0aW9ucyA9PlxuICBkZWNvcmF0ZWRJbnN0YW5jZS5jb25zdHJ1Y3RvcltPUFRJT05TX0tFWV07XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgY29uc3Qgc2V0Q2xhc3NPcHRpb25zID0gKFxuICBkZWNvcmF0ZWRDbGFzc0NvbnN0cnVjdG9yOiBhbnksXG4gIG9wdGlvbnM6IEZyYWN0YWxTdG9yZU9wdGlvbnMsXG4pOiB2b2lkID0+IHtcbiAgZGVjb3JhdGVkQ2xhc3NDb25zdHJ1Y3RvcltPUFRJT05TX0tFWV0gPSBvcHRpb25zO1xufTtcblxuLy8gSSB3YW50IHRoZSBzdG9yZSB0byBiZSBzYXZlZCBvbiB0aGUgYWN0dWFsIGluc3RhbmNlIHNvXG4vLyAxLiBkaWZmZXJlbnQgaW5zdGFuY2VzIGNhbiBoYXZlIGRpc3RpbmN0IHN1YnN0b3JlcyBpZiBuZWNlc3Nhcnlcbi8vIDIuIHRoZSBzdWJzdG9yZS9zZWxlY3Rpb25zIHdpbGwgYmUgbWFya2VkIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24gd2hlbiB0aGVcbi8vICAgIGluc3RhbmNlIGlzIGRlc3Ryb3llZC5cbmNvbnN0IHNldEluc3RhbmNlU3RvcmUgPSAoXG4gIGRlY29yYXRlZEluc3RhbmNlOiBhbnksXG4gIHN0b3JlPzogT2JzZXJ2YWJsZVN0b3JlPGFueT4sXG4pID0+IChkZWNvcmF0ZWRJbnN0YW5jZVtJTlNUQU5DRV9TVUJTVE9SRV9LRVldID0gc3RvcmUpO1xuXG5jb25zdCBnZXRJbnN0YW5jZVN0b3JlID0gKGRlY29yYXRlZEluc3RhbmNlOiBhbnkpOiBPYnNlcnZhYmxlU3RvcmU8YW55PiA9PlxuICBkZWNvcmF0ZWRJbnN0YW5jZVtJTlNUQU5DRV9TVUJTVE9SRV9LRVldO1xuXG5jb25zdCBnZXRJbnN0YW5jZVNlbGVjdGlvbk1hcCA9IChkZWNvcmF0ZWRJbnN0YW5jZTogYW55KSA9PiB7XG4gIGNvbnN0IG1hcCA9IGRlY29yYXRlZEluc3RhbmNlW0lOU1RBTkNFX1NFTEVDVElPTlNfS0VZXSB8fCB7fTtcbiAgZGVjb3JhdGVkSW5zdGFuY2VbSU5TVEFOQ0VfU0VMRUNUSU9OU19LRVldID0gbWFwO1xuICByZXR1cm4gbWFwO1xufTtcblxuY29uc3QgaGFzQmFzZVBhdGhDaGFuZ2VkID0gKFxuICBkZWNvcmF0ZWRJbnN0YW5jZTogYW55LFxuICBiYXNlUGF0aD86IFBhdGhTZWxlY3Rvcixcbik6IGJvb2xlYW4gPT5cbiAgZGVjb3JhdGVkSW5zdGFuY2VbSU5TVEFOQ0VfQkFTRV9QQVRIX0tFWV0gIT09IChiYXNlUGF0aCB8fCBbXSkudG9TdHJpbmcoKTtcblxuY29uc3Qgc2V0SW5zdGFuY2VCYXNlUGF0aCA9IChcbiAgZGVjb3JhdGVkSW5zdGFuY2U6IGFueSxcbiAgYmFzZVBhdGg/OiBQYXRoU2VsZWN0b3IsXG4pOiB2b2lkID0+IHtcbiAgZGVjb3JhdGVkSW5zdGFuY2VbSU5TVEFOQ0VfQkFTRV9QQVRIX0tFWV0gPSAoYmFzZVBhdGggfHwgW10pLnRvU3RyaW5nKCk7XG59O1xuXG5jb25zdCBjbGVhckluc3RhbmNlU3RhdGUgPSAoZGVjb3JhdGVkSW5zdGFuY2U6IGFueSkgPT4ge1xuICBkZWNvcmF0ZWRJbnN0YW5jZVtJTlNUQU5DRV9TRUxFQ1RJT05TX0tFWV0gPSBudWxsO1xuICBkZWNvcmF0ZWRJbnN0YW5jZVtJTlNUQU5DRV9TVUJTVE9SRV9LRVldID0gbnVsbDtcbiAgZGVjb3JhdGVkSW5zdGFuY2VbSU5TVEFOQ0VfQkFTRV9QQVRIX0tFWV0gPSBudWxsO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBzdG9yZSBhc3NvY2lhdGVkIHdpdGggYSBkZWNvcmF0ZWQgaW5zdGFuY2UgKGUuZy4gYVxuICogY29tcG9uZW50IG9yIHNlcnZpY2UpXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRCYXNlU3RvcmUgPSAoXG4gIGRlY29yYXRlZEluc3RhbmNlOiBhbnksXG4pOiBPYnNlcnZhYmxlU3RvcmU8YW55PiB8IHVuZGVmaW5lZCA9PiB7XG4gIC8vIFRoZSByb290IHN0b3JlIGhhc24ndCBiZWVuIHNldCB1cCB5ZXQuXG4gIGlmICghTmdSZWR1eC5pbnN0YW5jZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBvcHRpb25zID0gZ2V0Q2xhc3NPcHRpb25zKGRlY29yYXRlZEluc3RhbmNlKTtcblxuICAvLyBUaGlzIGlzIG5vdCBkZWNvcmF0ZWQgd2l0aCBgQFdpdGhTdWJTdG9yZWAuIFJldHVybiB0aGUgcm9vdCBzdG9yZS5cbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgcmV0dXJuIE5nUmVkdXguaW5zdGFuY2U7XG4gIH1cblxuICAvLyBEeW5hbWljIGJhc2UgcGF0aCBzdXBwb3J0OlxuICBjb25zdCBiYXNlUGF0aCA9IGRlY29yYXRlZEluc3RhbmNlW29wdGlvbnMuYmFzZVBhdGhNZXRob2ROYW1lXSgpO1xuICBpZiAoaGFzQmFzZVBhdGhDaGFuZ2VkKGRlY29yYXRlZEluc3RhbmNlLCBiYXNlUGF0aCkpIHtcbiAgICBjbGVhckluc3RhbmNlU3RhdGUoZGVjb3JhdGVkSW5zdGFuY2UpO1xuICAgIHNldEluc3RhbmNlQmFzZVBhdGgoZGVjb3JhdGVkSW5zdGFuY2UsIGJhc2VQYXRoKTtcbiAgfVxuXG4gIGlmICghYmFzZVBhdGgpIHtcbiAgICByZXR1cm4gTmdSZWR1eC5pbnN0YW5jZTtcbiAgfVxuXG4gIGNvbnN0IHN0b3JlID0gZ2V0SW5zdGFuY2VTdG9yZShkZWNvcmF0ZWRJbnN0YW5jZSk7XG4gIGlmICghc3RvcmUpIHtcbiAgICBzZXRJbnN0YW5jZVN0b3JlKFxuICAgICAgZGVjb3JhdGVkSW5zdGFuY2UsXG4gICAgICBOZ1JlZHV4Lmluc3RhbmNlLmNvbmZpZ3VyZVN1YlN0b3JlKGJhc2VQYXRoLCBvcHRpb25zLmxvY2FsUmVkdWNlciksXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBnZXRJbnN0YW5jZVN0b3JlKGRlY29yYXRlZEluc3RhbmNlKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBPYnNlcnZhYmxlIGZyb20gdGhlIGdpdmVuIHNlbGVjdGlvbiBwYXJhbWV0ZXJzLFxuICogcm9vdGVkIGF0IGRlY29yYXRlZEluc3RhbmNlJ3Mgc3RvcmUsIGFuZCBjYWNoZXMgaXQgb24gdGhlXG4gKiBpbnN0YW5jZSBmb3IgZnV0dXJlIHVzZS5cbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEluc3RhbmNlU2VsZWN0aW9uID0gPFQ+KFxuICBkZWNvcmF0ZWRJbnN0YW5jZTogYW55LFxuICBrZXk6IHN0cmluZyB8IHN5bWJvbCxcbiAgc2VsZWN0b3I6IFNlbGVjdG9yPGFueSwgVD4sXG4gIHRyYW5zZm9ybWVyPzogVHJhbnNmb3JtZXI8YW55LCBUPixcbiAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4pID0+IHtcbiAgY29uc3Qgc3RvcmUgPSBnZXRCYXNlU3RvcmUoZGVjb3JhdGVkSW5zdGFuY2UpO1xuXG4gIGlmIChzdG9yZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbnMgPSBnZXRJbnN0YW5jZVNlbGVjdGlvbk1hcChkZWNvcmF0ZWRJbnN0YW5jZSk7XG5cbiAgICBzZWxlY3Rpb25zW2tleV0gPVxuICAgICAgc2VsZWN0aW9uc1trZXldIHx8XG4gICAgICAoIXRyYW5zZm9ybWVyXG4gICAgICAgID8gc3RvcmUuc2VsZWN0KHNlbGVjdG9yLCBjb21wYXJhdG9yKVxuICAgICAgICA6IHN0b3JlLnNlbGVjdChzZWxlY3RvcikucGlwZShcbiAgICAgICAgICAgIG9icyQgPT4gdHJhbnNmb3JtZXIob2JzJCwgZGVjb3JhdGVkSW5zdGFuY2UpLFxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoY29tcGFyYXRvciksXG4gICAgICAgICAgKSk7XG5cbiAgICByZXR1cm4gc2VsZWN0aW9uc1trZXldO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG4iLCJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnLi4vY29tcG9uZW50cy9uZy1yZWR1eCc7XG5pbXBvcnQgeyBnZXRCYXNlU3RvcmUgfSBmcm9tICcuL2hlbHBlcnMnO1xuXG4vKipcbiAqIEF1dG8tZGlzcGF0Y2hlcyB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBkZWNvcmF0ZWQgZnVuY3Rpb24uXG4gKlxuICogRGVjb3JhdGUgYSBmdW5jdGlvbiBjcmVhdG9yIG1ldGhvZCB3aXRoIEBkaXNwYXRjaCBhbmQgaXRzIHJldHVyblxuICogdmFsdWUgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIHBhc3NlZCB0byBuZ1JlZHV4LmRpc3BhdGNoKCkgZm9yIHlvdS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoKCk6IFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRlY29yYXRlKFxuICAgIHRhcmdldDogb2JqZWN0LFxuICAgIGtleTogc3RyaW5nIHwgc3ltYm9sIHwgbnVtYmVyLFxuICAgIGRlc2NyaXB0b3I/OiBQcm9wZXJ0eURlc2NyaXB0b3IsXG4gICk6IFByb3BlcnR5RGVzY3JpcHRvciB7XG4gICAgbGV0IG9yaWdpbmFsTWV0aG9kOiAoKSA9PiB2b2lkO1xuXG4gICAgY29uc3Qgd3JhcHBlZCA9IGZ1bmN0aW9uKHRoaXM6IGFueSwgLi4uYXJnczogYW55W10pIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IG9yaWdpbmFsTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBnZXRCYXNlU3RvcmUodGhpcykgfHwgTmdSZWR1eC5pbnN0YW5jZTtcbiAgICAgICAgaWYgKHN0b3JlKSB7XG4gICAgICAgICAgc3RvcmUuZGlzcGF0Y2gocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3IgfHwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gICAgaWYgKGRlc2NyaXB0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgZGlzcGF0Y2hEZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XG4gICAgICAgIGdldDogKCkgPT4gd3JhcHBlZCxcbiAgICAgICAgc2V0OiBzZXRNZXRob2QgPT4gKG9yaWdpbmFsTWV0aG9kID0gc2V0TWV0aG9kKSxcbiAgICAgIH07XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGRpc3BhdGNoRGVzY3JpcHRvcik7XG4gICAgICByZXR1cm4gZGlzcGF0Y2hEZXNjcmlwdG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgICBkZXNjcmlwdG9yLnZhbHVlID0gd3JhcHBlZDtcbiAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICAgIH1cbiAgfTtcbn1cbiIsImltcG9ydCB7IENvbXBhcmF0b3IsIFNlbGVjdG9yLCBUcmFuc2Zvcm1lciB9IGZyb20gJy4uL2NvbXBvbmVudHMvc2VsZWN0b3JzJztcbmltcG9ydCB7IGdldEluc3RhbmNlU2VsZWN0aW9uIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuLyoqXG4gKiBTZWxlY3RzIGFuIG9ic2VydmFibGUgZnJvbSB0aGUgc3RvcmUsIGFuZCBhdHRhY2hlcyBpdCB0byB0aGUgZGVjb3JhdGVkXG4gKiBwcm9wZXJ0eS5cbiAqXG4gKiBgYGB0c1xuICogIGltcG9ydCB7IHNlbGVjdCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbiAqXG4gKiAgY2xhc3MgU29tZUNsYXNzIHtcbiAqICAgIEBzZWxlY3QoWydmb28nLCdiYXInXSkgZm9vJDogT2JzZXJ2YWJsZTxzdHJpbmc+XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gc2VsZWN0b3JcbiAqIEEgc2VsZWN0b3IgZnVuY3Rpb24sIHByb3BlcnR5IG5hbWUgc3RyaW5nLCBvciBwcm9wZXJ0eSBuYW1lIHBhdGhcbiAqIChhcnJheSBvZiBzdHJpbmdzL2FycmF5IGluZGljZXMpIHRoYXQgbG9jYXRlcyB0aGUgc3RvcmUgZGF0YSB0byBiZVxuICogc2VsZWN0ZWRcbiAqXG4gKiBAcGFyYW0gY29tcGFyYXRvciBGdW5jdGlvbiB1c2VkIHRvIGRldGVybWluZSBpZiB0aGlzIHNlbGVjdG9yIGhhcyBjaGFuZ2VkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFQ+KFxuICBzZWxlY3Rvcj86IFNlbGVjdG9yPGFueSwgVD4sXG4gIGNvbXBhcmF0b3I/OiBDb21wYXJhdG9yLFxuKTogUHJvcGVydHlEZWNvcmF0b3Ige1xuICByZXR1cm4gKHRhcmdldDogYW55LCBrZXk6IHN0cmluZyB8IHN5bWJvbCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGFkanVzdGVkU2VsZWN0b3IgPSBzZWxlY3RvclxuICAgICAgPyBzZWxlY3RvclxuICAgICAgOiBTdHJpbmcoa2V5KS5sYXN0SW5kZXhPZignJCcpID09PSBTdHJpbmcoa2V5KS5sZW5ndGggLSAxXG4gICAgICAgID8gU3RyaW5nKGtleSkuc3Vic3RyaW5nKDAsIFN0cmluZyhrZXkpLmxlbmd0aCAtIDEpXG4gICAgICAgIDoga2V5O1xuICAgIGRlY29yYXRlKGFkanVzdGVkU2VsZWN0b3IsIHVuZGVmaW5lZCwgY29tcGFyYXRvcikodGFyZ2V0LCBrZXkpO1xuICB9O1xufVxuXG4vKipcbiAqIFNlbGVjdHMgYW4gb2JzZXJ2YWJsZSB1c2luZyB0aGUgZ2l2ZW4gcGF0aCBzZWxlY3RvciwgYW5kIHJ1bnMgaXQgdGhyb3VnaCB0aGVcbiAqIGdpdmVuIHRyYW5zZm9ybWVyIGZ1bmN0aW9uLiBBIHRyYW5zZm9ybWVyIGZ1bmN0aW9uIHRha2VzIHRoZSBzdG9yZVxuICogb2JzZXJ2YWJsZSBhcyBhbiBpbnB1dCBhbmQgcmV0dXJucyBhIGRlcml2ZWQgb2JzZXJ2YWJsZSBmcm9tIGl0LiBUaGF0IGRlcml2ZWRcbiAqICBvYnNlcnZhYmxlIGlzIHJ1biB0aHJvdWdoIGRpc3RpbmN0VW50aWxDaGFuZ2VzIHdpdGggdGhlIGdpdmVuIG9wdGlvbmFsXG4gKiBjb21wYXJhdG9yIGFuZCBhdHRhY2hlZCB0byB0aGUgc3RvcmUgcHJvcGVydHkuXG4gKlxuICogVGhpbmsgb2YgYSBUcmFuc2Zvcm1lciBhcyBhIEZ1bmN0aW9uU2VsZWN0b3IgdGhhdCBvcGVyYXRlcyBvbiBvYnNlcnZhYmxlc1xuICogaW5zdGVhZCBvZiB2YWx1ZXMuXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IHNlbGVjdCQgfSBmcm9tICdhbmd1bGFyLXJlZHV4L3N0b3JlJztcbiAqXG4gKiBleHBvcnQgY29uc3QgZGVib3VuY2VBbmRUcmlwbGUgPSBvYnMkID0+IG9icyRcbiAqICAuZGVib3VuY2UoMzAwKVxuICogIC5tYXAoeCA9PiAzICogeCk7XG4gKlxuICogY2xhc3MgRm9vIHtcbiAqICBAc2VsZWN0JChbJ2ZvbycsICdiYXInXSwgZGVib3VuY2VBbmRUcmlwbGUpXG4gKiAgcmVhZG9ubHkgZGVib3VuY2VkRm9vQmFyJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3QkPFQ+KFxuICBzZWxlY3RvcjogU2VsZWN0b3I8YW55LCBUPixcbiAgdHJhbnNmb3JtZXI6IFRyYW5zZm9ybWVyPGFueSwgVD4sXG4gIGNvbXBhcmF0b3I/OiBDb21wYXJhdG9yLFxuKTogUHJvcGVydHlEZWNvcmF0b3Ige1xuICByZXR1cm4gZGVjb3JhdGUoc2VsZWN0b3IsIHRyYW5zZm9ybWVyLCBjb21wYXJhdG9yKTtcbn1cblxuZnVuY3Rpb24gZGVjb3JhdGUoXG4gIHNlbGVjdG9yOiBTZWxlY3RvcjxhbnksIGFueT4sXG4gIHRyYW5zZm9ybWVyPzogVHJhbnNmb3JtZXI8YW55LCBhbnk+LFxuICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbik6IFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRlY29yYXRvcih0YXJnZXQ6IGFueSwga2V5KTogdm9pZCB7XG4gICAgZnVuY3Rpb24gZ2V0dGVyKHRoaXM6IGFueSkge1xuICAgICAgcmV0dXJuIGdldEluc3RhbmNlU2VsZWN0aW9uKHRoaXMsIGtleSwgc2VsZWN0b3IsIHRyYW5zZm9ybWVyLCBjb21wYXJhdG9yKTtcbiAgICB9XG5cbiAgICAvLyBSZXBsYWNlIGRlY29yYXRlZCBwcm9wZXJ0eSB3aXRoIGEgZ2V0dGVyIHRoYXQgcmV0dXJucyB0aGUgb2JzZXJ2YWJsZS5cbiAgICBpZiAoZGVsZXRlIHRhcmdldFtrZXldKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHtcbiAgICAgICAgZ2V0OiBnZXR0ZXIsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbiIsImltcG9ydCB7IEZyYWN0YWxTdG9yZU9wdGlvbnMsIHNldENsYXNzT3B0aW9ucyB9IGZyb20gJy4vaGVscGVycyc7XG5cbi8qKlxuICogTW9kaWZpZXMgdGhlIGJlaGF2aW91ciBvZiBhbnkgYEBzZWxlY3RgLCBgQHNlbGVjdCRgLCBvciBgQGRpc3BhdGNoYFxuICogZGVjb3JhdG9ycyB0byBvcGVyYXRlIG9uIGEgc3Vic3RvcmUgZGVmaW5lZCBieSB0aGUgSUZyYWN0YWxTdG9yZU9wdGlvbnMuXG4gKlxuICogU2VlOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXItcmVkdXgvc3RvcmUvYmxvYi9tYXN0ZXIvYXJ0aWNsZXMvZnJhY3RhbC1zdG9yZS5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgU3ViU3RvcmVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gV2l0aFN1YlN0b3JlKHtcbiAgYmFzZVBhdGhNZXRob2ROYW1lLFxuICBsb2NhbFJlZHVjZXIsXG59OiBGcmFjdGFsU3RvcmVPcHRpb25zKTogQ2xhc3NEZWNvcmF0b3Ige1xuICByZXR1cm4gZnVuY3Rpb24gZGVjb3JhdGUoY29uc3RydWN0b3I6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgc2V0Q2xhc3NPcHRpb25zKGNvbnN0cnVjdG9yLCB7XG4gICAgICBiYXNlUGF0aE1ldGhvZE5hbWUsXG4gICAgICBsb2NhbFJlZHVjZXIsXG4gICAgfSk7XG4gIH07XG59XG4iLCIvKiogQGhpZGRlbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2VydCA9IChjb25kaXRpb246IGJvb2xlYW4sIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfVxufTtcbiIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGdldEluIH0gZnJvbSAnLi4vdXRpbHMvZ2V0LWluJztcblxuLyoqXG4gKiBDdXN0b20gZXF1YWxpdHkgY2hlY2tlciB0aGF0IGNhbiBiZSB1c2VkIHdpdGggYC5zZWxlY3RgIGFuZCBgQHNlbGVjdGAuXG4gKiBgYGB0c1xuICogY29uc3QgY3VzdG9tQ29tcGFyZTogQ29tcGFyYXRvciA9ICh4OiBhbnksIHk6IGFueSkgPT4ge1xuICogIHJldHVybiB4LmlkID09PSB5LmlkXG4gKiB9XG4gKlxuICogQHNlbGVjdChzZWxlY3RvciwgY3VzdG9tQ29tcGFyZSlcbiAqIGBgYFxuICovXG5leHBvcnQgdHlwZSBDb21wYXJhdG9yID0gKHg6IGFueSwgeTogYW55KSA9PiBib29sZWFuO1xuZXhwb3J0IHR5cGUgVHJhbnNmb3JtZXI8Um9vdFN0YXRlLCBWPiA9IChcbiAgc3RvcmUkOiBPYnNlcnZhYmxlPFJvb3RTdGF0ZT4sXG4gIHNjb3BlOiBhbnksXG4pID0+IE9ic2VydmFibGU8Vj47XG5leHBvcnQgdHlwZSBQcm9wZXJ0eVNlbGVjdG9yID0gc3RyaW5nIHwgbnVtYmVyIHwgc3ltYm9sO1xuZXhwb3J0IHR5cGUgUGF0aFNlbGVjdG9yID0gKHN0cmluZyB8IG51bWJlcilbXTtcbmV4cG9ydCB0eXBlIEZ1bmN0aW9uU2VsZWN0b3I8Um9vdFN0YXRlLCBTPiA9ICgoczogUm9vdFN0YXRlKSA9PiBTKTtcbmV4cG9ydCB0eXBlIFNlbGVjdG9yPFJvb3RTdGF0ZSwgUz4gPVxuICB8IFByb3BlcnR5U2VsZWN0b3JcbiAgfCBQYXRoU2VsZWN0b3JcbiAgfCBGdW5jdGlvblNlbGVjdG9yPFJvb3RTdGF0ZSwgUz47XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgY29uc3Qgc25pZmZTZWxlY3RvclR5cGUgPSA8Um9vdFN0YXRlLCBTPihcbiAgc2VsZWN0b3I/OiBTZWxlY3RvcjxSb290U3RhdGUsIFM+LFxuKSA9PlxuICAhc2VsZWN0b3JcbiAgICA/ICduaWwnXG4gICAgOiBBcnJheS5pc0FycmF5KHNlbGVjdG9yKVxuICAgICAgPyAncGF0aCdcbiAgICAgIDogJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIHNlbGVjdG9yXG4gICAgICAgID8gJ2Z1bmN0aW9uJ1xuICAgICAgICA6ICdwcm9wZXJ0eSc7XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgY29uc3QgcmVzb2x2ZXIgPSA8Um9vdFN0YXRlLCBTPihzZWxlY3Rvcj86IFNlbGVjdG9yPFJvb3RTdGF0ZSwgUz4pID0+ICh7XG4gIHByb3BlcnR5OiAoc3RhdGU6IGFueSkgPT5cbiAgICBzdGF0ZSA/IHN0YXRlW3NlbGVjdG9yIGFzIFByb3BlcnR5U2VsZWN0b3JdIDogdW5kZWZpbmVkLFxuICBwYXRoOiAoc3RhdGU6IFJvb3RTdGF0ZSkgPT4gZ2V0SW4oc3RhdGUsIHNlbGVjdG9yIGFzIFBhdGhTZWxlY3RvciksXG4gIGZ1bmN0aW9uOiBzZWxlY3RvciBhcyBGdW5jdGlvblNlbGVjdG9yPFJvb3RTdGF0ZSwgUz4sXG4gIG5pbDogKHN0YXRlOiBSb290U3RhdGUpID0+IHN0YXRlLFxufSk7XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgY29uc3QgcmVzb2x2ZVRvRnVuY3Rpb25TZWxlY3RvciA9IDxSb290U3RhdGUsIFM+KFxuICBzZWxlY3Rvcj86IFNlbGVjdG9yPFJvb3RTdGF0ZSwgUz4sXG4pID0+IHJlc29sdmVyKHNlbGVjdG9yKVtzbmlmZlNlbGVjdG9yVHlwZShzZWxlY3RvcildO1xuIiwiaW1wb3J0IHsgQW55QWN0aW9uLCBEaXNwYXRjaCwgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGdldEluIH0gZnJvbSAnLi4vdXRpbHMvZ2V0LWluJztcbmltcG9ydCB7XG4gIHJlZ2lzdGVyRnJhY3RhbFJlZHVjZXIsXG4gIHJlcGxhY2VMb2NhbFJlZHVjZXIsXG59IGZyb20gJy4vZnJhY3RhbC1yZWR1Y2VyLW1hcCc7XG5pbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnLi9uZy1yZWR1eCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlU3RvcmUgfSBmcm9tICcuL29ic2VydmFibGUtc3RvcmUnO1xuaW1wb3J0IHtcbiAgQ29tcGFyYXRvcixcbiAgUGF0aFNlbGVjdG9yLFxuICByZXNvbHZlVG9GdW5jdGlvblNlbGVjdG9yLFxuICBTZWxlY3Rvcixcbn0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuXG4vKiogQGhpZGRlbiAqL1xuZXhwb3J0IGNsYXNzIFN1YlN0b3JlPFN0YXRlPiBpbXBsZW1lbnRzIE9ic2VydmFibGVTdG9yZTxTdGF0ZT4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvb3RTdG9yZTogTmdSZWR1eDxhbnk+LFxuICAgIHByaXZhdGUgYmFzZVBhdGg6IFBhdGhTZWxlY3RvcixcbiAgICBsb2NhbFJlZHVjZXI6IFJlZHVjZXI8U3RhdGUsIEFueUFjdGlvbj4sXG4gICkge1xuICAgIHJlZ2lzdGVyRnJhY3RhbFJlZHVjZXIoYmFzZVBhdGgsIGxvY2FsUmVkdWNlcik7XG4gIH1cblxuICBkaXNwYXRjaDogRGlzcGF0Y2g8QW55QWN0aW9uPiA9IGFjdGlvbiA9PlxuICAgIHRoaXMucm9vdFN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIC4uLihhY3Rpb24gYXMgYW55KSxcbiAgICAgICdAYW5ndWxhci1yZWR1eDo6ZnJhY3RhbGtleSc6IEpTT04uc3RyaW5naWZ5KHRoaXMuYmFzZVBhdGgpLFxuICAgIH0pO1xuXG4gIGdldFN0YXRlID0gKCk6IFN0YXRlID0+IGdldEluKHRoaXMucm9vdFN0b3JlLmdldFN0YXRlKCksIHRoaXMuYmFzZVBhdGgpO1xuXG4gIGNvbmZpZ3VyZVN1YlN0b3JlID0gPFN1YlN0YXRlPihcbiAgICBiYXNlUGF0aDogUGF0aFNlbGVjdG9yLFxuICAgIGxvY2FsUmVkdWNlcjogUmVkdWNlcjxTdWJTdGF0ZSwgQW55QWN0aW9uPixcbiAgKTogT2JzZXJ2YWJsZVN0b3JlPFN1YlN0YXRlPiA9PlxuICAgIG5ldyBTdWJTdG9yZTxTdWJTdGF0ZT4oXG4gICAgICB0aGlzLnJvb3RTdG9yZSxcbiAgICAgIFsuLi50aGlzLmJhc2VQYXRoLCAuLi5iYXNlUGF0aF0sXG4gICAgICBsb2NhbFJlZHVjZXIsXG4gICAgKTtcblxuICBzZWxlY3QgPSA8U2VsZWN0ZWRTdGF0ZT4oXG4gICAgc2VsZWN0b3I/OiBTZWxlY3RvcjxTdGF0ZSwgU2VsZWN0ZWRTdGF0ZT4sXG4gICAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4gICk6IE9ic2VydmFibGU8U2VsZWN0ZWRTdGF0ZT4gPT5cbiAgICB0aGlzLnJvb3RTdG9yZS5zZWxlY3Q8U3RhdGU+KHRoaXMuYmFzZVBhdGgpLnBpcGUoXG4gICAgICBtYXAocmVzb2x2ZVRvRnVuY3Rpb25TZWxlY3RvcihzZWxlY3RvcikpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoY29tcGFyYXRvciksXG4gICAgKTtcblxuICBzdWJzY3JpYmUgPSAobGlzdGVuZXI6ICgpID0+IHZvaWQpOiAoKCkgPT4gdm9pZCkgPT4ge1xuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHRoaXMuc2VsZWN0KCkuc3Vic2NyaWJlKGxpc3RlbmVyKTtcbiAgICByZXR1cm4gKCkgPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH07XG5cbiAgcmVwbGFjZVJlZHVjZXIgPSAobmV4dExvY2FsUmVkdWNlcjogUmVkdWNlcjxTdGF0ZSwgQW55QWN0aW9uPikgPT5cbiAgICByZXBsYWNlTG9jYWxSZWR1Y2VyKHRoaXMuYmFzZVBhdGgsIG5leHRMb2NhbFJlZHVjZXIpO1xufVxuIiwiaW1wb3J0IHtcbiAgQW55QWN0aW9uLFxuICBhcHBseU1pZGRsZXdhcmUsXG4gIGNvbXBvc2UsXG4gIGNyZWF0ZVN0b3JlLFxuICBEaXNwYXRjaCxcbiAgTWlkZGxld2FyZSxcbiAgUmVkdWNlcixcbiAgU3RvcmUsXG4gIFN0b3JlRW5oYW5jZXIsXG4gIFVuc3Vic2NyaWJlLFxufSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7IE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi91dGlscy9hc3NlcnQnO1xuaW1wb3J0IHsgZW5hYmxlRnJhY3RhbFJlZHVjZXJzIH0gZnJvbSAnLi9mcmFjdGFsLXJlZHVjZXItbWFwJztcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICcuL25nLXJlZHV4JztcbmltcG9ydCB7IE9ic2VydmFibGVTdG9yZSB9IGZyb20gJy4vb2JzZXJ2YWJsZS1zdG9yZSc7XG5pbXBvcnQge1xuICBDb21wYXJhdG9yLFxuICBQYXRoU2VsZWN0b3IsXG4gIHJlc29sdmVUb0Z1bmN0aW9uU2VsZWN0b3IsXG4gIFNlbGVjdG9yLFxufSBmcm9tICcuL3NlbGVjdG9ycyc7XG5pbXBvcnQgeyBTdWJTdG9yZSB9IGZyb20gJy4vc3ViLXN0b3JlJztcblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBjbGFzcyBSb290U3RvcmU8Um9vdFN0YXRlPiBleHRlbmRzIE5nUmVkdXg8Um9vdFN0YXRlPiB7XG4gIHByaXZhdGUgc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIHByaXZhdGUgc3RvcmUkOiBCZWhhdmlvclN1YmplY3Q8Um9vdFN0YXRlPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIE5nUmVkdXguaW5zdGFuY2UgPSB0aGlzO1xuICAgIHRoaXMuc3RvcmUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxSb290U3RhdGUgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCkucGlwZShcbiAgICAgIGZpbHRlcihuID0+IG4gIT09IHVuZGVmaW5lZCksXG4gICAgICBzd2l0Y2hNYXAob2JzZXJ2YWJsZVN0b3JlID0+IG9ic2VydmFibGVTdG9yZSBhcyBhbnkpLFxuICAgICAgLy8gVE9ETzogZml4IHRoaXM/IG5lZWRpbmcgdG8gZXhwbGljaXRseSBjYXN0IHRoaXMgaXMgd3JvbmdcbiAgICApIGFzIEJlaGF2aW9yU3ViamVjdDxSb290U3RhdGU+O1xuICB9XG5cbiAgY29uZmlndXJlU3RvcmUgPSAoXG4gICAgcm9vdFJlZHVjZXI6IFJlZHVjZXI8Um9vdFN0YXRlLCBBbnlBY3Rpb24+LFxuICAgIGluaXRTdGF0ZTogUm9vdFN0YXRlLFxuICAgIG1pZGRsZXdhcmU6IE1pZGRsZXdhcmVbXSA9IFtdLFxuICAgIGVuaGFuY2VyczogU3RvcmVFbmhhbmNlcjxSb290U3RhdGU+W10gPSBbXSxcbiAgKTogdm9pZCA9PiB7XG4gICAgYXNzZXJ0KCF0aGlzLnN0b3JlLCAnU3RvcmUgYWxyZWFkeSBjb25maWd1cmVkIScpO1xuXG4gICAgLy8gVmFyaWFibGUtYXJpdHkgY29tcG9zZSBpbiB0eXBlc2NyaXB0IEZUVy5cbiAgICB0aGlzLnNldFN0b3JlKFxuICAgICAgY29tcG9zZS5hcHBseShudWxsLCBbYXBwbHlNaWRkbGV3YXJlKC4uLm1pZGRsZXdhcmUpLCAuLi5lbmhhbmNlcnNdKShcbiAgICAgICAgY3JlYXRlU3RvcmUsXG4gICAgICApKGVuYWJsZUZyYWN0YWxSZWR1Y2Vycyhyb290UmVkdWNlciksIGluaXRTdGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBwcm92aWRlU3RvcmUgPSAoc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4pID0+IHtcbiAgICBhc3NlcnQoIXRoaXMuc3RvcmUsICdTdG9yZSBhbHJlYWR5IGNvbmZpZ3VyZWQhJyk7XG4gICAgdGhpcy5zZXRTdG9yZShzdG9yZSk7XG4gIH07XG5cbiAgZ2V0U3RhdGUgPSAoKTogUm9vdFN0YXRlID0+IHRoaXMuc3RvcmUhLmdldFN0YXRlKCk7XG5cbiAgc3Vic2NyaWJlID0gKGxpc3RlbmVyOiAoKSA9PiB2b2lkKTogVW5zdWJzY3JpYmUgPT5cbiAgICB0aGlzLnN0b3JlIS5zdWJzY3JpYmUobGlzdGVuZXIpO1xuXG4gIHJlcGxhY2VSZWR1Y2VyID0gKG5leHRSZWR1Y2VyOiBSZWR1Y2VyPFJvb3RTdGF0ZSwgQW55QWN0aW9uPik6IHZvaWQgPT4ge1xuICAgIHRoaXMuc3RvcmUhLnJlcGxhY2VSZWR1Y2VyKG5leHRSZWR1Y2VyKTtcbiAgfTtcblxuICBkaXNwYXRjaDogRGlzcGF0Y2g8QW55QWN0aW9uPiA9IDxBIGV4dGVuZHMgQW55QWN0aW9uPihhY3Rpb246IEEpOiBBID0+IHtcbiAgICBhc3NlcnQoXG4gICAgICAhIXRoaXMuc3RvcmUsXG4gICAgICAnRGlzcGF0Y2ggZmFpbGVkOiBkaWQgeW91IGZvcmdldCB0byBjb25maWd1cmUgeW91ciBzdG9yZT8gJyArXG4gICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci1yZWR1eC9AYW5ndWxhci1yZWR1eC9jb3JlL2Jsb2IvbWFzdGVyLycgK1xuICAgICAgICAnUkVBRE1FLm1kI3F1aWNrLXN0YXJ0JyxcbiAgICApO1xuXG4gICAgaWYgKCFOZ1pvbmUuaXNJbkFuZ3VsYXJab25lKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5zdG9yZSEuZGlzcGF0Y2goYWN0aW9uKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnN0b3JlIS5kaXNwYXRjaChhY3Rpb24pO1xuICAgIH1cbiAgfTtcblxuICBzZWxlY3QgPSA8U2VsZWN0ZWRUeXBlPihcbiAgICBzZWxlY3Rvcj86IFNlbGVjdG9yPFJvb3RTdGF0ZSwgU2VsZWN0ZWRUeXBlPixcbiAgICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbiAgKTogT2JzZXJ2YWJsZTxTZWxlY3RlZFR5cGU+ID0+XG4gICAgdGhpcy5zdG9yZSQucGlwZShcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICBtYXAocmVzb2x2ZVRvRnVuY3Rpb25TZWxlY3RvcihzZWxlY3RvcikpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoY29tcGFyYXRvciksXG4gICAgKTtcblxuICBjb25maWd1cmVTdWJTdG9yZSA9IDxTdWJTdGF0ZT4oXG4gICAgYmFzZVBhdGg6IFBhdGhTZWxlY3RvcixcbiAgICBsb2NhbFJlZHVjZXI6IFJlZHVjZXI8U3ViU3RhdGUsIEFueUFjdGlvbj4sXG4gICk6IE9ic2VydmFibGVTdG9yZTxTdWJTdGF0ZT4gPT5cbiAgICBuZXcgU3ViU3RvcmU8U3ViU3RhdGU+KHRoaXMsIGJhc2VQYXRoLCBsb2NhbFJlZHVjZXIpO1xuXG4gIHByaXZhdGUgc2V0U3RvcmUoc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4pIHtcbiAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgY29uc3Qgc3RvcmVTZXJ2YWJsZSA9IHRoaXMuc3RvcmVUb09ic2VydmFibGUoc3RvcmUpO1xuICAgIHRoaXMuc3RvcmUkLm5leHQoc3RvcmVTZXJ2YWJsZSBhcyBhbnkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdG9yZVRvT2JzZXJ2YWJsZSA9IChcbiAgICBzdG9yZTogU3RvcmU8Um9vdFN0YXRlPixcbiAgKTogT2JzZXJ2YWJsZTxSb290U3RhdGU+ID0+XG4gICAgbmV3IE9ic2VydmFibGU8Um9vdFN0YXRlPigob2JzZXJ2ZXI6IE9ic2VydmVyPFJvb3RTdGF0ZT4pID0+IHtcbiAgICAgIG9ic2VydmVyLm5leHQoc3RvcmUuZ2V0U3RhdGUoKSk7XG4gICAgICBjb25zdCB1bnN1YnNjcmliZUZyb21SZWR1eCA9IHN0b3JlLnN1YnNjcmliZSgoKSA9PlxuICAgICAgICBvYnNlcnZlci5uZXh0KHN0b3JlLmdldFN0YXRlKCkpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHVuc3Vic2NyaWJlRnJvbVJlZHV4KCk7XG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9O1xuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGV2VG9vbHNFeHRlbnNpb24gfSBmcm9tICcuL2NvbXBvbmVudHMvZGV2LXRvb2xzJztcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICcuL2NvbXBvbmVudHMvbmctcmVkdXgnO1xuaW1wb3J0IHsgUm9vdFN0b3JlIH0gZnJvbSAnLi9jb21wb25lbnRzL3Jvb3Qtc3RvcmUnO1xuXG4vKiogQGhpZGRlbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9uZ1JlZHV4RmFjdG9yeShuZ1pvbmU6IE5nWm9uZSkge1xuICByZXR1cm4gbmV3IFJvb3RTdG9yZShuZ1pvbmUpO1xufVxuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBEZXZUb29sc0V4dGVuc2lvbixcbiAgICB7IHByb3ZpZGU6IE5nUmVkdXgsIHVzZUZhY3Rvcnk6IF9uZ1JlZHV4RmFjdG9yeSwgZGVwczogW05nWm9uZV0gfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdSZWR1eE1vZHVsZSB7fVxuIl0sIm5hbWVzIjpbIm1hcCIsInRzbGliXzEuX19leHRlbmRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFvQjJDLFNBQVM7a0JBcEJwRDs7Ozs7OztBQ0FBO0FBa0JBLElBQU0sV0FBVyxzQkFBNkIsT0FBTyxNQUFNLEtBQUssV0FBVztNQUN2RSxNQUFNO01BQ04sRUFBRSxHQUE2Qjs7Ozs7O0lBUWpDLDJCQUFvQixNQUFzQixFQUFVLE9BQXFCO1FBQXpFLGlCQUE2RTtRQUF6RCxXQUFNLEdBQU4sTUFBTSxDQUFn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