const Lexer = require('./lexer.js')
const Parser = require('./parser.js')
const Intepreter = require('./interpreter.js')
const Context = require('./interpreter_classes/context.js')

class Language{
    constructor(file_name, text){
        this.file_name = file_name
        this.text = text
    }

    run(){
        //Generate tokens
        let lexer = new Lexer(this.file_name, this.text)
        let lex_result = lexer.lex()
        let tokens = lex_result[0]
        let error = lex_result[1]
        if(error){
            return [null, error]
        }

        //Generate Abstract Syntax Tree
        let parser = new Parser(tokens)
        let ast = parser.parse()
        if(ast.error){
            return [null, ast.error]
        }

        let interpreter = new Intepreter()
        let context = new Context('<shell>')
        let result = interpreter.visit(ast.node, context)

        return [result.value, result.error]
    }
    }

module.exports = Language