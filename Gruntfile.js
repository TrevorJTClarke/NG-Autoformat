var fs = require('fs');

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.initConfig({
        jasmine: {
            main: {
                src: 'ng-autoformat.js',
                options: {
                    specs: 'tests/**/*.js',
                    outfile: 'tests/specs.html',
                    keepRunner: true
                }
            }
        },
        concat: {
            main: {
                src: [
                    'src/**/*.js'
                ],
                dest: 'dist/ng-autoformat.js'
            }
        }
    });

    // test the codes
    grunt.registerTask('test', [
        'jasmine'
    ]);

    grunt.registerTask('dev', [
        'concat',
        'jasmine'
    ]);
};