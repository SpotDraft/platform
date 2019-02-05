(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular-redux/store'), require('immutable'), require('@angular/forms'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@angular-redux/form', ['exports', '@angular/core', '@angular-redux/store', 'immutable', '@angular/forms', 'rxjs/operators'], factory) :
    (factory((global['angular-redux'] = global['angular-redux'] || {}, global['angular-redux'].form = {}),global.ng.core,null,null,global.ng.forms,global.rxjs.operators));
}(this, (function (exports,core,store,immutable,forms,operators) { 'use strict';

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
    var FormStore = (function () {
        /// NOTE(cbond): The declaration of store is misleading. This class is
        /// actually capable of taking a plain Redux store or an NgRedux instance.
        /// But in order to make the ng dependency injector work properly, we
        /// declare it as an NgRedux type, since the @angular-redux/store use case involves
        /// calling the constructor of this class manually (from configure.ts),
        /// where a plain store can be cast to an NgRedux. (For our purposes, they
        /// have almost identical shapes.)
        function FormStore(store$$1) {
            this.store = store$$1;
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        FormStore.ctorParameters = function () {
            return [
                { type: store.NgRedux }
            ];
        };
        return FormStore;
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
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
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
    var FormException = (function (_super) {
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
     */ State = (function () {
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
                        if (immutable.Iterable.isIterable(deepValue)) {
                            /** @type {?} */
                            var m = (((deepValue)));
                            if (typeof m.get === 'function') {
                                deepValue = m.get(k);
                            }
                            else {
                                throw new FormException("Cannot retrieve value from immutable nonassociative container: " + k);
                            }
                        }
                        else if (deepValue instanceof Map) {
                            deepValue = ((((deepValue)))).get(k);
                        }
                        else {
                            deepValue = ((deepValue))[k];
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
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (path_1_1 && !path_1_1.done && (_a = path_1.return))
                            _a.call(path_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
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
                                    ? immutable.Map()
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
                if (immutable.Iterable.isIterable(object)) {
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
                            if (immutable.Map.isMap(value)) {
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
                        catch (e_2_1) {
                            e_2 = { error: e_2_1 };
                        }
                        finally {
                            try {
                                if (value_1_1 && !value_1_1.done && (_a = value_1.return))
                                    _a.call(value_1);
                            }
                            finally {
                                if (e_2)
                                    throw e_2.error;
                            }
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
                                return __assign({}, parent, ((value)));
                                var _a;
                            }, function (parent, _, value) {
                                try {
                                    for (var _a = __values(Object.keys(value)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                        var k = _b.value;
                                        parent[k] = ((value))[k];
                                    }
                                }
                                catch (e_3_1) {
                                    e_3 = { error: e_3_1 };
                                }
                                finally {
                                    try {
                                        if (_b && !_b.done && (_c = _a.return))
                                            _c.call(_a);
                                    }
                                    finally {
                                        if (e_3)
                                            throw e_3.error;
                                    }
                                }
                                return parent;
                                var e_3, _c;
                            }, function () { return (__assign({}, ((object)))); });
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
            if (state === void 0) {
                state = initialState;
            }
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
    var provideReduxForms = function (store$$1) {
        /** @type {?} */
        var abstractStore = wrap(store$$1);
        return [
            { provide: FormStore, useValue: new FormStore(/** @type {?} */ (abstractStore)) },
        ];
    };
    /** @type {?} */
    var wrap = function (store$$1) {
        /** @type {?} */
        var dispatch = function (action) { return store$$1.dispatch(action); };
        /** @type {?} */
        var getState = function () { return (store$$1.getState()); };
        /** @type {?} */
        var subscribe = function (fn) {
            return store$$1.subscribe(function () { return fn(store$$1.getState()); });
        };
        return { dispatch: dispatch, getState: getState, subscribe: subscribe };
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ConnectBase = (function () {
        function ConnectBase() {
        }
        Object.defineProperty(ConnectBase.prototype, "path", {
            get: /**
             * @return {?}
             */ function () {
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
                        return ((path)).split(/\./g);
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
                        _this.formSubscription = ((_this.form.valueChanges))
                            .pipe(operators.debounceTime(0))
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
                if (formElement instanceof forms.FormArray) {
                    formElement.controls.forEach(function (c, index) {
                        try {
                            for (var _a = __values(_this.descendants(((path)).concat([index]), c)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                var d = _b.value;
                                pairs.push(d);
                            }
                        }
                        catch (e_1_1) {
                            e_1 = { error: e_1_1 };
                        }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return))
                                    _c.call(_a);
                            }
                            finally {
                                if (e_1)
                                    throw e_1.error;
                            }
                        }
                        var e_1, _c;
                    });
                }
                else if (formElement instanceof forms.FormGroup) {
                    try {
                        for (var _a = __values(Object.keys(formElement.controls)), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var k = _b.value;
                            pairs.push({
                                path: path.concat([k]),
                                control: formElement.controls[k],
                            });
                        }
                    }
                    catch (e_2_1) {
                        e_2 = { error: e_2_1 };
                    }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return))
                                _c.call(_a);
                        }
                        finally {
                            if (e_2)
                                throw e_2.error;
                        }
                    }
                }
                else if (formElement instanceof forms.NgControl ||
                    formElement instanceof forms.FormControl) {
                    return [{ path: path, control: /** @type {?} */ (formElement) }];
                }
                else {
                    throw new Error("Unknown type of form element: " + formElement.constructor.name);
                }
                return pairs.filter(function (p) {
                    /** @type {?} */
                    var parent = ((p.control))._parent;
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
            connect: [{ type: core.Input }]
        };
        return ConnectBase;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ReactiveConnectDirective = (function (_super) {
        __extends(ReactiveConnectDirective, _super);
        function ReactiveConnectDirective(store$$1) {
            var _this = _super.call(this) || this;
            _this.store = store$$1;
            return _this;
        }
        ReactiveConnectDirective.decorators = [
            { type: core.Directive, args: [{ selector: 'form[connect][formGroup]' },] },
        ];
        /** @nocollapse */
        ReactiveConnectDirective.ctorParameters = function () {
            return [
                { type: FormStore }
            ];
        };
        ReactiveConnectDirective.propDecorators = {
            formGroup: [{ type: core.Input }]
        };
        return ReactiveConnectDirective;
    }(ConnectBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ConnectDirective = (function (_super) {
        __extends(ConnectDirective, _super);
        function ConnectDirective(store$$1, form) {
            var _this = _super.call(this) || this;
            _this.store = store$$1;
            _this.form = form;
            return _this;
        }
        ConnectDirective.decorators = [
            { type: core.Directive, args: [{ selector: 'form[connect]:not([formGroup])' },] },
        ];
        /** @nocollapse */
        ConnectDirective.ctorParameters = function () {
            return [
                { type: FormStore },
                { type: forms.NgForm }
            ];
        };
        return ConnectDirective;
    }(ConnectBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var declarations = [ConnectDirective, ReactiveConnectDirective];
    var NgReduxFormConnectModule = (function () {
        function NgReduxFormConnectModule() {
        }
        NgReduxFormConnectModule.decorators = [
            { type: core.NgModule, args: [{
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
    var ConnectArrayTemplate = (function () {
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
    var ConnectArrayDirective = (function (_super) {
        __extends(ConnectArrayDirective, _super);
        function ConnectArrayDirective(parent, rawValidators, rawAsyncValidators, connection, templateRef, viewContainerRef, store$$1) {
            var _this = _super.call(this) || this;
            _this.parent = parent;
            _this.rawValidators = rawValidators;
            _this.rawAsyncValidators = rawAsyncValidators;
            _this.connection = connection;
            _this.templateRef = templateRef;
            _this.viewContainerRef = viewContainerRef;
            _this.store = store$$1;
            _this.array = new forms.FormArray([]);
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
             */ function (collection) {
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
             */ function () {
                return this.key || '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConnectArrayDirective.prototype, "control", {
            get: /**
             * @return {?}
             */ function () {
                return this.array;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConnectArrayDirective.prototype, "formDirective", {
            get: /**
             * @return {?}
             */ function () {
                return /** @type {?} */ (this.parent.formDirective);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConnectArrayDirective.prototype, "path", {
            get: /**
             * @return {?}
             */ function () {
                return this.key ? controlPath(this.key, this.parent) : [];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConnectArrayDirective.prototype, "validator", {
            get: /**
             * @return {?}
             */ function () {
                return forms.Validators.compose(this.rawValidators);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConnectArrayDirective.prototype, "asyncValidator", {
            get: /**
             * @return {?}
             */ function () {
                return forms.Validators.composeAsync(this.rawAsyncValidators);
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
                            ? ((this.viewContainerRef.get(index)))
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
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return))
                            _a.call(iterable_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
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
                    .filter(function (c) { return c instanceof forms.NgModelGroup; });
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
                    var control = new forms.FormControl(null);
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
                    var array = new forms.FormArray([]);
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
                    catch (e_2_1) {
                        e_2 = { error: e_2_1 };
                    }
                    finally {
                        try {
                            if (iterable_2_1 && !iterable_2_1.done && (_a = iterable_2.return))
                                _a.call(iterable_2);
                        }
                        finally {
                            if (e_2)
                                throw e_2.error;
                        }
                    }
                    return array;
                    var e_2, _a;
                };
                /** @type {?} */
                var associate = function (value) {
                    /** @type {?} */
                    var group = new forms.FormGroup({});
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
                    catch (e_3_1) {
                        e_3 = { error: e_3_1 };
                    }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return))
                                _c.call(_a);
                        }
                        finally {
                            if (e_3)
                                throw e_3.error;
                        }
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
            { type: core.Directive, args: [{
                        selector: '[connectArray]',
                        providers: [
                            {
                                provide: forms.ControlContainer,
                                useExisting: core.forwardRef(function () { return ConnectArrayDirective; }),
                            },
                        ],
                    },] },
        ];
        /** @nocollapse */
        ConnectArrayDirective.ctorParameters = function () {
            return [
                { type: forms.ControlContainer, decorators: [{ type: core.Optional }, { type: core.Host }, { type: core.SkipSelf }] },
                { type: Array, decorators: [{ type: core.Optional }, { type: core.Self }, { type: core.Inject, args: [forms.NG_VALIDATORS,] }] },
                { type: Array, decorators: [{ type: core.Optional }, { type: core.Self }, { type: core.Inject, args: [forms.NG_ASYNC_VALIDATORS,] }] },
                { type: ConnectBase },
                { type: core.TemplateRef },
                { type: core.ViewContainerRef },
                { type: FormStore }
            ];
        };
        ConnectArrayDirective.propDecorators = {
            connectArrayOf: [{ type: core.Input }]
        };
        return ConnectArrayDirective;
    }(forms.ControlContainer));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var declarations$1 = [ConnectArrayDirective];
    var NgReduxFormConnectArrayModule = (function () {
        function NgReduxFormConnectArrayModule() {
        }
        NgReduxFormConnectArrayModule.decorators = [
            { type: core.NgModule, args: [{
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
    var NgReduxFormModule = (function () {
        function NgReduxFormModule() {
        }
        NgReduxFormModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            NgReduxFormConnectModule,
                            NgReduxFormConnectArrayModule,
                        ],
                        exports: [NgReduxFormConnectModule, NgReduxFormConnectArrayModule],
                        providers: [
                            {
                                provide: FormStore,
                                useFactory: formStoreFactory,
                                deps: [store.NgRedux],
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

    exports.composeReducers = composeReducers;
    exports.defaultFormReducer = defaultFormReducer;
    exports.FormException = FormException;
    exports.FORM_CHANGED = FORM_CHANGED;
    exports.FormStore = FormStore;
    exports.provideReduxForms = provideReduxForms;
    exports.ConnectBase = ConnectBase;
    exports.ReactiveConnectDirective = ReactiveConnectDirective;
    exports.NgReduxFormConnectModule = NgReduxFormConnectModule;
    exports.ConnectDirective = ConnectDirective;
    exports.NgReduxFormConnectArrayModule = NgReduxFormConnectArrayModule;
    exports.ConnectArrayDirective = ConnectArrayDirective;
    exports.ConnectArrayTemplate = ConnectArrayTemplate;
    exports.formStoreFactory = formStoreFactory;
    exports.NgReduxFormModule = NgReduxFormModule;
    exports.ɵa = NgReduxFormConnectModule;
    exports.ɵb = NgReduxFormConnectArrayModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1yZWR1eC1mb3JtLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9jb21wb3NlLXJlZHVjZXJzLnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9mb3JtL2Zvcm0tc3RvcmUudHMiLG51bGwsIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9mb3JtLWV4Y2VwdGlvbi50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9zdGF0ZS50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9mb3JtLXJlZHVjZXIudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vY29uZmlndXJlLnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9mb3JtL2Nvbm5lY3QvY29ubmVjdC1iYXNlLnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9mb3JtL2Nvbm5lY3QvY29ubmVjdC1yZWFjdGl2ZS50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9jb25uZWN0L2Nvbm5lY3QudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vY29ubmVjdC9jb25uZWN0Lm1vZHVsZS50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9zaGltcy50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9jb25uZWN0LWFycmF5L2Nvbm5lY3QtYXJyYXktdGVtcGxhdGUudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vY29ubmVjdC1hcnJheS9jb25uZWN0LWFycmF5LnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9mb3JtL2Nvbm5lY3QtYXJyYXkvY29ubmVjdC1hcnJheS5tb2R1bGUudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vbW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFueUFjdGlvbiwgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcblxuZXhwb3J0IGNvbnN0IGNvbXBvc2VSZWR1Y2VycyA9IDxTdGF0ZT4oXG4gIC4uLnJlZHVjZXJzOiBSZWR1Y2VyPFN0YXRlLCBBbnlBY3Rpb24+W11cbik6IFJlZHVjZXI8U3RhdGUsIEFueUFjdGlvbj4gPT4gKHM6IGFueSwgYWN0aW9uOiBBbnlBY3Rpb24pID0+XG4gIHJlZHVjZXJzLnJlZHVjZSgoc3QsIHJlZHVjZXIpID0+IHJlZHVjZXIoc3QsIGFjdGlvbiksIHMpO1xuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5cbmltcG9ydCB7IEFjdGlvbiwgVW5zdWJzY3JpYmUgfSBmcm9tICdyZWR1eCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWJzdHJhY3RTdG9yZTxSb290U3RhdGU+IHtcbiAgLy8vIERpc3BhdGNoIGFuIGFjdGlvblxuICBkaXNwYXRjaChhY3Rpb246IEFjdGlvbiAmIHsgcGF5bG9hZDogYW55IH0pOiB2b2lkO1xuXG4gIC8vLyBSZXRyaWV2ZSB0aGUgY3VycmVudCBhcHBsaWNhdGlvbiBzdGF0ZVxuICBnZXRTdGF0ZSgpOiBSb290U3RhdGU7XG5cbiAgLy8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIHRoZSBzdG9yZVxuICBzdWJzY3JpYmUoZm46IChzdGF0ZTogUm9vdFN0YXRlKSA9PiB2b2lkKTogVW5zdWJzY3JpYmU7XG59XG5cbmV4cG9ydCBjb25zdCBGT1JNX0NIQU5HRUQgPSAnQEBhbmd1bGFyLXJlZHV4L2Zvcm0vRk9STV9DSEFOR0VEJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1TdG9yZSB7XG4gIC8vLyBOT1RFKGNib25kKTogVGhlIGRlY2xhcmF0aW9uIG9mIHN0b3JlIGlzIG1pc2xlYWRpbmcuIFRoaXMgY2xhc3MgaXNcbiAgLy8vIGFjdHVhbGx5IGNhcGFibGUgb2YgdGFraW5nIGEgcGxhaW4gUmVkdXggc3RvcmUgb3IgYW4gTmdSZWR1eCBpbnN0YW5jZS5cbiAgLy8vIEJ1dCBpbiBvcmRlciB0byBtYWtlIHRoZSBuZyBkZXBlbmRlbmN5IGluamVjdG9yIHdvcmsgcHJvcGVybHksIHdlXG4gIC8vLyBkZWNsYXJlIGl0IGFzIGFuIE5nUmVkdXggdHlwZSwgc2luY2UgdGhlIEBhbmd1bGFyLXJlZHV4L3N0b3JlIHVzZSBjYXNlIGludm9sdmVzXG4gIC8vLyBjYWxsaW5nIHRoZSBjb25zdHJ1Y3RvciBvZiB0aGlzIGNsYXNzIG1hbnVhbGx5IChmcm9tIGNvbmZpZ3VyZS50cyksXG4gIC8vLyB3aGVyZSBhIHBsYWluIHN0b3JlIGNhbiBiZSBjYXN0IHRvIGFuIE5nUmVkdXguIChGb3Igb3VyIHB1cnBvc2VzLCB0aGV5XG4gIC8vLyBoYXZlIGFsbW9zdCBpZGVudGljYWwgc2hhcGVzLilcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogTmdSZWR1eDxhbnk+KSB7fVxuXG4gIGdldFN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFN0YXRlKCk7XG4gIH1cblxuICBzdWJzY3JpYmUoZm46IChzdGF0ZTogYW55KSA9PiB2b2lkKTogVW5zdWJzY3JpYmUge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnN1YnNjcmliZSgoKSA9PiBmbih0aGlzLmdldFN0YXRlKCkpKTtcbiAgfVxuXG4gIHZhbHVlQ2hhbmdlZDxUPihwYXRoOiBzdHJpbmdbXSwgZm9ybTogTmdGb3JtLCB2YWx1ZTogVCkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogRk9STV9DSEFOR0VELFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBwYXRoLFxuICAgICAgICBmb3JtLFxuICAgICAgICB2YWxpZDogZm9ybS52YWxpZCA9PT0gdHJ1ZSxcbiAgICAgICAgdmFsdWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBGb3JtRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3Rvcihtc2c6IHN0cmluZykge1xuICAgIHN1cGVyKG1zZyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEl0ZXJhYmxlLCBNYXAgYXMgSW1tdXRhYmxlTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuaW1wb3J0IHsgRm9ybUV4Y2VwdGlvbiB9IGZyb20gJy4vZm9ybS1leGNlcHRpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIE9wZXJhdGlvbnM8VD4ge1xuICAvLy8gU2hhbGxvdyBjbG9uZSB0aGUgb2JqZWN0XG4gIGNsb25lKCk6IFQ7XG5cbiAgLy8vIENsb25lIGFuZCBtZXJnZVxuICBtZXJnZShrZXk6IG51bWJlciB8IHN0cmluZyB8IG51bGwsIHZhbHVlOiBUKTogYW55O1xuXG4gIC8vLyBDbG9uZSB0aGUgb2JqZWN0IGFuZCB1cGRhdGUgYSBzcGVjaWZpYyBrZXkgaW5zaWRlIG9mIGl0XG4gIHVwZGF0ZShrZXk6IG51bWJlciB8IHN0cmluZyB8IG51bGwsIHZhbHVlOiBUKTogYW55O1xufVxuXG5leHBvcnQgdHlwZSBUcmF2ZXJzZUNhbGxiYWNrID0gKFxuICBwYXJlbnQ6IGFueSxcbiAga2V5OiBudW1iZXIgfCBzdHJpbmcsXG4gIHJlbWFpbmluZ1BhdGg6IHN0cmluZ1tdLFxuICB2YWx1ZT86IGFueSxcbikgPT4gYW55O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RhdGUge1xuICBzdGF0aWMgdHJhdmVyc2U8U3RhdGVUeXBlPihcbiAgICBzdGF0ZTogU3RhdGVUeXBlLFxuICAgIHBhdGg6IHN0cmluZ1tdLFxuICAgIGZuPzogVHJhdmVyc2VDYWxsYmFjayxcbiAgKSB7XG4gICAgbGV0IGRlZXBWYWx1ZSA9IHN0YXRlO1xuXG4gICAgZm9yIChjb25zdCBrIG9mIHBhdGgpIHtcbiAgICAgIGNvbnN0IHBhcmVudCA9IGRlZXBWYWx1ZTtcblxuICAgICAgaWYgKEl0ZXJhYmxlLmlzSXRlcmFibGUoZGVlcFZhbHVlKSkge1xuICAgICAgICBjb25zdCBtID0gKGRlZXBWYWx1ZSBhcyBhbnkpIGFzIEltbXV0YWJsZU1hcDxzdHJpbmcsIGFueT47XG4gICAgICAgIGlmICh0eXBlb2YgbS5nZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBkZWVwVmFsdWUgPSBtLmdldChrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRm9ybUV4Y2VwdGlvbihcbiAgICAgICAgICAgIGBDYW5ub3QgcmV0cmlldmUgdmFsdWUgZnJvbSBpbW11dGFibGUgbm9uYXNzb2NpYXRpdmUgY29udGFpbmVyOiAke2t9YCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRlZXBWYWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICBkZWVwVmFsdWUgPSAoKGRlZXBWYWx1ZSBhcyBhbnkpIGFzIE1hcDxzdHJpbmcsIGFueT4pLmdldChrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlZXBWYWx1ZSA9IChkZWVwVmFsdWUgYXMgYW55KVtrXTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZCA9IGZuKFxuICAgICAgICAgIHBhcmVudCxcbiAgICAgICAgICBrLFxuICAgICAgICAgIHBhdGguc2xpY2UocGF0aC5pbmRleE9mKGspICsgMSksXG4gICAgICAgICAgZGVlcFZhbHVlLFxuICAgICAgICApO1xuXG4gICAgICAgIGRlZXBWYWx1ZSA9IHRyYW5zZm9ybWVkW2tdO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24ocGFyZW50LCB0cmFuc2Zvcm1lZCk7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHdlIHdlcmUgbm90IGFibGUgdG8gZmluZCB0aGlzIHN0YXRlIGluc2lkZSBvZiBvdXIgcm9vdCBzdGF0ZVxuICAgICAgLy8gc3RydWN0dXJlLCB0aGVuIHdlIHJldHVybiB1bmRlZmluZWQgLS0gbm90IG51bGwgLS0gdG8gaW5kaWNhdGUgdGhhdFxuICAgICAgLy8gc3RhdGUuIEJ1dCB0aGlzIGNvdWxkIGJlIGEgcGVyZmVjdGx5IG5vcm1hbCB1c2UtY2FzZSBzbyB3ZSBkb24ndFxuICAgICAgLy8gd2FudCB0byB0aHJvdyBhbiBleGNlcHRpb24gb3IgYW55dGhpbmcgYWxvbmcgdGhvc2UgbGluZXMuXG4gICAgICBpZiAoZGVlcFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVlcFZhbHVlO1xuICB9XG5cbiAgc3RhdGljIGdldDxTdGF0ZVR5cGU+KHN0YXRlOiBTdGF0ZVR5cGUsIHBhdGg6IHN0cmluZ1tdKTogYW55IHtcbiAgICByZXR1cm4gU3RhdGUudHJhdmVyc2Uoc3RhdGUsIHBhdGgpO1xuICB9XG5cbiAgc3RhdGljIGFzc2lnbjxTdGF0ZVR5cGU+KHN0YXRlOiBTdGF0ZVR5cGUsIHBhdGg6IHN0cmluZ1tdLCB2YWx1ZT86IGFueSkge1xuICAgIGNvbnN0IG9wZXJhdGlvbnMgPSBTdGF0ZS5pbnNwZWN0KHN0YXRlKTtcblxuICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG9wZXJhdGlvbnMudXBkYXRlKG51bGwsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBjb25zdCByb290ID0gb3BlcmF0aW9ucy5jbG9uZSgpO1xuXG4gICAgLy8gV2Ugd2FudCB0byBzaGFsbG93IGNsb25lIHRoZSBvYmplY3QsIGFuZCB0aGVuIHRyYWNlIGEgcGF0aCB0byB0aGUgcGxhY2VcbiAgICAvLyB3ZSB3YW50IHRvIHVwZGF0ZSwgY2xvbmluZyBlYWNoIG9iamVjdCB3ZSB0cmF2ZXJzZWQgb24gb3VyIHdheSBhbmQgdGhlblxuICAgIC8vIGZpbmFsbHkgdXBkYXRpbmcgdGhlIHZhbHVlIG9uIHRoZSBsYXN0IHBhcmVudCB0byBiZSBAdmFsdWUuIFRoaXMgc2VlbXNcbiAgICAvLyB0byBvZmZlciB0aGUgYmVzdCBwZXJmb3JtYW5jZTogd2UgY2FuIHNoYWxsb3cgY2xvbmUgZXZlcnl0aGluZyB0aGF0IGhhc1xuICAgIC8vIG5vdCBiZWVuIG1vZGlmaWVkLCBhbmQge2RlZXAgY2xvbmUgKyB1cGRhdGV9IHRoZSBwYXRoIGRvd24gdG8gdGhlIHZhbHVlXG4gICAgLy8gdGhhdCB3ZSB3aXNoIHRvIHVwZGF0ZS5cbiAgICBTdGF0ZS50cmF2ZXJzZShcbiAgICAgIHJvb3QsXG4gICAgICBwYXRoLFxuICAgICAgKHBhcmVudCwga2V5OiBudW1iZXIgfCBzdHJpbmcsIHJlbWFpbmluZ1BhdGg6IHN0cmluZ1tdLCBpbm5lclZhbHVlPykgPT4ge1xuICAgICAgICBjb25zdCBwYXJlbnRPcGVyYXRpb25zID0gU3RhdGUuaW5zcGVjdChwYXJlbnQpO1xuXG4gICAgICAgIGlmIChpbm5lclZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgaW5uZXJPcGVyYXRpb25zID0gU3RhdGUuaW5zcGVjdChpbm5lclZhbHVlKTtcblxuICAgICAgICAgIHJldHVybiBwYXJlbnRPcGVyYXRpb25zLnVwZGF0ZShcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIHJlbWFpbmluZ1BhdGgubGVuZ3RoID4gMFxuICAgICAgICAgICAgICA/IGlubmVyT3BlcmF0aW9ucy5jbG9uZSgpXG4gICAgICAgICAgICAgIDogaW5uZXJPcGVyYXRpb25zLm1lcmdlKG51bGwsIHZhbHVlKSxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGdldFByb2JhYmxlVHlwZSA9IChzdGF0ZUtleTogc3RyaW5nIHwgbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAvLyBOT1RFKGNib25kKTogSWYgeW91ciBjb2RlIGdldHMgaGVyZSwgeW91IG1pZ2h0IG5vdCBiZSB1c2luZyB0aGUgbGlicmFyeVxuICAgICAgICAgICAgLy8vIGNvcnJlY3RseS4gSWYgeW91IGFyZSBhc3NpZ25pbmcgaW50byBhIHBhdGggaW4geW91ciBzdGF0ZSwgdHJ5IHRvXG4gICAgICAgICAgICAvLy8gZW5zdXJlIHRoYXQgdGhlcmUgaXMgYSBwYXRoIHRvIHRyYXZlcnNlLCBldmVuIGlmIGV2ZXJ5dGhpbmcgaXMganVzdFxuICAgICAgICAgICAgLy8vIGVtcHR5IG9iamVjdHMgYW5kIGFycmF5cy4gSWYgd2UgaGF2ZSB0byBndWVzcyB0aGUgdHlwZSBvZiB0aGUgY29udGFpbmVyc1xuICAgICAgICAgICAgLy8vIGFuZCB0aGVuIGNyZWF0ZSB0aGVtIG91cnNlbHZlcywgd2UgbWF5IG5vdCBnZXQgdGhlIHR5cGVzIHJpZ2h0LiBVc2VcbiAgICAgICAgICAgIC8vLyB0aGUgUmVkdXggYGluaXRpYWwgc3RhdGUnIGNvbnN0cnVjdCB0byByZXNvbHZlIHRoaXMgaXNzdWUgaWYgeW91IGxpa2UuXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHN0YXRlS2V5ID09PSAnbnVtYmVyJ1xuICAgICAgICAgICAgICA/IG5ldyBBcnJheSgpXG4gICAgICAgICAgICAgIDogQXJyYXkuaXNBcnJheShzdGF0ZUtleSlcbiAgICAgICAgICAgICAgICA/IEltbXV0YWJsZU1hcCgpXG4gICAgICAgICAgICAgICAgOiBuZXcgT2JqZWN0KCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHJldHVybiBwYXJlbnRPcGVyYXRpb25zLnVwZGF0ZShcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIHJlbWFpbmluZ1BhdGgubGVuZ3RoID4gMFxuICAgICAgICAgICAgICA/IGdldFByb2JhYmxlVHlwZShyZW1haW5pbmdQYXRoWzBdKVxuICAgICAgICAgICAgICA6IHZhbHVlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcblxuICAgIHJldHVybiByb290O1xuICB9XG5cbiAgc3RhdGljIGluc3BlY3Q8Sz4ob2JqZWN0OiBLKTogT3BlcmF0aW9uczxLPiB7XG4gICAgY29uc3QgbWV0YU9wZXJhdGlvbnMgPSAoXG4gICAgICAvLyBUT0RPOiBXcml0ZSBwcm9wZXIgdHlwZSBkZWNsYXJhdGlvbnMgZm9yIGZvbGxvd2luZyBGdW5jdGlvbiB0eXBlc1xuICAgICAgdXBkYXRlOiBGdW5jdGlvbixcbiAgICAgIG1lcmdlOiBGdW5jdGlvbixcbiAgICAgIGNsb25lPzogRnVuY3Rpb24sXG4gICAgKSA9PiB7XG4gICAgICBjb25zdCBvcGVyYXRpb25zID0ge1xuICAgICAgICAvLy8gQ2xvbmUgdGhlIG9iamVjdCAoc2hhbGxvdylcbiAgICAgICAgY2xvbmU6XG4gICAgICAgICAgdHlwZW9mIGNsb25lID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/ICgpID0+IGNsb25lKG9iamVjdCBhcyBhbnkpIGFzIGFueVxuICAgICAgICAgICAgOiAoKSA9PiBvYmplY3QsXG5cbiAgICAgICAgLy8vIFVwZGF0ZSBhIHNwZWNpZmljIGtleSBpbnNpZGUgb2YgdGhlIGNvbnRhaW5lciBvYmplY3RcbiAgICAgICAgdXBkYXRlOiAoa2V5OiBzdHJpbmcsIHZhbHVlOiBLKSA9PlxuICAgICAgICAgIHVwZGF0ZShvcGVyYXRpb25zLmNsb25lKCksIGtleSwgdmFsdWUpLFxuXG4gICAgICAgIC8vLyBNZXJnZSBleGlzdGluZyB2YWx1ZXMgd2l0aCBuZXcgdmFsdWVzXG4gICAgICAgIG1lcmdlOiAoa2V5OiBzdHJpbmcsIHZhbHVlOiBLKSA9PiB7XG4gICAgICAgICAgY29uc3QgY2xvbmVkID0gb3BlcmF0aW9ucy5jbG9uZSgpO1xuICAgICAgICAgIHJldHVybiBtZXJnZShjbG9uZWQsIGtleSwgdmFsdWUsICh2OiBhbnkpID0+IHVwZGF0ZShjbG9uZWQsIGtleSwgdikpO1xuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIG9wZXJhdGlvbnM7XG4gICAgfTtcblxuICAgIGlmIChJdGVyYWJsZS5pc0l0ZXJhYmxlKG9iamVjdCkpIHtcbiAgICAgIHJldHVybiBtZXRhT3BlcmF0aW9ucyhcbiAgICAgICAgLy8gUmVwbGFjZVxuICAgICAgICAocGFyZW50OiBhbnksIGtleTogbnVtYmVyIHwgc3RyaW5nLCB2YWx1ZTogSykgPT4ge1xuICAgICAgICAgIGlmIChrZXkgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8vIE1lcmdlXG4gICAgICAgIChwYXJlbnQ6IGFueSwga2V5OiBudW1iZXIgfCBzdHJpbmcgfCBzdHJpbmdbXSwgdmFsdWU6IEspID0+IHtcbiAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50Lm1lcmdlRGVlcEluKEFycmF5LmlzQXJyYXkoa2V5KSA/IGtleSA6IFtrZXldLCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChJbW11dGFibGVNYXAuaXNNYXAodmFsdWUpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJlbnQubWVyZ2VEZWVwKHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJlbnQuY29uY2F0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKSB7XG4gICAgICByZXR1cm4gbWV0YU9wZXJhdGlvbnMoXG4gICAgICAgIC8vIFJlcGxhY2UgYXJyYXkgY29udGVudHNcbiAgICAgICAgKHBhcmVudDogYW55LCBrZXk6IG51bWJlciwgdmFsdWU6IEspID0+IHtcbiAgICAgICAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHBhcmVudFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudC5zcGxpY2UuYXBwbHkoXG4gICAgICAgICAgICAgIHBhcmVudCxcbiAgICAgICAgICAgICAgWzAsIHBhcmVudC5sZW5ndGhdLmNvbmNhdChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBNZXJnZVxuICAgICAgICAocGFyZW50OiBhbnksIF86IGFueSwgdmFsdWU6IEssIHNldHRlcjogKHY6IEspID0+IEspID0+IHtcbiAgICAgICAgICBzZXR0ZXIocGFyZW50LmNvbmNhdCh2YWx1ZSkpO1xuICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQ2xvbmVcbiAgICAgICAgKCkgPT4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwob2JqZWN0LCAwKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChvYmplY3QgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgIHJldHVybiBtZXRhT3BlcmF0aW9ucyhcbiAgICAgICAgLy8gVXBkYXRlIG1hcCBrZXlcbiAgICAgICAgKHBhcmVudDogYW55LCBrZXk6IG51bWJlciB8IHN0cmluZywgdmFsdWU6IEspID0+IHtcbiAgICAgICAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBtID0gbmV3IE1hcCh2YWx1ZSBhcyBhbnkpO1xuICAgICAgICAgICAgcGFyZW50LmNsZWFyKCk7XG4gICAgICAgICAgICBtLmZvckVhY2goKG1hcFZhbHVlLCBpbmRleCkgPT4gcGFyZW50LnNldChpbmRleCwgbWFwVmFsdWUpKTtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIE1lcmdlXG4gICAgICAgIChwYXJlbnQ6IE1hcDxzdHJpbmcsIGFueT4sIF86IGFueSwgdmFsdWU6IEspID0+IHtcbiAgICAgICAgICBjb25zdCBtID0gbmV3IE1hcDxzdHJpbmcsIGFueT4odmFsdWUgYXMgYW55KTtcbiAgICAgICAgICBtLmZvckVhY2goKG1hcFZhbHVlLCBrZXkpID0+IHBhcmVudC5zZXQoa2V5LCBtYXBWYWx1ZSkpO1xuICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQ2xvbmVcbiAgICAgICAgKCkgPT5cbiAgICAgICAgICBvYmplY3QgaW5zdGFuY2VvZiBXZWFrTWFwXG4gICAgICAgICAgICA/IG5ldyBXZWFrTWFwPG9iamVjdCwgYW55PihvYmplY3QgYXMgYW55KVxuICAgICAgICAgICAgOiBuZXcgTWFwPHN0cmluZywgYW55PihvYmplY3QgYXMgYW55KSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChvYmplY3QgaW5zdGFuY2VvZiBXZWFrU2V0IHx8IG9iamVjdCBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgcmV0dXJuIG1ldGFPcGVyYXRpb25zKFxuICAgICAgICAvLyBVcGRhdGUgZWxlbWVudCBhdCBpbmRleCBpbiBzZXRcbiAgICAgICAgKHBhcmVudDogYW55LCBrZXk6IG51bWJlciwgdmFsdWU6IEspID0+IHtcbiAgICAgICAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzID0gbmV3IFNldCh2YWx1ZSBhcyBhbnkpO1xuICAgICAgICAgICAgcy5mb3JFYWNoKChzZXRWYWx1ZSwgaW5kZXgpID0+IHBhcmVudC5zZXQoaW5kZXgsIHNldFZhbHVlKSk7XG4gICAgICAgICAgICBzLmNsZWFyKCk7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBNZXJnZVxuICAgICAgICAocGFyZW50OiBTZXQ8YW55PiwgXzogYW55LCB2YWx1ZTogYW55KSA9PiB7XG4gICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBwYXJlbnQuYWRkKGVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIENsb25lXG4gICAgICAgICgpID0+XG4gICAgICAgICAgb2JqZWN0IGluc3RhbmNlb2YgV2Vha1NldFxuICAgICAgICAgICAgPyBuZXcgV2Vha1NldDxhbnk+KG9iamVjdCBhcyBhbnkpXG4gICAgICAgICAgICA6IG5ldyBTZXQ8YW55PihvYmplY3QgYXMgYW55KSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChvYmplY3QgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICB0aHJvdyBuZXcgRm9ybUV4Y2VwdGlvbihcbiAgICAgICAgJ0Nhbm5vdCB1bmRlcnN0YW5kIHdoeSBhIERhdGUgb2JqZWN0IGFwcGVhcnMgaW4gdGhlIG11dGF0aW9uIHBhdGghJyxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAodHlwZW9mIG9iamVjdCkge1xuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBjYXNlICdzeW1ib2wnOlxuICAgICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtZXRhT3BlcmF0aW9ucyhcbiAgICAgICAgICAgIChwYXJlbnQ6IGFueSwga2V5OiBhbnksIHZhbHVlOiBLKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChrZXkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IC4uLnBhcmVudCwgW2tleV06IHZhbHVlIH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHsgLi4ucGFyZW50LCAuLi4odmFsdWUgYXMgYW55KSB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChwYXJlbnQ6IGFueSwgXzogYW55LCB2YWx1ZTogSykgPT4ge1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IGsgb2YgT2JqZWN0LmtleXModmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50W2tdID0gKHZhbHVlIGFzIGFueSlba107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiAoeyAuLi4ob2JqZWN0IGFzIGFueSkgfSksXG4gICAgICAgICAgKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgQW4gb2JqZWN0IG9mIHR5cGUgJHt0eXBlb2Ygb2JqZWN0fSBoYXMgYXBwZWFyZWQgaW4gdGhlIG11dGF0aW9uIHBhdGghIEV2ZXJ5IGVsZW1lbnQgYCArXG4gICAgICAgICdpbiB0aGUgbXV0YXRpb24gcGF0aCBzaG91bGQgYmUgYW4gYXJyYXksIGFuIGFzc29jaWF0aXZlIGNvbnRhaW5lciwgb3IgYSBzZXQnLFxuICAgICk7XG4gIH1cblxuICBzdGF0aWMgZW1wdHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB2YWx1ZSA9PSBudWxsIHx8XG4gICAgICAodmFsdWUubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICh0eXBlb2YgdmFsdWUubGVuZ3RoID09PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPT09IDApKVxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEl0ZXJhYmxlIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuXG5pbXBvcnQgeyBGT1JNX0NIQU5HRUQgfSBmcm9tICcuL2Zvcm0tc3RvcmUnO1xuXG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4vc3RhdGUnO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdEZvcm1SZWR1Y2VyID0gPFJvb3RTdGF0ZT4oXG4gIGluaXRpYWxTdGF0ZT86IFJvb3RTdGF0ZSB8IEl0ZXJhYmxlLktleWVkPHN0cmluZywgYW55PixcbikgPT4ge1xuICBjb25zdCByZWR1Y2VyID0gKFxuICAgIHN0YXRlOiBSb290U3RhdGUgfCBJdGVyYWJsZS5LZXllZDxzdHJpbmcsIGFueT4gfCB1bmRlZmluZWQgPSBpbml0aWFsU3RhdGUsXG4gICAgYWN0aW9uOiBBY3Rpb24gJiB7IHBheWxvYWQ/OiBhbnkgfSxcbiAgKSA9PiB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSBGT1JNX0NIQU5HRUQ6XG4gICAgICAgIHJldHVybiBTdGF0ZS5hc3NpZ24oc3RhdGUsIGFjdGlvbi5wYXlsb2FkLnBhdGgsIGFjdGlvbi5wYXlsb2FkLnZhbHVlKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHJlZHVjZXI7XG59O1xuIiwiaW1wb3J0IHsgQWN0aW9uLCBTdG9yZSB9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IHsgQWJzdHJhY3RTdG9yZSwgRm9ybVN0b3JlIH0gZnJvbSAnLi9mb3JtLXN0b3JlJztcblxuLy8vIFVzZSB0aGlzIGZ1bmN0aW9uIGluIHlvdXIgcHJvdmlkZXJzIGxpc3QgaWYgeW91IGFyZSBub3QgdXNpbmcgQGFuZ3VsYXItcmVkdXgvY29yZS5cbi8vLyBUaGlzIHdpbGwgYWxsb3cgeW91IHRvIHByb3ZpZGUgYSBwcmVleGlzdGluZyBzdG9yZSB0aGF0IHlvdSBoYXZlIGFscmVhZHlcbi8vLyBjb25maWd1cmVkLCByYXRoZXIgdGhhbiBsZXR0aW5nIEBhbmd1bGFyLXJlZHV4L2NvcmUgY3JlYXRlIG9uZSBmb3IgeW91LlxuZXhwb3J0IGNvbnN0IHByb3ZpZGVSZWR1eEZvcm1zID0gPFQ+KHN0b3JlOiBTdG9yZTxUPiB8IGFueSkgPT4ge1xuICBjb25zdCBhYnN0cmFjdFN0b3JlID0gd3JhcChzdG9yZSk7XG5cbiAgcmV0dXJuIFtcbiAgICB7IHByb3ZpZGU6IEZvcm1TdG9yZSwgdXNlVmFsdWU6IG5ldyBGb3JtU3RvcmUoYWJzdHJhY3RTdG9yZSBhcyBhbnkpIH0sXG4gIF07XG59O1xuXG5jb25zdCB3cmFwID0gPFQ+KHN0b3JlOiBTdG9yZTxUPiB8IGFueSk6IEFic3RyYWN0U3RvcmU8VD4gPT4ge1xuICBjb25zdCBkaXNwYXRjaCA9IChhY3Rpb246IEFjdGlvbikgPT4gc3RvcmUuZGlzcGF0Y2goYWN0aW9uKTtcblxuICBjb25zdCBnZXRTdGF0ZSA9ICgpID0+IHN0b3JlLmdldFN0YXRlKCkgYXMgVDtcblxuICBjb25zdCBzdWJzY3JpYmUgPSAoZm46IChzdGF0ZTogVCkgPT4gdm9pZCkgPT5cbiAgICBzdG9yZS5zdWJzY3JpYmUoKCkgPT4gZm4oc3RvcmUuZ2V0U3RhdGUoKSkpO1xuXG4gIHJldHVybiB7IGRpc3BhdGNoLCBnZXRTdGF0ZSwgc3Vic2NyaWJlIH07XG59O1xuIiwiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBBYnN0cmFjdENvbnRyb2wsXG4gIEZvcm1BcnJheSxcbiAgRm9ybUNvbnRyb2wsXG4gIEZvcm1Hcm91cCxcbiAgTmdDb250cm9sLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBVbnN1YnNjcmliZSB9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBGb3JtU3RvcmUgfSBmcm9tICcuLi9mb3JtLXN0b3JlJztcbmltcG9ydCB7IFN0YXRlIH0gZnJvbSAnLi4vc3RhdGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbnRyb2xQYWlyIHtcbiAgcGF0aDogc3RyaW5nW107XG4gIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcbn1cblxuZXhwb3J0IGNsYXNzIENvbm5lY3RCYXNlIGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0IHtcbiAgZ2V0IHBhdGgoKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHBhdGggPVxuICAgICAgdHlwZW9mIHRoaXMuY29ubmVjdCA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuY29ubmVjdCgpIDogdGhpcy5jb25uZWN0O1xuXG4gICAgc3dpdGNoICh0eXBlb2YgcGF0aCkge1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKFN0YXRlLmVtcHR5KHBhdGgpKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhdGgpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhdGggYXMgc3RyaW5nW107XG4gICAgICAgIH1cbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHJldHVybiAocGF0aCBhcyBzdHJpbmcpLnNwbGl0KC9cXC4vZyk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBmYWxsdGhyb3VnaCBhYm92ZSAobm8gYnJlYWspXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgQ2Fubm90IGRldGVybWluZSBwYXRoIHRvIG9iamVjdDogJHtKU09OLnN0cmluZ2lmeShwYXRoKX1gLFxuICAgICAgICApO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKSBjb25uZWN0PzogKCkgPT4gKHN0cmluZyB8IG51bWJlcikgfCAoc3RyaW5nIHwgbnVtYmVyKVtdO1xuICBwcm90ZWN0ZWQgc3RvcmU/OiBGb3JtU3RvcmU7XG4gIHByb3RlY3RlZCBmb3JtOiBhbnk7XG4gIHByaXZhdGUgc3RhdGVTdWJzY3JpcHRpb24/OiBVbnN1YnNjcmliZTtcblxuICBwcml2YXRlIGZvcm1TdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb247XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuZm9ybVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5mb3JtU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnN0YXRlU3Vic2NyaXB0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLnN0YXRlU3Vic2NyaXB0aW9uKCk7IC8vIHVuc3Vic2NyaWJlXG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5yZXNldFN0YXRlKCk7XG5cbiAgICAgIGlmICh0aGlzLnN0b3JlKSB7XG4gICAgICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24gPSB0aGlzLnN0b3JlLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlc2V0U3RhdGUoKSk7XG4gICAgICB9XG5cbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmZvcm1TdWJzY3JpcHRpb24gPSAodGhpcy5mb3JtLnZhbHVlQ2hhbmdlcyBhcyBhbnkpXG4gICAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDApKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHZhbHVlczogYW55KSA9PiB0aGlzLnB1Ymxpc2godmFsdWVzKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzY2VuZGFudHMocGF0aDogc3RyaW5nW10sIGZvcm1FbGVtZW50OiBhbnkpOiBDb250cm9sUGFpcltdIHtcbiAgICBjb25zdCBwYWlycyA9IG5ldyBBcnJheTxDb250cm9sUGFpcj4oKTtcblxuICAgIGlmIChmb3JtRWxlbWVudCBpbnN0YW5jZW9mIEZvcm1BcnJheSkge1xuICAgICAgZm9ybUVsZW1lbnQuY29udHJvbHMuZm9yRWFjaCgoYywgaW5kZXgpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBkIG9mIHRoaXMuZGVzY2VuZGFudHMoKHBhdGggYXMgYW55KS5jb25jYXQoW2luZGV4XSksIGMpKSB7XG4gICAgICAgICAgcGFpcnMucHVzaChkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChmb3JtRWxlbWVudCBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xuICAgICAgZm9yIChjb25zdCBrIG9mIE9iamVjdC5rZXlzKGZvcm1FbGVtZW50LmNvbnRyb2xzKSkge1xuICAgICAgICBwYWlycy5wdXNoKHtcbiAgICAgICAgICBwYXRoOiBwYXRoLmNvbmNhdChba10pLFxuICAgICAgICAgIGNvbnRyb2w6IGZvcm1FbGVtZW50LmNvbnRyb2xzW2tdLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgZm9ybUVsZW1lbnQgaW5zdGFuY2VvZiBOZ0NvbnRyb2wgfHxcbiAgICAgIGZvcm1FbGVtZW50IGluc3RhbmNlb2YgRm9ybUNvbnRyb2xcbiAgICApIHtcbiAgICAgIHJldHVybiBbeyBwYXRoLCBjb250cm9sOiBmb3JtRWxlbWVudCBhcyBhbnkgfV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFVua25vd24gdHlwZSBvZiBmb3JtIGVsZW1lbnQ6ICR7Zm9ybUVsZW1lbnQuY29uc3RydWN0b3IubmFtZX1gLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFpcnMuZmlsdGVyKHAgPT4ge1xuICAgICAgY29uc3QgcGFyZW50ID0gKHAuY29udHJvbCBhcyBhbnkpLl9wYXJlbnQ7XG4gICAgICByZXR1cm4gcGFyZW50ID09PSB0aGlzLmZvcm0uY29udHJvbCB8fCBwYXJlbnQgPT09IHRoaXMuZm9ybTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRTdGF0ZSgpIHtcbiAgICBjb25zdCBmb3JtRWxlbWVudCA9XG4gICAgICB0aGlzLmZvcm0uY29udHJvbCA9PT0gdW5kZWZpbmVkID8gdGhpcy5mb3JtIDogdGhpcy5mb3JtLmNvbnRyb2w7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuZGVzY2VuZGFudHMoW10sIGZvcm1FbGVtZW50KTtcblxuICAgIGNoaWxkcmVuLmZvckVhY2goYyA9PiB7XG4gICAgICBjb25zdCB7IHBhdGgsIGNvbnRyb2wgfSA9IGM7XG5cbiAgICAgIGNvbnN0IHZhbHVlID0gU3RhdGUuZ2V0KHRoaXMuZ2V0U3RhdGUoKSwgdGhpcy5wYXRoLmNvbmNhdChwYXRoKSk7XG5cbiAgICAgIGlmIChjb250cm9sLnZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICBjb250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcHVibGlzaCh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuc3RvcmUpIHtcbiAgICAgIHRoaXMuc3RvcmUudmFsdWVDaGFuZ2VkKHRoaXMucGF0aCwgdGhpcy5mb3JtLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRTdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5zdG9yZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRm9ybVN0b3JlIH0gZnJvbSAnLi4vZm9ybS1zdG9yZSc7XG5cbmltcG9ydCB7IENvbm5lY3RCYXNlIH0gZnJvbSAnLi9jb25uZWN0LWJhc2UnO1xuXG4vLyBGb3IgcmVhY3RpdmUgZm9ybXMgKHdpdGhvdXQgaW1wbGljaXQgTmdGb3JtKVxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnZm9ybVtjb25uZWN0XVtmb3JtR3JvdXBdJyB9KVxuZXhwb3J0IGNsYXNzIFJlYWN0aXZlQ29ubmVjdERpcmVjdGl2ZSBleHRlbmRzIENvbm5lY3RCYXNlIHtcbiAgQElucHV0KCkgZm9ybUdyb3VwOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHN0b3JlOiBGb3JtU3RvcmUpIHtcbiAgICBzdXBlcigpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBGb3JtU3RvcmUgfSBmcm9tICcuLi9mb3JtLXN0b3JlJztcbmltcG9ydCB7IENvbm5lY3RCYXNlIH0gZnJvbSAnLi9jb25uZWN0LWJhc2UnO1xuXG4vLyBGb3IgdGVtcGxhdGUgZm9ybXMgKHdpdGggaW1wbGljaXQgTmdGb3JtKVxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnZm9ybVtjb25uZWN0XTpub3QoW2Zvcm1Hcm91cF0pJyB9KVxuZXhwb3J0IGNsYXNzIENvbm5lY3REaXJlY3RpdmUgZXh0ZW5kcyBDb25uZWN0QmFzZSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzdG9yZTogRm9ybVN0b3JlLCBwcm90ZWN0ZWQgZm9ybTogTmdGb3JtKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29ubmVjdERpcmVjdGl2ZSB9IGZyb20gJy4vY29ubmVjdCc7XG5pbXBvcnQgeyBSZWFjdGl2ZUNvbm5lY3REaXJlY3RpdmUgfSBmcm9tICcuL2Nvbm5lY3QtcmVhY3RpdmUnO1xuXG5jb25zdCBkZWNsYXJhdGlvbnMgPSBbQ29ubmVjdERpcmVjdGl2ZSwgUmVhY3RpdmVDb25uZWN0RGlyZWN0aXZlXTtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbLi4uZGVjbGFyYXRpb25zXSxcbiAgZXhwb3J0czogWy4uLmRlY2xhcmF0aW9uc10sXG59KVxuZXhwb3J0IGNsYXNzIE5nUmVkdXhGb3JtQ29ubmVjdE1vZHVsZSB7fVxuIiwiaW1wb3J0IHtcbiAgQ2hlY2tib3hDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgQ29udHJvbENvbnRhaW5lcixcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIFJhZGlvQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIFNlbGVjdENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBTZWxlY3RNdWx0aXBsZUNvbnRyb2xWYWx1ZUFjY2Vzc29yLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb250cm9sUGF0aChuYW1lOiBzdHJpbmcsIHBhcmVudDogQ29udHJvbENvbnRhaW5lcik6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIFsuLi4ocGFyZW50LnBhdGggfHwgW10pLCBuYW1lXTtcbn1cblxuY29uc3QgQlVJTFRJTl9BQ0NFU1NPUlMgPSBbXG4gIENoZWNrYm94Q29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIFNlbGVjdENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBTZWxlY3RNdWx0aXBsZUNvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQnVpbHRJbkFjY2Vzc29yKFxuICB2YWx1ZUFjY2Vzc29yOiBDb250cm9sVmFsdWVBY2Nlc3Nvcixcbik6IGJvb2xlYW4ge1xuICByZXR1cm4gQlVJTFRJTl9BQ0NFU1NPUlMuc29tZShhID0+IHZhbHVlQWNjZXNzb3IuY29uc3RydWN0b3IgPT09IGEpO1xufVxuIiwiZXhwb3J0IGNsYXNzIENvbm5lY3RBcnJheVRlbXBsYXRlIHtcbiAgY29uc3RydWN0b3IocHVibGljICRpbXBsaWNpdDogYW55LCBwdWJsaWMgaW5kZXg6IG51bWJlciwgcHVibGljIGl0ZW06IGFueSkge31cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0LFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFNlbGYsXG4gIFNraXBTZWxmLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBYnN0cmFjdENvbnRyb2wsXG4gIEFzeW5jVmFsaWRhdG9yRm4sXG4gIENvbnRyb2xDb250YWluZXIsXG4gIEZvcm1BcnJheSxcbiAgRm9ybUNvbnRyb2wsXG4gIEZvcm1Hcm91cCxcbiAgRm9ybUdyb3VwRGlyZWN0aXZlLFxuICBOR19BU1lOQ19WQUxJREFUT1JTLFxuICBOR19WQUxJREFUT1JTLFxuICBOZ01vZGVsR3JvdXAsXG4gIFZhbGlkYXRvckZuLFxuICBWYWxpZGF0b3JzLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBVbnN1YnNjcmliZSB9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IHsgQ29ubmVjdEJhc2UgfSBmcm9tICcuLi9jb25uZWN0JztcbmltcG9ydCB7IEZvcm1TdG9yZSB9IGZyb20gJy4uL2Zvcm0tc3RvcmUnO1xuaW1wb3J0IHsgY29udHJvbFBhdGggfSBmcm9tICcuLi9zaGltcyc7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4uL3N0YXRlJztcbmltcG9ydCB7IENvbm5lY3RBcnJheVRlbXBsYXRlIH0gZnJvbSAnLi9jb25uZWN0LWFycmF5LXRlbXBsYXRlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Nvbm5lY3RBcnJheV0nLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBDb250cm9sQ29udGFpbmVyLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ29ubmVjdEFycmF5RGlyZWN0aXZlKSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb25uZWN0QXJyYXlEaXJlY3RpdmUgZXh0ZW5kcyBDb250cm9sQ29udGFpbmVyXG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN0YXRlU3Vic2NyaXB0aW9uOiBVbnN1YnNjcmliZTtcblxuICBwcml2YXRlIGFycmF5ID0gbmV3IEZvcm1BcnJheShbXSk7XG5cbiAgcHJpdmF0ZSBrZXk/OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKClcbiAgICBASG9zdCgpXG4gICAgQFNraXBTZWxmKClcbiAgICBwcml2YXRlIHBhcmVudDogQ29udHJvbENvbnRhaW5lcixcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBTZWxmKClcbiAgICBASW5qZWN0KE5HX1ZBTElEQVRPUlMpXG4gICAgcHJpdmF0ZSByYXdWYWxpZGF0b3JzOiBhbnlbXSxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBTZWxmKClcbiAgICBASW5qZWN0KE5HX0FTWU5DX1ZBTElEQVRPUlMpXG4gICAgcHJpdmF0ZSByYXdBc3luY1ZhbGlkYXRvcnM6IGFueVtdLFxuICAgIHByaXZhdGUgY29ubmVjdGlvbjogQ29ubmVjdEJhc2UsXG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBzdG9yZTogRm9ybVN0b3JlLFxuICApIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbiA9IHRoaXMuc3RvcmUuc3Vic2NyaWJlKHN0YXRlID0+XG4gICAgICB0aGlzLnJlc2V0U3RhdGUoc3RhdGUpLFxuICAgICk7XG5cbiAgICB0aGlzLnJlZ2lzdGVySW50ZXJuYWxzKHRoaXMuYXJyYXkpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGNvbm5lY3RBcnJheU9mKGNvbGxlY3Rpb246IGFueSkge1xuICAgIHRoaXMua2V5ID0gY29sbGVjdGlvbjtcblxuICAgIHRoaXMucmVzZXRTdGF0ZSh0aGlzLnN0b3JlLmdldFN0YXRlKCkpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5mb3JtRGlyZWN0aXZlLmFkZENvbnRyb2wodGhpcyBhcyBhbnkpO1xuICB9XG5cbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5rZXkgfHwgJyc7XG4gIH1cblxuICBnZXQgY29udHJvbCgpOiBGb3JtQXJyYXkge1xuICAgIHJldHVybiB0aGlzLmFycmF5O1xuICB9XG5cbiAgZ2V0IGZvcm1EaXJlY3RpdmUoKTogRm9ybUdyb3VwRGlyZWN0aXZlIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQuZm9ybURpcmVjdGl2ZSBhcyBGb3JtR3JvdXBEaXJlY3RpdmU7XG4gIH1cblxuICBnZXQgcGF0aCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMua2V5ID8gY29udHJvbFBhdGgodGhpcy5rZXksIHRoaXMucGFyZW50KSA6IFtdO1xuICB9XG5cbiAgZ2V0IHZhbGlkYXRvcigpOiBWYWxpZGF0b3JGbiB8IG51bGwge1xuICAgIHJldHVybiBWYWxpZGF0b3JzLmNvbXBvc2UodGhpcy5yYXdWYWxpZGF0b3JzKTtcbiAgfVxuXG4gIGdldCBhc3luY1ZhbGlkYXRvcigpOiBBc3luY1ZhbGlkYXRvckZuIHwgbnVsbCB7XG4gICAgcmV0dXJuIFZhbGlkYXRvcnMuY29tcG9zZUFzeW5jKHRoaXMucmF3QXN5bmNWYWxpZGF0b3JzKTtcbiAgfVxuXG4gIHVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKSB7XG4gICAgLy8gc3R1Yj9cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuXG4gICAgaWYgKHRoaXMua2V5KSB7XG4gICAgICB0aGlzLmZvcm1EaXJlY3RpdmUuZm9ybS5yZW1vdmVDb250cm9sKHRoaXMua2V5KTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlU3Vic2NyaXB0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0U3RhdGUoc3RhdGU6IGFueSkge1xuICAgIGlmICh0aGlzLmtleSA9PSBudWxsIHx8IHRoaXMua2V5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuOyAvLyBubyBzdGF0ZSB0byByZXRyZWl2ZSBpZiBubyBrZXkgaXMgc2V0XG4gICAgfVxuXG4gICAgY29uc3QgaXRlcmFibGUgPSBTdGF0ZS5nZXQoc3RhdGUsIHRoaXMuY29ubmVjdGlvbi5wYXRoLmNvbmNhdCh0aGlzLnBhdGgpKTtcblxuICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIGl0ZXJhYmxlKSB7XG4gICAgICBjb25zdCB2aWV3UmVmID1cbiAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmxlbmd0aCA+IGluZGV4XG4gICAgICAgICAgPyAodGhpcy52aWV3Q29udGFpbmVyUmVmLmdldChpbmRleCkgYXMgRW1iZWRkZWRWaWV3UmVmPFxuICAgICAgICAgICAgICBDb25uZWN0QXJyYXlUZW1wbGF0ZVxuICAgICAgICAgICAgPilcbiAgICAgICAgICA6IG51bGw7XG5cbiAgICAgIGlmICh2aWV3UmVmID09IG51bGwpIHtcbiAgICAgICAgY29uc3QgZW1iZWRkZWRWaWV3UmVmID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldzxcbiAgICAgICAgICBDb25uZWN0QXJyYXlUZW1wbGF0ZVxuICAgICAgICA+KFxuICAgICAgICAgIHRoaXMudGVtcGxhdGVSZWYsXG4gICAgICAgICAgbmV3IENvbm5lY3RBcnJheVRlbXBsYXRlKGluZGV4LCBpbmRleCwgdmFsdWUpLFxuICAgICAgICAgIGluZGV4LFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMucGF0Y2hEZXNjZW5kYW50Q29udHJvbHMoZW1iZWRkZWRWaWV3UmVmKTtcblxuICAgICAgICB0aGlzLmFycmF5Lmluc2VydChcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgICB0aGlzLnRyYW5zZm9ybSh0aGlzLmFycmF5LCBlbWJlZGRlZFZpZXdSZWYuY29udGV4dC5pdGVtKSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgdmlld1JlZi5jb250ZXh0LFxuICAgICAgICAgIG5ldyBDb25uZWN0QXJyYXlUZW1wbGF0ZShpbmRleCwgaW5kZXgsIHZhbHVlKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgKytpbmRleDtcbiAgICB9XG5cbiAgICB3aGlsZSAodGhpcy52aWV3Q29udGFpbmVyUmVmLmxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYucmVtb3ZlKHRoaXMudmlld0NvbnRhaW5lclJlZi5sZW5ndGggLSAxKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVySW50ZXJuYWxzKGFycmF5OiBhbnkpIHtcbiAgICBhcnJheS5yZWdpc3RlckNvbnRyb2wgPSAoKSA9PiB1bmRlZmluZWQ7XG4gICAgYXJyYXkucmVnaXN0ZXJPbkNoYW5nZSA9ICgpID0+IHVuZGVmaW5lZDtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgIF9yYXdWYWxpZGF0b3JzOiB7XG4gICAgICAgIHZhbHVlOiB0aGlzLnJhd1ZhbGlkYXRvcnMgfHwgW10sXG4gICAgICB9LFxuICAgICAgX3Jhd0FzeW5jVmFsaWRhdG9yczoge1xuICAgICAgICB2YWx1ZTogdGhpcy5yYXdBc3luY1ZhbGlkYXRvcnMgfHwgW10sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXRjaERlc2NlbmRhbnRDb250cm9scyh2aWV3UmVmOiBhbnkpIHtcbiAgICBjb25zdCBncm91cHMgPSBPYmplY3Qua2V5cyh2aWV3UmVmLl92aWV3KVxuICAgICAgLm1hcChrID0+IHZpZXdSZWYuX3ZpZXdba10pXG4gICAgICAuZmlsdGVyKGMgPT4gYyBpbnN0YW5jZW9mIE5nTW9kZWxHcm91cCk7XG5cbiAgICBncm91cHMuZm9yRWFjaChjID0+IHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGMsIHtcbiAgICAgICAgX3BhcmVudDoge1xuICAgICAgICAgIHZhbHVlOiB0aGlzLFxuICAgICAgICB9LFxuICAgICAgICBfY2hlY2tQYXJlbnRUeXBlOiB7XG4gICAgICAgICAgdmFsdWU6ICgpID0+IHVuZGVmaW5lZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmFuc2Zvcm0oXG4gICAgcGFyZW50OiBGb3JtR3JvdXAgfCBGb3JtQXJyYXksXG4gICAgcmVmZXJlbmNlOiBhbnksXG4gICk6IEFic3RyYWN0Q29udHJvbCB7XG4gICAgY29uc3QgZW1wdHlDb250cm9sID0gKCkgPT4ge1xuICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChudWxsKTtcbiAgICAgIGNvbnRyb2wuc2V0UGFyZW50KHBhcmVudCk7XG4gICAgICByZXR1cm4gY29udHJvbDtcbiAgICB9O1xuXG4gICAgaWYgKHJlZmVyZW5jZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZW1wdHlDb250cm9sKCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiByZWZlcmVuY2UudG9KUyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVmZXJlbmNlID0gcmVmZXJlbmNlLnRvSlMoKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHR5cGVvZiByZWZlcmVuY2UpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiBlbXB0eUNvbnRyb2woKTtcbiAgICB9XG5cbiAgICBjb25zdCBpdGVyYXRlID0gKGl0ZXJhYmxlOiBhbnkpOiBGb3JtQXJyYXkgPT4ge1xuICAgICAgY29uc3QgYXJyYXkgPSBuZXcgRm9ybUFycmF5KFtdKTtcblxuICAgICAgdGhpcy5yZWdpc3RlckludGVybmFscyhhcnJheSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSBhcnJheS5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgYXJyYXkucmVtb3ZlQXQoaSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgaXRlcmFibGUpIHtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtZWQgPSB0aGlzLnRyYW5zZm9ybShhcnJheSwgdmFsdWUpO1xuICAgICAgICBpZiAodHJhbnNmb3JtZWQpIHtcbiAgICAgICAgICBhcnJheS5wdXNoKHRyYW5zZm9ybWVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXJyYXk7XG4gICAgfTtcblxuICAgIGNvbnN0IGFzc29jaWF0ZSA9ICh2YWx1ZTogYW55KTogRm9ybUdyb3VwID0+IHtcbiAgICAgIGNvbnN0IGdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gICAgICBncm91cC5zZXRQYXJlbnQocGFyZW50KTtcblxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkID0gdGhpcy50cmFuc2Zvcm0oZ3JvdXAsIHZhbHVlW2tleV0pO1xuICAgICAgICBpZiAodHJhbnNmb3JtZWQpIHtcbiAgICAgICAgICBncm91cC5hZGRDb250cm9sKGtleSwgdHJhbnNmb3JtZWQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBncm91cDtcbiAgICB9O1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmVmZXJlbmNlKSkge1xuICAgICAgcmV0dXJuIGl0ZXJhdGUocmVmZXJlbmNlIGFzIGFueVtdKTtcbiAgICB9IGVsc2UgaWYgKHJlZmVyZW5jZSBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgcmV0dXJuIGl0ZXJhdGUocmVmZXJlbmNlIGFzIFNldDxhbnk+KTtcbiAgICB9IGVsc2UgaWYgKHJlZmVyZW5jZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgcmV0dXJuIGFzc29jaWF0ZShyZWZlcmVuY2UgYXMgTWFwPHN0cmluZywgYW55Pik7XG4gICAgfSBlbHNlIGlmIChyZWZlcmVuY2UgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIHJldHVybiBhc3NvY2lhdGUocmVmZXJlbmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgQ2Fubm90IGNvbnZlcnQgb2JqZWN0IG9mIHR5cGUgJHt0eXBlb2YgcmVmZXJlbmNlfSAvICR7cmVmZXJlbmNlLnRvU3RyaW5nKCl9IHRvIGZvcm0gZWxlbWVudGAsXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29ubmVjdEFycmF5RGlyZWN0aXZlIH0gZnJvbSAnLi9jb25uZWN0LWFycmF5JztcblxuY29uc3QgZGVjbGFyYXRpb25zID0gW0Nvbm5lY3RBcnJheURpcmVjdGl2ZV07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogWy4uLmRlY2xhcmF0aW9uc10sXG4gIGV4cG9ydHM6IFsuLi5kZWNsYXJhdGlvbnNdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ1JlZHV4Rm9ybUNvbm5lY3RBcnJheU1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgTmdSZWR1eEZvcm1Db25uZWN0TW9kdWxlIH0gZnJvbSAnLi9jb25uZWN0JztcbmltcG9ydCB7IE5nUmVkdXhGb3JtQ29ubmVjdEFycmF5TW9kdWxlIH0gZnJvbSAnLi9jb25uZWN0LWFycmF5JztcbmltcG9ydCB7IEZvcm1TdG9yZSB9IGZyb20gJy4vZm9ybS1zdG9yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtU3RvcmVGYWN0b3J5KG5nUmVkdXg6IE5nUmVkdXg8YW55Pikge1xuICByZXR1cm4gbmV3IEZvcm1TdG9yZShuZ1JlZHV4KTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgTmdSZWR1eEZvcm1Db25uZWN0TW9kdWxlLFxuICAgIE5nUmVkdXhGb3JtQ29ubmVjdEFycmF5TW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbTmdSZWR1eEZvcm1Db25uZWN0TW9kdWxlLCBOZ1JlZHV4Rm9ybUNvbm5lY3RBcnJheU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEZvcm1TdG9yZSxcbiAgICAgIHVzZUZhY3Rvcnk6IGZvcm1TdG9yZUZhY3RvcnksXG4gICAgICBkZXBzOiBbTmdSZWR1eF0sXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdSZWR1eEZvcm1Nb2R1bGUge31cbiJdLCJuYW1lcyI6WyJzdG9yZSIsIkluamVjdGFibGUiLCJOZ1JlZHV4IiwidHNsaWJfMS5fX2V4dGVuZHMiLCJ0c2xpYl8xLl9fdmFsdWVzIiwiSXRlcmFibGUiLCJJbW11dGFibGVNYXAiLCJkZWJvdW5jZVRpbWUiLCJGb3JtQXJyYXkiLCJGb3JtR3JvdXAiLCJOZ0NvbnRyb2wiLCJGb3JtQ29udHJvbCIsIklucHV0IiwiRGlyZWN0aXZlIiwiTmdGb3JtIiwiTmdNb2R1bGUiLCJWYWxpZGF0b3JzIiwiTmdNb2RlbEdyb3VwIiwiQ29udHJvbENvbnRhaW5lciIsImZvcndhcmRSZWYiLCJPcHRpb25hbCIsIkhvc3QiLCJTa2lwU2VsZiIsIlNlbGYiLCJJbmplY3QiLCJOR19WQUxJREFUT1JTIiwiTkdfQVNZTkNfVkFMSURBVE9SUyIsIlRlbXBsYXRlUmVmIiwiVmlld0NvbnRhaW5lclJlZiIsImRlY2xhcmF0aW9ucyIsIkZvcm1zTW9kdWxlIiwiUmVhY3RpdmVGb3Jtc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxRQUFhLGVBQWUsR0FBRztRQUM3QixrQkFBd0M7YUFBeEMsVUFBd0MsRUFBeEMscUJBQXdDLEVBQXhDLElBQXdDO1lBQXhDLDZCQUF3Qzs7UUFDVixPQUFBLFVBQUMsQ0FBTSxFQUFFLE1BQWlCO1lBQ3hELE9BQUEsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEVBQUUsRUFBRSxPQUFPLElBQUssT0FBQSxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFBLEVBQUUsQ0FBQyxDQUFDO1NBQUE7SUFEMUIsQ0FDMEI7Ozs7OztBQ0wxRDtBQW1CQSxRQUFhLFlBQVksR0FB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