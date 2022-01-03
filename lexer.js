/*
import Position from './lexer_classes/position.js'
import Token from './lexer_classes/token.js'
import { IllegalCharError } from './error.js'
*/ 

const Position = require('./lexer_classes/position.js')
const Token = require('./lexer_classes/token.js')
const { IllegalCharError } = require('./error.js')
const TT = require('./constants.js')

const DIGITS = TT.DIGITS
const LETTERS = TT.LETTERS
const LETTERS_DIGITS = TT.LETTERS_DIGITS
const KEYWORDS = TT.KEYWORDS

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

            else if(DIGITS.includes(this.current_char)){
                tokens.push(this.make_number())
            }
            else if(LETTERS.includes(this.current_char)){
                tokens.push(this.make_identifier())
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
            else if(this.current_char == ')'){
                tokens.push(new Token(TT.TT_RPAREN, undefined, this.pos))
                this.advance()
            }
            else if(this.current_char == '{'){
                tokens.push(new Token(TT.TT_LBRACE, undefined, this.pos))
                this.advance()
            }
            else if(this.current_char == '}'){
                tokens.push(new Token(TT.TT_RBRACE, undefined, this.pos))
                this.advance()
            }
            else if(this.current_char == '!'){
                let token_error = this.make_not_equal()
                let token = token_error[0]
                let error = token_error[1]
                if(error){
                    return [null, error]
                }
                tokens.push(token)
            }
            else if(this.current_char == '='){
                tokens.push(this.make_equal())
            }
            else if(this.current_char == '<'){
                tokens.push(this.make_less_than())
            }
            else if(this.current_char == '>'){
                tokens.push(this.make_greater_than())
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
            }
            number_str += this.current_char
            this.advance()
        }


        if(dot_count == 0){
            return new Token(TT.TT_INT, parseInt(number_str), pos_start)
        }
        else{
            return new Token(TT.TT_FLOAT, parseFloat(number_str), pos_start)
        }
    }

    make_identifier(){
        let id_str = ''
        let pos_start = this.pos.copy()

        while(this.current_char != null && LETTERS_DIGITS.includes(this.current_char)){
            id_str += this.current_char
            this.advance()
        }

        let tok_type = null
        console.log(id_str)
        if(TT.KEYWORDS.includes(id_str)){
            tok_type = TT.TT_KEYWORD
        }
        else {
            tok_type = TT.TT_IDENTIFIER
        }
        return new Token(tok_type, id_str, pos_start, this.pos)
    }

    make_not_equal(){
        let pos_start = this.pos.copy()
        this.advance()

        if(this.current_char == '='){
            this.advance()
            return [new Token(TT.TT_NE, undefined, pos_start, this.pos), null]
        }

        this.advance()
        return [null, new ExpectedCharError(pos_start, this.pos, "'=' (after '!')")]
    }

    make_equal(){
        let tok_type = TT.TT_EQ
        let pos_start = this.pos.copy()
        this.advance()

        if(this.current_char == '='){
            this.advance()
            tok_type = TT.TT_EE
        }

        return new Token(tok_type, undefined, pos_start, this.pos)

    }
    
    make_less_than(){
        let tok_type = TT.TT_LT
        let pos_start = this.pos.copy()
        this.advance()

        if(this.current_char == '='){
            this.advance()
            tok_type = TT.TT_LTE
        }

        return new Token(tok_type, undefined, pos_start, this.pos)
    }

    make_greater_than(){
        let tok_type = TT.TT_GT
        let pos_start = this.pos.copy()
        this.advance()

        if(this.current_char == '='){
            this.advance()
            tok_type = TT.TT_GTE
        }

        return new Token(tok_type, undefined, pos_start, this.pos)
    }
}

module.exports = Lexer