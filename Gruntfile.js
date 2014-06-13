// Generated on 2013-08-07 using generator-reveal 0.0.8
'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        watch: {
            options: {
                nospawn: true,
                livereload: LIVERELOAD_PORT
            },
            livereload: {
                files: [
                    'index.html',
                    'js/*.js',
                    'slides/*.md',
                    'slides/*.html',
                    'slides/list.json'
                ],
                tasks: ['build']
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'dist/')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['dist/*']
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    dest: 'dist/',
                    src: [
                        'bower_components/reveal.js/lib/css/zenburn.css',
                        'bower_components/reveal.js/css/theme/default.css',
                        'bower_components/reveal.js/css/reveal.min.css',

                        'bower_components/jquery/jquery.js',
                        'bower_components/handlebars/handlebars.js',
                        'bower_components/reveal.js/lib/js/head.min.js',
                        'bower_components/reveal.js/js/reveal.min.js',

                        'bower_components/reveal.js/lib/js/classList.js',
                        'bower_components/reveal.js/plugin/markdown/marked.js',
                        'bower_components/reveal.js/plugin/markdown/markdown.js',
                        'bower_components/reveal.js/plugin/highlight/highlight.js',
                        'bower_components/reveal.js/plugin/zoom-js/zoom.js',
                        'bower_components/reveal.js/plugin/notes/notes.js',
                        'js/loadtemplates.js',

                        'bower_components/reveal.js/lib/font/*',
                        'js/*.js',
                        'images/{,*/}*.{webp,gif}',
                        'slides/*.{html,md,json}',
                        'index.html',
                        'images/*.{png,jpg,jpeg}'
                    ]
                }]
            }

        }
    });

    grunt.registerTask('server', function (target) {
        if ('dist' === target) {
            return grunt.task.run(['copy', 'open', 'connect:dist:keepalive']);
        }
        grunt.task.run(['build', 'connect:livereload', 'open', 'watch']);
    });
    grunt.registerTask('publish', [ 'copy']);

    grunt.registerTask('build', 'Build your slides.', function () {
        var slides = [];

        grunt.file.recurse('slides', function (post, root, sub, fileName) {
            if (fileName === 'index.md') {
                return;
            }
        });
    });
};
