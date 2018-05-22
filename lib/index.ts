export function typeArray<T>(c: {new(json: any) : T}, json: any[]) : T[]
{
  if (!json)
    return [];
  if (typeof json === 'string')
    json = JSON.parse(json);
  let parsedArray = new Array<T>();
  for (let item of json) {
    let obj : T = new c(item);
    if (obj)
      parsedArray.push(obj);
  }
  return parsedArray;
}

export function typeArrayWithParam<T>(c: {new(json: any, param: any) : T}, json: any[], param: any) : T[]
{
  if (!json)
    return [];
  if (typeof json === 'string')
    json = JSON.parse(json);
  let parsedArray = new Array<T>();
  for (let item of json) {
    let obj : T = new c(item, param);
    if (obj)
      parsedArray.push(obj);
  }
  return parsedArray;
}

export function typeAsDict<T>(c: {new(json: any) : IDictDeserializable<T>}, json: any[]) : { [key : number] : T; }
{
  if (!json)
    return {};
  let parsedDict: { [key : number] : T; } = {};
  for (let item of json) {
    let obj : IDictDeserializable<T> = new c(item);
    if (obj)
      parsedDict[obj.getKey()] = obj.getObject();
  }
  return parsedDict;
}

export interface IDictDeserializable<T> {
  getObject() : T;
  getKey() : number;
}
