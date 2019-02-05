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
var NgRedux = /** @class */ (function () {
    function NgRedux() {
    }
    /**
     * \@hidden, \@deprecated
     */
    NgRedux.instance = undefined;
    return NgRedux;
}());
export { NgRedux };
if (false) {
    /**
     * \@hidden, \@deprecated
     * @type {?}
     */
    NgRedux.instance;
    /**
     * Configures a Redux store and allows NgRedux to observe and dispatch
     * to it.
     *
     * This should only be called once for the lifetime of your app, for
     * example in the constructor of your root component.
     *
     * \@param rootReducer Your app's root reducer
     * \@param initState Your app's initial state
     * \@param middleware Optional Redux middlewares
     * \@param enhancers Optional Redux store enhancers
     * @type {?}
     */
    NgRedux.prototype.configureStore;
    /**
     * Accepts a Redux store, then sets it in NgRedux and
     * allows NgRedux to observe and dispatch to it.
     *
     * This should only be called once for the lifetime of your app, for
     * example in the constructor of your root component. If configureStore
     * has been used this cannot be used.
     *
     * \@param store Your app's store
     * @type {?}
     */
    NgRedux.prototype.provideStore;
    /** @type {?} */
    NgRedux.prototype.dispatch;
    /** @type {?} */
    NgRedux.prototype.getState;
    /** @type {?} */
    NgRedux.prototype.subscribe;
    /** @type {?} */
    NgRedux.prototype.replaceReducer;
    /** @type {?} */
    NgRedux.prototype.select;
    /** @type {?} */
    NgRedux.prototype.configureSubStore;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVkdXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbmctcmVkdXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBb0IyQyxTQUFTO2tCQXBCcEQ7O1NBa0JzQixPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQW55QWN0aW9uLFxuICBEaXNwYXRjaCxcbiAgTWlkZGxld2FyZSxcbiAgUmVkdWNlcixcbiAgU3RvcmUsXG4gIFN0b3JlRW5oYW5jZXIsXG4gIFVuc3Vic2NyaWJlLFxufSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlU3RvcmUgfSBmcm9tICcuL29ic2VydmFibGUtc3RvcmUnO1xuaW1wb3J0IHsgQ29tcGFyYXRvciwgUGF0aFNlbGVjdG9yLCBTZWxlY3RvciB9IGZyb20gJy4vc2VsZWN0b3JzJztcblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBwdWJsaWMgaW50ZXJmYWNlIG9mIEBhbmd1bGFyLXJlZHV4L3N0b3JlLiBJdCB3cmFwcyB0aGUgZ2xvYmFsXG4gKiByZWR1eCBzdG9yZSBhbmQgYWRkcyBhIGZldyBvdGhlciBhZGQgb24gbWV0aG9kcy4gSXQncyB3aGF0IHlvdSdsbCBpbmplY3RcbiAqIGludG8geW91ciBBbmd1bGFyIGFwcGxpY2F0aW9uIGFzIGEgc2VydmljZS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5nUmVkdXg8Um9vdFN0YXRlPiBpbXBsZW1lbnRzIE9ic2VydmFibGVTdG9yZTxSb290U3RhdGU+IHtcbiAgLyoqIEBoaWRkZW4sIEBkZXByZWNhdGVkICovXG4gIHN0YXRpYyBpbnN0YW5jZT86IE9ic2VydmFibGVTdG9yZTxhbnk+ID0gdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIGEgUmVkdXggc3RvcmUgYW5kIGFsbG93cyBOZ1JlZHV4IHRvIG9ic2VydmUgYW5kIGRpc3BhdGNoXG4gICAqIHRvIGl0LlxuICAgKlxuICAgKiBUaGlzIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbmNlIGZvciB0aGUgbGlmZXRpbWUgb2YgeW91ciBhcHAsIGZvclxuICAgKiBleGFtcGxlIGluIHRoZSBjb25zdHJ1Y3RvciBvZiB5b3VyIHJvb3QgY29tcG9uZW50LlxuICAgKlxuICAgKiBAcGFyYW0gcm9vdFJlZHVjZXIgWW91ciBhcHAncyByb290IHJlZHVjZXJcbiAgICogQHBhcmFtIGluaXRTdGF0ZSBZb3VyIGFwcCdzIGluaXRpYWwgc3RhdGVcbiAgICogQHBhcmFtIG1pZGRsZXdhcmUgT3B0aW9uYWwgUmVkdXggbWlkZGxld2FyZXNcbiAgICogQHBhcmFtIGVuaGFuY2VycyBPcHRpb25hbCBSZWR1eCBzdG9yZSBlbmhhbmNlcnNcbiAgICovXG4gIGFic3RyYWN0IGNvbmZpZ3VyZVN0b3JlOiAoXG4gICAgcm9vdFJlZHVjZXI6IFJlZHVjZXI8Um9vdFN0YXRlLCBBbnlBY3Rpb24+LFxuICAgIGluaXRTdGF0ZTogUm9vdFN0YXRlLFxuICAgIG1pZGRsZXdhcmU/OiBNaWRkbGV3YXJlW10sXG4gICAgZW5oYW5jZXJzPzogU3RvcmVFbmhhbmNlcjxSb290U3RhdGU+W10sXG4gICkgPT4gdm9pZDtcblxuICAvKipcbiAgICogQWNjZXB0cyBhIFJlZHV4IHN0b3JlLCB0aGVuIHNldHMgaXQgaW4gTmdSZWR1eCBhbmRcbiAgICogYWxsb3dzIE5nUmVkdXggdG8gb2JzZXJ2ZSBhbmQgZGlzcGF0Y2ggdG8gaXQuXG4gICAqXG4gICAqIFRoaXMgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uY2UgZm9yIHRoZSBsaWZldGltZSBvZiB5b3VyIGFwcCwgZm9yXG4gICAqIGV4YW1wbGUgaW4gdGhlIGNvbnN0cnVjdG9yIG9mIHlvdXIgcm9vdCBjb21wb25lbnQuIElmIGNvbmZpZ3VyZVN0b3JlXG4gICAqIGhhcyBiZWVuIHVzZWQgdGhpcyBjYW5ub3QgYmUgdXNlZC5cbiAgICpcbiAgICogQHBhcmFtIHN0b3JlIFlvdXIgYXBwJ3Mgc3RvcmVcbiAgICovXG4gIGFic3RyYWN0IHByb3ZpZGVTdG9yZTogKHN0b3JlOiBTdG9yZTxSb290U3RhdGU+KSA9PiB2b2lkO1xuXG4gIC8vIFJlZHV4IFN0b3JlIG1ldGhvZHNcbiAgYWJzdHJhY3QgZGlzcGF0Y2g6IERpc3BhdGNoPEFueUFjdGlvbj47XG4gIGFic3RyYWN0IGdldFN0YXRlOiAoKSA9PiBSb290U3RhdGU7XG4gIGFic3RyYWN0IHN1YnNjcmliZTogKGxpc3RlbmVyOiAoKSA9PiB2b2lkKSA9PiBVbnN1YnNjcmliZTtcbiAgYWJzdHJhY3QgcmVwbGFjZVJlZHVjZXI6IChuZXh0UmVkdWNlcjogUmVkdWNlcjxSb290U3RhdGUsIEFueUFjdGlvbj4pID0+IHZvaWQ7XG5cbiAgLy8gT2JzZXJ2YWJsZVN0b3JlIG1ldGhvZHMuXG4gIGFic3RyYWN0IHNlbGVjdDogPFNlbGVjdGVkVHlwZT4oXG4gICAgc2VsZWN0b3I/OiBTZWxlY3RvcjxSb290U3RhdGUsIFNlbGVjdGVkVHlwZT4sXG4gICAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4gICkgPT4gT2JzZXJ2YWJsZTxTZWxlY3RlZFR5cGU+O1xuICBhYnN0cmFjdCBjb25maWd1cmVTdWJTdG9yZTogPFN1YlN0YXRlPihcbiAgICBiYXNlUGF0aDogUGF0aFNlbGVjdG9yLFxuICAgIGxvY2FsUmVkdWNlcjogUmVkdWNlcjxTdWJTdGF0ZSwgQW55QWN0aW9uPixcbiAgKSA9PiBPYnNlcnZhYmxlU3RvcmU8U3ViU3RhdGU+O1xufVxuIl19