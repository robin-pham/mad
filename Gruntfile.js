module.exports = function( grunt ) {
  'use strict';

  grunt.loadNpmTasks('grunt-crx');
  grunt.loadNpmTasks('grunt-contrib-compress');

  var config = {
    app: 'src',
    dist: 'dist',
    package: grunt.file.readJSON('package.json')
  };

  grunt.initConfig({
    config: config,
    crx: {
      testPackage: {
        "src": "<%= config.app %>",
        "dest": "<%= config.dist %>/crx/",
				"zipDest": "<%= config.dist %>/<%= config.package.name %>-<%= config.package.version %>.zip",
				"privateKey": "<%= config.dist %>/mad.pem"
      },
		},
		compress: {
			dist:{
        options: {
          archive: '<%= config.dist %>/<%= config.package.name %>-<%= config.package.version %>.zip'
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>/',
          src: ['**'],
          dest: ''
        }]
			}
		}
  });
	grunt.registerTask('updatejson', function (key, value) {
        var projectFile = "src/manifest.json";

        if (!grunt.file.exists(projectFile)) {
            grunt.log.error("file " + projectFile + " not found");
            return true;//return false to abort the execution
        }
        var project = grunt.file.readJSON(projectFile);//get file as json object

        project['version']= config.package.version;//edit the value of json object, you can also use projec.key if you know what you are updating

        grunt.file.write(projectFile, JSON.stringify(project, null, 2));//serialize it back to file

    });
  grunt.registerTask('default', ['crx', 'compress', 'updatejson']
	);

};
