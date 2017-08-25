'use strict';
var Scope = require('../src/scope');

describe('Scope', function() {
  it('can be constructed and used as an object', function() {
    var scope = new Scope();
    scope.aProperty = 1;

    expect(scope.aProperty).toBe(1);
  });

// Test:
// assert that you can register a watcher using $watch
// and that the watcher's listener func is invoked when smn calls $digest.

describe('digest', function() {

  var scope;

  beforeEach(function() {
    scope = new Scope();
  });

  it('calls the listener of a watch on first $digest',function() {
    var watchFn = function() { return 'wat'; };
    // as the listenerFn we provide a jasmine spy, which is a mock func
    // Why we do this: bcs it is convinient to see if the func was called
    var listenerFn = jasmine.createSpy();
    scope.$watch(watchFn, listenerFn);

    scope.$digest();

    expect(listenerFn).toHaveBeenCalled();
  });


});

});
