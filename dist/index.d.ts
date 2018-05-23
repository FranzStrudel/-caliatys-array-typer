export declare class ArrayTyper {
    static typeArray<T>(c: {
        new (json: any): T;
    }, json: any[]): T[];
    static typeArrayWithParam<T>(c: {
        new (json: any, param: any): T;
    }, json: any[], param: any): T[];
    static typeAsDict<T>(c: {
        new (json: any): IDictDeserializable<T>;
    }, json: any[]): {
        [key: number]: T;
    };
}
export interface IDictDeserializable<T> {
    getObject(): T;
    getKey(): number;
}
