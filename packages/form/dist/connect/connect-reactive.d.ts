import { FormStore } from '../form-store';
import { ConnectBase } from './connect-base';
export declare class ReactiveConnectDirective extends ConnectBase {
    protected store: FormStore;
    formGroup: any;
    constructor(store: FormStore);
}
