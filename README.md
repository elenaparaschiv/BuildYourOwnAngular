# Build Your Own AngularJS

This repository contains the AngularJS implementation built during the course of the book [Build Your Own AngularJS](http://teropa.info/build-your-own-angular), as well as the errata for the book.

## Code

## Chapter 2 - Scope inheritance

- [x] 1.The Root Scope
- [x] 1.Making a Child Scope

#Notes:

Uses JS prototype inheritance:
```
Scope.prototype.$new = function() {
  var ChildScope = function() { };
  ChildScope.prototype = this;
  var child = new ChildScope();
  return child;
};
```
