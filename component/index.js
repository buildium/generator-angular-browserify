var generators = require('yeoman-generator');
var chalk = require('chalk');
var helpers = require('../lib/helpers');

var prompts = [{
      type    : 'input',
      name    : 'filePath',
      message : 'From this directory, what is the file path where you would like to put this component? (Add the trailing slash...)',
      default : ''
    }, {
      type    : 'confirm',
      name    : 'addLessFile',
      message : 'Would you like to add a LESS file to this component?',
      default : true
    }, {
      type    : 'input',
      name    : 'methodName',
      message : 'What would you like to call the main function in this component?',
      default : 'NewComponent'
    }];

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('componentName', { type: String, required: true });
  },
  createFiles: function() {
    var done = this.async();
    var name = this.componentName;

    this.prompt(prompts, function promptCallback(answers) {
      var filePath = answers.filePath;
      
      this.fs.copyTpl(
        this.templatePath('component.html'),
        this.destinationPath(filePath + name + '/' + name + '.html')
      );

      if(answers.addLessFile) {
        this.fs.copyTpl(
          this.templatePath('component.less'),
          this.destinationPath(filePath + name + '/' + name + '.less')
        );
      }

      this.fs.copyTpl(
        this.templatePath('component.js'),
        this.destinationPath(filePath + name  + '/' + name + '.js'),
          {templateFileName: name, methodName: answers.methodName}
      );

      done();
    }.bind(this));
  },
  checkVSConfig: function() {
    var addFilesToProjVS = this.config.get('addFilesToVSReminder');
    var done = this.async();
    
    if(typeof addFilesToProjVS === 'undefined') {
      this.prompt({
        type    : 'confirm',
        name    : 'vsReminder',
        message : 'Do you use Visual Studio?  Would you like to set a reminder to add your Yeoman generated files to your csproj file?',
        default : true
      }, function vsPromptAnswer(answers) {
          this.config.set('addFilesToVSReminder', answers.vsReminder);
          done();
      }.bind(this));
    } else {
      if(addFilesToProjVS) {
        helpers.logVSWarning(this.log);
        done();
      }
    }  
  },
  complete: function() {
    this.log(chalk.bold.green('Successfully created new component...'));
  }
});