# Build Your Own AngularJS

This repository contains the AngularJS implementation built during the course of the book [Build Your Own AngularJS](http://teropa.info/build-your-own-angular), as well as the errata for the book.

## Code

## Chapter 1.19 Watching several changes with one listener $watchGroup
$eval - some piece of code deals specifically with the contents of a scope

$apply - the standard way to include external libraries to Angular  
        - It takes a func as an argument,
          it executes it using $eval
          kickstarts $digest cycle

It is preferable to asynchronously execute code within a digest, using $applyAsync

$evalAsync - should check if a digest is already ongoing. (using phase)
            - can defer work from inside a digest or from  !!outside one(designed for this)

$applyAsync - it evaluates the given function and launches the digest, after a short period of time

$$postDigest- schedules a fn to run later, after the next digest has finished
  !Observation:
  $evalAsync and $applyAsync cause a digest to be scheduled
  scheduling a $$postDigest does not cause a digest to be scheduled,
  so the fn execution is delayed until the digest happens for some other reason.

  Exception Handling:
