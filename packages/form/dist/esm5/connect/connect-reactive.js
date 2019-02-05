/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { FormStore } from '../form-store';
import { ConnectBase } from './connect-base';
var ReactiveConnectDirective = /** @class */ (function (_super) {
    tslib_1.__extends(ReactiveConnectDirective, _super);
    function ReactiveConnectDirective(store) {
        var _this = _super.call(this) || this;
        _this.store = store;
        return _this;
    }
    ReactiveConnectDirective.decorators = [
        { type: Directive, args: [{ selector: 'form[connect][formGroup]' },] },
    ];
    /** @nocollapse */
    ReactiveConnectDirective.ctorParameters = function () { return [
        { type: FormStore }
    ]; };
    ReactiveConnectDirective.propDecorators = {
        formGroup: [{ type: Input }]
    };
    return ReactiveConnectDirective;
}(ConnectBase));
export { ReactiveConnectDirective };
if (false) {
    /** @type {?} */
    ReactiveConnectDirective.prototype.formGroup;
    /** @type {?} */
    ReactiveConnectDirective.prototype.store;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC1yZWFjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vIiwic291cmNlcyI6WyJjb25uZWN0L2Nvbm5lY3QtcmVhY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7SUFJQyxvREFBVztJQUd2RCxrQ0FBc0IsS0FBZ0I7UUFBdEMsWUFDRSxpQkFBTyxTQUNSO1FBRnFCLFdBQUssR0FBTCxLQUFLLENBQVc7O0tBRXJDOztnQkFORixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsMEJBQTBCLEVBQUU7Ozs7Z0JBTDFDLFNBQVM7Ozs0QkFPZixLQUFLOzttQ0FUUjtFQVE4QyxXQUFXO1NBQTVDLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRm9ybVN0b3JlIH0gZnJvbSAnLi4vZm9ybS1zdG9yZSc7XG5cbmltcG9ydCB7IENvbm5lY3RCYXNlIH0gZnJvbSAnLi9jb25uZWN0LWJhc2UnO1xuXG4vLyBGb3IgcmVhY3RpdmUgZm9ybXMgKHdpdGhvdXQgaW1wbGljaXQgTmdGb3JtKVxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnZm9ybVtjb25uZWN0XVtmb3JtR3JvdXBdJyB9KVxuZXhwb3J0IGNsYXNzIFJlYWN0aXZlQ29ubmVjdERpcmVjdGl2ZSBleHRlbmRzIENvbm5lY3RCYXNlIHtcbiAgQElucHV0KCkgZm9ybUdyb3VwOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHN0b3JlOiBGb3JtU3RvcmUpIHtcbiAgICBzdXBlcigpO1xuICB9XG59XG4iXX0=