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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL3NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sV0FBVyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJqRCxNQUFNLGlCQUNKLFFBQTJCLEVBQzNCLFVBQXVCO0lBRXZCLE1BQU0sQ0FBQyxDQUFDLE1BQVcsRUFBRSxHQUFvQixFQUFRLEVBQUU7O1FBQ2pELE1BQU0sZ0JBQWdCLEdBQUcsUUFBUTtZQUMvQixDQUFDLENBQUMsUUFBUTtZQUNWLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDdkQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ1YsUUFBUSxDQUFDLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDaEUsQ0FBQztDQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCRCxNQUFNLGtCQUNKLFFBQTBCLEVBQzFCLFdBQWdDLEVBQ2hDLFVBQXVCO0lBRXZCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUNwRDs7Ozs7OztBQUVELGtCQUNFLFFBQTRCLEVBQzVCLFdBQW1DLEVBQ25DLFVBQXVCO0lBRXZCLE1BQU0sQ0FBQyxtQkFBbUIsTUFBVyxFQUFFLEdBQUc7Ozs7O1FBQ3hDO1lBQ0UsTUFBTSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUMzRTs7UUFHRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUNqQyxHQUFHLEVBQUUsTUFBTTtnQkFDWCxVQUFVLEVBQUUsSUFBSTtnQkFDaEIsWUFBWSxFQUFFLElBQUk7YUFDbkIsQ0FBQyxDQUFDO1NBQ0o7S0FDRixDQUFDO0NBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wYXJhdG9yLCBTZWxlY3RvciwgVHJhbnNmb3JtZXIgfSBmcm9tICcuLi9jb21wb25lbnRzL3NlbGVjdG9ycyc7XG5pbXBvcnQgeyBnZXRJbnN0YW5jZVNlbGVjdGlvbiB9IGZyb20gJy4vaGVscGVycyc7XG5cbi8qKlxuICogU2VsZWN0cyBhbiBvYnNlcnZhYmxlIGZyb20gdGhlIHN0b3JlLCBhbmQgYXR0YWNoZXMgaXQgdG8gdGhlIGRlY29yYXRlZFxuICogcHJvcGVydHkuXG4gKlxuICogYGBgdHNcbiAqICBpbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG4gKlxuICogIGNsYXNzIFNvbWVDbGFzcyB7XG4gKiAgICBAc2VsZWN0KFsnZm9vJywnYmFyJ10pIGZvbyQ6IE9ic2VydmFibGU8c3RyaW5nPlxuICogfVxuICogYGBgXG4gKlxuICogQHBhcmFtIHNlbGVjdG9yXG4gKiBBIHNlbGVjdG9yIGZ1bmN0aW9uLCBwcm9wZXJ0eSBuYW1lIHN0cmluZywgb3IgcHJvcGVydHkgbmFtZSBwYXRoXG4gKiAoYXJyYXkgb2Ygc3RyaW5ncy9hcnJheSBpbmRpY2VzKSB0aGF0IGxvY2F0ZXMgdGhlIHN0b3JlIGRhdGEgdG8gYmVcbiAqIHNlbGVjdGVkXG4gKlxuICogQHBhcmFtIGNvbXBhcmF0b3IgRnVuY3Rpb24gdXNlZCB0byBkZXRlcm1pbmUgaWYgdGhpcyBzZWxlY3RvciBoYXMgY2hhbmdlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxUPihcbiAgc2VsZWN0b3I/OiBTZWxlY3RvcjxhbnksIFQ+LFxuICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbik6IFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgcmV0dXJuICh0YXJnZXQ6IGFueSwga2V5OiBzdHJpbmcgfCBzeW1ib2wpOiB2b2lkID0+IHtcbiAgICBjb25zdCBhZGp1c3RlZFNlbGVjdG9yID0gc2VsZWN0b3JcbiAgICAgID8gc2VsZWN0b3JcbiAgICAgIDogU3RyaW5nKGtleSkubGFzdEluZGV4T2YoJyQnKSA9PT0gU3RyaW5nKGtleSkubGVuZ3RoIC0gMVxuICAgICAgICA/IFN0cmluZyhrZXkpLnN1YnN0cmluZygwLCBTdHJpbmcoa2V5KS5sZW5ndGggLSAxKVxuICAgICAgICA6IGtleTtcbiAgICBkZWNvcmF0ZShhZGp1c3RlZFNlbGVjdG9yLCB1bmRlZmluZWQsIGNvbXBhcmF0b3IpKHRhcmdldCwga2V5KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBTZWxlY3RzIGFuIG9ic2VydmFibGUgdXNpbmcgdGhlIGdpdmVuIHBhdGggc2VsZWN0b3IsIGFuZCBydW5zIGl0IHRocm91Z2ggdGhlXG4gKiBnaXZlbiB0cmFuc2Zvcm1lciBmdW5jdGlvbi4gQSB0cmFuc2Zvcm1lciBmdW5jdGlvbiB0YWtlcyB0aGUgc3RvcmVcbiAqIG9ic2VydmFibGUgYXMgYW4gaW5wdXQgYW5kIHJldHVybnMgYSBkZXJpdmVkIG9ic2VydmFibGUgZnJvbSBpdC4gVGhhdCBkZXJpdmVkXG4gKiAgb2JzZXJ2YWJsZSBpcyBydW4gdGhyb3VnaCBkaXN0aW5jdFVudGlsQ2hhbmdlcyB3aXRoIHRoZSBnaXZlbiBvcHRpb25hbFxuICogY29tcGFyYXRvciBhbmQgYXR0YWNoZWQgdG8gdGhlIHN0b3JlIHByb3BlcnR5LlxuICpcbiAqIFRoaW5rIG9mIGEgVHJhbnNmb3JtZXIgYXMgYSBGdW5jdGlvblNlbGVjdG9yIHRoYXQgb3BlcmF0ZXMgb24gb2JzZXJ2YWJsZXNcbiAqIGluc3RlYWQgb2YgdmFsdWVzLlxuICpcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBzZWxlY3QkIH0gZnJvbSAnYW5ndWxhci1yZWR1eC9zdG9yZSc7XG4gKlxuICogZXhwb3J0IGNvbnN0IGRlYm91bmNlQW5kVHJpcGxlID0gb2JzJCA9PiBvYnMkXG4gKiAgLmRlYm91bmNlKDMwMClcbiAqICAubWFwKHggPT4gMyAqIHgpO1xuICpcbiAqIGNsYXNzIEZvbyB7XG4gKiAgQHNlbGVjdCQoWydmb28nLCAnYmFyJ10sIGRlYm91bmNlQW5kVHJpcGxlKVxuICogIHJlYWRvbmx5IGRlYm91bmNlZEZvb0JhciQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0JDxUPihcbiAgc2VsZWN0b3I6IFNlbGVjdG9yPGFueSwgVD4sXG4gIHRyYW5zZm9ybWVyOiBUcmFuc2Zvcm1lcjxhbnksIFQ+LFxuICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbik6IFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgcmV0dXJuIGRlY29yYXRlKHNlbGVjdG9yLCB0cmFuc2Zvcm1lciwgY29tcGFyYXRvcik7XG59XG5cbmZ1bmN0aW9uIGRlY29yYXRlKFxuICBzZWxlY3RvcjogU2VsZWN0b3I8YW55LCBhbnk+LFxuICB0cmFuc2Zvcm1lcj86IFRyYW5zZm9ybWVyPGFueSwgYW55PixcbiAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4pOiBQcm9wZXJ0eURlY29yYXRvciB7XG4gIHJldHVybiBmdW5jdGlvbiBkZWNvcmF0b3IodGFyZ2V0OiBhbnksIGtleSk6IHZvaWQge1xuICAgIGZ1bmN0aW9uIGdldHRlcih0aGlzOiBhbnkpIHtcbiAgICAgIHJldHVybiBnZXRJbnN0YW5jZVNlbGVjdGlvbih0aGlzLCBrZXksIHNlbGVjdG9yLCB0cmFuc2Zvcm1lciwgY29tcGFyYXRvcik7XG4gICAgfVxuXG4gICAgLy8gUmVwbGFjZSBkZWNvcmF0ZWQgcHJvcGVydHkgd2l0aCBhIGdldHRlciB0aGF0IHJldHVybnMgdGhlIG9ic2VydmFibGUuXG4gICAgaWYgKGRlbGV0ZSB0YXJnZXRba2V5XSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XG4gICAgICAgIGdldDogZ2V0dGVyLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG4iXX0=