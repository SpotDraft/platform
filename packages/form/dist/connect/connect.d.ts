import { NgForm } from '@angular/forms';
import { FormStore } from '../form-store';
import { ConnectBase } from './connect-base';
export declare class ConnectDirective extends ConnectBase {
    protected store: FormStore;
    protected form: NgForm;
    constructor(store: FormStore, form: NgForm);
}
