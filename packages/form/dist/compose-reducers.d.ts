import { AnyAction, Reducer } from 'redux';
export declare const composeReducers: <State>(...reducers: Reducer<State, AnyAction>[]) => Reducer<State, AnyAction>;
