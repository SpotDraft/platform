/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { getIn } from '../utils/get-in';
/** @typedef {?} */
var Comparator;
export { Comparator };
/** @typedef {?} */
var Transformer;
export { Transformer };
/** @typedef {?} */
var PropertySelector;
export { PropertySelector };
/** @typedef {?} */
var PathSelector;
export { PathSelector };
/** @typedef {?} */
var FunctionSelector;
export { FunctionSelector };
/** @typedef {?} */
var Selector;
export { Selector };
/** *
 * @hidden
  @type {?} */
export var sniffSelectorType = function (selector) {
    return !selector
        ? 'nil'
        : Array.isArray(selector)
            ? 'path'
            : 'function' === typeof selector
                ? 'function'
                : 'property';
};
/** *
 * @hidden
  @type {?} */
export var resolver = function (selector) { return ({
    property: function (state) {
        return state ? state[/** @type {?} */ (selector)] : undefined;
    },
    path: function (state) { return getIn(state, /** @type {?} */ (selector)); },
    function: /** @type {?} */ (selector),
    nil: function (state) { return state; },
}); };
/** *
 * @hidden
  @type {?} */
export var resolveToFunctionSelector = function (selector) { return resolver(selector)[sniffSelectorType(selector)]; };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlbGVjdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJ4QyxXQUFhLGlCQUFpQixHQUFHLFVBQy9CLFFBQWlDO0lBRWpDLE9BQUEsQ0FBQyxRQUFRO1FBQ1AsQ0FBQyxDQUFDLEtBQUs7UUFDUCxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFDdkIsQ0FBQyxDQUFDLE1BQU07WUFDUixDQUFDLENBQUMsVUFBVSxLQUFLLE9BQU8sUUFBUTtnQkFDOUIsQ0FBQyxDQUFDLFVBQVU7Z0JBQ1osQ0FBQyxDQUFDLFVBQVU7QUFObEIsQ0FNa0IsQ0FBQzs7OztBQUdyQixXQUFhLFFBQVEsR0FBRyxVQUFlLFFBQWlDLElBQUssT0FBQSxDQUFDO0lBQzVFLFFBQVEsRUFBRSxVQUFDLEtBQVU7UUFDbkIsT0FBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssbUJBQUMsUUFBNEIsRUFBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0lBQXZELENBQXVEO0lBQ3pELElBQUksRUFBRSxVQUFDLEtBQWdCLElBQUssT0FBQSxLQUFLLENBQUMsS0FBSyxvQkFBRSxRQUF3QixFQUFDLEVBQXRDLENBQXNDO0lBQ2xFLFFBQVEsb0JBQUUsUUFBMEMsQ0FBQTtJQUNwRCxHQUFHLEVBQUUsVUFBQyxLQUFnQixJQUFLLE9BQUEsS0FBSyxFQUFMLENBQUs7Q0FDakMsQ0FBQyxFQU4yRSxDQU0zRSxDQUFDOzs7O0FBR0gsV0FBYSx5QkFBeUIsR0FBRyxVQUN2QyxRQUFpQyxJQUM5QixPQUFBLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUEvQyxDQUErQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZ2V0SW4gfSBmcm9tICcuLi91dGlscy9nZXQtaW4nO1xuXG4vKipcbiAqIEN1c3RvbSBlcXVhbGl0eSBjaGVja2VyIHRoYXQgY2FuIGJlIHVzZWQgd2l0aCBgLnNlbGVjdGAgYW5kIGBAc2VsZWN0YC5cbiAqIGBgYHRzXG4gKiBjb25zdCBjdXN0b21Db21wYXJlOiBDb21wYXJhdG9yID0gKHg6IGFueSwgeTogYW55KSA9PiB7XG4gKiAgcmV0dXJuIHguaWQgPT09IHkuaWRcbiAqIH1cbiAqXG4gKiBAc2VsZWN0KHNlbGVjdG9yLCBjdXN0b21Db21wYXJlKVxuICogYGBgXG4gKi9cbmV4cG9ydCB0eXBlIENvbXBhcmF0b3IgPSAoeDogYW55LCB5OiBhbnkpID0+IGJvb2xlYW47XG5leHBvcnQgdHlwZSBUcmFuc2Zvcm1lcjxSb290U3RhdGUsIFY+ID0gKFxuICBzdG9yZSQ6IE9ic2VydmFibGU8Um9vdFN0YXRlPixcbiAgc2NvcGU6IGFueSxcbikgPT4gT2JzZXJ2YWJsZTxWPjtcbmV4cG9ydCB0eXBlIFByb3BlcnR5U2VsZWN0b3IgPSBzdHJpbmcgfCBudW1iZXIgfCBzeW1ib2w7XG5leHBvcnQgdHlwZSBQYXRoU2VsZWN0b3IgPSAoc3RyaW5nIHwgbnVtYmVyKVtdO1xuZXhwb3J0IHR5cGUgRnVuY3Rpb25TZWxlY3RvcjxSb290U3RhdGUsIFM+ID0gKChzOiBSb290U3RhdGUpID0+IFMpO1xuZXhwb3J0IHR5cGUgU2VsZWN0b3I8Um9vdFN0YXRlLCBTPiA9XG4gIHwgUHJvcGVydHlTZWxlY3RvclxuICB8IFBhdGhTZWxlY3RvclxuICB8IEZ1bmN0aW9uU2VsZWN0b3I8Um9vdFN0YXRlLCBTPjtcblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBjb25zdCBzbmlmZlNlbGVjdG9yVHlwZSA9IDxSb290U3RhdGUsIFM+KFxuICBzZWxlY3Rvcj86IFNlbGVjdG9yPFJvb3RTdGF0ZSwgUz4sXG4pID0+XG4gICFzZWxlY3RvclxuICAgID8gJ25pbCdcbiAgICA6IEFycmF5LmlzQXJyYXkoc2VsZWN0b3IpXG4gICAgICA/ICdwYXRoJ1xuICAgICAgOiAnZnVuY3Rpb24nID09PSB0eXBlb2Ygc2VsZWN0b3JcbiAgICAgICAgPyAnZnVuY3Rpb24nXG4gICAgICAgIDogJ3Byb3BlcnR5JztcblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBjb25zdCByZXNvbHZlciA9IDxSb290U3RhdGUsIFM+KHNlbGVjdG9yPzogU2VsZWN0b3I8Um9vdFN0YXRlLCBTPikgPT4gKHtcbiAgcHJvcGVydHk6IChzdGF0ZTogYW55KSA9PlxuICAgIHN0YXRlID8gc3RhdGVbc2VsZWN0b3IgYXMgUHJvcGVydHlTZWxlY3Rvcl0gOiB1bmRlZmluZWQsXG4gIHBhdGg6IChzdGF0ZTogUm9vdFN0YXRlKSA9PiBnZXRJbihzdGF0ZSwgc2VsZWN0b3IgYXMgUGF0aFNlbGVjdG9yKSxcbiAgZnVuY3Rpb246IHNlbGVjdG9yIGFzIEZ1bmN0aW9uU2VsZWN0b3I8Um9vdFN0YXRlLCBTPixcbiAgbmlsOiAoc3RhdGU6IFJvb3RTdGF0ZSkgPT4gc3RhdGUsXG59KTtcblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBjb25zdCByZXNvbHZlVG9GdW5jdGlvblNlbGVjdG9yID0gPFJvb3RTdGF0ZSwgUz4oXG4gIHNlbGVjdG9yPzogU2VsZWN0b3I8Um9vdFN0YXRlLCBTPixcbikgPT4gcmVzb2x2ZXIoc2VsZWN0b3IpW3NuaWZmU2VsZWN0b3JUeXBlKHNlbGVjdG9yKV07XG4iXX0=