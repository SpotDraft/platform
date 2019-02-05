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
export function WithSubStore(_a) {
    var basePathMethodName = _a.basePathMethodName, localReducer = _a.localReducer;
    return function decorate(constructor) {
        setClassOptions(constructor, {
            basePathMethodName: basePathMethodName,
            localReducer: localReducer,
        });
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aC1zdWItc3RvcmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvd2l0aC1zdWItc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUIsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7Ozs7Ozs7OztBQVVqRSxNQUFNLHVCQUF1QixFQUdQO1FBRnBCLDBDQUFrQixFQUNsQiw4QkFBWTtJQUVaLE1BQU0sQ0FBQyxrQkFBa0IsV0FBcUI7UUFDNUMsZUFBZSxDQUFDLFdBQVcsRUFBRTtZQUMzQixrQkFBa0Isb0JBQUE7WUFDbEIsWUFBWSxjQUFBO1NBQ2IsQ0FBQyxDQUFDO0tBQ0osQ0FBQztDQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnJhY3RhbFN0b3JlT3B0aW9ucywgc2V0Q2xhc3NPcHRpb25zIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuLyoqXG4gKiBNb2RpZmllcyB0aGUgYmVoYXZpb3VyIG9mIGFueSBgQHNlbGVjdGAsIGBAc2VsZWN0JGAsIG9yIGBAZGlzcGF0Y2hgXG4gKiBkZWNvcmF0b3JzIHRvIG9wZXJhdGUgb24gYSBzdWJzdG9yZSBkZWZpbmVkIGJ5IHRoZSBJRnJhY3RhbFN0b3JlT3B0aW9ucy5cbiAqXG4gKiBTZWU6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci1yZWR1eC9zdG9yZS9ibG9iL21hc3Rlci9hcnRpY2xlcy9mcmFjdGFsLXN0b3JlLm1kXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCBTdWJTdG9yZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBXaXRoU3ViU3RvcmUoe1xuICBiYXNlUGF0aE1ldGhvZE5hbWUsXG4gIGxvY2FsUmVkdWNlcixcbn06IEZyYWN0YWxTdG9yZU9wdGlvbnMpOiBDbGFzc0RlY29yYXRvciB7XG4gIHJldHVybiBmdW5jdGlvbiBkZWNvcmF0ZShjb25zdHJ1Y3RvcjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICBzZXRDbGFzc09wdGlvbnMoY29uc3RydWN0b3IsIHtcbiAgICAgIGJhc2VQYXRoTWV0aG9kTmFtZSxcbiAgICAgIGxvY2FsUmVkdWNlcixcbiAgICB9KTtcbiAgfTtcbn1cbiJdfQ==