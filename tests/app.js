var helpers = require('yeoman-test');
var path = require('path');
var assert = require('yeoman-assert');

var expectedServiceFile = ['myApp/app/services/my-service/my-service.js',
                           'myApp/app/services/index.js'];

var expectedPageFiles = ['myApp/app/pages/my-page/my-page.js', 
                         'myApp/app/pages/my-page/my-page.html', 
                         'myApp/app/pages/my-page/my-page.less',
                         'myApp/app/pages/index.js'];
                         
var expectedComponentFiles = ['myApp/app/components/my-component/my-component.js', 
                              'myApp/app/components/my-component/my-component.html', 
                              'myApp/app/components/my-component/my-component.less',
                              'myApp/app/components/index.js'];
                             

describe('angular-browserify', function () {
  //Using the prompts...
  describe('when using the main app generator', function () {
    before(function beforeTest(done) {
      helpers.run(path.join(__dirname, '../app'))
        .withGenerators([
            path.join(__dirname, '../component'),
            path.join(__dirname, '../page'),
            path.join(__dirname, '../service'),
        ])
        .withPrompts({ 
            appName: 'myApp',
        })
        .on('end', done);
    });
    
    //Services
    it('generates the service files', function () {
      assert.file(expectedServiceFile);
    });
    
    it('adds the method name to the JS file', function () {
      assert.fileContent('myApp/app/services/my-service/my-service.js', /myService/);
    });
    
    //Pages
    it('generates the page files', function () {
      assert.file(expectedPageFiles);
    });
    
    it('adds the method name to the JS file', function () {
      assert.fileContent('myApp/app/pages/my-page/my-page.js', /myPage/);
    });
    
    //Components
    it('generates the component files', function () {
      assert.file(expectedComponentFiles);
    });
    
    it('adds the method name to the JS file', function () {
      assert.fileContent('myApp/app/components/my-component/my-component.js', /myComponent/);
    });
    
    //HTML File
    it('creates the index.html file', function () {
      assert.file('myApp/index.html');
    });
  });
});