var analyzer = require('./analyzer');
var hasTooManyParams = analyzer.hasTooManyParams;
var hasFunctionCallWithBoolean = analyzer.hasFunctionCallWithBoolean;
var isDuplicatedCode = analyzer.isDuplicatedCode;

describe('long param list', function() {
  describe('should not warn', function() {
    it('for one parameter', function() {
      function tooManyParams(param1) {}
      var sourceCode = tooManyParams.toString();
      expect(hasTooManyParams(sourceCode)).toBe(false);
    });
    it('for three parameter', function() {
      function tooManyParams(param1, param2, param3) {}
      var sourceCode = tooManyParams.toString();
      expect(hasTooManyParams(sourceCode)).toBe(false);
    });
  });

  it('should warn at more than three', function() {
    function tooManyParams(param1, param2, param3, param4, param5) {}
    var sourceCode = tooManyParams.toString();
    expect(hasTooManyParams(sourceCode)).toBe(true);
  });
});

describe('boolean trap', function() {
  it('should not warn about functions called with an integer', function() {
    function funcCalledWithTrue() {
      someFunc(1);
    }
    var sourceCode = funcCalledWithTrue.toString();
    expect(hasFunctionCallWithBoolean(sourceCode)).toBe(false);
  });

  it('should warn about functions called with true', function() {
    function funcCalledWithTrue() {
      someFunc(true);
    }
    var sourceCode = funcCalledWithTrue.toString();
    expect(hasFunctionCallWithBoolean(sourceCode)).toBe(true);
  });
  xit('should warn about functions called with true as second param', function() {
    function funcCalledWithTrue() {
      someFunc(1, true);
    }
    var sourceCode = funcCalledWithTrue.toString();
    expect(hasFunctionCallWithBoolean(sourceCode)).toBe(true);
  });
});


describe('code duplication', function() {

  function someFunc() {
    if (something==somethingElse) {
      return that;
    }
    anotherFunc(true);
  }

  describe('duplicate code', function() {

    xit('should find same code paths', function() {
      var sourceCode = someFunc.toString();
      expect(isDuplicatedCode(sourceCode, sourceCode))
        .toBe(true);
    });
    xit('should find same structured code paths', function() {
      function sameStructuredFunc() {
        if (x==y) return a;
        someFunc(true);
      }
      expect(isDuplicatedCode(someFunc.toString(), sameStructuredFunc.toString()))
        .toBe(true);
    });

  });

  describe('alike code', function() {

    xit('should warn about alike code', function() {
      function alikeStructuredFunc() {
        if (x==y && somethingElse) return a;
        someFunc(true);
      }
      expect(isAlikeCode(someFunc.toString(), alikeStructuredFunc.toString()))
        .toBe(true);
    });

  });
});
