/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { getInstanceSelection } from './helpers';
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
export function select(selector, comparator) {
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
export function select$(selector, transformer, comparator) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL3NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sV0FBVyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJqRCxNQUFNLGlCQUNKLFFBQTJCLEVBQzNCLFVBQXVCO0lBRXZCLE1BQU0sQ0FBQyxVQUFDLE1BQVcsRUFBRSxHQUFvQjs7UUFDdkMsSUFBTSxnQkFBZ0IsR0FBRyxRQUFRO1lBQy9CLENBQUMsQ0FBQyxRQUFRO1lBQ1YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUN2RCxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDVixRQUFRLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNoRSxDQUFDO0NBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJELE1BQU0sa0JBQ0osUUFBMEIsRUFDMUIsV0FBZ0MsRUFDaEMsVUFBdUI7SUFFdkIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0NBQ3BEOzs7Ozs7O0FBRUQsa0JBQ0UsUUFBNEIsRUFDNUIsV0FBbUMsRUFDbkMsVUFBdUI7SUFFdkIsTUFBTSxDQUFDLG1CQUFtQixNQUFXLEVBQUUsR0FBRzs7Ozs7UUFDeEM7WUFDRSxNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQzNFOztRQUdELEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ2pDLEdBQUcsRUFBRSxNQUFNO2dCQUNYLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixZQUFZLEVBQUUsSUFBSTthQUNuQixDQUFDLENBQUM7U0FDSjtLQUNGLENBQUM7Q0FDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBhcmF0b3IsIFNlbGVjdG9yLCBUcmFuc2Zvcm1lciB9IGZyb20gJy4uL2NvbXBvbmVudHMvc2VsZWN0b3JzJztcbmltcG9ydCB7IGdldEluc3RhbmNlU2VsZWN0aW9uIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuLyoqXG4gKiBTZWxlY3RzIGFuIG9ic2VydmFibGUgZnJvbSB0aGUgc3RvcmUsIGFuZCBhdHRhY2hlcyBpdCB0byB0aGUgZGVjb3JhdGVkXG4gKiBwcm9wZXJ0eS5cbiAqXG4gKiBgYGB0c1xuICogIGltcG9ydCB7IHNlbGVjdCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbiAqXG4gKiAgY2xhc3MgU29tZUNsYXNzIHtcbiAqICAgIEBzZWxlY3QoWydmb28nLCdiYXInXSkgZm9vJDogT2JzZXJ2YWJsZTxzdHJpbmc+XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gc2VsZWN0b3JcbiAqIEEgc2VsZWN0b3IgZnVuY3Rpb24sIHByb3BlcnR5IG5hbWUgc3RyaW5nLCBvciBwcm9wZXJ0eSBuYW1lIHBhdGhcbiAqIChhcnJheSBvZiBzdHJpbmdzL2FycmF5IGluZGljZXMpIHRoYXQgbG9jYXRlcyB0aGUgc3RvcmUgZGF0YSB0byBiZVxuICogc2VsZWN0ZWRcbiAqXG4gKiBAcGFyYW0gY29tcGFyYXRvciBGdW5jdGlvbiB1c2VkIHRvIGRldGVybWluZSBpZiB0aGlzIHNlbGVjdG9yIGhhcyBjaGFuZ2VkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFQ+KFxuICBzZWxlY3Rvcj86IFNlbGVjdG9yPGFueSwgVD4sXG4gIGNvbXBhcmF0b3I/OiBDb21wYXJhdG9yLFxuKTogUHJvcGVydHlEZWNvcmF0b3Ige1xuICByZXR1cm4gKHRhcmdldDogYW55LCBrZXk6IHN0cmluZyB8IHN5bWJvbCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGFkanVzdGVkU2VsZWN0b3IgPSBzZWxlY3RvclxuICAgICAgPyBzZWxlY3RvclxuICAgICAgOiBTdHJpbmcoa2V5KS5sYXN0SW5kZXhPZignJCcpID09PSBTdHJpbmcoa2V5KS5sZW5ndGggLSAxXG4gICAgICAgID8gU3RyaW5nKGtleSkuc3Vic3RyaW5nKDAsIFN0cmluZyhrZXkpLmxlbmd0aCAtIDEpXG4gICAgICAgIDoga2V5O1xuICAgIGRlY29yYXRlKGFkanVzdGVkU2VsZWN0b3IsIHVuZGVmaW5lZCwgY29tcGFyYXRvcikodGFyZ2V0LCBrZXkpO1xuICB9O1xufVxuXG4vKipcbiAqIFNlbGVjdHMgYW4gb2JzZXJ2YWJsZSB1c2luZyB0aGUgZ2l2ZW4gcGF0aCBzZWxlY3RvciwgYW5kIHJ1bnMgaXQgdGhyb3VnaCB0aGVcbiAqIGdpdmVuIHRyYW5zZm9ybWVyIGZ1bmN0aW9uLiBBIHRyYW5zZm9ybWVyIGZ1bmN0aW9uIHRha2VzIHRoZSBzdG9yZVxuICogb2JzZXJ2YWJsZSBhcyBhbiBpbnB1dCBhbmQgcmV0dXJucyBhIGRlcml2ZWQgb2JzZXJ2YWJsZSBmcm9tIGl0LiBUaGF0IGRlcml2ZWRcbiAqICBvYnNlcnZhYmxlIGlzIHJ1biB0aHJvdWdoIGRpc3RpbmN0VW50aWxDaGFuZ2VzIHdpdGggdGhlIGdpdmVuIG9wdGlvbmFsXG4gKiBjb21wYXJhdG9yIGFuZCBhdHRhY2hlZCB0byB0aGUgc3RvcmUgcHJvcGVydHkuXG4gKlxuICogVGhpbmsgb2YgYSBUcmFuc2Zvcm1lciBhcyBhIEZ1bmN0aW9uU2VsZWN0b3IgdGhhdCBvcGVyYXRlcyBvbiBvYnNlcnZhYmxlc1xuICogaW5zdGVhZCBvZiB2YWx1ZXMuXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IHNlbGVjdCQgfSBmcm9tICdhbmd1bGFyLXJlZHV4L3N0b3JlJztcbiAqXG4gKiBleHBvcnQgY29uc3QgZGVib3VuY2VBbmRUcmlwbGUgPSBvYnMkID0+IG9icyRcbiAqICAuZGVib3VuY2UoMzAwKVxuICogIC5tYXAoeCA9PiAzICogeCk7XG4gKlxuICogY2xhc3MgRm9vIHtcbiAqICBAc2VsZWN0JChbJ2ZvbycsICdiYXInXSwgZGVib3VuY2VBbmRUcmlwbGUpXG4gKiAgcmVhZG9ubHkgZGVib3VuY2VkRm9vQmFyJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3QkPFQ+KFxuICBzZWxlY3RvcjogU2VsZWN0b3I8YW55LCBUPixcbiAgdHJhbnNmb3JtZXI6IFRyYW5zZm9ybWVyPGFueSwgVD4sXG4gIGNvbXBhcmF0b3I/OiBDb21wYXJhdG9yLFxuKTogUHJvcGVydHlEZWNvcmF0b3Ige1xuICByZXR1cm4gZGVjb3JhdGUoc2VsZWN0b3IsIHRyYW5zZm9ybWVyLCBjb21wYXJhdG9yKTtcbn1cblxuZnVuY3Rpb24gZGVjb3JhdGUoXG4gIHNlbGVjdG9yOiBTZWxlY3RvcjxhbnksIGFueT4sXG4gIHRyYW5zZm9ybWVyPzogVHJhbnNmb3JtZXI8YW55LCBhbnk+LFxuICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbik6IFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRlY29yYXRvcih0YXJnZXQ6IGFueSwga2V5KTogdm9pZCB7XG4gICAgZnVuY3Rpb24gZ2V0dGVyKHRoaXM6IGFueSkge1xuICAgICAgcmV0dXJuIGdldEluc3RhbmNlU2VsZWN0aW9uKHRoaXMsIGtleSwgc2VsZWN0b3IsIHRyYW5zZm9ybWVyLCBjb21wYXJhdG9yKTtcbiAgICB9XG5cbiAgICAvLyBSZXBsYWNlIGRlY29yYXRlZCBwcm9wZXJ0eSB3aXRoIGEgZ2V0dGVyIHRoYXQgcmV0dXJucyB0aGUgb2JzZXJ2YWJsZS5cbiAgICBpZiAoZGVsZXRlIHRhcmdldFtrZXldKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHtcbiAgICAgICAgZ2V0OiBnZXR0ZXIsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==