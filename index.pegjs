{
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
}

Expression
= program:DefVariable {
    return program
}

DefVariable
= "def" __ name:VariableName _ "=" _ value:Value _  {
    return {
        type:"defineVariable",
        variableName:name,
        variableValue:value
    }
}

_
= Ws* {
    return " "
}

__
= Ws+ {
    return " "
}

Ws
= [ \r\n\t]



VariableName
= header:VariableNameWithoutNumber nameBody:(VariableNameWithoutNumber/[0-9])*{
    return header+nameBody.join("")
}

VariableNameWithoutNumber
= "$"/"_"/[a-zA-Z]

Value 
= NumberValue
/ BoolValue
/ NilValue
/ UnitValue
/ StringValue
/ RefConst

NumberValue
= sign:SignBit? intValue:[0-9]+ floatValue:FloatNumber?{
    const outSign = parseSignBit(sign)
    const outValue =  outSign+intValue.join("")+(floatValue?floatValue:"")
    if (isInt(outValue)) {
        return outValue+'|0'
    }else {
        return outValue
    }
}

SignBit
= [-+]

FloatNumber
= "." value:[0-9]+ {
    const valueStr = value.join("")
    const valueNum = parseInt(valueStr,10)
    if (valueNum>0) {
        return '.'+valueStr
    } else {
        return ''
    }
}

BoolValue
= TrueValue
/ FalseValue

TrueValue
= "true"

FalseValue
= "false"

NilValue
= "nil" {
    return 'null'
}

UnitValue
= "unit" {
    return 'void 0'
}

StringValue
= Quote value:(Anything*) Quote {
    return '"'+value.join('')+'"'
}

Quote
= '"'

Anything
= Unescaped
/ Escape
    sequence:(
        '"'
      / "\\"
      / "/"
      / "b" { return "\b"; }
      / "f" { return "\f"; }
      / "n" { return "\n"; }
      / "r" { return "\r"; }
      / "t" { return "\t"; }
      / "u" digits:$(HEXDIG HEXDIG HEXDIG HEXDIG) {
          return String.fromCharCode(parseInt(digits, 16));
        }
    )
    { return sequence; }

Unescaped
= [^\0-\x1F\x22\x5C]

Escape
= "\\"

HEXDIG
= [0-9a-f]i

RefConst 
= value:VariableName {
    return "$:"+value
}