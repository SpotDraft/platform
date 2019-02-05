/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { UPDATE_LOCATION } from './actions';
/** @type {?} */
export const DefaultRouterState = '';
/**
 * @record
 */
export function RouterAction() { }
/** @type {?|undefined} */
RouterAction.prototype.payload;
/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
export function routerReducer(state = DefaultRouterState, action) {
    switch (action.type) {
        case UPDATE_LOCATION:
            return action.payload || DefaultRouterState;
        default:
            return state;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L3JvdXRlci8iLCJzb3VyY2VzIjpbInJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxXQUFXLENBQUM7O0FBRTVDLGFBQWEsa0JBQWtCLEdBQVcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7QUFNN0MsTUFBTSx3QkFDSixRQUFnQixrQkFBa0IsRUFDbEMsTUFBb0I7SUFFcEIsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEIsS0FBSyxlQUFlO1lBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLGtCQUFrQixDQUFDO1FBQzlDO1lBQ0UsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNoQjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuXG5pbXBvcnQgeyBVUERBVEVfTE9DQVRJT04gfSBmcm9tICcuL2FjdGlvbnMnO1xuXG5leHBvcnQgY29uc3QgRGVmYXVsdFJvdXRlclN0YXRlOiBzdHJpbmcgPSAnJztcblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXJBY3Rpb24gZXh0ZW5kcyBBY3Rpb24ge1xuICBwYXlsb2FkPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91dGVyUmVkdWNlcihcbiAgc3RhdGU6IHN0cmluZyA9IERlZmF1bHRSb3V0ZXJTdGF0ZSxcbiAgYWN0aW9uOiBSb3V0ZXJBY3Rpb24sXG4pOiBzdHJpbmcge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBVUERBVEVfTE9DQVRJT046XG4gICAgICByZXR1cm4gYWN0aW9uLnBheWxvYWQgfHwgRGVmYXVsdFJvdXRlclN0YXRlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiJdfQ==