# Build Your Own AngularJS

This repository contains the AngularJS implementation built during the course of the book [Build Your Own AngularJS](http://teropa.info/build-your-own-angular), as well as the errata for the book.

## Code


```

## Chapter 1.7
__Short Circuiting The Digest When the Last Watch is clean__

Keep track of he last watch we have seen that it was dirty.
When we encounter a clean watch, we check whether it's also the last watch we have seen it was dirty.
If so, a full round passed where no watch has been dirty.
exit the current round







```
>>>>>>> remotes/origin/1.5digestGoingAndDirty
