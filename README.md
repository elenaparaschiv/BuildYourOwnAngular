# Build Your Own AngularJS

This repository contains the AngularJS implementation built during the course of the book [Build Your Own AngularJS](http://teropa.info/build-your-own-angular), as well as the errata for the book.

## Code



## Chapter 1.8
__Value-Based Dirty-Checking__

Detect when something inside an object or an array changes.
Watch for changes in value, not just in reference.
By providing an optional boolean flag to the $watch function.
When the flag is true, value-based checking is used.


// In order to notice changes in values, we also need to change the way we store the old value for each watcher.
It isn;t enough to just store a reference to the current val, bcs any changes made within the val will also be applied to the ref we're holding.
We would never notice any changes since essetially $$areEqual would always get 2 references to the same val.
For this reason we need to make a deep copy of the value and store that instead.

// We update $digestOnce, so that it uses the new $$areEqual function, and also copies the last ref if needed.
