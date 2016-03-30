var helpers = require('yeoman-test');
var path = require('path');
var assert = require('yeoman-assert');

var expectedServiceFile = ['myApp/services/my-service/my-service.js'];

var expectedPageFiles = ['myApp/pages/my-page/my-page.js', 
                         'myApp/pages/my-page/my-page.html', 
                         'myApp/pages/my-page/my-page.less'];
                         
var expectedComponentFiles = ['myApp/components/my-component/my-component.js', 
                              'myApp/components/my-component/my-component.html', 
                              'myApp/components/my-component/my-component.less'];
                             

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
      assert.fileContent('myApp/services/my-service/my-service.js', /myService/);
    });
    
    //Pages
    it('generates the page files', function () {
      assert.file(expectedPageFiles);
    });
    
    it('adds the method name to the JS file', function () {
      assert.fileContent('myApp/pages/my-page/my-page.js', /myPage/);
    });
    
    //Components
    it('generates the component files', function () {
      assert.file(expectedComponentFiles);
    });
    
    it('adds the method name to the JS file', function () {
      assert.fileContent('myApp/components/my-component/my-component.js', /myComponent/);
    });
  });
});