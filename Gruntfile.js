var fs = require('fs');

module.exports = function(grunt) {

    grunt.initConfig({
        jasmine: {
            main: {
                src: 'ng-autoformat.js',
                options: {
                    specs: 'tests/**/*.js',
                    // helpers: 'test/helpers/**/**/*.js',
                    outfile: 'tests/specs.html',
                    keepRunner: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // test the codes
    grunt.registerTask('test', [
        'jasmine'
    ]);
};