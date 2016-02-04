'use strict';

var immutable = require('seamless-immutable');
var actions = require('<%= pathLevel %>/action-names.js');

var initialState = immutable({
});

var reducers = {};

//Add reducers here

module.exports = function reduce(state, action) {
    var reducer = reducers[action.type];
    if (reducer) {
        return reducer(state, action);
    }
    return state || initialState;
};
