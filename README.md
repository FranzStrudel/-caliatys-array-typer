# array_typer
A Node.js module that create an array or dictionnary of generic type object from an array of Object

## Installation
```sh
npm install ts_parser --save
```

## Usage

### Javascript

```javascript
var arrayTyper = require('array_typer');

var MyObject = /** @class */ (function () {
  function MyObject(json) {
      this.key = json.key;
  }
  return MyObject;
}());

var json = [{"key": 1},{"key": 2}]

var typedArray = index.typeArray(MyObject, json);
```

### TypeScript
```typescript
import { typeArray } from 'array_typer';

var json = [{"key": 1},{"key": 2}]

class MyObject
{
  key : number = -1;

  constructor(json: any)
  {
    this.key = json.key
  }
}

var typedArray: MyObject[] = typeArray(MyObject, json));
```

### Test
```sh
npm run test
```