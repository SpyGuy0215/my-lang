import RTResult from './interpreter_classes/runtimeresult.js';
import Number from './interpreter_classes/number.js';

let DIGITS = '0123456789'

let TT_INT = 'INT'
let TT_FLOAT = 'FLOAT'

let TT_PLUS = 'PLUS'
let TT_MINUS = 'MINUS'
let TT_MUL = 'MUL'
let TT_DIV = 'DIV'
let TT_LPAREN = 'LPAREN'
let TT_RPAREN = 'RPAREN'

let TT_EOF = 'EOF'

export default class Intepreter{
    constructor(){
    }

    visit(node, context){
        let method_name = `visit_${node.constructor.name}`
        let method = this[method_name].bind(this)

        if(!method){
            this.no_visit_method
        }

        return method(node, context)
    }

    no_visit_method(node, context){
        throw `No visit_${node.__name__} method defined`
    }

    visit_NumberNode(node, context){
        return new RTResult().success(
            new Number(node.token.value).set_context(context).set_pos(node.pos_start, node.pos_end)
        )
    }

    visit_BinOpNode(node, context){
        let res = new RTResult()
        let left = res.register(this.visit(node.left_node, context))
        let error = null
        let result = null


        if(res.error){
            return res
        }
        let right = res.register(this.visit(node.right_node, context))
        if(res.error){
            return res
        }

        if(node.op_tok.type == TT_PLUS){
            let result_error = left.added_to(right)
            result = result_error[0]
            error = result_error[1]
        }

        if(node.op_tok.type == TT_MINUS){
            let result_error = left.subbed_by(right)
            result = result_error[0]
            error = result_error[1]
        }

        if(node.op_tok.type == TT_MUL){
            let result_error = left.multed_by(right)
            result = result_error[0]
            error = result_error[1]
        }

        if(node.op_tok.type == TT_DIV){
            let result_error = left.dived_by(right)
            result = result_error[0]
            error = result_error[1]
        }

        if(error){
            return res.failure(error)
        }
        else{
            return res.success(result.set_pos(node.pos_start, node.pos_end))
        }
    }

    visit_UnaryOpNode(node, context){
        let res = new RTResult()
        let number = res.register(this.visit(node.node, context))
        if(res.error){
            return res
        }

        let error = null
        if(node.op_tok.type == TT_MINUS){
            let number_error = number.multed_by(new Number(-1))
            let number = number_error[0]
            error = number_error[1]
        }

        if(error){
            return res.failure(error)
        }

        else{
            return res.success(number.set_pos(node.pos_start, node.pos_end))
        }
    }
}