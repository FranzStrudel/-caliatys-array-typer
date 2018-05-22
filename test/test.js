'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

var MyObject = /** @class */ (function () {
  function MyObject(json, param) {
      this._key = -1;
      if (!json)
          return;
      if (param)
        this._key = param
      else
        this._key = json.key;
  }
  Object.defineProperty(MyObject.prototype, "key", {
      get: function () { return this._key; },
      enumerable: true,
      configurable: true
  });
  MyObject.prototype.getKey = function () {
      return this._key;
  };
  MyObject.prototype.getObject = function () {
      return this;
  };
  return MyObject;
}());

var json = [{"key": 1}]

describe('typeArray function test', () => {
  var result = index.typeArray(MyObject, json);
  it('should return Array', () => {
    expect(result.constructor).to.equal(Array);
  });
  it('should return MyObject', () => {
    expect(result[0].constructor).to.equal(MyObject);
  });
  it('should return 1', () => {
    expect(result[0].key).to.equal(1);
  });
});

describe('typeArrayWithParam function test', () => {
  var result = index.typeArrayWithParam(MyObject, json, 4);
    it('should return Array', () => {
      expect(result.constructor).to.equal(Array);
    });
    it('should return MyObject', () => {
      expect(result[0].constructor).to.equal(MyObject);
    });
    it('should return 4', () => {
      expect(result[0].key).to.equal(4);
    });
});

describe('typeAsDict function test', () => {
  var result = index.typeAsDict(MyObject, json);
  it('should return Object', () => {
    expect(result.constructor).to.equal(Object);
  });
  it('should return MyObject', () => {
    expect(result[1].constructor).to.equal(MyObject);
  });
  it('should return 1', () => {
    expect(result[1].key).to.equal(1);
  });
});