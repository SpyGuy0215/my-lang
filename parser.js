/*
import {InvalidSyntaxError} from './error.js';
import ParseResult from './parser_classes/parseresult.js';
import {UnaryOpNode, BinOpNode, NumberNode} from './parser_classes/nodes.js';
*/

const { InvalidSyntaxError } = require('./error.js')
const ParseResult = require('./parser_classes/parseresult.js');
const {UnaryOpNode, BinOpNode, NumberNode} = require('./parser_classes/nodes.js');
const TT = require('./constants');

class Parser{
    constructor(tokens){
        this.tokens = tokens
        this.token_index = -1
        this.advance()
    }

    advance(){
        this.token_index += 1
        if(this.token_index < this.tokens.length){
            this.current_token = this.tokens[this.token_index]
        }
    }

    parse(){
        let result = this.expr()
        if(!result.error && this.current_token.type != 'EOF'){
            return result.failure(new InvalidSyntaxError(
                this.current_token.pos_start, this.current_token.pos_end,
                "Expected an operator"
            ))
        }
        return result
    }

    bin_op(func_a, ops, func_b=null){
        if(func_b == null){
            func_b = func_a
        }
        let result = new ParseResult()
        let left = result.register(func_a())
        if(result.error != null){
            return result
        }

        while(ops.includes(this.current_token.type)){
            let op_token = this.current_token
            result.register(this.advance())
            let right = result.register(func_b())
            if(result.error != null){
                return result
            }
            left = new BinOpNode(left, op_token, right)
        }

        return result.success(left)
    }


    atom(){
        let result = new ParseResult()
        let token = this.current_token

        if([TT.TT_INT, TT.TT_FLOAT].includes(token.type)){
            result.register(this.advance())
            return result.success(new NumberNode(token))
        }

        else if(token.type == TT.TT_LPAREN){
            result.register(this.advance())
            let expr = result.register(this.expr())
            if(result.error){
                return result
            }
            if(this.current_token.type == TT.TT_RPAREN){
                result.register(this.advance())
                return result.success(expr)
            }
            else{
                return result.failure(new InvalidSyntaxError(
                    this.current_token.pos_start, this.current_token.pos_end,
                    "Expected ')'"                    
                ))
            }
        }
    
        return result.failure(new InvalidSyntaxError(
            this.current_token.pos_start, this.current_token.pos_end,
            "Expected int or float, '+', '-', or '('"
        ))
    }

    power(){
        return this.bin_op(this.atom.bind(this), [TT.TT_POW], this.factor.bind(this))
    }

    factor(){
        let res = new ParseResult()
        let token = this.current_token
        
        if([TT.TT_PLUS, TT.TT_MINUS].includes(token.type)){
            res.register(this.advance())
            let factor = res.register(this.factor().bind(this))
            if(res.error){
                return res
            }
            return res.success(new UnaryOpNode(token, factor))
        }

        return this.power()
    }

    term(){
        let result = this.bin_op(this.factor.bind(this), [TT.TT_MUL, TT.TT_DIV])
        return result 
    }
  
    expr(){
        let result = this.bin_op(this.term.bind(this), [TT.TT_PLUS, TT.TT_MINUS])
        return result
    }

}

module.exports = Parser