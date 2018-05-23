# array_typer
A Node.js module that create an array or dictionnary of generic type object from an array of Object

## Installation
```sh
npm install array_typer --save
```

## Usage

### Javascript

```javascript
let ArrayTyper = require('array_typer').ArrayTyper;

let MyObject = /** @class */ (function () {
  function MyObject(json) {
      this.key = json.key;
  }
  return MyObject;
}());

let json = [{"key": 1},{"key": 2}]

let typedArray = ArrayTyper.typeArray(MyObject, json);
```

### TypeScript
```typescript
import { ArrayTyper } from 'array_typer';

let json = [{"key": 1},{"key": 2}]

class MyObject
{
  key : number = -1;

  constructor(json: any)
  {
    this.key = json.key
  }
}

let typedArray: MyObject[] = ArrayTyper.typeArray(MyObject, json);
```

### Test
```sh
npm run test
```