/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/** *
 * Sets a deeply-nested property value from an object, given a 'path'
 * of property names or array indices. Path elements are created if
 * not there already. Does not mutate the given object.
 *
 * @hidden
  @type {?} */
export var setIn = function (obj, _a, value) {
    var _b = tslib_1.__read(_a), firstElem = _b[0], restElems = _b.slice(1);
    return 'function' === typeof (obj[firstElem] || {}).setIn
        ? tslib_1.__assign({}, obj, (_c = {}, _c[firstElem] = obj[firstElem].setIn(restElems, value), _c)) : tslib_1.__assign({}, obj, (_d = {}, _d[firstElem] = restElems.length === 0
        ? value
        : setIn(obj[firstElem] || {}, restElems, value), _d));
    var _c, _d;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWluLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvIiwic291cmNlcyI6WyJ1dGlscy9zZXQtaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBT0EsV0FBYSxLQUFLLEdBQUcsVUFDbkIsR0FBUSxFQUNSLEVBQThDLEVBQzlDLEtBQVU7UUFEVix1QkFBOEMsRUFBN0MsaUJBQVMsRUFBRSx1QkFBWTtJQUd4QixPQUFBLFVBQVUsS0FBSyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUs7UUFDaEQsQ0FBQyxzQkFDTSxHQUFHLGVBQ0wsU0FBUyxJQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxPQUV2RCxDQUFDLHNCQUNNLEdBQUcsZUFDTCxTQUFTLElBQ1IsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxLQUFLO1FBQ1AsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsTUFDcEQ7O0FBWEwsQ0FXSyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTZXRzIGEgZGVlcGx5LW5lc3RlZCBwcm9wZXJ0eSB2YWx1ZSBmcm9tIGFuIG9iamVjdCwgZ2l2ZW4gYSAncGF0aCdcbiAqIG9mIHByb3BlcnR5IG5hbWVzIG9yIGFycmF5IGluZGljZXMuIFBhdGggZWxlbWVudHMgYXJlIGNyZWF0ZWQgaWZcbiAqIG5vdCB0aGVyZSBhbHJlYWR5LiBEb2VzIG5vdCBtdXRhdGUgdGhlIGdpdmVuIG9iamVjdC5cbiAqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRJbiA9IChcbiAgb2JqOiBhbnksXG4gIFtmaXJzdEVsZW0sIC4uLnJlc3RFbGVtc106IChzdHJpbmcgfCBudW1iZXIpW10sXG4gIHZhbHVlOiBhbnksXG4pOiBvYmplY3QgPT5cbiAgJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIChvYmpbZmlyc3RFbGVtXSB8fCB7fSkuc2V0SW5cbiAgICA/IHtcbiAgICAgICAgLi4ub2JqLFxuICAgICAgICBbZmlyc3RFbGVtXTogb2JqW2ZpcnN0RWxlbV0uc2V0SW4ocmVzdEVsZW1zLCB2YWx1ZSksXG4gICAgICB9XG4gICAgOiB7XG4gICAgICAgIC4uLm9iaixcbiAgICAgICAgW2ZpcnN0RWxlbV06XG4gICAgICAgICAgcmVzdEVsZW1zLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgPyB2YWx1ZVxuICAgICAgICAgICAgOiBzZXRJbihvYmpbZmlyc3RFbGVtXSB8fCB7fSwgcmVzdEVsZW1zLCB2YWx1ZSksXG4gICAgICB9O1xuIl19