# Build Your Own AngularJS

This repository contains the AngularJS implementation built during the course of the book [Build Your Own AngularJS](http://teropa.info/build-your-own-angular), as well as the errata for the book.

## Code

## Chapter 1.11 apply Integrating External Code with Digest Cycle
Definition : apply is the standard way to integrate external libraries to Angular.

Function signature:
  Input: takes a function as an argument
  Output: kickstarts the digest cycle by invoking digest.

Big idea of apply:
  We execute some code  that isn't aware of Angular.
  The code may still change things on the scope.
  & as long as we wrap the code in $apply, we can be sure that
  any watches on the scope will pick up on those changes.

  = this process is also knows as integrating code to angular lifecycle.
  
