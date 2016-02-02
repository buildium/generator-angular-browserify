var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	constructor: function () {
    	generators.Base.apply(this, arguments);
		this.argument('componentName', { type: String, required: true });
  	},
	writeFile: function() {
  		this.fs.copyTpl(
  			this.templatePath('component.html'),
  			this.destinationPath(this.componentName + '/' + this.componentName + '.html')
  		);
  		this.fs.copyTpl(
  			this.templatePath('component.js'),
  			this.destinationPath(this.componentName + '/' + this.componentName + '.js')
  		);
  		this.fs.copyTpl(
  			this.templatePath('component.less'),
  			this.destinationPath(this.componentName + '/' + this.componentName + '.less')
  		);
	},
	complete: function() {
		this.log('Successfully created new component!');
	}
});