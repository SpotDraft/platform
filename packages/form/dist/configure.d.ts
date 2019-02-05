import { FormStore } from './form-store';
export declare const provideReduxForms: <T>(store: any) => {
    provide: typeof FormStore;
    useValue: FormStore;
}[];
