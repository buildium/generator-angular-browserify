var generators = require('yeoman-generator');
var chalk = require('chalk');
var helpers = require('../lib/helpers');

var prompts = [{
      type    : 'input',
      name    : 'filePath',
      message : 'From this directory, what is the file path where you would like to put this page? (Add the trailing slash...)',
      store: true
    }, {
      type    : 'confirm',
      name    : 'addLessFile',
      message : 'Would you like to add a LESS file to this page?',
      default : true
    }, {
      type    : 'input',
      name    : 'methodName',
      message : 'What would you like to call the main function in this page?',
      default : 'Newpage'
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
      var filePath = answers.filePath;
      
      this.fs.copyTpl(
        this.templatePath('page.html'),
        this.destinationPath(filePath + name + '/' + name + '.html')
      );

      if(answers.addLessFile) {
        this.fs.copyTpl(
          this.templatePath('page.less'),
          this.destinationPath(filePath + name + '/' + name + '.less')
        );
      }

      this.fs.copyTpl(
        this.templatePath('page.js'),
        this.destinationPath(filePath + name  + '/' + name + '.js'),
          {templateFileName: name, methodName: answers.methodName}
      );

      done();
    }.bind(this));
  },
  checkVSConfig: function() {
    helpers.checkVSConfig(this);
  },
  complete: function() {
    this.log(chalk.bold.green('Successfully created new page...'));
  }
});