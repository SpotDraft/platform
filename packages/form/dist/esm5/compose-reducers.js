/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
export var composeReducers = function () {
    var reducers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        reducers[_i] = arguments[_i];
    }
    return function (s, action) {
        return reducers.reduce(function (st, reducer) { return reducer(st, action); }, s);
    };
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zZS1yZWR1Y2Vycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vIiwic291cmNlcyI6WyJjb21wb3NlLXJlZHVjZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsV0FBYSxlQUFlLEdBQUc7SUFDN0Isa0JBQXdDO1NBQXhDLFVBQXdDLEVBQXhDLHFCQUF3QyxFQUF4QyxJQUF3QztRQUF4Qyw2QkFBd0M7O0lBQ1YsT0FBQSxVQUFDLENBQU0sRUFBRSxNQUFpQjtRQUN4RCxPQUFBLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQyxFQUFFLEVBQUUsT0FBTyxJQUFLLE9BQUEsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBbkIsQ0FBbUIsRUFBRSxDQUFDLENBQUM7SUFBeEQsQ0FBd0Q7QUFEMUIsQ0FDMEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFueUFjdGlvbiwgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcblxuZXhwb3J0IGNvbnN0IGNvbXBvc2VSZWR1Y2VycyA9IDxTdGF0ZT4oXG4gIC4uLnJlZHVjZXJzOiBSZWR1Y2VyPFN0YXRlLCBBbnlBY3Rpb24+W11cbik6IFJlZHVjZXI8U3RhdGUsIEFueUFjdGlvbj4gPT4gKHM6IGFueSwgYWN0aW9uOiBBbnlBY3Rpb24pID0+XG4gIHJlZHVjZXJzLnJlZHVjZSgoc3QsIHJlZHVjZXIpID0+IHJlZHVjZXIoc3QsIGFjdGlvbiksIHMpO1xuIl19