const Lexer = require('./lexer.js')
const Parser = require('./parser.js')
const Intepreter = require('./interpreter.js')
const Context = require('./interpreter_classes/context.js')
const SymbolTable = require('./interpreter_classes/symbol_table.js')
const Number = require('./interpreter_classes/number.js')


let global_symbol_table = new SymbolTable()
global_symbol_table.set('null', new Number(0))
global_symbol_table.set('true', new Number(1, 'true'))
global_symbol_table.set('false', new Number(0, 'false'))
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
        context.symbol_table = global_symbol_table
        let result = interpreter.visit(ast.node, context)

        return [result.value, result.error]
    }
    }

module.exports = Language