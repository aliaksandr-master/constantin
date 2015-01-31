"use strict";

var _ = require('lodash');
var constantin = require('./_lib');

exports['empty object'] = function (test) {
	test.doesNotThrow(function () {
		var a = {};
		var constA = constantin(a);
		test.deepEqual(a, constA);
	});

	test.done();
};

exports['empty array'] = function (test) {
	test.doesNotThrow(function () {
		var a = [];
		var constA = constantin(a);
		test.deepEqual(a, constA);
	});

	test.done();
};

exports['small array'] = function (test) {
	test.doesNotThrow(function () {
		var a = [1, 2, 3];
		var constA = constantin(a);
		test.deepEqual(a, constA);
	});

	test.done();
};

exports['small object'] = function (test) {
	test.doesNotThrow(function () {
		var a = {a: 1, b: 2, c: 3};
		var constA = constantin(a);
		test.deepEqual(a, constA);
	});

	test.done();
};

exports['object'] = function (test) {
	test.doesNotThrow(function () {
		var a = {a: {a: 123, b: 234, c: 345}, b: [1, 2, {a: 1, b: 2, c: [ 1, 2, 3, null, undefined, function () {}, '123']}], c: 3, d: '', e: '123'};
		var constA = constantin(a);
		test.deepEqual(a, constA);
	});

	test.done();
};

exports['is not object'] = function (test) {
	_.each([
		undefined,
		null,
		1,
		'asd',
		function () {},
		NaN
	], function (a) {
		test.throws(function () {
			constantin(a);
		});
	});

	test.done();
};

var constValue = constantin({
	a: { a: 123, b: 234, c: 345 },
	b: [
		1,
		2,
		{
			a: 1,
			b: 2,
			c: [
				1,
				2,
				3,
				null,
				undefined,
				function () {},
				'123'
			]
		}
	],
	c: 3,
	d: '',
	e: '123'
}, true);

exports['get'] = function (test) {
	test.doesNotThrow(function () {
		test.deepEqual(constValue.a, { a: 123, b: 234, c: 345 });
		test.deepEqual(constValue.b[2].b, 2);
	});
	test.done();
};

exports['throw if try to set'] = function (test) {
	test.throws(function () {
		constValue.a = 1;
	});

	test.throws(function () {
		constValue.a.b = 1;
	});

	test.throws(function () {
		constValue.b[2].b = 1;
	});

	test.done();
};
