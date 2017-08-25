'use strict';
var _ = require('lodash');

function Scope() {
  this.$$watchers = [];
}

// We define watch func.It will take 2 funcs as arguments and store them in $$watchers array
// We want every object to have the $watch func, so we add it to prototype of Scope
Scope.prototype.$watch = function(watchFn, listenerFn) {
  var watcher = {
    watchFn: watchFn,
    listenerFn: listenerFn
  };
  this.$$watchers.push(watcher);
};

// It iterates over all registered watchers and calls their listener functions
Scope.prototype.$digest = function() {
  _.forEach(this.$$watchers, function(watcher) {
    watcher.listenerFn();
  });
};


module.exports = Scope;
