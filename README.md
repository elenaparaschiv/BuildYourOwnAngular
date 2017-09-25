# Build Your Own AngularJS

This repository contains the AngularJS implementation built during the course of the book [Build Your Own AngularJS](http://teropa.info/build-your-own-angular), as well as the errata for the book.

## Code

## Chapter 1.10 $eval Evaluating Code in the Context of a Scope

There are a few ways in which Angular lets you execute some code in the context of a scope.
Easiest: $eval
How it works :
Input:
  Parameters   
    It takes a function as an argument and immediately executes that function given 2 arguments:
      1st argument:  the scope itself
      2nd argument (optional ) -> it just pases as is to the function.
Output:
  whatever the function returned.
