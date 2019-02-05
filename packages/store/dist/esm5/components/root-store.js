/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { applyMiddleware, compose, createStore, } from 'redux';
import { NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { assert } from '../utils/assert';
import { enableFractalReducers } from './fractal-reducer-map';
import { NgRedux } from './ng-redux';
import { resolveToFunctionSelector, } from './selectors';
import { SubStore } from './sub-store';
/**
 * @hidden
 * @template RootState
 */
var /**
 * @hidden
 * @template RootState
 */
RootStore = /** @class */ (function (_super) {
    tslib_1.__extends(RootStore, _super);
    function RootStore(ngZone) {
        var _this = _super.call(this) || this;
        _this.ngZone = ngZone;
        _this.store = undefined;
        _this.configureStore = function (rootReducer, initState, middleware, enhancers) {
            if (middleware === void 0) { middleware = []; }
            if (enhancers === void 0) { enhancers = []; }
            assert(!_this.store, 'Store already configured!');
            // Variable-arity compose in typescript FTW.
            // Variable-arity compose in typescript FTW.
            _this.setStore(compose.apply(null, tslib_1.__spread([applyMiddleware.apply(void 0, tslib_1.__spread(middleware))], enhancers))(createStore)(enableFractalReducers(rootReducer), initState));
        };
        _this.provideStore = function (store) {
            assert(!_this.store, 'Store already configured!');
            _this.setStore(store);
        };
        _this.getState = function () { return ((_this.store)).getState(); };
        _this.subscribe = function (listener) { return ((_this.store)).subscribe(listener); };
        _this.replaceReducer = function (nextReducer) {
            /** @type {?} */ ((_this.store)).replaceReducer(nextReducer);
        };
        _this.dispatch = function (action) {
            assert(!!_this.store, 'Dispatch failed: did you forget to configure your store? ' +
                'https://github.com/angular-redux/@angular-redux/core/blob/master/' +
                'README.md#quick-start');
            if (!NgZone.isInAngularZone()) {
                return _this.ngZone.run(function () { return ((_this.store)).dispatch(action); });
            }
            else {
                return /** @type {?} */ ((_this.store)).dispatch(action);
            }
        };
        _this.select = function (selector, comparator) {
            return _this.store$.pipe(distinctUntilChanged(), map(resolveToFunctionSelector(selector)), distinctUntilChanged(comparator));
        };
        _this.configureSubStore = function (basePath, localReducer) {
            return new SubStore(_this, basePath, localReducer);
        };
        _this.storeToObservable = function (store) {
            return new Observable(function (observer) {
                observer.next(store.getState());
                /** @type {?} */
                var unsubscribeFromRedux = store.subscribe(function () {
                    return observer.next(store.getState());
                });
                return function () {
                    unsubscribeFromRedux();
                    observer.complete();
                };
            });
        };
        NgRedux.instance = _this;
        _this.store$ = /** @type {?} */ (new BehaviorSubject(undefined).pipe(filter(function (n) { return n !== undefined; }), switchMap(function (observableStore) { return (observableStore); })));
        return _this;
    }
    /**
     * @param {?} store
     * @return {?}
     */
    RootStore.prototype.setStore = /**
     * @param {?} store
     * @return {?}
     */
    function (store) {
        this.store = store;
        /** @type {?} */
        var storeServable = this.storeToObservable(store);
        this.store$.next(/** @type {?} */ (storeServable));
    };
    return RootStore;
}(NgRedux));
/**
 * @hidden
 * @template RootState
 */
export { RootStore };
if (false) {
    /** @type {?} */
    RootStore.prototype.store;
    /** @type {?} */
    RootStore.prototype.store$;
    /** @type {?} */
    RootStore.prototype.configureStore;
    /** @type {?} */
    RootStore.prototype.provideStore;
    /** @type {?} */
    RootStore.prototype.getState;
    /** @type {?} */
    RootStore.prototype.subscribe;
    /** @type {?} */
    RootStore.prototype.replaceReducer;
    /** @type {?} */
    RootStore.prototype.dispatch;
    /** @type {?} */
    RootStore.prototype.select;
    /** @type {?} */
    RootStore.prototype.configureSubStore;
    /** @type {?} */
    RootStore.prototype.storeToObservable;
    /** @type {?} */
    RootStore.prototype.ngZone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9yb290LXN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUVMLGVBQWUsRUFDZixPQUFPLEVBQ1AsV0FBVyxHQU9aLE1BQU0sT0FBTyxDQUFDO0FBRWYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUM3RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFlBQVksQ0FBQztBQUVyQyxPQUFPLEVBR0wseUJBQXlCLEdBRTFCLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7O0FBR3ZDOzs7O0FBQUE7SUFBMEMscUNBQWtCO0lBSTFELG1CQUFvQixNQUFjO1FBQWxDLFlBQ0UsaUJBQU8sU0FRUjtRQVRtQixZQUFNLEdBQU4sTUFBTSxDQUFRO3NCQUhZLFNBQVM7K0JBY3RDLFVBQ2YsV0FBMEMsRUFDMUMsU0FBb0IsRUFDcEIsVUFBNkIsRUFDN0IsU0FBMEM7WUFEMUMsMkJBQUEsRUFBQSxlQUE2QjtZQUM3QiwwQkFBQSxFQUFBLGNBQTBDO1lBRTFDLE1BQU0sQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsMkJBQTJCLENBQUMsQ0FBQzs7WUFHakQsQUFEQSw0Q0FBNEM7WUFDNUMsS0FBSSxDQUFDLFFBQVEsQ0FDWCxPQUFP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LGFBQW9CLEVBQUMsQ0FBQzs7b0JBNUczQztFQTZCMEMsT0FBTyxFQStGaEQsQ0FBQTs7Ozs7QUEvRkQscUJBK0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQW55QWN0aW9uLFxuICBhcHBseU1pZGRsZXdhcmUsXG4gIGNvbXBvc2UsXG4gIGNyZWF0ZVN0b3JlLFxuICBEaXNwYXRjaCxcbiAgTWlkZGxld2FyZSxcbiAgUmVkdWNlcixcbiAgU3RvcmUsXG4gIFN0b3JlRW5oYW5jZXIsXG4gIFVuc3Vic2NyaWJlLFxufSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7IE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi91dGlscy9hc3NlcnQnO1xuaW1wb3J0IHsgZW5hYmxlRnJhY3RhbFJlZHVjZXJzIH0gZnJvbSAnLi9mcmFjdGFsLXJlZHVjZXItbWFwJztcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICcuL25nLXJlZHV4JztcbmltcG9ydCB7IE9ic2VydmFibGVTdG9yZSB9IGZyb20gJy4vb2JzZXJ2YWJsZS1zdG9yZSc7XG5pbXBvcnQge1xuICBDb21wYXJhdG9yLFxuICBQYXRoU2VsZWN0b3IsXG4gIHJlc29sdmVUb0Z1bmN0aW9uU2VsZWN0b3IsXG4gIFNlbGVjdG9yLFxufSBmcm9tICcuL3NlbGVjdG9ycyc7XG5pbXBvcnQgeyBTdWJTdG9yZSB9IGZyb20gJy4vc3ViLXN0b3JlJztcblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBjbGFzcyBSb290U3RvcmU8Um9vdFN0YXRlPiBleHRlbmRzIE5nUmVkdXg8Um9vdFN0YXRlPiB7XG4gIHByaXZhdGUgc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIHByaXZhdGUgc3RvcmUkOiBCZWhhdmlvclN1YmplY3Q8Um9vdFN0YXRlPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIE5nUmVkdXguaW5zdGFuY2UgPSB0aGlzO1xuICAgIHRoaXMuc3RvcmUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxSb290U3RhdGUgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCkucGlwZShcbiAgICAgIGZpbHRlcihuID0+IG4gIT09IHVuZGVmaW5lZCksXG4gICAgICBzd2l0Y2hNYXAob2JzZXJ2YWJsZVN0b3JlID0+IG9ic2VydmFibGVTdG9yZSBhcyBhbnkpLFxuICAgICAgLy8gVE9ETzogZml4IHRoaXM/IG5lZWRpbmcgdG8gZXhwbGljaXRseSBjYXN0IHRoaXMgaXMgd3JvbmdcbiAgICApIGFzIEJlaGF2aW9yU3ViamVjdDxSb290U3RhdGU+O1xuICB9XG5cbiAgY29uZmlndXJlU3RvcmUgPSAoXG4gICAgcm9vdFJlZHVjZXI6IFJlZHVjZXI8Um9vdFN0YXRlLCBBbnlBY3Rpb24+LFxuICAgIGluaXRTdGF0ZTogUm9vdFN0YXRlLFxuICAgIG1pZGRsZXdhcmU6IE1pZGRsZXdhcmVbXSA9IFtdLFxuICAgIGVuaGFuY2VyczogU3RvcmVFbmhhbmNlcjxSb290U3RhdGU+W10gPSBbXSxcbiAgKTogdm9pZCA9PiB7XG4gICAgYXNzZXJ0KCF0aGlzLnN0b3JlLCAnU3RvcmUgYWxyZWFkeSBjb25maWd1cmVkIScpO1xuXG4gICAgLy8gVmFyaWFibGUtYXJpdHkgY29tcG9zZSBpbiB0eXBlc2NyaXB0IEZUVy5cbiAgICB0aGlzLnNldFN0b3JlKFxuICAgICAgY29tcG9zZS5hcHBseShudWxsLCBbYXBwbHlNaWRkbGV3YXJlKC4uLm1pZGRsZXdhcmUpLCAuLi5lbmhhbmNlcnNdKShcbiAgICAgICAgY3JlYXRlU3RvcmUsXG4gICAgICApKGVuYWJsZUZyYWN0YWxSZWR1Y2Vycyhyb290UmVkdWNlciksIGluaXRTdGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBwcm92aWRlU3RvcmUgPSAoc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4pID0+IHtcbiAgICBhc3NlcnQoIXRoaXMuc3RvcmUsICdTdG9yZSBhbHJlYWR5IGNvbmZpZ3VyZWQhJyk7XG4gICAgdGhpcy5zZXRTdG9yZShzdG9yZSk7XG4gIH07XG5cbiAgZ2V0U3RhdGUgPSAoKTogUm9vdFN0YXRlID0+IHRoaXMuc3RvcmUhLmdldFN0YXRlKCk7XG5cbiAgc3Vic2NyaWJlID0gKGxpc3RlbmVyOiAoKSA9PiB2b2lkKTogVW5zdWJzY3JpYmUgPT5cbiAgICB0aGlzLnN0b3JlIS5zdWJzY3JpYmUobGlzdGVuZXIpO1xuXG4gIHJlcGxhY2VSZWR1Y2VyID0gKG5leHRSZWR1Y2VyOiBSZWR1Y2VyPFJvb3RTdGF0ZSwgQW55QWN0aW9uPik6IHZvaWQgPT4ge1xuICAgIHRoaXMuc3RvcmUhLnJlcGxhY2VSZWR1Y2VyKG5leHRSZWR1Y2VyKTtcbiAgfTtcblxuICBkaXNwYXRjaDogRGlzcGF0Y2g8QW55QWN0aW9uPiA9IDxBIGV4dGVuZHMgQW55QWN0aW9uPihhY3Rpb246IEEpOiBBID0+IHtcbiAgICBhc3NlcnQoXG4gICAgICAhIXRoaXMuc3RvcmUsXG4gICAgICAnRGlzcGF0Y2ggZmFpbGVkOiBkaWQgeW91IGZvcmdldCB0byBjb25maWd1cmUgeW91ciBzdG9yZT8gJyArXG4gICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci1yZWR1eC9AYW5ndWxhci1yZWR1eC9jb3JlL2Jsb2IvbWFzdGVyLycgK1xuICAgICAgICAnUkVBRE1FLm1kI3F1aWNrLXN0YXJ0JyxcbiAgICApO1xuXG4gICAgaWYgKCFOZ1pvbmUuaXNJbkFuZ3VsYXJab25lKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5zdG9yZSEuZGlzcGF0Y2goYWN0aW9uKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnN0b3JlIS5kaXNwYXRjaChhY3Rpb24pO1xuICAgIH1cbiAgfTtcblxuICBzZWxlY3QgPSA8U2VsZWN0ZWRUeXBlPihcbiAgICBzZWxlY3Rvcj86IFNlbGVjdG9yPFJvb3RTdGF0ZSwgU2VsZWN0ZWRUeXBlPixcbiAgICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbiAgKTogT2JzZXJ2YWJsZTxTZWxlY3RlZFR5cGU+ID0+XG4gICAgdGhpcy5zdG9yZSQucGlwZShcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICBtYXAocmVzb2x2ZVRvRnVuY3Rpb25TZWxlY3RvcihzZWxlY3RvcikpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoY29tcGFyYXRvciksXG4gICAgKTtcblxuICBjb25maWd1cmVTdWJTdG9yZSA9IDxTdWJTdGF0ZT4oXG4gICAgYmFzZVBhdGg6IFBhdGhTZWxlY3RvcixcbiAgICBsb2NhbFJlZHVjZXI6IFJlZHVjZXI8U3ViU3RhdGUsIEFueUFjdGlvbj4sXG4gICk6IE9ic2VydmFibGVTdG9yZTxTdWJTdGF0ZT4gPT5cbiAgICBuZXcgU3ViU3RvcmU8U3ViU3RhdGU+KHRoaXMsIGJhc2VQYXRoLCBsb2NhbFJlZHVjZXIpO1xuXG4gIHByaXZhdGUgc2V0U3RvcmUoc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4pIHtcbiAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgY29uc3Qgc3RvcmVTZXJ2YWJsZSA9IHRoaXMuc3RvcmVUb09ic2VydmFibGUoc3RvcmUpO1xuICAgIHRoaXMuc3RvcmUkLm5leHQoc3RvcmVTZXJ2YWJsZSBhcyBhbnkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdG9yZVRvT2JzZXJ2YWJsZSA9IChcbiAgICBzdG9yZTogU3RvcmU8Um9vdFN0YXRlPixcbiAgKTogT2JzZXJ2YWJsZTxSb290U3RhdGU+ID0+XG4gICAgbmV3IE9ic2VydmFibGU8Um9vdFN0YXRlPigob2JzZXJ2ZXI6IE9ic2VydmVyPFJvb3RTdGF0ZT4pID0+IHtcbiAgICAgIG9ic2VydmVyLm5leHQoc3RvcmUuZ2V0U3RhdGUoKSk7XG4gICAgICBjb25zdCB1bnN1YnNjcmliZUZyb21SZWR1eCA9IHN0b3JlLnN1YnNjcmliZSgoKSA9PlxuICAgICAgICBvYnNlcnZlci5uZXh0KHN0b3JlLmdldFN0YXRlKCkpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHVuc3Vic2NyaWJlRnJvbVJlZHV4KCk7XG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9O1xuICAgIH0pO1xufVxuIl19