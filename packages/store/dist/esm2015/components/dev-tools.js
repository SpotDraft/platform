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
const environment = /** @type {?} */ ((typeof window !== 'undefined'
    ? window
    : {}));
/**
 * An angular-2-ified version of the Redux DevTools chrome extension.
 */
export class DevToolsExtension {
    /**
     * @hidden
     * @param {?} appRef
     * @param {?} ngRedux
     */
    constructor(appRef, ngRedux) {
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
        this.enhancer = (options) => {
            /** @type {?} */
            let subscription;
            if (!this.isEnabled()) {
                return null;
            } /** @type {?} */
            ((
            // Make sure changes from dev tools update angular's view.
            this.getDevTools())).listen(({ type }) => {
                if (type === 'START') {
                    subscription = this.ngRedux.subscribe(() => {
                        if (!NgZone.isInAngularZone()) {
                            this.appRef.tick();
                        }
                    });
                }
                else if (type === 'STOP') {
                    subscription();
                }
            });
            return /** @type {?} */ ((this.getDevTools()))(options || {});
        };
        /**
         * Returns true if the extension is installed and enabled.
         */
        this.isEnabled = () => !!this.getDevTools();
        /**
         * Returns the redux devtools enhancer.
         */
        this.getDevTools = () => environment &&
            (environment.__REDUX_DEVTOOLS_EXTENSION__ || environment.devToolsExtension);
    }
}
DevToolsExtension.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DevToolsExtension.ctorParameters = () => [
    { type: ApplicationRef },
    { type: NgRedux }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2LXRvb2xzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2Rldi10b29scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25FLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlckMsTUFBTSxXQUFXLHFCQUE0QixDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVc7SUFDekUsQ0FBQyxDQUFDLE1BQU07SUFDUixDQUFDLENBQUMsRUFBRSxDQUE0QixFQUFDOzs7O0FBTW5DLE1BQU07Ozs7OztJQUVKLFlBQW9CLE1BQXNCLEVBQVUsT0FBcUI7UUFBckQsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFjOzs7Ozs7Ozs7O3dCQVc5RCxDQUFDLE9BQXlCLEVBQUUsRUFBRTs7WUFDdkMsSUFBSSxZQUFZLENBQWM7WUFDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ2I7OztZQUdELElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7Z0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNyQixZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO3dCQUN6QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7eUJBQ3BCO3FCQUNGLENBQUMsQ0FBQztpQkFDSjtnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQzNCLFlBQVksRUFBRSxDQUFDO2lCQUNoQjthQUNGO1lBRUQsTUFBTSxvQkFBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUUsT0FBTyxJQUFJLEVBQUUsRUFBRTtTQUMzQzs7Ozt5QkFLVyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTs7OzsyQkFLeEIsR0FBRyxFQUFFLENBQ2pCLFdBQVc7WUFDWCxDQUFDLFdBQVcsQ0FBQyw0QkFBNEIsSUFBSSxXQUFXLENBQUMsaUJBQWlCLENBQUM7S0EzQ0E7OztZQUg5RSxVQUFVOzs7O1lBekJGLGNBQWM7WUFHZCxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwbGljYXRpb25SZWYsIEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW55QWN0aW9uLCBTdG9yZUVuaGFuY2VyLCBVbnN1YnNjcmliZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IEVuaGFuY2VyT3B0aW9ucyB9IGZyb20gJ3JlZHV4LWRldnRvb2xzLWV4dGVuc2lvbic7XG5pbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnLi9uZy1yZWR1eCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVkdXhEZXZUb29scyB7XG4gIChvcHRpb25zOiBFbmhhbmNlck9wdGlvbnMpOiBTdG9yZUVuaGFuY2VyPGFueT47XG4gIGxpc3RlbjogKFxuICAgIG9uTWVzc2FnZTogKG1lc3NhZ2U6IEFueUFjdGlvbikgPT4gdm9pZCxcbiAgICBpbnN0YW5jZUlkPzogc3RyaW5nLFxuICApID0+IHZvaWQ7XG59XG5cbmludGVyZmFjZSBXaW5kb3dXaXRoUmVkdXhEZXZUb29scyBleHRlbmRzIFdpbmRvdyB7XG4gIF9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX18/OiBSZWR1eERldlRvb2xzO1xuICBkZXZUb29sc0V4dGVuc2lvbj86IFJlZHV4RGV2VG9vbHM7XG59XG5cbmNvbnN0IGVudmlyb25tZW50OiBXaW5kb3dXaXRoUmVkdXhEZXZUb29scyA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICA/IHdpbmRvd1xuICA6IHt9KSBhcyBXaW5kb3dXaXRoUmVkdXhEZXZUb29scztcblxuLyoqXG4gKiBBbiBhbmd1bGFyLTItaWZpZWQgdmVyc2lvbiBvZiB0aGUgUmVkdXggRGV2VG9vbHMgY2hyb21lIGV4dGVuc2lvbi5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERldlRvb2xzRXh0ZW5zaW9uIHtcbiAgLyoqIEBoaWRkZW4gKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLCBwcml2YXRlIG5nUmVkdXg6IE5nUmVkdXg8YW55Pikge31cblxuICAvKipcbiAgICogQSB3cmFwcGVyIGZvciB0aGUgQ2hyb21lIEV4dGVuc2lvbiBSZWR1eCBEZXZUb29scy5cbiAgICogTWFrZXMgc3VyZSBzdGF0ZSBjaGFuZ2VzIHRyaWdnZXJlZCBieSB0aGUgZXh0ZW5zaW9uXG4gICAqIHRyaWdnZXIgQW5ndWxhcjIncyBjaGFuZ2UgZGV0ZWN0b3IuXG4gICAqXG4gICAqIEBhcmd1bWVudCBvcHRpb25zOiBkZXYgdG9vbCBvcHRpb25zOyBzYW1lXG4gICAqIGZvcm1hdCBhcyBkZXNjcmliZWQgaGVyZTpcbiAgICogW3phbG1veGlzdXMvcmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uL2Jsb2IvbWFzdGVyL2RvY3MvQVBJL0FyZ3VtZW50cy5tZF1cbiAgICovXG4gIGVuaGFuY2VyID0gKG9wdGlvbnM/OiBFbmhhbmNlck9wdGlvbnMpID0+IHtcbiAgICBsZXQgc3Vic2NyaXB0aW9uOiBVbnN1YnNjcmliZTtcbiAgICBpZiAoIXRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIE1ha2Ugc3VyZSBjaGFuZ2VzIGZyb20gZGV2IHRvb2xzIHVwZGF0ZSBhbmd1bGFyJ3Mgdmlldy5cbiAgICB0aGlzLmdldERldlRvb2xzKCkhLmxpc3RlbigoeyB0eXBlIH0pID0+IHtcbiAgICAgIGlmICh0eXBlID09PSAnU1RBUlQnKSB7XG4gICAgICAgIHN1YnNjcmlwdGlvbiA9IHRoaXMubmdSZWR1eC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGlmICghTmdab25lLmlzSW5Bbmd1bGFyWm9uZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmFwcFJlZi50aWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1NUT1AnKSB7XG4gICAgICAgIHN1YnNjcmlwdGlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0RGV2VG9vbHMoKSEob3B0aW9ucyB8fCB7fSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZXh0ZW5zaW9uIGlzIGluc3RhbGxlZCBhbmQgZW5hYmxlZC5cbiAgICovXG4gIGlzRW5hYmxlZCA9ICgpID0+ICEhdGhpcy5nZXREZXZUb29scygpO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByZWR1eCBkZXZ0b29scyBlbmhhbmNlci5cbiAgICovXG4gIGdldERldlRvb2xzID0gKCkgPT5cbiAgICBlbnZpcm9ubWVudCAmJlxuICAgIChlbnZpcm9ubWVudC5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9fIHx8IGVudmlyb25tZW50LmRldlRvb2xzRXh0ZW5zaW9uKTtcbn1cbiJdfQ==