var assert = require("assert");
var someInitialization = true;
beforeEach(function() {
  "before every test";
});

describe("Arrays", function() {
  describe("#indexOf()", function() {
    before("initialize some extra stuff", function() {
      var ok = true;
    });

    beforeEach(function(done) {
      var ok = true;
      done();
    });

    it.skip("should return -1 when value is not present", function() {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });

    describe.only("#indexOf()", function() {
      it("should return -1 when value is not present", function(done) {
        setTimeout(() => {
          assert.equal(-1, [1, 2, 3].indexOf(4));
          assert.equal(-1, [1, 2, 3].indexOf(4));
          done();
        }, 10);
      });
    });
    describe("Pending", function() {
      it("should write this pending test");
    });
  });
});
