'use strict';

var constObject = function () {};



var constValue = function (obj, value, name) {
	if (value != null && typeof value === 'object') {
		value = constObject(value);
	}

	Object.defineProperty(obj, name, {
		enumerable: true,
		set: function (name, value) {
			throw new Error('CONSTANTIN: You can\'t modify constant');
		},
		get: function () {
			return value;
		}
	});

	return obj;
};



constObject = function (obj) {
	var k;
	var result;

	if (Array.isArray(obj)) {
		result = [];

		var len = obj.length;

		for (k = 0; k < len; k++) {
			constValue(result, obj[k], k);
		}

		return result;
	}

	result = {};

	for (k in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, k)) {
			constValue(result, obj[k], k);
		}
	}

	return result;
};



module.exports = function (obj) {
	if (obj == null || typeof obj !== 'object') {
		throw new TypeError('CONSTANTIN: value must be an object');
	}

	return constObject(obj);
};
