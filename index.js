const parser = require('./parser')
const fs = require('fs')
const path = require('path')

const codes = fs.readFileSync(path.join(__dirname, 'demo.ms'), { encoding: 'utf-8' })
const codeLines = codes.split(/[\r\n]/).filter(item => item != '').map(item => item.trim()).map(item => item.replace(/\s+/, ' '))

const result = codeLines.map(item => {
    try {
        const ast = parser.parse(item)
        if (ast.type == 'defineVariable') {
            return `const ${ast.variableName} = ${ast.variableValue};`
        } else {
            return '// no output'
        }
    } catch (err) {
        console.log(err.message)
        return '// error output'
    }
})

fs.writeFileSync(path.join(__dirname, 'demo.out.js'), result.join('\n'), { encoding: 'utf-8' })