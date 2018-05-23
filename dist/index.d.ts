export declare class ArrayTyper {
    static asArray<T>(c: {
        new (object: any, ...args: any[]): T;
    }, arrayOfObject: {}[] | string, ...args: any[]): T[];
    static asDict<T>(c: {
        new (object: any, ...args: any[]): T;
    }, arrayOfObject: {}[] | string, callback: (object: T) => any, ...args: any[]): {
        [key: number]: T;
    };
}
