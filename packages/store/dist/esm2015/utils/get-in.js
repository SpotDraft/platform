/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Gets a deeply-nested property value from an object, given a 'path'
 * of property names or array indices.
 *
 * @hidden
 * @param {?} v
 * @param {?} pathElems
 * @return {?}
 */
export function getIn(v, pathElems) {
    if (!v) {
        return v;
    }
    // If this is an ImmutableJS structure, use existing getIn function
    if ('function' === typeof v.getIn) {
        return v.getIn(pathElems);
    }
    const [firstElem, ...restElems] = pathElems;
    if (undefined === v[firstElem]) {
        return undefined;
    }
    if (restElems.length === 0) {
        return v[firstElem];
    }
    return getIn(v[firstElem], restElems);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWluLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvIiwic291cmNlcyI6WyJ1dGlscy9nZXQtaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQU1BLE1BQU0sZ0JBQ0osQ0FBa0IsRUFDbEIsU0FBOEI7SUFFOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUNWOztJQUdELEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzNCO0lBRUQsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUU1QyxFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsU0FBUyxDQUFDO0tBQ2xCO0lBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDckI7SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztDQUN2QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogR2V0cyBhIGRlZXBseS1uZXN0ZWQgcHJvcGVydHkgdmFsdWUgZnJvbSBhbiBvYmplY3QsIGdpdmVuIGEgJ3BhdGgnXG4gKiBvZiBwcm9wZXJ0eSBuYW1lcyBvciBhcnJheSBpbmRpY2VzLlxuICpcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEluKFxuICB2OiBhbnkgfCB1bmRlZmluZWQsXG4gIHBhdGhFbGVtczogKHN0cmluZyB8IG51bWJlcilbXSxcbik6IGFueSB8IHVuZGVmaW5lZCB7XG4gIGlmICghdikge1xuICAgIHJldHVybiB2O1xuICB9XG5cbiAgLy8gSWYgdGhpcyBpcyBhbiBJbW11dGFibGVKUyBzdHJ1Y3R1cmUsIHVzZSBleGlzdGluZyBnZXRJbiBmdW5jdGlvblxuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIHYuZ2V0SW4pIHtcbiAgICByZXR1cm4gdi5nZXRJbihwYXRoRWxlbXMpO1xuICB9XG5cbiAgY29uc3QgW2ZpcnN0RWxlbSwgLi4ucmVzdEVsZW1zXSA9IHBhdGhFbGVtcztcblxuICBpZiAodW5kZWZpbmVkID09PSB2W2ZpcnN0RWxlbV0pIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHJlc3RFbGVtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdltmaXJzdEVsZW1dO1xuICB9XG5cbiAgcmV0dXJuIGdldEluKHZbZmlyc3RFbGVtXSwgcmVzdEVsZW1zKTtcbn1cbiJdfQ==