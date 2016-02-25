var generators = require('yeoman-generator');
var chalk = require('chalk');
var helpers = require('../lib/helpers');

var prompts = [{
      type    : 'input',
      name    : 'filePath',
      message : 'From this directory, what is the file path where you would like to put this service? (Add the trailing slash...)',
      default : ''
    }, {
      type    : 'input',
      name    : 'methodName',
      message : 'What would you like to call the main method in this service?',
      default : 'NewService'
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
      var filePath = answers.filePath;
      
      this.fs.copyTpl(
        this.templatePath('service.js'),
        this.destinationPath(filePath + name + '/' + name + '.js'),
        {methodName: answers.methodName}
      );

      done();
    }.bind(this));
  },
  checkVSConfig: function() {
    helpers.checkVSConfig(this);
  },
  complete: function() {
    this.log(chalk.bold.green('Successfully created new service...'));
  }
});
