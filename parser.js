/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */

"use strict";

function peg$subclass(child, parent) {
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message  = message;
  this.expected = expected;
  this.found    = found;
  this.location = location;
  this.name     = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return "\"" + literalEscape(expectation.text) + "\"";
        },

        "class": function(expectation) {
          var escapedParts = "",
              i;

          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array
              ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
              : classEscape(expectation.parts[i]);
          }

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },

        any: function(expectation) {
          return "any character";
        },

        end: function(expectation) {
          return "end of input";
        },

        other: function(expectation) {
          return expectation.description;
        }
      };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/"/g,  '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/-/g,  '\\-')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i, j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},

      peg$startRuleFunctions = { Expression: peg$parseExpression },
      peg$startRuleFunction  = peg$parseExpression,

      peg$c0 = function(program) {
          return program
      },
      peg$c1 = "def",
      peg$c2 = peg$literalExpectation("def", false),
      peg$c3 = "=",
      peg$c4 = peg$literalExpectation("=", false),
      peg$c5 = function(name, value) {
          return {
              type:"defineVariable",
              variableName:name,
              variableValue:value
          }
      },
      peg$c6 = function() {
          return " "
      },
      peg$c7 = /^[ \r\n\t]/,
      peg$c8 = peg$classExpectation([" ", "\r", "\n", "\t"], false, false),
      peg$c9 = /^[0-9]/,
      peg$c10 = peg$classExpectation([["0", "9"]], false, false),
      peg$c11 = function(header, nameBody) {
          return header+nameBody.join("")
      },
      peg$c12 = "$",
      peg$c13 = peg$literalExpectation("$", false),
      peg$c14 = "_",
      peg$c15 = peg$literalExpectation("_", false),
      peg$c16 = /^[a-zA-Z]/,
      peg$c17 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false),
      peg$c18 = function(sign, intValue, floatValue) {
          const outSign = parseSignBit(sign)
          const outValue =  outSign+intValue.join("")+(floatValue?floatValue:"")
          if (isInt(outValue)) {
              return outValue+'|0'
          }else {
              return outValue
          }
      },
      peg$c19 = /^[\-+]/,
      peg$c20 = peg$classExpectation(["-", "+"], false, false),
      peg$c21 = ".",
      peg$c22 = peg$literalExpectation(".", false),
      peg$c23 = function(value) {
          const valueStr = value.join("")
          const valueNum = parseInt(valueStr,10)
          if (valueNum>0) {
              return '.'+valueStr
          } else {
              return ''
          }
      },
      peg$c24 = "true",
      peg$c25 = peg$literalExpectation("true", false),
      peg$c26 = "false",
      peg$c27 = peg$literalExpectation("false", false),
      peg$c28 = "nil",
      peg$c29 = peg$literalExpectation("nil", false),
      peg$c30 = function() {
          return 'null'
      },
      peg$c31 = "unit",
      peg$c32 = peg$literalExpectation("unit", false),
      peg$c33 = function() {
          return 'void 0'
      },
      peg$c34 = function(value) {
          return '"'+value.join('')+'"'
      },
      peg$c35 = "\"",
      peg$c36 = peg$literalExpectation("\"", false),
      peg$c37 = "\\",
      peg$c38 = peg$literalExpectation("\\", false),
      peg$c39 = "/",
      peg$c40 = peg$literalExpectation("/", false),
      peg$c41 = "b",
      peg$c42 = peg$literalExpectation("b", false),
      peg$c43 = function() { return "\b"; },
      peg$c44 = "f",
      peg$c45 = peg$literalExpectation("f", false),
      peg$c46 = function() { return "\f"; },
      peg$c47 = "n",
      peg$c48 = peg$literalExpectation("n", false),
      peg$c49 = function() { return "\n"; },
      peg$c50 = "r",
      peg$c51 = peg$literalExpectation("r", false),
      peg$c52 = function() { return "\r"; },
      peg$c53 = "t",
      peg$c54 = peg$literalExpectation("t", false),
      peg$c55 = function() { return "\t"; },
      peg$c56 = "u",
      peg$c57 = peg$literalExpectation("u", false),
      peg$c58 = function(digits) {
                return String.fromCharCode(parseInt(digits, 16));
              },
      peg$c59 = function(sequence) { return sequence; },
      peg$c60 = /^[^\0-\x1F"\\]/,
      peg$c61 = peg$classExpectation([["\0", "\x1F"], "\"", "\\"], true, false),
      peg$c62 = /^[0-9a-f]/i,
      peg$c63 = peg$classExpectation([["0", "9"], ["a", "f"]], false, true),
      peg$c64 = function(value) {
          return "$:"+value
      },

      peg$currPos          = 0,
      peg$savedPos         = 0,
      peg$posDetailsCache  = [{ line: 1, column: 1 }],
      peg$maxFailPos       = 0,
      peg$maxFailExpected  = [],
      peg$silentFails      = 0,

      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos], p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line:   details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails   = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line:   startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line:   endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parseExpression() {
    var s0, s1;

    s0 = peg$currPos;
    s1 = peg$parseDefVariable();
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c0(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseDefVariable() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 3) === peg$c1) {
      s1 = peg$c1;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c2); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse__();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseVariableName();
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 61) {
              s5 = peg$c3;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c4); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseValue();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c5(s3, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parse_() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseWs();
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parseWs();
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c6();
    }
    s0 = s1;

    return s0;
  }

  function peg$parse__() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseWs();
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseWs();
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c6();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseWs() {
    var s0;

    if (peg$c7.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c8); }
    }

    return s0;
  }

  function peg$parseVariableName() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseVariableNameWithoutNumber();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseVariableNameWithoutNumber();
      if (s3 === peg$FAILED) {
        if (peg$c9.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c10); }
        }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parseVariableNameWithoutNumber();
        if (s3 === peg$FAILED) {
          if (peg$c9.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c10); }
          }
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c11(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseVariableNameWithoutNumber() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 36) {
      s0 = peg$c12;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c13); }
    }
    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 95) {
        s0 = peg$c14;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c15); }
      }
      if (s0 === peg$FAILED) {
        if (peg$c16.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c17); }
        }
      }
    }

    return s0;
  }

  function peg$parseValue() {
    var s0;

    s0 = peg$parseNumberValue();
    if (s0 === peg$FAILED) {
      s0 = peg$parseBoolValue();
      if (s0 === peg$FAILED) {
        s0 = peg$parseNilValue();
        if (s0 === peg$FAILED) {
          s0 = peg$parseUnitValue();
          if (s0 === peg$FAILED) {
            s0 = peg$parseStringValue();
            if (s0 === peg$FAILED) {
              s0 = peg$parseRefConst();
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseNumberValue() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseSignBit();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c9.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c10); }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c9.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c10); }
          }
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseFloatNumber();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c18(s1, s2, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseSignBit() {
    var s0;

    if (peg$c19.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c20); }
    }

    return s0;
  }

  function peg$parseFloatNumber() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 46) {
      s1 = peg$c21;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c22); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c9.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c10); }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c9.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c10); }
          }
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c23(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseBoolValue() {
    var s0;

    s0 = peg$parseTrueValue();
    if (s0 === peg$FAILED) {
      s0 = peg$parseFalseValue();
    }

    return s0;
  }

  function peg$parseTrueValue() {
    var s0;

    if (input.substr(peg$currPos, 4) === peg$c24) {
      s0 = peg$c24;
      peg$currPos += 4;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c25); }
    }

    return s0;
  }

  function peg$parseFalseValue() {
    var s0;

    if (input.substr(peg$currPos, 5) === peg$c26) {
      s0 = peg$c26;
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c27); }
    }

    return s0;
  }

  function peg$parseNilValue() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 3) === peg$c28) {
      s1 = peg$c28;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c29); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c30();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseUnitValue() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 4) === peg$c31) {
      s1 = peg$c31;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c32); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c33();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseStringValue() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseQuote();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseAnything();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parseAnything();
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseQuote();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c34(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseQuote() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 34) {
      s0 = peg$c35;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c36); }
    }

    return s0;
  }

  function peg$parseAnything() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

    s0 = peg$parseUnescaped();
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parseEscape();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 34) {
          s2 = peg$c35;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c36); }
        }
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 92) {
            s2 = peg$c37;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c38); }
          }
          if (s2 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 47) {
              s2 = peg$c39;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c40); }
            }
            if (s2 === peg$FAILED) {
              s2 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 98) {
                s3 = peg$c41;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c42); }
              }
              if (s3 !== peg$FAILED) {
                peg$savedPos = s2;
                s3 = peg$c43();
              }
              s2 = s3;
              if (s2 === peg$FAILED) {
                s2 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 102) {
                  s3 = peg$c44;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c45); }
                }
                if (s3 !== peg$FAILED) {
                  peg$savedPos = s2;
                  s3 = peg$c46();
                }
                s2 = s3;
                if (s2 === peg$FAILED) {
                  s2 = peg$currPos;
                  if (input.charCodeAt(peg$currPos) === 110) {
                    s3 = peg$c47;
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c48); }
                  }
                  if (s3 !== peg$FAILED) {
                    peg$savedPos = s2;
                    s3 = peg$c49();
                  }
                  s2 = s3;
                  if (s2 === peg$FAILED) {
                    s2 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 114) {
                      s3 = peg$c50;
                      peg$currPos++;
                    } else {
                      s3 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c51); }
                    }
                    if (s3 !== peg$FAILED) {
                      peg$savedPos = s2;
                      s3 = peg$c52();
                    }
                    s2 = s3;
                    if (s2 === peg$FAILED) {
                      s2 = peg$currPos;
                      if (input.charCodeAt(peg$currPos) === 116) {
                        s3 = peg$c53;
                        peg$currPos++;
                      } else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c54); }
                      }
                      if (s3 !== peg$FAILED) {
                        peg$savedPos = s2;
                        s3 = peg$c55();
                      }
                      s2 = s3;
                      if (s2 === peg$FAILED) {
                        s2 = peg$currPos;
                        if (input.charCodeAt(peg$currPos) === 117) {
                          s3 = peg$c56;
                          peg$currPos++;
                        } else {
                          s3 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c57); }
                        }
                        if (s3 !== peg$FAILED) {
                          s4 = peg$currPos;
                          s5 = peg$currPos;
                          s6 = peg$parseHEXDIG();
                          if (s6 !== peg$FAILED) {
                            s7 = peg$parseHEXDIG();
                            if (s7 !== peg$FAILED) {
                              s8 = peg$parseHEXDIG();
                              if (s8 !== peg$FAILED) {
                                s9 = peg$parseHEXDIG();
                                if (s9 !== peg$FAILED) {
                                  s6 = [s6, s7, s8, s9];
                                  s5 = s6;
                                } else {
                                  peg$currPos = s5;
                                  s5 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s5;
                              s5 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                          }
                          if (s5 !== peg$FAILED) {
                            s4 = input.substring(s4, peg$currPos);
                          } else {
                            s4 = s5;
                          }
                          if (s4 !== peg$FAILED) {
                            peg$savedPos = s2;
                            s3 = peg$c58(s4);
                            s2 = s3;
                          } else {
                            peg$currPos = s2;
                            s2 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s2;
                          s2 = peg$FAILED;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c59(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parseUnescaped() {
    var s0;

    if (peg$c60.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c61); }
    }

    return s0;
  }

  function peg$parseEscape() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 92) {
      s0 = peg$c37;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c38); }
    }

    return s0;
  }

  function peg$parseHEXDIG() {
    var s0;

    if (peg$c62.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c63); }
    }

    return s0;
  }

  function peg$parseRefConst() {
    var s0, s1;

    s0 = peg$currPos;
    s1 = peg$parseVariableName();
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c64(s1);
    }
    s0 = s1;

    return s0;
  }


      function parseSignBit(sign) {
          if (!sign) {
              return ''
          }
          if (sign == '-') {
              return '-'
          }
          return ''
      }
      function isInt(value) {
          return (value+'').indexOf('.')<0
      }


  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse:       peg$parse
};
