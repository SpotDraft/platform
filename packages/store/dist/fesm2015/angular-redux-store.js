import { ApplicationRef, Injectable, NgZone, NgModule } from '@angular/core';
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
class NgRedux {
}
/**
 * \@hidden, \@deprecated
 */
NgRedux.instance = undefined;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const environment = /** @type {?} */ ((typeof window !== 'undefined'
    ? window
    : {}));
/**
 * An angular-2-ified version of the Redux DevTools chrome extension.
 */
class DevToolsExtension {
    /**
     * @hidden
     * @param {?} appRef
     * @param {?} ngRedux
     */
    constructor(appRef, ngRedux) {
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
        this.enhancer = (options) => {
            /** @type {?} */
            let subscription;
            if (!this.isEnabled()) {
                return null;
            } /** @type {?} */
            ((
            // Make sure changes from dev tools update angular's view.
            this.getDevTools())).listen(({ type }) => {
                if (type === 'START') {
                    subscription = this.ngRedux.subscribe(() => {
                        if (!NgZone.isInAngularZone()) {
                            this.appRef.tick();
                        }
                    });
                }
                else if (type === 'STOP') {
                    subscription();
                }
            });
            return /** @type {?} */ ((this.getDevTools()))(options || {});
        };
        /**
         * Returns true if the extension is installed and enabled.
         */
        this.isEnabled = () => !!this.getDevTools();
        /**
         * Returns the redux devtools enhancer.
         */
        this.getDevTools = () => environment &&
            (environment.__REDUX_DEVTOOLS_EXTENSION__ || environment.devToolsExtension);
    }
}
DevToolsExtension.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DevToolsExtension.ctorParameters = () => [
    { type: ApplicationRef },
    { type: NgRedux }
];

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
    const [firstElem, ...restElems] = pathElems;
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
const setIn = (obj, [firstElem, ...restElems], value) => 'function' === typeof (obj[firstElem] || {}).setIn
    ? Object.assign({}, obj, { [firstElem]: obj[firstElem].setIn(restElems, value) }) : Object.assign({}, obj, { [firstElem]: restElems.length === 0
        ? value
        : setIn(obj[firstElem] || {}, restElems, value) });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
let reducerMap = {};
/** @type {?} */
const composeReducers = (...reducers) => (state, action) => reducers.reduce((subState, reducer) => reducer(subState, action), state);
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
    const existingFractalReducer = reducerMap[JSON.stringify(basePath)];
    if (existingFractalReducer && existingFractalReducer !== localReducer) {
        throw new Error(`attempt to overwrite fractal reducer for basePath ${basePath}`);
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
function rootFractalReducer(state = {}, action) {
    /** @type {?} */
    const fractalKey = action['@angular-redux::fractalkey'];
    /** @type {?} */
    const fractalPath = fractalKey ? JSON.parse(fractalKey) : [];
    /** @type {?} */
    const localReducer = reducerMap[fractalKey || ''];
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
const OPTIONS_KEY = '@angular-redux::substore::class::options';
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
const INSTANCE_SUBSTORE_KEY = '@angular-redux::substore::instance::store';
/** @type {?} */
const INSTANCE_SELECTIONS_KEY = '@angular-redux::substore::instance::selections';
/** *
 * Used to detect when the base path changes - this allows components to
 * dynamically adjust their selections if necessary.
  @type {?} */
const INSTANCE_BASE_PATH_KEY = '@angular-redux::substore::instance::basepath';
/** @type {?} */
const getClassOptions = (decoratedInstance) => decoratedInstance.constructor[OPTIONS_KEY];
/** *
 * @hidden
  @type {?} */
const setClassOptions = (decoratedClassConstructor, options) => {
    decoratedClassConstructor[OPTIONS_KEY] = options;
};
/** @type {?} */
const setInstanceStore = (decoratedInstance, store) => (decoratedInstance[INSTANCE_SUBSTORE_KEY] = store);
/** @type {?} */
const getInstanceStore = (decoratedInstance) => decoratedInstance[INSTANCE_SUBSTORE_KEY];
/** @type {?} */
const getInstanceSelectionMap = (decoratedInstance) => {
    /** @type {?} */
    const map$$1 = decoratedInstance[INSTANCE_SELECTIONS_KEY] || {};
    decoratedInstance[INSTANCE_SELECTIONS_KEY] = map$$1;
    return map$$1;
};
/** @type {?} */
const hasBasePathChanged = (decoratedInstance, basePath) => decoratedInstance[INSTANCE_BASE_PATH_KEY] !== (basePath || []).toString();
/** @type {?} */
const setInstanceBasePath = (decoratedInstance, basePath) => {
    decoratedInstance[INSTANCE_BASE_PATH_KEY] = (basePath || []).toString();
};
/** @type {?} */
const clearInstanceState = (decoratedInstance) => {
    decoratedInstance[INSTANCE_SELECTIONS_KEY] = null;
    decoratedInstance[INSTANCE_SUBSTORE_KEY] = null;
    decoratedInstance[INSTANCE_BASE_PATH_KEY] = null;
};
/** *
 * Gets the store associated with a decorated instance (e.g. a
 * component or service)
 * @hidden
  @type {?} */
const getBaseStore = (decoratedInstance) => {
    // The root store hasn't been set up yet.
    if (!NgRedux.instance) {
        return undefined;
    }
    /** @type {?} */
    const options = getClassOptions(decoratedInstance);
    // This is not decorated with `@WithSubStore`. Return the root store.
    if (!options) {
        return NgRedux.instance;
    }
    /** @type {?} */
    const basePath = decoratedInstance[options.basePathMethodName]();
    if (hasBasePathChanged(decoratedInstance, basePath)) {
        clearInstanceState(decoratedInstance);
        setInstanceBasePath(decoratedInstance, basePath);
    }
    if (!basePath) {
        return NgRedux.instance;
    }
    /** @type {?} */
    const store = getInstanceStore(decoratedInstance);
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
const getInstanceSelection = (decoratedInstance, key, selector, transformer, comparator) => {
    /** @type {?} */
    const store = getBaseStore(decoratedInstance);
    if (store) {
        /** @type {?} */
        const selections = getInstanceSelectionMap(decoratedInstance);
        selections[key] =
            selections[key] ||
                (!transformer
                    ? store.select(selector, comparator)
                    : store.select(selector).pipe(obs$ => transformer(obs$, decoratedInstance), distinctUntilChanged(comparator)));
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
        let originalMethod;
        /** @type {?} */
        const wrapped = function (...args) {
            /** @type {?} */
            const result = originalMethod.apply(this, args);
            if (result !== false) {
                /** @type {?} */
                const store = getBaseStore(this) || NgRedux.instance;
                if (store) {
                    store.dispatch(result);
                }
            }
            return result;
        };
        descriptor = descriptor || Object.getOwnPropertyDescriptor(target, key);
        if (descriptor === undefined) {
            /** @type {?} */
            const dispatchDescriptor = {
                get: () => wrapped,
                set: setMethod => (originalMethod = setMethod),
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
    return (target, key) => {
        /** @type {?} */
        const adjustedSelector = selector
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
function WithSubStore({ basePathMethodName, localReducer, }) {
    return function decorate(constructor) {
        setClassOptions(constructor, {
            basePathMethodName,
            localReducer,
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
const assert = (condition, message) => {
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
const sniffSelectorType = (selector) => !selector
    ? 'nil'
    : Array.isArray(selector)
        ? 'path'
        : 'function' === typeof selector
            ? 'function'
            : 'property';
/** *
 * @hidden
  @type {?} */
const resolver = (selector) => ({
    property: (state) => state ? state[/** @type {?} */ (selector)] : undefined,
    path: (state) => getIn(state, /** @type {?} */ (selector)),
    function: /** @type {?} */ (selector),
    nil: (state) => state,
});
/** *
 * @hidden
  @type {?} */
const resolveToFunctionSelector = (selector) => resolver(selector)[sniffSelectorType(selector)];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @hidden
 * @template State
 */
class SubStore {
    /**
     * @param {?} rootStore
     * @param {?} basePath
     * @param {?} localReducer
     */
    constructor(rootStore, basePath, localReducer) {
        this.rootStore = rootStore;
        this.basePath = basePath;
        this.dispatch = action => this.rootStore.dispatch(Object.assign({}, (/** @type {?} */ (action)), { '@angular-redux::fractalkey': JSON.stringify(this.basePath) }));
        this.getState = () => getIn(this.rootStore.getState(), this.basePath);
        this.configureSubStore = (basePath, localReducer) => new SubStore(this.rootStore, [...this.basePath, ...basePath], localReducer);
        this.select = (selector, comparator) => this.rootStore.select(this.basePath).pipe(map(resolveToFunctionSelector(selector)), distinctUntilChanged(comparator));
        this.subscribe = (listener) => {
            /** @type {?} */
            const subscription = this.select().subscribe(listener);
            return () => subscription.unsubscribe();
        };
        this.replaceReducer = (nextLocalReducer) => replaceLocalReducer(this.basePath, nextLocalReducer);
        registerFractalReducer(basePath, localReducer);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @hidden
 * @template RootState
 */
class RootStore extends NgRedux {
    /**
     * @param {?} ngZone
     */
    constructor(ngZone) {
        super();
        this.ngZone = ngZone;
        this.store = undefined;
        this.configureStore = (rootReducer, initState, middleware = [], enhancers = []) => {
            assert(!this.store, 'Store already configured!');
            // Variable-arity compose in typescript FTW.
            this.setStore(compose.apply(null, [applyMiddleware(...middleware), ...enhancers])(createStore)(enableFractalReducers(rootReducer), initState));
        };
        this.provideStore = (store) => {
            assert(!this.store, 'Store already configured!');
            this.setStore(store);
        };
        this.getState = () => /** @type {?} */ ((this.store)).getState();
        this.subscribe = (listener) => /** @type {?} */ ((this.store)).subscribe(listener);
        this.replaceReducer = (nextReducer) => {
            /** @type {?} */ ((this.store)).replaceReducer(nextReducer);
        };
        this.dispatch = (action) => {
            assert(!!this.store, 'Dispatch failed: did you forget to configure your store? ' +
                'https://github.com/angular-redux/@angular-redux/core/blob/master/' +
                'README.md#quick-start');
            if (!NgZone.isInAngularZone()) {
                return this.ngZone.run(() => /** @type {?} */ ((this.store)).dispatch(action));
            }
            else {
                return /** @type {?} */ ((this.store)).dispatch(action);
            }
        };
        this.select = (selector, comparator) => this.store$.pipe(distinctUntilChanged(), map(resolveToFunctionSelector(selector)), distinctUntilChanged(comparator));
        this.configureSubStore = (basePath, localReducer) => new SubStore(this, basePath, localReducer);
        this.storeToObservable = (store) => new Observable((observer) => {
            observer.next(store.getState());
            /** @type {?} */
            const unsubscribeFromRedux = store.subscribe(() => observer.next(store.getState()));
            return () => {
                unsubscribeFromRedux();
                observer.complete();
            };
        });
        NgRedux.instance = this;
        this.store$ = /** @type {?} */ (new BehaviorSubject(undefined).pipe(filter(n => n !== undefined), switchMap(observableStore => /** @type {?} */ (observableStore))));
    }
    /**
     * @param {?} store
     * @return {?}
     */
    setStore(store) {
        this.store = store;
        /** @type {?} */
        const storeServable = this.storeToObservable(store);
        this.store$.next(/** @type {?} */ (storeServable));
    }
}

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
class NgReduxModule {
}
NgReduxModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    DevToolsExtension,
                    { provide: NgRedux, useFactory: _ngReduxFactory, deps: [NgZone] },
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

export { NgRedux, NgReduxModule, DevToolsExtension, enableFractalReducers, select, select$, dispatch, WithSubStore, RootStore as ɵb, _ngReduxFactory as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1yZWR1eC1zdG9yZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvY29tcG9uZW50cy9uZy1yZWR1eC50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvY29tcG9uZW50cy9kZXYtdG9vbHMudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL3V0aWxzL2dldC1pbi50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvdXRpbHMvc2V0LWluLnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS9jb21wb25lbnRzL2ZyYWN0YWwtcmVkdWNlci1tYXAudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL2RlY29yYXRvcnMvaGVscGVycy50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvZGVjb3JhdG9ycy9kaXNwYXRjaC50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvZGVjb3JhdG9ycy9zZWxlY3QudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL2RlY29yYXRvcnMvd2l0aC1zdWItc3RvcmUudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL3V0aWxzL2Fzc2VydC50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvY29tcG9uZW50cy9zZWxlY3RvcnMudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL2NvbXBvbmVudHMvc3ViLXN0b3JlLnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS9jb21wb25lbnRzL3Jvb3Qtc3RvcmUudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL25nLXJlZHV4Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBbnlBY3Rpb24sXG4gIERpc3BhdGNoLFxuICBNaWRkbGV3YXJlLFxuICBSZWR1Y2VyLFxuICBTdG9yZSxcbiAgU3RvcmVFbmhhbmNlcixcbiAgVW5zdWJzY3JpYmUsXG59IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9ic2VydmFibGVTdG9yZSB9IGZyb20gJy4vb2JzZXJ2YWJsZS1zdG9yZSc7XG5pbXBvcnQgeyBDb21wYXJhdG9yLCBQYXRoU2VsZWN0b3IsIFNlbGVjdG9yIH0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIHB1YmxpYyBpbnRlcmZhY2Ugb2YgQGFuZ3VsYXItcmVkdXgvc3RvcmUuIEl0IHdyYXBzIHRoZSBnbG9iYWxcbiAqIHJlZHV4IHN0b3JlIGFuZCBhZGRzIGEgZmV3IG90aGVyIGFkZCBvbiBtZXRob2RzLiBJdCdzIHdoYXQgeW91J2xsIGluamVjdFxuICogaW50byB5b3VyIEFuZ3VsYXIgYXBwbGljYXRpb24gYXMgYSBzZXJ2aWNlLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdSZWR1eDxSb290U3RhdGU+IGltcGxlbWVudHMgT2JzZXJ2YWJsZVN0b3JlPFJvb3RTdGF0ZT4ge1xuICAvKiogQGhpZGRlbiwgQGRlcHJlY2F0ZWQgKi9cbiAgc3RhdGljIGluc3RhbmNlPzogT2JzZXJ2YWJsZVN0b3JlPGFueT4gPSB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgYSBSZWR1eCBzdG9yZSBhbmQgYWxsb3dzIE5nUmVkdXggdG8gb2JzZXJ2ZSBhbmQgZGlzcGF0Y2hcbiAgICogdG8gaXQuXG4gICAqXG4gICAqIFRoaXMgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uY2UgZm9yIHRoZSBsaWZldGltZSBvZiB5b3VyIGFwcCwgZm9yXG4gICAqIGV4YW1wbGUgaW4gdGhlIGNvbnN0cnVjdG9yIG9mIHlvdXIgcm9vdCBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSByb290UmVkdWNlciBZb3VyIGFwcCdzIHJvb3QgcmVkdWNlclxuICAgKiBAcGFyYW0gaW5pdFN0YXRlIFlvdXIgYXBwJ3MgaW5pdGlhbCBzdGF0ZVxuICAgKiBAcGFyYW0gbWlkZGxld2FyZSBPcHRpb25hbCBSZWR1eCBtaWRkbGV3YXJlc1xuICAgKiBAcGFyYW0gZW5oYW5jZXJzIE9wdGlvbmFsIFJlZHV4IHN0b3JlIGVuaGFuY2Vyc1xuICAgKi9cbiAgYWJzdHJhY3QgY29uZmlndXJlU3RvcmU6IChcbiAgICByb290UmVkdWNlcjogUmVkdWNlcjxSb290U3RhdGUsIEFueUFjdGlvbj4sXG4gICAgaW5pdFN0YXRlOiBSb290U3RhdGUsXG4gICAgbWlkZGxld2FyZT86IE1pZGRsZXdhcmVbXSxcbiAgICBlbmhhbmNlcnM/OiBTdG9yZUVuaGFuY2VyPFJvb3RTdGF0ZT5bXSxcbiAgKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBY2NlcHRzIGEgUmVkdXggc3RvcmUsIHRoZW4gc2V0cyBpdCBpbiBOZ1JlZHV4IGFuZFxuICAgKiBhbGxvd3MgTmdSZWR1eCB0byBvYnNlcnZlIGFuZCBkaXNwYXRjaCB0byBpdC5cbiAgICpcbiAgICogVGhpcyBzaG91bGQgb25seSBiZSBjYWxsZWQgb25jZSBmb3IgdGhlIGxpZmV0aW1lIG9mIHlvdXIgYXBwLCBmb3JcbiAgICogZXhhbXBsZSBpbiB0aGUgY29uc3RydWN0b3Igb2YgeW91ciByb290IGNvbXBvbmVudC4gSWYgY29uZmlndXJlU3RvcmVcbiAgICogaGFzIGJlZW4gdXNlZCB0aGlzIGNhbm5vdCBiZSB1c2VkLlxuICAgKlxuICAgKiBAcGFyYW0gc3RvcmUgWW91ciBhcHAncyBzdG9yZVxuICAgKi9cbiAgYWJzdHJhY3QgcHJvdmlkZVN0b3JlOiAoc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4pID0+IHZvaWQ7XG5cbiAgLy8gUmVkdXggU3RvcmUgbWV0aG9kc1xuICBhYnN0cmFjdCBkaXNwYXRjaDogRGlzcGF0Y2g8QW55QWN0aW9uPjtcbiAgYWJzdHJhY3QgZ2V0U3RhdGU6ICgpID0+IFJvb3RTdGF0ZTtcbiAgYWJzdHJhY3Qgc3Vic2NyaWJlOiAobGlzdGVuZXI6ICgpID0+IHZvaWQpID0+IFVuc3Vic2NyaWJlO1xuICBhYnN0cmFjdCByZXBsYWNlUmVkdWNlcjogKG5leHRSZWR1Y2VyOiBSZWR1Y2VyPFJvb3RTdGF0ZSwgQW55QWN0aW9uPikgPT4gdm9pZDtcblxuICAvLyBPYnNlcnZhYmxlU3RvcmUgbWV0aG9kcy5cbiAgYWJzdHJhY3Qgc2VsZWN0OiA8U2VsZWN0ZWRUeXBlPihcbiAgICBzZWxlY3Rvcj86IFNlbGVjdG9yPFJvb3RTdGF0ZSwgU2VsZWN0ZWRUeXBlPixcbiAgICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbiAgKSA9PiBPYnNlcnZhYmxlPFNlbGVjdGVkVHlwZT47XG4gIGFic3RyYWN0IGNvbmZpZ3VyZVN1YlN0b3JlOiA8U3ViU3RhdGU+KFxuICAgIGJhc2VQYXRoOiBQYXRoU2VsZWN0b3IsXG4gICAgbG9jYWxSZWR1Y2VyOiBSZWR1Y2VyPFN1YlN0YXRlLCBBbnlBY3Rpb24+LFxuICApID0+IE9ic2VydmFibGVTdG9yZTxTdWJTdGF0ZT47XG59XG4iLCJpbXBvcnQgeyBBcHBsaWNhdGlvblJlZiwgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbnlBY3Rpb24sIFN0b3JlRW5oYW5jZXIsIFVuc3Vic2NyaWJlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgRW5oYW5jZXJPcHRpb25zIH0gZnJvbSAncmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uJztcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICcuL25nLXJlZHV4JztcblxuZXhwb3J0IGludGVyZmFjZSBSZWR1eERldlRvb2xzIHtcbiAgKG9wdGlvbnM6IEVuaGFuY2VyT3B0aW9ucyk6IFN0b3JlRW5oYW5jZXI8YW55PjtcbiAgbGlzdGVuOiAoXG4gICAgb25NZXNzYWdlOiAobWVzc2FnZTogQW55QWN0aW9uKSA9PiB2b2lkLFxuICAgIGluc3RhbmNlSWQ/OiBzdHJpbmcsXG4gICkgPT4gdm9pZDtcbn1cblxuaW50ZXJmYWNlIFdpbmRvd1dpdGhSZWR1eERldlRvb2xzIGV4dGVuZHMgV2luZG93IHtcbiAgX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXz86IFJlZHV4RGV2VG9vbHM7XG4gIGRldlRvb2xzRXh0ZW5zaW9uPzogUmVkdXhEZXZUb29scztcbn1cblxuY29uc3QgZW52aXJvbm1lbnQ6IFdpbmRvd1dpdGhSZWR1eERldlRvb2xzID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gID8gd2luZG93XG4gIDoge30pIGFzIFdpbmRvd1dpdGhSZWR1eERldlRvb2xzO1xuXG4vKipcbiAqIEFuIGFuZ3VsYXItMi1pZmllZCB2ZXJzaW9uIG9mIHRoZSBSZWR1eCBEZXZUb29scyBjaHJvbWUgZXh0ZW5zaW9uLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGV2VG9vbHNFeHRlbnNpb24ge1xuICAvKiogQGhpZGRlbiAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsIHByaXZhdGUgbmdSZWR1eDogTmdSZWR1eDxhbnk+KSB7fVxuXG4gIC8qKlxuICAgKiBBIHdyYXBwZXIgZm9yIHRoZSBDaHJvbWUgRXh0ZW5zaW9uIFJlZHV4IERldlRvb2xzLlxuICAgKiBNYWtlcyBzdXJlIHN0YXRlIGNoYW5nZXMgdHJpZ2dlcmVkIGJ5IHRoZSBleHRlbnNpb25cbiAgICogdHJpZ2dlciBBbmd1bGFyMidzIGNoYW5nZSBkZXRlY3Rvci5cbiAgICpcbiAgICogQGFyZ3VtZW50IG9wdGlvbnM6IGRldiB0b29sIG9wdGlvbnM7IHNhbWVcbiAgICogZm9ybWF0IGFzIGRlc2NyaWJlZCBoZXJlOlxuICAgKiBbemFsbW94aXN1cy9yZWR1eC1kZXZ0b29scy1leHRlbnNpb24vYmxvYi9tYXN0ZXIvZG9jcy9BUEkvQXJndW1lbnRzLm1kXVxuICAgKi9cbiAgZW5oYW5jZXIgPSAob3B0aW9ucz86IEVuaGFuY2VyT3B0aW9ucykgPT4ge1xuICAgIGxldCBzdWJzY3JpcHRpb246IFVuc3Vic2NyaWJlO1xuICAgIGlmICghdGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIGNoYW5nZXMgZnJvbSBkZXYgdG9vbHMgdXBkYXRlIGFuZ3VsYXIncyB2aWV3LlxuICAgIHRoaXMuZ2V0RGV2VG9vbHMoKSEubGlzdGVuKCh7IHR5cGUgfSkgPT4ge1xuICAgICAgaWYgKHR5cGUgPT09ICdTVEFSVCcpIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0gdGhpcy5uZ1JlZHV4LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgaWYgKCFOZ1pvbmUuaXNJbkFuZ3VsYXJab25lKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwUmVmLnRpY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnU1RPUCcpIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXREZXZUb29scygpIShvcHRpb25zIHx8IHt9KTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBleHRlbnNpb24gaXMgaW5zdGFsbGVkIGFuZCBlbmFibGVkLlxuICAgKi9cbiAgaXNFbmFibGVkID0gKCkgPT4gISF0aGlzLmdldERldlRvb2xzKCk7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJlZHV4IGRldnRvb2xzIGVuaGFuY2VyLlxuICAgKi9cbiAgZ2V0RGV2VG9vbHMgPSAoKSA9PlxuICAgIGVudmlyb25tZW50ICYmXG4gICAgKGVudmlyb25tZW50Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX18gfHwgZW52aXJvbm1lbnQuZGV2VG9vbHNFeHRlbnNpb24pO1xufVxuIiwiLyoqXG4gKiBHZXRzIGEgZGVlcGx5LW5lc3RlZCBwcm9wZXJ0eSB2YWx1ZSBmcm9tIGFuIG9iamVjdCwgZ2l2ZW4gYSAncGF0aCdcbiAqIG9mIHByb3BlcnR5IG5hbWVzIG9yIGFycmF5IGluZGljZXMuXG4gKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW4oXG4gIHY6IGFueSB8IHVuZGVmaW5lZCxcbiAgcGF0aEVsZW1zOiAoc3RyaW5nIHwgbnVtYmVyKVtdLFxuKTogYW55IHwgdW5kZWZpbmVkIHtcbiAgaWYgKCF2KSB7XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICAvLyBJZiB0aGlzIGlzIGFuIEltbXV0YWJsZUpTIHN0cnVjdHVyZSwgdXNlIGV4aXN0aW5nIGdldEluIGZ1bmN0aW9uXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2Ygdi5nZXRJbikge1xuICAgIHJldHVybiB2LmdldEluKHBhdGhFbGVtcyk7XG4gIH1cblxuICBjb25zdCBbZmlyc3RFbGVtLCAuLi5yZXN0RWxlbXNdID0gcGF0aEVsZW1zO1xuXG4gIGlmICh1bmRlZmluZWQgPT09IHZbZmlyc3RFbGVtXSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAocmVzdEVsZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB2W2ZpcnN0RWxlbV07XG4gIH1cblxuICByZXR1cm4gZ2V0SW4odltmaXJzdEVsZW1dLCByZXN0RWxlbXMpO1xufVxuIiwiLyoqXG4gKiBTZXRzIGEgZGVlcGx5LW5lc3RlZCBwcm9wZXJ0eSB2YWx1ZSBmcm9tIGFuIG9iamVjdCwgZ2l2ZW4gYSAncGF0aCdcbiAqIG9mIHByb3BlcnR5IG5hbWVzIG9yIGFycmF5IGluZGljZXMuIFBhdGggZWxlbWVudHMgYXJlIGNyZWF0ZWQgaWZcbiAqIG5vdCB0aGVyZSBhbHJlYWR5LiBEb2VzIG5vdCBtdXRhdGUgdGhlIGdpdmVuIG9iamVjdC5cbiAqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRJbiA9IChcbiAgb2JqOiBhbnksXG4gIFtmaXJzdEVsZW0sIC4uLnJlc3RFbGVtc106IChzdHJpbmcgfCBudW1iZXIpW10sXG4gIHZhbHVlOiBhbnksXG4pOiBvYmplY3QgPT5cbiAgJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIChvYmpbZmlyc3RFbGVtXSB8fCB7fSkuc2V0SW5cbiAgICA/IHtcbiAgICAgICAgLi4ub2JqLFxuICAgICAgICBbZmlyc3RFbGVtXTogb2JqW2ZpcnN0RWxlbV0uc2V0SW4ocmVzdEVsZW1zLCB2YWx1ZSksXG4gICAgICB9XG4gICAgOiB7XG4gICAgICAgIC4uLm9iaixcbiAgICAgICAgW2ZpcnN0RWxlbV06XG4gICAgICAgICAgcmVzdEVsZW1zLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgPyB2YWx1ZVxuICAgICAgICAgICAgOiBzZXRJbihvYmpbZmlyc3RFbGVtXSB8fCB7fSwgcmVzdEVsZW1zLCB2YWx1ZSksXG4gICAgICB9O1xuIiwiaW1wb3J0IHsgQW55QWN0aW9uLCBSZWR1Y2VyIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgZ2V0SW4gfSBmcm9tICcuLi91dGlscy9nZXQtaW4nO1xuaW1wb3J0IHsgc2V0SW4gfSBmcm9tICcuLi91dGlscy9zZXQtaW4nO1xuaW1wb3J0IHsgUGF0aFNlbGVjdG9yIH0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuXG5sZXQgcmVkdWNlck1hcDogeyBbaWQ6IHN0cmluZ106IFJlZHVjZXI8YW55LCBBbnlBY3Rpb24+IH0gPSB7fTtcblxuY29uc3QgY29tcG9zZVJlZHVjZXJzID0gKFxuICAuLi5yZWR1Y2VyczogUmVkdWNlcjxhbnksIEFueUFjdGlvbj5bXVxuKTogUmVkdWNlcjxhbnksIEFueUFjdGlvbj4gPT4gKHN0YXRlOiBhbnksIGFjdGlvbjogQW55QWN0aW9uKSA9PlxuICByZWR1Y2Vycy5yZWR1Y2UoKHN1YlN0YXRlLCByZWR1Y2VyKSA9PiByZWR1Y2VyKHN1YlN0YXRlLCBhY3Rpb24pLCBzdGF0ZSk7XG5cbi8qKlxuICogQHBhcmFtIHJvb3RSZWR1Y2VyIENhbGwgdGhpcyBvbiB5b3VyIHJvb3QgcmVkdWNlciB0byBlbmFibGUgU3ViU3RvcmVcbiAqIGZ1bmN0aW9uYWxpdHkgZm9yIHByZS1jb25maWd1cmVkIHN0b3JlcyAoZS5nLiB1c2luZyBOZ1JlZHV4LnByb3ZpZGVTdG9yZSgpKS5cbiAqIE5nUmVkdXguY29uZmlndXJlU3RvcmVcbiAqIGRvZXMgaXQgZm9yIHlvdSB1bmRlciB0aGUgaG9vZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZUZyYWN0YWxSZWR1Y2Vycyhyb290UmVkdWNlcjogUmVkdWNlcjxhbnksIEFueUFjdGlvbj4pIHtcbiAgcmVkdWNlck1hcCA9IHt9O1xuICByZXR1cm4gY29tcG9zZVJlZHVjZXJzKHJvb3RGcmFjdGFsUmVkdWNlciwgcm9vdFJlZHVjZXIpO1xufVxuXG4vKiogQGhpZGRlbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRnJhY3RhbFJlZHVjZXIoXG4gIGJhc2VQYXRoOiBQYXRoU2VsZWN0b3IsXG4gIGxvY2FsUmVkdWNlcjogUmVkdWNlcjxhbnksIEFueUFjdGlvbj4sXG4pOiB2b2lkIHtcbiAgY29uc3QgZXhpc3RpbmdGcmFjdGFsUmVkdWNlciA9IHJlZHVjZXJNYXBbSlNPTi5zdHJpbmdpZnkoYmFzZVBhdGgpXTtcbiAgaWYgKGV4aXN0aW5nRnJhY3RhbFJlZHVjZXIgJiYgZXhpc3RpbmdGcmFjdGFsUmVkdWNlciAhPT0gbG9jYWxSZWR1Y2VyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYGF0dGVtcHQgdG8gb3ZlcndyaXRlIGZyYWN0YWwgcmVkdWNlciBmb3IgYmFzZVBhdGggJHtiYXNlUGF0aH1gLFxuICAgICk7XG4gIH1cblxuICByZWR1Y2VyTWFwW0pTT04uc3RyaW5naWZ5KGJhc2VQYXRoKV0gPSBsb2NhbFJlZHVjZXI7XG59XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZUxvY2FsUmVkdWNlcihcbiAgYmFzZVBhdGg6IFBhdGhTZWxlY3RvcixcbiAgbmV4dExvY2FsUmVkdWNlcjogUmVkdWNlcjxhbnksIEFueUFjdGlvbj4sXG4pOiB2b2lkIHtcbiAgcmVkdWNlck1hcFtKU09OLnN0cmluZ2lmeShiYXNlUGF0aCldID0gbmV4dExvY2FsUmVkdWNlcjtcbn1cblxuZnVuY3Rpb24gcm9vdEZyYWN0YWxSZWR1Y2VyKFxuICBzdGF0ZToge30gPSB7fSxcbiAgYWN0aW9uOiBBbnlBY3Rpb24gJiB7ICdAYW5ndWxhci1yZWR1eDo6ZnJhY3RhbGtleSc/OiBzdHJpbmcgfSxcbikge1xuICBjb25zdCBmcmFjdGFsS2V5ID0gYWN0aW9uWydAYW5ndWxhci1yZWR1eDo6ZnJhY3RhbGtleSddO1xuICBjb25zdCBmcmFjdGFsUGF0aCA9IGZyYWN0YWxLZXkgPyBKU09OLnBhcnNlKGZyYWN0YWxLZXkpIDogW107XG4gIGNvbnN0IGxvY2FsUmVkdWNlciA9IHJlZHVjZXJNYXBbZnJhY3RhbEtleSB8fCAnJ107XG4gIHJldHVybiBmcmFjdGFsS2V5ICYmIGxvY2FsUmVkdWNlclxuICAgID8gc2V0SW4oc3RhdGUsIGZyYWN0YWxQYXRoLCBsb2NhbFJlZHVjZXIoZ2V0SW4oc3RhdGUsIGZyYWN0YWxQYXRoKSwgYWN0aW9uKSlcbiAgICA6IHN0YXRlO1xufVxuIiwiaW1wb3J0IHsgQW55QWN0aW9uLCBSZWR1Y2VyIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnLi4vY29tcG9uZW50cy9uZy1yZWR1eCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlU3RvcmUgfSBmcm9tICcuLi9jb21wb25lbnRzL29ic2VydmFibGUtc3RvcmUnO1xuaW1wb3J0IHtcbiAgQ29tcGFyYXRvcixcbiAgUGF0aFNlbGVjdG9yLFxuICBTZWxlY3RvcixcbiAgVHJhbnNmb3JtZXIsXG59IGZyb20gJy4uL2NvbXBvbmVudHMvc2VsZWN0b3JzJztcblxuLyoqXG4gKiBVc2VkIHdpdGggdGhlIGBAV2l0aFN1YlN0b3JlYCBjbGFzcyBkZWNvcmF0b3IgdG8gZGVmaW5lIGEgU3ViU3RvcmUgKEFLQSBhXG4gKiBmcmFjdGFsIHN0b3JlKS5cbiAqXG4gKiBGb3IgbW9yZSBpbmZvIG9uIHN1YnN0b3Jlcywgc2VlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci1yZWR1eC9zdG9yZS9ibG9iL21hc3Rlci9hcnRpY2xlcy9mcmFjdGFsLXN0b3JlLm1kXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRnJhY3RhbFN0b3JlT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiBhbiBpbnN0YW5jZSBtZXRob2QgdGhhdCB3aWxsIGRlZmluZSB0aGVcbiAgICogYmFzZSBwYXRoIGZvciB0aGUgc3ViU3RvcmUuIFRoaXMgbWV0aG9kIGlzIGV4cGVjdGVkIHRvIHJldHVybiBhbiBhcnJheVxuICAgKiBvZiBwcm9wZXJ0eSBuYW1lcyBvciB1bmRlZmluZWQvbnVsbC5cbiAgICovXG4gIGJhc2VQYXRoTWV0aG9kTmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgbG9jYWxSZWR1Y2VyIGZvciB0aGUgc3Vic3RvcmUgaW4gcXVlc3Rpb24uXG4gICAqL1xuICBsb2NhbFJlZHVjZXI6IFJlZHVjZXI8YW55LCBBbnlBY3Rpb24+O1xufVxuXG4vKipcbiAqIE9QVElPTlNfS0VZOiB0aGlzIGlzIHBlci1jbGFzcyAoc3RhdGljKSBhbmQgaG9sZHMgdGhlIGNvbmZpZyBmcm9tIHRoZVxuICogQFN1YlN0b3JlIGRlY29yYXRvci5cbiAqL1xuY29uc3QgT1BUSU9OU19LRVkgPSAnQGFuZ3VsYXItcmVkdXg6OnN1YnN0b3JlOjpjbGFzczo6b3B0aW9ucyc7XG5cbi8qKlxuICogSU5TVEFOQ0VfU1VCU1RPUkVfS0VZLCBJTlNUQU5DRV9TRUxFQ1RJT05TX0tFWTogdGhlc2UgYXJlIHBlci1pbnN0YW5jZVxuICogKG5vbi1zdGF0aWMpIGFuZCBob2xkcyByZWZlcmVuY2VzIHRvIHRoZSBzdWJzdG9yZXMvc2VsZWN0ZWQgb2JzZXJ2YWJsZXNcbiAqIHRvIGJlIHVzZWQgYnkgYW4gaW5zdGFuY2Ugb2YgYSBkZWNvcmF0ZWQgY2xhc3MuIEknbSBub3QgdXNpbmdcbiAqIHJlZmxlY3QtbWV0YWRhdGEgaGVyZSBiZWNhdXNlIEkgd2FudFxuICpcbiAqIDEuIGRpZmZlcmVudCBpbnN0YW5jZXMgdG8gaGF2ZSBkaWZmZXJlbnQgc3Vic3RvcmVzIGluIHRoZSBjYXNlIHdoZXJlXG4gKiBgYmFzZVBhdGhNZXRob2ROYW1lYCBpcyBkeW5hbWljLlxuICogMi4gdGhlIGluc3RhbmNlIHN1YnN0b3JlIHRvIGJlIGdhcmJhZ2UgY29sbGVjdGVkIHdoZW4gdGhlIGluc3RhbmNlIGlzIG5vXG4gKiBsb25nZXIgcmVhY2hhYmxlLlxuICogVGhpcyBpcyB0aGVyZWZvcmUgYW4gb3duLXByb3BlcnR5IG9uIHRoZSBhY3R1YWwgaW5zdGFuY2Ugb2YgdGhlIGRlY29yYXRlZFxuICogY2xhc3MuXG4gKi9cbmNvbnN0IElOU1RBTkNFX1NVQlNUT1JFX0tFWSA9ICdAYW5ndWxhci1yZWR1eDo6c3Vic3RvcmU6Omluc3RhbmNlOjpzdG9yZSc7XG5jb25zdCBJTlNUQU5DRV9TRUxFQ1RJT05TX0tFWSA9XG4gICdAYW5ndWxhci1yZWR1eDo6c3Vic3RvcmU6Omluc3RhbmNlOjpzZWxlY3Rpb25zJztcblxuLyoqXG4gKiBVc2VkIHRvIGRldGVjdCB3aGVuIHRoZSBiYXNlIHBhdGggY2hhbmdlcyAtIHRoaXMgYWxsb3dzIGNvbXBvbmVudHMgdG9cbiAqIGR5bmFtaWNhbGx5IGFkanVzdCB0aGVpciBzZWxlY3Rpb25zIGlmIG5lY2Vzc2FyeS5cbiAqL1xuY29uc3QgSU5TVEFOQ0VfQkFTRV9QQVRIX0tFWSA9ICdAYW5ndWxhci1yZWR1eDo6c3Vic3RvcmU6Omluc3RhbmNlOjpiYXNlcGF0aCc7XG5cbmNvbnN0IGdldENsYXNzT3B0aW9ucyA9IChkZWNvcmF0ZWRJbnN0YW5jZTogYW55KTogRnJhY3RhbFN0b3JlT3B0aW9ucyA9PlxuICBkZWNvcmF0ZWRJbnN0YW5jZS5jb25zdHJ1Y3RvcltPUFRJT05TX0tFWV07XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgY29uc3Qgc2V0Q2xhc3NPcHRpb25zID0gKFxuICBkZWNvcmF0ZWRDbGFzc0NvbnN0cnVjdG9yOiBhbnksXG4gIG9wdGlvbnM6IEZyYWN0YWxTdG9yZU9wdGlvbnMsXG4pOiB2b2lkID0+IHtcbiAgZGVjb3JhdGVkQ2xhc3NDb25zdHJ1Y3RvcltPUFRJT05TX0tFWV0gPSBvcHRpb25zO1xufTtcblxuLy8gSSB3YW50IHRoZSBzdG9yZSB0byBiZSBzYXZlZCBvbiB0aGUgYWN0dWFsIGluc3RhbmNlIHNvXG4vLyAxLiBkaWZmZXJlbnQgaW5zdGFuY2VzIGNhbiBoYXZlIGRpc3RpbmN0IHN1YnN0b3JlcyBpZiBuZWNlc3Nhcnlcbi8vIDIuIHRoZSBzdWJzdG9yZS9zZWxlY3Rpb25zIHdpbGwgYmUgbWFya2VkIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24gd2hlbiB0aGVcbi8vICAgIGluc3RhbmNlIGlzIGRlc3Ryb3llZC5cbmNvbnN0IHNldEluc3RhbmNlU3RvcmUgPSAoXG4gIGRlY29yYXRlZEluc3RhbmNlOiBhbnksXG4gIHN0b3JlPzogT2JzZXJ2YWJsZVN0b3JlPGFueT4sXG4pID0+IChkZWNvcmF0ZWRJbnN0YW5jZVtJTlNUQU5DRV9TVUJTVE9SRV9LRVldID0gc3RvcmUpO1xuXG5jb25zdCBnZXRJbnN0YW5jZVN0b3JlID0gKGRlY29yYXRlZEluc3RhbmNlOiBhbnkpOiBPYnNlcnZhYmxlU3RvcmU8YW55PiA9PlxuICBkZWNvcmF0ZWRJbnN0YW5jZVtJTlNUQU5DRV9TVUJTVE9SRV9LRVldO1xuXG5jb25zdCBnZXRJbnN0YW5jZVNlbGVjdGlvbk1hcCA9IChkZWNvcmF0ZWRJbnN0YW5jZTogYW55KSA9PiB7XG4gIGNvbnN0IG1hcCA9IGRlY29yYXRlZEluc3RhbmNlW0lOU1RBTkNFX1NFTEVDVElPTlNfS0VZXSB8fCB7fTtcbiAgZGVjb3JhdGVkSW5zdGFuY2VbSU5TVEFOQ0VfU0VMRUNUSU9OU19LRVldID0gbWFwO1xuICByZXR1cm4gbWFwO1xufTtcblxuY29uc3QgaGFzQmFzZVBhdGhDaGFuZ2VkID0gKFxuICBkZWNvcmF0ZWRJbnN0YW5jZTogYW55LFxuICBiYXNlUGF0aD86IFBhdGhTZWxlY3Rvcixcbik6IGJvb2xlYW4gPT5cbiAgZGVjb3JhdGVkSW5zdGFuY2VbSU5TVEFOQ0VfQkFTRV9QQVRIX0tFWV0gIT09IChiYXNlUGF0aCB8fCBbXSkudG9TdHJpbmcoKTtcblxuY29uc3Qgc2V0SW5zdGFuY2VCYXNlUGF0aCA9IChcbiAgZGVjb3JhdGVkSW5zdGFuY2U6IGFueSxcbiAgYmFzZVBhdGg/OiBQYXRoU2VsZWN0b3IsXG4pOiB2b2lkID0+IHtcbiAgZGVjb3JhdGVkSW5zdGFuY2VbSU5TVEFOQ0VfQkFTRV9QQVRIX0tFWV0gPSAoYmFzZVBhdGggfHwgW10pLnRvU3RyaW5nKCk7XG59O1xuXG5jb25zdCBjbGVhckluc3RhbmNlU3RhdGUgPSAoZGVjb3JhdGVkSW5zdGFuY2U6IGFueSkgPT4ge1xuICBkZWNvcmF0ZWRJbnN0YW5jZVtJTlNUQU5DRV9TRUxFQ1RJT05TX0tFWV0gPSBudWxsO1xuICBkZWNvcmF0ZWRJbnN0YW5jZVtJTlNUQU5DRV9TVUJTVE9SRV9LRVldID0gbnVsbDtcbiAgZGVjb3JhdGVkSW5zdGFuY2VbSU5TVEFOQ0VfQkFTRV9QQVRIX0tFWV0gPSBudWxsO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBzdG9yZSBhc3NvY2lhdGVkIHdpdGggYSBkZWNvcmF0ZWQgaW5zdGFuY2UgKGUuZy4gYVxuICogY29tcG9uZW50IG9yIHNlcnZpY2UpXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRCYXNlU3RvcmUgPSAoXG4gIGRlY29yYXRlZEluc3RhbmNlOiBhbnksXG4pOiBPYnNlcnZhYmxlU3RvcmU8YW55PiB8IHVuZGVmaW5lZCA9PiB7XG4gIC8vIFRoZSByb290IHN0b3JlIGhhc24ndCBiZWVuIHNldCB1cCB5ZXQuXG4gIGlmICghTmdSZWR1eC5pbnN0YW5jZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBvcHRpb25zID0gZ2V0Q2xhc3NPcHRpb25zKGRlY29yYXRlZEluc3RhbmNlKTtcblxuICAvLyBUaGlzIGlzIG5vdCBkZWNvcmF0ZWQgd2l0aCBgQFdpdGhTdWJTdG9yZWAuIFJldHVybiB0aGUgcm9vdCBzdG9yZS5cbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgcmV0dXJuIE5nUmVkdXguaW5zdGFuY2U7XG4gIH1cblxuICAvLyBEeW5hbWljIGJhc2UgcGF0aCBzdXBwb3J0OlxuICBjb25zdCBiYXNlUGF0aCA9IGRlY29yYXRlZEluc3RhbmNlW29wdGlvbnMuYmFzZVBhdGhNZXRob2ROYW1lXSgpO1xuICBpZiAoaGFzQmFzZVBhdGhDaGFuZ2VkKGRlY29yYXRlZEluc3RhbmNlLCBiYXNlUGF0aCkpIHtcbiAgICBjbGVhckluc3RhbmNlU3RhdGUoZGVjb3JhdGVkSW5zdGFuY2UpO1xuICAgIHNldEluc3RhbmNlQmFzZVBhdGgoZGVjb3JhdGVkSW5zdGFuY2UsIGJhc2VQYXRoKTtcbiAgfVxuXG4gIGlmICghYmFzZVBhdGgpIHtcbiAgICByZXR1cm4gTmdSZWR1eC5pbnN0YW5jZTtcbiAgfVxuXG4gIGNvbnN0IHN0b3JlID0gZ2V0SW5zdGFuY2VTdG9yZShkZWNvcmF0ZWRJbnN0YW5jZSk7XG4gIGlmICghc3RvcmUpIHtcbiAgICBzZXRJbnN0YW5jZVN0b3JlKFxuICAgICAgZGVjb3JhdGVkSW5zdGFuY2UsXG4gICAgICBOZ1JlZHV4Lmluc3RhbmNlLmNvbmZpZ3VyZVN1YlN0b3JlKGJhc2VQYXRoLCBvcHRpb25zLmxvY2FsUmVkdWNlciksXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBnZXRJbnN0YW5jZVN0b3JlKGRlY29yYXRlZEluc3RhbmNlKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBPYnNlcnZhYmxlIGZyb20gdGhlIGdpdmVuIHNlbGVjdGlvbiBwYXJhbWV0ZXJzLFxuICogcm9vdGVkIGF0IGRlY29yYXRlZEluc3RhbmNlJ3Mgc3RvcmUsIGFuZCBjYWNoZXMgaXQgb24gdGhlXG4gKiBpbnN0YW5jZSBmb3IgZnV0dXJlIHVzZS5cbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEluc3RhbmNlU2VsZWN0aW9uID0gPFQ+KFxuICBkZWNvcmF0ZWRJbnN0YW5jZTogYW55LFxuICBrZXk6IHN0cmluZyB8IHN5bWJvbCxcbiAgc2VsZWN0b3I6IFNlbGVjdG9yPGFueSwgVD4sXG4gIHRyYW5zZm9ybWVyPzogVHJhbnNmb3JtZXI8YW55LCBUPixcbiAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4pID0+IHtcbiAgY29uc3Qgc3RvcmUgPSBnZXRCYXNlU3RvcmUoZGVjb3JhdGVkSW5zdGFuY2UpO1xuXG4gIGlmIChzdG9yZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbnMgPSBnZXRJbnN0YW5jZVNlbGVjdGlvbk1hcChkZWNvcmF0ZWRJbnN0YW5jZSk7XG5cbiAgICBzZWxlY3Rpb25zW2tleV0gPVxuICAgICAgc2VsZWN0aW9uc1trZXldIHx8XG4gICAgICAoIXRyYW5zZm9ybWVyXG4gICAgICAgID8gc3RvcmUuc2VsZWN0KHNlbGVjdG9yLCBjb21wYXJhdG9yKVxuICAgICAgICA6IHN0b3JlLnNlbGVjdChzZWxlY3RvcikucGlwZShcbiAgICAgICAgICAgIG9icyQgPT4gdHJhbnNmb3JtZXIob2JzJCwgZGVjb3JhdGVkSW5zdGFuY2UpLFxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoY29tcGFyYXRvciksXG4gICAgICAgICAgKSk7XG5cbiAgICByZXR1cm4gc2VsZWN0aW9uc1trZXldO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG4iLCJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnLi4vY29tcG9uZW50cy9uZy1yZWR1eCc7XG5pbXBvcnQgeyBnZXRCYXNlU3RvcmUgfSBmcm9tICcuL2hlbHBlcnMnO1xuXG4vKipcbiAqIEF1dG8tZGlzcGF0Y2hlcyB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBkZWNvcmF0ZWQgZnVuY3Rpb24uXG4gKlxuICogRGVjb3JhdGUgYSBmdW5jdGlvbiBjcmVhdG9yIG1ldGhvZCB3aXRoIEBkaXNwYXRjaCBhbmQgaXRzIHJldHVyblxuICogdmFsdWUgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIHBhc3NlZCB0byBuZ1JlZHV4LmRpc3BhdGNoKCkgZm9yIHlvdS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoKCk6IFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRlY29yYXRlKFxuICAgIHRhcmdldDogb2JqZWN0LFxuICAgIGtleTogc3RyaW5nIHwgc3ltYm9sIHwgbnVtYmVyLFxuICAgIGRlc2NyaXB0b3I/OiBQcm9wZXJ0eURlc2NyaXB0b3IsXG4gICk6IFByb3BlcnR5RGVzY3JpcHRvciB7XG4gICAgbGV0IG9yaWdpbmFsTWV0aG9kOiAoKSA9PiB2b2lkO1xuXG4gICAgY29uc3Qgd3JhcHBlZCA9IGZ1bmN0aW9uKHRoaXM6IGFueSwgLi4uYXJnczogYW55W10pIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IG9yaWdpbmFsTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBnZXRCYXNlU3RvcmUodGhpcykgfHwgTmdSZWR1eC5pbnN0YW5jZTtcbiAgICAgICAgaWYgKHN0b3JlKSB7XG4gICAgICAgICAgc3RvcmUuZGlzcGF0Y2gocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3IgfHwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gICAgaWYgKGRlc2NyaXB0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgZGlzcGF0Y2hEZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XG4gICAgICAgIGdldDogKCkgPT4gd3JhcHBlZCxcbiAgICAgICAgc2V0OiBzZXRNZXRob2QgPT4gKG9yaWdpbmFsTWV0aG9kID0gc2V0TWV0aG9kKSxcbiAgICAgIH07XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGRpc3BhdGNoRGVzY3JpcHRvcik7XG4gICAgICByZXR1cm4gZGlzcGF0Y2hEZXNjcmlwdG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgICBkZXNjcmlwdG9yLnZhbHVlID0gd3JhcHBlZDtcbiAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICAgIH1cbiAgfTtcbn1cbiIsImltcG9ydCB7IENvbXBhcmF0b3IsIFNlbGVjdG9yLCBUcmFuc2Zvcm1lciB9IGZyb20gJy4uL2NvbXBvbmVudHMvc2VsZWN0b3JzJztcbmltcG9ydCB7IGdldEluc3RhbmNlU2VsZWN0aW9uIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuLyoqXG4gKiBTZWxlY3RzIGFuIG9ic2VydmFibGUgZnJvbSB0aGUgc3RvcmUsIGFuZCBhdHRhY2hlcyBpdCB0byB0aGUgZGVjb3JhdGVkXG4gKiBwcm9wZXJ0eS5cbiAqXG4gKiBgYGB0c1xuICogIGltcG9ydCB7IHNlbGVjdCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbiAqXG4gKiAgY2xhc3MgU29tZUNsYXNzIHtcbiAqICAgIEBzZWxlY3QoWydmb28nLCdiYXInXSkgZm9vJDogT2JzZXJ2YWJsZTxzdHJpbmc+XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gc2VsZWN0b3JcbiAqIEEgc2VsZWN0b3IgZnVuY3Rpb24sIHByb3BlcnR5IG5hbWUgc3RyaW5nLCBvciBwcm9wZXJ0eSBuYW1lIHBhdGhcbiAqIChhcnJheSBvZiBzdHJpbmdzL2FycmF5IGluZGljZXMpIHRoYXQgbG9jYXRlcyB0aGUgc3RvcmUgZGF0YSB0byBiZVxuICogc2VsZWN0ZWRcbiAqXG4gKiBAcGFyYW0gY29tcGFyYXRvciBGdW5jdGlvbiB1c2VkIHRvIGRldGVybWluZSBpZiB0aGlzIHNlbGVjdG9yIGhhcyBjaGFuZ2VkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFQ+KFxuICBzZWxlY3Rvcj86IFNlbGVjdG9yPGFueSwgVD4sXG4gIGNvbXBhcmF0b3I/OiBDb21wYXJhdG9yLFxuKTogUHJvcGVydHlEZWNvcmF0b3Ige1xuICByZXR1cm4gKHRhcmdldDogYW55LCBrZXk6IHN0cmluZyB8IHN5bWJvbCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGFkanVzdGVkU2VsZWN0b3IgPSBzZWxlY3RvclxuICAgICAgPyBzZWxlY3RvclxuICAgICAgOiBTdHJpbmcoa2V5KS5sYXN0SW5kZXhPZignJCcpID09PSBTdHJpbmcoa2V5KS5sZW5ndGggLSAxXG4gICAgICAgID8gU3RyaW5nKGtleSkuc3Vic3RyaW5nKDAsIFN0cmluZyhrZXkpLmxlbmd0aCAtIDEpXG4gICAgICAgIDoga2V5O1xuICAgIGRlY29yYXRlKGFkanVzdGVkU2VsZWN0b3IsIHVuZGVmaW5lZCwgY29tcGFyYXRvcikodGFyZ2V0LCBrZXkpO1xuICB9O1xufVxuXG4vKipcbiAqIFNlbGVjdHMgYW4gb2JzZXJ2YWJsZSB1c2luZyB0aGUgZ2l2ZW4gcGF0aCBzZWxlY3RvciwgYW5kIHJ1bnMgaXQgdGhyb3VnaCB0aGVcbiAqIGdpdmVuIHRyYW5zZm9ybWVyIGZ1bmN0aW9uLiBBIHRyYW5zZm9ybWVyIGZ1bmN0aW9uIHRha2VzIHRoZSBzdG9yZVxuICogb2JzZXJ2YWJsZSBhcyBhbiBpbnB1dCBhbmQgcmV0dXJucyBhIGRlcml2ZWQgb2JzZXJ2YWJsZSBmcm9tIGl0LiBUaGF0IGRlcml2ZWRcbiAqICBvYnNlcnZhYmxlIGlzIHJ1biB0aHJvdWdoIGRpc3RpbmN0VW50aWxDaGFuZ2VzIHdpdGggdGhlIGdpdmVuIG9wdGlvbmFsXG4gKiBjb21wYXJhdG9yIGFuZCBhdHRhY2hlZCB0byB0aGUgc3RvcmUgcHJvcGVydHkuXG4gKlxuICogVGhpbmsgb2YgYSBUcmFuc2Zvcm1lciBhcyBhIEZ1bmN0aW9uU2VsZWN0b3IgdGhhdCBvcGVyYXRlcyBvbiBvYnNlcnZhYmxlc1xuICogaW5zdGVhZCBvZiB2YWx1ZXMuXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IHNlbGVjdCQgfSBmcm9tICdhbmd1bGFyLXJlZHV4L3N0b3JlJztcbiAqXG4gKiBleHBvcnQgY29uc3QgZGVib3VuY2VBbmRUcmlwbGUgPSBvYnMkID0+IG9icyRcbiAqICAuZGVib3VuY2UoMzAwKVxuICogIC5tYXAoeCA9PiAzICogeCk7XG4gKlxuICogY2xhc3MgRm9vIHtcbiAqICBAc2VsZWN0JChbJ2ZvbycsICdiYXInXSwgZGVib3VuY2VBbmRUcmlwbGUpXG4gKiAgcmVhZG9ubHkgZGVib3VuY2VkRm9vQmFyJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3QkPFQ+KFxuICBzZWxlY3RvcjogU2VsZWN0b3I8YW55LCBUPixcbiAgdHJhbnNmb3JtZXI6IFRyYW5zZm9ybWVyPGFueSwgVD4sXG4gIGNvbXBhcmF0b3I/OiBDb21wYXJhdG9yLFxuKTogUHJvcGVydHlEZWNvcmF0b3Ige1xuICByZXR1cm4gZGVjb3JhdGUoc2VsZWN0b3IsIHRyYW5zZm9ybWVyLCBjb21wYXJhdG9yKTtcbn1cblxuZnVuY3Rpb24gZGVjb3JhdGUoXG4gIHNlbGVjdG9yOiBTZWxlY3RvcjxhbnksIGFueT4sXG4gIHRyYW5zZm9ybWVyPzogVHJhbnNmb3JtZXI8YW55LCBhbnk+LFxuICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbik6IFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRlY29yYXRvcih0YXJnZXQ6IGFueSwga2V5KTogdm9pZCB7XG4gICAgZnVuY3Rpb24gZ2V0dGVyKHRoaXM6IGFueSkge1xuICAgICAgcmV0dXJuIGdldEluc3RhbmNlU2VsZWN0aW9uKHRoaXMsIGtleSwgc2VsZWN0b3IsIHRyYW5zZm9ybWVyLCBjb21wYXJhdG9yKTtcbiAgICB9XG5cbiAgICAvLyBSZXBsYWNlIGRlY29yYXRlZCBwcm9wZXJ0eSB3aXRoIGEgZ2V0dGVyIHRoYXQgcmV0dXJucyB0aGUgb2JzZXJ2YWJsZS5cbiAgICBpZiAoZGVsZXRlIHRhcmdldFtrZXldKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHtcbiAgICAgICAgZ2V0OiBnZXR0ZXIsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbiIsImltcG9ydCB7IEZyYWN0YWxTdG9yZU9wdGlvbnMsIHNldENsYXNzT3B0aW9ucyB9IGZyb20gJy4vaGVscGVycyc7XG5cbi8qKlxuICogTW9kaWZpZXMgdGhlIGJlaGF2aW91ciBvZiBhbnkgYEBzZWxlY3RgLCBgQHNlbGVjdCRgLCBvciBgQGRpc3BhdGNoYFxuICogZGVjb3JhdG9ycyB0byBvcGVyYXRlIG9uIGEgc3Vic3RvcmUgZGVmaW5lZCBieSB0aGUgSUZyYWN0YWxTdG9yZU9wdGlvbnMuXG4gKlxuICogU2VlOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXItcmVkdXgvc3RvcmUvYmxvYi9tYXN0ZXIvYXJ0aWNsZXMvZnJhY3RhbC1zdG9yZS5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgU3ViU3RvcmVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gV2l0aFN1YlN0b3JlKHtcbiAgYmFzZVBhdGhNZXRob2ROYW1lLFxuICBsb2NhbFJlZHVjZXIsXG59OiBGcmFjdGFsU3RvcmVPcHRpb25zKTogQ2xhc3NEZWNvcmF0b3Ige1xuICByZXR1cm4gZnVuY3Rpb24gZGVjb3JhdGUoY29uc3RydWN0b3I6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgc2V0Q2xhc3NPcHRpb25zKGNvbnN0cnVjdG9yLCB7XG4gICAgICBiYXNlUGF0aE1ldGhvZE5hbWUsXG4gICAgICBsb2NhbFJlZHVjZXIsXG4gICAgfSk7XG4gIH07XG59XG4iLCIvKiogQGhpZGRlbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2VydCA9IChjb25kaXRpb246IGJvb2xlYW4sIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfVxufTtcbiIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGdldEluIH0gZnJvbSAnLi4vdXRpbHMvZ2V0LWluJztcblxuLyoqXG4gKiBDdXN0b20gZXF1YWxpdHkgY2hlY2tlciB0aGF0IGNhbiBiZSB1c2VkIHdpdGggYC5zZWxlY3RgIGFuZCBgQHNlbGVjdGAuXG4gKiBgYGB0c1xuICogY29uc3QgY3VzdG9tQ29tcGFyZTogQ29tcGFyYXRvciA9ICh4OiBhbnksIHk6IGFueSkgPT4ge1xuICogIHJldHVybiB4LmlkID09PSB5LmlkXG4gKiB9XG4gKlxuICogQHNlbGVjdChzZWxlY3RvciwgY3VzdG9tQ29tcGFyZSlcbiAqIGBgYFxuICovXG5leHBvcnQgdHlwZSBDb21wYXJhdG9yID0gKHg6IGFueSwgeTogYW55KSA9PiBib29sZWFuO1xuZXhwb3J0IHR5cGUgVHJhbnNmb3JtZXI8Um9vdFN0YXRlLCBWPiA9IChcbiAgc3RvcmUkOiBPYnNlcnZhYmxlPFJvb3RTdGF0ZT4sXG4gIHNjb3BlOiBhbnksXG4pID0+IE9ic2VydmFibGU8Vj47XG5leHBvcnQgdHlwZSBQcm9wZXJ0eVNlbGVjdG9yID0gc3RyaW5nIHwgbnVtYmVyIHwgc3ltYm9sO1xuZXhwb3J0IHR5cGUgUGF0aFNlbGVjdG9yID0gKHN0cmluZyB8IG51bWJlcilbXTtcbmV4cG9ydCB0eXBlIEZ1bmN0aW9uU2VsZWN0b3I8Um9vdFN0YXRlLCBTPiA9ICgoczogUm9vdFN0YXRlKSA9PiBTKTtcbmV4cG9ydCB0eXBlIFNlbGVjdG9yPFJvb3RTdGF0ZSwgUz4gPVxuICB8IFByb3BlcnR5U2VsZWN0b3JcbiAgfCBQYXRoU2VsZWN0b3JcbiAgfCBGdW5jdGlvblNlbGVjdG9yPFJvb3RTdGF0ZSwgUz47XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgY29uc3Qgc25pZmZTZWxlY3RvclR5cGUgPSA8Um9vdFN0YXRlLCBTPihcbiAgc2VsZWN0b3I/OiBTZWxlY3RvcjxSb290U3RhdGUsIFM+LFxuKSA9PlxuICAhc2VsZWN0b3JcbiAgICA/ICduaWwnXG4gICAgOiBBcnJheS5pc0FycmF5KHNlbGVjdG9yKVxuICAgICAgPyAncGF0aCdcbiAgICAgIDogJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIHNlbGVjdG9yXG4gICAgICAgID8gJ2Z1bmN0aW9uJ1xuICAgICAgICA6ICdwcm9wZXJ0eSc7XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgY29uc3QgcmVzb2x2ZXIgPSA8Um9vdFN0YXRlLCBTPihzZWxlY3Rvcj86IFNlbGVjdG9yPFJvb3RTdGF0ZSwgUz4pID0+ICh7XG4gIHByb3BlcnR5OiAoc3RhdGU6IGFueSkgPT5cbiAgICBzdGF0ZSA/IHN0YXRlW3NlbGVjdG9yIGFzIFByb3BlcnR5U2VsZWN0b3JdIDogdW5kZWZpbmVkLFxuICBwYXRoOiAoc3RhdGU6IFJvb3RTdGF0ZSkgPT4gZ2V0SW4oc3RhdGUsIHNlbGVjdG9yIGFzIFBhdGhTZWxlY3RvciksXG4gIGZ1bmN0aW9uOiBzZWxlY3RvciBhcyBGdW5jdGlvblNlbGVjdG9yPFJvb3RTdGF0ZSwgUz4sXG4gIG5pbDogKHN0YXRlOiBSb290U3RhdGUpID0+IHN0YXRlLFxufSk7XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgY29uc3QgcmVzb2x2ZVRvRnVuY3Rpb25TZWxlY3RvciA9IDxSb290U3RhdGUsIFM+KFxuICBzZWxlY3Rvcj86IFNlbGVjdG9yPFJvb3RTdGF0ZSwgUz4sXG4pID0+IHJlc29sdmVyKHNlbGVjdG9yKVtzbmlmZlNlbGVjdG9yVHlwZShzZWxlY3RvcildO1xuIiwiaW1wb3J0IHsgQW55QWN0aW9uLCBEaXNwYXRjaCwgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGdldEluIH0gZnJvbSAnLi4vdXRpbHMvZ2V0LWluJztcbmltcG9ydCB7XG4gIHJlZ2lzdGVyRnJhY3RhbFJlZHVjZXIsXG4gIHJlcGxhY2VMb2NhbFJlZHVjZXIsXG59IGZyb20gJy4vZnJhY3RhbC1yZWR1Y2VyLW1hcCc7XG5pbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnLi9uZy1yZWR1eCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlU3RvcmUgfSBmcm9tICcuL29ic2VydmFibGUtc3RvcmUnO1xuaW1wb3J0IHtcbiAgQ29tcGFyYXRvcixcbiAgUGF0aFNlbGVjdG9yLFxuICByZXNvbHZlVG9GdW5jdGlvblNlbGVjdG9yLFxuICBTZWxlY3Rvcixcbn0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuXG4vKiogQGhpZGRlbiAqL1xuZXhwb3J0IGNsYXNzIFN1YlN0b3JlPFN0YXRlPiBpbXBsZW1lbnRzIE9ic2VydmFibGVTdG9yZTxTdGF0ZT4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvb3RTdG9yZTogTmdSZWR1eDxhbnk+LFxuICAgIHByaXZhdGUgYmFzZVBhdGg6IFBhdGhTZWxlY3RvcixcbiAgICBsb2NhbFJlZHVjZXI6IFJlZHVjZXI8U3RhdGUsIEFueUFjdGlvbj4sXG4gICkge1xuICAgIHJlZ2lzdGVyRnJhY3RhbFJlZHVjZXIoYmFzZVBhdGgsIGxvY2FsUmVkdWNlcik7XG4gIH1cblxuICBkaXNwYXRjaDogRGlzcGF0Y2g8QW55QWN0aW9uPiA9IGFjdGlvbiA9PlxuICAgIHRoaXMucm9vdFN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIC4uLihhY3Rpb24gYXMgYW55KSxcbiAgICAgICdAYW5ndWxhci1yZWR1eDo6ZnJhY3RhbGtleSc6IEpTT04uc3RyaW5naWZ5KHRoaXMuYmFzZVBhdGgpLFxuICAgIH0pO1xuXG4gIGdldFN0YXRlID0gKCk6IFN0YXRlID0+IGdldEluKHRoaXMucm9vdFN0b3JlLmdldFN0YXRlKCksIHRoaXMuYmFzZVBhdGgpO1xuXG4gIGNvbmZpZ3VyZVN1YlN0b3JlID0gPFN1YlN0YXRlPihcbiAgICBiYXNlUGF0aDogUGF0aFNlbGVjdG9yLFxuICAgIGxvY2FsUmVkdWNlcjogUmVkdWNlcjxTdWJTdGF0ZSwgQW55QWN0aW9uPixcbiAgKTogT2JzZXJ2YWJsZVN0b3JlPFN1YlN0YXRlPiA9PlxuICAgIG5ldyBTdWJTdG9yZTxTdWJTdGF0ZT4oXG4gICAgICB0aGlzLnJvb3RTdG9yZSxcbiAgICAgIFsuLi50aGlzLmJhc2VQYXRoLCAuLi5iYXNlUGF0aF0sXG4gICAgICBsb2NhbFJlZHVjZXIsXG4gICAgKTtcblxuICBzZWxlY3QgPSA8U2VsZWN0ZWRTdGF0ZT4oXG4gICAgc2VsZWN0b3I/OiBTZWxlY3RvcjxTdGF0ZSwgU2VsZWN0ZWRTdGF0ZT4sXG4gICAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4gICk6IE9ic2VydmFibGU8U2VsZWN0ZWRTdGF0ZT4gPT5cbiAgICB0aGlzLnJvb3RTdG9yZS5zZWxlY3Q8U3RhdGU+KHRoaXMuYmFzZVBhdGgpLnBpcGUoXG4gICAgICBtYXAocmVzb2x2ZVRvRnVuY3Rpb25TZWxlY3RvcihzZWxlY3RvcikpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoY29tcGFyYXRvciksXG4gICAgKTtcblxuICBzdWJzY3JpYmUgPSAobGlzdGVuZXI6ICgpID0+IHZvaWQpOiAoKCkgPT4gdm9pZCkgPT4ge1xuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHRoaXMuc2VsZWN0KCkuc3Vic2NyaWJlKGxpc3RlbmVyKTtcbiAgICByZXR1cm4gKCkgPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH07XG5cbiAgcmVwbGFjZVJlZHVjZXIgPSAobmV4dExvY2FsUmVkdWNlcjogUmVkdWNlcjxTdGF0ZSwgQW55QWN0aW9uPikgPT5cbiAgICByZXBsYWNlTG9jYWxSZWR1Y2VyKHRoaXMuYmFzZVBhdGgsIG5leHRMb2NhbFJlZHVjZXIpO1xufVxuIiwiaW1wb3J0IHtcbiAgQW55QWN0aW9uLFxuICBhcHBseU1pZGRsZXdhcmUsXG4gIGNvbXBvc2UsXG4gIGNyZWF0ZVN0b3JlLFxuICBEaXNwYXRjaCxcbiAgTWlkZGxld2FyZSxcbiAgUmVkdWNlcixcbiAgU3RvcmUsXG4gIFN0b3JlRW5oYW5jZXIsXG4gIFVuc3Vic2NyaWJlLFxufSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7IE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi91dGlscy9hc3NlcnQnO1xuaW1wb3J0IHsgZW5hYmxlRnJhY3RhbFJlZHVjZXJzIH0gZnJvbSAnLi9mcmFjdGFsLXJlZHVjZXItbWFwJztcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICcuL25nLXJlZHV4JztcbmltcG9ydCB7IE9ic2VydmFibGVTdG9yZSB9IGZyb20gJy4vb2JzZXJ2YWJsZS1zdG9yZSc7XG5pbXBvcnQge1xuICBDb21wYXJhdG9yLFxuICBQYXRoU2VsZWN0b3IsXG4gIHJlc29sdmVUb0Z1bmN0aW9uU2VsZWN0b3IsXG4gIFNlbGVjdG9yLFxufSBmcm9tICcuL3NlbGVjdG9ycyc7XG5pbXBvcnQgeyBTdWJTdG9yZSB9IGZyb20gJy4vc3ViLXN0b3JlJztcblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBjbGFzcyBSb290U3RvcmU8Um9vdFN0YXRlPiBleHRlbmRzIE5nUmVkdXg8Um9vdFN0YXRlPiB7XG4gIHByaXZhdGUgc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIHByaXZhdGUgc3RvcmUkOiBCZWhhdmlvclN1YmplY3Q8Um9vdFN0YXRlPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIE5nUmVkdXguaW5zdGFuY2UgPSB0aGlzO1xuICAgIHRoaXMuc3RvcmUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxSb290U3RhdGUgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCkucGlwZShcbiAgICAgIGZpbHRlcihuID0+IG4gIT09IHVuZGVmaW5lZCksXG4gICAgICBzd2l0Y2hNYXAob2JzZXJ2YWJsZVN0b3JlID0+IG9ic2VydmFibGVTdG9yZSBhcyBhbnkpLFxuICAgICAgLy8gVE9ETzogZml4IHRoaXM/IG5lZWRpbmcgdG8gZXhwbGljaXRseSBjYXN0IHRoaXMgaXMgd3JvbmdcbiAgICApIGFzIEJlaGF2aW9yU3ViamVjdDxSb290U3RhdGU+O1xuICB9XG5cbiAgY29uZmlndXJlU3RvcmUgPSAoXG4gICAgcm9vdFJlZHVjZXI6IFJlZHVjZXI8Um9vdFN0YXRlLCBBbnlBY3Rpb24+LFxuICAgIGluaXRTdGF0ZTogUm9vdFN0YXRlLFxuICAgIG1pZGRsZXdhcmU6IE1pZGRsZXdhcmVbXSA9IFtdLFxuICAgIGVuaGFuY2VyczogU3RvcmVFbmhhbmNlcjxSb290U3RhdGU+W10gPSBbXSxcbiAgKTogdm9pZCA9PiB7XG4gICAgYXNzZXJ0KCF0aGlzLnN0b3JlLCAnU3RvcmUgYWxyZWFkeSBjb25maWd1cmVkIScpO1xuXG4gICAgLy8gVmFyaWFibGUtYXJpdHkgY29tcG9zZSBpbiB0eXBlc2NyaXB0IEZUVy5cbiAgICB0aGlzLnNldFN0b3JlKFxuICAgICAgY29tcG9zZS5hcHBseShudWxsLCBbYXBwbHlNaWRkbGV3YXJlKC4uLm1pZGRsZXdhcmUpLCAuLi5lbmhhbmNlcnNdKShcbiAgICAgICAgY3JlYXRlU3RvcmUsXG4gICAgICApKGVuYWJsZUZyYWN0YWxSZWR1Y2Vycyhyb290UmVkdWNlciksIGluaXRTdGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBwcm92aWRlU3RvcmUgPSAoc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4pID0+IHtcbiAgICBhc3NlcnQoIXRoaXMuc3RvcmUsICdTdG9yZSBhbHJlYWR5IGNvbmZpZ3VyZWQhJyk7XG4gICAgdGhpcy5zZXRTdG9yZShzdG9yZSk7XG4gIH07XG5cbiAgZ2V0U3RhdGUgPSAoKTogUm9vdFN0YXRlID0+IHRoaXMuc3RvcmUhLmdldFN0YXRlKCk7XG5cbiAgc3Vic2NyaWJlID0gKGxpc3RlbmVyOiAoKSA9PiB2b2lkKTogVW5zdWJzY3JpYmUgPT5cbiAgICB0aGlzLnN0b3JlIS5zdWJzY3JpYmUobGlzdGVuZXIpO1xuXG4gIHJlcGxhY2VSZWR1Y2VyID0gKG5leHRSZWR1Y2VyOiBSZWR1Y2VyPFJvb3RTdGF0ZSwgQW55QWN0aW9uPik6IHZvaWQgPT4ge1xuICAgIHRoaXMuc3RvcmUhLnJlcGxhY2VSZWR1Y2VyKG5leHRSZWR1Y2VyKTtcbiAgfTtcblxuICBkaXNwYXRjaDogRGlzcGF0Y2g8QW55QWN0aW9uPiA9IDxBIGV4dGVuZHMgQW55QWN0aW9uPihhY3Rpb246IEEpOiBBID0+IHtcbiAgICBhc3NlcnQoXG4gICAgICAhIXRoaXMuc3RvcmUsXG4gICAgICAnRGlzcGF0Y2ggZmFpbGVkOiBkaWQgeW91IGZvcmdldCB0byBjb25maWd1cmUgeW91ciBzdG9yZT8gJyArXG4gICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci1yZWR1eC9AYW5ndWxhci1yZWR1eC9jb3JlL2Jsb2IvbWFzdGVyLycgK1xuICAgICAgICAnUkVBRE1FLm1kI3F1aWNrLXN0YXJ0JyxcbiAgICApO1xuXG4gICAgaWYgKCFOZ1pvbmUuaXNJbkFuZ3VsYXJab25lKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5zdG9yZSEuZGlzcGF0Y2goYWN0aW9uKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnN0b3JlIS5kaXNwYXRjaChhY3Rpb24pO1xuICAgIH1cbiAgfTtcblxuICBzZWxlY3QgPSA8U2VsZWN0ZWRUeXBlPihcbiAgICBzZWxlY3Rvcj86IFNlbGVjdG9yPFJvb3RTdGF0ZSwgU2VsZWN0ZWRUeXBlPixcbiAgICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbiAgKTogT2JzZXJ2YWJsZTxTZWxlY3RlZFR5cGU+ID0+XG4gICAgdGhpcy5zdG9yZSQucGlwZShcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICBtYXAocmVzb2x2ZVRvRnVuY3Rpb25TZWxlY3RvcihzZWxlY3RvcikpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoY29tcGFyYXRvciksXG4gICAgKTtcblxuICBjb25maWd1cmVTdWJTdG9yZSA9IDxTdWJTdGF0ZT4oXG4gICAgYmFzZVBhdGg6IFBhdGhTZWxlY3RvcixcbiAgICBsb2NhbFJlZHVjZXI6IFJlZHVjZXI8U3ViU3RhdGUsIEFueUFjdGlvbj4sXG4gICk6IE9ic2VydmFibGVTdG9yZTxTdWJTdGF0ZT4gPT5cbiAgICBuZXcgU3ViU3RvcmU8U3ViU3RhdGU+KHRoaXMsIGJhc2VQYXRoLCBsb2NhbFJlZHVjZXIpO1xuXG4gIHByaXZhdGUgc2V0U3RvcmUoc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4pIHtcbiAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgY29uc3Qgc3RvcmVTZXJ2YWJsZSA9IHRoaXMuc3RvcmVUb09ic2VydmFibGUoc3RvcmUpO1xuICAgIHRoaXMuc3RvcmUkLm5leHQoc3RvcmVTZXJ2YWJsZSBhcyBhbnkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdG9yZVRvT2JzZXJ2YWJsZSA9IChcbiAgICBzdG9yZTogU3RvcmU8Um9vdFN0YXRlPixcbiAgKTogT2JzZXJ2YWJsZTxSb290U3RhdGU+ID0+XG4gICAgbmV3IE9ic2VydmFibGU8Um9vdFN0YXRlPigob2JzZXJ2ZXI6IE9ic2VydmVyPFJvb3RTdGF0ZT4pID0+IHtcbiAgICAgIG9ic2VydmVyLm5leHQoc3RvcmUuZ2V0U3RhdGUoKSk7XG4gICAgICBjb25zdCB1bnN1YnNjcmliZUZyb21SZWR1eCA9IHN0b3JlLnN1YnNjcmliZSgoKSA9PlxuICAgICAgICBvYnNlcnZlci5uZXh0KHN0b3JlLmdldFN0YXRlKCkpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHVuc3Vic2NyaWJlRnJvbVJlZHV4KCk7XG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9O1xuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGV2VG9vbHNFeHRlbnNpb24gfSBmcm9tICcuL2NvbXBvbmVudHMvZGV2LXRvb2xzJztcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICcuL2NvbXBvbmVudHMvbmctcmVkdXgnO1xuaW1wb3J0IHsgUm9vdFN0b3JlIH0gZnJvbSAnLi9jb21wb25lbnRzL3Jvb3Qtc3RvcmUnO1xuXG4vKiogQGhpZGRlbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9uZ1JlZHV4RmFjdG9yeShuZ1pvbmU6IE5nWm9uZSkge1xuICByZXR1cm4gbmV3IFJvb3RTdG9yZShuZ1pvbmUpO1xufVxuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBEZXZUb29sc0V4dGVuc2lvbixcbiAgICB7IHByb3ZpZGU6IE5nUmVkdXgsIHVzZUZhY3Rvcnk6IF9uZ1JlZHV4RmFjdG9yeSwgZGVwczogW05nWm9uZV0gfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdSZWR1eE1vZHVsZSB7fVxuIl0sIm5hbWVzIjpbIm1hcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQTs7Ozs7bUJBRTJDLFNBQVM7Ozs7OztBQ3BCcEQ7QUFrQkEsTUFBTSxXQUFXLHNCQUE2QixPQUFPLE1BQU0sS0FBSyxXQUFXO01BQ3ZFLE1BQU07TUFDTixFQUFFLEdBQTZCOzs7O0FBTW5DOzs7Ozs7SUFFRSxZQUFvQixNQUFzQixFQUFVLE9BQXFCO1FBQXJELFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBYzs7Ozs7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