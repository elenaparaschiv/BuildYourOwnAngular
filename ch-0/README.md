# Build Your Own AngularJS

```
## $watch and $digest
**Watch**
Definition: with $watch you can attach a watcher to a scope.
        A watcher is something that is notified when a change occurs on the scope

Watcher Signature: To create it, call $watch() with 2 arguments:
            > a watch function, which specifices the piece of data you're interested in.
            > a listener func, which will be called whenever data changes.

!Note: As Angular user, you specify **watch expression** instead, like "user.firstName", which
is specify in a data binding, a directive attribute or in JS code. It is parsed and compiled
into a watch func by Angular internally.
--------------------------
**Digest**
$digest function iterates over all watchers attached to scope, and runs their watch and listener func
accordingly.
```

```
Side examples to understands test> Watching Obj Props: $watch& digest
var storageArray = [];

function laPiata (mere, pere) {
	var cumparaturi = {
		mere: mere,
		pere: pere
	}
	storageArray.push(cumparaturi);
}

```
