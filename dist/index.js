"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayTyper = /** @class */ (function () {
    function ArrayTyper() {
    }
    ArrayTyper.asArray = function (c, arrayOfObject) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (!c || c.constructor !== Function)
            throw new Error("First parameter must be an object with a constructor");
        if (c.length === 0)
            throw new Error("Object constructor must at least take one argument, the 'untyped' object");
        if (arrayOfObject.constructor === String)
            arrayOfObject = JSON.parse(arrayOfObject);
        if (!arrayOfObject || (arrayOfObject.constructor !== Array))
            throw new Error("Second parameter must be an Array or a json stringified Array");
        var typedArray = new Array();
        for (var _a = 0, arrayOfObject_1 = arrayOfObject; _a < arrayOfObject_1.length; _a++) {
            var item = arrayOfObject_1[_a];
            typedArray.push(new c(item, args));
        }
        return typedArray;
    };
    ArrayTyper.asDict = function (c, arrayOfObject, callback) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        if (!c || c.constructor !== Function)
            throw new Error("First parameter must be an object with a constructor");
        if (c.length === 0)
            throw new Error("Object constructor must at least take one argument, the 'untyped' object");
        if (arrayOfObject.constructor === String)
            arrayOfObject = JSON.parse(arrayOfObject);
        if (!arrayOfObject || (arrayOfObject.constructor !== Array))
            throw new Error("Second parameter must be an Array or a json stringified Array");
        if (!callback || (callback.constructor !== Function))
            throw new Error("Third parameter must be a Function");
        var typedDict = {};
        for (var _a = 0, arrayOfObject_2 = arrayOfObject; _a < arrayOfObject_2.length; _a++) {
            var item = arrayOfObject_2[_a];
            var obj = new c(item, args);
            typedDict[callback(obj)] = obj;
        }
        return typedDict;
    };
    return ArrayTyper;
}());
exports.ArrayTyper = ArrayTyper;
