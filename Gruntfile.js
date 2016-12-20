"use strict";

var jitGrunt = require('jit-grunt');

module.exports = require('grunto')(function(grunt) {
	jitGrunt(grunt);

	grunt.registerTask('default', [
		'newer:jshint:all',
		'nodeunit',
		'watch'
	]);

	return {
		nodeunit: {
			all: [
				'test/*.js'
			],
			options: {
			}
		},
		'jshint': {
			options: {
				jshintrc: true
			},
			all: [
				'**/*.{js,json}',
				'!node_modules/**/*.{js,json}',
				'!lib-cov/**/*.{js,json}'
			]
		},
		watch: {
			files: [
				'lib/**/*',
				'test/**/*'
			],
			tasks: [
				'newer:jshint:all',
				'nodeunit'
			]
		}
	};
});