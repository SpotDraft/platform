import { Action } from 'redux';
export declare const DefaultRouterState: string;
export interface RouterAction extends Action {
    payload?: string;
}
export declare function routerReducer(state: string, action: RouterAction): string;
