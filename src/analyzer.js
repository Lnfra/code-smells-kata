var esprima = require('esprima');
var estraverse = require('estraverse');

function hasTooManyParams(sourceCode) {
  var ast = esprima.parse(sourceCode);

  var paramLength = 0;
  estraverse.traverse(ast, {
      enter: function (node) {
        if (node.type == esprima.Syntax.FunctionDeclaration) {
          paramLength = node.params.length;
        }
      }
  });
  return paramLength > 3;
}

function hasFunctionCallWithBoolean(sourceCode) {
  var ast = esprima.parse(sourceCode);

  var isBooleanTrapCall = false;
  estraverse.traverse(ast, {
      enter: function (node) {
        if (node.type == esprima.Syntax.CallExpression) {
          isBooleanTrapCall = typeof node.arguments[0].value == 'boolean';
        }
      }
  });
  return isBooleanTrapCall;
}

function isDuplicatedCode(sourceCode1, sourceCode2) {
}

module.exports = {
  hasTooManyParams: hasTooManyParams,
  hasFunctionCallWithBoolean: hasFunctionCallWithBoolean,
  isDuplicatedCode: isDuplicatedCode
};
