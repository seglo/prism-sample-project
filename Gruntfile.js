// Generated on 2014-06-11 using generator-angular 0.9.0-1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var path = require('path');

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            return [
              require('grunt-connect-prism/middleware'),
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function(connect) {
            return [
              require('grunt-connect-prism/middleware'),
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      }
    },

    // The API that we are going to use grunt-connect-prism with
    express: {
      api: {
        options: {
          port: 9090,
          server: path.resolve('./express-api.js')
        }
      }
    },

    // Setup one prism
    prism: {
      options: {
        mode: 'proxy',
        mocksPath: './mocks',
        context: '/api',
        host: 'localhost',
        port: 9090,
        https: false,
        /* delay only works in mock mode.
           to turn off delay omit delay property or set to 0 
        delay: 'auto', */
        /* turn on prism api at /_prism/ base route */
        useApi: true,
        /* rewrites requests to context */
        rewrite: {
          '^/api/bookauthors': '/api/authors',
          '^/api/authors\??.*': '/api/authors'
        }
      },
      serve: {},
      e2e: {}
    },


    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: new RegExp('^<%= yeoman.app %>/|../')
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ]
    },

    protractor: {
      options: {
        debug: false
      },
      e2e: {
        configFile: 'test/protractor.conf.js',
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function(prismMode) {

    var prismTask = 'prism:serve';

    if (prismMode) {
      prismTask = prismTask + ':' + prismMode;
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'express:api',
      prismTask,
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', ['e2e']);

  grunt.registerTask('e2e', 'Run end to end tests', function(prismMode) {
    var prismTask = 'prism:e2e';

    if (prismMode) {
      prismTask = prismTask + ':' + prismMode;
    } else {
      prismTask = prismTask + ':mock';
    }

    // start the backend API if we're in record mode. this is probably
    // not applicable if you don't launch your backend server with grunt
    if (prismMode === 'record') {
      grunt.task.run(['express:api']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      prismTask,
      'connect:test',
      'protractor:e2e'
    ]);
  });

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'serve'
  ]);
};