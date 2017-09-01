# Build Your Own AngularJS

This repository contains the AngularJS implementation built during the course of the book [Build Your Own AngularJS](http://teropa.info/build-your-own-angular), as well as the errata for the book.

## Code

```

## Chapter 1.2
__Checking for Dirty Values__
Inside the watch func we pass in the scope
  > watch: func(scope) {}
Why? For accessability Watch func returns the data we are interested in.That data is usually on the scope

The job of the $digest function:
  call the watch function and compare its return value to whatever the same function returned last time.
    > if the values differ, the watcher is dirty and its listener function should be called.

// a new this case
https://alistapart.com/article/getoutbindingsituations
Gains: "binding loss"
 How :referencing a method, i.e. var fx = john.greet; fx("whatever")
 Troubles: the method loses its implicit binding and this goes back to the default window case.




```
