/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { FORM_CHANGED } from './form-store';
import { State } from './state';
/** @type {?} */
export var defaultFormReducer = function (initialState) {
    /** @type {?} */
    var reducer = function (state, action) {
        if (state === void 0) { state = initialState; }
        switch (action.type) {
            case FORM_CHANGED:
                return State.assign(state, action.payload.path, action.payload.value);
            default:
                return state;
        }
    };
    return reducer;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS8iLCJzb3VyY2VzIjpbImZvcm0tcmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU1QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDOztBQUVoQyxXQUFhLGtCQUFrQixHQUFHLFVBQ2hDLFlBQXNEOztJQUV0RCxJQUFNLE9BQU8sR0FBRyxVQUNkLEtBQXlFLEVBQ3pFLE1BQWtDO1FBRGxDLHNCQUFBLEVBQUEsb0JBQXlFO1FBR3pFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEtBQUssWUFBWTtnQkFDZixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4RTtnQkFDRSxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2hCO0tBQ0YsQ0FBQztJQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUM7Q0FDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEl0ZXJhYmxlIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuXG5pbXBvcnQgeyBGT1JNX0NIQU5HRUQgfSBmcm9tICcuL2Zvcm0tc3RvcmUnO1xuXG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4vc3RhdGUnO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdEZvcm1SZWR1Y2VyID0gPFJvb3RTdGF0ZT4oXG4gIGluaXRpYWxTdGF0ZT86IFJvb3RTdGF0ZSB8IEl0ZXJhYmxlLktleWVkPHN0cmluZywgYW55PixcbikgPT4ge1xuICBjb25zdCByZWR1Y2VyID0gKFxuICAgIHN0YXRlOiBSb290U3RhdGUgfCBJdGVyYWJsZS5LZXllZDxzdHJpbmcsIGFueT4gfCB1bmRlZmluZWQgPSBpbml0aWFsU3RhdGUsXG4gICAgYWN0aW9uOiBBY3Rpb24gJiB7IHBheWxvYWQ/OiBhbnkgfSxcbiAgKSA9PiB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSBGT1JNX0NIQU5HRUQ6XG4gICAgICAgIHJldHVybiBTdGF0ZS5hc3NpZ24oc3RhdGUsIGFjdGlvbi5wYXlsb2FkLnBhdGgsIGFjdGlvbi5wYXlsb2FkLnZhbHVlKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHJlZHVjZXI7XG59O1xuIl19