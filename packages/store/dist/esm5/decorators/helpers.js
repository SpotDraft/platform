/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { distinctUntilChanged } from 'rxjs/operators';
import { NgRedux } from '../components/ng-redux';
/**
 * Used with the `\@WithSubStore` class decorator to define a SubStore (AKA a
 * fractal store).
 *
 * For more info on substores, see
 * https://github.com/angular-redux/store/blob/master/articles/fractal-store.md
 * @record
 */
export function FractalStoreOptions() { }
/**
 * The name of an instance method that will define the
 * base path for the subStore. This method is expected to return an array
 * of property names or undefined/null.
 * @type {?}
 */
FractalStoreOptions.prototype.basePathMethodName;
/**
 * The localReducer for the substore in question.
 * @type {?}
 */
FractalStoreOptions.prototype.localReducer;
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
var ɵ0 = getClassOptions;
/** *
 * @hidden
  @type {?} */
export var setClassOptions = function (decoratedClassConstructor, options) {
    decoratedClassConstructor[OPTIONS_KEY] = options;
};
/** @type {?} */
var setInstanceStore = function (decoratedInstance, store) { return (decoratedInstance[INSTANCE_SUBSTORE_KEY] = store); };
var ɵ1 = setInstanceStore;
/** @type {?} */
var getInstanceStore = function (decoratedInstance) {
    return decoratedInstance[INSTANCE_SUBSTORE_KEY];
};
var ɵ2 = getInstanceStore;
/** @type {?} */
var getInstanceSelectionMap = function (decoratedInstance) {
    /** @type {?} */
    var map = decoratedInstance[INSTANCE_SELECTIONS_KEY] || {};
    decoratedInstance[INSTANCE_SELECTIONS_KEY] = map;
    return map;
};
var ɵ3 = getInstanceSelectionMap;
/** @type {?} */
var hasBasePathChanged = function (decoratedInstance, basePath) {
    return decoratedInstance[INSTANCE_BASE_PATH_KEY] !== (basePath || []).toString();
};
var ɵ4 = hasBasePathChanged;
/** @type {?} */
var setInstanceBasePath = function (decoratedInstance, basePath) {
    decoratedInstance[INSTANCE_BASE_PATH_KEY] = (basePath || []).toString();
};
var ɵ5 = setInstanceBasePath;
/** @type {?} */
var clearInstanceState = function (decoratedInstance) {
    decoratedInstance[INSTANCE_SELECTIONS_KEY] = null;
    decoratedInstance[INSTANCE_SUBSTORE_KEY] = null;
    decoratedInstance[INSTANCE_BASE_PATH_KEY] = null;
};
var ɵ6 = clearInstanceState;
/** *
 * Gets the store associated with a decorated instance (e.g. a
 * component or service)
 * @hidden
  @type {?} */
export var getBaseStore = function (decoratedInstance) {
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
export var getInstanceSelection = function (decoratedInstance, key, selector, transformer, comparator) {
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
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0NqRCxJQUFNLFdBQVcsR0FBRywwQ0FBMEMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFlL0QsSUFBTSxxQkFBcUIsR0FBRywyQ0FBMkMsQ0FBQzs7QUFDMUUsSUFBTSx1QkFBdUIsR0FDM0IsZ0RBQWdELENBQUM7Ozs7O0FBTW5ELElBQU0sc0JBQXNCLEdBQUcsOENBQThDLENBQUM7O0FBRTlFLElBQU0sZUFBZSxHQUFHLFVBQUMsaUJBQXNCO0lBQzdDLE9BQUEsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztBQUExQyxDQUEwQyxDQUFDOzs7OztBQUc3QyxXQUFhLGVBQWUsR0FBRyxVQUM3Qix5QkFBOEIsRUFDOUIsT0FBNEI7SUFFNUIseUJBQXlCLENBQUMsV0FBVyxDQUFDLEdBQUcsT0FBTyxDQUFDO0NBQ2xELENBQUM7O0FBTUYsSUFBTSxnQkFBZ0IsR0FBRyxVQUN2QixpQkFBc0IsRUFDdEIsS0FBNEIsSUFDekIsT0FBQSxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQWxELENBQWtELENBQUM7OztBQUV4RCxJQUFNLGdCQUFnQixHQUFHLFVBQUMsaUJBQXNCO0lBQzlDLE9BQUEsaUJBQWlCLENBQUMscUJBQXFCLENBQUM7QUFBeEMsQ0FBd0MsQ0FBQzs7O0FBRTNDLElBQU0sdUJBQXVCLEdBQUcsVUFBQyxpQkFBc0I7O0lBQ3JELElBQU0sR0FBRyxHQUFHLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDLElB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QyxJQUFJLENBQ3pCLFVBQUEsSUFBSSxJQUFJLE9BQUEsV0FBVyxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxFQUFwQyxDQUFvQyxFQUM1QyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FDakMsQ0FBQyxDQUFDO1FBRVQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN4QjtJQUVELE1BQU0sQ0FBQyxTQUFTLENBQUM7Q0FDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFueUFjdGlvbiwgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJy4uL2NvbXBvbmVudHMvbmctcmVkdXgnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZVN0b3JlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9vYnNlcnZhYmxlLXN0b3JlJztcbmltcG9ydCB7XG4gIENvbXBhcmF0b3IsXG4gIFBhdGhTZWxlY3RvcixcbiAgU2VsZWN0b3IsXG4gIFRyYW5zZm9ybWVyLFxufSBmcm9tICcuLi9jb21wb25lbnRzL3NlbGVjdG9ycyc7XG5cbi8qKlxuICogVXNlZCB3aXRoIHRoZSBgQFdpdGhTdWJTdG9yZWAgY2xhc3MgZGVjb3JhdG9yIHRvIGRlZmluZSBhIFN1YlN0b3JlIChBS0EgYVxuICogZnJhY3RhbCBzdG9yZSkuXG4gKlxuICogRm9yIG1vcmUgaW5mbyBvbiBzdWJzdG9yZXMsIHNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXItcmVkdXgvc3RvcmUvYmxvYi9tYXN0ZXIvYXJ0aWNsZXMvZnJhY3RhbC1zdG9yZS5tZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZyYWN0YWxTdG9yZU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgYW4gaW5zdGFuY2UgbWV0aG9kIHRoYXQgd2lsbCBkZWZpbmUgdGhlXG4gICAqIGJhc2UgcGF0aCBmb3IgdGhlIHN1YlN0b3JlLiBUaGlzIG1ldGhvZCBpcyBleHBlY3RlZCB0byByZXR1cm4gYW4gYXJyYXlcbiAgICogb2YgcHJvcGVydHkgbmFtZXMgb3IgdW5kZWZpbmVkL251bGwuXG4gICAqL1xuICBiYXNlUGF0aE1ldGhvZE5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGxvY2FsUmVkdWNlciBmb3IgdGhlIHN1YnN0b3JlIGluIHF1ZXN0aW9uLlxuICAgKi9cbiAgbG9jYWxSZWR1Y2VyOiBSZWR1Y2VyPGFueSwgQW55QWN0aW9uPjtcbn1cblxuLyoqXG4gKiBPUFRJT05TX0tFWTogdGhpcyBpcyBwZXItY2xhc3MgKHN0YXRpYykgYW5kIGhvbGRzIHRoZSBjb25maWcgZnJvbSB0aGVcbiAqIEBTdWJTdG9yZSBkZWNvcmF0b3IuXG4gKi9cbmNvbnN0IE9QVElPTlNfS0VZID0gJ0Bhbmd1bGFyLXJlZHV4OjpzdWJzdG9yZTo6Y2xhc3M6Om9wdGlvbnMnO1xuXG4vKipcbiAqIElOU1RBTkNFX1NVQlNUT1JFX0tFWSwgSU5TVEFOQ0VfU0VMRUNUSU9OU19LRVk6IHRoZXNlIGFyZSBwZXItaW5zdGFuY2VcbiAqIChub24tc3RhdGljKSBhbmQgaG9sZHMgcmVmZXJlbmNlcyB0byB0aGUgc3Vic3RvcmVzL3NlbGVjdGVkIG9ic2VydmFibGVzXG4gKiB0byBiZSB1c2VkIGJ5IGFuIGluc3RhbmNlIG9mIGEgZGVjb3JhdGVkIGNsYXNzLiBJJ20gbm90IHVzaW5nXG4gKiByZWZsZWN0LW1ldGFkYXRhIGhlcmUgYmVjYXVzZSBJIHdhbnRcbiAqXG4gKiAxLiBkaWZmZXJlbnQgaW5zdGFuY2VzIHRvIGhhdmUgZGlmZmVyZW50IHN1YnN0b3JlcyBpbiB0aGUgY2FzZSB3aGVyZVxuICogYGJhc2VQYXRoTWV0aG9kTmFtZWAgaXMgZHluYW1pYy5cbiAqIDIuIHRoZSBpbnN0YW5jZSBzdWJzdG9yZSB0byBiZSBnYXJiYWdlIGNvbGxlY3RlZCB3aGVuIHRoZSBpbnN0YW5jZSBpcyBub1xuICogbG9uZ2VyIHJlYWNoYWJsZS5cbiAqIFRoaXMgaXMgdGhlcmVmb3JlIGFuIG93bi1wcm9wZXJ0eSBvbiB0aGUgYWN0dWFsIGluc3RhbmNlIG9mIHRoZSBkZWNvcmF0ZWRcbiAqIGNsYXNzLlxuICovXG5jb25zdCBJTlNUQU5DRV9TVUJTVE9SRV9LRVkgPSAnQGFuZ3VsYXItcmVkdXg6OnN1YnN0b3JlOjppbnN0YW5jZTo6c3RvcmUnO1xuY29uc3QgSU5TVEFOQ0VfU0VMRUNUSU9OU19LRVkgPVxuICAnQGFuZ3VsYXItcmVkdXg6OnN1YnN0b3JlOjppbnN0YW5jZTo6c2VsZWN0aW9ucyc7XG5cbi8qKlxuICogVXNlZCB0byBkZXRlY3Qgd2hlbiB0aGUgYmFzZSBwYXRoIGNoYW5nZXMgLSB0aGlzIGFsbG93cyBjb21wb25lbnRzIHRvXG4gKiBkeW5hbWljYWxseSBhZGp1c3QgdGhlaXIgc2VsZWN0aW9ucyBpZiBuZWNlc3NhcnkuXG4gKi9cbmNvbnN0IElOU1RBTkNFX0JBU0VfUEFUSF9LRVkgPSAnQGFuZ3VsYXItcmVkdXg6OnN1YnN0b3JlOjppbnN0YW5jZTo6YmFzZXBhdGgnO1xuXG5jb25zdCBnZXRDbGFzc09wdGlvbnMgPSAoZGVjb3JhdGVkSW5zdGFuY2U6IGFueSk6IEZyYWN0YWxTdG9yZU9wdGlvbnMgPT5cbiAgZGVjb3JhdGVkSW5zdGFuY2UuY29uc3RydWN0b3JbT1BUSU9OU19LRVldO1xuXG4vKiogQGhpZGRlbiAqL1xuZXhwb3J0IGNvbnN0IHNldENsYXNzT3B0aW9ucyA9IChcbiAgZGVjb3JhdGVkQ2xhc3NDb25zdHJ1Y3RvcjogYW55LFxuICBvcHRpb25zOiBGcmFjdGFsU3RvcmVPcHRpb25zLFxuKTogdm9pZCA9PiB7XG4gIGRlY29yYXRlZENsYXNzQ29uc3RydWN0b3JbT1BUSU9OU19LRVldID0gb3B0aW9ucztcbn07XG5cbi8vIEkgd2FudCB0aGUgc3RvcmUgdG8gYmUgc2F2ZWQgb24gdGhlIGFjdHVhbCBpbnN0YW5jZSBzb1xuLy8gMS4gZGlmZmVyZW50IGluc3RhbmNlcyBjYW4gaGF2ZSBkaXN0aW5jdCBzdWJzdG9yZXMgaWYgbmVjZXNzYXJ5XG4vLyAyLiB0aGUgc3Vic3RvcmUvc2VsZWN0aW9ucyB3aWxsIGJlIG1hcmtlZCBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uIHdoZW4gdGhlXG4vLyAgICBpbnN0YW5jZSBpcyBkZXN0cm95ZWQuXG5jb25zdCBzZXRJbnN0YW5jZVN0b3JlID0gKFxuICBkZWNvcmF0ZWRJbnN0YW5jZTogYW55LFxuICBzdG9yZT86IE9ic2VydmFibGVTdG9yZTxhbnk+LFxuKSA9PiAoZGVjb3JhdGVkSW5zdGFuY2VbSU5TVEFOQ0VfU1VCU1RPUkVfS0VZXSA9IHN0b3JlKTtcblxuY29uc3QgZ2V0SW5zdGFuY2VTdG9yZSA9IChkZWNvcmF0ZWRJbnN0YW5jZTogYW55KTogT2JzZXJ2YWJsZVN0b3JlPGFueT4gPT5cbiAgZGVjb3JhdGVkSW5zdGFuY2VbSU5TVEFOQ0VfU1VCU1RPUkVfS0VZXTtcblxuY29uc3QgZ2V0SW5zdGFuY2VTZWxlY3Rpb25NYXAgPSAoZGVjb3JhdGVkSW5zdGFuY2U6IGFueSkgPT4ge1xuICBjb25zdCBtYXAgPSBkZWNvcmF0ZWRJbnN0YW5jZVtJTlNUQU5DRV9TRUxFQ1RJT05TX0tFWV0gfHwge307XG4gIGRlY29yYXRlZEluc3RhbmNlW0lOU1RBTkNFX1NFTEVDVElPTlNfS0VZXSA9IG1hcDtcbiAgcmV0dXJuIG1hcDtcbn07XG5cbmNvbnN0IGhhc0Jhc2VQYXRoQ2hhbmdlZCA9IChcbiAgZGVjb3JhdGVkSW5zdGFuY2U6IGFueSxcbiAgYmFzZVBhdGg/OiBQYXRoU2VsZWN0b3IsXG4pOiBib29sZWFuID0+XG4gIGRlY29yYXRlZEluc3RhbmNlW0lOU1RBTkNFX0JBU0VfUEFUSF9LRVldICE9PSAoYmFzZVBhdGggfHwgW10pLnRvU3RyaW5nKCk7XG5cbmNvbnN0IHNldEluc3RhbmNlQmFzZVBhdGggPSAoXG4gIGRlY29yYXRlZEluc3RhbmNlOiBhbnksXG4gIGJhc2VQYXRoPzogUGF0aFNlbGVjdG9yLFxuKTogdm9pZCA9PiB7XG4gIGRlY29yYXRlZEluc3RhbmNlW0lOU1RBTkNFX0JBU0VfUEFUSF9LRVldID0gKGJhc2VQYXRoIHx8IFtdKS50b1N0cmluZygpO1xufTtcblxuY29uc3QgY2xlYXJJbnN0YW5jZVN0YXRlID0gKGRlY29yYXRlZEluc3RhbmNlOiBhbnkpID0+IHtcbiAgZGVjb3JhdGVkSW5zdGFuY2VbSU5TVEFOQ0VfU0VMRUNUSU9OU19LRVldID0gbnVsbDtcbiAgZGVjb3JhdGVkSW5zdGFuY2VbSU5TVEFOQ0VfU1VCU1RPUkVfS0VZXSA9IG51bGw7XG4gIGRlY29yYXRlZEluc3RhbmNlW0lOU1RBTkNFX0JBU0VfUEFUSF9LRVldID0gbnVsbDtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgc3RvcmUgYXNzb2NpYXRlZCB3aXRoIGEgZGVjb3JhdGVkIGluc3RhbmNlIChlLmcuIGFcbiAqIGNvbXBvbmVudCBvciBzZXJ2aWNlKVxuICogQGhpZGRlblxuICovXG5leHBvcnQgY29uc3QgZ2V0QmFzZVN0b3JlID0gKFxuICBkZWNvcmF0ZWRJbnN0YW5jZTogYW55LFxuKTogT2JzZXJ2YWJsZVN0b3JlPGFueT4gfCB1bmRlZmluZWQgPT4ge1xuICAvLyBUaGUgcm9vdCBzdG9yZSBoYXNuJ3QgYmVlbiBzZXQgdXAgeWV0LlxuICBpZiAoIU5nUmVkdXguaW5zdGFuY2UpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3Qgb3B0aW9ucyA9IGdldENsYXNzT3B0aW9ucyhkZWNvcmF0ZWRJbnN0YW5jZSk7XG5cbiAgLy8gVGhpcyBpcyBub3QgZGVjb3JhdGVkIHdpdGggYEBXaXRoU3ViU3RvcmVgLiBSZXR1cm4gdGhlIHJvb3Qgc3RvcmUuXG4gIGlmICghb3B0aW9ucykge1xuICAgIHJldHVybiBOZ1JlZHV4Lmluc3RhbmNlO1xuICB9XG5cbiAgLy8gRHluYW1pYyBiYXNlIHBhdGggc3VwcG9ydDpcbiAgY29uc3QgYmFzZVBhdGggPSBkZWNvcmF0ZWRJbnN0YW5jZVtvcHRpb25zLmJhc2VQYXRoTWV0aG9kTmFtZV0oKTtcbiAgaWYgKGhhc0Jhc2VQYXRoQ2hhbmdlZChkZWNvcmF0ZWRJbnN0YW5jZSwgYmFzZVBhdGgpKSB7XG4gICAgY2xlYXJJbnN0YW5jZVN0YXRlKGRlY29yYXRlZEluc3RhbmNlKTtcbiAgICBzZXRJbnN0YW5jZUJhc2VQYXRoKGRlY29yYXRlZEluc3RhbmNlLCBiYXNlUGF0aCk7XG4gIH1cblxuICBpZiAoIWJhc2VQYXRoKSB7XG4gICAgcmV0dXJuIE5nUmVkdXguaW5zdGFuY2U7XG4gIH1cblxuICBjb25zdCBzdG9yZSA9IGdldEluc3RhbmNlU3RvcmUoZGVjb3JhdGVkSW5zdGFuY2UpO1xuICBpZiAoIXN0b3JlKSB7XG4gICAgc2V0SW5zdGFuY2VTdG9yZShcbiAgICAgIGRlY29yYXRlZEluc3RhbmNlLFxuICAgICAgTmdSZWR1eC5pbnN0YW5jZS5jb25maWd1cmVTdWJTdG9yZShiYXNlUGF0aCwgb3B0aW9ucy5sb2NhbFJlZHVjZXIpLFxuICAgICk7XG4gIH1cblxuICByZXR1cm4gZ2V0SW5zdGFuY2VTdG9yZShkZWNvcmF0ZWRJbnN0YW5jZSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSBmcm9tIHRoZSBnaXZlbiBzZWxlY3Rpb24gcGFyYW1ldGVycyxcbiAqIHJvb3RlZCBhdCBkZWNvcmF0ZWRJbnN0YW5jZSdzIHN0b3JlLCBhbmQgY2FjaGVzIGl0IG9uIHRoZVxuICogaW5zdGFuY2UgZm9yIGZ1dHVyZSB1c2UuXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRJbnN0YW5jZVNlbGVjdGlvbiA9IDxUPihcbiAgZGVjb3JhdGVkSW5zdGFuY2U6IGFueSxcbiAga2V5OiBzdHJpbmcgfCBzeW1ib2wsXG4gIHNlbGVjdG9yOiBTZWxlY3RvcjxhbnksIFQ+LFxuICB0cmFuc2Zvcm1lcj86IFRyYW5zZm9ybWVyPGFueSwgVD4sXG4gIGNvbXBhcmF0b3I/OiBDb21wYXJhdG9yLFxuKSA9PiB7XG4gIGNvbnN0IHN0b3JlID0gZ2V0QmFzZVN0b3JlKGRlY29yYXRlZEluc3RhbmNlKTtcblxuICBpZiAoc3RvcmUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb25zID0gZ2V0SW5zdGFuY2VTZWxlY3Rpb25NYXAoZGVjb3JhdGVkSW5zdGFuY2UpO1xuXG4gICAgc2VsZWN0aW9uc1trZXldID1cbiAgICAgIHNlbGVjdGlvbnNba2V5XSB8fFxuICAgICAgKCF0cmFuc2Zvcm1lclxuICAgICAgICA/IHN0b3JlLnNlbGVjdChzZWxlY3RvciwgY29tcGFyYXRvcilcbiAgICAgICAgOiBzdG9yZS5zZWxlY3Qoc2VsZWN0b3IpLnBpcGUoXG4gICAgICAgICAgICBvYnMkID0+IHRyYW5zZm9ybWVyKG9icyQsIGRlY29yYXRlZEluc3RhbmNlKSxcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKGNvbXBhcmF0b3IpLFxuICAgICAgICAgICkpO1xuXG4gICAgcmV0dXJuIHNlbGVjdGlvbnNba2V5XTtcbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59O1xuIl19