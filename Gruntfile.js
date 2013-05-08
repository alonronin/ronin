module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'public/resources/js/jquery-1.7.1.min.js',
                    'public/resources/js/css_browser_selector.js',
                    'public/resources/js/jquery.restjson.js',
                    'public/resources/js/jquery.serializeobject.js',
                    'public/resources/js/jquery.cycle.all.min.js',
                    'public/resources/js/jquery.ui.core.min.js',
                    'public/resources/js/jquery.ui.widget.min.js',
                    'public/resources/js/jquery.ui.tabs.min.js',
                    'public/resources/js/jquery.tools.min.js',
                    'public/resources/js/jquery.pagination.js',
                    'public/resources/js/blk.jquery.placeholder.js',
                    'public/resources/js/script.js'
                ],
                dest: 'public/resources/js/built.js'
            }
        },

        uglify: {
            options: {
                mangle: true
            },
            my_target: {
                files: {
                    'public/resources/js/built.min.js': ['public/resources/js/built.js']
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    'public/resources/css/buit.min.css': [
                        'public/resources/css/screen.css',
                        'public/resources/css/typography.css',
                        'public/resources/css/cross-browser.css',
                        'public/resources/css/emp.css'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};