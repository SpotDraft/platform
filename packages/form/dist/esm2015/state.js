/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class State {
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
                            ? ImmutableMap()
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1yZWR1eC9mb3JtLyIsInNvdXJjZXMiOlsic3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLFlBQVksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUUxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CakQsTUFBTTs7Ozs7Ozs7SUFDSixNQUFNLENBQUMsUUFBUSxDQUNiLEtBQWdCLEVBQ2hCLElBQWMsRUFDZCxFQUFxQjs7UUFFckIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBRXRCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7O1lBQ3JCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUV6QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBQ25DLE1BQU0sQ0FBQyxxQkFBRyxtQkFBQyxTQUFnQixFQUE4QixFQUFDO2dCQUMxRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDaEMsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3RCO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE1BQU0sSUFBSSxhQUFhLENBQ3JCLGtFQUFrRSxDQUFDLEVBQUUsQ0FDdEUsQ0FBQztpQkFDSDthQUNGO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxTQUFTLEdBQUcsbUJBQUMsbUJBQUMsU0FBZ0IsRUFBcUIsRUFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3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cEM7d0JBQ0QsTUFBTSxtQkFBTSxNQUFNLEVBQUssbUJBQUMsS0FBWSxFQUFDLEVBQUc7cUJBQ3pDLEVBQ0QsQ0FBQyxNQUFXLEVBQUUsQ0FBTSxFQUFFLEtBQVEsRUFBRSxFQUFFO3dCQUNoQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDbkMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLG1CQUFDLEtBQVksRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUMvQjt3QkFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO3FCQUNmLEVBQ0QsR0FBRyxFQUFFLENBQUMsbUJBQU0sbUJBQUMsTUFBYSxFQUFDLEVBQUcsQ0FDL0IsQ0FBQztnQkFDSjtvQkFDRSxLQUFLLENBQUM7YUFDVDtTQUNGO1FBRUQsTUFBTSxJQUFJLEtBQUssQ0FDYixxQkFBcUIsT0FBTyxNQUFNLG9EQUFvRDtZQUNwRiw2RUFBNkUsQ0FDaEYsQ0FBQztLQUNIOzs7OztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBVTtRQUNyQixNQUFNLENBQUMsQ0FDTCxLQUFLLElBQUksSUFBSTtZQUNiLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDO2dCQUNqQixDQUFDLE9BQU8sS0FBSyxDQUFDLE1BQU0sS0FBSyxXQUFXO29CQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUN0QyxDQUFDO0tBQ0g7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEl0ZXJhYmxlLCBNYXAgYXMgSW1tdXRhYmxlTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuaW1wb3J0IHsgRm9ybUV4Y2VwdGlvbiB9IGZyb20gJy4vZm9ybS1leGNlcHRpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIE9wZXJhdGlvbnM8VD4ge1xuICAvLy8gU2hhbGxvdyBjbG9uZSB0aGUgb2JqZWN0XG4gIGNsb25lKCk6IFQ7XG5cbiAgLy8vIENsb25lIGFuZCBtZXJnZVxuICBtZXJnZShrZXk6IG51bWJlciB8IHN0cmluZyB8IG51bGwsIHZhbHVlOiBUKTogYW55O1xuXG4gIC8vLyBDbG9uZSB0aGUgb2JqZWN0IGFuZCB1cGRhdGUgYSBzcGVjaWZpYyBrZXkgaW5zaWRlIG9mIGl0XG4gIHVwZGF0ZShrZXk6IG51bWJlciB8IHN0cmluZyB8IG51bGwsIHZhbHVlOiBUKTogYW55O1xufVxuXG5leHBvcnQgdHlwZSBUcmF2ZXJzZUNhbGxiYWNrID0gKFxuICBwYXJlbnQ6IGFueSxcbiAga2V5OiBudW1iZXIgfCBzdHJpbmcsXG4gIHJlbWFpbmluZ1BhdGg6IHN0cmluZ1tdLFxuICB2YWx1ZT86IGFueSxcbikgPT4gYW55O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RhdGUge1xuICBzdGF0aWMgdHJhdmVyc2U8U3RhdGVUeXBlPihcbiAgICBzdGF0ZTogU3RhdGVUeXBlLFxuICAgIHBhdGg6IHN0cmluZ1tdLFxuICAgIGZuPzogVHJhdmVyc2VDYWxsYmFjayxcbiAgKSB7XG4gICAgbGV0IGRlZXBWYWx1ZSA9IHN0YXRlO1xuXG4gICAgZm9yIChjb25zdCBrIG9mIHBhdGgpIHtcbiAgICAgIGNvbnN0IHBhcmVudCA9IGRlZXBWYWx1ZTtcblxuICAgICAgaWYgKEl0ZXJhYmxlLmlzSXRlcmFibGUoZGVlcFZhbHVlKSkge1xuICAgICAgICBjb25zdCBtID0gKGRlZXBWYWx1ZSBhcyBhbnkpIGFzIEltbXV0YWJsZU1hcDxzdHJpbmcsIGFueT47XG4gICAgICAgIGlmICh0eXBlb2YgbS5nZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBkZWVwVmFsdWUgPSBtLmdldChrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRm9ybUV4Y2VwdGlvbihcbiAgICAgICAgICAgIGBDYW5ub3QgcmV0cmlldmUgdmFsdWUgZnJvbSBpbW11dGFibGUgbm9uYXNzb2NpYXRpdmUgY29udGFpbmVyOiAke2t9YCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRlZXBWYWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICBkZWVwVmFsdWUgPSAoKGRlZXBWYWx1ZSBhcyBhbnkpIGFzIE1hcDxzdHJpbmcsIGFueT4pLmdldChrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlZXBWYWx1ZSA9IChkZWVwVmFsdWUgYXMgYW55KVtrXTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZCA9IGZuKFxuICAgICAgICAgIHBhcmVudCxcbiAgICAgICAgICBrLFxuICAgICAgICAgIHBhdGguc2xpY2UocGF0aC5pbmRleE9mKGspICsgMSksXG4gICAgICAgICAgZGVlcFZhbHVlLFxuICAgICAgICApO1xuXG4gICAgICAgIGRlZXBWYWx1ZSA9IHRyYW5zZm9ybWVkW2tdO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24ocGFyZW50LCB0cmFuc2Zvcm1lZCk7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHdlIHdlcmUgbm90IGFibGUgdG8gZmluZCB0aGlzIHN0YXRlIGluc2lkZSBvZiBvdXIgcm9vdCBzdGF0ZVxuICAgICAgLy8gc3RydWN0dXJlLCB0aGVuIHdlIHJldHVybiB1bmRlZmluZWQgLS0gbm90IG51bGwgLS0gdG8gaW5kaWNhdGUgdGhhdFxuICAgICAgLy8gc3RhdGUuIEJ1dCB0aGlzIGNvdWxkIGJlIGEgcGVyZmVjdGx5IG5vcm1hbCB1c2UtY2FzZSBzbyB3ZSBkb24ndFxuICAgICAgLy8gd2FudCB0byB0aHJvdyBhbiBleGNlcHRpb24gb3IgYW55dGhpbmcgYWxvbmcgdGhvc2UgbGluZXMuXG4gICAgICBpZiAoZGVlcFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVlcFZhbHVlO1xuICB9XG5cbiAgc3RhdGljIGdldDxTdGF0ZVR5cGU+KHN0YXRlOiBTdGF0ZVR5cGUsIHBhdGg6IHN0cmluZ1tdKTogYW55IHtcbiAgICByZXR1cm4gU3RhdGUudHJhdmVyc2Uoc3RhdGUsIHBhdGgpO1xuICB9XG5cbiAgc3RhdGljIGFzc2lnbjxTdGF0ZVR5cGU+KHN0YXRlOiBTdGF0ZVR5cGUsIHBhdGg6IHN0cmluZ1tdLCB2YWx1ZT86IGFueSkge1xuICAgIGNvbnN0IG9wZXJhdGlvbnMgPSBTdGF0ZS5pbnNwZWN0KHN0YXRlKTtcblxuICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG9wZXJhdGlvbnMudXBkYXRlKG51bGwsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBjb25zdCByb290ID0gb3BlcmF0aW9ucy5jbG9uZSgpO1xuXG4gICAgLy8gV2Ugd2FudCB0byBzaGFsbG93IGNsb25lIHRoZSBvYmplY3QsIGFuZCB0aGVuIHRyYWNlIGEgcGF0aCB0byB0aGUgcGxhY2VcbiAgICAvLyB3ZSB3YW50IHRvIHVwZGF0ZSwgY2xvbmluZyBlYWNoIG9iamVjdCB3ZSB0cmF2ZXJzZWQgb24gb3VyIHdheSBhbmQgdGhlblxuICAgIC8vIGZpbmFsbHkgdXBkYXRpbmcgdGhlIHZhbHVlIG9uIHRoZSBsYXN0IHBhcmVudCB0byBiZSBAdmFsdWUuIFRoaXMgc2VlbXNcbiAgICAvLyB0byBvZmZlciB0aGUgYmVzdCBwZXJmb3JtYW5jZTogd2UgY2FuIHNoYWxsb3cgY2xvbmUgZXZlcnl0aGluZyB0aGF0IGhhc1xuICAgIC8vIG5vdCBiZWVuIG1vZGlmaWVkLCBhbmQge2RlZXAgY2xvbmUgKyB1cGRhdGV9IHRoZSBwYXRoIGRvd24gdG8gdGhlIHZhbHVlXG4gICAgLy8gdGhhdCB3ZSB3aXNoIHRvIHVwZGF0ZS5cbiAgICBTdGF0ZS50cmF2ZXJzZShcbiAgICAgIHJvb3QsXG4gICAgICBwYXRoLFxuICAgICAgKHBhcmVudCwga2V5OiBudW1iZXIgfCBzdHJpbmcsIHJlbWFpbmluZ1BhdGg6IHN0cmluZ1tdLCBpbm5lclZhbHVlPykgPT4ge1xuICAgICAgICBjb25zdCBwYXJlbnRPcGVyYXRpb25zID0gU3RhdGUuaW5zcGVjdChwYXJlbnQpO1xuXG4gICAgICAgIGlmIChpbm5lclZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgaW5uZXJPcGVyYXRpb25zID0gU3RhdGUuaW5zcGVjdChpbm5lclZhbHVlKTtcblxuICAgICAgICAgIHJldHVybiBwYXJlbnRPcGVyYXRpb25zLnVwZGF0ZShcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIHJlbWFpbmluZ1BhdGgubGVuZ3RoID4gMFxuICAgICAgICAgICAgICA/IGlubmVyT3BlcmF0aW9ucy5jbG9uZSgpXG4gICAgICAgICAgICAgIDogaW5uZXJPcGVyYXRpb25zLm1lcmdlKG51bGwsIHZhbHVlKSxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGdldFByb2JhYmxlVHlwZSA9IChzdGF0ZUtleTogc3RyaW5nIHwgbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAvLyBOT1RFKGNib25kKTogSWYgeW91ciBjb2RlIGdldHMgaGVyZSwgeW91IG1pZ2h0IG5vdCBiZSB1c2luZyB0aGUgbGlicmFyeVxuICAgICAgICAgICAgLy8vIGNvcnJlY3RseS4gSWYgeW91IGFyZSBhc3NpZ25pbmcgaW50byBhIHBhdGggaW4geW91ciBzdGF0ZSwgdHJ5IHRvXG4gICAgICAgICAgICAvLy8gZW5zdXJlIHRoYXQgdGhlcmUgaXMgYSBwYXRoIHRvIHRyYXZlcnNlLCBldmVuIGlmIGV2ZXJ5dGhpbmcgaXMganVzdFxuICAgICAgICAgICAgLy8vIGVtcHR5IG9iamVjdHMgYW5kIGFycmF5cy4gSWYgd2UgaGF2ZSB0byBndWVzcyB0aGUgdHlwZSBvZiB0aGUgY29udGFpbmVyc1xuICAgICAgICAgICAgLy8vIGFuZCB0aGVuIGNyZWF0ZSB0aGVtIG91cnNlbHZlcywgd2UgbWF5IG5vdCBnZXQgdGhlIHR5cGVzIHJpZ2h0LiBVc2VcbiAgICAgICAgICAgIC8vLyB0aGUgUmVkdXggYGluaXRpYWwgc3RhdGUnIGNvbnN0cnVjdCB0byByZXNvbHZlIHRoaXMgaXNzdWUgaWYgeW91IGxpa2UuXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHN0YXRlS2V5ID09PSAnbnVtYmVyJ1xuICAgICAgICAgICAgICA/IG5ldyBBcnJheSgpXG4gICAgICAgICAgICAgIDogQXJyYXkuaXNBcnJheShzdGF0ZUtleSlcbiAgICAgICAgICAgICAgICA/IEltbXV0YWJsZU1hcCgpXG4gICAgICAgICAgICAgICAgOiBuZXcgT2JqZWN0KCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHJldHVybiBwYXJlbnRPcGVyYXRpb25zLnVwZGF0ZShcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIHJlbWFpbmluZ1BhdGgubGVuZ3RoID4gMFxuICAgICAgICAgICAgICA/IGdldFByb2JhYmxlVHlwZShyZW1haW5pbmdQYXRoWzBdKVxuICAgICAgICAgICAgICA6IHZhbHVlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcblxuICAgIHJldHVybiByb290O1xuICB9XG5cbiAgc3RhdGljIGluc3BlY3Q8Sz4ob2JqZWN0OiBLKTogT3BlcmF0aW9uczxLPiB7XG4gICAgY29uc3QgbWV0YU9wZXJhdGlvbnMgPSAoXG4gICAgICAvLyBUT0RPOiBXcml0ZSBwcm9wZXIgdHlwZSBkZWNsYXJhdGlvbnMgZm9yIGZvbGxvd2luZyBGdW5jdGlvbiB0eXBlc1xuICAgICAgdXBkYXRlOiBGdW5jdGlvbixcbiAgICAgIG1lcmdlOiBGdW5jdGlvbixcbiAgICAgIGNsb25lPzogRnVuY3Rpb24sXG4gICAgKSA9PiB7XG4gICAgICBjb25zdCBvcGVyYXRpb25zID0ge1xuICAgICAgICAvLy8gQ2xvbmUgdGhlIG9iamVjdCAoc2hhbGxvdylcbiAgICAgICAgY2xvbmU6XG4gICAgICAgICAgdHlwZW9mIGNsb25lID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/ICgpID0+IGNsb25lKG9iamVjdCBhcyBhbnkpIGFzIGFueVxuICAgICAgICAgICAgOiAoKSA9PiBvYmplY3QsXG5cbiAgICAgICAgLy8vIFVwZGF0ZSBhIHNwZWNpZmljIGtleSBpbnNpZGUgb2YgdGhlIGNvbnRhaW5lciBvYmplY3RcbiAgICAgICAgdXBkYXRlOiAoa2V5OiBzdHJpbmcsIHZhbHVlOiBLKSA9PlxuICAgICAgICAgIHVwZGF0ZShvcGVyYXRpb25zLmNsb25lKCksIGtleSwgdmFsdWUpLFxuXG4gICAgICAgIC8vLyBNZXJnZSBleGlzdGluZyB2YWx1ZXMgd2l0aCBuZXcgdmFsdWVzXG4gICAgICAgIG1lcmdlOiAoa2V5OiBzdHJpbmcsIHZhbHVlOiBLKSA9PiB7XG4gICAgICAgICAgY29uc3QgY2xvbmVkID0gb3BlcmF0aW9ucy5jbG9uZSgpO1xuICAgICAgICAgIHJldHVybiBtZXJnZShjbG9uZWQsIGtleSwgdmFsdWUsICh2OiBhbnkpID0+IHVwZGF0ZShjbG9uZWQsIGtleSwgdikpO1xuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIG9wZXJhdGlvbnM7XG4gICAgfTtcblxuICAgIGlmIChJdGVyYWJsZS5pc0l0ZXJhYmxlKG9iamVjdCkpIHtcbiAgICAgIHJldHVybiBtZXRhT3BlcmF0aW9ucyhcbiAgICAgICAgLy8gUmVwbGFjZVxuICAgICAgICAocGFyZW50OiBhbnksIGtleTogbnVtYmVyIHwgc3RyaW5nLCB2YWx1ZTogSykgPT4ge1xuICAgICAgICAgIGlmIChrZXkgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8vIE1lcmdlXG4gICAgICAgIChwYXJlbnQ6IGFueSwga2V5OiBudW1iZXIgfCBzdHJpbmcgfCBzdHJpbmdbXSwgdmFsdWU6IEspID0+IHtcbiAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50Lm1lcmdlRGVlcEluKEFycmF5LmlzQXJyYXkoa2V5KSA/IGtleSA6IFtrZXldLCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChJbW11dGFibGVNYXAuaXNNYXAodmFsdWUpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJlbnQubWVyZ2VEZWVwKHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJlbnQuY29uY2F0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKSB7XG4gICAgICByZXR1cm4gbWV0YU9wZXJhdGlvbnMoXG4gICAgICAgIC8vIFJlcGxhY2UgYXJyYXkgY29udGVudHNcbiAgICAgICAgKHBhcmVudDogYW55LCBrZXk6IG51bWJlciwgdmFsdWU6IEspID0+IHtcbiAgICAgICAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHBhcmVudFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudC5zcGxpY2UuYXBwbHkoXG4gICAgICAgICAgICAgIHBhcmVudCxcbiAgICAgICAgICAgICAgWzAsIHBhcmVudC5sZW5ndGhdLmNvbmNhdChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBNZXJnZVxuICAgICAgICAocGFyZW50OiBhbnksIF86IGFueSwgdmFsdWU6IEssIHNldHRlcjogKHY6IEspID0+IEspID0+IHtcbiAgICAgICAgICBzZXR0ZXIocGFyZW50LmNvbmNhdCh2YWx1ZSkpO1xuICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQ2xvbmVcbiAgICAgICAgKCkgPT4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwob2JqZWN0LCAwKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChvYmplY3QgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgIHJldHVybiBtZXRhT3BlcmF0aW9ucyhcbiAgICAgICAgLy8gVXBkYXRlIG1hcCBrZXlcbiAgICAgICAgKHBhcmVudDogYW55LCBrZXk6IG51bWJlciB8IHN0cmluZywgdmFsdWU6IEspID0+IHtcbiAgICAgICAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBtID0gbmV3IE1hcCh2YWx1ZSBhcyBhbnkpO1xuICAgICAgICAgICAgcGFyZW50LmNsZWFyKCk7XG4gICAgICAgICAgICBtLmZvckVhY2goKG1hcFZhbHVlLCBpbmRleCkgPT4gcGFyZW50LnNldChpbmRleCwgbWFwVmFsdWUpKTtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIE1lcmdlXG4gICAgICAgIChwYXJlbnQ6IE1hcDxzdHJpbmcsIGFueT4sIF86IGFueSwgdmFsdWU6IEspID0+IHtcbiAgICAgICAgICBjb25zdCBtID0gbmV3IE1hcDxzdHJpbmcsIGFueT4odmFsdWUgYXMgYW55KTtcbiAgICAgICAgICBtLmZvckVhY2goKG1hcFZhbHVlLCBrZXkpID0+IHBhcmVudC5zZXQoa2V5LCBtYXBWYWx1ZSkpO1xuICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQ2xvbmVcbiAgICAgICAgKCkgPT5cbiAgICAgICAgICBvYmplY3QgaW5zdGFuY2VvZiBXZWFrTWFwXG4gICAgICAgICAgICA/IG5ldyBXZWFrTWFwPG9iamVjdCwgYW55PihvYmplY3QgYXMgYW55KVxuICAgICAgICAgICAgOiBuZXcgTWFwPHN0cmluZywgYW55PihvYmplY3QgYXMgYW55KSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChvYmplY3QgaW5zdGFuY2VvZiBXZWFrU2V0IHx8IG9iamVjdCBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgcmV0dXJuIG1ldGFPcGVyYXRpb25zKFxuICAgICAgICAvLyBVcGRhdGUgZWxlbWVudCBhdCBpbmRleCBpbiBzZXRcbiAgICAgICAgKHBhcmVudDogYW55LCBrZXk6IG51bWJlciwgdmFsdWU6IEspID0+IHtcbiAgICAgICAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzID0gbmV3IFNldCh2YWx1ZSBhcyBhbnkpO1xuICAgICAgICAgICAgcy5mb3JFYWNoKChzZXRWYWx1ZSwgaW5kZXgpID0+IHBhcmVudC5zZXQoaW5kZXgsIHNldFZhbHVlKSk7XG4gICAgICAgICAgICBzLmNsZWFyKCk7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBNZXJnZVxuICAgICAgICAocGFyZW50OiBTZXQ8YW55PiwgXzogYW55LCB2YWx1ZTogYW55KSA9PiB7XG4gICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBwYXJlbnQuYWRkKGVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIENsb25lXG4gICAgICAgICgpID0+XG4gICAgICAgICAgb2JqZWN0IGluc3RhbmNlb2YgV2Vha1NldFxuICAgICAgICAgICAgPyBuZXcgV2Vha1NldDxhbnk+KG9iamVjdCBhcyBhbnkpXG4gICAgICAgICAgICA6IG5ldyBTZXQ8YW55PihvYmplY3QgYXMgYW55KSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChvYmplY3QgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICB0aHJvdyBuZXcgRm9ybUV4Y2VwdGlvbihcbiAgICAgICAgJ0Nhbm5vdCB1bmRlcnN0YW5kIHdoeSBhIERhdGUgb2JqZWN0IGFwcGVhcnMgaW4gdGhlIG11dGF0aW9uIHBhdGghJyxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAodHlwZW9mIG9iamVjdCkge1xuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBjYXNlICdzeW1ib2wnOlxuICAgICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtZXRhT3BlcmF0aW9ucyhcbiAgICAgICAgICAgIChwYXJlbnQ6IGFueSwga2V5OiBhbnksIHZhbHVlOiBLKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChrZXkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IC4uLnBhcmVudCwgW2tleV06IHZhbHVlIH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHsgLi4ucGFyZW50LCAuLi4odmFsdWUgYXMgYW55KSB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChwYXJlbnQ6IGFueSwgXzogYW55LCB2YWx1ZTogSykgPT4ge1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IGsgb2YgT2JqZWN0LmtleXModmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50W2tdID0gKHZhbHVlIGFzIGFueSlba107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiAoeyAuLi4ob2JqZWN0IGFzIGFueSkgfSksXG4gICAgICAgICAgKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgQW4gb2JqZWN0IG9mIHR5cGUgJHt0eXBlb2Ygb2JqZWN0fSBoYXMgYXBwZWFyZWQgaW4gdGhlIG11dGF0aW9uIHBhdGghIEV2ZXJ5IGVsZW1lbnQgYCArXG4gICAgICAgICdpbiB0aGUgbXV0YXRpb24gcGF0aCBzaG91bGQgYmUgYW4gYXJyYXksIGFuIGFzc29jaWF0aXZlIGNvbnRhaW5lciwgb3IgYSBzZXQnLFxuICAgICk7XG4gIH1cblxuICBzdGF0aWMgZW1wdHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB2YWx1ZSA9PSBudWxsIHx8XG4gICAgICAodmFsdWUubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICh0eXBlb2YgdmFsdWUubGVuZ3RoID09PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPT09IDApKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==