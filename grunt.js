module.exports = function(grunt) {
    grunt.initConfig({
        min: {
            dist: {
                src: [
                    'public/resources/js/jquery.restjson.js',
                    'public/resources/js/jquery.serializeobject.js',
                    'public/resources/js/css_browser_selector.js',
                    'public/resources/js/jquery.cycle.all.min.js',
                    'public/resources/js/jquery.ui.core.min.js',
                    'public/resources/js/jquery.ui.widget.min.js',
                    'public/resources/js/jquery.ui.tabs.min.js',
                    'public/resources/js/jquery.tools.min.js',
                    'public/resources/js/blk.jquery.placeholder.js',
                    'public/resources/js/script.js'
                ],
                dest: 'public/resources/js/build.min.js'
            }
        },

        mincss: {
            compress: {
                files: {
                    "public/resources/css/build.min.css": [
                        'public/resources/css/screen.css',
                        'public/resources/css/typography.css',
                        'public/resources/css/cross-browser.css',
                        'public/resources/css/emp.css'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-mincss');

    grunt.registerTask('default', 'min mincss');
};