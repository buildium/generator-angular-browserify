var generators = require('yeoman-generator');
var chalk = require('chalk');
var helpers = require('../lib/helpers');
var skipAllPrompts = false;

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
      message : 'What would you like to call the main function on this page?',
      default : 'Newpage'
    }];
    
 //Helper methods   
function createFilesHelper(filePath, addLess, methodName, name) {
  this.fs.copyTpl(
    this.templatePath('page.html'),
    this.destinationPath(filePath + name + '/' + name + '.html')
  );

  if(addLess) {
    this.fs.copyTpl(
      this.templatePath('page.less'),
      this.destinationPath(filePath + name + '/' + name + '.less')
    );
  }

  this.fs.copyTpl(
    this.templatePath('page.js'),
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
    this.argument('addLessArg', { type: String, required: false });
    this.argument('methodNameArg', { type: String, required: false });

  },
  createFiles: function() {
    var done = this.async();
    var name = this.pageName;
    var filePath = this.filePathArg;
    var addLess = this.addLessArg;
    var methodName = this.methodNameArg;
    
    //If we are missing any of the args, run the prompts
    if(!filePath || !addLess || !methodName) {
      this.prompt(prompts, function promptCallback(answers) {
        filePath =  helpers.addTrailingSlashToFilePath(answers.filePath);
        addLess = answers.addLessFile;
        methodName = answers.methodName;
        createFilesHelper.apply(this, [filePath, addLess, methodName, name]);
        done();
      }.bind(this)); 
    } else {
        skipAllPrompts = true;
        //Convert the string arg for less to a bool
        addLess = (addLess === 'true');
        filePath = helpers.addTrailingSlashToFilePath(filePath);
        createFilesHelper.apply(this, [filePath, addLess, methodName, name]);
        done();
    }
  },
  checkVSConfig: function() {
    if(!skipAllPrompts) {
      helpers.checkVSConfig(this);
    }
  },
  complete: function() {
    this.log(chalk.bold.green('Successfully created new page...'));
  }
});