/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input } from '@angular/core';
import { FormStore } from '../form-store';
import { ConnectBase } from './connect-base';
export class ReactiveConnectDirective extends ConnectBase {
    /**
     * @param {?} store
     */
    constructor(store) {
        super();
        this.store = store;
    }
}
ReactiveConnectDirective.decorators = [
    { type: Directive, args: [{ selector: 'form[connect][formGroup]' },] },
];
/** @nocollapse */
ReactiveConnectDirective.ctorParameters = () => [
    { type: FormStore }
];
ReactiveConnectDirective.propDecorators = {
    formGroup: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    ReactiveConnectDirective.prototype.formGroup;
    /** @type {?} */
    ReactiveConnectDirective.prototype.store;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC1yZWFjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vIiwic291cmNlcyI6WyJjb25uZWN0L2Nvbm5lY3QtcmVhY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSTdDLE1BQU0sK0JBQWdDLFNBQVEsV0FBVzs7OztJQUd2RCxZQUFzQixLQUFnQjtRQUNwQyxLQUFLLEVBQUUsQ0FBQztRQURZLFVBQUssR0FBTCxLQUFLLENBQVc7S0FFckM7OztZQU5GLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSwwQkFBMEIsRUFBRTs7OztZQUwxQyxTQUFTOzs7d0JBT2YsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRm9ybVN0b3JlIH0gZnJvbSAnLi4vZm9ybS1zdG9yZSc7XG5cbmltcG9ydCB7IENvbm5lY3RCYXNlIH0gZnJvbSAnLi9jb25uZWN0LWJhc2UnO1xuXG4vLyBGb3IgcmVhY3RpdmUgZm9ybXMgKHdpdGhvdXQgaW1wbGljaXQgTmdGb3JtKVxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnZm9ybVtjb25uZWN0XVtmb3JtR3JvdXBdJyB9KVxuZXhwb3J0IGNsYXNzIFJlYWN0aXZlQ29ubmVjdERpcmVjdGl2ZSBleHRlbmRzIENvbm5lY3RCYXNlIHtcbiAgQElucHV0KCkgZm9ybUdyb3VwOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHN0b3JlOiBGb3JtU3RvcmUpIHtcbiAgICBzdXBlcigpO1xuICB9XG59XG4iXX0=