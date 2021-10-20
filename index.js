const parser = require('./parser')
const fs = require('fs')
const path = require('path')

const codes = fs.readFileSync(path.join(__dirname, 'demo.ms'), { encoding: 'utf-8' })
const codeLines = codes.split(/[\r\n]/).filter(item => item != '').map(item => item.trim()).map(item => item.replace(/\s+/g, ' '))

const scopeSave = {}

const result = codeLines.map(item => {
    try {
        const ast = parser.parse(item)
        if (ast.type == 'defineVariable') {
            scopeSave[ast.variableName] = ast.variableValue
            if (ast.variableValue.indexOf('$:') == 0) {
                scopeSave[ast.variableName] = scopeSave[ast.variableValue.replace('$:','')]
            }
            return `const ${ast.variableName} = ${scopeSave[ast.variableName]};`
        } else {
            return '// no output'
        }
    } catch (err) {
        console.log(err.message)
        return '// error output'
    }
})

const withScope = (codes)=>{
    return `
        ;(function() {
            ${codes}
        })()
    `.trim().replace(/\s+/g,' ')
}

fs.writeFileSync(path.join(__dirname, 'demo.out.js'), withScope(result.join('\n')), { encoding: 'utf-8' })