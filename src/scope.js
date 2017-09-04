'use strict';
var _ = require('lodash');

function initWatchVal() { }

function Scope() {
  this.$$watchers = [];
}

// define a watch function that takes 2 functions as arguments,
// and store them in $$watchers array
Scope.prototype.$watch = function(watchFn, listenerFn) {
  var watcher = {
    watchFn: watchFn,
    listenerFn: listenerFn || function() { },
    last: initWatchVal
  };
  this.$$watchers.push(watcher);
};

// digest function, which iterates over all registered watchers
// and calls their listener functions.

// digest has to remember what the last value of each watch func was.
// for each watcher we have an object, we can store the value there.
// a new definition of digest that checks for value changes for each watch func


// Todo:
// modify the digest so that it keeps iterating over all watches until the watched values stop changing.
// doing multiple passes is the only way we get changes applied for watchers that rely on other watchers.

// Rename from $digest > $$digestOnce,
// adjust so all wathcers are ran once, and returns
//a boolean value that determines whether there are any changes or not

Scope.prototype.$$digestOnce = function() {
  var self = this;
  var newValue, oldValue, dirty;
  _.forEach(this.$$watchers, function(watcher) {
    newValue = watcher.watchFn(self);
    oldValue = watcher.last;
    if(newValue !== oldValue) {
      watcher.last = newValue;
      watcher.listenerFn(newValue,
        (oldValue === initWatchVal ? newValue : oldValue),
         self);
        dirty = true;
    }
  });
  return dirty;
};

// Todo: redefine $digest so
// it runs the "outer loop",
// calling $$digestOnce as long as changes keep occuring.

Scope.prototype.$digest = function() {
  var dirty;
  do {
    dirty = this.$$digestOnce();
  } while (dirty);
}




module.exports = Scope;
