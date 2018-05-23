'use strict';
let expect = require('chai').expect,
    assert = require('chai').assert;


let MyObjectWithoutArgument = /** @class */ (function () {
  function MyObjectWithoutArgument() {
  }
  return MyObjectWithoutArgument;
}());


let MyObject = /** @class */ (function () {
  function MyObject(json) {
      var params = arguments[1];
      this._key = -1;
      if (!json)
          return;
      this._key = json.key;
      if (params.length > 0)
          this._key = params[0];
  }
  Object.defineProperty(MyObject.prototype, "key", {
      get: function () { return this._key; },
      enumerable: true,
      configurable: true
  });
  return MyObject;
}());

let testObject = [{"key": 1}, null];
let testJson = JSON.stringify(testObject);

describe('Module', () => {
  let ArrayTyper = require('../dist/index.js').ArrayTyper;

  it('should exists', () => {
    expect(new ArrayTyper()).to.exist;
  });

  describe('asArray Function', () => {
    describe('argument validation', () => {
      it('should throw "First parameter must be an object with a constructor"', () => {
        expect(() => ArrayTyper.asArray()).to.throw(Error, 'First parameter must be an object with a constructor');
      });
      it('should throw "First parameter must be an object with a constructor"', () => {
        expect(() => ArrayTyper.asArray({})).to.throw(Error, 'First parameter must be an object with a constructor')
      });
      it('should throw "Object constructor must at least take one argument, the \'untyped\' object"', () => {
        expect(() => ArrayTyper.asArray(MyObjectWithoutArgument)).to.throw(Error, "Object constructor must at least take one argument, the 'untyped' object")
      });
      it('should throw "Second parameter must be an Array or a json stringified Array"', () => {
        expect(() => ArrayTyper.asArray(MyObject, {})).to.throw(Error, "Second parameter must be an Array or a json stringified Array")
      });
      it('should throw "Second parameter must be an Array or a json stringified Array"', () => {
        expect(() => ArrayTyper.asArray(MyObject, "42")).to.throw(Error, "Second parameter must be an Array or a json stringified Array")
      });
    })

    describe('from object', () => {
      let result = ArrayTyper.asArray(MyObject, testObject);
      it('should return Array', () => {
        expect(result.constructor).to.equal(Array);
      });
      it('should return MyObject', () => {
        expect(result[0].constructor).to.equal(MyObject);
      });
      it('should return 1', () => {
        expect(result[0].key).to.equal(1);
      });

      describe('with param', () => {
        let result = ArrayTyper.asArray(MyObject, testObject, 42);
        it('should return Array', () => {
          expect(result.constructor).to.equal(Array);
        });
        it('should return MyObject', () => {
          expect(result[0].constructor).to.equal(MyObject);
        });
        it('should return 42', () => {
          expect(result[0].key).to.equal(42);
        });
      });
    });

    describe('from json', () => {
      let result = ArrayTyper.asArray(MyObject, testJson);
      it('should return Array', () => {
        expect(result.constructor).to.equal(Array);
      });
      it('should return MyObject', () => {
        expect(result[0].constructor).to.equal(MyObject);
      });
      it('should return 1', () => {
        expect(result[0].key).to.equal(1);
      });

      describe('with param', () => {
        let result = ArrayTyper.asArray(MyObject, testJson, 42);
        it('should return Array', () => {
          expect(result.constructor).to.equal(Array);
        });
        it('should return MyObject', () => {
          expect(result[0].constructor).to.equal(MyObject);
        });
        it('should return 42', () => {
          expect(result[0].key).to.equal(42);
        });
      });
    });
  });

  describe('asDict Function', () => {
    describe('argument validation', () => {
      it('should throw "First parameter must be an object with a constructor"', () => {
        expect(() => ArrayTyper.asDict()).to.throw(Error, 'First parameter must be an object with a constructor')
      });
      it('should throw "First parameter must be an object with a constructor"', () => {
        expect(() => ArrayTyper.asDict({})).to.throw(Error, 'First parameter must be an object with a constructor')
      });
      it('should throw "Object constructor must at least take one argument, the \'untyped\' object"', () => {
        expect(() => ArrayTyper.asDict(MyObjectWithoutArgument)).to.throw(Error, "Object constructor must at least take one argument, the 'untyped' object")
      });
      it('should throw "Second parameter must be an Array or a json stringified Array"', () => {
        expect(() => ArrayTyper.asDict(MyObject, {})).to.throw(Error, "Second parameter must be an Array or a json stringified Array")
      });
      it('should throw "Second parameter must be an Array or a json stringified Array"', () => {
        expect(() => ArrayTyper.asDict(MyObject, "{}")).to.throw(Error, "Second parameter must be an Array or a json stringified Array")
      });
      it('should throw "Third parameter must be a Function"', () => {
        expect(() => ArrayTyper.asDict(MyObject, testObject)).to.throw(Error, "Third parameter must be a Function")
      });
      it('should throw "Third parameter must be a Function"', () => {
        expect(() => ArrayTyper.asDict(MyObject, testObject, "42")).to.throw(Error, "Third parameter must be a Function")
      });
    })

    describe('from object', () => {
      let result = ArrayTyper.asDict(MyObject, testObject, t => t.key);
      it('should return Object', () => {
        expect(result.constructor).to.equal(Object);
      });
      it('should return MyObject', () => {
        expect(result[1].constructor).to.equal(MyObject);
      });
      it('should return 1', () => {
        expect(result[1].key).to.equal(1);
      });

      describe('with param', () => {
        let result = ArrayTyper.asDict(MyObject, testObject, t => t.key, 42);
        it('should return Object', () => {
          expect(result.constructor).to.equal(Object);
        });
        it('should return MyObject', () => {
          expect(result[42].constructor).to.equal(MyObject);
        });
        it('should return 42', () => {
          expect(result[42].key).to.equal(42);
        });
      });
    });

    describe('from json', () => {
      let result = ArrayTyper.asDict(MyObject, testJson, t => t.key);
      it('should return Object', () => {
        expect(result.constructor).to.equal(Object);
      });
      it('should return MyObject', () => {
        expect(result[1].constructor).to.equal(MyObject);
      });
      it('should return 1', () => {
        expect(result[1].key).to.equal(1);
      });

      describe('with param', () => {
        let result = ArrayTyper.asDict(MyObject, testJson, t => t.key, 42);
        it('should return Object', () => {
          expect(result.constructor).to.equal(Object);
        });
        it('should return MyObject', () => {
          expect(result[42].constructor).to.equal(MyObject);
        });
        it('should return 42', () => {
          expect(result[42].key).to.equal(42);
        });
      });
    });
  })
});