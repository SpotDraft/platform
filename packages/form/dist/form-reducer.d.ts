import { Iterable } from 'immutable';
import { Action } from 'redux';
export declare const defaultFormReducer: <RootState>(initialState?: Iterable.Keyed<string, any> | RootState) => (state: Iterable.Keyed<string, any> | RootState, action: Action<any> & {
    payload?: any;
}) => any;
