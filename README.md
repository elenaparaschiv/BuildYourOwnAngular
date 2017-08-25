# Build Your Own AngularJS

This repository contains the AngularJS implementation built during the course of the book [Build Your Own AngularJS](http://teropa.info/build-your-own-angular), as well as the errata for the book.

## Code

```

## Chapter 1.1: $watch and $digest
**Watch**
Definition: with $watch you can attach a watcher to a scope.
        A watcher is something that is notified when a change occurs on the scope

Watcher Signature: To create it, call $watch() with 2 arguments:
            > a watch func, which specifices the piece of data you're interested in.
            > a listener func, which will be called whenever data changes.

!Note: As Angular user, you specify **watch expression** instead, like "user.firstName", which
is specify in a data binding, a directive attribute or in JS code. It is parsed and compiled
into a watch func by Angular internally.
--------------------------
**Digest**
$digest function iterates over all watchers attached to scope, and runs their watch and listener func
accordingly.
```
