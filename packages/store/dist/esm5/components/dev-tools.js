/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ApplicationRef, Injectable, NgZone } from '@angular/core';
import { NgRedux } from './ng-redux';
/**
 * @record
 */
export function ReduxDevTools() { }
/* TODO: handle strange member:
(options: EnhancerOptions): StoreEnhancer<any>;
*/
/** @type {?} */
ReduxDevTools.prototype.listen;
/**
 * @record
 */
function WindowWithReduxDevTools() { }
/** @type {?|undefined} */
WindowWithReduxDevTools.prototype.__REDUX_DEVTOOLS_EXTENSION__;
/** @type {?|undefined} */
WindowWithReduxDevTools.prototype.devToolsExtension;
/** @type {?} */
var environment = /** @type {?} */ ((typeof window !== 'undefined'
    ? window
    : {}));
/**
 * An angular-2-ified version of the Redux DevTools chrome extension.
 */
var DevToolsExtension = /** @class */ (function () {
    /** @hidden */
    function DevToolsExtension(appRef, ngRedux) {
        var _this = this;
        this.appRef = appRef;
        this.ngRedux = ngRedux;
        /**
         * A wrapper for the Chrome Extension Redux DevTools.
         * Makes sure state changes triggered by the extension
         * trigger Angular2's change detector.
         *
         * @argument options: dev tool options; same
         * format as described here:
         * [zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md]
         */
        this.enhancer = function (options) {
            /** @type {?} */
            var subscription;
            if (!_this.isEnabled()) {
                return null;
            } /** @type {?} */
            ((
            // Make sure changes from dev tools update angular's view.
            // Make sure changes from dev tools update angular's view.
            _this.getDevTools())).listen(function (_a) {
                var type = _a.type;
                if (type === 'START') {
                    subscription = _this.ngRedux.subscribe(function () {
                        if (!NgZone.isInAngularZone()) {
                            _this.appRef.tick();
                        }
                    });
                }
                else if (type === 'STOP') {
                    subscription();
                }
            });
            return /** @type {?} */ ((_this.getDevTools()))(options || {});
        };
        /**
         * Returns true if the extension is installed and enabled.
         */
        this.isEnabled = function () { return !!_this.getDevTools(); };
        /**
         * Returns the redux devtools enhancer.
         */
        this.getDevTools = function () {
            return environment &&
                (environment.__REDUX_DEVTOOLS_EXTENSION__ || environment.devToolsExtension);
        };
    }
    DevToolsExtension.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DevToolsExtension.ctorParameters = function () { return [
        { type: ApplicationRef },
        { type: NgRedux }
    ]; };
    return DevToolsExtension;
}());
export { DevToolsExtension };
if (false) {
    /**
     * A wrapper for the Chrome Extension Redux DevTools.
     * Makes sure state changes triggered by the extension
     * trigger Angular2's change detector.
     *
     * @argument options: dev tool options; same
     * format as described here:
     * [zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md]
     * @type {?}
     */
    DevToolsExtension.prototype.enhancer;
    /**
     * Returns true if the extension is installed and enabled.
     * @type {?}
     */
    DevToolsExtension.prototype.isEnabled;
    /**
     * Returns the redux devtools enhancer.
     * @type {?}
     */
    DevToolsExtension.prototype.getDevTools;
    /** @type {?} */
    DevToolsExtension.prototype.appRef;
    /** @type {?} */
    DevToolsExtension.prototype.ngRedux;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2LXRvb2xzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2Rldi10b29scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25FLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlckMsSUFBTSxXQUFXLHFCQUE0QixDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVc7SUFDekUsQ0FBQyxDQUFDLE1BQU07SUFDUixDQUFDLENBQUMsRUFBRSxDQUE0QixFQUFDOzs7OztJQU9qQyxjQUFjO0lBQ2QsMkJBQW9CLE1BQXNCLEVBQVUsT0FBcUI7UUFBekUsaUJBQTZFO1FBQXpELFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBYzs7Ozs7Ozs7Ozt3QkFXOUQsVUFBQyxPQUF5Qjs7WUFDbkMsSUFBSSxZQUFZLENBQWM7WUFDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ2I7OztZQUdELEFBREEsMERBQTBEO1lBQzFELEtBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRSxNQUFNLENBQUMsVUFBQyxFQUFRO29CQUFOLGNBQUk7Z0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNyQixZQUFZLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7d0JBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDOUIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzt5QkFDcEI7cUJBQ0YsQ0FBQyxDQUFDO2lCQUNKO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDM0IsWUFBWSxFQUFFLENBQUM7aUJBQ2hCO2FBQ0Y7WUFFRCxNQUFNLG9CQUFDLEtBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRSxPQUFPLElBQUksRUFBRSxFQUFFO1NBQzNDOzs7O3lCQUtXLGNBQU0sT0FBQSxDQUFDLENBQUMsS0FBSSxDQUFDLFdBQVcsRUFBRSxFQUFwQixDQUFvQjs7OzsyQkFLeEI7WUFDWixPQUFBLFdBQVc7Z0JBQ1gsQ0FBQyxXQUFXLENBQUMsNEJBQTRCLElBQUksV0FBVyxDQUFDLGlCQUFpQixDQUFDO1FBRDNFLENBQzJFO0tBM0NBOztnQkFIOUUsVUFBVTs7OztnQkF6QkYsY0FBYztnQkFHZCxPQUFPOzs0QkFIaEI7O1NBMEJhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcGxpY2F0aW9uUmVmLCBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFueUFjdGlvbiwgU3RvcmVFbmhhbmNlciwgVW5zdWJzY3JpYmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBFbmhhbmNlck9wdGlvbnMgfSBmcm9tICdyZWR1eC1kZXZ0b29scy1leHRlbnNpb24nO1xuaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJy4vbmctcmVkdXgnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlZHV4RGV2VG9vbHMge1xuICAob3B0aW9uczogRW5oYW5jZXJPcHRpb25zKTogU3RvcmVFbmhhbmNlcjxhbnk+O1xuICBsaXN0ZW46IChcbiAgICBvbk1lc3NhZ2U6IChtZXNzYWdlOiBBbnlBY3Rpb24pID0+IHZvaWQsXG4gICAgaW5zdGFuY2VJZD86IHN0cmluZyxcbiAgKSA9PiB2b2lkO1xufVxuXG5pbnRlcmZhY2UgV2luZG93V2l0aFJlZHV4RGV2VG9vbHMgZXh0ZW5kcyBXaW5kb3cge1xuICBfX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9fPzogUmVkdXhEZXZUb29scztcbiAgZGV2VG9vbHNFeHRlbnNpb24/OiBSZWR1eERldlRvb2xzO1xufVxuXG5jb25zdCBlbnZpcm9ubWVudDogV2luZG93V2l0aFJlZHV4RGV2VG9vbHMgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgPyB3aW5kb3dcbiAgOiB7fSkgYXMgV2luZG93V2l0aFJlZHV4RGV2VG9vbHM7XG5cbi8qKlxuICogQW4gYW5ndWxhci0yLWlmaWVkIHZlcnNpb24gb2YgdGhlIFJlZHV4IERldlRvb2xzIGNocm9tZSBleHRlbnNpb24uXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZXZUb29sc0V4dGVuc2lvbiB7XG4gIC8qKiBAaGlkZGVuICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZiwgcHJpdmF0ZSBuZ1JlZHV4OiBOZ1JlZHV4PGFueT4pIHt9XG5cbiAgLyoqXG4gICAqIEEgd3JhcHBlciBmb3IgdGhlIENocm9tZSBFeHRlbnNpb24gUmVkdXggRGV2VG9vbHMuXG4gICAqIE1ha2VzIHN1cmUgc3RhdGUgY2hhbmdlcyB0cmlnZ2VyZWQgYnkgdGhlIGV4dGVuc2lvblxuICAgKiB0cmlnZ2VyIEFuZ3VsYXIyJ3MgY2hhbmdlIGRldGVjdG9yLlxuICAgKlxuICAgKiBAYXJndW1lbnQgb3B0aW9uczogZGV2IHRvb2wgb3B0aW9uczsgc2FtZVxuICAgKiBmb3JtYXQgYXMgZGVzY3JpYmVkIGhlcmU6XG4gICAqIFt6YWxtb3hpc3VzL3JlZHV4LWRldnRvb2xzLWV4dGVuc2lvbi9ibG9iL21hc3Rlci9kb2NzL0FQSS9Bcmd1bWVudHMubWRdXG4gICAqL1xuICBlbmhhbmNlciA9IChvcHRpb25zPzogRW5oYW5jZXJPcHRpb25zKSA9PiB7XG4gICAgbGV0IHN1YnNjcmlwdGlvbjogVW5zdWJzY3JpYmU7XG4gICAgaWYgKCF0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgY2hhbmdlcyBmcm9tIGRldiB0b29scyB1cGRhdGUgYW5ndWxhcidzIHZpZXcuXG4gICAgdGhpcy5nZXREZXZUb29scygpIS5saXN0ZW4oKHsgdHlwZSB9KSA9PiB7XG4gICAgICBpZiAodHlwZSA9PT0gJ1NUQVJUJykge1xuICAgICAgICBzdWJzY3JpcHRpb24gPSB0aGlzLm5nUmVkdXguc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBpZiAoIU5nWm9uZS5pc0luQW5ndWxhclpvbmUoKSkge1xuICAgICAgICAgICAgdGhpcy5hcHBSZWYudGljaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdTVE9QJykge1xuICAgICAgICBzdWJzY3JpcHRpb24oKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmdldERldlRvb2xzKCkhKG9wdGlvbnMgfHwge30pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGV4dGVuc2lvbiBpcyBpbnN0YWxsZWQgYW5kIGVuYWJsZWQuXG4gICAqL1xuICBpc0VuYWJsZWQgPSAoKSA9PiAhIXRoaXMuZ2V0RGV2VG9vbHMoKTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcmVkdXggZGV2dG9vbHMgZW5oYW5jZXIuXG4gICAqL1xuICBnZXREZXZUb29scyA9ICgpID0+XG4gICAgZW52aXJvbm1lbnQgJiZcbiAgICAoZW52aXJvbm1lbnQuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXyB8fCBlbnZpcm9ubWVudC5kZXZUb29sc0V4dGVuc2lvbik7XG59XG4iXX0=