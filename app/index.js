var generators = require('yeoman-generator');

//Prompts
var prompts = [{
      type    : 'input',
      name    : 'appName',
      message : 'What would you like to call your app?'
    }];

function createIndexJsFiles(filePath) {
  this.fs.copyTpl(
    this.templatePath('app-index.js'),
    this.destinationPath(filePath + 'index.js')
  );
    
  this.fs.copyTpl(
    this.templatePath('components-index.js'),
    this.destinationPath(filePath + 'components/index.js')
  );
  
  this.fs.copyTpl(
    this.templatePath('services-index.js'),
    this.destinationPath(filePath + 'services/index.js')
  );
  
  this.fs.copyTpl(
    this.templatePath('pages-index.js'),
    this.destinationPath(filePath + 'pages/index.js')
  );  
}

function createIndexHtmlFile(filePath) {
  this.fs.copyTpl(
    this.templatePath('app-index.html'),
    this.destinationPath(filePath + 'index.html')
  ); 
}

module.exports = generators.Base.extend({
  composeFromParts: function() {    
    var done = this.async();
    this.prompt(prompts, function promptCallback(answers) {
      var appRootDir = answers.appName + '/';
      var appNameFolder = appRootDir + 'app/';
        
      this.composeWith('angular-browserify:component', {
        args : ['my-component', appNameFolder + 'components/', 'true', 'myComponent']
      });
    
      this.composeWith('angular-browserify:service', {
        args : ['my-service', appNameFolder + 'services/', 'myService']
      });
    
      this.composeWith('angular-browserify:page', {
        args : ['my-page', appNameFolder + 'pages/', 'true', 'myPage']
      });
      
      createIndexJsFiles.apply(this, [appNameFolder]);
      createIndexHtmlFile.apply(this, [appRootDir]);
      
      done();
      
    }.bind(this)); 
  }
});