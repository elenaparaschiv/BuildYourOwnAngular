'use strict';

var _ = require('lodash');

function initWatchVal() { }

function Scope() {
  this.$$watchers = [];
  this.$$lastDirtyWatch = null;
  this.$$asyncQueue = [];
  this.$$applyAsyncQueue = [];
  this.$$applyAsyncId = null;
  this.$$postDigestQueue = [];
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

Scope.prototype.$new = function() {
  var ChildScope = function() { };
  ChildScope.prototype = this;
  var child = new ChildScope();
  return child;
}

Scope.prototype.$watch = function(watchFn, listenerFn, valueEq) {
  var self = this;
  var watcher = {
    watchFn: watchFn,
    listenerFn: listenerFn || function() { },
    valueEq: !!valueEq,
    last: initWatchVal
  };
  self.$$watchers.unshift(watcher);
  this.$$lastDirtyWatch = null;
  return function() {
    var index = self.$$watchers.indexOf(watcher);
    if (index >= 0) {
      self.$$watchers.splice(index, 1);
      self.$$lastDirtyWatch = null;
    }
  };
};

Scope.prototype.$watchGroup = function(watchFns, listenerFn) {
  var self = this;
  var newValues = new Array(watchFns.length);
  var oldValues = new Array(watchFns.length);
  var changeReactionScheduled = false;
  var firstRun = true;

  if(watchFns.length === 0) {
    var shouldCall = true;
    self.$evalAsync(function() {
      if (shouldCall) {
        listenerFn(newValues, newValues, self);
      }
    });
    return function() {
      shouldCall = false;
    };
  }

  function watchGroupListener() {
    if (firstRun) {
      firstRun = false;
      listenerFn(newValues, newValues, self);
    } else {
      listenerFn(newValues, oldValues, self);
    }
    changeReactionScheduled = false;
  }

  var destroyFunctions = _.map(watchFns, function(watchFn, i) {
    return self.$watch(watchFn, function(newValue, oldValue) {
      newValues[i] = newValue;
      oldValues[i] = oldValue;

      if (!changeReactionScheduled) {
        changeReactionScheduled = true;
        self.$evalAsync(watchGroupListener);
      }
    });
  });

  return function() {
    _.forEach(destroyFunctions, function(destroyFunction) {
      destroyFunction();
    });
  };


};


Scope.prototype.$$digestOnce = function() {
  var self = this;
  var newValue, oldValue, dirty;
  _.forEachRight(this.$$watchers, function(watcher) {
    try {
      if(watcher) {
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
      }
    } catch (e) {
      console.error(e);
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

    if(this.$$applyAsyncId) {
      clearTimeout(this.$$applyAsyncId);
      this.$$flushApplyAsync();
    }

    do {
      while (this.$$asyncQueue.length) {
        try {
          var asyncTask = this.$$asyncQueue.shift(); // shift reduces the elements 1 by 1/
          asyncTask.scope.$eval(asyncTask.expression);
        } catch (e) {
          console.error(e);
        }
      }
      dirty = this.$$digestOnce();
      // pay attention here
      if ((dirty || this.$$asyncQueue.length) && !(ttl--)) {
        // added
        // this.$clearPhase();
        throw "10 digest iterations reached";
      }
      // pay attention here
    } while (dirty || this.$$asyncQueue.length);
    // added
    this.$clearPhase();
    while (this.$$postDigestQueue.length) {
      try {
        this.$$postDigestQueue.shift()();
      } catch (e) {
        console.error(e);
      }
    }
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

  Scope.prototype.$$flushApplyAsync = function() {
    while (this.$$applyAsyncQueue.length) {
      try {
        this.$$applyAsyncQueue.shift()();
      } catch (e) {
        console.error(e);
      }
    }
    this.$$applyAsyncId = null;
  };


  Scope.prototype.$applyAsync = function(expr) {
    var self = this;
    self.$$applyAsyncQueue.push(function() {
      self.$eval(expr);
    });
    // applyAsyncId keeps track of whether a setTimeout to drain the queue
    // has been scheduled.
    if (self.$$applyAsyncId === null) {
      self.$$applyAsyncId = setTimeout(function() {
        self.$apply(_.bind(self.$$flushApplyAsync, self));
      }, 0);
    }
  };

  Scope.prototype.$$postDigest = function(fn) {
    this.$$postDigestQueue.push(fn);
  };



module.exports = Scope;









//
