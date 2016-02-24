var generators = require('yeoman-generator');
var chalk = require('chalk');
var helpers = require('../lib/helpers');

var prompts = [{
      type    : 'input',
      name    : 'methodName',
      message : 'What would you like to call the service?',
      default : 'NewService'
    },
    {
      type    : 'input',
      name    : 'directory',
      message : 'What is the output subdirectory?',
      default : 'services'
    }];

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('serviceName', { type: String, required: true });
  },
  createFiles: function() {
    var done = this.async();
    var name = this.serviceName;

    this.prompt(prompts, function promptCallback(answers) {
      this.fs.copyTpl(
        this.templatePath('service.js'),
        this.destinationPath(answers.directory + '/' + name + '.js'),
        {methodName: answers.methodName}
      );

      done();
    }.bind(this));
  },
  checkVSConfig: function() {
    helpers.checkVSConfig(this);
  },
  complete: function() {
    if(this.config.get('addFilesToProjVS')) {
      helpers.logVSWarning(this.log);
    }
    this.log(chalk.bold.green('Successfully created new service...'));
  }
});
