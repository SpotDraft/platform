/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Iterable, Map as ImmutableMap } from 'immutable';
import { FormException } from './form-exception';
/**
 * @record
 * @template T
 */
export function Operations() { }
/** @type {?} */
Operations.prototype.clone;
/** @type {?} */
Operations.prototype.merge;
/** @type {?} */
Operations.prototype.update;
/** @typedef {?} */
var TraverseCallback;
export { TraverseCallback };
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
            for (var path_1 = tslib_1.__values(path), path_1_1 = path_1.next(); !path_1_1.done; path_1_1 = path_1.next()) {
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
                            ? ImmutableMap()
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
                    if (ImmutableMap.isMap(value)) {
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
                    for (var value_1 = tslib_1.__values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
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
                            return tslib_1.__assign({}, parent, (_a = {}, _a[key] = value, _a));
                        }
                        return tslib_1.__assign({}, parent, (/** @type {?} */ (value)));
                        var _a;
                    }, function (parent, _, value) {
                        try {
                            for (var _a = tslib_1.__values(Object.keys(value)), _b = _a.next(); !_b.done; _b = _a.next()) {
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
                    }, function () { return (tslib_1.__assign({}, (/** @type {?} */ (object)))); });
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
 * @abstract
 */
export { State };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1yZWR1eC9mb3JtLyIsInNvdXJjZXMiOlsic3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQmpEOzs7QUFBQTs7Ozs7Ozs7OztJQUNTLGNBQVE7Ozs7Ozs7SUFBZixVQUNFLEtBQWdCLEVBQ2hCLElBQWMsRUFDZCxFQUFxQjs7UUFFckIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDOztZQUV0QixHQUFHLENBQUMsQ0FBWSxJQUFBLFNBQUEsaUJBQUEsSUFBSSxDQUFBLDBCQUFBO2dCQUFmLElBQU0sQ0FBQyxpQkFBQTs7Z0JBQ1YsSUFBTSxRQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUV6QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7b0JBQ25DLElBQU0sQ0FBQyxxQkFBRyxtQkFBQyxTQUFnQixFQUE4QixFQUFDO29CQUMxRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQzt3QkFDaEMsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3RCO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLE1BQU0sSUFBSSxhQUFhLENBQ3JCLG9FQUFrRSxDQUFHLENBQ3RFLENBQUM7cUJBQ0g7aUJBQ0Y7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxTQUFTLEdBQUcsbUJBQUMsbUJBQUMsU0FBZ0IsRUFBcUIsRUFBQyxDQUFDLEdBQUcs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cyBJbW11dGFibGVNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuXG5pbXBvcnQgeyBGb3JtRXhjZXB0aW9uIH0gZnJvbSAnLi9mb3JtLWV4Y2VwdGlvbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3BlcmF0aW9uczxUPiB7XG4gIC8vLyBTaGFsbG93IGNsb25lIHRoZSBvYmplY3RcbiAgY2xvbmUoKTogVDtcblxuICAvLy8gQ2xvbmUgYW5kIG1lcmdlXG4gIG1lcmdlKGtleTogbnVtYmVyIHwgc3RyaW5nIHwgbnVsbCwgdmFsdWU6IFQpOiBhbnk7XG5cbiAgLy8vIENsb25lIHRoZSBvYmplY3QgYW5kIHVwZGF0ZSBhIHNwZWNpZmljIGtleSBpbnNpZGUgb2YgaXRcbiAgdXBkYXRlKGtleTogbnVtYmVyIHwgc3RyaW5nIHwgbnVsbCwgdmFsdWU6IFQpOiBhbnk7XG59XG5cbmV4cG9ydCB0eXBlIFRyYXZlcnNlQ2FsbGJhY2sgPSAoXG4gIHBhcmVudDogYW55LFxuICBrZXk6IG51bWJlciB8IHN0cmluZyxcbiAgcmVtYWluaW5nUGF0aDogc3RyaW5nW10sXG4gIHZhbHVlPzogYW55LFxuKSA9PiBhbnk7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdGF0ZSB7XG4gIHN0YXRpYyB0cmF2ZXJzZTxTdGF0ZVR5cGU+KFxuICAgIHN0YXRlOiBTdGF0ZVR5cGUsXG4gICAgcGF0aDogc3RyaW5nW10sXG4gICAgZm4/OiBUcmF2ZXJzZUNhbGxiYWNrLFxuICApIHtcbiAgICBsZXQgZGVlcFZhbHVlID0gc3RhdGU7XG5cbiAgICBmb3IgKGNvbnN0IGsgb2YgcGF0aCkge1xuICAgICAgY29uc3QgcGFyZW50ID0gZGVlcFZhbHVlO1xuXG4gICAgICBpZiAoSXRlcmFibGUuaXNJdGVyYWJsZShkZWVwVmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IG0gPSAoZGVlcFZhbHVlIGFzIGFueSkgYXMgSW1tdXRhYmxlTWFwPHN0cmluZywgYW55PjtcbiAgICAgICAgaWYgKHR5cGVvZiBtLmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGRlZXBWYWx1ZSA9IG0uZ2V0KGspO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBGb3JtRXhjZXB0aW9uKFxuICAgICAgICAgICAgYENhbm5vdCByZXRyaWV2ZSB2YWx1ZSBmcm9tIGltbXV0YWJsZSBub25hc3NvY2lhdGl2ZSBjb250YWluZXI6ICR7a31gLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZGVlcFZhbHVlIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgIGRlZXBWYWx1ZSA9ICgoZGVlcFZhbHVlIGFzIGFueSkgYXMgTWFwPHN0cmluZywgYW55PikuZ2V0KGspO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVlcFZhbHVlID0gKGRlZXBWYWx1ZSBhcyBhbnkpW2tdO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkID0gZm4oXG4gICAgICAgICAgcGFyZW50LFxuICAgICAgICAgIGssXG4gICAgICAgICAgcGF0aC5zbGljZShwYXRoLmluZGV4T2YoaykgKyAxKSxcbiAgICAgICAgICBkZWVwVmFsdWUsXG4gICAgICAgICk7XG5cbiAgICAgICAgZGVlcFZhbHVlID0gdHJhbnNmb3JtZWRba107XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihwYXJlbnQsIHRyYW5zZm9ybWVkKTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgd2Ugd2VyZSBub3QgYWJsZSB0byBmaW5kIHRoaXMgc3RhdGUgaW5zaWRlIG9mIG91ciByb290IHN0YXRlXG4gICAgICAvLyBzdHJ1Y3R1cmUsIHRoZW4gd2UgcmV0dXJuIHVuZGVmaW5lZCAtLSBub3QgbnVsbCAtLSB0byBpbmRpY2F0ZSB0aGF0XG4gICAgICAvLyBzdGF0ZS4gQnV0IHRoaXMgY291bGQgYmUgYSBwZXJmZWN0bHkgbm9ybWFsIHVzZS1jYXNlIHNvIHdlIGRvbid0XG4gICAgICAvLyB3YW50IHRvIHRocm93IGFuIGV4Y2VwdGlvbiBvciBhbnl0aGluZyBhbG9uZyB0aG9zZSBsaW5lcy5cbiAgICAgIGlmIChkZWVwVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWVwVmFsdWU7XG4gIH1cblxuICBzdGF0aWMgZ2V0PFN0YXRlVHlwZT4oc3RhdGU6IFN0YXRlVHlwZSwgcGF0aDogc3RyaW5nW10pOiBhbnkge1xuICAgIHJldHVybiBTdGF0ZS50cmF2ZXJzZShzdGF0ZSwgcGF0aCk7XG4gIH1cblxuICBzdGF0aWMgYXNzaWduPFN0YXRlVHlwZT4oc3RhdGU6IFN0YXRlVHlwZSwgcGF0aDogc3RyaW5nW10sIHZhbHVlPzogYW55KSB7XG4gICAgY29uc3Qgb3BlcmF0aW9ucyA9IFN0YXRlLmluc3BlY3Qoc3RhdGUpO1xuXG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gb3BlcmF0aW9ucy51cGRhdGUobnVsbCwgdmFsdWUpO1xuICAgIH1cblxuICAgIGNvbnN0IHJvb3QgPSBvcGVyYXRpb25zLmNsb25lKCk7XG5cbiAgICAvLyBXZSB3YW50IHRvIHNoYWxsb3cgY2xvbmUgdGhlIG9iamVjdCwgYW5kIHRoZW4gdHJhY2UgYSBwYXRoIHRvIHRoZSBwbGFjZVxuICAgIC8vIHdlIHdhbnQgdG8gdXBkYXRlLCBjbG9uaW5nIGVhY2ggb2JqZWN0IHdlIHRyYXZlcnNlZCBvbiBvdXIgd2F5IGFuZCB0aGVuXG4gICAgLy8gZmluYWxseSB1cGRhdGluZyB0aGUgdmFsdWUgb24gdGhlIGxhc3QgcGFyZW50IHRvIGJlIEB2YWx1ZS4gVGhpcyBzZWVtc1xuICAgIC8vIHRvIG9mZmVyIHRoZSBiZXN0IHBlcmZvcm1hbmNlOiB3ZSBjYW4gc2hhbGxvdyBjbG9uZSBldmVyeXRoaW5nIHRoYXQgaGFzXG4gICAgLy8gbm90IGJlZW4gbW9kaWZpZWQsIGFuZCB7ZGVlcCBjbG9uZSArIHVwZGF0ZX0gdGhlIHBhdGggZG93biB0byB0aGUgdmFsdWVcbiAgICAvLyB0aGF0IHdlIHdpc2ggdG8gdXBkYXRlLlxuICAgIFN0YXRlLnRyYXZlcnNlKFxuICAgICAgcm9vdCxcbiAgICAgIHBhdGgsXG4gICAgICAocGFyZW50LCBrZXk6IG51bWJlciB8IHN0cmluZywgcmVtYWluaW5nUGF0aDogc3RyaW5nW10sIGlubmVyVmFsdWU/KSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmVudE9wZXJhdGlvbnMgPSBTdGF0ZS5pbnNwZWN0KHBhcmVudCk7XG5cbiAgICAgICAgaWYgKGlubmVyVmFsdWUpIHtcbiAgICAgICAgICBjb25zdCBpbm5lck9wZXJhdGlvbnMgPSBTdGF0ZS5pbnNwZWN0KGlubmVyVmFsdWUpO1xuXG4gICAgICAgICAgcmV0dXJuIHBhcmVudE9wZXJhdGlvbnMudXBkYXRlKFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgcmVtYWluaW5nUGF0aC5sZW5ndGggPiAwXG4gICAgICAgICAgICAgID8gaW5uZXJPcGVyYXRpb25zLmNsb25lKClcbiAgICAgICAgICAgICAgOiBpbm5lck9wZXJhdGlvbnMubWVyZ2UobnVsbCwgdmFsdWUpLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgZ2V0UHJvYmFibGVUeXBlID0gKHN0YXRlS2V5OiBzdHJpbmcgfCBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIC8vIE5PVEUoY2JvbmQpOiBJZiB5b3VyIGNvZGUgZ2V0cyBoZXJlLCB5b3UgbWlnaHQgbm90IGJlIHVzaW5nIHRoZSBsaWJyYXJ5XG4gICAgICAgICAgICAvLy8gY29ycmVjdGx5LiBJZiB5b3UgYXJlIGFzc2lnbmluZyBpbnRvIGEgcGF0aCBpbiB5b3VyIHN0YXRlLCB0cnkgdG9cbiAgICAgICAgICAgIC8vLyBlbnN1cmUgdGhhdCB0aGVyZSBpcyBhIHBhdGggdG8gdHJhdmVyc2UsIGV2ZW4gaWYgZXZlcnl0aGluZyBpcyBqdXN0XG4gICAgICAgICAgICAvLy8gZW1wdHkgb2JqZWN0cyBhbmQgYXJyYXlzLiBJZiB3ZSBoYXZlIHRvIGd1ZXNzIHRoZSB0eXBlIG9mIHRoZSBjb250YWluZXJzXG4gICAgICAgICAgICAvLy8gYW5kIHRoZW4gY3JlYXRlIHRoZW0gb3Vyc2VsdmVzLCB3ZSBtYXkgbm90IGdldCB0aGUgdHlwZXMgcmlnaHQuIFVzZVxuICAgICAgICAgICAgLy8vIHRoZSBSZWR1eCBgaW5pdGlhbCBzdGF0ZScgY29uc3RydWN0IHRvIHJlc29sdmUgdGhpcyBpc3N1ZSBpZiB5b3UgbGlrZS5cbiAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygc3RhdGVLZXkgPT09ICdudW1iZXInXG4gICAgICAgICAgICAgID8gbmV3IEFycmF5KClcbiAgICAgICAgICAgICAgOiBBcnJheS5pc0FycmF5KHN0YXRlS2V5KVxuICAgICAgICAgICAgICAgID8gSW1tdXRhYmxlTWFwKClcbiAgICAgICAgICAgICAgICA6IG5ldyBPYmplY3QoKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmV0dXJuIHBhcmVudE9wZXJhdGlvbnMudXBkYXRlKFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgcmVtYWluaW5nUGF0aC5sZW5ndGggPiAwXG4gICAgICAgICAgICAgID8gZ2V0UHJvYmFibGVUeXBlKHJlbWFpbmluZ1BhdGhbMF0pXG4gICAgICAgICAgICAgIDogdmFsdWUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuXG4gICAgcmV0dXJuIHJvb3Q7XG4gIH1cblxuICBzdGF0aWMgaW5zcGVjdDxLPihvYmplY3Q6IEspOiBPcGVyYXRpb25zPEs+IHtcbiAgICBjb25zdCBtZXRhT3BlcmF0aW9ucyA9IChcbiAgICAgIC8vIFRPRE86IFdyaXRlIHByb3BlciB0eXBlIGRlY2xhcmF0aW9ucyBmb3IgZm9sbG93aW5nIEZ1bmN0aW9uIHR5cGVzXG4gICAgICB1cGRhdGU6IEZ1bmN0aW9uLFxuICAgICAgbWVyZ2U6IEZ1bmN0aW9uLFxuICAgICAgY2xvbmU/OiBGdW5jdGlvbixcbiAgICApID0+IHtcbiAgICAgIGNvbnN0IG9wZXJhdGlvbnMgPSB7XG4gICAgICAgIC8vLyBDbG9uZSB0aGUgb2JqZWN0IChzaGFsbG93KVxuICAgICAgICBjbG9uZTpcbiAgICAgICAgICB0eXBlb2YgY2xvbmUgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gKCkgPT4gY2xvbmUob2JqZWN0IGFzIGFueSkgYXMgYW55XG4gICAgICAgICAgICA6ICgpID0+IG9iamVjdCxcblxuICAgICAgICAvLy8gVXBkYXRlIGEgc3BlY2lmaWMga2V5IGluc2lkZSBvZiB0aGUgY29udGFpbmVyIG9iamVjdFxuICAgICAgICB1cGRhdGU6IChrZXk6IHN0cmluZywgdmFsdWU6IEspID0+XG4gICAgICAgICAgdXBkYXRlKG9wZXJhdGlvbnMuY2xvbmUoKSwga2V5LCB2YWx1ZSksXG5cbiAgICAgICAgLy8vIE1lcmdlIGV4aXN0aW5nIHZhbHVlcyB3aXRoIG5ldyB2YWx1ZXNcbiAgICAgICAgbWVyZ2U6IChrZXk6IHN0cmluZywgdmFsdWU6IEspID0+IHtcbiAgICAgICAgICBjb25zdCBjbG9uZWQgPSBvcGVyYXRpb25zLmNsb25lKCk7XG4gICAgICAgICAgcmV0dXJuIG1lcmdlKGNsb25lZCwga2V5LCB2YWx1ZSwgKHY6IGFueSkgPT4gdXBkYXRlKGNsb25lZCwga2V5LCB2KSk7XG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gb3BlcmF0aW9ucztcbiAgICB9O1xuXG4gICAgaWYgKEl0ZXJhYmxlLmlzSXRlcmFibGUob2JqZWN0KSkge1xuICAgICAgcmV0dXJuIG1ldGFPcGVyYXRpb25zKFxuICAgICAgICAvLyBSZXBsYWNlXG4gICAgICAgIChwYXJlbnQ6IGFueSwga2V5OiBudW1iZXIgfCBzdHJpbmcsIHZhbHVlOiBLKSA9PiB7XG4gICAgICAgICAgaWYgKGtleSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50LnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gTWVyZ2VcbiAgICAgICAgKHBhcmVudDogYW55LCBrZXk6IG51bWJlciB8IHN0cmluZyB8IHN0cmluZ1tdLCB2YWx1ZTogSykgPT4ge1xuICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQubWVyZ2VEZWVwSW4oQXJyYXkuaXNBcnJheShrZXkpID8ga2V5IDogW2tleV0sIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKEltbXV0YWJsZU1hcC5pc01hcCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5tZXJnZURlZXAodmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5jb25jYXQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iamVjdCkpIHtcbiAgICAgIHJldHVybiBtZXRhT3BlcmF0aW9ucyhcbiAgICAgICAgLy8gUmVwbGFjZSBhcnJheSBjb250ZW50c1xuICAgICAgICAocGFyZW50OiBhbnksIGtleTogbnVtYmVyLCB2YWx1ZTogSykgPT4ge1xuICAgICAgICAgIGlmIChrZXkgIT0gbnVsbCkge1xuICAgICAgICAgICAgcGFyZW50W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50LnNwbGljZS5hcHBseShcbiAgICAgICAgICAgICAgcGFyZW50LFxuICAgICAgICAgICAgICBbMCwgcGFyZW50Lmxlbmd0aF0uY29uY2F0KEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIE1lcmdlXG4gICAgICAgIChwYXJlbnQ6IGFueSwgXzogYW55LCB2YWx1ZTogSywgc2V0dGVyOiAodjogSykgPT4gSykgPT4ge1xuICAgICAgICAgIHNldHRlcihwYXJlbnQuY29uY2F0KHZhbHVlKSk7XG4gICAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBDbG9uZVxuICAgICAgICAoKSA9PiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChvYmplY3QsIDApLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKG9iamVjdCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgcmV0dXJuIG1ldGFPcGVyYXRpb25zKFxuICAgICAgICAvLyBVcGRhdGUgbWFwIGtleVxuICAgICAgICAocGFyZW50OiBhbnksIGtleTogbnVtYmVyIHwgc3RyaW5nLCB2YWx1ZTogSykgPT4ge1xuICAgICAgICAgIGlmIChrZXkgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG0gPSBuZXcgTWFwKHZhbHVlIGFzIGFueSk7XG4gICAgICAgICAgICBwYXJlbnQuY2xlYXIoKTtcbiAgICAgICAgICAgIG0uZm9yRWFjaCgobWFwVmFsdWUsIGluZGV4KSA9PiBwYXJlbnQuc2V0KGluZGV4LCBtYXBWYWx1ZSkpO1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gTWVyZ2VcbiAgICAgICAgKHBhcmVudDogTWFwPHN0cmluZywgYW55PiwgXzogYW55LCB2YWx1ZTogSykgPT4ge1xuICAgICAgICAgIGNvbnN0IG0gPSBuZXcgTWFwPHN0cmluZywgYW55Pih2YWx1ZSBhcyBhbnkpO1xuICAgICAgICAgIG0uZm9yRWFjaCgobWFwVmFsdWUsIGtleSkgPT4gcGFyZW50LnNldChrZXksIG1hcFZhbHVlKSk7XG4gICAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBDbG9uZVxuICAgICAgICAoKSA9PlxuICAgICAgICAgIG9iamVjdCBpbnN0YW5jZW9mIFdlYWtNYXBcbiAgICAgICAgICAgID8gbmV3IFdlYWtNYXA8b2JqZWN0LCBhbnk+KG9iamVjdCBhcyBhbnkpXG4gICAgICAgICAgICA6IG5ldyBNYXA8c3RyaW5nLCBhbnk+KG9iamVjdCBhcyBhbnkpLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKG9iamVjdCBpbnN0YW5jZW9mIFdlYWtTZXQgfHwgb2JqZWN0IGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICByZXR1cm4gbWV0YU9wZXJhdGlvbnMoXG4gICAgICAgIC8vIFVwZGF0ZSBlbGVtZW50IGF0IGluZGV4IGluIHNldFxuICAgICAgICAocGFyZW50OiBhbnksIGtleTogbnVtYmVyLCB2YWx1ZTogSykgPT4ge1xuICAgICAgICAgIGlmIChrZXkgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSBuZXcgU2V0KHZhbHVlIGFzIGFueSk7XG4gICAgICAgICAgICBzLmZvckVhY2goKHNldFZhbHVlLCBpbmRleCkgPT4gcGFyZW50LnNldChpbmRleCwgc2V0VmFsdWUpKTtcbiAgICAgICAgICAgIHMuY2xlYXIoKTtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIE1lcmdlXG4gICAgICAgIChwYXJlbnQ6IFNldDxhbnk+LCBfOiBhbnksIHZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIHBhcmVudC5hZGQoZWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQ2xvbmVcbiAgICAgICAgKCkgPT5cbiAgICAgICAgICBvYmplY3QgaW5zdGFuY2VvZiBXZWFrU2V0XG4gICAgICAgICAgICA/IG5ldyBXZWFrU2V0PGFueT4ob2JqZWN0IGFzIGFueSlcbiAgICAgICAgICAgIDogbmV3IFNldDxhbnk+KG9iamVjdCBhcyBhbnkpLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKG9iamVjdCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIHRocm93IG5ldyBGb3JtRXhjZXB0aW9uKFxuICAgICAgICAnQ2Fubm90IHVuZGVyc3RhbmQgd2h5IGEgRGF0ZSBvYmplY3QgYXBwZWFycyBpbiB0aGUgbXV0YXRpb24gcGF0aCEnLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoICh0eXBlb2Ygb2JqZWN0KSB7XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIGNhc2UgJ3N5bWJvbCc6XG4gICAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1ldGFPcGVyYXRpb25zKFxuICAgICAgICAgICAgKHBhcmVudDogYW55LCBrZXk6IGFueSwgdmFsdWU6IEspID0+IHtcbiAgICAgICAgICAgICAgaWYgKGtleSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgLi4ucGFyZW50LCBba2V5XTogdmFsdWUgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4geyAuLi5wYXJlbnQsIC4uLih2YWx1ZSBhcyBhbnkpIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKHBhcmVudDogYW55LCBfOiBhbnksIHZhbHVlOiBLKSA9PiB7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgayBvZiBPYmplY3Qua2V5cyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRba10gPSAodmFsdWUgYXMgYW55KVtrXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpID0+ICh7IC4uLihvYmplY3QgYXMgYW55KSB9KSxcbiAgICAgICAgICApO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBBbiBvYmplY3Qgb2YgdHlwZSAke3R5cGVvZiBvYmplY3R9IGhhcyBhcHBlYXJlZCBpbiB0aGUgbXV0YXRpb24gcGF0aCEgRXZlcnkgZWxlbWVudCBgICtcbiAgICAgICAgJ2luIHRoZSBtdXRhdGlvbiBwYXRoIHNob3VsZCBiZSBhbiBhcnJheSwgYW4gYXNzb2NpYXRpdmUgY29udGFpbmVyLCBvciBhIHNldCcsXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRpYyBlbXB0eSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHZhbHVlID09IG51bGwgfHxcbiAgICAgICh2YWx1ZS5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgKHR5cGVvZiB2YWx1ZS5sZW5ndGggPT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCA9PT0gMCkpXG4gICAgKTtcbiAgfVxufVxuIl19