/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, forwardRef, Host, Inject, Input, Optional, Self, SkipSelf, TemplateRef, ViewContainerRef, } from '@angular/core';
import { ControlContainer, FormArray, FormControl, FormGroup, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModelGroup, Validators, } from '@angular/forms';
import { ConnectBase } from '../connect';
import { FormStore } from '../form-store';
import { controlPath } from '../shims';
import { State } from '../state';
import { ConnectArrayTemplate } from './connect-array-template';
export class ConnectArrayDirective extends ControlContainer {
    /**
     * @param {?} parent
     * @param {?} rawValidators
     * @param {?} rawAsyncValidators
     * @param {?} connection
     * @param {?} templateRef
     * @param {?} viewContainerRef
     * @param {?} store
     */
    constructor(parent, rawValidators, rawAsyncValidators, connection, templateRef, viewContainerRef, store) {
        super();
        this.parent = parent;
        this.rawValidators = rawValidators;
        this.rawAsyncValidators = rawAsyncValidators;
        this.connection = connection;
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.store = store;
        this.array = new FormArray([]);
        this.stateSubscription = this.store.subscribe(state => this.resetState(state));
        this.registerInternals(this.array);
    }
    /**
     * @param {?} collection
     * @return {?}
     */
    set connectArrayOf(collection) {
        this.key = collection;
        this.resetState(this.store.getState());
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.formDirective.addControl(/** @type {?} */ (this));
    }
    /**
     * @return {?}
     */
    get name() {
        return this.key || '';
    }
    /**
     * @return {?}
     */
    get control() {
        return this.array;
    }
    /**
     * @return {?}
     */
    get formDirective() {
        return /** @type {?} */ (this.parent.formDirective);
    }
    /**
     * @return {?}
     */
    get path() {
        return this.key ? controlPath(this.key, this.parent) : [];
    }
    /**
     * @return {?}
     */
    get validator() {
        return Validators.compose(this.rawValidators);
    }
    /**
     * @return {?}
     */
    get asyncValidator() {
        return Validators.composeAsync(this.rawAsyncValidators);
    }
    /**
     * @return {?}
     */
    updateValueAndValidity() {
        // stub?
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.viewContainerRef.clear();
        if (this.key) {
            this.formDirective.form.removeControl(this.key);
        }
        this.stateSubscription();
    }
    /**
     * @param {?} state
     * @return {?}
     */
    resetState(state) {
        if (this.key == null || this.key.length === 0) {
            return; // no state to retreive if no key is set
        }
        /** @type {?} */
        const iterable = State.get(state, this.connection.path.concat(this.path));
        /** @type {?} */
        let index = 0;
        for (const value of iterable) {
            /** @type {?} */
            const viewRef = this.viewContainerRef.length > index
                ? (/** @type {?} */ (this.viewContainerRef.get(index)))
                : null;
            if (viewRef == null) {
                /** @type {?} */
                const embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.templateRef, new ConnectArrayTemplate(index, index, value), index);
                this.patchDescendantControls(embeddedViewRef);
                this.array.insert(index, this.transform(this.array, embeddedViewRef.context.item));
            }
            else {
                Object.assign(viewRef.context, new ConnectArrayTemplate(index, index, value));
            }
            ++index;
        }
        while (this.viewContainerRef.length > index) {
            this.viewContainerRef.remove(this.viewContainerRef.length - 1);
        }
    }
    /**
     * @param {?} array
     * @return {?}
     */
    registerInternals(array) {
        array.registerControl = () => undefined;
        array.registerOnChange = () => undefined;
        Object.defineProperties(this, {
            _rawValidators: {
                value: this.rawValidators || [],
            },
            _rawAsyncValidators: {
                value: this.rawAsyncValidators || [],
            },
        });
    }
    /**
     * @param {?} viewRef
     * @return {?}
     */
    patchDescendantControls(viewRef) {
        /** @type {?} */
        const groups = Object.keys(viewRef._view)
            .map(k => viewRef._view[k])
            .filter(c => c instanceof NgModelGroup);
        groups.forEach(c => {
            Object.defineProperties(c, {
                _parent: {
                    value: this,
                },
                _checkParentType: {
                    value: () => undefined,
                },
            });
        });
    }
    /**
     * @param {?} parent
     * @param {?} reference
     * @return {?}
     */
    transform(parent, reference) {
        /** @type {?} */
        const emptyControl = () => {
            /** @type {?} */
            const control = new FormControl(null);
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
        const iterate = (iterable) => {
            /** @type {?} */
            const array = new FormArray([]);
            this.registerInternals(array);
            for (let i = array.length; i > 0; i--) {
                array.removeAt(i);
            }
            for (const value of iterable) {
                /** @type {?} */
                const transformed = this.transform(array, value);
                if (transformed) {
                    array.push(transformed);
                }
            }
            return array;
        };
        /** @type {?} */
        const associate = (value) => {
            /** @type {?} */
            const group = new FormGroup({});
            group.setParent(parent);
            for (const key of Object.keys(value)) {
                /** @type {?} */
                const transformed = this.transform(group, value[key]);
                if (transformed) {
                    group.addControl(key, transformed);
                }
            }
            return group;
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
            throw new Error(`Cannot convert object of type ${typeof reference} / ${reference.toString()} to form element`);
        }
    }
}
ConnectArrayDirective.decorators = [
    { type: Directive, args: [{
                selector: '[connectArray]',
                providers: [
                    {
                        provide: ControlContainer,
                        useExisting: forwardRef(() => ConnectArrayDirective),
                    },
                ],
            },] },
];
/** @nocollapse */
ConnectArrayDirective.ctorParameters = () => [
    { type: ControlContainer, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf }] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] }] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_ASYNC_VALIDATORS,] }] },
    { type: ConnectBase },
    { type: TemplateRef },
    { type: ViewContainerRef },
    { type: FormStore }
];
ConnectArrayDirective.propDecorators = {
    connectArrayOf: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC1hcnJheS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L2Zvcm0vIiwic291cmNlcyI6WyJjb25uZWN0LWFycmF5L2Nvbm5lY3QtYXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsVUFBVSxFQUNWLElBQUksRUFDSixNQUFNLEVBQ04sS0FBSyxFQUdMLFFBQVEsRUFDUixJQUFJLEVBQ0osUUFBUSxFQUNSLFdBQVcsRUFDWCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdMLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsRUFFVCxtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLFlBQVksRUFFWixVQUFVLEdBQ1gsTUFBTSxnQkFBZ0IsQ0FBQztBQUd4QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBV2hFLE1BQU0sNEJBQTZCLFNBQVEsZ0JBQWdCOzs7Ozs7Ozs7O0lBUXpELFlBSVUsTUFBd0IsRUFJeEIsYUFBb0IsRUFJcEIsa0JBQXlCLEVBQ3pCLFlBQ0EsYUFDQSxrQkFDQTtRQUVSLEtBQUssRUFBRSxDQUFDO1FBZEEsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFJeEIsa0JBQWEsR0FBYixhQUFhLENBQU87UUFJcEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFPO1FBQ3pCLGVBQVUsR0FBVixVQUFVO1FBQ1YsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gscUJBQWdCLEdBQWhCLGdCQUFnQjtRQUNoQixVQUFLLEdB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QUFJLFlBQ0osTUFBTSxTQUFDLGFBQWE7d0NBRXBCLFFBQVEsWUFDUixJQUFJLFlBQ0osTUFBTSxTQUFDLG1CQUFtQjtZQWxDdEIsV0FBVztZQW5CbEIsV0FBVztZQUNYLGdCQUFnQjtZQW1CVCxTQUFTOzs7NkJBaURmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdCxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBTZWxmLFxuICBTa2lwU2VsZixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWJzdHJhY3RDb250cm9sLFxuICBBc3luY1ZhbGlkYXRvckZuLFxuICBDb250cm9sQ29udGFpbmVyLFxuICBGb3JtQXJyYXksXG4gIEZvcm1Db250cm9sLFxuICBGb3JtR3JvdXAsXG4gIEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgTkdfQVNZTkNfVkFMSURBVE9SUyxcbiAgTkdfVkFMSURBVE9SUyxcbiAgTmdNb2RlbEdyb3VwLFxuICBWYWxpZGF0b3JGbixcbiAgVmFsaWRhdG9ycyxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVW5zdWJzY3JpYmUgfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7IENvbm5lY3RCYXNlIH0gZnJvbSAnLi4vY29ubmVjdCc7XG5pbXBvcnQgeyBGb3JtU3RvcmUgfSBmcm9tICcuLi9mb3JtLXN0b3JlJztcbmltcG9ydCB7IGNvbnRyb2xQYXRoIH0gZnJvbSAnLi4vc2hpbXMnO1xuaW1wb3J0IHsgU3RhdGUgfSBmcm9tICcuLi9zdGF0ZSc7XG5pbXBvcnQgeyBDb25uZWN0QXJyYXlUZW1wbGF0ZSB9IGZyb20gJy4vY29ubmVjdC1hcnJheS10ZW1wbGF0ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjb25uZWN0QXJyYXldJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQ29udHJvbENvbnRhaW5lcixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENvbm5lY3RBcnJheURpcmVjdGl2ZSksXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29ubmVjdEFycmF5RGlyZWN0aXZlIGV4dGVuZHMgQ29udHJvbENvbnRhaW5lclxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdGF0ZVN1YnNjcmlwdGlvbjogVW5zdWJzY3JpYmU7XG5cbiAgcHJpdmF0ZSBhcnJheSA9IG5ldyBGb3JtQXJyYXkoW10pO1xuXG4gIHByaXZhdGUga2V5Pzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEhvc3QoKVxuICAgIEBTa2lwU2VsZigpXG4gICAgcHJpdmF0ZSBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIsXG4gICAgQE9wdGlvbmFsKClcbiAgICBAU2VsZigpXG4gICAgQEluamVjdChOR19WQUxJREFUT1JTKVxuICAgIHByaXZhdGUgcmF3VmFsaWRhdG9yczogYW55W10sXG4gICAgQE9wdGlvbmFsKClcbiAgICBAU2VsZigpXG4gICAgQEluamVjdChOR19BU1lOQ19WQUxJREFUT1JTKVxuICAgIHByaXZhdGUgcmF3QXN5bmNWYWxpZGF0b3JzOiBhbnlbXSxcbiAgICBwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3RCYXNlLFxuICAgIHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgc3RvcmU6IEZvcm1TdG9yZSxcbiAgKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24gPSB0aGlzLnN0b3JlLnN1YnNjcmliZShzdGF0ZSA9PlxuICAgICAgdGhpcy5yZXNldFN0YXRlKHN0YXRlKSxcbiAgICApO1xuXG4gICAgdGhpcy5yZWdpc3RlckludGVybmFscyh0aGlzLmFycmF5KTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBjb25uZWN0QXJyYXlPZihjb2xsZWN0aW9uOiBhbnkpIHtcbiAgICB0aGlzLmtleSA9IGNvbGxlY3Rpb247XG5cbiAgICB0aGlzLnJlc2V0U3RhdGUodGhpcy5zdG9yZS5nZXRTdGF0ZSgpKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9ybURpcmVjdGl2ZS5hZGRDb250cm9sKHRoaXMgYXMgYW55KTtcbiAgfVxuXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMua2V5IHx8ICcnO1xuICB9XG5cbiAgZ2V0IGNvbnRyb2woKTogRm9ybUFycmF5IHtcbiAgICByZXR1cm4gdGhpcy5hcnJheTtcbiAgfVxuXG4gIGdldCBmb3JtRGlyZWN0aXZlKCk6IEZvcm1Hcm91cERpcmVjdGl2ZSB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50LmZvcm1EaXJlY3RpdmUgYXMgRm9ybUdyb3VwRGlyZWN0aXZlO1xuICB9XG5cbiAgZ2V0IHBhdGgoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmtleSA/IGNvbnRyb2xQYXRoKHRoaXMua2V5LCB0aGlzLnBhcmVudCkgOiBbXTtcbiAgfVxuXG4gIGdldCB2YWxpZGF0b3IoKTogVmFsaWRhdG9yRm4gfCBudWxsIHtcbiAgICByZXR1cm4gVmFsaWRhdG9ycy5jb21wb3NlKHRoaXMucmF3VmFsaWRhdG9ycyk7XG4gIH1cblxuICBnZXQgYXN5bmNWYWxpZGF0b3IoKTogQXN5bmNWYWxpZGF0b3JGbiB8IG51bGwge1xuICAgIHJldHVybiBWYWxpZGF0b3JzLmNvbXBvc2VBc3luYyh0aGlzLnJhd0FzeW5jVmFsaWRhdG9ycyk7XG4gIH1cblxuICB1cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCkge1xuICAgIC8vIHN0dWI/XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblxuICAgIGlmICh0aGlzLmtleSkge1xuICAgICAgdGhpcy5mb3JtRGlyZWN0aXZlLmZvcm0ucmVtb3ZlQ29udHJvbCh0aGlzLmtleSk7XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFN0YXRlKHN0YXRlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5rZXkgPT0gbnVsbCB8fCB0aGlzLmtleS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjsgLy8gbm8gc3RhdGUgdG8gcmV0cmVpdmUgaWYgbm8ga2V5IGlzIHNldFxuICAgIH1cblxuICAgIGNvbnN0IGl0ZXJhYmxlID0gU3RhdGUuZ2V0KHN0YXRlLCB0aGlzLmNvbm5lY3Rpb24ucGF0aC5jb25jYXQodGhpcy5wYXRoKSk7XG5cbiAgICBsZXQgaW5kZXggPSAwO1xuXG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBpdGVyYWJsZSkge1xuICAgICAgY29uc3Qgdmlld1JlZiA9XG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5sZW5ndGggPiBpbmRleFxuICAgICAgICAgID8gKHRoaXMudmlld0NvbnRhaW5lclJlZi5nZXQoaW5kZXgpIGFzIEVtYmVkZGVkVmlld1JlZjxcbiAgICAgICAgICAgICAgQ29ubmVjdEFycmF5VGVtcGxhdGVcbiAgICAgICAgICAgID4pXG4gICAgICAgICAgOiBudWxsO1xuXG4gICAgICBpZiAodmlld1JlZiA9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGVtYmVkZGVkVmlld1JlZiA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXc8XG4gICAgICAgICAgQ29ubmVjdEFycmF5VGVtcGxhdGVcbiAgICAgICAgPihcbiAgICAgICAgICB0aGlzLnRlbXBsYXRlUmVmLFxuICAgICAgICAgIG5ldyBDb25uZWN0QXJyYXlUZW1wbGF0ZShpbmRleCwgaW5kZXgsIHZhbHVlKSxcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnBhdGNoRGVzY2VuZGFudENvbnRyb2xzKGVtYmVkZGVkVmlld1JlZik7XG5cbiAgICAgICAgdGhpcy5hcnJheS5pbnNlcnQoXG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgdGhpcy50cmFuc2Zvcm0odGhpcy5hcnJheSwgZW1iZWRkZWRWaWV3UmVmLmNvbnRleHQuaXRlbSksXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIHZpZXdSZWYuY29udGV4dCxcbiAgICAgICAgICBuZXcgQ29ubmVjdEFycmF5VGVtcGxhdGUoaW5kZXgsIGluZGV4LCB2YWx1ZSksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgICsraW5kZXg7XG4gICAgfVxuXG4gICAgd2hpbGUgKHRoaXMudmlld0NvbnRhaW5lclJlZi5sZW5ndGggPiBpbmRleCkge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLnJlbW92ZSh0aGlzLnZpZXdDb250YWluZXJSZWYubGVuZ3RoIC0gMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3RlckludGVybmFscyhhcnJheTogYW55KSB7XG4gICAgYXJyYXkucmVnaXN0ZXJDb250cm9sID0gKCkgPT4gdW5kZWZpbmVkO1xuICAgIGFycmF5LnJlZ2lzdGVyT25DaGFuZ2UgPSAoKSA9PiB1bmRlZmluZWQ7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICBfcmF3VmFsaWRhdG9yczoge1xuICAgICAgICB2YWx1ZTogdGhpcy5yYXdWYWxpZGF0b3JzIHx8IFtdLFxuICAgICAgfSxcbiAgICAgIF9yYXdBc3luY1ZhbGlkYXRvcnM6IHtcbiAgICAgICAgdmFsdWU6IHRoaXMucmF3QXN5bmNWYWxpZGF0b3JzIHx8IFtdLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcGF0Y2hEZXNjZW5kYW50Q29udHJvbHModmlld1JlZjogYW55KSB7XG4gICAgY29uc3QgZ3JvdXBzID0gT2JqZWN0LmtleXModmlld1JlZi5fdmlldylcbiAgICAgIC5tYXAoayA9PiB2aWV3UmVmLl92aWV3W2tdKVxuICAgICAgLmZpbHRlcihjID0+IGMgaW5zdGFuY2VvZiBOZ01vZGVsR3JvdXApO1xuXG4gICAgZ3JvdXBzLmZvckVhY2goYyA9PiB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjLCB7XG4gICAgICAgIF9wYXJlbnQ6IHtcbiAgICAgICAgICB2YWx1ZTogdGhpcyxcbiAgICAgICAgfSxcbiAgICAgICAgX2NoZWNrUGFyZW50VHlwZToge1xuICAgICAgICAgIHZhbHVlOiAoKSA9PiB1bmRlZmluZWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNmb3JtKFxuICAgIHBhcmVudDogRm9ybUdyb3VwIHwgRm9ybUFycmF5LFxuICAgIHJlZmVyZW5jZTogYW55LFxuICApOiBBYnN0cmFjdENvbnRyb2wge1xuICAgIGNvbnN0IGVtcHR5Q29udHJvbCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wobnVsbCk7XG4gICAgICBjb250cm9sLnNldFBhcmVudChwYXJlbnQpO1xuICAgICAgcmV0dXJuIGNvbnRyb2w7XG4gICAgfTtcblxuICAgIGlmIChyZWZlcmVuY2UgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGVtcHR5Q29udHJvbCgpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVmZXJlbmNlLnRvSlMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlZmVyZW5jZSA9IHJlZmVyZW5jZS50b0pTKCk7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0eXBlb2YgcmVmZXJlbmNlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gZW1wdHlDb250cm9sKCk7XG4gICAgfVxuXG4gICAgY29uc3QgaXRlcmF0ZSA9IChpdGVyYWJsZTogYW55KTogRm9ybUFycmF5ID0+IHtcbiAgICAgIGNvbnN0IGFycmF5ID0gbmV3IEZvcm1BcnJheShbXSk7XG5cbiAgICAgIHRoaXMucmVnaXN0ZXJJbnRlcm5hbHMoYXJyYXkpO1xuXG4gICAgICBmb3IgKGxldCBpID0gYXJyYXkubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIGFycmF5LnJlbW92ZUF0KGkpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIGl0ZXJhYmxlKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkID0gdGhpcy50cmFuc2Zvcm0oYXJyYXksIHZhbHVlKTtcbiAgICAgICAgaWYgKHRyYW5zZm9ybWVkKSB7XG4gICAgICAgICAgYXJyYXkucHVzaCh0cmFuc2Zvcm1lZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH07XG5cbiAgICBjb25zdCBhc3NvY2lhdGUgPSAodmFsdWU6IGFueSk6IEZvcm1Hcm91cCA9PiB7XG4gICAgICBjb25zdCBncm91cCA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgICAgZ3JvdXAuc2V0UGFyZW50KHBhcmVudCk7XG5cbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHZhbHVlKSkge1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZCA9IHRoaXMudHJhbnNmb3JtKGdyb3VwLCB2YWx1ZVtrZXldKTtcbiAgICAgICAgaWYgKHRyYW5zZm9ybWVkKSB7XG4gICAgICAgICAgZ3JvdXAuYWRkQ29udHJvbChrZXksIHRyYW5zZm9ybWVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ3JvdXA7XG4gICAgfTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHJlZmVyZW5jZSkpIHtcbiAgICAgIHJldHVybiBpdGVyYXRlKHJlZmVyZW5jZSBhcyBhbnlbXSk7XG4gICAgfSBlbHNlIGlmIChyZWZlcmVuY2UgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgIHJldHVybiBpdGVyYXRlKHJlZmVyZW5jZSBhcyBTZXQ8YW55Pik7XG4gICAgfSBlbHNlIGlmIChyZWZlcmVuY2UgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgIHJldHVybiBhc3NvY2lhdGUocmVmZXJlbmNlIGFzIE1hcDxzdHJpbmcsIGFueT4pO1xuICAgIH0gZWxzZSBpZiAocmVmZXJlbmNlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICByZXR1cm4gYXNzb2NpYXRlKHJlZmVyZW5jZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYENhbm5vdCBjb252ZXJ0IG9iamVjdCBvZiB0eXBlICR7dHlwZW9mIHJlZmVyZW5jZX0gLyAke3JlZmVyZW5jZS50b1N0cmluZygpfSB0byBmb3JtIGVsZW1lbnRgLFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==