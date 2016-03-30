var generators = require('yeoman-generator');

//Prompts
var prompts = [{
      type    : 'input',
      name    : 'appName',
      message : 'What would you like to call your app?'
    }];

module.exports = generators.Base.extend({
  composeFromParts: function() {    
    var done = this.async();
    this.prompt(prompts, function promptCallback(answers) {
      var appNameFolder = answers.appName + '/';
        
      this.composeWith('angular-browserify:component', {
        args : ['my-component', appNameFolder + 'components/', 'true', 'myComponent']
      });
    
      this.composeWith('angular-browserify:service', {
        args : ['my-service', appNameFolder + 'services/', 'true', 'myService']
      });
    
      this.composeWith('angular-browserify:page', {
        args : ['my-page', appNameFolder + 'pages/', 'true', 'myPage']
      });
      
      done();
      
    }.bind(this)); 
  }
});