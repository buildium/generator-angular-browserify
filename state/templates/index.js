'use strict';

module.exports = {
    <%= stateNameCamelCase %>: require('./<%= stateNameFolder %>-reducer.js')
};