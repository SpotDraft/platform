import { AfterContentInit, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormStore } from '../form-store';
export interface ControlPair {
    path: string[];
    control: AbstractControl;
}
export declare class ConnectBase implements OnDestroy, AfterContentInit {
    readonly path: string[];
    connect?: () => (string | number) | (string | number)[];
    protected store?: FormStore;
    protected form: any;
    private stateSubscription?;
    private formSubscription?;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    private descendants(path, formElement);
    private resetState();
    private publish(value);
    private getState();
}
