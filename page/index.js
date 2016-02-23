var generators = require('yeoman-generator');
var chalk = require('chalk');
var helpers = require('../lib/helpers');

var prompts = [{
      type    : 'confirm',
      name    : 'addLessFile',
      message : 'Would you like to add a LESS file to this page?',
      default : false
    }, {
      type    : 'input',
      name    : 'methodName',
      message : 'What would you like to call the controller function on this page?',
      default : 'NewPage'
    }];

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('pageName', { type: String, required: true });
  },
  createFiles: function() {
    var done = this.async();
    var name = this.pageName;

    this.prompt(prompts, function promptCallback(answers) {
      this.fs.copyTpl(
        this.templatePath('page.html'),
        this.destinationPath(name + '/' + name + '.html')
      );

      if(answers.addLessFile) {
        this.fs.copyTpl(
          this.templatePath('page.less'),
          this.destinationPath(name + '/' + name + '.less')
        );
      }

      this.fs.copyTpl(
        this.templatePath('page.js'),
        this.destinationPath(name + '/' + name + '.js'),
          {templateFileName: name, methodName: answers.methodName}
      );

      done();
    }.bind(this));
  },
  complete: function() {
    if(this.config.get('addFilesToProjVS')) {
      helpers.logVSWarning(this.log);
    }
    this.log(chalk.bold.green('Successfully created new page...'));
    this.log(chalk.bold.green('Add this new page to your routes file!'));
  }
});