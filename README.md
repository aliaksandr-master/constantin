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
var constantin = require('constantin');

var myObject = {
	a: 123,
	b: {
	   c: [ 1, 2, 3]
	}
	// ...
};

if (environment === 'development') {
    myObject = constantin(myObject);
} else {
	myObject = constantin(myObject, {
		console: true
	});
}

module.exports = myObject;
```

If you try to change any value inside - it throws an exception