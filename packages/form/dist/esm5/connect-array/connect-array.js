/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, forwardRef, Host, Inject, Input, Optional, Self, SkipSelf, TemplateRef, ViewContainerRef, } from '@angular/core';
import { ControlContainer, FormArray, FormControl, FormGroup, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModelGroup, Validators, } from '@angular/forms';
import { ConnectBase } from '../connect';
import { FormStore } from '../form-store';
import { controlPath } from '../shims';
import { State } from '../state';
import { ConnectArrayTemplate } from './connect-array-template';
var ConnectArrayDirective = /** @class */ (function (_super) {
    tslib_1.__extends(ConnectArrayDirective, _super);
    function ConnectArrayDirective(parent, rawValidators, rawAsyncValidators, connection, templateRef, viewContainerRef, store) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.rawValidators = rawValidators;
        _this.rawAsyncValidators = rawAsyncValidators;
        _this.connection = connection;
        _this.templateRef = templateRef;
        _this.viewContainerRef = viewContainerRef;
        _this.store = store;
        _this.array = new FormArray([]);
        _this.stateSubscription = _this.store.subscribe(function (state) {
            return _this.resetState(state);
        });
        _this.registerInternals(_this.array);
        return _this;
    }
    Object.defineProperty(ConnectArrayDirective.prototype, "connectArrayOf", {
        set: /**
         * @param {?} collection
         * @return {?}
         */
        function (collection) {
            this.key = collection;
            this.resetState(this.store.getState());
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ConnectArrayDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.formDirective.addControl(/** @type {?} */ (this));
    };
    Object.defineProperty(ConnectArrayDirective.prototype, "name", {
        get: /**
         * @return {?}
         */
        function () {
            return this.key || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectArrayDirective.prototype, "control", {
        get: /**
         * @return {?}
         */
        function () {
            return this.array;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectArrayDirective.prototype, "formDirective", {
        get: /**
         * @return {?}
         */
        function () {
            return /** @type {?} */ (this.parent.formDirective);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectArrayDirective.prototype, "path", {
        get: /**
         * @return {?}
         */
        function () {
            return this.key ? controlPath(this.key, this.parent) : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectArrayDirective.prototype, "validator", {
        get: /**
         * @return {?}
         */
        function () {
            return Validators.compose(this.rawValidators);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectArrayDirective.prototype, "asyncValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return Validators.composeAsync(this.rawAsyncValidators);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ConnectArrayDirective.prototype.updateValueAndValidity = /**
     * @return {?}
     */
    function () {
        // stub?
    };
    /**
     * @return {?}
     */
    ConnectArrayDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.viewContainerRef.clear();
        if (this.key) {
            this.formDirective.form.removeControl(this.key);
        }
        this.stateSubscription();
    };
    /**
     * @param {?} state
     * @return {?}
     */
    ConnectArrayDirective.prototype.resetState = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        if (this.key == null || this.key.length === 0) {
            return; // no state to retreive if no key is set
        }
        /** @type {?} */
        var iterable = State.get(state, this.connection.path.concat(this.path));
        /** @type {?} */
        var index = 0;
        try {
            for (var iterable_1 = tslib_1.__values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                /** @type {?} */
                var viewRef = this.viewContainerRef.length > index
                    ? (/** @type {?} */ (this.viewContainerRef.get(index)))
                    : null;
                if (viewRef == null) {
                    /** @type {?} */
                    var embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.templateRef, new ConnectArrayTemplate(index, index, value), index);
                    this.patchDescendantControls(embeddedViewRef);
                    this.array.insert(index, this.transform(this.array, embeddedViewRef.context.item));
                }
                else {
                    Object.assign(viewRef.context, new ConnectArrayTemplate(index, index, value));
                }
                ++index;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        while (this.viewContainerRef.length > index) {
            this.viewContainerRef.remove(this.viewContainerRef.length - 1);
        }
        var e_1, _a;
    };
    /**
     * @param {?} array
     * @return {?}
     */
    ConnectArrayDirective.prototype.registerInternals = /**
     * @param {?} array
     * @return {?}
     */
    function (array) {
        array.registerControl = function () { return undefined; };
        array.registerOnChange = function () { return undefined; };
        Object.defineProperties(this, {
            _rawValidators: {
                value: this.rawValidators || [],
            },
            _rawAsyncValidators: {
                value: this.rawAsyncValidators || [],
            },
        });
    };
    /**
     * @param {?} viewRef
     * @return {?}
     */
    ConnectArrayDirective.prototype.patchDescendantControls = /**
     * @param {?} viewRef
     * @return {?}
     */
    function (viewRef) {
        var _this = this;
        /** @type {?} */
        var groups = Object.keys(viewRef._view)
            .map(function (k) { return viewRef._view[k]; })
            .filter(function (c) { return c instanceof NgModelGroup; });
        groups.forEach(function (c) {
            Object.defineProperties(c, {
                _parent: {
                    value: _this,
                },
                _checkParentType: {
                    value: function () { return undefined; },
                },
            });
        });
    };
    /**
     * @param {?} parent
     * @param {?} reference
     * @return {?}
     */
    ConnectArrayDirective.prototype.transform = /**
     * @param {?} parent
     * @param {?} reference
     * @return {?}
     */
    function (parent, reference) {
        var _this = this;
        /** @type {?} */
        var emptyControl = function () {
            /** @type {?} */
            var control = new FormControl(null);
            control.setParent(parent);
            return control;
        };
        if (reference == null) {
            return emptyControl();
        }
        if (typeof reference.toJS === 'function') {
            reference = reference.toJS();
        }
        switch (typeof reference) {
            case 'string':
            case 'number':
            case 'boolean':
                return emptyControl();
        }
        /** @type {?} */
        var iterate = function (iterable) {
            /** @type {?} */
            var array = new FormArray([]);
            _this.registerInternals(array);
            for (var i = array.length; i > 0; i--) {
                array.removeAt(i);
            }
            try {
                for (var iterable_2 = tslib_1.__values(iterable), iterable_2_1 = iterable_2.next(); !iterable_2_1.done; iterable_2_1 = iterable_2.next()) {
                    var value = iterable_2_1.value;
                    /** @type {?} */
                    var transformed = _this.transform(array, value);
                    if (transformed) {
                        array.push(transformed);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (iterable_2_1 && !iterable_2_1.done && (_a = iterable_2.return)) _a.call(iterable_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return array;
            var e_2, _a;
        };
        /** @type {?} */
        var associate = function (value) {
            /** @type {?} */
            var group = new FormGroup({});
            group.setParent(parent);
            try {
                for (var _a = tslib_1.__values(Object.keys(value)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var key = _b.value;
                    /** @type {?} */
                    var transformed = _this.transform(group, value[key]);
                    if (transformed) {
                        group.addControl(key, transformed);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return group;
            var e_3, _c;
        };
        if (Array.isArray(reference)) {
            return iterate(/** @type {?} */ (reference));
        }
        else if (reference instanceof Set) {
            return iterate(/** @type {?} */ (reference));
        }
        else if (reference instanceof Map) {
            return associate(/** @type {?} */ (reference));
        }
        else if (reference instanceof Object) {
            return associate(reference);
        }
        else {
            throw new Error("Cannot convert object of type " + typeof reference + " / " + reference.toString() + " to form element");
        }
    };
    ConnectArrayDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[connectArray]',
                    providers: [
                        {
                            provide: ControlContainer,
                            useExisting: forwardRef(function () { return ConnectArrayDirective; }),
                        },
                    ],
                },] },
    ];
    /** @nocollapse */
    ConnectArrayDirective.ctorParameters = function () { return [
        { type: ControlContainer, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf }] },
        { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] }] },
        { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_ASYNC_VALIDATORS,] }] },
        { type: ConnectBase },
        { type: TemplateRef },
        { type: ViewContainerRef },
        { type: FormStore }
    ]; };
    ConnectArrayDirective.propDecorators = {
        connectArrayOf: [{ type: Input }]
    };
    return ConnectArrayDirective;
}(ControlContainer));
export { ConnectArrayDirective };
if (false) {
    /** @type {?} */
    ConnectArrayDirective.prototype.stateSubscription;
    /** @type {?} */
    ConnectArrayDirective.prototype.array;
    /** @type {?} */
    ConnectArrayDirective.prototype.key;
    /** @type {?} */
    ConnectArrayDirective.prototype.parent;
    /** @type {?} */
    ConnectArrayDirective.prototype.rawValidators;
    /** @type {?} */
    ConnectArrayDirective.prototype.rawAsyncValidators;
    /** @type {?} */
    ConnectArrayDirective.prototype.connection;
    /** @type {?} */
    ConnectArrayDirective.prototype.templateRef;
    /** @type {?} */
    ConnectArrayDirective.prototype.viewContainerRef;
    /** @type {?} */
    ConnectArrayDirective.prototype.store;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC1hcnJheS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vIiwic291cmNlcyI6WyJjb25uZWN0LWFycmF5L2Nvbm5lY3QtYXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFVBQVUsRUFDVixJQUFJLEVBQ0osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsSUFBSSxFQUNKLFFBQVEsRUFDUixXQUFXLEVBQ1gsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHTCxnQkFBZ0IsRUFDaEIsU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBRVQsbUJBQW1CLEVBQ25CLGFBQWEsRUFDYixZQUFZLEVBRVosVUFBVSxHQUNYLE1BQU0sZ0JBQWdCLENBQUM7QUFHeEIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDdkMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNqQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7SUFXckIsaURBQWdCO0lBUXpELCtCQUlVLE1BQXdCLEVBSXhCLGFBQW9CLEVBSXBCLGtCQUF5QixFQUN6QixZQUNBLGFBQ0Esa0JBQ0E7UUFoQlYsWUFrQkUsaUJBQU8sU0FPUjtRQXJCUyxZQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUl4QixtQkFBYSxHQUFiLGFBQWEsQ0FBTztRQUlwQix3QkFBa0IsR0FBbEIsa0JBQWtCLENBQU87UUFDekIsZ0JBQVUsR0FBVixVQUFVO1FBQ1YsaUJBQVcsR0FBWCxXQUFXO1FBQ1gsc0JBQWdCLEdBQWhCLGdCQUFnQjtRQUNoQixXQUFLLEdBQUwsS0FBSztzQkFwQkMsSUFB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RixDQUFDO1NBQ0g7OztnQkFqUEosU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsZ0JBQWdCOzRCQUN6QixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxxQkFBcUIsRUFBckIsQ0FBcUIsQ0FBQzt5QkFDckQ7cUJBQ0Y7aUJBQ0Y7Ozs7Z0JBM0JDLGdCQUFnQix1QkFxQ2IsUUFBUSxZQUNSLElBQUksWUFDSixRQUFROzRDQUVSLFFBQVEsWUFDUixJQUFJLFlBQ0osTUFBTSxTQUFDLGFBQWE7NENBRXBCLFFBQVEsWUFDUixJQUFJLFlBQ0osTUFBTSxTQUFDLG1CQUFtQjtnQkFsQ3RCLFdBQVc7Z0JBbkJsQixXQUFXO2dCQUNYLGdCQUFnQjtnQkFtQlQsU0FBUzs7O2lDQWlEZixLQUFLOztnQ0FqRlI7RUE4QzJDLGdCQUFnQjtTQUE5QyxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdCxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBTZWxmLFxuICBTa2lwU2VsZixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWJzdHJhY3RDb250cm9sLFxuICBBc3luY1ZhbGlkYXRvckZuLFxuICBDb250cm9sQ29udGFpbmVyLFxuICBGb3JtQXJyYXksXG4gIEZvcm1Db250cm9sLFxuICBGb3JtR3JvdXAsXG4gIEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgTkdfQVNZTkNfVkFMSURBVE9SUyxcbiAgTkdfVkFMSURBVE9SUyxcbiAgTmdNb2RlbEdyb3VwLFxuICBWYWxpZGF0b3JGbixcbiAgVmFsaWRhdG9ycyxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVW5zdWJzY3JpYmUgfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7IENvbm5lY3RCYXNlIH0gZnJvbSAnLi4vY29ubmVjdCc7XG5pbXBvcnQgeyBGb3JtU3RvcmUgfSBmcm9tICcuLi9mb3JtLXN0b3JlJztcbmltcG9ydCB7IGNvbnRyb2xQYXRoIH0gZnJvbSAnLi4vc2hpbXMnO1xuaW1wb3J0IHsgU3RhdGUgfSBmcm9tICcuLi9zdGF0ZSc7XG5pbXBvcnQgeyBDb25uZWN0QXJyYXlUZW1wbGF0ZSB9IGZyb20gJy4vY29ubmVjdC1hcnJheS10ZW1wbGF0ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjb25uZWN0QXJyYXldJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQ29udHJvbENvbnRhaW5lcixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENvbm5lY3RBcnJheURpcmVjdGl2ZSksXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29ubmVjdEFycmF5RGlyZWN0aXZlIGV4dGVuZHMgQ29udHJvbENvbnRhaW5lclxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdGF0ZVN1YnNjcmlwdGlvbjogVW5zdWJzY3JpYmU7XG5cbiAgcHJpdmF0ZSBhcnJheSA9IG5ldyBGb3JtQXJyYXkoW10pO1xuXG4gIHByaXZhdGUga2V5Pzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEhvc3QoKVxuICAgIEBTa2lwU2VsZigpXG4gICAgcHJpdmF0ZSBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIsXG4gICAgQE9wdGlvbmFsKClcbiAgICBAU2VsZigpXG4gICAgQEluamVjdChOR19WQUxJREFUT1JTKVxuICAgIHByaXZhdGUgcmF3VmFsaWRhdG9yczogYW55W10sXG4gICAgQE9wdGlvbmFsKClcbiAgICBAU2VsZigpXG4gICAgQEluamVjdChOR19BU1lOQ19WQUxJREFUT1JTKVxuICAgIHByaXZhdGUgcmF3QXN5bmNWYWxpZGF0b3JzOiBhbnlbXSxcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3RCYXNlLFxuICAgIHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgc3RvcmU6IEZvcm1TdG9yZSxcbiAgKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24gPSB0aGlzLnN0b3JlLnN1YnNjcmliZShzdGF0ZSA9PlxuICAgICAgdGhpcy5yZXNldFN0YXRlKHN0YXRlKSxcbiAgICApO1xuXG4gICAgdGhpcy5yZWdpc3RlckludGVybmFscyh0aGlzLmFycmF5KTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBjb25uZWN0QXJyYXlPZihjb2xsZWN0aW9uOiBhbnkpIHtcbiAgICB0aGlzLmtleSA9IGNvbGxlY3Rpb247XG5cbiAgICB0aGlzLnJlc2V0U3RhdGUodGhpcy5zdG9yZS5nZXRTdGF0ZSgpKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9ybURpcmVjdGl2ZS5hZGRDb250cm9sKHRoaXMgYXMgYW55KTtcbiAgfVxuXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMua2V5IHx8ICcnO1xuICB9XG5cbiAgZ2V0IGNvbnRyb2woKTogRm9ybUFycmF5IHtcbiAgICByZXR1cm4gdGhpcy5hcnJheTtcbiAgfVxuXG4gIGdldCBmb3JtRGlyZWN0aXZlKCk6IEZvcm1Hcm91cERpcmVjdGl2ZSB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50LmZvcm1EaXJlY3RpdmUgYXMgRm9ybUdyb3VwRGlyZWN0aXZlO1xuICB9XG5cbiAgZ2V0IHBhdGgoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmtleSA/IGNvbnRyb2xQYXRoKHRoaXMua2V5LCB0aGlzLnBhcmVudCkgOiBbXTtcbiAgfVxuXG4gIGdldCB2YWxpZGF0b3IoKTogVmFsaWRhdG9yRm4gfCBudWxsIHtcbiAgICByZXR1cm4gVmFsaWRhdG9ycy5jb21wb3NlKHRoaXMucmF3VmFsaWRhdG9ycyk7XG4gIH1cblxuICBnZXQgYXN5bmNWYWxpZGF0b3IoKTogQXN5bmNWYWxpZGF0b3JGbiB8IG51bGwge1xuICAgIHJldHVybiBWYWxpZGF0b3JzLmNvbXBvc2VBc3luYyh0aGlzLnJhd0FzeW5jVmFsaWRhdG9ycyk7XG4gIH1cblxuICB1cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCkge1xuICAgIC8vIHN0dWI/XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblxuICAgIGlmICh0aGlzLmtleSkge1xuICAgICAgdGhpcy5mb3JtRGlyZWN0aXZlLmZvcm0ucmVtb3ZlQ29udHJvbCh0aGlzLmtleSk7XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFN0YXRlKHN0YXRlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5rZXkgPT0gbnVsbCB8fCB0aGlzLmtleS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjsgLy8gbm8gc3RhdGUgdG8gcmV0cmVpdmUgaWYgbm8ga2V5IGlzIHNldFxuICAgIH1cblxuICAgIGNvbnN0IGl0ZXJhYmxlID0gU3RhdGUuZ2V0KHN0YXRlLCB0aGlzLmNvbm5lY3Rpb24ucGF0aC5jb25jYXQodGhpcy5wYXRoKSk7XG5cbiAgICBsZXQgaW5kZXggPSAwO1xuXG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBpdGVyYWJsZSkge1xuICAgICAgY29uc3Qgdmlld1JlZiA9XG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5sZW5ndGggPiBpbmRleFxuICAgICAgICAgID8gKHRoaXMudmlld0NvbnRhaW5lclJlZi5nZXQoaW5kZXgpIGFzIEVtYmVkZGVkVmlld1JlZjxcbiAgICAgICAgICAgICAgQ29ubmVjdEFycmF5VGVtcGxhdGVcbiAgICAgICAgICAgID4pXG4gICAgICAgICAgOiBudWxsO1xuXG4gICAgICBpZiAodmlld1JlZiA9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGVtYmVkZGVkVmlld1JlZiA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXc8XG4gICAgICAgICAgQ29ubmVjdEFycmF5VGVtcGxhdGVcbiAgICAgICAgPihcbiAgICAgICAgICB0aGlzLnRlbXBsYXRlUmVmLFxuICAgICAgICAgIG5ldyBDb25uZWN0QXJyYXlUZW1wbGF0ZShpbmRleCwgaW5kZXgsIHZhbHVlKSxcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnBhdGNoRGVzY2VuZGFudENvbnRyb2xzKGVtYmVkZGVkVmlld1JlZik7XG5cbiAgICAgICAgdGhpcy5hcnJheS5pbnNlcnQoXG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgdGhpcy50cmFuc2Zvcm0odGhpcy5hcnJheSwgZW1iZWRkZWRWaWV3UmVmLmNvbnRleHQuaXRlbSksXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIHZpZXdSZWYuY29udGV4dCxcbiAgICAgICAgICBuZXcgQ29ubmVjdEFycmF5VGVtcGxhdGUoaW5kZXgsIGluZGV4LCB2YWx1ZSksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgICsraW5kZXg7XG4gICAgfVxuXG4gICAgd2hpbGUgKHRoaXMudmlld0NvbnRhaW5lclJlZi5sZW5ndGggPiBpbmRleCkge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLnJlbW92ZSh0aGlzLnZpZXdDb250YWluZXJSZWYubGVuZ3RoIC0gMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3RlckludGVybmFscyhhcnJheTogYW55KSB7XG4gICAgYXJyYXkucmVnaXN0ZXJDb250cm9sID0gKCkgPT4gdW5kZWZpbmVkO1xuICAgIGFycmF5LnJlZ2lzdGVyT25DaGFuZ2UgPSAoKSA9PiB1bmRlZmluZWQ7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICBfcmF3VmFsaWRhdG9yczoge1xuICAgICAgICB2YWx1ZTogdGhpcy5yYXdWYWxpZGF0b3JzIHx8IFtdLFxuICAgICAgfSxcbiAgICAgIF9yYXdBc3luY1ZhbGlkYXRvcnM6IHtcbiAgICAgICAgdmFsdWU6IHRoaXMucmF3QXN5bmNWYWxpZGF0b3JzIHx8IFtdLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcGF0Y2hEZXNjZW5kYW50Q29udHJvbHModmlld1JlZjogYW55KSB7XG4gICAgY29uc3QgZ3JvdXBzID0gT2JqZWN0LmtleXModmlld1JlZi5fdmlldylcbiAgICAgIC5tYXAoayA9PiB2aWV3UmVmLl92aWV3W2tdKVxuICAgICAgLmZpbHRlcihjID0+IGMgaW5zdGFuY2VvZiBOZ01vZGVsR3JvdXApO1xuXG4gICAgZ3JvdXBzLmZvckVhY2goYyA9PiB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjLCB7XG4gICAgICAgIF9wYXJlbnQ6IHtcbiAgICAgICAgICB2YWx1ZTogdGhpcyxcbiAgICAgICAgfSxcbiAgICAgICAgX2NoZWNrUGFyZW50VHlwZToge1xuICAgICAgICAgIHZhbHVlOiAoKSA9PiB1bmRlZmluZWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNmb3JtKFxuICAgIHBhcmVudDogRm9ybUdyb3VwIHwgRm9ybUFycmF5LFxuICAgIHJlZmVyZW5jZTogYW55LFxuICApOiBBYnN0cmFjdENvbnRyb2wge1xuICAgIGNvbnN0IGVtcHR5Q29udHJvbCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wobnVsbCk7XG4gICAgICBjb250cm9sLnNldFBhcmVudChwYXJlbnQpO1xuICAgICAgcmV0dXJuIGNvbnRyb2w7XG4gICAgfTtcblxuICAgIGlmIChyZWZlcmVuY2UgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGVtcHR5Q29udHJvbCgpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVmZXJlbmNlLnRvSlMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlZmVyZW5jZSA9IHJlZmVyZW5jZS50b0pTKCk7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0eXBlb2YgcmVmZXJlbmNlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gZW1wdHlDb250cm9sKCk7XG4gICAgfVxuXG4gICAgY29uc3QgaXRlcmF0ZSA9IChpdGVyYWJsZTogYW55KTogRm9ybUFycmF5ID0+IHtcbiAgICAgIGNvbnN0IGFycmF5ID0gbmV3IEZvcm1BcnJheShbXSk7XG5cbiAgICAgIHRoaXMucmVnaXN0ZXJJbnRlcm5hbHMoYXJyYXkpO1xuXG4gICAgICBmb3IgKGxldCBpID0gYXJyYXkubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIGFycmF5LnJlbW92ZUF0KGkpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIGl0ZXJhYmxlKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkID0gdGhpcy50cmFuc2Zvcm0oYXJyYXksIHZhbHVlKTtcbiAgICAgICAgaWYgKHRyYW5zZm9ybWVkKSB7XG4gICAgICAgICAgYXJyYXkucHVzaCh0cmFuc2Zvcm1lZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH07XG5cbiAgICBjb25zdCBhc3NvY2lhdGUgPSAodmFsdWU6IGFueSk6IEZvcm1Hcm91cCA9PiB7XG4gICAgICBjb25zdCBncm91cCA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgICAgZ3JvdXAuc2V0UGFyZW50KHBhcmVudCk7XG5cbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHZhbHVlKSkge1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZCA9IHRoaXMudHJhbnNmb3JtKGdyb3VwLCB2YWx1ZVtrZXldKTtcbiAgICAgICAgaWYgKHRyYW5zZm9ybWVkKSB7XG4gICAgICAgICAgZ3JvdXAuYWRkQ29udHJvbChrZXksIHRyYW5zZm9ybWVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ3JvdXA7XG4gICAgfTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHJlZmVyZW5jZSkpIHtcbiAgICAgIHJldHVybiBpdGVyYXRlKHJlZmVyZW5jZSBhcyBhbnlbXSk7XG4gICAgfSBlbHNlIGlmIChyZWZlcmVuY2UgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgIHJldHVybiBpdGVyYXRlKHJlZmVyZW5jZSBhcyBTZXQ8YW55Pik7XG4gICAgfSBlbHNlIGlmIChyZWZlcmVuY2UgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgIHJldHVybiBhc3NvY2lhdGUocmVmZXJlbmNlIGFzIE1hcDxzdHJpbmcsIGFueT4pO1xuICAgIH0gZWxzZSBpZiAocmVmZXJlbmNlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICByZXR1cm4gYXNzb2NpYXRlKHJlZmVyZW5jZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYENhbm5vdCBjb252ZXJ0IG9iamVjdCBvZiB0eXBlICR7dHlwZW9mIHJlZmVyZW5jZX0gLyAke3JlZmVyZW5jZS50b1N0cmluZygpfSB0byBmb3JtIGVsZW1lbnRgLFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==