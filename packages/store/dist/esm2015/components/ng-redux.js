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
export class NgRedux {
}
/**
 * \@hidden, \@deprecated
 */
NgRedux.instance = undefined;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVkdXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbmctcmVkdXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFrQkEsTUFBTTs7Ozs7bUJBRXFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBbnlBY3Rpb24sXG4gIERpc3BhdGNoLFxuICBNaWRkbGV3YXJlLFxuICBSZWR1Y2VyLFxuICBTdG9yZSxcbiAgU3RvcmVFbmhhbmNlcixcbiAgVW5zdWJzY3JpYmUsXG59IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9ic2VydmFibGVTdG9yZSB9IGZyb20gJy4vb2JzZXJ2YWJsZS1zdG9yZSc7XG5pbXBvcnQgeyBDb21wYXJhdG9yLCBQYXRoU2VsZWN0b3IsIFNlbGVjdG9yIH0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIHB1YmxpYyBpbnRlcmZhY2Ugb2YgQGFuZ3VsYXItcmVkdXgvc3RvcmUuIEl0IHdyYXBzIHRoZSBnbG9iYWxcbiAqIHJlZHV4IHN0b3JlIGFuZCBhZGRzIGEgZmV3IG90aGVyIGFkZCBvbiBtZXRob2RzLiBJdCdzIHdoYXQgeW91J2xsIGluamVjdFxuICogaW50byB5b3VyIEFuZ3VsYXIgYXBwbGljYXRpb24gYXMgYSBzZXJ2aWNlLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdSZWR1eDxSb290U3RhdGU+IGltcGxlbWVudHMgT2JzZXJ2YWJsZVN0b3JlPFJvb3RTdGF0ZT4ge1xuICAvKiogQGhpZGRlbiwgQGRlcHJlY2F0ZWQgKi9cbiAgc3RhdGljIGluc3RhbmNlPzogT2JzZXJ2YWJsZVN0b3JlPGFueT4gPSB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgYSBSZWR1eCBzdG9yZSBhbmQgYWxsb3dzIE5nUmVkdXggdG8gb2JzZXJ2ZSBhbmQgZGlzcGF0Y2hcbiAgICogdG8gaXQuXG4gICAqXG4gICAqIFRoaXMgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uY2UgZm9yIHRoZSBsaWZldGltZSBvZiB5b3VyIGFwcCwgZm9yXG4gICAqIGV4YW1wbGUgaW4gdGhlIGNvbnN0cnVjdG9yIG9mIHlvdXIgcm9vdCBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSByb290UmVkdWNlciBZb3VyIGFwcCdzIHJvb3QgcmVkdWNlclxuICAgKiBAcGFyYW0gaW5pdFN0YXRlIFlvdXIgYXBwJ3MgaW5pdGlhbCBzdGF0ZVxuICAgKiBAcGFyYW0gbWlkZGxld2FyZSBPcHRpb25hbCBSZWR1eCBtaWRkbGV3YXJlc1xuICAgKiBAcGFyYW0gZW5oYW5jZXJzIE9wdGlvbmFsIFJlZHV4IHN0b3JlIGVuaGFuY2Vyc1xuICAgKi9cbiAgYWJzdHJhY3QgY29uZmlndXJlU3RvcmU6IChcbiAgICByb290UmVkdWNlcjogUmVkdWNlcjxSb290U3RhdGUsIEFueUFjdGlvbj4sXG4gICAgaW5pdFN0YXRlOiBSb290U3RhdGUsXG4gICAgbWlkZGxld2FyZT86IE1pZGRsZXdhcmVbXSxcbiAgICBlbmhhbmNlcnM/OiBTdG9yZUVuaGFuY2VyPFJvb3RTdGF0ZT5bXSxcbiAgKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBY2NlcHRzIGEgUmVkdXggc3RvcmUsIHRoZW4gc2V0cyBpdCBpbiBOZ1JlZHV4IGFuZFxuICAgKiBhbGxvd3MgTmdSZWR1eCB0byBvYnNlcnZlIGFuZCBkaXNwYXRjaCB0byBpdC5cbiAgICpcbiAgICogVGhpcyBzaG91bGQgb25seSBiZSBjYWxsZWQgb25jZSBmb3IgdGhlIGxpZmV0aW1lIG9mIHlvdXIgYXBwLCBmb3JcbiAgICogZXhhbXBsZSBpbiB0aGUgY29uc3RydWN0b3Igb2YgeW91ciByb290IGNvbXBvbmVudC4gSWYgY29uZmlndXJlU3RvcmVcbiAgICogaGFzIGJlZW4gdXNlZCB0aGlzIGNhbm5vdCBiZSB1c2VkLlxuICAgKlxuICAgKiBAcGFyYW0gc3RvcmUgWW91ciBhcHAncyBzdG9yZVxuICAgKi9cbiAgYWJzdHJhY3QgcHJvdmlkZVN0b3JlOiAoc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4pID0+IHZvaWQ7XG5cbiAgLy8gUmVkdXggU3RvcmUgbWV0aG9kc1xuICBhYnN0cmFjdCBkaXNwYXRjaDogRGlzcGF0Y2g8QW55QWN0aW9uPjtcbiAgYWJzdHJhY3QgZ2V0U3RhdGU6ICgpID0+IFJvb3RTdGF0ZTtcbiAgYWJzdHJhY3Qgc3Vic2NyaWJlOiAobGlzdGVuZXI6ICgpID0+IHZvaWQpID0+IFVuc3Vic2NyaWJlO1xuICBhYnN0cmFjdCByZXBsYWNlUmVkdWNlcjogKG5leHRSZWR1Y2VyOiBSZWR1Y2VyPFJvb3RTdGF0ZSwgQW55QWN0aW9uPikgPT4gdm9pZDtcblxuICAvLyBPYnNlcnZhYmxlU3RvcmUgbWV0aG9kcy5cbiAgYWJzdHJhY3Qgc2VsZWN0OiA8U2VsZWN0ZWRUeXBlPihcbiAgICBzZWxlY3Rvcj86IFNlbGVjdG9yPFJvb3RTdGF0ZSwgU2VsZWN0ZWRUeXBlPixcbiAgICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbiAgKSA9PiBPYnNlcnZhYmxlPFNlbGVjdGVkVHlwZT47XG4gIGFic3RyYWN0IGNvbmZpZ3VyZVN1YlN0b3JlOiA8U3ViU3RhdGU+KFxuICAgIGJhc2VQYXRoOiBQYXRoU2VsZWN0b3IsXG4gICAgbG9jYWxSZWR1Y2VyOiBSZWR1Y2VyPFN1YlN0YXRlLCBBbnlBY3Rpb24+LFxuICApID0+IE9ic2VydmFibGVTdG9yZTxTdWJTdGF0ZT47XG59XG4iXX0=