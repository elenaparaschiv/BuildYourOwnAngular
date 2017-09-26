'use strict';

var _ = require('lodash');

function initWatchVal() { }

function Scope() {
  this.$$watchers = [];
  this.$$lastDirtyWatch = null;
  this.$$asyncQueue = [];
  this.$$phase = null;
}
// added phases
Scope.prototype.$beginPhase = function(phase) {
  if (this.$$phase) {
    throw this.$$phase + ' already in progress ';
  }
  this.$$phase = phase;
};

Scope.prototype.$clearPhase = function() {
  this.$$phase = null;
};
// end added phases

Scope.prototype.$watch = function(watchFn, listenerFn, valueEq) {
  var watcher = {
    watchFn: watchFn,
    listenerFn: listenerFn || function() { },
    valueEq: !!valueEq,
    last: initWatchVal
  };
  this.$$watchers.push(watcher);
};


Scope.prototype.$$digestOnce = function() {
  var self = this;
  var newValue, oldValue, dirty;
  _.forEach(this.$$watchers, function(watcher) {
    newValue = watcher.watchFn(self);
    oldValue = watcher.last;
    // if (newValue !== oldValue) {
      if (!self.$$areEqual(newValue, oldValue, watcher.valueEq)) {
        self.$$lastDirtyWatch = watcher;
        watcher.last = (watcher.valueEq ? _.cloneDeep(newValue) : newValue);
      // watcher.last = newValue;
      watcher.listenerFn(newValue,
        (oldValue === initWatchVal ? newValue : oldValue),
        self
      );
      dirty = true;
    } else if (self.$$lastDirtyWatch === watcher) {
      return false;
    }
  });
  return dirty;
};


  Scope.prototype.$digest = function() {
    var ttl = 10;
    var dirty;
    this.$$lastDirtyWatch = null;
    // added
    this.$beginPhase("$digest");
    do {

      while (this.$$asyncQueue.length) {
        var asyncTask = this.$$asyncQueue.shift(); // shift reduces the elements 1 by 1/
        asyncTask.scope.$eval(asyncTask.expression);
      }
      dirty = this.$$digestOnce();
      // pay attention here
      if ((dirty || this.$$asyncQueue.length) && !(ttl--)) {
        // added
        this.$clearPhase();
        throw "10 digest iterations reached";
      }
      // pay attention here
    } while (dirty || this.$$asyncQueue.length);
    // added
    this.$clearPhase();
  };

  Scope.prototype.$$areEqual = function(newValue, oldValue, valueEq) {
    if (valueEq) {
      return _.isEqual(newValue, oldValue);
    } else {
      return newValue === oldValue ||
      (typeof newValue === 'number' && typeof oldValue ==='number' &&
       isNaN(newValue) && isNaN(oldValue));
    }
  };

  Scope.prototype.$eval = function(expr, locals) {
    return expr(this, locals);
  };

  Scope.prototype.$apply = function(expr) {
    try {
      this.$beginPhase("$apply");
      return this.$eval(expr);
    } finally {
      this.$clearPhase();
      this.$digest();
    }
  };

  Scope.prototype.$evalAsync = function(expr) {
    var self = this;
    if (!self.$$phase && !self.$$asyncQueue.length) {
      setTimeout(function() {
        if (self.$$asyncQueue.length) {
          self.$digest();
        }
      }, 0);
    }
    self.$$asyncQueue.push({scope: self, expression: expr});
  };



module.exports = Scope;
//
