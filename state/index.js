var generators = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');
var program = require('ast-query');
var readFileAsString = require('html-wiring').readFileAsString;
var helpers = require('../lib/helpers');

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

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
    this.argument('stateName', {type: String, required: true});
  },
  createFiles: function() {
    var done = this.async();
    var name = helpers.normalizeName(this.stateName);
    var nameCamelCase = helpers.camelCase(name);

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
          .key(helpers.lowerFirstLetter(nameCamelCase))
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
    if(this.config.get('addFilesToProjVS')) {
      helpers.logVSWarning(this.log);
    }
    this.log(chalk.bold.green('Successfully created new state slice...'));
  }
});
