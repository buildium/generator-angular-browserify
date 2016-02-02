var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	constructor: function () {
    	generators.Base.apply(this, arguments);
		this.argument('componentName', { type: String, required: true });
  	},
	writeFile: function() {
      var name = this.componentName;
      
  		this.fs.copyTpl(
  			this.templatePath('component.html'),
  			this.destinationPath(name + '/' + name + '.html')
  		);
  		this.fs.copyTpl(
  			this.templatePath('component.js'),
  			this.destinationPath(name + '/' + name + '.js'),
        {templateFileName: name}
  		);
  		this.fs.copyTpl(
  			this.templatePath('component.less'),
  			this.destinationPath(name + '/' + name + '.less')
  		);
	},
	complete: function() {
		this.log('Successfully created new component!');
	}
});