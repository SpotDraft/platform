/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * This interface represents the glue that connects the
 * subscription-oriented Redux Store with the RXJS Observable-oriented
 * Angular component world.
 *
 * Augments the basic Redux store interface with methods to
 * enable selection and fractalization.
 * @record
 * @template StateType
 */
export function ObservableStore() { }
/**
 * Select a slice of state to expose as an observable.
 *
 * \@typeparam S
 * \@param selector key or function to select a part of the state
 * \@param [comparator] Optional
 * comparison function called to test if an item is distinct
 * from the previous item in the source.
 *
 * \@return An Observable that emits items from the
 * source Observable with distinct values.
 * @type {?}
 */
ObservableStore.prototype.select;
/**
 * Carves off a 'subStore' or 'fractal' store from this one.
 *
 * The returned object is itself an observable store, however any
 * selections, dispatches, or invocations of localReducer will be
 * specific to that substore and will not know about the parent
 * ObservableStore from which it was created.
 *
 * This is handy for encapsulating component or module state while
 * still benefiting from time-travel, etc.
 * @type {?}
 */
ObservableStore.prototype.configureSubStore;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZS1zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9vYnNlcnZhYmxlLXN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbnlBY3Rpb24sIFJlZHVjZXIsIFN0b3JlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29tcGFyYXRvciwgUGF0aFNlbGVjdG9yLCBTZWxlY3RvciB9IGZyb20gJy4vc2VsZWN0b3JzJztcblxuLyoqXG4gKiBUaGlzIGludGVyZmFjZSByZXByZXNlbnRzIHRoZSBnbHVlIHRoYXQgY29ubmVjdHMgdGhlXG4gKiBzdWJzY3JpcHRpb24tb3JpZW50ZWQgUmVkdXggU3RvcmUgd2l0aCB0aGUgUlhKUyBPYnNlcnZhYmxlLW9yaWVudGVkXG4gKiBBbmd1bGFyIGNvbXBvbmVudCB3b3JsZC5cbiAqXG4gKiBBdWdtZW50cyB0aGUgYmFzaWMgUmVkdXggc3RvcmUgaW50ZXJmYWNlIHdpdGggbWV0aG9kcyB0b1xuICogZW5hYmxlIHNlbGVjdGlvbiBhbmQgZnJhY3RhbGl6YXRpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgT2JzZXJ2YWJsZVN0b3JlPFN0YXRlVHlwZT4gZXh0ZW5kcyBTdG9yZTxTdGF0ZVR5cGU+IHtcbiAgLyoqXG4gICAqIFNlbGVjdCBhIHNsaWNlIG9mIHN0YXRlIHRvIGV4cG9zZSBhcyBhbiBvYnNlcnZhYmxlLlxuICAgKlxuICAgKiBAdHlwZXBhcmFtIFNcbiAgICogQHBhcmFtIHNlbGVjdG9yIGtleSBvciBmdW5jdGlvbiB0byBzZWxlY3QgYSBwYXJ0IG9mIHRoZSBzdGF0ZVxuICAgKiBAcGFyYW0gW2NvbXBhcmF0b3JdIE9wdGlvbmFsXG4gICAqIGNvbXBhcmlzb24gZnVuY3Rpb24gY2FsbGVkIHRvIHRlc3QgaWYgYW4gaXRlbSBpcyBkaXN0aW5jdFxuICAgKiBmcm9tIHRoZSBwcmV2aW91cyBpdGVtIGluIHRoZSBzb3VyY2UuXG4gICAqXG4gICAqIEByZXR1cm5zIEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBpdGVtcyBmcm9tIHRoZVxuICAgKiBzb3VyY2UgT2JzZXJ2YWJsZSB3aXRoIGRpc3RpbmN0IHZhbHVlcy5cbiAgICovXG4gIHNlbGVjdDogPFNlbGVjdGVkVHlwZT4oXG4gICAgc2VsZWN0b3I6IFNlbGVjdG9yPFN0YXRlVHlwZSwgU2VsZWN0ZWRUeXBlPixcbiAgICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbiAgKSA9PiBPYnNlcnZhYmxlPFNlbGVjdGVkVHlwZT47XG5cbiAgLyoqXG4gICAqIENhcnZlcyBvZmYgYSAnc3ViU3RvcmUnIG9yICdmcmFjdGFsJyBzdG9yZSBmcm9tIHRoaXMgb25lLlxuICAgKlxuICAgKiBUaGUgcmV0dXJuZWQgb2JqZWN0IGlzIGl0c2VsZiBhbiBvYnNlcnZhYmxlIHN0b3JlLCBob3dldmVyIGFueVxuICAgKiBzZWxlY3Rpb25zLCBkaXNwYXRjaGVzLCBvciBpbnZvY2F0aW9ucyBvZiBsb2NhbFJlZHVjZXIgd2lsbCBiZVxuICAgKiBzcGVjaWZpYyB0byB0aGF0IHN1YnN0b3JlIGFuZCB3aWxsIG5vdCBrbm93IGFib3V0IHRoZSBwYXJlbnRcbiAgICogT2JzZXJ2YWJsZVN0b3JlIGZyb20gd2hpY2ggaXQgd2FzIGNyZWF0ZWQuXG4gICAqXG4gICAqIFRoaXMgaXMgaGFuZHkgZm9yIGVuY2Fwc3VsYXRpbmcgY29tcG9uZW50IG9yIG1vZHVsZSBzdGF0ZSB3aGlsZVxuICAgKiBzdGlsbCBiZW5lZml0aW5nIGZyb20gdGltZS10cmF2ZWwsIGV0Yy5cbiAgICovXG4gIGNvbmZpZ3VyZVN1YlN0b3JlOiA8U3ViU3RhdGU+KFxuICAgIGJhc2VQYXRoOiBQYXRoU2VsZWN0b3IsXG4gICAgbG9jYWxSZWR1Y2VyOiBSZWR1Y2VyPFN1YlN0YXRlLCBBbnlBY3Rpb24+LFxuICApID0+IE9ic2VydmFibGVTdG9yZTxTdWJTdGF0ZT47XG59XG4iXX0=