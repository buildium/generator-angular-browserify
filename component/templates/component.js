'use strict';

var fs = require('fs');
var templateHtml = fs.readFileSync(__dirname + '/<%= templateFileName %>.html');

module.exports = function NewComponent() {
    var directive = {};

    directive.template = templateHtml;
    directive.scope = {};
    directive.bindToController = true;
    directive.controllerAs = 'vm';

    // @ngInject
    directive.controller = function NewComponentController() {
        var vm = this;
    };

    return directive;
};