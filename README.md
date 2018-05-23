[![Build Status](https://travis-ci.org/FranzStrudel/-caliatys-array-typer.svg?branch=master)](https://travis-ci.org/FranzStrudel/-caliatys-array-typer)

[![Coverage Status](https://coveralls.io/repos/github/FranzStrudel/-caliatys-array-typer/badge.svg?branch=master)](https://coveralls.io/github/FranzStrudel/-caliatys-array-typer?branch=master)

# @caliatys/array-typer
A Node.js module that create an array or dictionnary of generic type object from an array of Object

## Installation
```sh
npm install @caliatys/array-typer --save
```

## Usage
### Javascript
#### Setting up the example
```javascript
// Let's create our own object type
let MyObject = /** @class */ (function () {
  function MyObject(obj) {
    // Simple object with one property...
    this.private_prop = obj.prop;
  }

  // ...and one getter method
  Object.defineProperty(MyObject.prototype, "prop", {
      get: function () { return this.private_prop; },
      enumerable: true,
      configurable: true
  });
  return MyObject;
}());
```

#### Basic usage
```javascript
let ArrayTyper = require('@caliatys/array-typer').ArrayTyper;
// Let's create an array of untyped object
let untypedArray = [{"prop": 1},{"prop": 2}];
// And type its elemetns
let typedArray = ArrayTyper.asArray(MyObject, untypedArray);
// Each element of the array are typed, so we can now call its methods
for (let typedObj of typedArray)
  console.log(typedObj.prop) // 1 & 2
```

We can also send the array as a json

```javascript
let untypedArray = '[{"prop": 1},{"prop": 2}]';
let typedArray = ArrayTyper.asArray(MyObject, untypedArray);
for (let typedObj of typedArray)
  console.log(typedObj.prop);
//Print
// 1
// 2
```

#### Sending additional arguments to the constructor
Additional arguments can be sent to the constructor
```javascript
let typedArray = ArrayTyper.asArray(MyObject, untypedArray, 'several', 'additional', 'arguments');
```
These arguments are accessed in MyObject constructor like this
```javascript
function MyObject(obj) {
  this.private_prop = obj.prop;

  let additionalArguments = arguments[1];
  for (let arg of additionalArguments)
    console.log(arg);
}
//Print
// several
// additional
// arguments
```

#### Returning a dictionnary
If you'd rather want a dictionnary, you can use asDict providing a function to generate the key
```javascript
let untypedArray = [{"prop": 1},{"prop": 2}];
let typedDict = ArrayTyper.asDict(MyObject, untypedArray, t => ""+t.prop); //Using stringified MyObject.prop as key

// typedDict structure
// [
//   "1": {"prop": 1},
//   "2": {"prop": 2}
// ]
```

Of course, json and additionnal arguments are accepted

```javascript
let untypedArray = '[{"prop": 1},{"prop": 2}]';
let typedDict = ArrayTyper.asDict(MyObject, untypedArray, t => ""+t.prop, 'several', 'additional', 'arguments');
```

### TypeScript
#### Setting up the example
```typescript
class MyObject
{
  private _prop : number = -1;
  public get prop() {return this._prop}; 

  constructor(obj: {})
  {
    this._prop = obj.prop;
  }
}
```

#### Usage
The module can be used in Typescript
```typescript
import { ArrayTyper } from '@caliatys/array-typer';
let untypedArray = '[{"prop": 1},{"prop": 2}]';
let typedArray : MyObject[] = ArrayTyper.asArray(MyObject, untypedArray);
```

### Test
```sh
npm run test
```