/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgControl, } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { State } from '../state';
/**
 * @record
 */
export function ControlPair() { }
/** @type {?} */
ControlPair.prototype.path;
/** @type {?} */
ControlPair.prototype.control;
export class ConnectBase {
    /**
     * @return {?}
     */
    get path() {
        /** @type {?} */
        const path = typeof this.connect === 'function' ? this.connect() : this.connect;
        switch (typeof path) {
            case 'object':
                if (State.empty(path)) {
                    return [];
                }
                if (Array.isArray(path)) {
                    return /** @type {?} */ (path);
                }
            case 'string':
                return (/** @type {?} */ (path)).split(/\./g);
            default:
                // fallthrough above (no break)
                throw new Error(`Cannot determine path to object: ${JSON.stringify(path)}`);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.formSubscription) {
            this.formSubscription.unsubscribe();
        }
        if (typeof this.stateSubscription === 'function') {
            this.stateSubscription(); // unsubscribe
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        Promise.resolve().then(() => {
            this.resetState();
            if (this.store) {
                this.stateSubscription = this.store.subscribe(() => this.resetState());
            }
            Promise.resolve().then(() => {
                this.formSubscription = (/** @type {?} */ (this.form.valueChanges))
                    .pipe(debounceTime(0))
                    .subscribe((values) => this.publish(values));
            });
        });
    }
    /**
     * @param {?} path
     * @param {?} formElement
     * @return {?}
     */
    descendants(path, formElement) {
        /** @type {?} */
        const pairs = new Array();
        if (formElement instanceof FormArray) {
            formElement.controls.forEach((c, index) => {
                for (const d of this.descendants((/** @type {?} */ (path)).concat([index]), c)) {
                    pairs.push(d);
                }
            });
        }
        else if (formElement instanceof FormGroup) {
            for (const k of Object.keys(formElement.controls)) {
                pairs.push({
                    path: path.concat([k]),
                    control: formElement.controls[k],
                });
            }
        }
        else if (formElement instanceof NgControl ||
            formElement instanceof FormControl) {
            return [{ path, control: /** @type {?} */ (formElement) }];
        }
        else {
            throw new Error(`Unknown type of form element: ${formElement.constructor.name}`);
        }
        return pairs.filter(p => {
            /** @type {?} */
            const parent = (/** @type {?} */ (p.control))._parent;
            return parent === this.form.control || parent === this.form;
        });
    }
    /**
     * @return {?}
     */
    resetState() {
        /** @type {?} */
        const formElement = this.form.control === undefined ? this.form : this.form.control;
        /** @type {?} */
        const children = this.descendants([], formElement);
        children.forEach(c => {
            const { path, control } = c;
            /** @type {?} */
            const value = State.get(this.getState(), this.path.concat(path));
            if (control.value !== value) {
                control.setValue(value);
            }
        });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    publish(value) {
        if (this.store) {
            this.store.valueChanged(this.path, this.form, value);
        }
    }
    /**
     * @return {?}
     */
    getState() {
        if (this.store) {
            return this.store.getState();
        }
    }
}
ConnectBase.propDecorators = {
    connect: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    ConnectBase.prototype.connect;
    /** @type {?} */
    ConnectBase.prototype.store;
    /** @type {?} */
    ConnectBase.prototype.form;
    /** @type {?} */
    ConnectBase.prototype.stateSubscription;
    /** @type {?} */
    ConnectBase.prototype.formSubscription;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC1iYXNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS8iLCJzb3VyY2VzIjpbImNvbm5lY3QvY29ubmVjdC1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW9CLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUVuRSxPQUFPLEVBRUwsU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBQ1QsU0FBUyxHQUNWLE1BQU0sZ0JBQWdCLENBQUM7QUFNeEIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzlDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7Ozs7Ozs7OztBQU9qQyxNQUFNOzs7O0lBQ0osSUFBSSxJQUFJOztRQUNOLE1BQU0sSUFBSSxHQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUVyRSxNQUFNLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsS0FBSyxRQUFRO2dCQUNYLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QixNQUFNLENBQUMsRUFBRSxDQUFDO2lCQUNYO2dCQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixNQUFNLG1CQUFDLElBQWdCLEVBQUM7aUJBQ3pCO1lBQ0gsS0FBSyxRQUFRO2dCQUNYLE1BQU0sQ0FBQyxtQkFBQyxJQUFjLEVBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkM7O2dCQUVFLE1BQU0sSUFBSSxLQUFLLENBQ2Isb0NBQW9DLElBQUksQ0FBQyxTQUFTLENBQUMs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R0ssUUFBUTtRQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDOUI7Ozs7c0JBNUZGLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIEFic3RyYWN0Q29udHJvbCxcbiAgRm9ybUFycmF5LFxuICBGb3JtQ29udHJvbCxcbiAgRm9ybUdyb3VwLFxuICBOZ0NvbnRyb2wsXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFVuc3Vic2NyaWJlIH0gZnJvbSAncmVkdXgnO1xuXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEZvcm1TdG9yZSB9IGZyb20gJy4uL2Zvcm0tc3RvcmUnO1xuaW1wb3J0IHsgU3RhdGUgfSBmcm9tICcuLi9zdGF0ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udHJvbFBhaXIge1xuICBwYXRoOiBzdHJpbmdbXTtcbiAgY29udHJvbDogQWJzdHJhY3RDb250cm9sO1xufVxuXG5leHBvcnQgY2xhc3MgQ29ubmVjdEJhc2UgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudEluaXQge1xuICBnZXQgcGF0aCgpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgcGF0aCA9XG4gICAgICB0eXBlb2YgdGhpcy5jb25uZWN0ID09PSAnZnVuY3Rpb24nID8gdGhpcy5jb25uZWN0KCkgOiB0aGlzLmNvbm5lY3Q7XG5cbiAgICBzd2l0Y2ggKHR5cGVvZiBwYXRoKSB7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoU3RhdGUuZW1wdHkocGF0aCkpIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGF0aCkpIHtcbiAgICAgICAgICByZXR1cm4gcGF0aCBhcyBzdHJpbmdbXTtcbiAgICAgICAgfVxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgcmV0dXJuIChwYXRoIGFzIHN0cmluZykuc3BsaXQoL1xcLi9nKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIGZhbGx0aHJvdWdoIGFib3ZlIChubyBicmVhaylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBDYW5ub3QgZGV0ZXJtaW5lIHBhdGggdG8gb2JqZWN0OiAke0pTT04uc3RyaW5naWZ5KHBhdGgpfWAsXG4gICAgICAgICk7XG4gICAgfVxuICB9XG4gIEBJbnB1dCgpIGNvbm5lY3Q/OiAoKSA9PiAoc3RyaW5nIHwgbnVtYmVyKSB8IChzdHJpbmcgfCBudW1iZXIpW107XG4gIHByb3RlY3RlZCBzdG9yZT86IEZvcm1TdG9yZTtcbiAgcHJvdGVjdGVkIGZvcm06IGFueTtcbiAgcHJpdmF0ZSBzdGF0ZVN1YnNjcmlwdGlvbj86IFVuc3Vic2NyaWJlO1xuXG4gIHByaXZhdGUgZm9ybVN1YnNjcmlwdGlvbj86IFN1YnNjcmlwdGlvbjtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5mb3JtU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmZvcm1TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24oKTsgLy8gdW5zdWJzY3JpYmVcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnJlc2V0U3RhdGUoKTtcblxuICAgICAgaWYgKHRoaXMuc3RvcmUpIHtcbiAgICAgICAgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbiA9IHRoaXMuc3RvcmUuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVzZXRTdGF0ZSgpKTtcbiAgICAgIH1cblxuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuZm9ybVN1YnNjcmlwdGlvbiA9ICh0aGlzLmZvcm0udmFsdWVDaGFuZ2VzIGFzIGFueSlcbiAgICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUoMCkpXG4gICAgICAgICAgLnN1YnNjcmliZSgodmFsdWVzOiBhbnkpID0+IHRoaXMucHVibGlzaCh2YWx1ZXMpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXNjZW5kYW50cyhwYXRoOiBzdHJpbmdbXSwgZm9ybUVsZW1lbnQ6IGFueSk6IENvbnRyb2xQYWlyW10ge1xuICAgIGNvbnN0IHBhaXJzID0gbmV3IEFycmF5PENvbnRyb2xQYWlyPigpO1xuXG4gICAgaWYgKGZvcm1FbGVtZW50IGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgICBmb3JtRWxlbWVudC5jb250cm9scy5mb3JFYWNoKChjLCBpbmRleCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGQgb2YgdGhpcy5kZXNjZW5kYW50cygocGF0aCBhcyBhbnkpLmNvbmNhdChbaW5kZXhdKSwgYykpIHtcbiAgICAgICAgICBwYWlycy5wdXNoKGQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGZvcm1FbGVtZW50IGluc3RhbmNlb2YgRm9ybUdyb3VwKSB7XG4gICAgICBmb3IgKGNvbnN0IGsgb2YgT2JqZWN0LmtleXMoZm9ybUVsZW1lbnQuY29udHJvbHMpKSB7XG4gICAgICAgIHBhaXJzLnB1c2goe1xuICAgICAgICAgIHBhdGg6IHBhdGguY29uY2F0KFtrXSksXG4gICAgICAgICAgY29udHJvbDogZm9ybUVsZW1lbnQuY29udHJvbHNba10sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICBmb3JtRWxlbWVudCBpbnN0YW5jZW9mIE5nQ29udHJvbCB8fFxuICAgICAgZm9ybUVsZW1lbnQgaW5zdGFuY2VvZiBGb3JtQ29udHJvbFxuICAgICkge1xuICAgICAgcmV0dXJuIFt7IHBhdGgsIGNvbnRyb2w6IGZvcm1FbGVtZW50IGFzIGFueSB9XTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVW5rbm93biB0eXBlIG9mIGZvcm0gZWxlbWVudDogJHtmb3JtRWxlbWVudC5jb25zdHJ1Y3Rvci5uYW1lfWAsXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBwYWlycy5maWx0ZXIocCA9PiB7XG4gICAgICBjb25zdCBwYXJlbnQgPSAocC5jb250cm9sIGFzIGFueSkuX3BhcmVudDtcbiAgICAgIHJldHVybiBwYXJlbnQgPT09IHRoaXMuZm9ybS5jb250cm9sIHx8IHBhcmVudCA9PT0gdGhpcy5mb3JtO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFN0YXRlKCkge1xuICAgIGNvbnN0IGZvcm1FbGVtZW50ID1cbiAgICAgIHRoaXMuZm9ybS5jb250cm9sID09PSB1bmRlZmluZWQgPyB0aGlzLmZvcm0gOiB0aGlzLmZvcm0uY29udHJvbDtcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5kZXNjZW5kYW50cyhbXSwgZm9ybUVsZW1lbnQpO1xuXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjID0+IHtcbiAgICAgIGNvbnN0IHsgcGF0aCwgY29udHJvbCB9ID0gYztcblxuICAgICAgY29uc3QgdmFsdWUgPSBTdGF0ZS5nZXQodGhpcy5nZXRTdGF0ZSgpLCB0aGlzLnBhdGguY29uY2F0KHBhdGgpKTtcblxuICAgICAgaWYgKGNvbnRyb2wudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgIGNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwdWJsaXNoKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5zdG9yZSkge1xuICAgICAgdGhpcy5zdG9yZS52YWx1ZUNoYW5nZWQodGhpcy5wYXRoLCB0aGlzLmZvcm0sIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFN0YXRlKCkge1xuICAgIGlmICh0aGlzLnN0b3JlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgIH1cbiAgfVxufVxuIl19