/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
/**
 * @hidden
 * @record
 */
export function SelectorStubRecord() { }
/** @type {?} */
SelectorStubRecord.prototype.subject;
/** @type {?} */
SelectorStubRecord.prototype.comparator;
/**
 * @hidden
 * @record
 */
export function SelectorStubMap() { }
/**
 * @hidden
 * @record
 */
export function SubStoreStubMap() { }
/**
 * @hidden
 * @template State
 */
export class MockObservableStore {
    constructor() {
        this.selections = {};
        this.subStores = {};
        this.getSelectorStub = (selector, comparator) => this.initSelectorStub(selector, comparator).subject;
        this.reset = () => {
            Object.keys(this.subStores).forEach(k => this.subStores[k].reset());
            this.selections = {};
            this.subStores = {};
        };
        this.dispatch = action => action;
        this.replaceReducer = () => null;
        this.getState = () => ({});
        this.subscribe = () => () => null;
        this.select = (selector, comparator) => {
            /** @type {?} */
            const stub = this.initSelectorStub(selector, comparator);
            return stub.comparator
                ? stub.subject.pipe(distinctUntilChanged(stub.comparator))
                : stub.subject;
        };
        this.configureSubStore = (basePath, _) => this.initSubStore(basePath);
        this.getSubStore = (...pathSelectors) => {
            const [first, ...rest] = pathSelectors;
            return /** @type {?} */ ((first
                ? this.initSubStore(first).getSubStore(...rest)
                : this));
        };
    }
    /**
     * @template SubState
     * @param {?} basePath
     * @return {?}
     */
    initSubStore(basePath) {
        /** @type {?} */
        const result = this.subStores[JSON.stringify(basePath)] ||
            new MockObservableStore();
        this.subStores[JSON.stringify(basePath)] = result;
        return result;
    }
    /**
     * @template SelectedState
     * @param {?=} selector
     * @param {?=} comparator
     * @return {?}
     */
    initSelectorStub(selector, comparator) {
        /** @type {?} */
        const key = selector ? selector.toString() : '';
        /** @type {?} */
        const record = this.selections[key] || {
            subject: new ReplaySubject(),
            comparator,
        };
        this.selections[key] = record;
        return record;
    }
}
if (false) {
    /** @type {?} */
    MockObservableStore.prototype.selections;
    /** @type {?} */
    MockObservableStore.prototype.subStores;
    /** @type {?} */
    MockObservableStore.prototype.getSelectorStub;
    /** @type {?} */
    MockObservableStore.prototype.reset;
    /** @type {?} */
    MockObservableStore.prototype.dispatch;
    /** @type {?} */
    MockObservableStore.prototype.replaceReducer;
    /** @type {?} */
    MockObservableStore.prototype.getState;
    /** @type {?} */
    MockObservableStore.prototype.subscribe;
    /** @type {?} */
    MockObservableStore.prototype.select;
    /** @type {?} */
    MockObservableStore.prototype.configureSubStore;
    /** @type {?} */
    MockObservableStore.prototype.getSubStore;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZS1zdG9yZS5tb2NrLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvdGVzdGluZy8iLCJzb3VyY2VzIjpbIm9ic2VydmFibGUtc3RvcmUubW9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsT0FBTyxFQUFjLGFBQWEsRUFBVyxNQUFNLE1BQU0sQ0FBQztBQUMxRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJ0RCxNQUFNOzswQkFDMEIsRUFBRTt5QkFDSCxFQUFFOytCQUViLENBQ2hCLFFBQXlDLEVBQ3pDLFVBQXVCLEVBQ0MsRUFBRSxDQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQWdCLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQyxPQUFPO3FCQUU1RCxHQUFHLEVBQUU7WUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7U0FDckI7d0JBRStCLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTTs4QkFDL0IsR0FBRyxFQUFFLENBQUMsSUFBSTt3QkFDaEIsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7eUJBQ1QsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSTtzQkFFbkIsQ0FDUCxRQUF1QyxFQUN2QyxVQUF1QixFQUNOLEVBQUU7O1lBQ25CLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBZ0IsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVTtnQkFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDMUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDbEI7aUNBRW1CLENBQ2xCLFFBQXNCLEVBQ3RCLENBQStCLEVBQ0EsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQVcsUUFBUSxDQUFDOzJCQUUzRCxDQUNaLEdBQUcsYUFBNkIsRUFDTixFQUFFO1lBQzVCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxhQUFhLENBQUM7WUFDdkMsTUFBTSxtQkFBQyxDQUFDLEtBQUs7Z0JBQ1gsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUMvQyxDQUFDLENBQUMsSUFBSSxDQUFrQyxFQUFDO1NBQzVDOzs7Ozs7O0lBRU8sWUFBWSxDQUFXLFFBQXNCOztRQUNuRCxNQUFNLE1BQU0sR0FDVixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEMsSUFBSSxtQkFBbUIsRUFBWSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFDOzs7Ozs7OztJQUdSLGdCQUFnQixDQUN0QixRQUF5QyxFQUN6QyxVQUF1Qjs7UUFFdkIsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7UUFDaEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSTtZQUNyQyxPQUFPLEVBQUUsSUFBSSxhQUFhLEVBQWlCO1lBQzNDLFVBQVU7U0FDWCxDQUFDO1FBRUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7Q0FFakIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUT0RPOiBTZWUgaWYgdGhpcyBsaW50aW5nIHJ1bGUgY2FuIGJlIGVuYWJsZWQgd2l0aCBuZXcgYnVpbGQgcHJvY2VzcyAobmctcGFja2Fncilcbi8vIHRzbGludDpkaXNhYmxlOm5vLWltcGxpY2l0LWRlcGVuZGVuY2llc1xuaW1wb3J0IHsgQ29tcGFyYXRvciwgUGF0aFNlbGVjdG9yLCBTZWxlY3RvciB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEFueUFjdGlvbiwgRGlzcGF0Y2gsIFJlZHVjZXIgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0b3JTdHViUmVjb3JkIHtcbiAgc3ViamVjdDogU3ViamVjdDxhbnk+O1xuICBjb21wYXJhdG9yOiBDb21wYXJhdG9yO1xufVxuXG4vKiogQGhpZGRlbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZWxlY3RvclN0dWJNYXAge1xuICBbc2VsZWN0b3I6IHN0cmluZ106IFNlbGVjdG9yU3R1YlJlY29yZDtcbn1cblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3ViU3RvcmVTdHViTWFwIHtcbiAgW2Jhc2VQYXRoOiBzdHJpbmddOiBNb2NrT2JzZXJ2YWJsZVN0b3JlPGFueT47XG59XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgY2xhc3MgTW9ja09ic2VydmFibGVTdG9yZTxTdGF0ZT4ge1xuICBzZWxlY3Rpb25zOiBTZWxlY3RvclN0dWJNYXAgPSB7fTtcbiAgc3ViU3RvcmVzOiBTdWJTdG9yZVN0dWJNYXAgPSB7fTtcblxuICBnZXRTZWxlY3RvclN0dWIgPSA8U2VsZWN0ZWRTdGF0ZT4oXG4gICAgc2VsZWN0b3I/OiBTZWxlY3RvcjxTdGF0ZSwgU2VsZWN0ZWRTdGF0ZT4sXG4gICAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4gICk6IFN1YmplY3Q8U2VsZWN0ZWRTdGF0ZT4gPT5cbiAgICB0aGlzLmluaXRTZWxlY3RvclN0dWI8U2VsZWN0ZWRTdGF0ZT4oc2VsZWN0b3IsIGNvbXBhcmF0b3IpLnN1YmplY3Q7XG5cbiAgcmVzZXQgPSAoKSA9PiB7XG4gICAgT2JqZWN0LmtleXModGhpcy5zdWJTdG9yZXMpLmZvckVhY2goayA9PiB0aGlzLnN1YlN0b3Jlc1trXS5yZXNldCgpKTtcbiAgICB0aGlzLnNlbGVjdGlvbnMgPSB7fTtcbiAgICB0aGlzLnN1YlN0b3JlcyA9IHt9O1xuICB9O1xuXG4gIGRpc3BhdGNoOiBEaXNwYXRjaDxBbnlBY3Rpb24+ID0gYWN0aW9uID0+IGFjdGlvbjtcbiAgcmVwbGFjZVJlZHVjZXIgPSAoKSA9PiBudWxsO1xuICBnZXRTdGF0ZSA9ICgpID0+ICh7fSk7XG4gIHN1YnNjcmliZSA9ICgpID0+ICgpID0+IG51bGw7XG5cbiAgc2VsZWN0ID0gPFNlbGVjdGVkU3RhdGU+KFxuICAgIHNlbGVjdG9yPzogU2VsZWN0b3I8YW55LCBTZWxlY3RlZFN0YXRlPixcbiAgICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbiAgKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcbiAgICBjb25zdCBzdHViID0gdGhpcy5pbml0U2VsZWN0b3JTdHViPFNlbGVjdGVkU3RhdGU+KHNlbGVjdG9yLCBjb21wYXJhdG9yKTtcbiAgICByZXR1cm4gc3R1Yi5jb21wYXJhdG9yXG4gICAgICA/IHN0dWIuc3ViamVjdC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKHN0dWIuY29tcGFyYXRvcikpXG4gICAgICA6IHN0dWIuc3ViamVjdDtcbiAgfTtcblxuICBjb25maWd1cmVTdWJTdG9yZSA9IDxTdWJTdGF0ZT4oXG4gICAgYmFzZVBhdGg6IFBhdGhTZWxlY3RvcixcbiAgICBfOiBSZWR1Y2VyPFN1YlN0YXRlLCBBbnlBY3Rpb24+LFxuICApOiBNb2NrT2JzZXJ2YWJsZVN0b3JlPFN1YlN0YXRlPiA9PiB0aGlzLmluaXRTdWJTdG9yZTxTdWJTdGF0ZT4oYmFzZVBhdGgpO1xuXG4gIGdldFN1YlN0b3JlID0gPFN1YlN0YXRlPihcbiAgICAuLi5wYXRoU2VsZWN0b3JzOiBQYXRoU2VsZWN0b3JbXVxuICApOiBNb2NrT2JzZXJ2YWJsZVN0b3JlPGFueT4gPT4ge1xuICAgIGNvbnN0IFtmaXJzdCwgLi4ucmVzdF0gPSBwYXRoU2VsZWN0b3JzO1xuICAgIHJldHVybiAoZmlyc3RcbiAgICAgID8gdGhpcy5pbml0U3ViU3RvcmUoZmlyc3QpLmdldFN1YlN0b3JlKC4uLnJlc3QpXG4gICAgICA6IHRoaXMpIGFzIE1vY2tPYnNlcnZhYmxlU3RvcmU8U3ViU3RhdGU+O1xuICB9O1xuXG4gIHByaXZhdGUgaW5pdFN1YlN0b3JlPFN1YlN0YXRlPihiYXNlUGF0aDogUGF0aFNlbGVjdG9yKSB7XG4gICAgY29uc3QgcmVzdWx0ID1cbiAgICAgIHRoaXMuc3ViU3RvcmVzW0pTT04uc3RyaW5naWZ5KGJhc2VQYXRoKV0gfHxcbiAgICAgIG5ldyBNb2NrT2JzZXJ2YWJsZVN0b3JlPFN1YlN0YXRlPigpO1xuICAgIHRoaXMuc3ViU3RvcmVzW0pTT04uc3RyaW5naWZ5KGJhc2VQYXRoKV0gPSByZXN1bHQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFNlbGVjdG9yU3R1YjxTZWxlY3RlZFN0YXRlPihcbiAgICBzZWxlY3Rvcj86IFNlbGVjdG9yPFN0YXRlLCBTZWxlY3RlZFN0YXRlPixcbiAgICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbiAgKTogU2VsZWN0b3JTdHViUmVjb3JkIHtcbiAgICBjb25zdCBrZXkgPSBzZWxlY3RvciA/IHNlbGVjdG9yLnRvU3RyaW5nKCkgOiAnJztcbiAgICBjb25zdCByZWNvcmQgPSB0aGlzLnNlbGVjdGlvbnNba2V5XSB8fCB7XG4gICAgICBzdWJqZWN0OiBuZXcgUmVwbGF5U3ViamVjdDxTZWxlY3RlZFN0YXRlPigpLFxuICAgICAgY29tcGFyYXRvcixcbiAgICB9O1xuXG4gICAgdGhpcy5zZWxlY3Rpb25zW2tleV0gPSByZWNvcmQ7XG4gICAgcmV0dXJuIHJlY29yZDtcbiAgfVxufVxuIl19