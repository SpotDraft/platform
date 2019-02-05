/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgRedux } from '../components/ng-redux';
import { getBaseStore } from './helpers';
/**
 * Auto-dispatches the return value of the decorated function.
 *
 * Decorate a function creator method with \@dispatch and its return
 * value will automatically be passed to ngRedux.dispatch() for you.
 * @return {?}
 */
export function dispatch() {
    return function decorate(target, key, descriptor) {
        /** @type {?} */
        var originalMethod;
        /** @type {?} */
        var wrapped = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            /** @type {?} */
            var result = originalMethod.apply(this, args);
            if (result !== false) {
                /** @type {?} */
                var store = getBaseStore(this) || NgRedux.instance;
                if (store) {
                    store.dispatch(result);
                }
            }
            return result;
        };
        descriptor = descriptor || Object.getOwnPropertyDescriptor(target, key);
        if (descriptor === undefined) {
            /** @type {?} */
            var dispatchDescriptor = {
                get: function () { return wrapped; },
                set: function (setMethod) { return (originalMethod = setMethod); },
            };
            Object.defineProperty(target, key, dispatchDescriptor);
            return dispatchDescriptor;
        }
        else {
            originalMethod = descriptor.value;
            descriptor.value = wrapped;
            return descriptor;
        }
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGF0Y2guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvZGlzcGF0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7Ozs7OztBQVF6QyxNQUFNO0lBQ0osTUFBTSxDQUFDLGtCQUNMLE1BQWMsRUFDZCxHQUE2QixFQUM3QixVQUErQjs7UUFFL0IsSUFBSSxjQUFjLENBQWE7O1FBRS9CLElBQU0sT0FBTyxHQUFHO1lBQW9CLGNBQWM7aUJBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztnQkFBZCx5QkFBYzs7O1lBQ2hELElBQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2hELEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDOztnQkFDckIsSUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUM7Z0JBQ3JELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1YsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDeEI7YUFDRjtZQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDZixDQUFDO1FBRUYsVUFBVSxHQUFHLFVBQVUsSUFBSSxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDOztZQUM3QixJQUFNLGtCQUFrQixHQUF1QjtnQkFDN0MsR0FBRyxFQUFFLGNBQU0sT0FBQSxPQUFPLEVBQVAsQ0FBTztnQkFDbEIsR0FBRyxFQUFFLFVBQUEsU0FBUyxJQUFJLE9BQUEsQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDLEVBQTVCLENBQTRCO2FBQy9DLENBQUM7WUFDRixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUN2RCxNQUFNLENBQUMsa0JBQWtCLENBQUM7U0FDM0I7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLGNBQWMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQ2xDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxVQUFVLENBQUM7U0FDbkI7S0FDRixDQUFDO0NBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnLi4vY29tcG9uZW50cy9uZy1yZWR1eCc7XG5pbXBvcnQgeyBnZXRCYXNlU3RvcmUgfSBmcm9tICcuL2hlbHBlcnMnO1xuXG4vKipcbiAqIEF1dG8tZGlzcGF0Y2hlcyB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBkZWNvcmF0ZWQgZnVuY3Rpb24uXG4gKlxuICogRGVjb3JhdGUgYSBmdW5jdGlvbiBjcmVhdG9yIG1ldGhvZCB3aXRoIEBkaXNwYXRjaCBhbmQgaXRzIHJldHVyblxuICogdmFsdWUgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIHBhc3NlZCB0byBuZ1JlZHV4LmRpc3BhdGNoKCkgZm9yIHlvdS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoKCk6IFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRlY29yYXRlKFxuICAgIHRhcmdldDogb2JqZWN0LFxuICAgIGtleTogc3RyaW5nIHwgc3ltYm9sIHwgbnVtYmVyLFxuICAgIGRlc2NyaXB0b3I/OiBQcm9wZXJ0eURlc2NyaXB0b3IsXG4gICk6IFByb3BlcnR5RGVzY3JpcHRvciB7XG4gICAgbGV0IG9yaWdpbmFsTWV0aG9kOiAoKSA9PiB2b2lkO1xuXG4gICAgY29uc3Qgd3JhcHBlZCA9IGZ1bmN0aW9uKHRoaXM6IGFueSwgLi4uYXJnczogYW55W10pIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IG9yaWdpbmFsTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBnZXRCYXNlU3RvcmUodGhpcykgfHwgTmdSZWR1eC5pbnN0YW5jZTtcbiAgICAgICAgaWYgKHN0b3JlKSB7XG4gICAgICAgICAgc3RvcmUuZGlzcGF0Y2gocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3IgfHwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gICAgaWYgKGRlc2NyaXB0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgZGlzcGF0Y2hEZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XG4gICAgICAgIGdldDogKCkgPT4gd3JhcHBlZCxcbiAgICAgICAgc2V0OiBzZXRNZXRob2QgPT4gKG9yaWdpbmFsTWV0aG9kID0gc2V0TWV0aG9kKSxcbiAgICAgIH07XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGRpc3BhdGNoRGVzY3JpcHRvcik7XG4gICAgICByZXR1cm4gZGlzcGF0Y2hEZXNjcmlwdG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgICBkZXNjcmlwdG9yLnZhbHVlID0gd3JhcHBlZDtcbiAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==