'use strict';

var bindActionCreators = require('redux').bindActionCreators;
var actions = require('<%= pathLevel %>/action-names.js');

// @ngInject
module.exports = function <%= stateNameCamelCase %>Actions($ngRedux) {
    var exports = {};

    //Add your actions here

    return bindActionCreators(exports, $ngRedux.dispatch);
};
