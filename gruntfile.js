'use strict';

module.exports = function(grunt) {
	// Unified Watch Object
	var watchFiles = {
		serverViews: ['app/views/**/*.*'],
		serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
		clientViews: ['public/modules/**/views/**/*.html'],
		clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
		clientCSS: ['public/modules/**/*.css'],
		mochaTests: ['app/tests/**/*.js']
	};

	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			serverViews: {
				files: watchFiles.serverViews,
				options: {
					livereload: true
				}
			},
			serverJS: {
				files: watchFiles.serverJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			clientViews: {
				files: watchFiles.clientViews,
				options: {
					livereload: true,
				}
			},
			clientJS: {
				files: watchFiles.clientJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			clientCSS: {
				files: watchFiles.clientCSS,
				tasks: ['csslint'],
				options: {
					livereload: true
				}
			}
		},
		jshint: {
			all: {
				src: watchFiles.clientJS.concat(watchFiles.serverJS),
				options: {
					jshintrc: true
				}
			}
		},
		csslint: {
			options: {
				csslintrc: '.csslintrc',
			},
			all: {
				src: watchFiles.clientCSS
			}
		},
		uglify: {
			production: {
				options: {
					mangle: false
				},
				files: {
					'public/dist/application.min.js': 'public/dist/application.js'
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'public/dist/application.min.css': '<%= applicationCSSFiles %>'
				}
			}
		},
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js,html',
					watch: watchFiles.serverViews.concat(watchFiles.serverJS)
				}
			}
		},
		'node-inspector': {
			custom: {
				options: {
					'web-port': 1337,
					'web-host': 'localhost',
					'debug-port': 5858,
					'save-live-edit': true,
					'no-preload': true,
					'stack-trace-limit': 50,
					'hidden': []
				}
			}
		},
		ngAnnotate: {
			production: {
				files: {
					'public/dist/application.js': '<%= applicationJavaScriptFiles %>'
				}
			}
		},
		concurrent: {
			default: ['nodemon', 'watch'],
			debug: ['nodemon', 'watch', 'node-inspector'],
			options: {
				logConcurrentOutput: true,
				limit: 10
			}
		},
		env: {
			test: {
				NODE_ENV: 'test'
			},
			secure: {
				NODE_ENV: 'secure'
			}
		},
		mochaTest: {
			src: watchFiles.mochaTests,
			options: {
				reporter: 'spec',
				require: 'server.js'
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
    mongoimport: {
      options: {
        db : 'exammasterinteractive-dev',
          host : 'localhost', //optional
          port: '27017', //optional
          username : '', //optional
          password : '',  //optional
          stopOnError : true,  //optional
          collections : [
            {
              name : 'question',
              type : 'json',
              file : 'data/db/collections/questions.json',
              jsonArray : true,  //optional
              upsert : true,  //optional
              drop : true  //optional
            }
          ]
      }
    }
	});

  // Load NPM tasks
	require('load-grunt-tasks')(grunt);

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	// A Task for loading the configuration object
	grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
		var init = require('./config/init')();
		var config = require('./config/config');

		grunt.config.set('applicationJavaScriptFiles', config.assets.js);
		grunt.config.set('applicationCSSFiles', config.assets.css);
	});

	// Default task(s).
	grunt.registerTask('default', ['lint', 'concurrent:default']);

	// Debug task.
	grunt.registerTask('debug', ['lint', 'concurrent:debug']);

	// Secure task(s).
	grunt.registerTask('secure', ['env:secure', 'lint', 'concurrent:default']);

	// Lint task(s).
	grunt.registerTask('lint', ['jshint', 'csslint']);

	// Build task(s).
	grunt.registerTask('build', ['lint', 'loadConfig', 'ngAnnotate', 'uglify', 'cssmin']);

	// Test task.
	grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);

  // Task for converting a question text file into a JSON file
  grunt.registerTask(
    'buildJSONFileFromChapterData',
    'Converts an Exam Master Interactive question text file into a JSON format',
    function(file_name) {
      var textFileType = /\.txt/;

      if (file_name !== '' && file_name !== null)
      {
				grunt.log.writeln('Reading text data file ' + file_name + '...');
        var text_file = grunt.file.read('data/db/' + file_name);
        var lines = text_file.split('\n');

        var json = '{\n\t"questions": [\n';

        lines.forEach(function(line, index) {
          if (((index + 8) % 8 === 0) && /\S+/.test(line))
          {
            // this is the question content...
            json += '\t{\n';
            json += '\t\t\"question\": \"' + line.replace(/[\n\r\j]/g, '') + '\",\n';
          }
          else if ((index + 8) % 8 === 1)
          {
            // this is first response...
						json += '\t\t\"responses\": [\n';
            json += '\t\t\t{\"response\": \"' + line.replace(/[\n\r\j]/g, '') + '\"},\n';
          }
          else if ((index + 8) % 8 === 2)
          {
            // this is the second response...
						json += '\t\t\t{\"response\": \"' + line.replace(/[\n\r\j]/g, '') + '\"},\n';
          }
          else if ((index + 8) % 8 === 3)
          {
            // this is the third response...
						json += '\t\t\t{\"response\": \"' + line.replace(/[\n\r\j]/g, '') + '\"},\n';
          }
          else if ((index + 8) % 8 === 4)
          {
            // this is the fourth response...
						json += '\t\t\t{\"response": \"' + line.replace(/[\n\r\j]/g, '') + '\"}\n';
						json += '\t\t],\n';
          }
          else if ((index + 8) % 8 === 5)
          {
            // this is the index value of the responses indicating the actual answer...
            json += '\t\t\"answer\": \"' + line.replace(/[\n\r\j]/g, '') + '\",\n';
          }
          else if ((index + 8) % 8 === 6)
          {
            // this is chapter reference...
            json += '\t\t\"chapter\": \"' + line.replace(/[\n\r\j]/g, '') + '\",\n';
          }
          else if ((index + 8) % 8 === 7)
          {
            // this is the follow up information...
            json += '\t\t\"explanation\":  \"' + line.replace(/[\n\r\j]/g, '') + '\"\n\t}';
						if (index < (lines.length - 2)) {
							json += ',\n';
						}
						else {
							json += '\n';
						}
          }
        });

        json += '\t]\n}';

				grunt.log.writeln('Reading file ' + file_name + ' complete.  Writing JSON file ' + file_name.replace('.txt', '') + '.json');

				if (grunt.file.exists('data/db/chapters') === false)
				{
					grunt.file.mkdir('data/db/chapters');
				}
        grunt.file.write('data/db/chapters/' + file_name.replace('.txt', '') + '.json', json);
      }
    }
  );

	// Task for creating MongoDB import data file
  grunt.registerTask(
		'importQuestionsJSONIntoMongoDB',
		'Reads a JSON file containing list of questions for ExamMaster Interactive application.',
		function(json_path) {
			function addQuestionJSON(entry) {
				var json = '\t{\n\t\t\"content\": \"' + entry.question + '\",\n';
				json += '\t\t\"responses\": [\n';
				entry.responses.forEach(function(item, index) {
					json += '\t\t\t{\"content\": \"' + item.response + '\"}';
					if (index < entry.responses.length - 1) {
						json += ',\n';
					}
					else {
						json += '\n';
					}
				});
				json += '\t\t],\n';
				json += '\t\t\"answer\": \"' + entry.answer + '\",\n';
				json += '\t\t\"chapter\": ' + '\"' + entry.chapter + '\",\n';
				json += '\t\t\"explanation\": ' + '\"' + entry.explanation + '\"\n\t}';

				return json;
			}

			if (json_path !== '' && json_path !== null) {
				var questions_json = '{\n\t\"questions\": [\n';
				grunt.file.recurse(json_path, function(abspath, rootdir, subdir, filename) {
					var json_data = grunt.file.readJSON(abspath);
					json_data.questions.forEach(function(item, index) {
						questions_json += addQuestionJSON(item);
						questions_json += ',\n';
					});
				});
				questions_json += '\t]\n}';

				if (grunt.file.exists('data/db/collections') === false) {
					grunt.file.mkdir('data/db/collections');
				}
				grunt.file.write('data/db/collections/questions.json', questions_json);
			}
		}
  );
};
