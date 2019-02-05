/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { setClassOptions } from './helpers';
/**
 * Modifies the behaviour of any `\@select`, `\@select$`, or `\@dispatch`
 * decorators to operate on a substore defined by the IFractalStoreOptions.
 *
 * See:
 * https://github.com/angular-redux/store/blob/master/articles/fractal-store.md
 * for more information about SubStores.
 * @param {?} __0
 * @return {?}
 */
export function WithSubStore({ basePathMethodName, localReducer, }) {
    return function decorate(constructor) {
        setClassOptions(constructor, {
            basePathMethodName,
            localReducer,
        });
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aC1zdWItc3RvcmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvd2l0aC1zdWItc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUIsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7Ozs7Ozs7OztBQVVqRSxNQUFNLHVCQUF1QixFQUMzQixrQkFBa0IsRUFDbEIsWUFBWSxHQUNRO0lBQ3BCLE1BQU0sQ0FBQyxrQkFBa0IsV0FBcUI7UUFDNUMsZUFBZSxDQUFDLFdBQVcsRUFBRTtZQUMzQixrQkFBa0I7WUFDbEIsWUFBWTtTQUNiLENBQUMsQ0FBQztLQUNKLENBQUM7Q0FDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZyYWN0YWxTdG9yZU9wdGlvbnMsIHNldENsYXNzT3B0aW9ucyB9IGZyb20gJy4vaGVscGVycyc7XG5cbi8qKlxuICogTW9kaWZpZXMgdGhlIGJlaGF2aW91ciBvZiBhbnkgYEBzZWxlY3RgLCBgQHNlbGVjdCRgLCBvciBgQGRpc3BhdGNoYFxuICogZGVjb3JhdG9ycyB0byBvcGVyYXRlIG9uIGEgc3Vic3RvcmUgZGVmaW5lZCBieSB0aGUgSUZyYWN0YWxTdG9yZU9wdGlvbnMuXG4gKlxuICogU2VlOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXItcmVkdXgvc3RvcmUvYmxvYi9tYXN0ZXIvYXJ0aWNsZXMvZnJhY3RhbC1zdG9yZS5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgU3ViU3RvcmVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gV2l0aFN1YlN0b3JlKHtcbiAgYmFzZVBhdGhNZXRob2ROYW1lLFxuICBsb2NhbFJlZHVjZXIsXG59OiBGcmFjdGFsU3RvcmVPcHRpb25zKTogQ2xhc3NEZWNvcmF0b3Ige1xuICByZXR1cm4gZnVuY3Rpb24gZGVjb3JhdGUoY29uc3RydWN0b3I6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgc2V0Q2xhc3NPcHRpb25zKGNvbnN0cnVjdG9yLCB7XG4gICAgICBiYXNlUGF0aE1ldGhvZE5hbWUsXG4gICAgICBsb2NhbFJlZHVjZXIsXG4gICAgfSk7XG4gIH07XG59XG4iXX0=