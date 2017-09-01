# Build Your Own AngularJS

This repository contains the AngularJS implementation built during the course of the book [Build Your Own AngularJS](http://teropa.info/build-your-own-angular), as well as the errata for the book.

## Code

```

## Chapter 1.4
__Getting Notified of Digests __
To be notified whenever an Angular scope is digested, you can make use of the fact that each watch is executed during each digest. Just register a watch without a listener function.

Keep in mind that Angular will look at the return value of watchFn even when there is no listenerFn.
If you return a value, that value is subject to dirty-checking.
So just don't return anything in this pattern. In that case the value of the watch will be constantly undefined.

```
