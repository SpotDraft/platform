import { Injectable, Input, Directive, NgModule, forwardRef, Host, Inject, Optional, Self, SkipSelf, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { __extends, __spread, __values, __assign } from 'tslib';
import { Iterable, Map as Map$1 } from 'immutable';
import { FormArray, FormControl, FormGroup, NgControl, NgForm, ControlContainer, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModelGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var composeReducers = function () {
    var reducers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        reducers[_i] = arguments[_i];
    }
    return function (s, action) {
        return reducers.reduce(function (st, reducer) { return reducer(st, action); }, s);
    };
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var FORM_CHANGED = '@@angular-redux/form/FORM_CHANGED';
var FormStore = /** @class */ (function () {
    /// NOTE(cbond): The declaration of store is misleading. This class is
    /// actually capable of taking a plain Redux store or an NgRedux instance.
    /// But in order to make the ng dependency injector work properly, we
    /// declare it as an NgRedux type, since the @angular-redux/store use case involves
    /// calling the constructor of this class manually (from configure.ts),
    /// where a plain store can be cast to an NgRedux. (For our purposes, they
    /// have almost identical shapes.)
    function FormStore(store) {
        this.store = store;
    }
    /**
     * @return {?}
     */
    FormStore.prototype.getState = /**
     * @return {?}
     */
    function () {
        return this.store.getState();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    FormStore.prototype.subscribe = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        var _this = this;
        return this.store.subscribe(function () { return fn(_this.getState()); });
    };
    /**
     * @template T
     * @param {?} path
     * @param {?} form
     * @param {?} value
     * @return {?}
     */
    FormStore.prototype.valueChanged = /**
     * @template T
     * @param {?} path
     * @param {?} form
     * @param {?} value
     * @return {?}
     */
    function (path, form, value) {
        this.store.dispatch({
            type: FORM_CHANGED,
            payload: {
                path: path,
                form: form,
                valid: form.valid === true,
                value: value,
            },
        });
    };
    FormStore.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FormStore.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    return FormStore;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FormException = /** @class */ (function (_super) {
    __extends(FormException, _super);
    function FormException(msg) {
        return _super.call(this, msg) || this;
    }
    return FormException;
}(Error));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var /**
 * @abstract
 */
State = /** @class */ (function () {
    function State() {
    }
    /**
     * @template StateType
     * @param {?} state
     * @param {?} path
     * @param {?=} fn
     * @return {?}
     */
    State.traverse = /**
     * @template StateType
     * @param {?} state
     * @param {?} path
     * @param {?=} fn
     * @return {?}
     */
    function (state, path, fn) {
        /** @type {?} */
        var deepValue = state;
        try {
            for (var path_1 = __values(path), path_1_1 = path_1.next(); !path_1_1.done; path_1_1 = path_1.next()) {
                var k = path_1_1.value;
                /** @type {?} */
                var parent_1 = deepValue;
                if (Iterable.isIterable(deepValue)) {
                    /** @type {?} */
                    var m = /** @type {?} */ ((/** @type {?} */ (deepValue)));
                    if (typeof m.get === 'function') {
                        deepValue = m.get(k);
                    }
                    else {
                        throw new FormException("Cannot retrieve value from immutable nonassociative container: " + k);
                    }
                }
                else if (deepValue instanceof Map) {
                    deepValue = (/** @type {?} */ ((/** @type {?} */ (deepValue)))).get(k);
                }
                else {
                    deepValue = (/** @type {?} */ (deepValue))[k];
                }
                if (typeof fn === 'function') {
                    /** @type {?} */
                    var transformed = fn(parent_1, k, path.slice(path.indexOf(k) + 1), deepValue);
                    deepValue = transformed[k];
                    Object.assign(parent_1, transformed);
                }
                // If we were not able to find this state inside of our root state
                // structure, then we return undefined -- not null -- to indicate that
                // state. But this could be a perfectly normal use-case so we don't
                // want to throw an exception or anything along those lines.
                if (deepValue === undefined) {
                    return undefined;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (path_1_1 && !path_1_1.done && (_a = path_1.return)) _a.call(path_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return deepValue;
        var e_1, _a;
    };
    /**
     * @template StateType
     * @param {?} state
     * @param {?} path
     * @return {?}
     */
    State.get = /**
     * @template StateType
     * @param {?} state
     * @param {?} path
     * @return {?}
     */
    function (state, path) {
        return State.traverse(state, path);
    };
    /**
     * @template StateType
     * @param {?} state
     * @param {?} path
     * @param {?=} value
     * @return {?}
     */
    State.assign = /**
     * @template StateType
     * @param {?} state
     * @param {?} path
     * @param {?=} value
     * @return {?}
     */
    function (state, path, value) {
        /** @type {?} */
        var operations = State.inspect(state);
        if (path.length === 0) {
            return operations.update(null, value);
        }
        /** @type {?} */
        var root = operations.clone();
        // We want to shallow clone the object, and then trace a path to the place
        // we want to update, cloning each object we traversed on our way and then
        // finally updating the value on the last parent to be @value. This seems
        // to offer the best performance: we can shallow clone everything that has
        // not been modified, and {deep clone + update} the path down to the value
        // that we wish to update.
        State.traverse(root, path, function (parent, key, remainingPath, innerValue) {
            /** @type {?} */
            var parentOperations = State.inspect(parent);
            if (innerValue) {
                /** @type {?} */
                var innerOperations = State.inspect(innerValue);
                return parentOperations.update(key, remainingPath.length > 0
                    ? innerOperations.clone()
                    : innerOperations.merge(null, value));
            }
            else {
                /** @type {?} */
                var getProbableType = function (stateKey) {
                    // NOTE(cbond): If your code gets here, you might not be using the library
                    return typeof stateKey === 'number'
                        ? new Array()
                        : Array.isArray(stateKey)
                            ? Map$1()
                            : new Object();
                };
                return parentOperations.update(key, remainingPath.length > 0
                    ? getProbableType(remainingPath[0])
                    : value);
            }
        });
        return root;
    };
    /**
     * @template K
     * @param {?} object
     * @return {?}
     */
    State.inspect = /**
     * @template K
     * @param {?} object
     * @return {?}
     */
    function (object) {
        /** @type {?} */
        var metaOperations = function (
        // TODO: Write proper type declarations for following Function types
        // TODO: Write proper type declarations for following Function types
        update, merge, clone) {
            /** @type {?} */
            var operations = {
                clone: typeof clone === 'function'
                    ? function () { return (clone(/** @type {?} */ (object))); }
                    : function () { return object; },
                update: function (key, value) {
                    return update(operations.clone(), key, value);
                },
                merge: function (key, value) {
                    /** @type {?} */
                    var cloned = operations.clone();
                    return merge(cloned, key, value, function (v) { return update(cloned, key, v); });
                },
            };
            return operations;
        };
        if (Iterable.isIterable(object)) {
            return metaOperations(
            // Replace
            // Replace
            function (parent, key, value) {
                if (key != null) {
                    return parent.set(key, value);
                }
                else {
                    return value;
                }
            }, 
            // Merge
            // Merge
            function (parent, key, value) {
                if (key) {
                    return parent.mergeDeepIn(Array.isArray(key) ? key : [key], value);
                }
                else {
                    if (Map$1.isMap(value)) {
                        return parent.mergeDeep(value);
                    }
                    else {
                        return parent.concat(value);
                    }
                }
            });
        }
        else if (Array.isArray(object)) {
            return metaOperations(
            // Replace array contents
            // Replace array contents
            function (parent, key, value) {
                if (key != null) {
                    parent[key] = value;
                }
                else {
                    parent.splice.apply(parent, [0, parent.length].concat(Array.isArray(value) ? value : [value]));
                }
            }, 
            // Merge
            // Merge
            function (parent, _, value, setter) {
                setter(parent.concat(value));
                return parent;
            }, 
            // Clone
            // Clone
            function () { return Array.prototype.slice.call(object, 0); });
        }
        else if (object instanceof Map) {
            return metaOperations(
            // Update map key
            // Update map key
            function (parent, key, value) {
                if (key != null) {
                    return parent.set(key, value);
                }
                else {
                    /** @type {?} */
                    var m = new Map(/** @type {?} */ (value));
                    parent.clear();
                    m.forEach(function (mapValue, index) { return parent.set(index, mapValue); });
                    return parent;
                }
            }, 
            // Merge
            // Merge
            function (parent, _, value) {
                /** @type {?} */
                var m = new Map(/** @type {?} */ (value));
                m.forEach(function (mapValue, key) { return parent.set(key, mapValue); });
                return parent;
            }, 
            // Clone
            // Clone
            function () {
                return object instanceof WeakMap
                    ? new WeakMap(/** @type {?} */ (object))
                    : new Map(/** @type {?} */ (object));
            });
        }
        else if (object instanceof WeakSet || object instanceof Set) {
            return metaOperations(
            // Update element at index in set
            // Update element at index in set
            function (parent, key, value) {
                if (key != null) {
                    return parent.set(key, value);
                }
                else {
                    /** @type {?} */
                    var s = new Set(/** @type {?} */ (value));
                    s.forEach(function (setValue, index) { return parent.set(index, setValue); });
                    s.clear();
                    return parent;
                }
            }, 
            // Merge
            // Merge
            function (parent, _, value) {
                try {
                    for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                        var element = value_1_1.value;
                        parent.add(element);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (value_1_1 && !value_1_1.done && (_a = value_1.return)) _a.call(value_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return parent;
                var e_2, _a;
            }, 
            // Clone
            // Clone
            function () {
                return object instanceof WeakSet
                    ? new WeakSet(/** @type {?} */ (object))
                    : new Set(/** @type {?} */ (object));
            });
        }
        else if (object instanceof Date) {
            throw new FormException('Cannot understand why a Date object appears in the mutation path!');
        }
        else {
            switch (typeof object) {
                case 'boolean':
                case 'function':
                case 'number':
                case 'string':
                case 'symbol':
                case 'undefined':
                    break;
                case 'object':
                    if (object == null) {
                        break;
                    }
                    return metaOperations(function (parent, key, value) {
                        if (key != null) {
                            return __assign({}, parent, (_a = {}, _a[key] = value, _a));
                        }
                        return __assign({}, parent, (/** @type {?} */ (value)));
                        var _a;
                    }, function (parent, _, value) {
                        try {
                            for (var _a = __values(Object.keys(value)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                var k = _b.value;
                                parent[k] = (/** @type {?} */ (value))[k];
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        return parent;
                        var e_3, _c;
                    }, function () { return (__assign({}, (/** @type {?} */ (object)))); });
                default:
                    break;
            }
        }
        throw new Error("An object of type " + typeof object + " has appeared in the mutation path! Every element " +
            'in the mutation path should be an array, an associative container, or a set');
    };
    /**
     * @param {?} value
     * @return {?}
     */
    State.empty = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return (value == null ||
            (value.length === 0 ||
                (typeof value.length === 'undefined' &&
                    Object.keys(value).length === 0)));
    };
    return State;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var defaultFormReducer = function (initialState) {
    /** @type {?} */
    var reducer = function (state, action) {
        if (state === void 0) { state = initialState; }
        switch (action.type) {
            case FORM_CHANGED:
                return State.assign(state, action.payload.path, action.payload.value);
            default:
                return state;
        }
    };
    return reducer;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var provideReduxForms = function (store) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ConnectBase = /** @class */ (function () {
    function ConnectBase() {
    }
    Object.defineProperty(ConnectBase.prototype, "path", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var path = typeof this.connect === 'function' ? this.connect() : this.connect;
            switch (typeof path) {
                case 'object':
                    if (State.empty(path)) {
                        return [];
                    }
                    if (Array.isArray(path)) {
                        return /** @type {?} */ (path);
                    }
                case 'string':
                    return (/** @type {?} */ (path)).split(/\./g);
                default:
                    // fallthrough above (no break)
                    throw new Error("Cannot determine path to object: " + JSON.stringify(path));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ConnectBase.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.formSubscription) {
            this.formSubscription.unsubscribe();
        }
        if (typeof this.stateSubscription === 'function') {
            this.stateSubscription(); // unsubscribe
        }
    };
    /**
     * @return {?}
     */
    ConnectBase.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Promise.resolve().then(function () {
            _this.resetState();
            if (_this.store) {
                _this.stateSubscription = _this.store.subscribe(function () { return _this.resetState(); });
            }
            Promise.resolve().then(function () {
                _this.formSubscription = (/** @type {?} */ (_this.form.valueChanges))
                    .pipe(debounceTime(0))
                    .subscribe(function (values) { return _this.publish(values); });
            });
        });
    };
    /**
     * @param {?} path
     * @param {?} formElement
     * @return {?}
     */
    ConnectBase.prototype.descendants = /**
     * @param {?} path
     * @param {?} formElement
     * @return {?}
     */
    function (path, formElement) {
        var _this = this;
        /** @type {?} */
        var pairs = new Array();
        if (formElement instanceof FormArray) {
            formElement.controls.forEach(function (c, index) {
                try {
                    for (var _a = __values(_this.descendants((/** @type {?} */ (path)).concat([index]), c)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var d = _b.value;
                        pairs.push(d);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                var e_1, _c;
            });
        }
        else if (formElement instanceof FormGroup) {
            try {
                for (var _a = __values(Object.keys(formElement.controls)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var k = _b.value;
                    pairs.push({
                        path: path.concat([k]),
                        control: formElement.controls[k],
                    });
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else if (formElement instanceof NgControl ||
            formElement instanceof FormControl) {
            return [{ path: path, control: /** @type {?} */ (formElement) }];
        }
        else {
            throw new Error("Unknown type of form element: " + formElement.constructor.name);
        }
        return pairs.filter(function (p) {
            /** @type {?} */
            var parent = (/** @type {?} */ (p.control))._parent;
            return parent === _this.form.control || parent === _this.form;
        });
        var e_2, _c;
    };
    /**
     * @return {?}
     */
    ConnectBase.prototype.resetState = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var formElement = this.form.control === undefined ? this.form : this.form.control;
        /** @type {?} */
        var children = this.descendants([], formElement);
        children.forEach(function (c) {
            var path = c.path, control = c.control;
            /** @type {?} */
            var value = State.get(_this.getState(), _this.path.concat(path));
            if (control.value !== value) {
                control.setValue(value);
            }
        });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ConnectBase.prototype.publish = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.store) {
            this.store.valueChanged(this.path, this.form, value);
        }
    };
    /**
     * @return {?}
     */
    ConnectBase.prototype.getState = /**
     * @return {?}
     */
    function () {
        if (this.store) {
            return this.store.getState();
        }
    };
    ConnectBase.propDecorators = {
        connect: [{ type: Input }]
    };
    return ConnectBase;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ReactiveConnectDirective = /** @class */ (function (_super) {
    __extends(ReactiveConnectDirective, _super);
    function ReactiveConnectDirective(store) {
        var _this = _super.call(this) || this;
        _this.store = store;
        return _this;
    }
    ReactiveConnectDirective.decorators = [
        { type: Directive, args: [{ selector: 'form[connect][formGroup]' },] },
    ];
    /** @nocollapse */
    ReactiveConnectDirective.ctorParameters = function () { return [
        { type: FormStore }
    ]; };
    ReactiveConnectDirective.propDecorators = {
        formGroup: [{ type: Input }]
    };
    return ReactiveConnectDirective;
}(ConnectBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ConnectDirective = /** @class */ (function (_super) {
    __extends(ConnectDirective, _super);
    function ConnectDirective(store, form) {
        var _this = _super.call(this) || this;
        _this.store = store;
        _this.form = form;
        return _this;
    }
    ConnectDirective.decorators = [
        { type: Directive, args: [{ selector: 'form[connect]:not([formGroup])' },] },
    ];
    /** @nocollapse */
    ConnectDirective.ctorParameters = function () { return [
        { type: FormStore },
        { type: NgForm }
    ]; };
    return ConnectDirective;
}(ConnectBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var declarations = [ConnectDirective, ReactiveConnectDirective];
var NgReduxFormConnectModule = /** @class */ (function () {
    function NgReduxFormConnectModule() {
    }
    NgReduxFormConnectModule.decorators = [
        { type: NgModule, args: [{
                    declarations: __spread(declarations),
                    exports: __spread(declarations),
                },] },
    ];
    return NgReduxFormConnectModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} name
 * @param {?} parent
 * @return {?}
 */
function controlPath(name, parent) {
    return __spread((parent.path || []), [name]);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ConnectArrayTemplate = /** @class */ (function () {
    function ConnectArrayTemplate($implicit, index, item) {
        this.$implicit = $implicit;
        this.index = index;
        this.item = item;
    }
    return ConnectArrayTemplate;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ConnectArrayDirective = /** @class */ (function (_super) {
    __extends(ConnectArrayDirective, _super);
    function ConnectArrayDirective(parent, rawValidators, rawAsyncValidators, connection, templateRef, viewContainerRef, store) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.rawValidators = rawValidators;
        _this.rawAsyncValidators = rawAsyncValidators;
        _this.connection = connection;
        _this.templateRef = templateRef;
        _this.viewContainerRef = viewContainerRef;
        _this.store = store;
        _this.array = new FormArray([]);
        _this.stateSubscription = _this.store.subscribe(function (state) {
            return _this.resetState(state);
        });
        _this.registerInternals(_this.array);
        return _this;
    }
    Object.defineProperty(ConnectArrayDirective.prototype, "connectArrayOf", {
        set: /**
         * @param {?} collection
         * @return {?}
         */
        function (collection) {
            this.key = collection;
            this.resetState(this.store.getState());
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ConnectArrayDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.formDirective.addControl(/** @type {?} */ (this));
    };
    Object.defineProperty(ConnectArrayDirective.prototype, "name", {
        get: /**
         * @return {?}
         */
        function () {
            return this.key || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectArrayDirective.prototype, "control", {
        get: /**
         * @return {?}
         */
        function () {
            return this.array;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectArrayDirective.prototype, "formDirective", {
        get: /**
         * @return {?}
         */
        function () {
            return /** @type {?} */ (this.parent.formDirective);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectArrayDirective.prototype, "path", {
        get: /**
         * @return {?}
         */
        function () {
            return this.key ? controlPath(this.key, this.parent) : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectArrayDirective.prototype, "validator", {
        get: /**
         * @return {?}
         */
        function () {
            return Validators.compose(this.rawValidators);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectArrayDirective.prototype, "asyncValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return Validators.composeAsync(this.rawAsyncValidators);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ConnectArrayDirective.prototype.updateValueAndValidity = /**
     * @return {?}
     */
    function () {
        // stub?
    };
    /**
     * @return {?}
     */
    ConnectArrayDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.viewContainerRef.clear();
        if (this.key) {
            this.formDirective.form.removeControl(this.key);
        }
        this.stateSubscription();
    };
    /**
     * @param {?} state
     * @return {?}
     */
    ConnectArrayDirective.prototype.resetState = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        if (this.key == null || this.key.length === 0) {
            return; // no state to retreive if no key is set
        }
        /** @type {?} */
        var iterable = State.get(state, this.connection.path.concat(this.path));
        /** @type {?} */
        var index = 0;
        try {
            for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                /** @type {?} */
                var viewRef = this.viewContainerRef.length > index
                    ? (/** @type {?} */ (this.viewContainerRef.get(index)))
                    : null;
                if (viewRef == null) {
                    /** @type {?} */
                    var embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.templateRef, new ConnectArrayTemplate(index, index, value), index);
                    this.patchDescendantControls(embeddedViewRef);
                    this.array.insert(index, this.transform(this.array, embeddedViewRef.context.item));
                }
                else {
                    Object.assign(viewRef.context, new ConnectArrayTemplate(index, index, value));
                }
                ++index;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        while (this.viewContainerRef.length > index) {
            this.viewContainerRef.remove(this.viewContainerRef.length - 1);
        }
        var e_1, _a;
    };
    /**
     * @param {?} array
     * @return {?}
     */
    ConnectArrayDirective.prototype.registerInternals = /**
     * @param {?} array
     * @return {?}
     */
    function (array) {
        array.registerControl = function () { return undefined; };
        array.registerOnChange = function () { return undefined; };
        Object.defineProperties(this, {
            _rawValidators: {
                value: this.rawValidators || [],
            },
            _rawAsyncValidators: {
                value: this.rawAsyncValidators || [],
            },
        });
    };
    /**
     * @param {?} viewRef
     * @return {?}
     */
    ConnectArrayDirective.prototype.patchDescendantControls = /**
     * @param {?} viewRef
     * @return {?}
     */
    function (viewRef) {
        var _this = this;
        /** @type {?} */
        var groups = Object.keys(viewRef._view)
            .map(function (k) { return viewRef._view[k]; })
            .filter(function (c) { return c instanceof NgModelGroup; });
        groups.forEach(function (c) {
            Object.defineProperties(c, {
                _parent: {
                    value: _this,
                },
                _checkParentType: {
                    value: function () { return undefined; },
                },
            });
        });
    };
    /**
     * @param {?} parent
     * @param {?} reference
     * @return {?}
     */
    ConnectArrayDirective.prototype.transform = /**
     * @param {?} parent
     * @param {?} reference
     * @return {?}
     */
    function (parent, reference) {
        var _this = this;
        /** @type {?} */
        var emptyControl = function () {
            /** @type {?} */
            var control = new FormControl(null);
            control.setParent(parent);
            return control;
        };
        if (reference == null) {
            return emptyControl();
        }
        if (typeof reference.toJS === 'function') {
            reference = reference.toJS();
        }
        switch (typeof reference) {
            case 'string':
            case 'number':
            case 'boolean':
                return emptyControl();
        }
        /** @type {?} */
        var iterate = function (iterable) {
            /** @type {?} */
            var array = new FormArray([]);
            _this.registerInternals(array);
            for (var i = array.length; i > 0; i--) {
                array.removeAt(i);
            }
            try {
                for (var iterable_2 = __values(iterable), iterable_2_1 = iterable_2.next(); !iterable_2_1.done; iterable_2_1 = iterable_2.next()) {
                    var value = iterable_2_1.value;
                    /** @type {?} */
                    var transformed = _this.transform(array, value);
                    if (transformed) {
                        array.push(transformed);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (iterable_2_1 && !iterable_2_1.done && (_a = iterable_2.return)) _a.call(iterable_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return array;
            var e_2, _a;
        };
        /** @type {?} */
        var associate = function (value) {
            /** @type {?} */
            var group = new FormGroup({});
            group.setParent(parent);
            try {
                for (var _a = __values(Object.keys(value)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var key = _b.value;
                    /** @type {?} */
                    var transformed = _this.transform(group, value[key]);
                    if (transformed) {
                        group.addControl(key, transformed);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return group;
            var e_3, _c;
        };
        if (Array.isArray(reference)) {
            return iterate(/** @type {?} */ (reference));
        }
        else if (reference instanceof Set) {
            return iterate(/** @type {?} */ (reference));
        }
        else if (reference instanceof Map) {
            return associate(/** @type {?} */ (reference));
        }
        else if (reference instanceof Object) {
            return associate(reference);
        }
        else {
            throw new Error("Cannot convert object of type " + typeof reference + " / " + reference.toString() + " to form element");
        }
    };
    ConnectArrayDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[connectArray]',
                    providers: [
                        {
                            provide: ControlContainer,
                            useExisting: forwardRef(function () { return ConnectArrayDirective; }),
                        },
                    ],
                },] },
    ];
    /** @nocollapse */
    ConnectArrayDirective.ctorParameters = function () { return [
        { type: ControlContainer, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf }] },
        { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] }] },
        { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_ASYNC_VALIDATORS,] }] },
        { type: ConnectBase },
        { type: TemplateRef },
        { type: ViewContainerRef },
        { type: FormStore }
    ]; };
    ConnectArrayDirective.propDecorators = {
        connectArrayOf: [{ type: Input }]
    };
    return ConnectArrayDirective;
}(ControlContainer));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var declarations$1 = [ConnectArrayDirective];
var NgReduxFormConnectArrayModule = /** @class */ (function () {
    function NgReduxFormConnectArrayModule() {
    }
    NgReduxFormConnectArrayModule.decorators = [
        { type: NgModule, args: [{
                    declarations: __spread(declarations$1),
                    exports: __spread(declarations$1),
                },] },
    ];
    return NgReduxFormConnectArrayModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} ngRedux
 * @return {?}
 */
function formStoreFactory(ngRedux) {
    return new FormStore(ngRedux);
}
var NgReduxFormModule = /** @class */ (function () {
    function NgReduxFormModule() {
    }
    NgReduxFormModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        NgReduxFormConnectModule,
                        NgReduxFormConnectArrayModule,
                    ],
                    exports: [NgReduxFormConnectModule, NgReduxFormConnectArrayModule],
                    providers: [
                        {
                            provide: FormStore,
                            useFactory: formStoreFactory,
                            deps: [NgRedux],
                        },
                    ],
                },] },
    ];
    return NgReduxFormModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { composeReducers, defaultFormReducer, FormException, FORM_CHANGED, FormStore, provideReduxForms, ConnectBase, ReactiveConnectDirective, NgReduxFormConnectModule, ConnectDirective, NgReduxFormConnectArrayModule, ConnectArrayDirective, ConnectArrayTemplate, formStoreFactory, NgReduxFormModule, NgReduxFormConnectModule as ɵa, NgReduxFormConnectArrayModule as ɵb };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1yZWR1eC1mb3JtLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AYW5ndWxhci1yZWR1eC9mb3JtL2NvbXBvc2UtcmVkdWNlcnMudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vZm9ybS1zdG9yZS50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9mb3JtLWV4Y2VwdGlvbi50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9zdGF0ZS50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9mb3JtLXJlZHVjZXIudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vY29uZmlndXJlLnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9mb3JtL2Nvbm5lY3QvY29ubmVjdC1iYXNlLnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9mb3JtL2Nvbm5lY3QvY29ubmVjdC1yZWFjdGl2ZS50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9jb25uZWN0L2Nvbm5lY3QudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vY29ubmVjdC9jb25uZWN0Lm1vZHVsZS50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9zaGltcy50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9jb25uZWN0LWFycmF5L2Nvbm5lY3QtYXJyYXktdGVtcGxhdGUudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vY29ubmVjdC1hcnJheS9jb25uZWN0LWFycmF5LnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9mb3JtL2Nvbm5lY3QtYXJyYXkvY29ubmVjdC1hcnJheS5tb2R1bGUudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vbW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFueUFjdGlvbiwgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcblxuZXhwb3J0IGNvbnN0IGNvbXBvc2VSZWR1Y2VycyA9IDxTdGF0ZT4oXG4gIC4uLnJlZHVjZXJzOiBSZWR1Y2VyPFN0YXRlLCBBbnlBY3Rpb24+W11cbik6IFJlZHVjZXI8U3RhdGUsIEFueUFjdGlvbj4gPT4gKHM6IGFueSwgYWN0aW9uOiBBbnlBY3Rpb24pID0+XG4gIHJlZHVjZXJzLnJlZHVjZSgoc3QsIHJlZHVjZXIpID0+IHJlZHVjZXIoc3QsIGFjdGlvbiksIHMpO1xuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5cbmltcG9ydCB7IEFjdGlvbiwgVW5zdWJzY3JpYmUgfSBmcm9tICdyZWR1eCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWJzdHJhY3RTdG9yZTxSb290U3RhdGU+IHtcbiAgLy8vIERpc3BhdGNoIGFuIGFjdGlvblxuICBkaXNwYXRjaChhY3Rpb246IEFjdGlvbiAmIHsgcGF5bG9hZDogYW55IH0pOiB2b2lkO1xuXG4gIC8vLyBSZXRyaWV2ZSB0aGUgY3VycmVudCBhcHBsaWNhdGlvbiBzdGF0ZVxuICBnZXRTdGF0ZSgpOiBSb290U3RhdGU7XG5cbiAgLy8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIHRoZSBzdG9yZVxuICBzdWJzY3JpYmUoZm46IChzdGF0ZTogUm9vdFN0YXRlKSA9PiB2b2lkKTogVW5zdWJzY3JpYmU7XG59XG5cbmV4cG9ydCBjb25zdCBGT1JNX0NIQU5HRUQgPSAnQEBhbmd1bGFyLXJlZHV4L2Zvcm0vRk9STV9DSEFOR0VEJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1TdG9yZSB7XG4gIC8vLyBOT1RFKGNib25kKTogVGhlIGRlY2xhcmF0aW9uIG9mIHN0b3JlIGlzIG1pc2xlYWRpbmcuIFRoaXMgY2xhc3MgaXNcbiAgLy8vIGFjdHVhbGx5IGNhcGFibGUgb2YgdGFraW5nIGEgcGxhaW4gUmVkdXggc3RvcmUgb3IgYW4gTmdSZWR1eCBpbnN0YW5jZS5cbiAgLy8vIEJ1dCBpbiBvcmRlciB0byBtYWtlIHRoZSBuZyBkZXBlbmRlbmN5IGluamVjdG9yIHdvcmsgcHJvcGVybHksIHdlXG4gIC8vLyBkZWNsYXJlIGl0IGFzIGFuIE5nUmVkdXggdHlwZSwgc2luY2UgdGhlIEBhbmd1bGFyLXJlZHV4L3N0b3JlIHVzZSBjYXNlIGludm9sdmVzXG4gIC8vLyBjYWxsaW5nIHRoZSBjb25zdHJ1Y3RvciBvZiB0aGlzIGNsYXNzIG1hbnVhbGx5IChmcm9tIGNvbmZpZ3VyZS50cyksXG4gIC8vLyB3aGVyZSBhIHBsYWluIHN0b3JlIGNhbiBiZSBjYXN0IHRvIGFuIE5nUmVkdXguIChGb3Igb3VyIHB1cnBvc2VzLCB0aGV5XG4gIC8vLyBoYXZlIGFsbW9zdCBpZGVudGljYWwgc2hhcGVzLilcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogTmdSZWR1eDxhbnk+KSB7fVxuXG4gIGdldFN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFN0YXRlKCk7XG4gIH1cblxuICBzdWJzY3JpYmUoZm46IChzdGF0ZTogYW55KSA9PiB2b2lkKTogVW5zdWJzY3JpYmUge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnN1YnNjcmliZSgoKSA9PiBmbih0aGlzLmdldFN0YXRlKCkpKTtcbiAgfVxuXG4gIHZhbHVlQ2hhbmdlZDxUPihwYXRoOiBzdHJpbmdbXSwgZm9ybTogTmdGb3JtLCB2YWx1ZTogVCkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogRk9STV9DSEFOR0VELFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBwYXRoLFxuICAgICAgICBmb3JtLFxuICAgICAgICB2YWxpZDogZm9ybS52YWxpZCA9PT0gdHJ1ZSxcbiAgICAgICAgdmFsdWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRm9ybUV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobXNnOiBzdHJpbmcpIHtcbiAgICBzdXBlcihtc2cpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJdGVyYWJsZSwgTWFwIGFzIEltbXV0YWJsZU1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmltcG9ydCB7IEZvcm1FeGNlcHRpb24gfSBmcm9tICcuL2Zvcm0tZXhjZXB0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBPcGVyYXRpb25zPFQ+IHtcbiAgLy8vIFNoYWxsb3cgY2xvbmUgdGhlIG9iamVjdFxuICBjbG9uZSgpOiBUO1xuXG4gIC8vLyBDbG9uZSBhbmQgbWVyZ2VcbiAgbWVyZ2Uoa2V5OiBudW1iZXIgfCBzdHJpbmcgfCBudWxsLCB2YWx1ZTogVCk6IGFueTtcblxuICAvLy8gQ2xvbmUgdGhlIG9iamVjdCBhbmQgdXBkYXRlIGEgc3BlY2lmaWMga2V5IGluc2lkZSBvZiBpdFxuICB1cGRhdGUoa2V5OiBudW1iZXIgfCBzdHJpbmcgfCBudWxsLCB2YWx1ZTogVCk6IGFueTtcbn1cblxuZXhwb3J0IHR5cGUgVHJhdmVyc2VDYWxsYmFjayA9IChcbiAgcGFyZW50OiBhbnksXG4gIGtleTogbnVtYmVyIHwgc3RyaW5nLFxuICByZW1haW5pbmdQYXRoOiBzdHJpbmdbXSxcbiAgdmFsdWU/OiBhbnksXG4pID0+IGFueTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0YXRlIHtcbiAgc3RhdGljIHRyYXZlcnNlPFN0YXRlVHlwZT4oXG4gICAgc3RhdGU6IFN0YXRlVHlwZSxcbiAgICBwYXRoOiBzdHJpbmdbXSxcbiAgICBmbj86IFRyYXZlcnNlQ2FsbGJhY2ssXG4gICkge1xuICAgIGxldCBkZWVwVmFsdWUgPSBzdGF0ZTtcblxuICAgIGZvciAoY29uc3QgayBvZiBwYXRoKSB7XG4gICAgICBjb25zdCBwYXJlbnQgPSBkZWVwVmFsdWU7XG5cbiAgICAgIGlmIChJdGVyYWJsZS5pc0l0ZXJhYmxlKGRlZXBWYWx1ZSkpIHtcbiAgICAgICAgY29uc3QgbSA9IChkZWVwVmFsdWUgYXMgYW55KSBhcyBJbW11dGFibGVNYXA8c3RyaW5nLCBhbnk+O1xuICAgICAgICBpZiAodHlwZW9mIG0uZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZGVlcFZhbHVlID0gbS5nZXQoayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEZvcm1FeGNlcHRpb24oXG4gICAgICAgICAgICBgQ2Fubm90IHJldHJpZXZlIHZhbHVlIGZyb20gaW1tdXRhYmxlIG5vbmFzc29jaWF0aXZlIGNvbnRhaW5lcjogJHtrfWAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChkZWVwVmFsdWUgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgZGVlcFZhbHVlID0gKChkZWVwVmFsdWUgYXMgYW55KSBhcyBNYXA8c3RyaW5nLCBhbnk+KS5nZXQoayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWVwVmFsdWUgPSAoZGVlcFZhbHVlIGFzIGFueSlba107XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtZWQgPSBmbihcbiAgICAgICAgICBwYXJlbnQsXG4gICAgICAgICAgayxcbiAgICAgICAgICBwYXRoLnNsaWNlKHBhdGguaW5kZXhPZihrKSArIDEpLFxuICAgICAgICAgIGRlZXBWYWx1ZSxcbiAgICAgICAgKTtcblxuICAgICAgICBkZWVwVmFsdWUgPSB0cmFuc2Zvcm1lZFtrXTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKHBhcmVudCwgdHJhbnNmb3JtZWQpO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB3ZSB3ZXJlIG5vdCBhYmxlIHRvIGZpbmQgdGhpcyBzdGF0ZSBpbnNpZGUgb2Ygb3VyIHJvb3Qgc3RhdGVcbiAgICAgIC8vIHN0cnVjdHVyZSwgdGhlbiB3ZSByZXR1cm4gdW5kZWZpbmVkIC0tIG5vdCBudWxsIC0tIHRvIGluZGljYXRlIHRoYXRcbiAgICAgIC8vIHN0YXRlLiBCdXQgdGhpcyBjb3VsZCBiZSBhIHBlcmZlY3RseSBub3JtYWwgdXNlLWNhc2Ugc28gd2UgZG9uJ3RcbiAgICAgIC8vIHdhbnQgdG8gdGhyb3cgYW4gZXhjZXB0aW9uIG9yIGFueXRoaW5nIGFsb25nIHRob3NlIGxpbmVzLlxuICAgICAgaWYgKGRlZXBWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZXBWYWx1ZTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQ8U3RhdGVUeXBlPihzdGF0ZTogU3RhdGVUeXBlLCBwYXRoOiBzdHJpbmdbXSk6IGFueSB7XG4gICAgcmV0dXJuIFN0YXRlLnRyYXZlcnNlKHN0YXRlLCBwYXRoKTtcbiAgfVxuXG4gIHN0YXRpYyBhc3NpZ248U3RhdGVUeXBlPihzdGF0ZTogU3RhdGVUeXBlLCBwYXRoOiBzdHJpbmdbXSwgdmFsdWU/OiBhbnkpIHtcbiAgICBjb25zdCBvcGVyYXRpb25zID0gU3RhdGUuaW5zcGVjdChzdGF0ZSk7XG5cbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBvcGVyYXRpb25zLnVwZGF0ZShudWxsLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgY29uc3Qgcm9vdCA9IG9wZXJhdGlvbnMuY2xvbmUoKTtcblxuICAgIC8vIFdlIHdhbnQgdG8gc2hhbGxvdyBjbG9uZSB0aGUgb2JqZWN0LCBhbmQgdGhlbiB0cmFjZSBhIHBhdGggdG8gdGhlIHBsYWNlXG4gICAgLy8gd2Ugd2FudCB0byB1cGRhdGUsIGNsb25pbmcgZWFjaCBvYmplY3Qgd2UgdHJhdmVyc2VkIG9uIG91ciB3YXkgYW5kIHRoZW5cbiAgICAvLyBmaW5hbGx5IHVwZGF0aW5nIHRoZSB2YWx1ZSBvbiB0aGUgbGFzdCBwYXJlbnQgdG8gYmUgQHZhbHVlLiBUaGlzIHNlZW1zXG4gICAgLy8gdG8gb2ZmZXIgdGhlIGJlc3QgcGVyZm9ybWFuY2U6IHdlIGNhbiBzaGFsbG93IGNsb25lIGV2ZXJ5dGhpbmcgdGhhdCBoYXNcbiAgICAvLyBub3QgYmVlbiBtb2RpZmllZCwgYW5kIHtkZWVwIGNsb25lICsgdXBkYXRlfSB0aGUgcGF0aCBkb3duIHRvIHRoZSB2YWx1ZVxuICAgIC8vIHRoYXQgd2Ugd2lzaCB0byB1cGRhdGUuXG4gICAgU3RhdGUudHJhdmVyc2UoXG4gICAgICByb290LFxuICAgICAgcGF0aCxcbiAgICAgIChwYXJlbnQsIGtleTogbnVtYmVyIHwgc3RyaW5nLCByZW1haW5pbmdQYXRoOiBzdHJpbmdbXSwgaW5uZXJWYWx1ZT8pID0+IHtcbiAgICAgICAgY29uc3QgcGFyZW50T3BlcmF0aW9ucyA9IFN0YXRlLmluc3BlY3QocGFyZW50KTtcblxuICAgICAgICBpZiAoaW5uZXJWYWx1ZSkge1xuICAgICAgICAgIGNvbnN0IGlubmVyT3BlcmF0aW9ucyA9IFN0YXRlLmluc3BlY3QoaW5uZXJWYWx1ZSk7XG5cbiAgICAgICAgICByZXR1cm4gcGFyZW50T3BlcmF0aW9ucy51cGRhdGUoXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICByZW1haW5pbmdQYXRoLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgPyBpbm5lck9wZXJhdGlvbnMuY2xvbmUoKVxuICAgICAgICAgICAgICA6IGlubmVyT3BlcmF0aW9ucy5tZXJnZShudWxsLCB2YWx1ZSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBnZXRQcm9iYWJsZVR5cGUgPSAoc3RhdGVLZXk6IHN0cmluZyB8IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgLy8gTk9URShjYm9uZCk6IElmIHlvdXIgY29kZSBnZXRzIGhlcmUsIHlvdSBtaWdodCBub3QgYmUgdXNpbmcgdGhlIGxpYnJhcnlcbiAgICAgICAgICAgIC8vLyBjb3JyZWN0bHkuIElmIHlvdSBhcmUgYXNzaWduaW5nIGludG8gYSBwYXRoIGluIHlvdXIgc3RhdGUsIHRyeSB0b1xuICAgICAgICAgICAgLy8vIGVuc3VyZSB0aGF0IHRoZXJlIGlzIGEgcGF0aCB0byB0cmF2ZXJzZSwgZXZlbiBpZiBldmVyeXRoaW5nIGlzIGp1c3RcbiAgICAgICAgICAgIC8vLyBlbXB0eSBvYmplY3RzIGFuZCBhcnJheXMuIElmIHdlIGhhdmUgdG8gZ3Vlc3MgdGhlIHR5cGUgb2YgdGhlIGNvbnRhaW5lcnNcbiAgICAgICAgICAgIC8vLyBhbmQgdGhlbiBjcmVhdGUgdGhlbSBvdXJzZWx2ZXMsIHdlIG1heSBub3QgZ2V0IHRoZSB0eXBlcyByaWdodC4gVXNlXG4gICAgICAgICAgICAvLy8gdGhlIFJlZHV4IGBpbml0aWFsIHN0YXRlJyBjb25zdHJ1Y3QgdG8gcmVzb2x2ZSB0aGlzIGlzc3VlIGlmIHlvdSBsaWtlLlxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBzdGF0ZUtleSA9PT0gJ251bWJlcidcbiAgICAgICAgICAgICAgPyBuZXcgQXJyYXkoKVxuICAgICAgICAgICAgICA6IEFycmF5LmlzQXJyYXkoc3RhdGVLZXkpXG4gICAgICAgICAgICAgICAgPyBJbW11dGFibGVNYXAoKVxuICAgICAgICAgICAgICAgIDogbmV3IE9iamVjdCgpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZXR1cm4gcGFyZW50T3BlcmF0aW9ucy51cGRhdGUoXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICByZW1haW5pbmdQYXRoLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgPyBnZXRQcm9iYWJsZVR5cGUocmVtYWluaW5nUGF0aFswXSlcbiAgICAgICAgICAgICAgOiB2YWx1ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG5cbiAgICByZXR1cm4gcm9vdDtcbiAgfVxuXG4gIHN0YXRpYyBpbnNwZWN0PEs+KG9iamVjdDogSyk6IE9wZXJhdGlvbnM8Sz4ge1xuICAgIGNvbnN0IG1ldGFPcGVyYXRpb25zID0gKFxuICAgICAgLy8gVE9ETzogV3JpdGUgcHJvcGVyIHR5cGUgZGVjbGFyYXRpb25zIGZvciBmb2xsb3dpbmcgRnVuY3Rpb24gdHlwZXNcbiAgICAgIHVwZGF0ZTogRnVuY3Rpb24sXG4gICAgICBtZXJnZTogRnVuY3Rpb24sXG4gICAgICBjbG9uZT86IEZ1bmN0aW9uLFxuICAgICkgPT4ge1xuICAgICAgY29uc3Qgb3BlcmF0aW9ucyA9IHtcbiAgICAgICAgLy8vIENsb25lIHRoZSBvYmplY3QgKHNoYWxsb3cpXG4gICAgICAgIGNsb25lOlxuICAgICAgICAgIHR5cGVvZiBjbG9uZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyAoKSA9PiBjbG9uZShvYmplY3QgYXMgYW55KSBhcyBhbnlcbiAgICAgICAgICAgIDogKCkgPT4gb2JqZWN0LFxuXG4gICAgICAgIC8vLyBVcGRhdGUgYSBzcGVjaWZpYyBrZXkgaW5zaWRlIG9mIHRoZSBjb250YWluZXIgb2JqZWN0XG4gICAgICAgIHVwZGF0ZTogKGtleTogc3RyaW5nLCB2YWx1ZTogSykgPT5cbiAgICAgICAgICB1cGRhdGUob3BlcmF0aW9ucy5jbG9uZSgpLCBrZXksIHZhbHVlKSxcblxuICAgICAgICAvLy8gTWVyZ2UgZXhpc3RpbmcgdmFsdWVzIHdpdGggbmV3IHZhbHVlc1xuICAgICAgICBtZXJnZTogKGtleTogc3RyaW5nLCB2YWx1ZTogSykgPT4ge1xuICAgICAgICAgIGNvbnN0IGNsb25lZCA9IG9wZXJhdGlvbnMuY2xvbmUoKTtcbiAgICAgICAgICByZXR1cm4gbWVyZ2UoY2xvbmVkLCBrZXksIHZhbHVlLCAodjogYW55KSA9PiB1cGRhdGUoY2xvbmVkLCBrZXksIHYpKTtcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBvcGVyYXRpb25zO1xuICAgIH07XG5cbiAgICBpZiAoSXRlcmFibGUuaXNJdGVyYWJsZShvYmplY3QpKSB7XG4gICAgICByZXR1cm4gbWV0YU9wZXJhdGlvbnMoXG4gICAgICAgIC8vIFJlcGxhY2VcbiAgICAgICAgKHBhcmVudDogYW55LCBrZXk6IG51bWJlciB8IHN0cmluZywgdmFsdWU6IEspID0+IHtcbiAgICAgICAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvLyBNZXJnZVxuICAgICAgICAocGFyZW50OiBhbnksIGtleTogbnVtYmVyIHwgc3RyaW5nIHwgc3RyaW5nW10sIHZhbHVlOiBLKSA9PiB7XG4gICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5tZXJnZURlZXBJbihBcnJheS5pc0FycmF5KGtleSkgPyBrZXkgOiBba2V5XSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoSW1tdXRhYmxlTWFwLmlzTWFwKHZhbHVlKSkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyZW50Lm1lcmdlRGVlcCh2YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyZW50LmNvbmNhdCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgcmV0dXJuIG1ldGFPcGVyYXRpb25zKFxuICAgICAgICAvLyBSZXBsYWNlIGFycmF5IGNvbnRlbnRzXG4gICAgICAgIChwYXJlbnQ6IGFueSwga2V5OiBudW1iZXIsIHZhbHVlOiBLKSA9PiB7XG4gICAgICAgICAgaWYgKGtleSAhPSBudWxsKSB7XG4gICAgICAgICAgICBwYXJlbnRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnQuc3BsaWNlLmFwcGx5KFxuICAgICAgICAgICAgICBwYXJlbnQsXG4gICAgICAgICAgICAgIFswLCBwYXJlbnQubGVuZ3RoXS5jb25jYXQoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV0pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gTWVyZ2VcbiAgICAgICAgKHBhcmVudDogYW55LCBfOiBhbnksIHZhbHVlOiBLLCBzZXR0ZXI6ICh2OiBLKSA9PiBLKSA9PiB7XG4gICAgICAgICAgc2V0dGVyKHBhcmVudC5jb25jYXQodmFsdWUpKTtcbiAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIENsb25lXG4gICAgICAgICgpID0+IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG9iamVjdCwgMCksXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAob2JqZWN0IGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICByZXR1cm4gbWV0YU9wZXJhdGlvbnMoXG4gICAgICAgIC8vIFVwZGF0ZSBtYXAga2V5XG4gICAgICAgIChwYXJlbnQ6IGFueSwga2V5OiBudW1iZXIgfCBzdHJpbmcsIHZhbHVlOiBLKSA9PiB7XG4gICAgICAgICAgaWYgKGtleSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50LnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbSA9IG5ldyBNYXAodmFsdWUgYXMgYW55KTtcbiAgICAgICAgICAgIHBhcmVudC5jbGVhcigpO1xuICAgICAgICAgICAgbS5mb3JFYWNoKChtYXBWYWx1ZSwgaW5kZXgpID0+IHBhcmVudC5zZXQoaW5kZXgsIG1hcFZhbHVlKSk7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBNZXJnZVxuICAgICAgICAocGFyZW50OiBNYXA8c3RyaW5nLCBhbnk+LCBfOiBhbnksIHZhbHVlOiBLKSA9PiB7XG4gICAgICAgICAgY29uc3QgbSA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KHZhbHVlIGFzIGFueSk7XG4gICAgICAgICAgbS5mb3JFYWNoKChtYXBWYWx1ZSwga2V5KSA9PiBwYXJlbnQuc2V0KGtleSwgbWFwVmFsdWUpKTtcbiAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIENsb25lXG4gICAgICAgICgpID0+XG4gICAgICAgICAgb2JqZWN0IGluc3RhbmNlb2YgV2Vha01hcFxuICAgICAgICAgICAgPyBuZXcgV2Vha01hcDxvYmplY3QsIGFueT4ob2JqZWN0IGFzIGFueSlcbiAgICAgICAgICAgIDogbmV3IE1hcDxzdHJpbmcsIGFueT4ob2JqZWN0IGFzIGFueSksXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAob2JqZWN0IGluc3RhbmNlb2YgV2Vha1NldCB8fCBvYmplY3QgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgIHJldHVybiBtZXRhT3BlcmF0aW9ucyhcbiAgICAgICAgLy8gVXBkYXRlIGVsZW1lbnQgYXQgaW5kZXggaW4gc2V0XG4gICAgICAgIChwYXJlbnQ6IGFueSwga2V5OiBudW1iZXIsIHZhbHVlOiBLKSA9PiB7XG4gICAgICAgICAgaWYgKGtleSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50LnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcyA9IG5ldyBTZXQodmFsdWUgYXMgYW55KTtcbiAgICAgICAgICAgIHMuZm9yRWFjaCgoc2V0VmFsdWUsIGluZGV4KSA9PiBwYXJlbnQuc2V0KGluZGV4LCBzZXRWYWx1ZSkpO1xuICAgICAgICAgICAgcy5jbGVhcigpO1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gTWVyZ2VcbiAgICAgICAgKHBhcmVudDogU2V0PGFueT4sIF86IGFueSwgdmFsdWU6IGFueSkgPT4ge1xuICAgICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgcGFyZW50LmFkZChlbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBDbG9uZVxuICAgICAgICAoKSA9PlxuICAgICAgICAgIG9iamVjdCBpbnN0YW5jZW9mIFdlYWtTZXRcbiAgICAgICAgICAgID8gbmV3IFdlYWtTZXQ8YW55PihvYmplY3QgYXMgYW55KVxuICAgICAgICAgICAgOiBuZXcgU2V0PGFueT4ob2JqZWN0IGFzIGFueSksXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAob2JqZWN0IGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgdGhyb3cgbmV3IEZvcm1FeGNlcHRpb24oXG4gICAgICAgICdDYW5ub3QgdW5kZXJzdGFuZCB3aHkgYSBEYXRlIG9iamVjdCBhcHBlYXJzIGluIHRoZSBtdXRhdGlvbiBwYXRoIScsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKHR5cGVvZiBvYmplY3QpIHtcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgY2FzZSAnc3ltYm9sJzpcbiAgICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWV0YU9wZXJhdGlvbnMoXG4gICAgICAgICAgICAocGFyZW50OiBhbnksIGtleTogYW55LCB2YWx1ZTogSykgPT4ge1xuICAgICAgICAgICAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyAuLi5wYXJlbnQsIFtrZXldOiB2YWx1ZSB9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB7IC4uLnBhcmVudCwgLi4uKHZhbHVlIGFzIGFueSkgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAocGFyZW50OiBhbnksIF86IGFueSwgdmFsdWU6IEspID0+IHtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBrIG9mIE9iamVjdC5rZXlzKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHBhcmVudFtrXSA9ICh2YWx1ZSBhcyBhbnkpW2tdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4gKHsgLi4uKG9iamVjdCBhcyBhbnkpIH0pLFxuICAgICAgICAgICk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYEFuIG9iamVjdCBvZiB0eXBlICR7dHlwZW9mIG9iamVjdH0gaGFzIGFwcGVhcmVkIGluIHRoZSBtdXRhdGlvbiBwYXRoISBFdmVyeSBlbGVtZW50IGAgK1xuICAgICAgICAnaW4gdGhlIG11dGF0aW9uIHBhdGggc2hvdWxkIGJlIGFuIGFycmF5LCBhbiBhc3NvY2lhdGl2ZSBjb250YWluZXIsIG9yIGEgc2V0JyxcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIGVtcHR5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdmFsdWUgPT0gbnVsbCB8fFxuICAgICAgKHZhbHVlLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAodHlwZW9mIHZhbHVlLmxlbmd0aCA9PT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoID09PSAwKSlcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJdGVyYWJsZSB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IHsgRk9STV9DSEFOR0VEIH0gZnJvbSAnLi9mb3JtLXN0b3JlJztcblxuaW1wb3J0IHsgU3RhdGUgfSBmcm9tICcuL3N0YXRlJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRGb3JtUmVkdWNlciA9IDxSb290U3RhdGU+KFxuICBpbml0aWFsU3RhdGU/OiBSb290U3RhdGUgfCBJdGVyYWJsZS5LZXllZDxzdHJpbmcsIGFueT4sXG4pID0+IHtcbiAgY29uc3QgcmVkdWNlciA9IChcbiAgICBzdGF0ZTogUm9vdFN0YXRlIHwgSXRlcmFibGUuS2V5ZWQ8c3RyaW5nLCBhbnk+IHwgdW5kZWZpbmVkID0gaW5pdGlhbFN0YXRlLFxuICAgIGFjdGlvbjogQWN0aW9uICYgeyBwYXlsb2FkPzogYW55IH0sXG4gICkgPT4ge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgRk9STV9DSEFOR0VEOlxuICAgICAgICByZXR1cm4gU3RhdGUuYXNzaWduKHN0YXRlLCBhY3Rpb24ucGF5bG9hZC5wYXRoLCBhY3Rpb24ucGF5bG9hZC52YWx1ZSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiByZWR1Y2VyO1xufTtcbiIsImltcG9ydCB7IEFjdGlvbiwgU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7IEFic3RyYWN0U3RvcmUsIEZvcm1TdG9yZSB9IGZyb20gJy4vZm9ybS1zdG9yZSc7XG5cbi8vLyBVc2UgdGhpcyBmdW5jdGlvbiBpbiB5b3VyIHByb3ZpZGVycyBsaXN0IGlmIHlvdSBhcmUgbm90IHVzaW5nIEBhbmd1bGFyLXJlZHV4L2NvcmUuXG4vLy8gVGhpcyB3aWxsIGFsbG93IHlvdSB0byBwcm92aWRlIGEgcHJlZXhpc3Rpbmcgc3RvcmUgdGhhdCB5b3UgaGF2ZSBhbHJlYWR5XG4vLy8gY29uZmlndXJlZCwgcmF0aGVyIHRoYW4gbGV0dGluZyBAYW5ndWxhci1yZWR1eC9jb3JlIGNyZWF0ZSBvbmUgZm9yIHlvdS5cbmV4cG9ydCBjb25zdCBwcm92aWRlUmVkdXhGb3JtcyA9IDxUPihzdG9yZTogU3RvcmU8VD4gfCBhbnkpID0+IHtcbiAgY29uc3QgYWJzdHJhY3RTdG9yZSA9IHdyYXAoc3RvcmUpO1xuXG4gIHJldHVybiBbXG4gICAgeyBwcm92aWRlOiBGb3JtU3RvcmUsIHVzZVZhbHVlOiBuZXcgRm9ybVN0b3JlKGFic3RyYWN0U3RvcmUgYXMgYW55KSB9LFxuICBdO1xufTtcblxuY29uc3Qgd3JhcCA9IDxUPihzdG9yZTogU3RvcmU8VD4gfCBhbnkpOiBBYnN0cmFjdFN0b3JlPFQ+ID0+IHtcbiAgY29uc3QgZGlzcGF0Y2ggPSAoYWN0aW9uOiBBY3Rpb24pID0+IHN0b3JlLmRpc3BhdGNoKGFjdGlvbik7XG5cbiAgY29uc3QgZ2V0U3RhdGUgPSAoKSA9PiBzdG9yZS5nZXRTdGF0ZSgpIGFzIFQ7XG5cbiAgY29uc3Qgc3Vic2NyaWJlID0gKGZuOiAoc3RhdGU6IFQpID0+IHZvaWQpID0+XG4gICAgc3RvcmUuc3Vic2NyaWJlKCgpID0+IGZuKHN0b3JlLmdldFN0YXRlKCkpKTtcblxuICByZXR1cm4geyBkaXNwYXRjaCwgZ2V0U3RhdGUsIHN1YnNjcmliZSB9O1xufTtcbiIsImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgQWJzdHJhY3RDb250cm9sLFxuICBGb3JtQXJyYXksXG4gIEZvcm1Db250cm9sLFxuICBGb3JtR3JvdXAsXG4gIE5nQ29udHJvbCxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgVW5zdWJzY3JpYmUgfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRm9ybVN0b3JlIH0gZnJvbSAnLi4vZm9ybS1zdG9yZSc7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4uL3N0YXRlJztcblxuZXhwb3J0IGludGVyZmFjZSBDb250cm9sUGFpciB7XG4gIHBhdGg6IHN0cmluZ1tdO1xuICBjb250cm9sOiBBYnN0cmFjdENvbnRyb2w7XG59XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0QmFzZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIGdldCBwYXRoKCk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBwYXRoID1cbiAgICAgIHR5cGVvZiB0aGlzLmNvbm5lY3QgPT09ICdmdW5jdGlvbicgPyB0aGlzLmNvbm5lY3QoKSA6IHRoaXMuY29ubmVjdDtcblxuICAgIHN3aXRjaCAodHlwZW9mIHBhdGgpIHtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChTdGF0ZS5lbXB0eShwYXRoKSkge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXRoKSkge1xuICAgICAgICAgIHJldHVybiBwYXRoIGFzIHN0cmluZ1tdO1xuICAgICAgICB9XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICByZXR1cm4gKHBhdGggYXMgc3RyaW5nKS5zcGxpdCgvXFwuL2cpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gZmFsbHRocm91Z2ggYWJvdmUgKG5vIGJyZWFrKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYENhbm5vdCBkZXRlcm1pbmUgcGF0aCB0byBvYmplY3Q6ICR7SlNPTi5zdHJpbmdpZnkocGF0aCl9YCxcbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbiAgQElucHV0KCkgY29ubmVjdD86ICgpID0+IChzdHJpbmcgfCBudW1iZXIpIHwgKHN0cmluZyB8IG51bWJlcilbXTtcbiAgcHJvdGVjdGVkIHN0b3JlPzogRm9ybVN0b3JlO1xuICBwcm90ZWN0ZWQgZm9ybTogYW55O1xuICBwcml2YXRlIHN0YXRlU3Vic2NyaXB0aW9uPzogVW5zdWJzY3JpYmU7XG5cbiAgcHJpdmF0ZSBmb3JtU3Vic2NyaXB0aW9uPzogU3Vic2NyaXB0aW9uO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmZvcm1TdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuZm9ybVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbigpOyAvLyB1bnN1YnNjcmliZVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMucmVzZXRTdGF0ZSgpO1xuXG4gICAgICBpZiAodGhpcy5zdG9yZSkge1xuICAgICAgICB0aGlzLnN0YXRlU3Vic2NyaXB0aW9uID0gdGhpcy5zdG9yZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZXNldFN0YXRlKCkpO1xuICAgICAgfVxuXG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5mb3JtU3Vic2NyaXB0aW9uID0gKHRoaXMuZm9ybS52YWx1ZUNoYW5nZXMgYXMgYW55KVxuICAgICAgICAgIC5waXBlKGRlYm91bmNlVGltZSgwKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCh2YWx1ZXM6IGFueSkgPT4gdGhpcy5wdWJsaXNoKHZhbHVlcykpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRlc2NlbmRhbnRzKHBhdGg6IHN0cmluZ1tdLCBmb3JtRWxlbWVudDogYW55KTogQ29udHJvbFBhaXJbXSB7XG4gICAgY29uc3QgcGFpcnMgPSBuZXcgQXJyYXk8Q29udHJvbFBhaXI+KCk7XG5cbiAgICBpZiAoZm9ybUVsZW1lbnQgaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHtcbiAgICAgIGZvcm1FbGVtZW50LmNvbnRyb2xzLmZvckVhY2goKGMsIGluZGV4KSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgZCBvZiB0aGlzLmRlc2NlbmRhbnRzKChwYXRoIGFzIGFueSkuY29uY2F0KFtpbmRleF0pLCBjKSkge1xuICAgICAgICAgIHBhaXJzLnB1c2goZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoZm9ybUVsZW1lbnQgaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcbiAgICAgIGZvciAoY29uc3QgayBvZiBPYmplY3Qua2V5cyhmb3JtRWxlbWVudC5jb250cm9scykpIHtcbiAgICAgICAgcGFpcnMucHVzaCh7XG4gICAgICAgICAgcGF0aDogcGF0aC5jb25jYXQoW2tdKSxcbiAgICAgICAgICBjb250cm9sOiBmb3JtRWxlbWVudC5jb250cm9sc1trXSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGZvcm1FbGVtZW50IGluc3RhbmNlb2YgTmdDb250cm9sIHx8XG4gICAgICBmb3JtRWxlbWVudCBpbnN0YW5jZW9mIEZvcm1Db250cm9sXG4gICAgKSB7XG4gICAgICByZXR1cm4gW3sgcGF0aCwgY29udHJvbDogZm9ybUVsZW1lbnQgYXMgYW55IH1dO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBVbmtub3duIHR5cGUgb2YgZm9ybSBlbGVtZW50OiAke2Zvcm1FbGVtZW50LmNvbnN0cnVjdG9yLm5hbWV9YCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhaXJzLmZpbHRlcihwID0+IHtcbiAgICAgIGNvbnN0IHBhcmVudCA9IChwLmNvbnRyb2wgYXMgYW55KS5fcGFyZW50O1xuICAgICAgcmV0dXJuIHBhcmVudCA9PT0gdGhpcy5mb3JtLmNvbnRyb2wgfHwgcGFyZW50ID09PSB0aGlzLmZvcm07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0U3RhdGUoKSB7XG4gICAgY29uc3QgZm9ybUVsZW1lbnQgPVxuICAgICAgdGhpcy5mb3JtLmNvbnRyb2wgPT09IHVuZGVmaW5lZCA/IHRoaXMuZm9ybSA6IHRoaXMuZm9ybS5jb250cm9sO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmRlc2NlbmRhbnRzKFtdLCBmb3JtRWxlbWVudCk7XG5cbiAgICBjaGlsZHJlbi5mb3JFYWNoKGMgPT4ge1xuICAgICAgY29uc3QgeyBwYXRoLCBjb250cm9sIH0gPSBjO1xuXG4gICAgICBjb25zdCB2YWx1ZSA9IFN0YXRlLmdldCh0aGlzLmdldFN0YXRlKCksIHRoaXMucGF0aC5jb25jYXQocGF0aCkpO1xuXG4gICAgICBpZiAoY29udHJvbC52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgY29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHB1Ymxpc2godmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLnN0b3JlKSB7XG4gICAgICB0aGlzLnN0b3JlLnZhbHVlQ2hhbmdlZCh0aGlzLnBhdGgsIHRoaXMuZm9ybSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0U3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuc3RvcmUpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFN0YXRlKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZvcm1TdG9yZSB9IGZyb20gJy4uL2Zvcm0tc3RvcmUnO1xuXG5pbXBvcnQgeyBDb25uZWN0QmFzZSB9IGZyb20gJy4vY29ubmVjdC1iYXNlJztcblxuLy8gRm9yIHJlYWN0aXZlIGZvcm1zICh3aXRob3V0IGltcGxpY2l0IE5nRm9ybSlcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ2Zvcm1bY29ubmVjdF1bZm9ybUdyb3VwXScgfSlcbmV4cG9ydCBjbGFzcyBSZWFjdGl2ZUNvbm5lY3REaXJlY3RpdmUgZXh0ZW5kcyBDb25uZWN0QmFzZSB7XG4gIEBJbnB1dCgpIGZvcm1Hcm91cDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzdG9yZTogRm9ybVN0b3JlKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgRm9ybVN0b3JlIH0gZnJvbSAnLi4vZm9ybS1zdG9yZSc7XG5pbXBvcnQgeyBDb25uZWN0QmFzZSB9IGZyb20gJy4vY29ubmVjdC1iYXNlJztcblxuLy8gRm9yIHRlbXBsYXRlIGZvcm1zICh3aXRoIGltcGxpY2l0IE5nRm9ybSlcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ2Zvcm1bY29ubmVjdF06bm90KFtmb3JtR3JvdXBdKScgfSlcbmV4cG9ydCBjbGFzcyBDb25uZWN0RGlyZWN0aXZlIGV4dGVuZHMgQ29ubmVjdEJhc2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgc3RvcmU6IEZvcm1TdG9yZSwgcHJvdGVjdGVkIGZvcm06IE5nRm9ybSkge1xuICAgIHN1cGVyKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbm5lY3REaXJlY3RpdmUgfSBmcm9tICcuL2Nvbm5lY3QnO1xuaW1wb3J0IHsgUmVhY3RpdmVDb25uZWN0RGlyZWN0aXZlIH0gZnJvbSAnLi9jb25uZWN0LXJlYWN0aXZlJztcblxuY29uc3QgZGVjbGFyYXRpb25zID0gW0Nvbm5lY3REaXJlY3RpdmUsIFJlYWN0aXZlQ29ubmVjdERpcmVjdGl2ZV07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogWy4uLmRlY2xhcmF0aW9uc10sXG4gIGV4cG9ydHM6IFsuLi5kZWNsYXJhdGlvbnNdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ1JlZHV4Rm9ybUNvbm5lY3RNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIENoZWNrYm94Q29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIENvbnRyb2xDb250YWluZXIsXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgU2VsZWN0TXVsdGlwbGVDb250cm9sVmFsdWVBY2Nlc3Nvcixcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udHJvbFBhdGgobmFtZTogc3RyaW5nLCBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIpOiBzdHJpbmdbXSB7XG4gIHJldHVybiBbLi4uKHBhcmVudC5wYXRoIHx8IFtdKSwgbmFtZV07XG59XG5cbmNvbnN0IEJVSUxUSU5fQUNDRVNTT1JTID0gW1xuICBDaGVja2JveENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgU2VsZWN0TXVsdGlwbGVDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgUmFkaW9Db250cm9sVmFsdWVBY2Nlc3Nvcixcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0J1aWx0SW5BY2Nlc3NvcihcbiAgdmFsdWVBY2Nlc3NvcjogQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIEJVSUxUSU5fQUNDRVNTT1JTLnNvbWUoYSA9PiB2YWx1ZUFjY2Vzc29yLmNvbnN0cnVjdG9yID09PSBhKTtcbn1cbiIsImV4cG9ydCBjbGFzcyBDb25uZWN0QXJyYXlUZW1wbGF0ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyAkaW1wbGljaXQ6IGFueSwgcHVibGljIGluZGV4OiBudW1iZXIsIHB1YmxpYyBpdGVtOiBhbnkpIHt9XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdCxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBTZWxmLFxuICBTa2lwU2VsZixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWJzdHJhY3RDb250cm9sLFxuICBBc3luY1ZhbGlkYXRvckZuLFxuICBDb250cm9sQ29udGFpbmVyLFxuICBGb3JtQXJyYXksXG4gIEZvcm1Db250cm9sLFxuICBGb3JtR3JvdXAsXG4gIEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgTkdfQVNZTkNfVkFMSURBVE9SUyxcbiAgTkdfVkFMSURBVE9SUyxcbiAgTmdNb2RlbEdyb3VwLFxuICBWYWxpZGF0b3JGbixcbiAgVmFsaWRhdG9ycyxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVW5zdWJzY3JpYmUgfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7IENvbm5lY3RCYXNlIH0gZnJvbSAnLi4vY29ubmVjdCc7XG5pbXBvcnQgeyBGb3JtU3RvcmUgfSBmcm9tICcuLi9mb3JtLXN0b3JlJztcbmltcG9ydCB7IGNvbnRyb2xQYXRoIH0gZnJvbSAnLi4vc2hpbXMnO1xuaW1wb3J0IHsgU3RhdGUgfSBmcm9tICcuLi9zdGF0ZSc7XG5pbXBvcnQgeyBDb25uZWN0QXJyYXlUZW1wbGF0ZSB9IGZyb20gJy4vY29ubmVjdC1hcnJheS10ZW1wbGF0ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjb25uZWN0QXJyYXldJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQ29udHJvbENvbnRhaW5lcixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENvbm5lY3RBcnJheURpcmVjdGl2ZSksXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29ubmVjdEFycmF5RGlyZWN0aXZlIGV4dGVuZHMgQ29udHJvbENvbnRhaW5lclxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdGF0ZVN1YnNjcmlwdGlvbjogVW5zdWJzY3JpYmU7XG5cbiAgcHJpdmF0ZSBhcnJheSA9IG5ldyBGb3JtQXJyYXkoW10pO1xuXG4gIHByaXZhdGUga2V5Pzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEhvc3QoKVxuICAgIEBTa2lwU2VsZigpXG4gICAgcHJpdmF0ZSBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIsXG4gICAgQE9wdGlvbmFsKClcbiAgICBAU2VsZigpXG4gICAgQEluamVjdChOR19WQUxJREFUT1JTKVxuICAgIHByaXZhdGUgcmF3VmFsaWRhdG9yczogYW55W10sXG4gICAgQE9wdGlvbmFsKClcbiAgICBAU2VsZigpXG4gICAgQEluamVjdChOR19BU1lOQ19WQUxJREFUT1JTKVxuICAgIHByaXZhdGUgcmF3QXN5bmNWYWxpZGF0b3JzOiBhbnlbXSxcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3RCYXNlLFxuICAgIHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgc3RvcmU6IEZvcm1TdG9yZSxcbiAgKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24gPSB0aGlzLnN0b3JlLnN1YnNjcmliZShzdGF0ZSA9PlxuICAgICAgdGhpcy5yZXNldFN0YXRlKHN0YXRlKSxcbiAgICApO1xuXG4gICAgdGhpcy5yZWdpc3RlckludGVybmFscyh0aGlzLmFycmF5KTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBjb25uZWN0QXJyYXlPZihjb2xsZWN0aW9uOiBhbnkpIHtcbiAgICB0aGlzLmtleSA9IGNvbGxlY3Rpb247XG5cbiAgICB0aGlzLnJlc2V0U3RhdGUodGhpcy5zdG9yZS5nZXRTdGF0ZSgpKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9ybURpcmVjdGl2ZS5hZGRDb250cm9sKHRoaXMgYXMgYW55KTtcbiAgfVxuXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMua2V5IHx8ICcnO1xuICB9XG5cbiAgZ2V0IGNvbnRyb2woKTogRm9ybUFycmF5IHtcbiAgICByZXR1cm4gdGhpcy5hcnJheTtcbiAgfVxuXG4gIGdldCBmb3JtRGlyZWN0aXZlKCk6IEZvcm1Hcm91cERpcmVjdGl2ZSB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50LmZvcm1EaXJlY3RpdmUgYXMgRm9ybUdyb3VwRGlyZWN0aXZlO1xuICB9XG5cbiAgZ2V0IHBhdGgoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmtleSA/IGNvbnRyb2xQYXRoKHRoaXMua2V5LCB0aGlzLnBhcmVudCkgOiBbXTtcbiAgfVxuXG4gIGdldCB2YWxpZGF0b3IoKTogVmFsaWRhdG9yRm4gfCBudWxsIHtcbiAgICByZXR1cm4gVmFsaWRhdG9ycy5jb21wb3NlKHRoaXMucmF3VmFsaWRhdG9ycyk7XG4gIH1cblxuICBnZXQgYXN5bmNWYWxpZGF0b3IoKTogQXN5bmNWYWxpZGF0b3JGbiB8IG51bGwge1xuICAgIHJldHVybiBWYWxpZGF0b3JzLmNvbXBvc2VBc3luYyh0aGlzLnJhd0FzeW5jVmFsaWRhdG9ycyk7XG4gIH1cblxuICB1cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCkge1xuICAgIC8vIHN0dWI/XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblxuICAgIGlmICh0aGlzLmtleSkge1xuICAgICAgdGhpcy5mb3JtRGlyZWN0aXZlLmZvcm0ucmVtb3ZlQ29udHJvbCh0aGlzLmtleSk7XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFN0YXRlKHN0YXRlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5rZXkgPT0gbnVsbCB8fCB0aGlzLmtleS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjsgLy8gbm8gc3RhdGUgdG8gcmV0cmVpdmUgaWYgbm8ga2V5IGlzIHNldFxuICAgIH1cblxuICAgIGNvbnN0IGl0ZXJhYmxlID0gU3RhdGUuZ2V0KHN0YXRlLCB0aGlzLmNvbm5lY3Rpb24ucGF0aC5jb25jYXQodGhpcy5wYXRoKSk7XG5cbiAgICBsZXQgaW5kZXggPSAwO1xuXG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBpdGVyYWJsZSkge1xuICAgICAgY29uc3Qgdmlld1JlZiA9XG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5sZW5ndGggPiBpbmRleFxuICAgICAgICAgID8gKHRoaXMudmlld0NvbnRhaW5lclJlZi5nZXQoaW5kZXgpIGFzIEVtYmVkZGVkVmlld1JlZjxcbiAgICAgICAgICAgICAgQ29ubmVjdEFycmF5VGVtcGxhdGVcbiAgICAgICAgICAgID4pXG4gICAgICAgICAgOiBudWxsO1xuXG4gICAgICBpZiAodmlld1JlZiA9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGVtYmVkZGVkVmlld1JlZiA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXc8XG4gICAgICAgICAgQ29ubmVjdEFycmF5VGVtcGxhdGVcbiAgICAgICAgPihcbiAgICAgICAgICB0aGlzLnRlbXBsYXRlUmVmLFxuICAgICAgICAgIG5ldyBDb25uZWN0QXJyYXlUZW1wbGF0ZShpbmRleCwgaW5kZXgsIHZhbHVlKSxcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnBhdGNoRGVzY2VuZGFudENvbnRyb2xzKGVtYmVkZGVkVmlld1JlZik7XG5cbiAgICAgICAgdGhpcy5hcnJheS5pbnNlcnQoXG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgdGhpcy50cmFuc2Zvcm0odGhpcy5hcnJheSwgZW1iZWRkZWRWaWV3UmVmLmNvbnRleHQuaXRlbSksXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIHZpZXdSZWYuY29udGV4dCxcbiAgICAgICAgICBuZXcgQ29ubmVjdEFycmF5VGVtcGxhdGUoaW5kZXgsIGluZGV4LCB2YWx1ZSksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgICsraW5kZXg7XG4gICAgfVxuXG4gICAgd2hpbGUgKHRoaXMudmlld0NvbnRhaW5lclJlZi5sZW5ndGggPiBpbmRleCkge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLnJlbW92ZSh0aGlzLnZpZXdDb250YWluZXJSZWYubGVuZ3RoIC0gMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3RlckludGVybmFscyhhcnJheTogYW55KSB7XG4gICAgYXJyYXkucmVnaXN0ZXJDb250cm9sID0gKCkgPT4gdW5kZWZpbmVkO1xuICAgIGFycmF5LnJlZ2lzdGVyT25DaGFuZ2UgPSAoKSA9PiB1bmRlZmluZWQ7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICBfcmF3VmFsaWRhdG9yczoge1xuICAgICAgICB2YWx1ZTogdGhpcy5yYXdWYWxpZGF0b3JzIHx8IFtdLFxuICAgICAgfSxcbiAgICAgIF9yYXdBc3luY1ZhbGlkYXRvcnM6IHtcbiAgICAgICAgdmFsdWU6IHRoaXMucmF3QXN5bmNWYWxpZGF0b3JzIHx8IFtdLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcGF0Y2hEZXNjZW5kYW50Q29udHJvbHModmlld1JlZjogYW55KSB7XG4gICAgY29uc3QgZ3JvdXBzID0gT2JqZWN0LmtleXModmlld1JlZi5fdmlldylcbiAgICAgIC5tYXAoayA9PiB2aWV3UmVmLl92aWV3W2tdKVxuICAgICAgLmZpbHRlcihjID0+IGMgaW5zdGFuY2VvZiBOZ01vZGVsR3JvdXApO1xuXG4gICAgZ3JvdXBzLmZvckVhY2goYyA9PiB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjLCB7XG4gICAgICAgIF9wYXJlbnQ6IHtcbiAgICAgICAgICB2YWx1ZTogdGhpcyxcbiAgICAgICAgfSxcbiAgICAgICAgX2NoZWNrUGFyZW50VHlwZToge1xuICAgICAgICAgIHZhbHVlOiAoKSA9PiB1bmRlZmluZWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNmb3JtKFxuICAgIHBhcmVudDogRm9ybUdyb3VwIHwgRm9ybUFycmF5LFxuICAgIHJlZmVyZW5jZTogYW55LFxuICApOiBBYnN0cmFjdENvbnRyb2wge1xuICAgIGNvbnN0IGVtcHR5Q29udHJvbCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wobnVsbCk7XG4gICAgICBjb250cm9sLnNldFBhcmVudChwYXJlbnQpO1xuICAgICAgcmV0dXJuIGNvbnRyb2w7XG4gICAgfTtcblxuICAgIGlmIChyZWZlcmVuY2UgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGVtcHR5Q29udHJvbCgpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVmZXJlbmNlLnRvSlMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlZmVyZW5jZSA9IHJlZmVyZW5jZS50b0pTKCk7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0eXBlb2YgcmVmZXJlbmNlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gZW1wdHlDb250cm9sKCk7XG4gICAgfVxuXG4gICAgY29uc3QgaXRlcmF0ZSA9IChpdGVyYWJsZTogYW55KTogRm9ybUFycmF5ID0+IHtcbiAgICAgIGNvbnN0IGFycmF5ID0gbmV3IEZvcm1BcnJheShbXSk7XG5cbiAgICAgIHRoaXMucmVnaXN0ZXJJbnRlcm5hbHMoYXJyYXkpO1xuXG4gICAgICBmb3IgKGxldCBpID0gYXJyYXkubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIGFycmF5LnJlbW92ZUF0KGkpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIGl0ZXJhYmxlKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkID0gdGhpcy50cmFuc2Zvcm0oYXJyYXksIHZhbHVlKTtcbiAgICAgICAgaWYgKHRyYW5zZm9ybWVkKSB7XG4gICAgICAgICAgYXJyYXkucHVzaCh0cmFuc2Zvcm1lZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH07XG5cbiAgICBjb25zdCBhc3NvY2lhdGUgPSAodmFsdWU6IGFueSk6IEZvcm1Hcm91cCA9PiB7XG4gICAgICBjb25zdCBncm91cCA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgICAgZ3JvdXAuc2V0UGFyZW50KHBhcmVudCk7XG5cbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHZhbHVlKSkge1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZCA9IHRoaXMudHJhbnNmb3JtKGdyb3VwLCB2YWx1ZVtrZXldKTtcbiAgICAgICAgaWYgKHRyYW5zZm9ybWVkKSB7XG4gICAgICAgICAgZ3JvdXAuYWRkQ29udHJvbChrZXksIHRyYW5zZm9ybWVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ3JvdXA7XG4gICAgfTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHJlZmVyZW5jZSkpIHtcbiAgICAgIHJldHVybiBpdGVyYXRlKHJlZmVyZW5jZSBhcyBhbnlbXSk7XG4gICAgfSBlbHNlIGlmIChyZWZlcmVuY2UgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgIHJldHVybiBpdGVyYXRlKHJlZmVyZW5jZSBhcyBTZXQ8YW55Pik7XG4gICAgfSBlbHNlIGlmIChyZWZlcmVuY2UgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgIHJldHVybiBhc3NvY2lhdGUocmVmZXJlbmNlIGFzIE1hcDxzdHJpbmcsIGFueT4pO1xuICAgIH0gZWxzZSBpZiAocmVmZXJlbmNlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICByZXR1cm4gYXNzb2NpYXRlKHJlZmVyZW5jZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYENhbm5vdCBjb252ZXJ0IG9iamVjdCBvZiB0eXBlICR7dHlwZW9mIHJlZmVyZW5jZX0gLyAke3JlZmVyZW5jZS50b1N0cmluZygpfSB0byBmb3JtIGVsZW1lbnRgLFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbm5lY3RBcnJheURpcmVjdGl2ZSB9IGZyb20gJy4vY29ubmVjdC1hcnJheSc7XG5cbmNvbnN0IGRlY2xhcmF0aW9ucyA9IFtDb25uZWN0QXJyYXlEaXJlY3RpdmVdO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFsuLi5kZWNsYXJhdGlvbnNdLFxuICBleHBvcnRzOiBbLi4uZGVjbGFyYXRpb25zXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdSZWR1eEZvcm1Db25uZWN0QXJyYXlNb2R1bGUge31cbiIsImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE5nUmVkdXhGb3JtQ29ubmVjdE1vZHVsZSB9IGZyb20gJy4vY29ubmVjdCc7XG5pbXBvcnQgeyBOZ1JlZHV4Rm9ybUNvbm5lY3RBcnJheU1vZHVsZSB9IGZyb20gJy4vY29ubmVjdC1hcnJheSc7XG5pbXBvcnQgeyBGb3JtU3RvcmUgfSBmcm9tICcuL2Zvcm0tc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZm9ybVN0b3JlRmFjdG9yeShuZ1JlZHV4OiBOZ1JlZHV4PGFueT4pIHtcbiAgcmV0dXJuIG5ldyBGb3JtU3RvcmUobmdSZWR1eCk7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE5nUmVkdXhGb3JtQ29ubmVjdE1vZHVsZSxcbiAgICBOZ1JlZHV4Rm9ybUNvbm5lY3RBcnJheU1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW05nUmVkdXhGb3JtQ29ubmVjdE1vZHVsZSwgTmdSZWR1eEZvcm1Db25uZWN0QXJyYXlNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBGb3JtU3RvcmUsXG4gICAgICB1c2VGYWN0b3J5OiBmb3JtU3RvcmVGYWN0b3J5LFxuICAgICAgZGVwczogW05nUmVkdXhdLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5nUmVkdXhGb3JtTW9kdWxlIHt9XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJ0c2xpYl8xLl9fdmFsdWVzIiwiSW1tdXRhYmxlTWFwIiwiZGVjbGFyYXRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFhLGVBQWUsR0FBRztJQUM3QixrQkFBd0M7U0FBeEMsVUFBd0MsRUFBeEMscUJBQXdDLEVBQXhDLElBQXdDO1FBQXhDLDZCQUF3Qzs7SUFDVixPQUFBLFVBQUMsQ0FBTSxFQUFFLE1BQWlCO1FBQ3hELE9BQUEsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEVBQUUsRUFBRSxPQUFPLElBQUssT0FBQSxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFBLEVBQUUsQ0FBQyxDQUFDO0tB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