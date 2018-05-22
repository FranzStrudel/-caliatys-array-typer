export declare function typeArray<T>(c: {
    new (json: any): T;
}, json: any[]): T[];
export declare function typeArrayWithParam<T>(c: {
    new (json: any, param: any): T;
}, json: any[], param: any): T[];
export declare function typeAsDict<T>(c: {
    new (json: any): IDictDeserializable<T>;
}, json: any[]): {
    [key: number]: T;
};
export interface IDictDeserializable<T> {
    getObject(): T;
    getKey(): number;
}
