# Build Your Own AngularJS

This repository contains the AngularJS implementation built during the course of the book [Build Your Own AngularJS](http://teropa.info/build-your-own-angular), as well as the errata for the book.

## Code

## Chapter 1.12 evalAsync - Deferred Execution
Integrate the delayed function to the digest cycle with $apply.
$evalAsync
  input: takes a function and schedules it to run later bust still during the ongoing digest.
You can for example, defer some code from within a watch listenerFn, knowing that while the code is deferred, it'll still be invoked within the current digest iteration.

Reason why use $evalAsync instead of setTimeOut():
  Dont let the browser render DOM changes that are going to be immediately overridden anyway.
