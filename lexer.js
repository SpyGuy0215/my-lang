/*
import Position from './lexer_classes/position.js'
import Token from './lexer_classes/token.js'
import { IllegalCharError } from './error.js'
*/ 

const Position = require('./lexer_classes/position.js')
const Token = require('./lexer_classes/token.js')
const { IllegalCharError } = require('./error.js')
const TT = require('./constants.js')

class Lexer{
    constructor(file_name, text){
        this.file_name = file_name
        this.text = text
        this.pos = new Position(-1, 0, -1, file_name, text)
        this.current_char = null
        this.advance()
    }

    advance(){
        this.pos.advance(this.current_char)
        if(this.pos.idx < this.text.length){
            this.current_char = this.text[this.pos.idx]
        }
        else{
            this.current_char = null
        }
    }

    lex(){
        let tokens = []
        while(this.current_char != null){

            if([' ', '\t', '\n', '\r'].includes(this.current_char)){
                this.advance()
            }

            else if(TT.DIGITS.includes(this.current_char)){
                tokens.push(this.make_number())
            }
            else if(this.current_char == '+'){
                tokens.push(new Token(TT.TT_PLUS, undefined, this.pos))
                this.advance()
            }
            else if(this.current_char == '-'){
                tokens.push(new Token(TT.TT_MINUS, undefined, this.pos))
                this.advance()
            }
            else if(this.current_char == '*'){
                tokens.push(new Token(TT.TT_MUL, undefined, this.pos))
                this.advance()
            }
            else if(this.current_char == '/'){
                tokens.push(new Token(TT.TT_DIV, undefined, this.pos))
                this.advance()
            }
            else if(this.current_char == '^'){
                tokens.push(new Token(TT.TT_POW, undefined, this.pos))
                this.advance()
            }
            else if(this.current_char == '('){
                tokens.push(new Token(TT.TT_LPAREN, undefined, this.pos))
                this.advance()
            }
            else if(this.current_char == ')')  {
                tokens.push(new Token(TT.TT_RPAREN, undefined, this.pos))
                this.advance()
            }
            else{
                let pos_start = this.pos.copy()
                let pos_end = this.pos.copy()
                pos_end.advance()
                let char = this.current_char
                return [null, new IllegalCharError(pos_start, pos_end, this.current_char)]
            }
        }

        tokens.push(new Token(TT.TT_EOF, undefined, this.pos))
        return [tokens, null]
    }

    make_number(){
        let number_str = ''
        let dot_count = 0
        let pos_start = this.pos.copy()

        while(this.current_char != null && (TT.DIGITS.includes(this.current_char) || this.current_char == '.') ){
            if(this.current_char == '.'){
                if(dot_count == 1){
                    break
                }
                dot_count += 1
                number_str += '.'
            }
            else{
                number_str += this.current_char
            }
            this.advance()
        }


        if(dot_count == 0){
            return new Token(TT.TT_INT, parseInt(number_str), pos_start)
        }
        else{
            return new Token(TT.TT_FLOAT, parseFloat(number_str), pos_start)
        }
    }
}

module.exports = Lexer