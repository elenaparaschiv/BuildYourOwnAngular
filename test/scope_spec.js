'use strict';

var Scope = require('../src/scope');

describe('Scope', function() {

  it('can be constructed and used as an object', function() {
    var scope = new Scope();
    scope.aProperty = 1;

    expect(scope.aProperty).toBe(1);
  });

// you can register a watcher using $watch
// the watcher's listener function is invoked when someone calls $digest.
  describe('digest', function() {

    var scope;

    beforeEach(function() {
      scope = new Scope();
    });

    it('on first $digest, it calls the listener function of a watch ', function() {
      var watchFn = function() { return 'wat'; };
      var listenerFn = jasmine.createSpy();
      scope.$watch(watchFn, listenerFn);

      scope.$digest();

      expect(listenerFn).toHaveBeenCalled();
    });


// check if the values specified by the watch functions have changed,
// only then call the respective listener functions.
// To accomplish this:

// We know:
// watch functions should return piece of data whose changes interest us
// that piece of data stays on the scope > >
// > to access scope easier, we pass it as an argument to a watch function,
// so that the watch func may easily grab and return smth from the scope.

// check that the scope is provided as an argument to the watch function

    it('calls the watch function with the scope as the argument', function() {
      var watchFn = jasmine.createSpy();
      var listenerFn = function() {};
      scope.$watch(watchFn, listenerFn);

      scope.$digest();
      expect(watchFn).toHaveBeenCalledWith(scope);
    });


// What we want:
// !$digest function's job is to call the watch func and
// compare its return value to whatever the same func returned last time.
// If values differ, the watcher is dirty and its listener func should be called.

  it('calls the listener func when the watched value changes', function() {
    scope.someValue = 'a';
    scope.counter = 0;

    scope.$watch(
      function(scope) { return scope.someValue; },
      function(newValue, oldValue, scope) { scope.counter++; }
    );

    expect(scope.counter).toBe(0);

    scope.$digest();
    expect(scope.counter).toBe(1);

    // if the value does not differ the listener should not be called
    scope.$digest();
    expect(scope.counter).toBe(1);

    scope.someValue = 'b';
    expect(scope.counter).toBe(1);

    scope.$digest();
    expect(scope.counter).toBe(2);
  });

  it('calls listener with new value as old value the first time', function() {
    scope.someValue = 123;
    var oldValueGiven;

    scope.$watch(
      function(scope) { return scope.someValue; },
      function(newValue, oldValue, scope) { oldValueGiven = oldValue; }
    );

    scope.$digest();
    expect(oldValueGiven).toBe(123);

  });

  // If you would like to be notified whenever an Angular scope is digested,
  // you can make use of the fact that watch is executed during each digest.
  // Just register a watch without a listener function.

  it('may have watches that omit the listener function', function() {
    var watchFn = jasmine.createSpy().and.returnValue('something');
    scope.$watch(watchFn);

    scope.$digest();

    expect(watchFn).toHaveBeenCalled();
  });

  // scenario we need to support:
  // the listener funcs may also change properties on the scope.
  // If this happens and there is another watcher looking at the
  // property that just changes, it might not notice the change during
  // the same digest pass.

  it('triggers chained watchers in the same digest', function() {
    scope.name = 'Jane';

    scope.$watch(
      function(scope) { return scope.nameUpper; },
      function(newValue, oldValue, scope) {
        if(newValue) {
          scope.initial = newValue.substring(0, 1) + '.';
        }
      }
    );

    scope.$watch(
      function(scope) {  return scope.name; },
      function(newValue, oldValue, scope) {
        if(newValue) {
          scope.nameUpper = newValue.toUpperCase();
        }
      }
    );

    scope.$digest();
    expect(scope.initial).toBe('J.');

    scope.name = 'Bob';
    scope.$digest();
    expect(scope.initial).toBe('B.');

  });










  });

});
