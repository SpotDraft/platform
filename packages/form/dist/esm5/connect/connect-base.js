/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var ConnectBase = /** @class */ (function () {
    function ConnectBase() {
    }
    Object.defineProperty(ConnectBase.prototype, "path", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var path = typeof this.connect === 'function' ? this.connect() : this.connect;
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
                    throw new Error("Cannot determine path to object: " + JSON.stringify(path));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ConnectBase.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.formSubscription) {
            this.formSubscription.unsubscribe();
        }
        if (typeof this.stateSubscription === 'function') {
            this.stateSubscription(); // unsubscribe
        }
    };
    /**
     * @return {?}
     */
    ConnectBase.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Promise.resolve().then(function () {
            _this.resetState();
            if (_this.store) {
                _this.stateSubscription = _this.store.subscribe(function () { return _this.resetState(); });
            }
            Promise.resolve().then(function () {
                _this.formSubscription = (/** @type {?} */ (_this.form.valueChanges))
                    .pipe(debounceTime(0))
                    .subscribe(function (values) { return _this.publish(values); });
            });
        });
    };
    /**
     * @param {?} path
     * @param {?} formElement
     * @return {?}
     */
    ConnectBase.prototype.descendants = /**
     * @param {?} path
     * @param {?} formElement
     * @return {?}
     */
    function (path, formElement) {
        var _this = this;
        /** @type {?} */
        var pairs = new Array();
        if (formElement instanceof FormArray) {
            formElement.controls.forEach(function (c, index) {
                try {
                    for (var _a = tslib_1.__values(_this.descendants((/** @type {?} */ (path)).concat([index]), c)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var d = _b.value;
                        pairs.push(d);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                var e_1, _c;
            });
        }
        else if (formElement instanceof FormGroup) {
            try {
                for (var _a = tslib_1.__values(Object.keys(formElement.controls)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var k = _b.value;
                    pairs.push({
                        path: path.concat([k]),
                        control: formElement.controls[k],
                    });
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else if (formElement instanceof NgControl ||
            formElement instanceof FormControl) {
            return [{ path: path, control: /** @type {?} */ (formElement) }];
        }
        else {
            throw new Error("Unknown type of form element: " + formElement.constructor.name);
        }
        return pairs.filter(function (p) {
            /** @type {?} */
            var parent = (/** @type {?} */ (p.control))._parent;
            return parent === _this.form.control || parent === _this.form;
        });
        var e_2, _c;
    };
    /**
     * @return {?}
     */
    ConnectBase.prototype.resetState = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var formElement = this.form.control === undefined ? this.form : this.form.control;
        /** @type {?} */
        var children = this.descendants([], formElement);
        children.forEach(function (c) {
            var path = c.path, control = c.control;
            /** @type {?} */
            var value = State.get(_this.getState(), _this.path.concat(path));
            if (control.value !== value) {
                control.setValue(value);
            }
        });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ConnectBase.prototype.publish = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.store) {
            this.store.valueChanged(this.path, this.form, value);
        }
    };
    /**
     * @return {?}
     */
    ConnectBase.prototype.getState = /**
     * @return {?}
     */
    function () {
        if (this.store) {
            return this.store.getState();
        }
    };
    ConnectBase.propDecorators = {
        connect: [{ type: Input }]
    };
    return ConnectBase;
}());
export { ConnectBase };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC1iYXNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvZm9ybS8iLCJzb3VyY2VzIjpbImNvbm5lY3QvY29ubmVjdC1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFvQixLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFbkUsT0FBTyxFQUVMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsR0FDVixNQUFNLGdCQUFnQixDQUFDO0FBTXhCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc5QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFDOzs7Ozs7Ozs7Ozs7SUFRL0Isc0JBQUksNkJBQUk7Ozs7UUFBUjs7WUFDRSxJQUFNLElBQUksR0FDUixPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFFckUsTUFBTSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixLQUFLLFFBQVE7b0JBQ1gsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLE1BQU0sQ0FBQyxFQUFFLENBQUM7cUJBQ1g7b0JBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hCLE1BQU0sbUJBQUMsSUFBZ0IsRUFBQztxQkFDekI7Z0JBQ0gsS0FBSyxRQUFRO29CQUNYLE1BQU0sQ0FBQyxtQkFBQyxJQUFjLEVBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZDOztvQkFFRSxNQUFNLElBQUksS0FBSyxDQUNiLHNDQUFvQyxJQUFJLENBQUMsU0FBUyxD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QyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN0RDs7Ozs7SUFHSyw4QkFBUTs7OztRQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDOUI7OzswQkE1RkYsS0FBSzs7c0JBOUNSOztTQXdCYSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBBYnN0cmFjdENvbnRyb2wsXG4gIEZvcm1BcnJheSxcbiAgRm9ybUNvbnRyb2wsXG4gIEZvcm1Hcm91cCxcbiAgTmdDb250cm9sLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBVbnN1YnNjcmliZSB9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBGb3JtU3RvcmUgfSBmcm9tICcuLi9mb3JtLXN0b3JlJztcbmltcG9ydCB7IFN0YXRlIH0gZnJvbSAnLi4vc3RhdGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbnRyb2xQYWlyIHtcbiAgcGF0aDogc3RyaW5nW107XG4gIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcbn1cblxuZXhwb3J0IGNsYXNzIENvbm5lY3RCYXNlIGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0IHtcbiAgZ2V0IHBhdGgoKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHBhdGggPVxuICAgICAgdHlwZW9mIHRoaXMuY29ubmVjdCA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuY29ubmVjdCgpIDogdGhpcy5jb25uZWN0O1xuXG4gICAgc3dpdGNoICh0eXBlb2YgcGF0aCkge1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKFN0YXRlLmVtcHR5KHBhdGgpKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhdGgpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhdGggYXMgc3RyaW5nW107XG4gICAgICAgIH1cbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHJldHVybiAocGF0aCBhcyBzdHJpbmcpLnNwbGl0KC9cXC4vZyk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBmYWxsdGhyb3VnaCBhYm92ZSAobm8gYnJlYWspXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgQ2Fubm90IGRldGVybWluZSBwYXRoIHRvIG9iamVjdDogJHtKU09OLnN0cmluZ2lmeShwYXRoKX1gLFxuICAgICAgICApO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKSBjb25uZWN0PzogKCkgPT4gKHN0cmluZyB8IG51bWJlcikgfCAoc3RyaW5nIHwgbnVtYmVyKVtdO1xuICBwcm90ZWN0ZWQgc3RvcmU/OiBGb3JtU3RvcmU7XG4gIHByb3RlY3RlZCBmb3JtOiBhbnk7XG4gIHByaXZhdGUgc3RhdGVTdWJzY3JpcHRpb24/OiBVbnN1YnNjcmliZTtcblxuICBwcml2YXRlIGZvcm1TdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb247XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuZm9ybVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5mb3JtU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnN0YXRlU3Vic2NyaXB0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLnN0YXRlU3Vic2NyaXB0aW9uKCk7IC8vIHVuc3Vic2NyaWJlXG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5yZXNldFN0YXRlKCk7XG5cbiAgICAgIGlmICh0aGlzLnN0b3JlKSB7XG4gICAgICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24gPSB0aGlzLnN0b3JlLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlc2V0U3RhdGUoKSk7XG4gICAgICB9XG5cbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmZvcm1TdWJzY3JpcHRpb24gPSAodGhpcy5mb3JtLnZhbHVlQ2hhbmdlcyBhcyBhbnkpXG4gICAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDApKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHZhbHVlczogYW55KSA9PiB0aGlzLnB1Ymxpc2godmFsdWVzKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzY2VuZGFudHMocGF0aDogc3RyaW5nW10sIGZvcm1FbGVtZW50OiBhbnkpOiBDb250cm9sUGFpcltdIHtcbiAgICBjb25zdCBwYWlycyA9IG5ldyBBcnJheTxDb250cm9sUGFpcj4oKTtcblxuICAgIGlmIChmb3JtRWxlbWVudCBpbnN0YW5jZW9mIEZvcm1BcnJheSkge1xuICAgICAgZm9ybUVsZW1lbnQuY29udHJvbHMuZm9yRWFjaCgoYywgaW5kZXgpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBkIG9mIHRoaXMuZGVzY2VuZGFudHMoKHBhdGggYXMgYW55KS5jb25jYXQoW2luZGV4XSksIGMpKSB7XG4gICAgICAgICAgcGFpcnMucHVzaChkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChmb3JtRWxlbWVudCBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xuICAgICAgZm9yIChjb25zdCBrIG9mIE9iamVjdC5rZXlzKGZvcm1FbGVtZW50LmNvbnRyb2xzKSkge1xuICAgICAgICBwYWlycy5wdXNoKHtcbiAgICAgICAgICBwYXRoOiBwYXRoLmNvbmNhdChba10pLFxuICAgICAgICAgIGNvbnRyb2w6IGZvcm1FbGVtZW50LmNvbnRyb2xzW2tdLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgZm9ybUVsZW1lbnQgaW5zdGFuY2VvZiBOZ0NvbnRyb2wgfHxcbiAgICAgIGZvcm1FbGVtZW50IGluc3RhbmNlb2YgRm9ybUNvbnRyb2xcbiAgICApIHtcbiAgICAgIHJldHVybiBbeyBwYXRoLCBjb250cm9sOiBmb3JtRWxlbWVudCBhcyBhbnkgfV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFVua25vd24gdHlwZSBvZiBmb3JtIGVsZW1lbnQ6ICR7Zm9ybUVsZW1lbnQuY29uc3RydWN0b3IubmFtZX1gLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFpcnMuZmlsdGVyKHAgPT4ge1xuICAgICAgY29uc3QgcGFyZW50ID0gKHAuY29udHJvbCBhcyBhbnkpLl9wYXJlbnQ7XG4gICAgICByZXR1cm4gcGFyZW50ID09PSB0aGlzLmZvcm0uY29udHJvbCB8fCBwYXJlbnQgPT09IHRoaXMuZm9ybTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRTdGF0ZSgpIHtcbiAgICBjb25zdCBmb3JtRWxlbWVudCA9XG4gICAgICB0aGlzLmZvcm0uY29udHJvbCA9PT0gdW5kZWZpbmVkID8gdGhpcy5mb3JtIDogdGhpcy5mb3JtLmNvbnRyb2w7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuZGVzY2VuZGFudHMoW10sIGZvcm1FbGVtZW50KTtcblxuICAgIGNoaWxkcmVuLmZvckVhY2goYyA9PiB7XG4gICAgICBjb25zdCB7IHBhdGgsIGNvbnRyb2wgfSA9IGM7XG5cbiAgICAgIGNvbnN0IHZhbHVlID0gU3RhdGUuZ2V0KHRoaXMuZ2V0U3RhdGUoKSwgdGhpcy5wYXRoLmNvbmNhdChwYXRoKSk7XG5cbiAgICAgIGlmIChjb250cm9sLnZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICBjb250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcHVibGlzaCh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuc3RvcmUpIHtcbiAgICAgIHRoaXMuc3RvcmUudmFsdWVDaGFuZ2VkKHRoaXMucGF0aCwgdGhpcy5mb3JtLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRTdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5zdG9yZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==