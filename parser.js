/*
import {InvalidSyntaxError} from './error.js';
import ParseResult from './parser_classes/parseresult.js';
import {UnaryOpNode, BinOpNode, NumberNode} from './parser_classes/nodes.js';
*/

const { InvalidSyntaxError } = require('./error.js')
const ParseResult = require('./parser_classes/parseresult.js');
const {UnaryOpNode, BinOpNode, NumberNode, VarAccessNode, VarAssignNode, IfNode} = require('./parser_classes/nodes.js');
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
        let res = this.expr()
        if(!res.error && this.current_token.type != 'EOF'){
            return res.failure(new InvalidSyntaxError(
                this.current_token.pos_start, this.current_token.pos_end,
                "Expected an operator (math and/or comparison)"
            ))
        }
        return res
    }

    bin_op(func_a, ops, func_b=null){
        if(func_b == null){
            func_b = func_a
        }
        let res = new ParseResult()
        let left = res.register(func_a())
        if(res.error != null){
            return res
        }

        function array_element_check(element){
            return element.includes(this.current_token.type) && element.includes(this.current_token.value)
        }

        while(ops.includes(this.current_token.type) || ops.some(array_element_check.bind(this))){
            let op_token = this.current_token
            res.register_advancement()
            this.advance()
            let right = res.register(func_b())
            if(res.error != null){
                return res
            }
            left = new BinOpNode(left, op_token, right)
        }

        return res.success(left)
    }

    if_expr(){
        let res = new ParseResult()
        let cases = []
        let else_case = null

        if(!this.current_token.matches(TT.TT_KEYWORD, 'if')){
            return res.failure(new InvalidSyntaxError(
                this.current_token.pos_start, this.current_token.pos_end,
                "Expected 'if'"
            ))
        }

        res.register_advancement()
        this.advance()

        let condition = res.register(this.expr())
        if(res.error){
            return res
        }

        if(!this.current_token.matches(TT.TT_LBRACE)){
            return res.failure(new InvalidSyntaxError(
                this.current_token.pos_start, this.current_token.pos_end,
                "Expected '{'"
            ))
        }

        res.register_advancement()
        this.advance()

        let expr = res.register(this.expr())
        if(res.error){
            return res
        }

        if(!this.current_token.matches(TT.TT_RBRACE)){
            return res.failure(new InvalidSyntaxError(
                this.current_token.pos_start, this.current_token.pos_end,
                "Expected '}'"
            ))
        }

        res.register_advancement()
        this.advance()

        cases.push([condition, expr])

        while(this.current_token.matches(TT.TT_KEYWORD, 'elif')){
            res.register_advancement()
            this.advance()

            condition = res.register(this.expr())
            if(res.error){
                return res
            }

            if(!this.current_token.matches(TT.TT_LBRACE)){
                return res.failure(new InvalidSyntaxError(
                    this.current_token.pos_start, this.current_token.pos_end,
                    "Expected '{'"
                ))
            }

            res.register_advancement()
            this.advance()

            expr = res.register(this.expr())
            if(res.error){
                return res
            }

            if(!this.current_token.matches(TT.TT_RBRACE)){
                return res.failure(new InvalidSyntaxError(
                    this.current_token.pos_start, this.current_token.pos_end,
                    "Expected '}'"
                ))
            }
    
            res.register_advancement()
            this.advance()

            cases.push([condition, expr])
        }
        
        if(this.current_token.matches(TT.TT_KEYWORD, 'else')){
            res.register_advancement()
            this.advance()

            if(!this.current_token.matches(TT.TT_LBRACE)){
                return res.failure(new InvalidSyntaxError(
                    this.current_token.pos_start, this.current_token.pos_end,
                    "Expected '{'"
                ))
            }

            res.register_advancement()
            this.advance()

            else_case = res.register(this.expr())
            if(res.error){
                return res
            }

            if(!this.current_token.matches(TT.TT_RBRACE)){
                return res.failure(new InvalidSyntaxError(
                    this.current_token.pos_start, this.current_token.pos_end,
                    "Expected '}'"
                ))
            }
    
            res.register_advancement()
            this.advance()
        }

        return res.success(new IfNode(cases, else_case))
    }


    atom(){
        let res = new ParseResult()
        let token = this.current_token

        if([TT.TT_INT, TT.TT_FLOAT].includes(token.type)){
            res.register_advancement()
            this.advance()
            return res.success(new NumberNode(token))
        }

        else if(token.type == TT.TT_IDENTIFIER){
            res.register_advancement()
            this.advance()
            return res.success(new VarAccessNode(token))
        }

        else if(token.type == TT.TT_LPAREN){
            res.register_advancement()
            this.advance()
            let expr = res.register(this.expr())
            if(res.error){
                return res
            }
            if(this.current_token.type == TT.TT_RPAREN){
                res.register_advancement()
                this.advance()
                return res.success(expr)
            }
            else{
                return res.failure(new InvalidSyntaxError(
                    this.current_token.pos_start, this.current_token.pos_end,
                    "Expected ')'"                    
                ))
            }
        }

        else if(token.matches(TT.TT_KEYWORD, 'if')){
            let if_expr = res.register(this.if_expr())
            if(res.error){
                return res
            }
            return res.success(if_expr)
        }
    
        return res.failure(new InvalidSyntaxError(
            this.current_token.pos_start, this.current_token.pos_end,
            "Expected int/float, identifier, '+', '-', or '('"
        ))
    }

    power(){
        return this.bin_op(this.atom.bind(this), [TT.TT_POW], this.factor.bind(this))
    }

    factor(){
        let res = new ParseResult()
        let token = this.current_token
        
        if([TT.TT_PLUS, TT.TT_MINUS].includes(token.type)){
            res.register_advancement()
            this.advance()
            let factor = res.register(this.factor())
            if(res.error){
                return res
            }
            return res.success(new UnaryOpNode(token, factor))
        }

        return this.power()
    }

    term(){
        return this.bin_op(this.factor.bind(this), [TT.TT_MUL, TT.TT_DIV])
    }

    arith_expr(){
        return this.bin_op(this.term.bind(this), [TT.TT_PLUS, TT.TT_MINUS])
    }

    comp_expr(){
        let res = new ParseResult()

        if(this.current_token.matches(TT.TT_KEYWORD, 'not')){
            let op_token = this.current_token
            res.register_advancement()
            this.advance()

            let node = res.register(this.comp_expr())
            if(res.error){
                return res
            }
            return res.success(new UnaryOpNode(op_token, node))
        }

        let node = res.register(this.bin_op(this.arith_expr.bind(this), [TT.TT_EE, TT.TT_NE, TT.TT_LT, TT.TT_GT, TT.TT_LTE, TT.TT_GTE]))

        if(res.error){
            return res.failure(new InvalidSyntaxError(
                this.current_token.pos_start, this.current_token.pos_end,
                'Expected int/float, identifier, "+", "-", "(" or "not"'
            ))
        }

        return res.success(node)
    }
  
    expr(){
        let res = new ParseResult()

        if(this.current_token.matches(TT.TT_KEYWORD, 'var')){
            res.register_advancement()
            this.advance()
            if(this.current_token.type != TT.TT_IDENTIFIER){
                return res.failure(new InvalidSyntaxError(
                    this.current_token.pos_start, this.current_token.pos_end,
                    "Expected an identifier"
                ))
            }

            let var_name = this.current_token
            res.register_advancement()
            this.advance()

            if(this.current_token.type != TT.TT_EQ){
                return res.failure(new InvalidSyntaxError(
                    this.current_token.pos_start, this.current_token.pos_end,
                    "Expected '='"
                ))
            }

            res.register_advancement()
            this.advance()

            let expr_res = res.register(this.expr())
            if(res.error){
                return res
            }

            return res.success(new VarAssignNode(var_name, expr_res))
        }

        let node = res.register(this.bin_op(this.comp_expr.bind(this), [[TT.TT_KEYWORD, 'and'], [TT.TT_KEYWORD, 'or']]))

        if(res.error){
            return res.failure(new InvalidSyntaxError(
                this.current_token.pos_start, this.current_token.pos_end,
                "Expected 'var', int/float, '+', '-', '(' or 'not'"
            ))
        }

        return res.success(node)
    }

}

module.exports = Parser