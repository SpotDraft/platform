/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Sets a deeply-nested property value from an object, given a 'path'
 * of property names or array indices. Path elements are created if
 * not there already. Does not mutate the given object.
 *
 * @hidden
  @type {?} */
export const setIn = (obj, [firstElem, ...restElems], value) => 'function' === typeof (obj[firstElem] || {}).setIn
    ? Object.assign({}, obj, { [firstElem]: obj[firstElem].setIn(restElems, value) }) : Object.assign({}, obj, { [firstElem]: restElems.length === 0
        ? value
        : setIn(obj[firstElem] || {}, restElems, value) });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWluLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvIiwic291cmNlcyI6WyJ1dGlscy9zZXQtaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFPQSxhQUFhLEtBQUssR0FBRyxDQUNuQixHQUFRLEVBQ1IsQ0FBQyxTQUFTLEVBQUUsR0FBRyxTQUFTLENBQXNCLEVBQzlDLEtBQVUsRUFDRixFQUFFLENBQ1YsVUFBVSxLQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSztJQUNoRCxDQUFDLG1CQUNNLEdBQUcsSUFDTixDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxJQUV2RCxDQUFDLG1CQUNNLEdBQUcsSUFDTixDQUFDLFNBQVMsQ0FBQyxFQUNULFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUNwQixDQUFDLENBQUMsS0FBSztRQUNQLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLEdBQ3BELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFNldHMgYSBkZWVwbHktbmVzdGVkIHByb3BlcnR5IHZhbHVlIGZyb20gYW4gb2JqZWN0LCBnaXZlbiBhICdwYXRoJ1xuICogb2YgcHJvcGVydHkgbmFtZXMgb3IgYXJyYXkgaW5kaWNlcy4gUGF0aCBlbGVtZW50cyBhcmUgY3JlYXRlZCBpZlxuICogbm90IHRoZXJlIGFscmVhZHkuIERvZXMgbm90IG11dGF0ZSB0aGUgZ2l2ZW4gb2JqZWN0LlxuICpcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGNvbnN0IHNldEluID0gKFxuICBvYmo6IGFueSxcbiAgW2ZpcnN0RWxlbSwgLi4ucmVzdEVsZW1zXTogKHN0cmluZyB8IG51bWJlcilbXSxcbiAgdmFsdWU6IGFueSxcbik6IG9iamVjdCA9PlxuICAnZnVuY3Rpb24nID09PSB0eXBlb2YgKG9ialtmaXJzdEVsZW1dIHx8IHt9KS5zZXRJblxuICAgID8ge1xuICAgICAgICAuLi5vYmosXG4gICAgICAgIFtmaXJzdEVsZW1dOiBvYmpbZmlyc3RFbGVtXS5zZXRJbihyZXN0RWxlbXMsIHZhbHVlKSxcbiAgICAgIH1cbiAgICA6IHtcbiAgICAgICAgLi4ub2JqLFxuICAgICAgICBbZmlyc3RFbGVtXTpcbiAgICAgICAgICByZXN0RWxlbXMubGVuZ3RoID09PSAwXG4gICAgICAgICAgICA/IHZhbHVlXG4gICAgICAgICAgICA6IHNldEluKG9ialtmaXJzdEVsZW1dIHx8IHt9LCByZXN0RWxlbXMsIHZhbHVlKSxcbiAgICAgIH07XG4iXX0=