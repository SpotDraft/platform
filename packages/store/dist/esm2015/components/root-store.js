/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class RootStore extends NgRedux {
    /**
     * @param {?} ngZone
     */
    constructor(ngZone) {
        super();
        this.ngZone = ngZone;
        this.store = undefined;
        this.configureStore = (rootReducer, initState, middleware = [], enhancers = []) => {
            assert(!this.store, 'Store already configured!');
            // Variable-arity compose in typescript FTW.
            this.setStore(compose.apply(null, [applyMiddleware(...middleware), ...enhancers])(createStore)(enableFractalReducers(rootReducer), initState));
        };
        this.provideStore = (store) => {
            assert(!this.store, 'Store already configured!');
            this.setStore(store);
        };
        this.getState = () => /** @type {?} */ ((this.store)).getState();
        this.subscribe = (listener) => /** @type {?} */ ((this.store)).subscribe(listener);
        this.replaceReducer = (nextReducer) => {
            /** @type {?} */ ((this.store)).replaceReducer(nextReducer);
        };
        this.dispatch = (action) => {
            assert(!!this.store, 'Dispatch failed: did you forget to configure your store? ' +
                'https://github.com/angular-redux/@angular-redux/core/blob/master/' +
                'README.md#quick-start');
            if (!NgZone.isInAngularZone()) {
                return this.ngZone.run(() => /** @type {?} */ ((this.store)).dispatch(action));
            }
            else {
                return /** @type {?} */ ((this.store)).dispatch(action);
            }
        };
        this.select = (selector, comparator) => this.store$.pipe(distinctUntilChanged(), map(resolveToFunctionSelector(selector)), distinctUntilChanged(comparator));
        this.configureSubStore = (basePath, localReducer) => new SubStore(this, basePath, localReducer);
        this.storeToObservable = (store) => new Observable((observer) => {
            observer.next(store.getState());
            /** @type {?} */
            const unsubscribeFromRedux = store.subscribe(() => observer.next(store.getState()));
            return () => {
                unsubscribeFromRedux();
                observer.complete();
            };
        });
        NgRedux.instance = this;
        this.store$ = /** @type {?} */ (new BehaviorSubject(undefined).pipe(filter(n => n !== undefined), switchMap(observableStore => /** @type {?} */ (observableStore))));
    }
    /**
     * @param {?} store
     * @return {?}
     */
    setStore(store) {
        this.store = store;
        /** @type {?} */
        const storeServable = this.storeToObservable(store);
        this.store$.next(/** @type {?} */ (storeServable));
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9yb290LXN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsZUFBZSxFQUNmLE9BQU8sRUFDUCxXQUFXLEdBT1osTUFBTSxPQUFPLENBQUM7QUFFZixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBQzdELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXJDLE9BQU8sRUFHTCx5QkFBeUIsR0FFMUIsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7QUFHdkMsTUFBTSxnQkFBNEIsU0FBUSxPQUFrQjs7OztJQUkxRCxZQUFvQixNQUFjO1FBQ2hDLEtBQUssRUFBRSxDQUFDO1FBRFUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtxQkFIWSxTQUFTOzhCQWN0QyxDQUNmLFdBQTBDLEVBQzFDLFNBQW9CLEVBQ3BCLGFBQTJCLEVBQUUsRUFDN0IsWUFBd0MsRUFBRSxFQUNwQyxFQUFFO1lBQ1IsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSwyQkFBMkIsQ0FBQyxDQUFDOztZQUdqRCxJQUFJLENBQUMsUUFBUSxDQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsZUFBZSxDQUFDLEdB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LE1BQU0sQ0FBQyxJQUFJLG1CQUFDLGFBQW9CLEVBQUMsQ0FBQzs7Q0FnQjFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQW55QWN0aW9uLFxuICBhcHBseU1pZGRsZXdhcmUsXG4gIGNvbXBvc2UsXG4gIGNyZWF0ZVN0b3JlLFxuICBEaXNwYXRjaCxcbiAgTWlkZGxld2FyZSxcbiAgUmVkdWNlcixcbiAgU3RvcmUsXG4gIFN0b3JlRW5oYW5jZXIsXG4gIFVuc3Vic2NyaWJlLFxufSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7IE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi91dGlscy9hc3NlcnQnO1xuaW1wb3J0IHsgZW5hYmxlRnJhY3RhbFJlZHVjZXJzIH0gZnJvbSAnLi9mcmFjdGFsLXJlZHVjZXItbWFwJztcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICcuL25nLXJlZHV4JztcbmltcG9ydCB7IE9ic2VydmFibGVTdG9yZSB9IGZyb20gJy4vb2JzZXJ2YWJsZS1zdG9yZSc7XG5pbXBvcnQge1xuICBDb21wYXJhdG9yLFxuICBQYXRoU2VsZWN0b3IsXG4gIHJlc29sdmVUb0Z1bmN0aW9uU2VsZWN0b3IsXG4gIFNlbGVjdG9yLFxufSBmcm9tICcuL3NlbGVjdG9ycyc7XG5pbXBvcnQgeyBTdWJTdG9yZSB9IGZyb20gJy4vc3ViLXN0b3JlJztcblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBjbGFzcyBSb290U3RvcmU8Um9vdFN0YXRlPiBleHRlbmRzIE5nUmVkdXg8Um9vdFN0YXRlPiB7XG4gIHByaXZhdGUgc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIHByaXZhdGUgc3RvcmUkOiBCZWhhdmlvclN1YmplY3Q8Um9vdFN0YXRlPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIE5nUmVkdXguaW5zdGFuY2UgPSB0aGlzO1xuICAgIHRoaXMuc3RvcmUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxSb290U3RhdGUgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCkucGlwZShcbiAgICAgIGZpbHRlcihuID0+IG4gIT09IHVuZGVmaW5lZCksXG4gICAgICBzd2l0Y2hNYXAob2JzZXJ2YWJsZVN0b3JlID0+IG9ic2VydmFibGVTdG9yZSBhcyBhbnkpLFxuICAgICAgLy8gVE9ETzogZml4IHRoaXM/IG5lZWRpbmcgdG8gZXhwbGljaXRseSBjYXN0IHRoaXMgaXMgd3JvbmdcbiAgICApIGFzIEJlaGF2aW9yU3ViamVjdDxSb290U3RhdGU+O1xuICB9XG5cbiAgY29uZmlndXJlU3RvcmUgPSAoXG4gICAgcm9vdFJlZHVjZXI6IFJlZHVjZXI8Um9vdFN0YXRlLCBBbnlBY3Rpb24+LFxuICAgIGluaXRTdGF0ZTogUm9vdFN0YXRlLFxuICAgIG1pZGRsZXdhcmU6IE1pZGRsZXdhcmVbXSA9IFtdLFxuICAgIGVuaGFuY2VyczogU3RvcmVFbmhhbmNlcjxSb290U3RhdGU+W10gPSBbXSxcbiAgKTogdm9pZCA9PiB7XG4gICAgYXNzZXJ0KCF0aGlzLnN0b3JlLCAnU3RvcmUgYWxyZWFkeSBjb25maWd1cmVkIScpO1xuXG4gICAgLy8gVmFyaWFibGUtYXJpdHkgY29tcG9zZSBpbiB0eXBlc2NyaXB0IEZUVy5cbiAgICB0aGlzLnNldFN0b3JlKFxuICAgICAgY29tcG9zZS5hcHBseShudWxsLCBbYXBwbHlNaWRkbGV3YXJlKC4uLm1pZGRsZXdhcmUpLCAuLi5lbmhhbmNlcnNdKShcbiAgICAgICAgY3JlYXRlU3RvcmUsXG4gICAgICApKGVuYWJsZUZyYWN0YWxSZWR1Y2Vycyhyb290UmVkdWNlciksIGluaXRTdGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBwcm92aWRlU3RvcmUgPSAoc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4pID0+IHtcbiAgICBhc3NlcnQoIXRoaXMuc3RvcmUsICdTdG9yZSBhbHJlYWR5IGNvbmZpZ3VyZWQhJyk7XG4gICAgdGhpcy5zZXRTdG9yZShzdG9yZSk7XG4gIH07XG5cbiAgZ2V0U3RhdGUgPSAoKTogUm9vdFN0YXRlID0+IHRoaXMuc3RvcmUhLmdldFN0YXRlKCk7XG5cbiAgc3Vic2NyaWJlID0gKGxpc3RlbmVyOiAoKSA9PiB2b2lkKTogVW5zdWJzY3JpYmUgPT5cbiAgICB0aGlzLnN0b3JlIS5zdWJzY3JpYmUobGlzdGVuZXIpO1xuXG4gIHJlcGxhY2VSZWR1Y2VyID0gKG5leHRSZWR1Y2VyOiBSZWR1Y2VyPFJvb3RTdGF0ZSwgQW55QWN0aW9uPik6IHZvaWQgPT4ge1xuICAgIHRoaXMuc3RvcmUhLnJlcGxhY2VSZWR1Y2VyKG5leHRSZWR1Y2VyKTtcbiAgfTtcblxuICBkaXNwYXRjaDogRGlzcGF0Y2g8QW55QWN0aW9uPiA9IDxBIGV4dGVuZHMgQW55QWN0aW9uPihhY3Rpb246IEEpOiBBID0+IHtcbiAgICBhc3NlcnQoXG4gICAgICAhIXRoaXMuc3RvcmUsXG4gICAgICAnRGlzcGF0Y2ggZmFpbGVkOiBkaWQgeW91IGZvcmdldCB0byBjb25maWd1cmUgeW91ciBzdG9yZT8gJyArXG4gICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci1yZWR1eC9AYW5ndWxhci1yZWR1eC9jb3JlL2Jsb2IvbWFzdGVyLycgK1xuICAgICAgICAnUkVBRE1FLm1kI3F1aWNrLXN0YXJ0JyxcbiAgICApO1xuXG4gICAgaWYgKCFOZ1pvbmUuaXNJbkFuZ3VsYXJab25lKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5zdG9yZSEuZGlzcGF0Y2goYWN0aW9uKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnN0b3JlIS5kaXNwYXRjaChhY3Rpb24pO1xuICAgIH1cbiAgfTtcblxuICBzZWxlY3QgPSA8U2VsZWN0ZWRUeXBlPihcbiAgICBzZWxlY3Rvcj86IFNlbGVjdG9yPFJvb3RTdGF0ZSwgU2VsZWN0ZWRUeXBlPixcbiAgICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbiAgKTogT2JzZXJ2YWJsZTxTZWxlY3RlZFR5cGU+ID0+XG4gICAgdGhpcy5zdG9yZSQucGlwZShcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICBtYXAocmVzb2x2ZVRvRnVuY3Rpb25TZWxlY3RvcihzZWxlY3RvcikpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoY29tcGFyYXRvciksXG4gICAgKTtcblxuICBjb25maWd1cmVTdWJTdG9yZSA9IDxTdWJTdGF0ZT4oXG4gICAgYmFzZVBhdGg6IFBhdGhTZWxlY3RvcixcbiAgICBsb2NhbFJlZHVjZXI6IFJlZHVjZXI8U3ViU3RhdGUsIEFueUFjdGlvbj4sXG4gICk6IE9ic2VydmFibGVTdG9yZTxTdWJTdGF0ZT4gPT5cbiAgICBuZXcgU3ViU3RvcmU8U3ViU3RhdGU+KHRoaXMsIGJhc2VQYXRoLCBsb2NhbFJlZHVjZXIpO1xuXG4gIHByaXZhdGUgc2V0U3RvcmUoc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4pIHtcbiAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgY29uc3Qgc3RvcmVTZXJ2YWJsZSA9IHRoaXMuc3RvcmVUb09ic2VydmFibGUoc3RvcmUpO1xuICAgIHRoaXMuc3RvcmUkLm5leHQoc3RvcmVTZXJ2YWJsZSBhcyBhbnkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdG9yZVRvT2JzZXJ2YWJsZSA9IChcbiAgICBzdG9yZTogU3RvcmU8Um9vdFN0YXRlPixcbiAgKTogT2JzZXJ2YWJsZTxSb290U3RhdGU+ID0+XG4gICAgbmV3IE9ic2VydmFibGU8Um9vdFN0YXRlPigob2JzZXJ2ZXI6IE9ic2VydmVyPFJvb3RTdGF0ZT4pID0+IHtcbiAgICAgIG9ic2VydmVyLm5leHQoc3RvcmUuZ2V0U3RhdGUoKSk7XG4gICAgICBjb25zdCB1bnN1YnNjcmliZUZyb21SZWR1eCA9IHN0b3JlLnN1YnNjcmliZSgoKSA9PlxuICAgICAgICBvYnNlcnZlci5uZXh0KHN0b3JlLmdldFN0YXRlKCkpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHVuc3Vic2NyaWJlRnJvbVJlZHV4KCk7XG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9O1xuICAgIH0pO1xufVxuIl19