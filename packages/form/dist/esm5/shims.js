/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { CheckboxControlValueAccessor, RadioControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, } from '@angular/forms';
/**
 * @param {?} name
 * @param {?} parent
 * @return {?}
 */
export function controlPath(name, parent) {
    return tslib_1.__spread((parent.path || []), [name]);
}
/** @type {?} */
var BUILTIN_ACCESSORS = [
    CheckboxControlValueAccessor,
    SelectControlValueAccessor,
    SelectMultipleControlValueAccessor,
    RadioControlValueAccessor,
];
/**
 * @param {?} valueAccessor
 * @return {?}
 */
export function isBuiltInAccessor(valueAccessor) {
    return BUILTIN_ACCESSORS.some(function (a) { return valueAccessor.constructor === a; });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpbXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1yZWR1eC9mb3JtLyIsInNvdXJjZXMiOlsic2hpbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsNEJBQTRCLEVBRzVCLHlCQUF5QixFQUN6QiwwQkFBMEIsRUFDMUIsa0NBQWtDLEdBQ25DLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQUV4QixNQUFNLHNCQUFzQixJQUFZLEVBQUUsTUFBd0I7SUFDaEUsTUFBTSxrQkFBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLEdBQUUsSUFBSSxHQUFFO0NBQ3ZDOztBQUVELElBQU0saUJBQWlCLEdBQUc7SUFDeEIsNEJBQTRCO0lBQzVCLDBCQUEwQjtJQUMxQixrQ0FBa0M7SUFDbEMseUJBQXlCO0NBQzFCLENBQUM7Ozs7O0FBRUYsTUFBTSw0QkFDSixhQUFtQztJQUVuQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsYUFBYSxDQUFDLFdBQVcsS0FBSyxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQztDQUNyRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoZWNrYm94Q29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIENvbnRyb2xDb250YWluZXIsXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgU2VsZWN0TXVsdGlwbGVDb250cm9sVmFsdWVBY2Nlc3Nvcixcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udHJvbFBhdGgobmFtZTogc3RyaW5nLCBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIpOiBzdHJpbmdbXSB7XG4gIHJldHVybiBbLi4uKHBhcmVudC5wYXRoIHx8IFtdKSwgbmFtZV07XG59XG5cbmNvbnN0IEJVSUxUSU5fQUNDRVNTT1JTID0gW1xuICBDaGVja2JveENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgU2VsZWN0TXVsdGlwbGVDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgUmFkaW9Db250cm9sVmFsdWVBY2Nlc3Nvcixcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0J1aWx0SW5BY2Nlc3NvcihcbiAgdmFsdWVBY2Nlc3NvcjogQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIEJVSUxUSU5fQUNDRVNTT1JTLnNvbWUoYSA9PiB2YWx1ZUFjY2Vzc29yLmNvbnN0cnVjdG9yID09PSBhKTtcbn1cbiJdfQ==