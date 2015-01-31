"use strict";

var constValue,
	constantin;

constValue = function (config, value, name) {
	if (value != null && typeof value === 'object') {
		value = constantin(value);
	}

	Object.defineProperty(config, name, {
		enumerable: true,
		set: function () {
			throw new Error('You can\'t modify config object');
		},
		get: function () {
			return value;
		}
	});

	return config;
};

constantin = function (obj, strict) {
	if (obj == null || typeof obj !== 'object') {
		throw new TypeError('value must be object');
	}

	var result = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};

	for (var k in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, k)) {
			constValue(result, obj[k], k);
		}
	}

	return result;
};

module.exports = constantin;
