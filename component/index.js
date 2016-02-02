var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('componentName', { type: String, required: true });
  },
  createHtmlandLessFiles: function() {
    var name = this.componentName;

    this.fs.copyTpl(
      this.templatePath('component.html'),
      this.destinationPath(name + '/' + name + '.html')
    );

    this.fs.copyTpl(
      this.templatePath('component.less'),
      this.destinationPath(name + '/' + name + '.less')
    );
  },
  createJsFile: function () {
    var done = this.async();
    var name = this.componentName;

    this.prompt({
      type    : 'input',
      name    : 'methodName',
      message : 'What would you like to call the main function in this component?',
      default : 'NewComponent'
    }, function (answers) {
    this.fs.copyTpl(
      this.templatePath('component.js'),
      this.destinationPath(name + '/' + name + '.js'),
        {templateFileName: name, methodName: answers.methodName}
      );
      done();
    }.bind(this));
  },
  complete: function() {
    this.log('Successfully created new component!');
  }
});