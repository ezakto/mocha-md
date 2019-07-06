```js
var assert = require('assert');
var someInitialization = true;
```

(beforeEach)

```js
'before every test'
```

# Arrays

## #indexOf()

(before) initialize some extra stuff

```js
var ok = true;
```

(beforeEach) (async)

```js
var ok = true; done();
```

(skip) should return -1 when value is not present

```js
assert.equal(-1, [1,2,3].indexOf(4));
```

##### (only) #indexOf()

(async) should return -1 when value is not present

```js
setTimeout(() => {
assert.equal(-1, [1,2,3].indexOf(4));
assert.equal(-1, [1,2,3].indexOf(4));
done()
}, 10);
```

### Ok

Should fuck everything that is able to walk

```js
return Promise.resolve('la concha de la lora y la puta madre()');
```

should write this pending test
