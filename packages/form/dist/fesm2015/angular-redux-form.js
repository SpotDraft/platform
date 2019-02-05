import { Injectable, Input, Directive, NgModule, forwardRef, Host, Inject, Optional, Self, SkipSelf, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Iterable, Map as Map$1 } from 'immutable';
import { FormArray, FormControl, FormGroup, NgControl, NgForm, ControlContainer, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModelGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const composeReducers = (...reducers) => (s, action) => reducers.reduce((st, reducer) => reducer(st, action), s);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const FORM_CHANGED = '@@angular-redux/form/FORM_CHANGED';
class FormStore {
    /**
     * @param {?} store
     */
    constructor(store) {
        this.store = store;
    }
    /**
     * @return {?}
     */
    getState() {
        return this.store.getState();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    subscribe(fn) {
        return this.store.subscribe(() => fn(this.getState()));
    }
    /**
     * @template T
     * @param {?} path
     * @param {?} form
     * @param {?} value
     * @return {?}
     */
    valueChanged(path, form, value) {
        this.store.dispatch({
            type: FORM_CHANGED,
            payload: {
                path,
                form,
                valid: form.valid === true,
                value,
            },
        });
    }
}
FormStore.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FormStore.ctorParameters = () => [
    { type: NgRedux }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class FormException extends Error {
    /**
     * @param {?} msg
     */
    constructor(msg) {
        super(msg);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class State {
    /**
     * @template StateType
     * @param {?} state
     * @param {?} path
     * @param {?=} fn
     * @return {?}
     */
    static traverse(state, path, fn) {
        /** @type {?} */
        let deepValue = state;
        for (const k of path) {
            /** @type {?} */
            const parent = deepValue;
            if (Iterable.isIterable(deepValue)) {
                /** @type {?} */
                const m = /** @type {?} */ ((/** @type {?} */ (deepValue)));
                if (typeof m.get === 'function') {
                    deepValue = m.get(k);
                }
                else {
                    throw new FormException(`Cannot retrieve value from immutable nonassociative container: ${k}`);
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
                const transformed = fn(parent, k, path.slice(path.indexOf(k) + 1), deepValue);
                deepValue = transformed[k];
                Object.assign(parent, transformed);
            }
            // If we were not able to find this state inside of our root state
            // structure, then we return undefined -- not null -- to indicate that
            // state. But this could be a perfectly normal use-case so we don't
            // want to throw an exception or anything along those lines.
            if (deepValue === undefined) {
                return undefined;
            }
        }
        return deepValue;
    }
    /**
     * @template StateType
     * @param {?} state
     * @param {?} path
     * @return {?}
     */
    static get(state, path) {
        return State.traverse(state, path);
    }
    /**
     * @template StateType
     * @param {?} state
     * @param {?} path
     * @param {?=} value
     * @return {?}
     */
    static assign(state, path, value) {
        /** @type {?} */
        const operations = State.inspect(state);
        if (path.length === 0) {
            return operations.update(null, value);
        }
        /** @type {?} */
        const root = operations.clone();
        // We want to shallow clone the object, and then trace a path to the place
        // we want to update, cloning each object we traversed on our way and then
        // finally updating the value on the last parent to be @value. This seems
        // to offer the best performance: we can shallow clone everything that has
        // not been modified, and {deep clone + update} the path down to the value
        // that we wish to update.
        State.traverse(root, path, (parent, key, remainingPath, innerValue) => {
            /** @type {?} */
            const parentOperations = State.inspect(parent);
            if (innerValue) {
                /** @type {?} */
                const innerOperations = State.inspect(innerValue);
                return parentOperations.update(key, remainingPath.length > 0
                    ? innerOperations.clone()
                    : innerOperations.merge(null, value));
            }
            else {
                /** @type {?} */
                const getProbableType = (stateKey) => {
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
    }
    /**
     * @template K
     * @param {?} object
     * @return {?}
     */
    static inspect(object) {
        /** @type {?} */
        const metaOperations = (
        // TODO: Write proper type declarations for following Function types
        // TODO: Write proper type declarations for following Function types
        update, merge, clone) => {
            /** @type {?} */
            const operations = {
                clone: typeof clone === 'function'
                    ? () => /** @type {?} */ (clone(/** @type {?} */ (object)))
                    : () => object,
                update: (key, value) => update(operations.clone(), key, value),
                merge: (key, value) => {
                    /** @type {?} */
                    const cloned = operations.clone();
                    return merge(cloned, key, value, (v) => update(cloned, key, v));
                },
            };
            return operations;
        };
        if (Iterable.isIterable(object)) {
            return metaOperations(
            // Replace
            (parent, key, value) => {
                if (key != null) {
                    return parent.set(key, value);
                }
                else {
                    return value;
                }
            }, 
            // Merge
            (parent, key, value) => {
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
            (parent, key, value) => {
                if (key != null) {
                    parent[key] = value;
                }
                else {
                    parent.splice.apply(parent, [0, parent.length].concat(Array.isArray(value) ? value : [value]));
                }
            }, 
            // Merge
            (parent, _, value, setter) => {
                setter(parent.concat(value));
                return parent;
            }, 
            // Clone
            () => Array.prototype.slice.call(object, 0));
        }
        else if (object instanceof Map) {
            return metaOperations(
            // Update map key
            (parent, key, value) => {
                if (key != null) {
                    return parent.set(key, value);
                }
                else {
                    /** @type {?} */
                    const m = new Map(/** @type {?} */ (value));
                    parent.clear();
                    m.forEach((mapValue, index) => parent.set(index, mapValue));
                    return parent;
                }
            }, 
            // Merge
            (parent, _, value) => {
                /** @type {?} */
                const m = new Map(/** @type {?} */ (value));
                m.forEach((mapValue, key) => parent.set(key, mapValue));
                return parent;
            }, 
            // Clone
            () => object instanceof WeakMap
                ? new WeakMap(/** @type {?} */ (object))
                : new Map(/** @type {?} */ (object)));
        }
        else if (object instanceof WeakSet || object instanceof Set) {
            return metaOperations(
            // Update element at index in set
            (parent, key, value) => {
                if (key != null) {
                    return parent.set(key, value);
                }
                else {
                    /** @type {?} */
                    const s = new Set(/** @type {?} */ (value));
                    s.forEach((setValue, index) => parent.set(index, setValue));
                    s.clear();
                    return parent;
                }
            }, 
            // Merge
            (parent, _, value) => {
                for (const element of value) {
                    parent.add(element);
                }
                return parent;
            }, 
            // Clone
            () => object instanceof WeakSet
                ? new WeakSet(/** @type {?} */ (object))
                : new Set(/** @type {?} */ (object)));
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
                    return metaOperations((parent, key, value) => {
                        if (key != null) {
                            return Object.assign({}, parent, { [key]: value });
                        }
                        return Object.assign({}, parent, (/** @type {?} */ (value)));
                    }, (parent, _, value) => {
                        for (const k of Object.keys(value)) {
                            parent[k] = (/** @type {?} */ (value))[k];
                        }
                        return parent;
                    }, () => (Object.assign({}, (/** @type {?} */ (object)))));
                default:
                    break;
            }
        }
        throw new Error(`An object of type ${typeof object} has appeared in the mutation path! Every element ` +
            'in the mutation path should be an array, an associative container, or a set');
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static empty(value) {
        return (value == null ||
            (value.length === 0 ||
                (typeof value.length === 'undefined' &&
                    Object.keys(value).length === 0)));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const defaultFormReducer = (initialState) => {
    /** @type {?} */
    const reducer = (state = initialState, action) => {
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
const provideReduxForms = (store) => {
    /** @type {?} */
    const abstractStore = wrap(store);
    return [
        { provide: FormStore, useValue: new FormStore(/** @type {?} */ (abstractStore)) },
    ];
};
/** @type {?} */
const wrap = (store) => {
    /** @type {?} */
    const dispatch = (action) => store.dispatch(action);
    /** @type {?} */
    const getState = () => /** @type {?} */ (store.getState());
    /** @type {?} */
    const subscribe = (fn) => store.subscribe(() => fn(store.getState()));
    return { dispatch, getState, subscribe };
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ConnectBase {
    /**
     * @return {?}
     */
    get path() {
        /** @type {?} */
        const path = typeof this.connect === 'function' ? this.connect() : this.connect;
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
                throw new Error(`Cannot determine path to object: ${JSON.stringify(path)}`);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.formSubscription) {
            this.formSubscription.unsubscribe();
        }
        if (typeof this.stateSubscription === 'function') {
            this.stateSubscription(); // unsubscribe
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        Promise.resolve().then(() => {
            this.resetState();
            if (this.store) {
                this.stateSubscription = this.store.subscribe(() => this.resetState());
            }
            Promise.resolve().then(() => {
                this.formSubscription = (/** @type {?} */ (this.form.valueChanges))
                    .pipe(debounceTime(0))
                    .subscribe((values) => this.publish(values));
            });
        });
    }
    /**
     * @param {?} path
     * @param {?} formElement
     * @return {?}
     */
    descendants(path, formElement) {
        /** @type {?} */
        const pairs = new Array();
        if (formElement instanceof FormArray) {
            formElement.controls.forEach((c, index) => {
                for (const d of this.descendants((/** @type {?} */ (path)).concat([index]), c)) {
                    pairs.push(d);
                }
            });
        }
        else if (formElement instanceof FormGroup) {
            for (const k of Object.keys(formElement.controls)) {
                pairs.push({
                    path: path.concat([k]),
                    control: formElement.controls[k],
                });
            }
        }
        else if (formElement instanceof NgControl ||
            formElement instanceof FormControl) {
            return [{ path, control: /** @type {?} */ (formElement) }];
        }
        else {
            throw new Error(`Unknown type of form element: ${formElement.constructor.name}`);
        }
        return pairs.filter(p => {
            /** @type {?} */
            const parent = (/** @type {?} */ (p.control))._parent;
            return parent === this.form.control || parent === this.form;
        });
    }
    /**
     * @return {?}
     */
    resetState() {
        /** @type {?} */
        const formElement = this.form.control === undefined ? this.form : this.form.control;
        /** @type {?} */
        const children = this.descendants([], formElement);
        children.forEach(c => {
            const { path, control } = c;
            /** @type {?} */
            const value = State.get(this.getState(), this.path.concat(path));
            if (control.value !== value) {
                control.setValue(value);
            }
        });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    publish(value) {
        if (this.store) {
            this.store.valueChanged(this.path, this.form, value);
        }
    }
    /**
     * @return {?}
     */
    getState() {
        if (this.store) {
            return this.store.getState();
        }
    }
}
ConnectBase.propDecorators = {
    connect: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ReactiveConnectDirective extends ConnectBase {
    /**
     * @param {?} store
     */
    constructor(store) {
        super();
        this.store = store;
    }
}
ReactiveConnectDirective.decorators = [
    { type: Directive, args: [{ selector: 'form[connect][formGroup]' },] },
];
/** @nocollapse */
ReactiveConnectDirective.ctorParameters = () => [
    { type: FormStore }
];
ReactiveConnectDirective.propDecorators = {
    formGroup: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ConnectDirective extends ConnectBase {
    /**
     * @param {?} store
     * @param {?} form
     */
    constructor(store, form) {
        super();
        this.store = store;
        this.form = form;
    }
}
ConnectDirective.decorators = [
    { type: Directive, args: [{ selector: 'form[connect]:not([formGroup])' },] },
];
/** @nocollapse */
ConnectDirective.ctorParameters = () => [
    { type: FormStore },
    { type: NgForm }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const declarations = [ConnectDirective, ReactiveConnectDirective];
class NgReduxFormConnectModule {
}
NgReduxFormConnectModule.decorators = [
    { type: NgModule, args: [{
                declarations: [...declarations],
                exports: [...declarations],
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
/**
 * @param {?} name
 * @param {?} parent
 * @return {?}
 */
function controlPath(name, parent) {
    return [...(parent.path || []), name];
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ConnectArrayTemplate {
    /**
     * @param {?} $implicit
     * @param {?} index
     * @param {?} item
     */
    constructor($implicit, index, item) {
        this.$implicit = $implicit;
        this.index = index;
        this.item = item;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ConnectArrayDirective extends ControlContainer {
    /**
     * @param {?} parent
     * @param {?} rawValidators
     * @param {?} rawAsyncValidators
     * @param {?} connection
     * @param {?} templateRef
     * @param {?} viewContainerRef
     * @param {?} store
     */
    constructor(parent, rawValidators, rawAsyncValidators, connection, templateRef, viewContainerRef, store) {
        super();
        this.parent = parent;
        this.rawValidators = rawValidators;
        this.rawAsyncValidators = rawAsyncValidators;
        this.connection = connection;
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.store = store;
        this.array = new FormArray([]);
        this.stateSubscription = this.store.subscribe(state => this.resetState(state));
        this.registerInternals(this.array);
    }
    /**
     * @param {?} collection
     * @return {?}
     */
    set connectArrayOf(collection) {
        this.key = collection;
        this.resetState(this.store.getState());
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.formDirective.addControl(/** @type {?} */ (this));
    }
    /**
     * @return {?}
     */
    get name() {
        return this.key || '';
    }
    /**
     * @return {?}
     */
    get control() {
        return this.array;
    }
    /**
     * @return {?}
     */
    get formDirective() {
        return /** @type {?} */ (this.parent.formDirective);
    }
    /**
     * @return {?}
     */
    get path() {
        return this.key ? controlPath(this.key, this.parent) : [];
    }
    /**
     * @return {?}
     */
    get validator() {
        return Validators.compose(this.rawValidators);
    }
    /**
     * @return {?}
     */
    get asyncValidator() {
        return Validators.composeAsync(this.rawAsyncValidators);
    }
    /**
     * @return {?}
     */
    updateValueAndValidity() {
        // stub?
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.viewContainerRef.clear();
        if (this.key) {
            this.formDirective.form.removeControl(this.key);
        }
        this.stateSubscription();
    }
    /**
     * @param {?} state
     * @return {?}
     */
    resetState(state) {
        if (this.key == null || this.key.length === 0) {
            return; // no state to retreive if no key is set
        }
        /** @type {?} */
        const iterable = State.get(state, this.connection.path.concat(this.path));
        /** @type {?} */
        let index = 0;
        for (const value of iterable) {
            /** @type {?} */
            const viewRef = this.viewContainerRef.length > index
                ? (/** @type {?} */ (this.viewContainerRef.get(index)))
                : null;
            if (viewRef == null) {
                /** @type {?} */
                const embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.templateRef, new ConnectArrayTemplate(index, index, value), index);
                this.patchDescendantControls(embeddedViewRef);
                this.array.insert(index, this.transform(this.array, embeddedViewRef.context.item));
            }
            else {
                Object.assign(viewRef.context, new ConnectArrayTemplate(index, index, value));
            }
            ++index;
        }
        while (this.viewContainerRef.length > index) {
            this.viewContainerRef.remove(this.viewContainerRef.length - 1);
        }
    }
    /**
     * @param {?} array
     * @return {?}
     */
    registerInternals(array) {
        array.registerControl = () => undefined;
        array.registerOnChange = () => undefined;
        Object.defineProperties(this, {
            _rawValidators: {
                value: this.rawValidators || [],
            },
            _rawAsyncValidators: {
                value: this.rawAsyncValidators || [],
            },
        });
    }
    /**
     * @param {?} viewRef
     * @return {?}
     */
    patchDescendantControls(viewRef) {
        /** @type {?} */
        const groups = Object.keys(viewRef._view)
            .map(k => viewRef._view[k])
            .filter(c => c instanceof NgModelGroup);
        groups.forEach(c => {
            Object.defineProperties(c, {
                _parent: {
                    value: this,
                },
                _checkParentType: {
                    value: () => undefined,
                },
            });
        });
    }
    /**
     * @param {?} parent
     * @param {?} reference
     * @return {?}
     */
    transform(parent, reference) {
        /** @type {?} */
        const emptyControl = () => {
            /** @type {?} */
            const control = new FormControl(null);
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
        const iterate = (iterable) => {
            /** @type {?} */
            const array = new FormArray([]);
            this.registerInternals(array);
            for (let i = array.length; i > 0; i--) {
                array.removeAt(i);
            }
            for (const value of iterable) {
                /** @type {?} */
                const transformed = this.transform(array, value);
                if (transformed) {
                    array.push(transformed);
                }
            }
            return array;
        };
        /** @type {?} */
        const associate = (value) => {
            /** @type {?} */
            const group = new FormGroup({});
            group.setParent(parent);
            for (const key of Object.keys(value)) {
                /** @type {?} */
                const transformed = this.transform(group, value[key]);
                if (transformed) {
                    group.addControl(key, transformed);
                }
            }
            return group;
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
            throw new Error(`Cannot convert object of type ${typeof reference} / ${reference.toString()} to form element`);
        }
    }
}
ConnectArrayDirective.decorators = [
    { type: Directive, args: [{
                selector: '[connectArray]',
                providers: [
                    {
                        provide: ControlContainer,
                        useExisting: forwardRef(() => ConnectArrayDirective),
                    },
                ],
            },] },
];
/** @nocollapse */
ConnectArrayDirective.ctorParameters = () => [
    { type: ControlContainer, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf }] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] }] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_ASYNC_VALIDATORS,] }] },
    { type: ConnectBase },
    { type: TemplateRef },
    { type: ViewContainerRef },
    { type: FormStore }
];
ConnectArrayDirective.propDecorators = {
    connectArrayOf: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const declarations$1 = [ConnectArrayDirective];
class NgReduxFormConnectArrayModule {
}
NgReduxFormConnectArrayModule.decorators = [
    { type: NgModule, args: [{
                declarations: [...declarations$1],
                exports: [...declarations$1],
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
/**
 * @param {?} ngRedux
 * @return {?}
 */
function formStoreFactory(ngRedux) {
    return new FormStore(ngRedux);
}
class NgReduxFormModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { composeReducers, defaultFormReducer, FormException, FORM_CHANGED, FormStore, provideReduxForms, ConnectBase, ReactiveConnectDirective, NgReduxFormConnectModule, ConnectDirective, NgReduxFormConnectArrayModule, ConnectArrayDirective, ConnectArrayTemplate, formStoreFactory, NgReduxFormModule, NgReduxFormConnectModule as ɵa, NgReduxFormConnectArrayModule as ɵb };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1yZWR1eC1mb3JtLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AYW5ndWxhci1yZWR1eC9mb3JtL2NvbXBvc2UtcmVkdWNlcnMudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vZm9ybS1zdG9yZS50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9mb3JtLWV4Y2VwdGlvbi50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9zdGF0ZS50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9mb3JtLXJlZHVjZXIudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vY29uZmlndXJlLnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9mb3JtL2Nvbm5lY3QvY29ubmVjdC1iYXNlLnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9mb3JtL2Nvbm5lY3QvY29ubmVjdC1yZWFjdGl2ZS50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9jb25uZWN0L2Nvbm5lY3QudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vY29ubmVjdC9jb25uZWN0Lm1vZHVsZS50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9zaGltcy50cyIsIm5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS9jb25uZWN0LWFycmF5L2Nvbm5lY3QtYXJyYXktdGVtcGxhdGUudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vY29ubmVjdC1hcnJheS9jb25uZWN0LWFycmF5LnRzIiwibmc6Ly9AYW5ndWxhci1yZWR1eC9mb3JtL2Nvbm5lY3QtYXJyYXkvY29ubmVjdC1hcnJheS5tb2R1bGUudHMiLCJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vbW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFueUFjdGlvbiwgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcblxuZXhwb3J0IGNvbnN0IGNvbXBvc2VSZWR1Y2VycyA9IDxTdGF0ZT4oXG4gIC4uLnJlZHVjZXJzOiBSZWR1Y2VyPFN0YXRlLCBBbnlBY3Rpb24+W11cbik6IFJlZHVjZXI8U3RhdGUsIEFueUFjdGlvbj4gPT4gKHM6IGFueSwgYWN0aW9uOiBBbnlBY3Rpb24pID0+XG4gIHJlZHVjZXJzLnJlZHVjZSgoc3QsIHJlZHVjZXIpID0+IHJlZHVjZXIoc3QsIGFjdGlvbiksIHMpO1xuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5cbmltcG9ydCB7IEFjdGlvbiwgVW5zdWJzY3JpYmUgfSBmcm9tICdyZWR1eCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWJzdHJhY3RTdG9yZTxSb290U3RhdGU+IHtcbiAgLy8vIERpc3BhdGNoIGFuIGFjdGlvblxuICBkaXNwYXRjaChhY3Rpb246IEFjdGlvbiAmIHsgcGF5bG9hZDogYW55IH0pOiB2b2lkO1xuXG4gIC8vLyBSZXRyaWV2ZSB0aGUgY3VycmVudCBhcHBsaWNhdGlvbiBzdGF0ZVxuICBnZXRTdGF0ZSgpOiBSb290U3RhdGU7XG5cbiAgLy8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIHRoZSBzdG9yZVxuICBzdWJzY3JpYmUoZm46IChzdGF0ZTogUm9vdFN0YXRlKSA9PiB2b2lkKTogVW5zdWJzY3JpYmU7XG59XG5cbmV4cG9ydCBjb25zdCBGT1JNX0NIQU5HRUQgPSAnQEBhbmd1bGFyLXJlZHV4L2Zvcm0vRk9STV9DSEFOR0VEJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1TdG9yZSB7XG4gIC8vLyBOT1RFKGNib25kKTogVGhlIGRlY2xhcmF0aW9uIG9mIHN0b3JlIGlzIG1pc2xlYWRpbmcuIFRoaXMgY2xhc3MgaXNcbiAgLy8vIGFjdHVhbGx5IGNhcGFibGUgb2YgdGFraW5nIGEgcGxhaW4gUmVkdXggc3RvcmUgb3IgYW4gTmdSZWR1eCBpbnN0YW5jZS5cbiAgLy8vIEJ1dCBpbiBvcmRlciB0byBtYWtlIHRoZSBuZyBkZXBlbmRlbmN5IGluamVjdG9yIHdvcmsgcHJvcGVybHksIHdlXG4gIC8vLyBkZWNsYXJlIGl0IGFzIGFuIE5nUmVkdXggdHlwZSwgc2luY2UgdGhlIEBhbmd1bGFyLXJlZHV4L3N0b3JlIHVzZSBjYXNlIGludm9sdmVzXG4gIC8vLyBjYWxsaW5nIHRoZSBjb25zdHJ1Y3RvciBvZiB0aGlzIGNsYXNzIG1hbnVhbGx5IChmcm9tIGNvbmZpZ3VyZS50cyksXG4gIC8vLyB3aGVyZSBhIHBsYWluIHN0b3JlIGNhbiBiZSBjYXN0IHRvIGFuIE5nUmVkdXguIChGb3Igb3VyIHB1cnBvc2VzLCB0aGV5XG4gIC8vLyBoYXZlIGFsbW9zdCBpZGVudGljYWwgc2hhcGVzLilcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogTmdSZWR1eDxhbnk+KSB7fVxuXG4gIGdldFN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFN0YXRlKCk7XG4gIH1cblxuICBzdWJzY3JpYmUoZm46IChzdGF0ZTogYW55KSA9PiB2b2lkKTogVW5zdWJzY3JpYmUge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnN1YnNjcmliZSgoKSA9PiBmbih0aGlzLmdldFN0YXRlKCkpKTtcbiAgfVxuXG4gIHZhbHVlQ2hhbmdlZDxUPihwYXRoOiBzdHJpbmdbXSwgZm9ybTogTmdGb3JtLCB2YWx1ZTogVCkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogRk9STV9DSEFOR0VELFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBwYXRoLFxuICAgICAgICBmb3JtLFxuICAgICAgICB2YWxpZDogZm9ybS52YWxpZCA9PT0gdHJ1ZSxcbiAgICAgICAgdmFsdWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRm9ybUV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobXNnOiBzdHJpbmcpIHtcbiAgICBzdXBlcihtc2cpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJdGVyYWJsZSwgTWFwIGFzIEltbXV0YWJsZU1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmltcG9ydCB7IEZvcm1FeGNlcHRpb24gfSBmcm9tICcuL2Zvcm0tZXhjZXB0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBPcGVyYXRpb25zPFQ+IHtcbiAgLy8vIFNoYWxsb3cgY2xvbmUgdGhlIG9iamVjdFxuICBjbG9uZSgpOiBUO1xuXG4gIC8vLyBDbG9uZSBhbmQgbWVyZ2VcbiAgbWVyZ2Uoa2V5OiBudW1iZXIgfCBzdHJpbmcgfCBudWxsLCB2YWx1ZTogVCk6IGFueTtcblxuICAvLy8gQ2xvbmUgdGhlIG9iamVjdCBhbmQgdXBkYXRlIGEgc3BlY2lmaWMga2V5IGluc2lkZSBvZiBpdFxuICB1cGRhdGUoa2V5OiBudW1iZXIgfCBzdHJpbmcgfCBudWxsLCB2YWx1ZTogVCk6IGFueTtcbn1cblxuZXhwb3J0IHR5cGUgVHJhdmVyc2VDYWxsYmFjayA9IChcbiAgcGFyZW50OiBhbnksXG4gIGtleTogbnVtYmVyIHwgc3RyaW5nLFxuICByZW1haW5pbmdQYXRoOiBzdHJpbmdbXSxcbiAgdmFsdWU/OiBhbnksXG4pID0+IGFueTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0YXRlIHtcbiAgc3RhdGljIHRyYXZlcnNlPFN0YXRlVHlwZT4oXG4gICAgc3RhdGU6IFN0YXRlVHlwZSxcbiAgICBwYXRoOiBzdHJpbmdbXSxcbiAgICBmbj86IFRyYXZlcnNlQ2FsbGJhY2ssXG4gICkge1xuICAgIGxldCBkZWVwVmFsdWUgPSBzdGF0ZTtcblxuICAgIGZvciAoY29uc3QgayBvZiBwYXRoKSB7XG4gICAgICBjb25zdCBwYXJlbnQgPSBkZWVwVmFsdWU7XG5cbiAgICAgIGlmIChJdGVyYWJsZS5pc0l0ZXJhYmxlKGRlZXBWYWx1ZSkpIHtcbiAgICAgICAgY29uc3QgbSA9IChkZWVwVmFsdWUgYXMgYW55KSBhcyBJbW11dGFibGVNYXA8c3RyaW5nLCBhbnk+O1xuICAgICAgICBpZiAodHlwZW9mIG0uZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZGVlcFZhbHVlID0gbS5nZXQoayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEZvcm1FeGNlcHRpb24oXG4gICAgICAgICAgICBgQ2Fubm90IHJldHJpZXZlIHZhbHVlIGZyb20gaW1tdXRhYmxlIG5vbmFzc29jaWF0aXZlIGNvbnRhaW5lcjogJHtrfWAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChkZWVwVmFsdWUgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgZGVlcFZhbHVlID0gKChkZWVwVmFsdWUgYXMgYW55KSBhcyBNYXA8c3RyaW5nLCBhbnk+KS5nZXQoayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWVwVmFsdWUgPSAoZGVlcFZhbHVlIGFzIGFueSlba107XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtZWQgPSBmbihcbiAgICAgICAgICBwYXJlbnQsXG4gICAgICAgICAgayxcbiAgICAgICAgICBwYXRoLnNsaWNlKHBhdGguaW5kZXhPZihrKSArIDEpLFxuICAgICAgICAgIGRlZXBWYWx1ZSxcbiAgICAgICAgKTtcblxuICAgICAgICBkZWVwVmFsdWUgPSB0cmFuc2Zvcm1lZFtrXTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKHBhcmVudCwgdHJhbnNmb3JtZWQpO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB3ZSB3ZXJlIG5vdCBhYmxlIHRvIGZpbmQgdGhpcyBzdGF0ZSBpbnNpZGUgb2Ygb3VyIHJvb3Qgc3RhdGVcbiAgICAgIC8vIHN0cnVjdHVyZSwgdGhlbiB3ZSByZXR1cm4gdW5kZWZpbmVkIC0tIG5vdCBudWxsIC0tIHRvIGluZGljYXRlIHRoYXRcbiAgICAgIC8vIHN0YXRlLiBCdXQgdGhpcyBjb3VsZCBiZSBhIHBlcmZlY3RseSBub3JtYWwgdXNlLWNhc2Ugc28gd2UgZG9uJ3RcbiAgICAgIC8vIHdhbnQgdG8gdGhyb3cgYW4gZXhjZXB0aW9uIG9yIGFueXRoaW5nIGFsb25nIHRob3NlIGxpbmVzLlxuICAgICAgaWYgKGRlZXBWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZXBWYWx1ZTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQ8U3RhdGVUeXBlPihzdGF0ZTogU3RhdGVUeXBlLCBwYXRoOiBzdHJpbmdbXSk6IGFueSB7XG4gICAgcmV0dXJuIFN0YXRlLnRyYXZlcnNlKHN0YXRlLCBwYXRoKTtcbiAgfVxuXG4gIHN0YXRpYyBhc3NpZ248U3RhdGVUeXBlPihzdGF0ZTogU3RhdGVUeXBlLCBwYXRoOiBzdHJpbmdbXSwgdmFsdWU/OiBhbnkpIHtcbiAgICBjb25zdCBvcGVyYXRpb25zID0gU3RhdGUuaW5zcGVjdChzdGF0ZSk7XG5cbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBvcGVyYXRpb25zLnVwZGF0ZShudWxsLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgY29uc3Qgcm9vdCA9IG9wZXJhdGlvbnMuY2xvbmUoKTtcblxuICAgIC8vIFdlIHdhbnQgdG8gc2hhbGxvdyBjbG9uZSB0aGUgb2JqZWN0LCBhbmQgdGhlbiB0cmFjZSBhIHBhdGggdG8gdGhlIHBsYWNlXG4gICAgLy8gd2Ugd2FudCB0byB1cGRhdGUsIGNsb25pbmcgZWFjaCBvYmplY3Qgd2UgdHJhdmVyc2VkIG9uIG91ciB3YXkgYW5kIHRoZW5cbiAgICAvLyBmaW5hbGx5IHVwZGF0aW5nIHRoZSB2YWx1ZSBvbiB0aGUgbGFzdCBwYXJlbnQgdG8gYmUgQHZhbHVlLiBUaGlzIHNlZW1zXG4gICAgLy8gdG8gb2ZmZXIgdGhlIGJlc3QgcGVyZm9ybWFuY2U6IHdlIGNhbiBzaGFsbG93IGNsb25lIGV2ZXJ5dGhpbmcgdGhhdCBoYXNcbiAgICAvLyBub3QgYmVlbiBtb2RpZmllZCwgYW5kIHtkZWVwIGNsb25lICsgdXBkYXRlfSB0aGUgcGF0aCBkb3duIHRvIHRoZSB2YWx1ZVxuICAgIC8vIHRoYXQgd2Ugd2lzaCB0byB1cGRhdGUuXG4gICAgU3RhdGUudHJhdmVyc2UoXG4gICAgICByb290LFxuICAgICAgcGF0aCxcbiAgICAgIChwYXJlbnQsIGtleTogbnVtYmVyIHwgc3RyaW5nLCByZW1haW5pbmdQYXRoOiBzdHJpbmdbXSwgaW5uZXJWYWx1ZT8pID0+IHtcbiAgICAgICAgY29uc3QgcGFyZW50T3BlcmF0aW9ucyA9IFN0YXRlLmluc3BlY3QocGFyZW50KTtcblxuICAgICAgICBpZiAoaW5uZXJWYWx1ZSkge1xuICAgICAgICAgIGNvbnN0IGlubmVyT3BlcmF0aW9ucyA9IFN0YXRlLmluc3BlY3QoaW5uZXJWYWx1ZSk7XG5cbiAgICAgICAgICByZXR1cm4gcGFyZW50T3BlcmF0aW9ucy51cGRhdGUoXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICByZW1haW5pbmdQYXRoLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgPyBpbm5lck9wZXJhdGlvbnMuY2xvbmUoKVxuICAgICAgICAgICAgICA6IGlubmVyT3BlcmF0aW9ucy5tZXJnZShudWxsLCB2YWx1ZSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBnZXRQcm9iYWJsZVR5cGUgPSAoc3RhdGVLZXk6IHN0cmluZyB8IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgLy8gTk9URShjYm9uZCk6IElmIHlvdXIgY29kZSBnZXRzIGhlcmUsIHlvdSBtaWdodCBub3QgYmUgdXNpbmcgdGhlIGxpYnJhcnlcbiAgICAgICAgICAgIC8vLyBjb3JyZWN0bHkuIElmIHlvdSBhcmUgYXNzaWduaW5nIGludG8gYSBwYXRoIGluIHlvdXIgc3RhdGUsIHRyeSB0b1xuICAgICAgICAgICAgLy8vIGVuc3VyZSB0aGF0IHRoZXJlIGlzIGEgcGF0aCB0byB0cmF2ZXJzZSwgZXZlbiBpZiBldmVyeXRoaW5nIGlzIGp1c3RcbiAgICAgICAgICAgIC8vLyBlbXB0eSBvYmplY3RzIGFuZCBhcnJheXMuIElmIHdlIGhhdmUgdG8gZ3Vlc3MgdGhlIHR5cGUgb2YgdGhlIGNvbnRhaW5lcnNcbiAgICAgICAgICAgIC8vLyBhbmQgdGhlbiBjcmVhdGUgdGhlbSBvdXJzZWx2ZXMsIHdlIG1heSBub3QgZ2V0IHRoZSB0eXBlcyByaWdodC4gVXNlXG4gICAgICAgICAgICAvLy8gdGhlIFJlZHV4IGBpbml0aWFsIHN0YXRlJyBjb25zdHJ1Y3QgdG8gcmVzb2x2ZSB0aGlzIGlzc3VlIGlmIHlvdSBsaWtlLlxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBzdGF0ZUtleSA9PT0gJ251bWJlcidcbiAgICAgICAgICAgICAgPyBuZXcgQXJyYXkoKVxuICAgICAgICAgICAgICA6IEFycmF5LmlzQXJyYXkoc3RhdGVLZXkpXG4gICAgICAgICAgICAgICAgPyBJbW11dGFibGVNYXAoKVxuICAgICAgICAgICAgICAgIDogbmV3IE9iamVjdCgpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZXR1cm4gcGFyZW50T3BlcmF0aW9ucy51cGRhdGUoXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICByZW1haW5pbmdQYXRoLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgPyBnZXRQcm9iYWJsZVR5cGUocmVtYWluaW5nUGF0aFswXSlcbiAgICAgICAgICAgICAgOiB2YWx1ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG5cbiAgICByZXR1cm4gcm9vdDtcbiAgfVxuXG4gIHN0YXRpYyBpbnNwZWN0PEs+KG9iamVjdDogSyk6IE9wZXJhdGlvbnM8Sz4ge1xuICAgIGNvbnN0IG1ldGFPcGVyYXRpb25zID0gKFxuICAgICAgLy8gVE9ETzogV3JpdGUgcHJvcGVyIHR5cGUgZGVjbGFyYXRpb25zIGZvciBmb2xsb3dpbmcgRnVuY3Rpb24gdHlwZXNcbiAgICAgIHVwZGF0ZTogRnVuY3Rpb24sXG4gICAgICBtZXJnZTogRnVuY3Rpb24sXG4gICAgICBjbG9uZT86IEZ1bmN0aW9uLFxuICAgICkgPT4ge1xuICAgICAgY29uc3Qgb3BlcmF0aW9ucyA9IHtcbiAgICAgICAgLy8vIENsb25lIHRoZSBvYmplY3QgKHNoYWxsb3cpXG4gICAgICAgIGNsb25lOlxuICAgICAgICAgIHR5cGVvZiBjbG9uZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyAoKSA9PiBjbG9uZShvYmplY3QgYXMgYW55KSBhcyBhbnlcbiAgICAgICAgICAgIDogKCkgPT4gb2JqZWN0LFxuXG4gICAgICAgIC8vLyBVcGRhdGUgYSBzcGVjaWZpYyBrZXkgaW5zaWRlIG9mIHRoZSBjb250YWluZXIgb2JqZWN0XG4gICAgICAgIHVwZGF0ZTogKGtleTogc3RyaW5nLCB2YWx1ZTogSykgPT5cbiAgICAgICAgICB1cGRhdGUob3BlcmF0aW9ucy5jbG9uZSgpLCBrZXksIHZhbHVlKSxcblxuICAgICAgICAvLy8gTWVyZ2UgZXhpc3RpbmcgdmFsdWVzIHdpdGggbmV3IHZhbHVlc1xuICAgICAgICBtZXJnZTogKGtleTogc3RyaW5nLCB2YWx1ZTogSykgPT4ge1xuICAgICAgICAgIGNvbnN0IGNsb25lZCA9IG9wZXJhdGlvbnMuY2xvbmUoKTtcbiAgICAgICAgICByZXR1cm4gbWVyZ2UoY2xvbmVkLCBrZXksIHZhbHVlLCAodjogYW55KSA9PiB1cGRhdGUoY2xvbmVkLCBrZXksIHYpKTtcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBvcGVyYXRpb25zO1xuICAgIH07XG5cbiAgICBpZiAoSXRlcmFibGUuaXNJdGVyYWJsZShvYmplY3QpKSB7XG4gICAgICByZXR1cm4gbWV0YU9wZXJhdGlvbnMoXG4gICAgICAgIC8vIFJlcGxhY2VcbiAgICAgICAgKHBhcmVudDogYW55LCBrZXk6IG51bWJlciB8IHN0cmluZywgdmFsdWU6IEspID0+IHtcbiAgICAgICAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvLyBNZXJnZVxuICAgICAgICAocGFyZW50OiBhbnksIGtleTogbnVtYmVyIHwgc3RyaW5nIHwgc3RyaW5nW10sIHZhbHVlOiBLKSA9PiB7XG4gICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5tZXJnZURlZXBJbihBcnJheS5pc0FycmF5KGtleSkgPyBrZXkgOiBba2V5XSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoSW1tdXRhYmxlTWFwLmlzTWFwKHZhbHVlKSkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyZW50Lm1lcmdlRGVlcCh2YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyZW50LmNvbmNhdCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgcmV0dXJuIG1ldGFPcGVyYXRpb25zKFxuICAgICAgICAvLyBSZXBsYWNlIGFycmF5IGNvbnRlbnRzXG4gICAgICAgIChwYXJlbnQ6IGFueSwga2V5OiBudW1iZXIsIHZhbHVlOiBLKSA9PiB7XG4gICAgICAgICAgaWYgKGtleSAhPSBudWxsKSB7XG4gICAgICAgICAgICBwYXJlbnRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnQuc3BsaWNlLmFwcGx5KFxuICAgICAgICAgICAgICBwYXJlbnQsXG4gICAgICAgICAgICAgIFswLCBwYXJlbnQubGVuZ3RoXS5jb25jYXQoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV0pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gTWVyZ2VcbiAgICAgICAgKHBhcmVudDogYW55LCBfOiBhbnksIHZhbHVlOiBLLCBzZXR0ZXI6ICh2OiBLKSA9PiBLKSA9PiB7XG4gICAgICAgICAgc2V0dGVyKHBhcmVudC5jb25jYXQodmFsdWUpKTtcbiAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIENsb25lXG4gICAgICAgICgpID0+IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG9iamVjdCwgMCksXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAob2JqZWN0IGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICByZXR1cm4gbWV0YU9wZXJhdGlvbnMoXG4gICAgICAgIC8vIFVwZGF0ZSBtYXAga2V5XG4gICAgICAgIChwYXJlbnQ6IGFueSwga2V5OiBudW1iZXIgfCBzdHJpbmcsIHZhbHVlOiBLKSA9PiB7XG4gICAgICAgICAgaWYgKGtleSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50LnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbSA9IG5ldyBNYXAodmFsdWUgYXMgYW55KTtcbiAgICAgICAgICAgIHBhcmVudC5jbGVhcigpO1xuICAgICAgICAgICAgbS5mb3JFYWNoKChtYXBWYWx1ZSwgaW5kZXgpID0+IHBhcmVudC5zZXQoaW5kZXgsIG1hcFZhbHVlKSk7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBNZXJnZVxuICAgICAgICAocGFyZW50OiBNYXA8c3RyaW5nLCBhbnk+LCBfOiBhbnksIHZhbHVlOiBLKSA9PiB7XG4gICAgICAgICAgY29uc3QgbSA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KHZhbHVlIGFzIGFueSk7XG4gICAgICAgICAgbS5mb3JFYWNoKChtYXBWYWx1ZSwga2V5KSA9PiBwYXJlbnQuc2V0KGtleSwgbWFwVmFsdWUpKTtcbiAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIENsb25lXG4gICAgICAgICgpID0+XG4gICAgICAgICAgb2JqZWN0IGluc3RhbmNlb2YgV2Vha01hcFxuICAgICAgICAgICAgPyBuZXcgV2Vha01hcDxvYmplY3QsIGFueT4ob2JqZWN0IGFzIGFueSlcbiAgICAgICAgICAgIDogbmV3IE1hcDxzdHJpbmcsIGFueT4ob2JqZWN0IGFzIGFueSksXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAob2JqZWN0IGluc3RhbmNlb2YgV2Vha1NldCB8fCBvYmplY3QgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgIHJldHVybiBtZXRhT3BlcmF0aW9ucyhcbiAgICAgICAgLy8gVXBkYXRlIGVsZW1lbnQgYXQgaW5kZXggaW4gc2V0XG4gICAgICAgIChwYXJlbnQ6IGFueSwga2V5OiBudW1iZXIsIHZhbHVlOiBLKSA9PiB7XG4gICAgICAgICAgaWYgKGtleSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50LnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcyA9IG5ldyBTZXQodmFsdWUgYXMgYW55KTtcbiAgICAgICAgICAgIHMuZm9yRWFjaCgoc2V0VmFsdWUsIGluZGV4KSA9PiBwYXJlbnQuc2V0KGluZGV4LCBzZXRWYWx1ZSkpO1xuICAgICAgICAgICAgcy5jbGVhcigpO1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gTWVyZ2VcbiAgICAgICAgKHBhcmVudDogU2V0PGFueT4sIF86IGFueSwgdmFsdWU6IGFueSkgPT4ge1xuICAgICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgcGFyZW50LmFkZChlbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBDbG9uZVxuICAgICAgICAoKSA9PlxuICAgICAgICAgIG9iamVjdCBpbnN0YW5jZW9mIFdlYWtTZXRcbiAgICAgICAgICAgID8gbmV3IFdlYWtTZXQ8YW55PihvYmplY3QgYXMgYW55KVxuICAgICAgICAgICAgOiBuZXcgU2V0PGFueT4ob2JqZWN0IGFzIGFueSksXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAob2JqZWN0IGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgdGhyb3cgbmV3IEZvcm1FeGNlcHRpb24oXG4gICAgICAgICdDYW5ub3QgdW5kZXJzdGFuZCB3aHkgYSBEYXRlIG9iamVjdCBhcHBlYXJzIGluIHRoZSBtdXRhdGlvbiBwYXRoIScsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKHR5cGVvZiBvYmplY3QpIHtcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgY2FzZSAnc3ltYm9sJzpcbiAgICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWV0YU9wZXJhdGlvbnMoXG4gICAgICAgICAgICAocGFyZW50OiBhbnksIGtleTogYW55LCB2YWx1ZTogSykgPT4ge1xuICAgICAgICAgICAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyAuLi5wYXJlbnQsIFtrZXldOiB2YWx1ZSB9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB7IC4uLnBhcmVudCwgLi4uKHZhbHVlIGFzIGFueSkgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAocGFyZW50OiBhbnksIF86IGFueSwgdmFsdWU6IEspID0+IHtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBrIG9mIE9iamVjdC5rZXlzKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHBhcmVudFtrXSA9ICh2YWx1ZSBhcyBhbnkpW2tdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4gKHsgLi4uKG9iamVjdCBhcyBhbnkpIH0pLFxuICAgICAgICAgICk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYEFuIG9iamVjdCBvZiB0eXBlICR7dHlwZW9mIG9iamVjdH0gaGFzIGFwcGVhcmVkIGluIHRoZSBtdXRhdGlvbiBwYXRoISBFdmVyeSBlbGVtZW50IGAgK1xuICAgICAgICAnaW4gdGhlIG11dGF0aW9uIHBhdGggc2hvdWxkIGJlIGFuIGFycmF5LCBhbiBhc3NvY2lhdGl2ZSBjb250YWluZXIsIG9yIGEgc2V0JyxcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIGVtcHR5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdmFsdWUgPT0gbnVsbCB8fFxuICAgICAgKHZhbHVlLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAodHlwZW9mIHZhbHVlLmxlbmd0aCA9PT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoID09PSAwKSlcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJdGVyYWJsZSB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IHsgRk9STV9DSEFOR0VEIH0gZnJvbSAnLi9mb3JtLXN0b3JlJztcblxuaW1wb3J0IHsgU3RhdGUgfSBmcm9tICcuL3N0YXRlJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRGb3JtUmVkdWNlciA9IDxSb290U3RhdGU+KFxuICBpbml0aWFsU3RhdGU/OiBSb290U3RhdGUgfCBJdGVyYWJsZS5LZXllZDxzdHJpbmcsIGFueT4sXG4pID0+IHtcbiAgY29uc3QgcmVkdWNlciA9IChcbiAgICBzdGF0ZTogUm9vdFN0YXRlIHwgSXRlcmFibGUuS2V5ZWQ8c3RyaW5nLCBhbnk+IHwgdW5kZWZpbmVkID0gaW5pdGlhbFN0YXRlLFxuICAgIGFjdGlvbjogQWN0aW9uICYgeyBwYXlsb2FkPzogYW55IH0sXG4gICkgPT4ge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgRk9STV9DSEFOR0VEOlxuICAgICAgICByZXR1cm4gU3RhdGUuYXNzaWduKHN0YXRlLCBhY3Rpb24ucGF5bG9hZC5wYXRoLCBhY3Rpb24ucGF5bG9hZC52YWx1ZSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiByZWR1Y2VyO1xufTtcbiIsImltcG9ydCB7IEFjdGlvbiwgU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7IEFic3RyYWN0U3RvcmUsIEZvcm1TdG9yZSB9IGZyb20gJy4vZm9ybS1zdG9yZSc7XG5cbi8vLyBVc2UgdGhpcyBmdW5jdGlvbiBpbiB5b3VyIHByb3ZpZGVycyBsaXN0IGlmIHlvdSBhcmUgbm90IHVzaW5nIEBhbmd1bGFyLXJlZHV4L2NvcmUuXG4vLy8gVGhpcyB3aWxsIGFsbG93IHlvdSB0byBwcm92aWRlIGEgcHJlZXhpc3Rpbmcgc3RvcmUgdGhhdCB5b3UgaGF2ZSBhbHJlYWR5XG4vLy8gY29uZmlndXJlZCwgcmF0aGVyIHRoYW4gbGV0dGluZyBAYW5ndWxhci1yZWR1eC9jb3JlIGNyZWF0ZSBvbmUgZm9yIHlvdS5cbmV4cG9ydCBjb25zdCBwcm92aWRlUmVkdXhGb3JtcyA9IDxUPihzdG9yZTogU3RvcmU8VD4gfCBhbnkpID0+IHtcbiAgY29uc3QgYWJzdHJhY3RTdG9yZSA9IHdyYXAoc3RvcmUpO1xuXG4gIHJldHVybiBbXG4gICAgeyBwcm92aWRlOiBGb3JtU3RvcmUsIHVzZVZhbHVlOiBuZXcgRm9ybVN0b3JlKGFic3RyYWN0U3RvcmUgYXMgYW55KSB9LFxuICBdO1xufTtcblxuY29uc3Qgd3JhcCA9IDxUPihzdG9yZTogU3RvcmU8VD4gfCBhbnkpOiBBYnN0cmFjdFN0b3JlPFQ+ID0+IHtcbiAgY29uc3QgZGlzcGF0Y2ggPSAoYWN0aW9uOiBBY3Rpb24pID0+IHN0b3JlLmRpc3BhdGNoKGFjdGlvbik7XG5cbiAgY29uc3QgZ2V0U3RhdGUgPSAoKSA9PiBzdG9yZS5nZXRTdGF0ZSgpIGFzIFQ7XG5cbiAgY29uc3Qgc3Vic2NyaWJlID0gKGZuOiAoc3RhdGU6IFQpID0+IHZvaWQpID0+XG4gICAgc3RvcmUuc3Vic2NyaWJlKCgpID0+IGZuKHN0b3JlLmdldFN0YXRlKCkpKTtcblxuICByZXR1cm4geyBkaXNwYXRjaCwgZ2V0U3RhdGUsIHN1YnNjcmliZSB9O1xufTtcbiIsImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgQWJzdHJhY3RDb250cm9sLFxuICBGb3JtQXJyYXksXG4gIEZvcm1Db250cm9sLFxuICBGb3JtR3JvdXAsXG4gIE5nQ29udHJvbCxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgVW5zdWJzY3JpYmUgfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRm9ybVN0b3JlIH0gZnJvbSAnLi4vZm9ybS1zdG9yZSc7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4uL3N0YXRlJztcblxuZXhwb3J0IGludGVyZmFjZSBDb250cm9sUGFpciB7XG4gIHBhdGg6IHN0cmluZ1tdO1xuICBjb250cm9sOiBBYnN0cmFjdENvbnRyb2w7XG59XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0QmFzZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIGdldCBwYXRoKCk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBwYXRoID1cbiAgICAgIHR5cGVvZiB0aGlzLmNvbm5lY3QgPT09ICdmdW5jdGlvbicgPyB0aGlzLmNvbm5lY3QoKSA6IHRoaXMuY29ubmVjdDtcblxuICAgIHN3aXRjaCAodHlwZW9mIHBhdGgpIHtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChTdGF0ZS5lbXB0eShwYXRoKSkge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXRoKSkge1xuICAgICAgICAgIHJldHVybiBwYXRoIGFzIHN0cmluZ1tdO1xuICAgICAgICB9XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICByZXR1cm4gKHBhdGggYXMgc3RyaW5nKS5zcGxpdCgvXFwuL2cpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gZmFsbHRocm91Z2ggYWJvdmUgKG5vIGJyZWFrKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYENhbm5vdCBkZXRlcm1pbmUgcGF0aCB0byBvYmplY3Q6ICR7SlNPTi5zdHJpbmdpZnkocGF0aCl9YCxcbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbiAgQElucHV0KCkgY29ubmVjdD86ICgpID0+IChzdHJpbmcgfCBudW1iZXIpIHwgKHN0cmluZyB8IG51bWJlcilbXTtcbiAgcHJvdGVjdGVkIHN0b3JlPzogRm9ybVN0b3JlO1xuICBwcm90ZWN0ZWQgZm9ybTogYW55O1xuICBwcml2YXRlIHN0YXRlU3Vic2NyaXB0aW9uPzogVW5zdWJzY3JpYmU7XG5cbiAgcHJpdmF0ZSBmb3JtU3Vic2NyaXB0aW9uPzogU3Vic2NyaXB0aW9uO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmZvcm1TdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuZm9ybVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbigpOyAvLyB1bnN1YnNjcmliZVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMucmVzZXRTdGF0ZSgpO1xuXG4gICAgICBpZiAodGhpcy5zdG9yZSkge1xuICAgICAgICB0aGlzLnN0YXRlU3Vic2NyaXB0aW9uID0gdGhpcy5zdG9yZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZXNldFN0YXRlKCkpO1xuICAgICAgfVxuXG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5mb3JtU3Vic2NyaXB0aW9uID0gKHRoaXMuZm9ybS52YWx1ZUNoYW5nZXMgYXMgYW55KVxuICAgICAgICAgIC5waXBlKGRlYm91bmNlVGltZSgwKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCh2YWx1ZXM6IGFueSkgPT4gdGhpcy5wdWJsaXNoKHZhbHVlcykpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRlc2NlbmRhbnRzKHBhdGg6IHN0cmluZ1tdLCBmb3JtRWxlbWVudDogYW55KTogQ29udHJvbFBhaXJbXSB7XG4gICAgY29uc3QgcGFpcnMgPSBuZXcgQXJyYXk8Q29udHJvbFBhaXI+KCk7XG5cbiAgICBpZiAoZm9ybUVsZW1lbnQgaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHtcbiAgICAgIGZvcm1FbGVtZW50LmNvbnRyb2xzLmZvckVhY2goKGMsIGluZGV4KSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgZCBvZiB0aGlzLmRlc2NlbmRhbnRzKChwYXRoIGFzIGFueSkuY29uY2F0KFtpbmRleF0pLCBjKSkge1xuICAgICAgICAgIHBhaXJzLnB1c2goZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoZm9ybUVsZW1lbnQgaW5zdGFuY2VvZiBGb3JtR3JvdXApIHtcbiAgICAgIGZvciAoY29uc3QgayBvZiBPYmplY3Qua2V5cyhmb3JtRWxlbWVudC5jb250cm9scykpIHtcbiAgICAgICAgcGFpcnMucHVzaCh7XG4gICAgICAgICAgcGF0aDogcGF0aC5jb25jYXQoW2tdKSxcbiAgICAgICAgICBjb250cm9sOiBmb3JtRWxlbWVudC5jb250cm9sc1trXSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGZvcm1FbGVtZW50IGluc3RhbmNlb2YgTmdDb250cm9sIHx8XG4gICAgICBmb3JtRWxlbWVudCBpbnN0YW5jZW9mIEZvcm1Db250cm9sXG4gICAgKSB7XG4gICAgICByZXR1cm4gW3sgcGF0aCwgY29udHJvbDogZm9ybUVsZW1lbnQgYXMgYW55IH1dO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBVbmtub3duIHR5cGUgb2YgZm9ybSBlbGVtZW50OiAke2Zvcm1FbGVtZW50LmNvbnN0cnVjdG9yLm5hbWV9YCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhaXJzLmZpbHRlcihwID0+IHtcbiAgICAgIGNvbnN0IHBhcmVudCA9IChwLmNvbnRyb2wgYXMgYW55KS5fcGFyZW50O1xuICAgICAgcmV0dXJuIHBhcmVudCA9PT0gdGhpcy5mb3JtLmNvbnRyb2wgfHwgcGFyZW50ID09PSB0aGlzLmZvcm07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0U3RhdGUoKSB7XG4gICAgY29uc3QgZm9ybUVsZW1lbnQgPVxuICAgICAgdGhpcy5mb3JtLmNvbnRyb2wgPT09IHVuZGVmaW5lZCA/IHRoaXMuZm9ybSA6IHRoaXMuZm9ybS5jb250cm9sO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmRlc2NlbmRhbnRzKFtdLCBmb3JtRWxlbWVudCk7XG5cbiAgICBjaGlsZHJlbi5mb3JFYWNoKGMgPT4ge1xuICAgICAgY29uc3QgeyBwYXRoLCBjb250cm9sIH0gPSBjO1xuXG4gICAgICBjb25zdCB2YWx1ZSA9IFN0YXRlLmdldCh0aGlzLmdldFN0YXRlKCksIHRoaXMucGF0aC5jb25jYXQocGF0aCkpO1xuXG4gICAgICBpZiAoY29udHJvbC52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgY29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHB1Ymxpc2godmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLnN0b3JlKSB7XG4gICAgICB0aGlzLnN0b3JlLnZhbHVlQ2hhbmdlZCh0aGlzLnBhdGgsIHRoaXMuZm9ybSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0U3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuc3RvcmUpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFN0YXRlKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZvcm1TdG9yZSB9IGZyb20gJy4uL2Zvcm0tc3RvcmUnO1xuXG5pbXBvcnQgeyBDb25uZWN0QmFzZSB9IGZyb20gJy4vY29ubmVjdC1iYXNlJztcblxuLy8gRm9yIHJlYWN0aXZlIGZvcm1zICh3aXRob3V0IGltcGxpY2l0IE5nRm9ybSlcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ2Zvcm1bY29ubmVjdF1bZm9ybUdyb3VwXScgfSlcbmV4cG9ydCBjbGFzcyBSZWFjdGl2ZUNvbm5lY3REaXJlY3RpdmUgZXh0ZW5kcyBDb25uZWN0QmFzZSB7XG4gIEBJbnB1dCgpIGZvcm1Hcm91cDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzdG9yZTogRm9ybVN0b3JlKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgRm9ybVN0b3JlIH0gZnJvbSAnLi4vZm9ybS1zdG9yZSc7XG5pbXBvcnQgeyBDb25uZWN0QmFzZSB9IGZyb20gJy4vY29ubmVjdC1iYXNlJztcblxuLy8gRm9yIHRlbXBsYXRlIGZvcm1zICh3aXRoIGltcGxpY2l0IE5nRm9ybSlcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ2Zvcm1bY29ubmVjdF06bm90KFtmb3JtR3JvdXBdKScgfSlcbmV4cG9ydCBjbGFzcyBDb25uZWN0RGlyZWN0aXZlIGV4dGVuZHMgQ29ubmVjdEJhc2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgc3RvcmU6IEZvcm1TdG9yZSwgcHJvdGVjdGVkIGZvcm06IE5nRm9ybSkge1xuICAgIHN1cGVyKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbm5lY3REaXJlY3RpdmUgfSBmcm9tICcuL2Nvbm5lY3QnO1xuaW1wb3J0IHsgUmVhY3RpdmVDb25uZWN0RGlyZWN0aXZlIH0gZnJvbSAnLi9jb25uZWN0LXJlYWN0aXZlJztcblxuY29uc3QgZGVjbGFyYXRpb25zID0gW0Nvbm5lY3REaXJlY3RpdmUsIFJlYWN0aXZlQ29ubmVjdERpcmVjdGl2ZV07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogWy4uLmRlY2xhcmF0aW9uc10sXG4gIGV4cG9ydHM6IFsuLi5kZWNsYXJhdGlvbnNdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ1JlZHV4Rm9ybUNvbm5lY3RNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIENoZWNrYm94Q29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIENvbnRyb2xDb250YWluZXIsXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgU2VsZWN0TXVsdGlwbGVDb250cm9sVmFsdWVBY2Nlc3Nvcixcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udHJvbFBhdGgobmFtZTogc3RyaW5nLCBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIpOiBzdHJpbmdbXSB7XG4gIHJldHVybiBbLi4uKHBhcmVudC5wYXRoIHx8IFtdKSwgbmFtZV07XG59XG5cbmNvbnN0IEJVSUxUSU5fQUNDRVNTT1JTID0gW1xuICBDaGVja2JveENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgU2VsZWN0TXVsdGlwbGVDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgUmFkaW9Db250cm9sVmFsdWVBY2Nlc3Nvcixcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0J1aWx0SW5BY2Nlc3NvcihcbiAgdmFsdWVBY2Nlc3NvcjogQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIEJVSUxUSU5fQUNDRVNTT1JTLnNvbWUoYSA9PiB2YWx1ZUFjY2Vzc29yLmNvbnN0cnVjdG9yID09PSBhKTtcbn1cbiIsImV4cG9ydCBjbGFzcyBDb25uZWN0QXJyYXlUZW1wbGF0ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyAkaW1wbGljaXQ6IGFueSwgcHVibGljIGluZGV4OiBudW1iZXIsIHB1YmxpYyBpdGVtOiBhbnkpIHt9XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdCxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBTZWxmLFxuICBTa2lwU2VsZixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWJzdHJhY3RDb250cm9sLFxuICBBc3luY1ZhbGlkYXRvckZuLFxuICBDb250cm9sQ29udGFpbmVyLFxuICBGb3JtQXJyYXksXG4gIEZvcm1Db250cm9sLFxuICBGb3JtR3JvdXAsXG4gIEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgTkdfQVNZTkNfVkFMSURBVE9SUyxcbiAgTkdfVkFMSURBVE9SUyxcbiAgTmdNb2RlbEdyb3VwLFxuICBWYWxpZGF0b3JGbixcbiAgVmFsaWRhdG9ycyxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVW5zdWJzY3JpYmUgfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7IENvbm5lY3RCYXNlIH0gZnJvbSAnLi4vY29ubmVjdCc7XG5pbXBvcnQgeyBGb3JtU3RvcmUgfSBmcm9tICcuLi9mb3JtLXN0b3JlJztcbmltcG9ydCB7IGNvbnRyb2xQYXRoIH0gZnJvbSAnLi4vc2hpbXMnO1xuaW1wb3J0IHsgU3RhdGUgfSBmcm9tICcuLi9zdGF0ZSc7XG5pbXBvcnQgeyBDb25uZWN0QXJyYXlUZW1wbGF0ZSB9IGZyb20gJy4vY29ubmVjdC1hcnJheS10ZW1wbGF0ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjb25uZWN0QXJyYXldJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQ29udHJvbENvbnRhaW5lcixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENvbm5lY3RBcnJheURpcmVjdGl2ZSksXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29ubmVjdEFycmF5RGlyZWN0aXZlIGV4dGVuZHMgQ29udHJvbENvbnRhaW5lclxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdGF0ZVN1YnNjcmlwdGlvbjogVW5zdWJzY3JpYmU7XG5cbiAgcHJpdmF0ZSBhcnJheSA9IG5ldyBGb3JtQXJyYXkoW10pO1xuXG4gIHByaXZhdGUga2V5Pzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEhvc3QoKVxuICAgIEBTa2lwU2VsZigpXG4gICAgcHJpdmF0ZSBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIsXG4gICAgQE9wdGlvbmFsKClcbiAgICBAU2VsZigpXG4gICAgQEluamVjdChOR19WQUxJREFUT1JTKVxuICAgIHByaXZhdGUgcmF3VmFsaWRhdG9yczogYW55W10sXG4gICAgQE9wdGlvbmFsKClcbiAgICBAU2VsZigpXG4gICAgQEluamVjdChOR19BU1lOQ19WQUxJREFUT1JTKVxuICAgIHByaXZhdGUgcmF3QXN5bmNWYWxpZGF0b3JzOiBhbnlbXSxcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3RCYXNlLFxuICAgIHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgc3RvcmU6IEZvcm1TdG9yZSxcbiAgKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24gPSB0aGlzLnN0b3JlLnN1YnNjcmliZShzdGF0ZSA9PlxuICAgICAgdGhpcy5yZXNldFN0YXRlKHN0YXRlKSxcbiAgICApO1xuXG4gICAgdGhpcy5yZWdpc3RlckludGVybmFscyh0aGlzLmFycmF5KTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBjb25uZWN0QXJyYXlPZihjb2xsZWN0aW9uOiBhbnkpIHtcbiAgICB0aGlzLmtleSA9IGNvbGxlY3Rpb247XG5cbiAgICB0aGlzLnJlc2V0U3RhdGUodGhpcy5zdG9yZS5nZXRTdGF0ZSgpKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9ybURpcmVjdGl2ZS5hZGRDb250cm9sKHRoaXMgYXMgYW55KTtcbiAgfVxuXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMua2V5IHx8ICcnO1xuICB9XG5cbiAgZ2V0IGNvbnRyb2woKTogRm9ybUFycmF5IHtcbiAgICByZXR1cm4gdGhpcy5hcnJheTtcbiAgfVxuXG4gIGdldCBmb3JtRGlyZWN0aXZlKCk6IEZvcm1Hcm91cERpcmVjdGl2ZSB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50LmZvcm1EaXJlY3RpdmUgYXMgRm9ybUdyb3VwRGlyZWN0aXZlO1xuICB9XG5cbiAgZ2V0IHBhdGgoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmtleSA/IGNvbnRyb2xQYXRoKHRoaXMua2V5LCB0aGlzLnBhcmVudCkgOiBbXTtcbiAgfVxuXG4gIGdldCB2YWxpZGF0b3IoKTogVmFsaWRhdG9yRm4gfCBudWxsIHtcbiAgICByZXR1cm4gVmFsaWRhdG9ycy5jb21wb3NlKHRoaXMucmF3VmFsaWRhdG9ycyk7XG4gIH1cblxuICBnZXQgYXN5bmNWYWxpZGF0b3IoKTogQXN5bmNWYWxpZGF0b3JGbiB8IG51bGwge1xuICAgIHJldHVybiBWYWxpZGF0b3JzLmNvbXBvc2VBc3luYyh0aGlzLnJhd0FzeW5jVmFsaWRhdG9ycyk7XG4gIH1cblxuICB1cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCkge1xuICAgIC8vIHN0dWI/XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblxuICAgIGlmICh0aGlzLmtleSkge1xuICAgICAgdGhpcy5mb3JtRGlyZWN0aXZlLmZvcm0ucmVtb3ZlQ29udHJvbCh0aGlzLmtleSk7XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFN0YXRlKHN0YXRlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5rZXkgPT0gbnVsbCB8fCB0aGlzLmtleS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjsgLy8gbm8gc3RhdGUgdG8gcmV0cmVpdmUgaWYgbm8ga2V5IGlzIHNldFxuICAgIH1cblxuICAgIGNvbnN0IGl0ZXJhYmxlID0gU3RhdGUuZ2V0KHN0YXRlLCB0aGlzLmNvbm5lY3Rpb24ucGF0aC5jb25jYXQodGhpcy5wYXRoKSk7XG5cbiAgICBsZXQgaW5kZXggPSAwO1xuXG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBpdGVyYWJsZSkge1xuICAgICAgY29uc3Qgdmlld1JlZiA9XG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5sZW5ndGggPiBpbmRleFxuICAgICAgICAgID8gKHRoaXMudmlld0NvbnRhaW5lclJlZi5nZXQoaW5kZXgpIGFzIEVtYmVkZGVkVmlld1JlZjxcbiAgICAgICAgICAgICAgQ29ubmVjdEFycmF5VGVtcGxhdGVcbiAgICAgICAgICAgID4pXG4gICAgICAgICAgOiBudWxsO1xuXG4gICAgICBpZiAodmlld1JlZiA9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGVtYmVkZGVkVmlld1JlZiA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXc8XG4gICAgICAgICAgQ29ubmVjdEFycmF5VGVtcGxhdGVcbiAgICAgICAgPihcbiAgICAgICAgICB0aGlzLnRlbXBsYXRlUmVmLFxuICAgICAgICAgIG5ldyBDb25uZWN0QXJyYXlUZW1wbGF0ZShpbmRleCwgaW5kZXgsIHZhbHVlKSxcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnBhdGNoRGVzY2VuZGFudENvbnRyb2xzKGVtYmVkZGVkVmlld1JlZik7XG5cbiAgICAgICAgdGhpcy5hcnJheS5pbnNlcnQoXG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgdGhpcy50cmFuc2Zvcm0odGhpcy5hcnJheSwgZW1iZWRkZWRWaWV3UmVmLmNvbnRleHQuaXRlbSksXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIHZpZXdSZWYuY29udGV4dCxcbiAgICAgICAgICBuZXcgQ29ubmVjdEFycmF5VGVtcGxhdGUoaW5kZXgsIGluZGV4LCB2YWx1ZSksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgICsraW5kZXg7XG4gICAgfVxuXG4gICAgd2hpbGUgKHRoaXMudmlld0NvbnRhaW5lclJlZi5sZW5ndGggPiBpbmRleCkge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLnJlbW92ZSh0aGlzLnZpZXdDb250YWluZXJSZWYubGVuZ3RoIC0gMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3RlckludGVybmFscyhhcnJheTogYW55KSB7XG4gICAgYXJyYXkucmVnaXN0ZXJDb250cm9sID0gKCkgPT4gdW5kZWZpbmVkO1xuICAgIGFycmF5LnJlZ2lzdGVyT25DaGFuZ2UgPSAoKSA9PiB1bmRlZmluZWQ7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICBfcmF3VmFsaWRhdG9yczoge1xuICAgICAgICB2YWx1ZTogdGhpcy5yYXdWYWxpZGF0b3JzIHx8IFtdLFxuICAgICAgfSxcbiAgICAgIF9yYXdBc3luY1ZhbGlkYXRvcnM6IHtcbiAgICAgICAgdmFsdWU6IHRoaXMucmF3QXN5bmNWYWxpZGF0b3JzIHx8IFtdLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcGF0Y2hEZXNjZW5kYW50Q29udHJvbHModmlld1JlZjogYW55KSB7XG4gICAgY29uc3QgZ3JvdXBzID0gT2JqZWN0LmtleXModmlld1JlZi5fdmlldylcbiAgICAgIC5tYXAoayA9PiB2aWV3UmVmLl92aWV3W2tdKVxuICAgICAgLmZpbHRlcihjID0+IGMgaW5zdGFuY2VvZiBOZ01vZGVsR3JvdXApO1xuXG4gICAgZ3JvdXBzLmZvckVhY2goYyA9PiB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjLCB7XG4gICAgICAgIF9wYXJlbnQ6IHtcbiAgICAgICAgICB2YWx1ZTogdGhpcyxcbiAgICAgICAgfSxcbiAgICAgICAgX2NoZWNrUGFyZW50VHlwZToge1xuICAgICAgICAgIHZhbHVlOiAoKSA9PiB1bmRlZmluZWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNmb3JtKFxuICAgIHBhcmVudDogRm9ybUdyb3VwIHwgRm9ybUFycmF5LFxuICAgIHJlZmVyZW5jZTogYW55LFxuICApOiBBYnN0cmFjdENvbnRyb2wge1xuICAgIGNvbnN0IGVtcHR5Q29udHJvbCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wobnVsbCk7XG4gICAgICBjb250cm9sLnNldFBhcmVudChwYXJlbnQpO1xuICAgICAgcmV0dXJuIGNvbnRyb2w7XG4gICAgfTtcblxuICAgIGlmIChyZWZlcmVuY2UgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGVtcHR5Q29udHJvbCgpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVmZXJlbmNlLnRvSlMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlZmVyZW5jZSA9IHJlZmVyZW5jZS50b0pTKCk7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0eXBlb2YgcmVmZXJlbmNlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gZW1wdHlDb250cm9sKCk7XG4gICAgfVxuXG4gICAgY29uc3QgaXRlcmF0ZSA9IChpdGVyYWJsZTogYW55KTogRm9ybUFycmF5ID0+IHtcbiAgICAgIGNvbnN0IGFycmF5ID0gbmV3IEZvcm1BcnJheShbXSk7XG5cbiAgICAgIHRoaXMucmVnaXN0ZXJJbnRlcm5hbHMoYXJyYXkpO1xuXG4gICAgICBmb3IgKGxldCBpID0gYXJyYXkubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIGFycmF5LnJlbW92ZUF0KGkpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIGl0ZXJhYmxlKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkID0gdGhpcy50cmFuc2Zvcm0oYXJyYXksIHZhbHVlKTtcbiAgICAgICAgaWYgKHRyYW5zZm9ybWVkKSB7XG4gICAgICAgICAgYXJyYXkucHVzaCh0cmFuc2Zvcm1lZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH07XG5cbiAgICBjb25zdCBhc3NvY2lhdGUgPSAodmFsdWU6IGFueSk6IEZvcm1Hcm91cCA9PiB7XG4gICAgICBjb25zdCBncm91cCA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgICAgZ3JvdXAuc2V0UGFyZW50KHBhcmVudCk7XG5cbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHZhbHVlKSkge1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZCA9IHRoaXMudHJhbnNmb3JtKGdyb3VwLCB2YWx1ZVtrZXldKTtcbiAgICAgICAgaWYgKHRyYW5zZm9ybWVkKSB7XG4gICAgICAgICAgZ3JvdXAuYWRkQ29udHJvbChrZXksIHRyYW5zZm9ybWVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ3JvdXA7XG4gICAgfTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHJlZmVyZW5jZSkpIHtcbiAgICAgIHJldHVybiBpdGVyYXRlKHJlZmVyZW5jZSBhcyBhbnlbXSk7XG4gICAgfSBlbHNlIGlmIChyZWZlcmVuY2UgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgIHJldHVybiBpdGVyYXRlKHJlZmVyZW5jZSBhcyBTZXQ8YW55Pik7XG4gICAgfSBlbHNlIGlmIChyZWZlcmVuY2UgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgIHJldHVybiBhc3NvY2lhdGUocmVmZXJlbmNlIGFzIE1hcDxzdHJpbmcsIGFueT4pO1xuICAgIH0gZWxzZSBpZiAocmVmZXJlbmNlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICByZXR1cm4gYXNzb2NpYXRlKHJlZmVyZW5jZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYENhbm5vdCBjb252ZXJ0IG9iamVjdCBvZiB0eXBlICR7dHlwZW9mIHJlZmVyZW5jZX0gLyAke3JlZmVyZW5jZS50b1N0cmluZygpfSB0byBmb3JtIGVsZW1lbnRgLFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbm5lY3RBcnJheURpcmVjdGl2ZSB9IGZyb20gJy4vY29ubmVjdC1hcnJheSc7XG5cbmNvbnN0IGRlY2xhcmF0aW9ucyA9IFtDb25uZWN0QXJyYXlEaXJlY3RpdmVdO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFsuLi5kZWNsYXJhdGlvbnNdLFxuICBleHBvcnRzOiBbLi4uZGVjbGFyYXRpb25zXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdSZWR1eEZvcm1Db25uZWN0QXJyYXlNb2R1bGUge31cbiIsImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE5nUmVkdXhGb3JtQ29ubmVjdE1vZHVsZSB9IGZyb20gJy4vY29ubmVjdCc7XG5pbXBvcnQgeyBOZ1JlZHV4Rm9ybUNvbm5lY3RBcnJheU1vZHVsZSB9IGZyb20gJy4vY29ubmVjdC1hcnJheSc7XG5pbXBvcnQgeyBGb3JtU3RvcmUgfSBmcm9tICcuL2Zvcm0tc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZm9ybVN0b3JlRmFjdG9yeShuZ1JlZHV4OiBOZ1JlZHV4PGFueT4pIHtcbiAgcmV0dXJuIG5ldyBGb3JtU3RvcmUobmdSZWR1eCk7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE5nUmVkdXhGb3JtQ29ubmVjdE1vZHVsZSxcbiAgICBOZ1JlZHV4Rm9ybUNvbm5lY3RBcnJheU1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW05nUmVkdXhGb3JtQ29ubmVjdE1vZHVsZSwgTmdSZWR1eEZvcm1Db25uZWN0QXJyYXlNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBGb3JtU3RvcmUsXG4gICAgICB1c2VGYWN0b3J5OiBmb3JtU3RvcmVGYWN0b3J5LFxuICAgICAgZGVwczogW05nUmVkdXhdLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5nUmVkdXhGb3JtTW9kdWxlIHt9XG4iXSwibmFtZXMiOlsiSW1tdXRhYmxlTWFwIiwiZGVjbGFyYXRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE1BQWEsZUFBZSxHQUFHLENBQzdCLEdBQUcsUUFBcUMsS0FDVixDQUFDLENBQU0sRUFBRSxNQUFpQixLQUN4RCxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sS0FBSyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7Ozs7O0FDTDFEO0FBbUJBLE1BQWEsWUFBWSxHQUFHLG1DQUFtQyxDQUFDO0FBR2hFOzs7O0lBUUUsWUFBb0IsS0FBbUI7UUFBbkIsVUFBSyxHQUFMLEtBQUssQ0FBYztLQUFJOzs7O0lBRTND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