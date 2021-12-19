import Lexer from './lexer.js'
import Parser from './parser.js'

export default class Language{
    constructor(file_name, text){
        this.file_name = file_name
        this.text = text
    }

    run(){
        //Generate tokens
        let lexer = new Lexer(this.file_name, this.text)
        let tokens_and_error = lexer.lex()
        let tokens = tokens_and_error[0]
        let error = tokens_and_error[1]

        //Generate Abstract Syntax Tree
        let parser = new Parser(tokens)
        let ast = parser.parse()

        return ast
    }
    }