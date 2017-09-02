# Build Your Own AngularJS

This repository contains the AngularJS implementation built during the course of the book [Build Your Own AngularJS](http://teropa.info/build-your-own-angular), as well as the errata for the book.

## Code

```

## Chapter 1.5
__Keeping The Digest Going While It Stays Dirty __
There is a scenario we are not supporting yet:
  > The listener functions may also change properties on the scope.
  If this happens && there is another watcher looking at the property
  that just changed:
   ! it might not notice the change during the same
  digest pass

  In this  example there are 2 watches:
    1. one watches the _nameUpper_ property and assigns /initial/ based on that
    2. the other watches the _name_ property and assigns /nameUpper/ based on that

  What we expect to happen:
    When the name on the scope changes, the /nameUpper/ and /initial/ attributes
    are updated accordingly during the digest.
    This does not happen!

    Why?
    Because we are deliberately ordering watches so that the dependent one is registered first. Otherwise, if the order was reversed, the test would pass because the watches would be in the right order.

    ! Takeaway Nugget:We will see further that dependencies between watches do not rely on their registration order.

    What we need to do is to:
    modify the digest, so that it keeps iterating over all watches until the watched values stop changing. So, doing multiple passes is the only way we can get changes applied for watchers that rely on other watchers.
    Steps:
      1. rename current $digest to $digestOnce, and adjust so that:
        * it runs all the watchers once  +  
        * returns a Boolean value that determines whether
        there were any changes or not.
      2. then, let's redefine $digest so that it runs the "outer loop", calling
       $$digestOnce as long as changes keep occurring.

! Angular scopes don't have a function called $$digestOnce.
Instead the digest loops are all nested within $digest. For our explanation purposes, we extracted the inner loop to a function.

! Angular watch functions can be run many times per each digest pass.
watches should be idempotent, meaning it should have no side effects or only side effects that can happen any number of times.






```
