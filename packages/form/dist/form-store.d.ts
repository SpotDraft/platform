import { NgForm } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { Action, Unsubscribe } from 'redux';
export interface AbstractStore<RootState> {
    dispatch(action: Action & {
        payload: any;
    }): void;
    getState(): RootState;
    subscribe(fn: (state: RootState) => void): Unsubscribe;
}
export declare const FORM_CHANGED = "@@angular-redux/form/FORM_CHANGED";
export declare class FormStore {
    private store;
    constructor(store: NgRedux<any>);
    getState(): any;
    subscribe(fn: (state: any) => void): Unsubscribe;
    valueChanged<T>(path: string[], form: NgForm, value: T): void;
}
