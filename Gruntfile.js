/*global module*/
module.exports = function(grunt) {
  'use strict';

  var jsSources = [
    'Gruntfile.js',
    '*.js',
    'test/**/*.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: {
      src: ['tests/deferred-load.html'],
      options: {
        page : {
          viewportSize : { width: 1280, height: 800 }
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.registerTask('test', 'qunit:src');
  grunt.registerTask('travis', ['test']);
};
