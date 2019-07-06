# mocha-md
Write mocha tests in markdown

## Install

```
$ npm install -g mocha-md
```

## Usage

Put you markdown test files under `test/`.
Run `$ mocha-md`.

Test files will be transpiled to js, placed under `.test/` and mocha will be run against them.

## Tests syntax

### Initialization

Add any initialization code in a code block before any test.

### describe()

Headings are used to `describe()` a set of tests. Deeper level headings will result in nesting:

    # Arrays
    
    ## #indexOf()

Will result in

    describe("Arrays", function() {
      describe("#indexOf()", function() {});
    });

### it()

Paragraphs followed by a code block will translate to individual tests:

    should return -1 when value is not present
    
    ```js
    assert.equal(-1, [1,2,3].indexOf(4));
    ```

Will result in:

    it("should return -1 when value is not present", function() {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });

You can set before, after, beforeEach, afterEach, only and skip like this:

    (before) initialize some extra stuff
    
    ```js
    var ok = true;
    ```

Resulting in:

    before("initialize some extra stuff", function() {
      var ok = true;
    });

#### Async tests

You can set (async) to add a `done` callback argument to the test:

    (async) should return -1 when value is not present
    
    ```js
    setTimeout(() => {
      assert.equal(-1, [1,2,3].indexOf(4));
      assert.equal(-1, [1,2,3].indexOf(4));
      done()
    }, 10);
    ```

Resulting in:

    it("should return -1 when value is not present", function(done) {
      setTimeout(() => {
        assert.equal(-1, [1, 2, 3].indexOf(4));
        assert.equal(-1, [1, 2, 3].indexOf(4));
        done();
      }, 10);
    });

You can combine (async) with other flags like this:

    (beforeEach) (async) initialize test
    
    ```js
    "before every test";
    done();
    ```

Result:

    beforeEach(function(done) {
      "before every test";
      done();
    });
