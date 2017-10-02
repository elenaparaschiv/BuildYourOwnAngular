# Build Your Own AngularJS

This repository contains the AngularJS implementation built during the course of the book [Build Your Own AngularJS](http://teropa.info/build-your-own-angular), as well as the errata for the book.

## Code

## Chapter 1.15 Coallescing $apply Invocations - $applyAsync

$evalAsync use cases: - defer work from inside a digest, (X)
                      - or from outside a digest.

The digest-launching setTimeout call  prevents confusion if someone calls $evalAsync from outside a digest.

For use case of $applying a function from outside a digest loop asynchronously, there is $applyAsync.
Purpose: similar to $apply > Integrate code that's not aware of Angular digest cycle.
         unlike $apply     > does not evaluate the given func immediately
                             does not launch digest immediately.


$applyAsync: useful for anything that benefits from coalescing digests. (i.e. coallescing HTTP responses in a single $digest).                            
