"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function typeArray(c, json) {
    if (!json)
        return [];
    if (typeof json === 'string')
        json = JSON.parse(json);
    var parsedArray = new Array();
    for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
        var item = json_1[_i];
        var obj = new c(item);
        if (obj)
            parsedArray.push(obj);
    }
    return parsedArray;
}
exports.typeArray = typeArray;
function typeArrayWithParam(c, json, param) {
    if (!json)
        return [];
    if (typeof json === 'string')
        json = JSON.parse(json);
    var parsedArray = new Array();
    for (var _i = 0, json_2 = json; _i < json_2.length; _i++) {
        var item = json_2[_i];
        var obj = new c(item, param);
        if (obj)
            parsedArray.push(obj);
    }
    return parsedArray;
}
exports.typeArrayWithParam = typeArrayWithParam;
function typeAsDict(c, json) {
    if (!json)
        return {};
    var parsedDict = {};
    for (var _i = 0, json_3 = json; _i < json_3.length; _i++) {
        var item = json_3[_i];
        var obj = new c(item);
        if (obj)
            parsedDict[obj.getKey()] = obj.getObject();
    }
    return parsedDict;
}
exports.typeAsDict = typeAsDict;
