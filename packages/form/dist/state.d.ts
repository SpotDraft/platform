export interface Operations<T> {
    clone(): T;
    merge(key: number | string | null, value: T): any;
    update(key: number | string | null, value: T): any;
}
export declare type TraverseCallback = (parent: any, key: number | string, remainingPath: string[], value?: any) => any;
export declare abstract class State {
    static traverse<StateType>(state: StateType, path: string[], fn?: TraverseCallback): StateType;
    static get<StateType>(state: StateType, path: string[]): any;
    static assign<StateType>(state: StateType, path: string[], value?: any): any;
    static inspect<K>(object: K): Operations<K>;
    static empty(value: any): boolean;
}
