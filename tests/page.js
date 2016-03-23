var helpers = require('yeoman-test');
var path = require('path');
var assert = require('yeoman-assert');

var expectedFilesWithoutLess = ['test/my-page/my-page.js', 'test/my-page/my-page.html'];
var expectedFilesWithLess = ['test/my-page/my-page.js', 'test/my-page/my-page.html', 'test/my-page/my-page.less'];

describe('angular-browserify:page', function () {
  //Using the prompts...
  describe('when using just the name argument, and choosing to add a less file', function () {
    before(function beforeTest(done) {
      helpers.run(path.join(__dirname, '../page'))
        .withArguments(['my-page'])
        .withPrompts({ 
            filePath: 'test',
            addLessFile: true,
            methodName: 'myMethod'  
        })
        .on('end', done);
    });

    it('generates the page files', function () {
      assert.file(expectedFilesWithLess);
    });
    
    it('adds the method name to the JS file', function () {
      assert.fileContent('test/my-page/my-page.js', /myMethod/);
    });
  });
  
  describe('when using just the name argument, and choosing not to add a less file', function () {
    before(function beforeTest(done) {
      helpers.run(path.join(__dirname, '../page'))
        .withArguments(['my-page'])
        .withPrompts({ 
            filePath: 'test',
            addLessFile: false,
            methodName: 'myMethod'  
        })
        .on('end', done);
    });

    it('generates the page files without a less file', function () {
      assert.file(expectedFilesWithoutLess);
      assert.noFile('test/my-page/my-page.less');
    });
  });
  
  //Using arguments instead of prompts
  describe('when using arguments instead of prompts, and choosing to add a less file', function () {
    before(function beforeTest(done) {
      helpers.run(path.join(__dirname, '../page'))
        .withArguments(['my-page', 'test', 'true', 'myMethod'])
        .on('end', done);
    });

    it('generates the page files', function () {
      assert.file(expectedFilesWithLess);
    });
    
    it('adds the method name to the JS file', function () {
      assert.fileContent('test/my-page/my-page.js', /myMethod/);
    });
  });
  
  describe('when using arguments instead of prompts, and choosing not to add a less file', function () {
    before(function beforeTest(done) {
      helpers.run(path.join(__dirname, '../page'))
        .withArguments(['my-page', 'test', 'false', 'myMethod'])
        .on('end', done);
    });

    it('generates the page files without a less file', function () {
      assert.file(expectedFilesWithoutLess);
      assert.noFile('test/my-page/my-page.less');
    });
  });
});