/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormStore } from '../form-store';
import { ConnectBase } from './connect-base';
export class ConnectDirective extends ConnectBase {
    /**
     * @param {?} store
     * @param {?} form
     */
    constructor(store, form) {
        super();
        this.store = store;
        this.form = form;
    }
}
ConnectDirective.decorators = [
    { type: Directive, args: [{ selector: 'form[connect]:not([formGroup])' },] },
];
/** @nocollapse */
ConnectDirective.ctorParameters = () => [
    { type: FormStore },
    { type: NgForm }
];
if (false) {
    /** @type {?} */
    ConnectDirective.prototype.store;
    /** @type {?} */
    ConnectDirective.prototype.form;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vIiwic291cmNlcyI6WyJjb25uZWN0L2Nvbm5lY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSTdDLE1BQU0sdUJBQXdCLFNBQVEsV0FBVzs7Ozs7SUFDL0MsWUFBc0IsS0FBZ0IsRUFBWSxJQUFZO1FBQzVELEtBQUssRUFBRSxDQUFDO1FBRFksVUFBSyxHQUFMLEtBQUssQ0FBVztRQUFZLFNBQUksR0FBSixJQUFJLENBQVE7S0FFN0Q7OztZQUpGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxnQ0FBZ0MsRUFBRTs7OztZQUpoRCxTQUFTO1lBRlQsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEZvcm1TdG9yZSB9IGZyb20gJy4uL2Zvcm0tc3RvcmUnO1xuaW1wb3J0IHsgQ29ubmVjdEJhc2UgfSBmcm9tICcuL2Nvbm5lY3QtYmFzZSc7XG5cbi8vIEZvciB0ZW1wbGF0ZSBmb3JtcyAod2l0aCBpbXBsaWNpdCBOZ0Zvcm0pXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdmb3JtW2Nvbm5lY3RdOm5vdChbZm9ybUdyb3VwXSknIH0pXG5leHBvcnQgY2xhc3MgQ29ubmVjdERpcmVjdGl2ZSBleHRlbmRzIENvbm5lY3RCYXNlIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHN0b3JlOiBGb3JtU3RvcmUsIHByb3RlY3RlZCBmb3JtOiBOZ0Zvcm0pIHtcbiAgICBzdXBlcigpO1xuICB9XG59XG4iXX0=