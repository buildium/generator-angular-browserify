var helpers = require('yeoman-test');
var path = require('path');
var assert = require('yeoman-assert');

var expectedFile = ['test/my-service/my-service.js'];

describe('angular-browserify:service', function () {
  //Using the prompts...
  describe('when using just the name argument', function () {
    before(function beforeTest(done) {
      helpers.run(path.join(__dirname, '../service'))
        .withArguments(['my-service'])
        .withPrompts({ 
            filePath: 'test',
            methodName: 'myMethod'  
        })
        .on('end', done);
    });

    it('generates the service files', function () {
      assert.file(expectedFile);
    });
    
    it('adds the method name to the JS file', function () {
      assert.fileContent('test/my-service/my-service.js', /myMethod/);
    });
  });
  
  //Using arguments instead of prompts
  describe('when using arguments instead of prompts', function () {
    before(function beforeTest(done) {
      helpers.run(path.join(__dirname, '../service'))
        .withArguments(['my-service', 'test', 'myMethod'])
        .on('end', done);
    });

    it('generates the service files', function () {
      assert.file(expectedFile);
    });
    
    it('adds the method name to the JS file', function () {
      assert.fileContent('test/my-service/my-service.js', /myMethod/);
    });
  });
});