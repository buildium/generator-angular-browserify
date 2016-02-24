'use strict';

var chalk = require('chalk');

var exports = {};

exports.normalizeName = function normalizeName(name) {
  return name.split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
};

exports.capitalize = function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
};

exports.camelCase = function camelCase(name) {
  return name.split('-').map(exports.capitalize).join('');
};

exports.lowerFirstLetter = function lowerFirstLetter(word) {
  return word.charAt(0).toLowerCase() + word.slice(1)
};

exports.checkVSConfig = function checkVSConfig(generator) {
    var addFilesToProjVS = generator.config.get('addFilesToVSReminder');
    var done = generator.async();
    
    if(typeof addFilesToProjVS === 'undefined') {
      generator.prompt({
        type    : 'confirm',
        name    : 'vsReminder',
        message : 'Do you use Visual Studio?  Would you like to set a reminder to add your Yeoman generated files to your csproj file?',
        default : true
      }, function vsPromptAnswer(answers) {
          generator.config.set('addFilesToVSReminder', answers.vsReminder);
          done();
      }.bind(this));
    } else {
      if(addFilesToProjVS) {
        exports.logVSWarning(generator.log);
      }
      done();
    }    
};

exports.logVSWarning = function logVSWarning(log) {
    log(chalk.bold.red('Hey, buddy!  Add this folder to the project in Visual Studio!!!'));
    log(chalk.bold.red('Solution Explorer -> Show All Files -> right click on the new component directory and Include In Project\n \n'));
};

module.exports = exports;