# Build Your Own AngularJS

This repository contains the AngularJS implementation built during the course of the book [Build Your Own AngularJS](http://teropa.info/build-your-own-angular), as well as the errata for the book.

## Code

## Chapter 1.16 Running Code After a Digest - $$postDigest
One more way to attach code to run in relation to digest cycle, by scheduling a $$postDigest function.

Just like $evalAsync and $applyAsync, $postDigest schedules a function to run "later".
Specifically, the function will be run after the next digest has finished.

Like $evalAsync, a fn executed with $$postDigest is executed just once.

Unlike $evalAsync or $applyAsync,
scheduling a $$postDigest fn does not cause a digest to be scheduled,
so the fn execution is delayed until the digest happens for some other reason.
