var generators = require('yeoman-generator');
var chalk = require('chalk');

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
          {templateFileName: name, methodName: answers.methodName}
      );

      done();
    }.bind(this));
  },
  complete: function() {
    this.log(chalk.bold.red('Hey, buddy!  Add this folder to the project in Visual Studio!!! \n \n'));
    this.log(chalk.bold.red('Solution Explorer -> Show All Files -> right click on the new component directory and Include In Project\n \n'));
    this.log(chalk.bold.green('Successfully created new component...'));
  }
});
