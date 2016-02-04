var generators = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');
var program = require('ast-query');
var readFileAsString = require("html-wiring").readFileAsString;

var prompts = [{
  type: 'confirm',
  name: 'createAsSubfolder',
  message: 'Create state slice in its own folder in state/?',
  default: true
},
  {
    type: 'confirm',
    name: 'updateIndex',
    message: 'Add new slice to state/index.js (if it already exists)?',
    default: true
  }];

function normalizeName(name) {
  return name.split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

function camelCase(name) {
  return name.split('-').map(capitalize).join('');
}

function lowerFirstLetter(word) {
  return word.charAt(0).toLowerCase() + word.slice(1)
}

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
    this.argument('stateName', {type: String, required: true});
  },
  createFiles: function() {
    var done = this.async();
    var name = normalizeName(this.stateName);
    var nameCamelCase = camelCase(name);

    this.prompt(prompts, function promptCallback(answers) {
      var stateNameFolder = answers.createAsSubfolder
        ? name + '/' + name
        : name;
      var pathLevel = answers.createAsSubfolder ? '..' : '.';

      if (!fs.existsSync('state')) {
        this.fs.copyTpl(
          this.templatePath('index.js'),
          this.destinationPath('state/index.js'),
          {stateNameFolder: stateNameFolder, stateNameCamelCase: nameCamelCase}
        );
        this.fs.copyTpl(
          this.templatePath('action-names.js'),
          this.destinationPath('state/action-names.js')
        );
      } else if (answers.updateIndex) {
        var tree = program(readFileAsString('state/index.js'));
        tree.assignment('module.exports')
          .value()
          .key(lowerFirstLetter(nameCamelCase))
          .value('require(\'./' + stateNameFolder + '-reducer.js\')');
        this.fs.write('state/index.js', tree.toString());
      }
      this.fs.copyTpl(
        this.templatePath('actions.js'),
        this.destinationPath('state/' + stateNameFolder + '-actions.js'),
        {stateNameCamelCase: nameCamelCase, pathLevel: pathLevel}
      );
      this.fs.copyTpl(
        this.templatePath('reducer.js'),
        this.destinationPath('state/' + stateNameFolder + '-reducer.js'),
        {pathLevel: pathLevel}
      );

      done();
    }.bind(this));
  },
  complete: function() {
    this.log(chalk.bold.red('If this is a whole new state folder, make sure you require it as the third parameter of createReduxApp in your app\'s index.js \n'));
    this.log(chalk.bold.red('Hey, buddy!  Add this folder to the project in Visual Studio!!! \n \n'));
    this.log(chalk.bold.red('Solution Explorer -> Show All Files -> right click on the new component directory and Include In Project\n \n'));
    this.log(chalk.bold.green('Successfully created new service...'));
  }
});
