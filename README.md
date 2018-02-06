[![npm](http://img.shields.io/npm/v/constantin.svg?style=flat-square)](https://www.npmjs.com/package/constantin)
[![npm](http://img.shields.io/npm/l/constantin.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/aliaksandr-master/constantin.svg?style=flat-square)](https://david-dm.org/aliaksandr-master/constantin)
[![devDependency Status](https://david-dm.org/aliaksandr-master/constantin/dev-status.svg?style=flat-square)](https://david-dm.org/aliaksandr-master/constantin#info=devDependencies)
[![Build Status](https://travis-ci.org/aliaksandr-master/constantin.svg?branch=master&style=flat-square)](https://travis-ci.org/aliaksandr-master/constantin)
[![Coverage Status](https://img.shields.io/coveralls/aliaksandr-master/constantin.svg?style=flat-square)](https://coveralls.io/r/aliaksandr-master/constantin?branch=master)

# constantin
create constant objects/array/... by deep object.defineProperty

```shell
$ npm install constantin --save
```

```js
const constantin = require('constantin');

let myObject = {
  a: 123,
  b: {
    c: [ 1, 2, 3]
  }
};

if (environment !== 'production') {
  const options = {
    own: false,
    name: 'myObject'
  };

  myObject = constantin(myObject, options);
}

const a = constantin.c; // throws error. c is not defined

constantin.c = 4; // throws error. you should not modify constant
```


## Options

### name 
optional - `String` - default `""`. - shows in error message

### allowedProps
optional - `Array(String)` - default `[]`. - ignore prop names

### checkValue(value, pathArray)
optional - `Function` - default `() => {}`. - additional check value on every depth of Object/Array

### skipSymbols
optional - `Boolean` - default `true`. - skip every symbols that will be checked by some library

### own
optional - `Boolean` - default `true`. - checking props in objects by hasOwnProperty  


If you try to change any value inside - it throws an exception
