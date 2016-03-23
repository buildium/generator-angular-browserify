var helpers = require('yeoman-test');
var path = require('path');
var assert = require('yeoman-assert');

var expectedFilesWithoutLess = ['test/my-component/my-component.js', 'test/my-component/my-component.html'];
var expectedFilesWithLess = ['test/my-component/my-component.js', 'test/my-component/my-component.html', 'test/my-component/my-component.less']

describe('angular-browserify:component', function () {
  //Using the prompts...
  describe('when using just the name argument, and choosing to add a less file', function () {
    before(function beforeTest(done) {
      helpers.run(path.join(__dirname, '../component'))
        .withArguments(['my-component'])
        .withPrompts({ 
            filePath: 'test',
            addLessFile: true,
            methodName: 'myMethod'  
        })
        .on('end', done);
    });

    it('generates the component files', function () {
      assert.file(expectedFilesWithLess);
    });
    
    it('adds the method name to the JS file', function () {
      assert.fileContent('test/my-component/my-component.js', /myMethod/);
    });
  });
  
  describe('when using just the name argument, and choosing not to add a less file', function () {
    before(function beforeTest(done) {
      helpers.run(path.join(__dirname, '../component'))
        .withArguments(['my-component'])
        .withPrompts({ 
            filePath: 'test',
            addLessFile: false,
            methodName: 'myMethod'  
        })
        .on('end', done);
    });

    it('generates the component files without a less file', function () {
      assert.file(expectedFilesWithoutLess);
      assert.noFile('test/my-component/my-component.less');
    });
  });
  
  //Using arguments instead of prompts
  describe('when using arguments instead of prompts, and choosing to add a less file', function () {
    before(function beforeTest(done) {
      helpers.run(path.join(__dirname, '../component'))
        .withArguments(['my-component', 'test', 'true', 'myMethod'])
        .on('end', done);
    });

    it('generates the component files', function () {
      assert.file(expectedFilesWithLess);
    });
    
    it('adds the method name to the JS file', function () {
      assert.fileContent('test/my-component/my-component.js', /myMethod/);
    });
  });
  
  describe('when using arguments instead of prompts, and choosing not to add a less file', function () {
    before(function beforeTest(done) {
      helpers.run(path.join(__dirname, '../component'))
        .withArguments(['my-component', 'test', 'false', 'myMethod'])
        .on('end', done);
    });

    it('generates the component files without a less file', function () {
      assert.file(expectedFilesWithoutLess);
      assert.noFile('test/my-component/my-component.less');
    });
  });
});