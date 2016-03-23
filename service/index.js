var generators = require('yeoman-generator');
var chalk = require('chalk');
var helpers = require('../lib/helpers');
var skipAllPrompts = false;

var prompts = [{
      type    : 'input',
      name    : 'filePath',
      message : 'From this directory, what is the file path where you would like to put this service? (Add the trailing slash...)',
      store: true
    }, {
      type    : 'input',
      name    : 'methodName',
      message : 'What would you like to call the main method in this service?',
      default : 'NewService'
    }];

//Helper methods   
function createFilesHelper(filePath, methodName, name) {
  this.fs.copyTpl(
    this.templatePath('service.js'),
    this.destinationPath(filePath + name  + '/' + name + '.js'),
    {templateFileName: name, methodName: methodName}
  );
}

//Main generator
module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('pageName', { type: String, required: true });
    
    //Optional args for using VS shortcuts
    this.argument('filePathArg', { type: String, required: false });
    this.argument('methodNameArg', { type: String, required: false });

  },
  createFiles: function() {
    var done = this.async();
    var name = this.pageName;
    var filePath = this.filePathArg;
    var methodName = this.methodNameArg;
    
    //If we are missing any of the args, run the prompts
    if(!filePath || !methodName) {
      this.prompt(prompts, function promptCallback(answers) {
        filePath =  helpers.addTrailingSlashToFilePath(answers.filePath);
        methodName = answers.methodName;
        createFilesHelper.apply(this, [filePath, methodName, name]);
        done();
      }.bind(this)); 
    } else {
        skipAllPrompts = true;
        filePath = helpers.addTrailingSlashToFilePath(filePath);
        createFilesHelper.apply(this, [filePath, methodName, name]);
        done();
    }
  },
  checkVSConfig: function() {
    if(!skipAllPrompts) {
      helpers.checkVSConfig(this);
    }
  },
  complete: function() {
    this.log(chalk.bold.green('Successfully created new service...'));
  }
});
