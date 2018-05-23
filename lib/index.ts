export class ArrayTyper{
  public static asArray<T>(c: {new(object: any, ...args: any[]): T}, arrayOfObject: {}[] | string, ...args: any[]) : T[]
  {
    if (!c || c.constructor !== Function)
      throw new Error("First parameter must be an object with a constructor");
    if (c.length === 0)
      throw new Error("Object constructor must at least take one argument, the 'untyped' object");
    if (arrayOfObject.constructor === String)
      arrayOfObject = JSON.parse(arrayOfObject as string);
    if (!arrayOfObject || (arrayOfObject.constructor !== Array))
      throw new Error("Second parameter must be an Array or a json stringified Array");
    
    let typedArray = new Array<T>();
    for (let item of arrayOfObject) {
      typedArray.push(new c(item, args));
    }
    return typedArray;
  }

  public static asDict<T>(c: {new(object: any, ...args: any[]): T}, arrayOfObject: {}[] | string, callback: (object: T) => any, ...args: any[]) : { [key : number] : T; }
  {
    if (!c || c.constructor !== Function)
      throw new Error("First parameter must be an object with a constructor");
    if (c.length === 0)
      throw new Error("Object constructor must at least take one argument, the 'untyped' object");
    if (arrayOfObject.constructor === String)
      arrayOfObject = JSON.parse(arrayOfObject as string);
    if (!arrayOfObject || (arrayOfObject.constructor !== Array))
      throw new Error("Second parameter must be an Array or a json stringified Array");
    if (!callback || (callback.constructor !== Function))
      throw new Error("Third parameter must be a Function");
    
    let typedDict: { [key : number] : T; } = {};
    for (let item of arrayOfObject) {
      let obj : T = new c(item, args);
      typedDict[callback(obj)] = obj;
    }
    return typedDict;
  }
}
