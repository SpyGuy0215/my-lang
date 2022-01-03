/*
import RTResult from './interpreter_classes/runtimeresult.js';
import Number from './interpreter_classes/number.js';
*/

const RTResult = require('./interpreter_classes/runtimeresult.js');
const Number = require('./interpreter_classes/number.js');
const SymbolTable = require('./interpreter_classes/symbol_table.js');

const { RTError } = require('./error.js');
const TT = require('./constants.js');

class Interpreter{
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

    visit_VarAccessNode(node, context){
        let res = new RTResult()
        let var_name = node.var_name_tok.value
        let value = context.symbol_table.get(var_name)
        
        if(value == null){
            return res.failure(new RTError(
                node.pos_start, node.pos_end,
                `'${var_name}' is not defined`,
                context
            ))
        }

        if(res.error){
            return res
        }
        value = value.copy().set_pos(node.pos_start, node.pos_end)
        return res.success(value)
    }

    visit_VarAssignNode(node, context){
        let res = new RTResult()
        let var_name = node.var_name_tok.value
        let value = res.register(this.visit(node.value_node, context))
        if(res.error){
            return res
        }

        context.symbol_table.set(var_name, value)
        return res.success(value)
    }

    visit_NumberNode(node, context){
        let number = new Number(node.token.value).set_context(context).set_pos(node.pos_start, node.pos_end)
        return new RTResult().success(number)
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

        if(node.op_tok.type == TT.TT_PLUS){
            let result_error = left.added_to(right)
            result = result_error[0]
            error = result_error[1]
        }

        else if(node.op_tok.type == TT.TT_MINUS){
            let result_error = left.subbed_by(right)
            result = result_error[0]
            error = result_error[1]
        }

        else if(node.op_tok.type == TT.TT_MUL){
            let result_error = left.multed_by(right)
            result = result_error[0]
            error = result_error[1]
        }

        else if(node.op_tok.type == TT.TT_DIV){
            let result_error = left.dived_by(right)
            result = result_error[0]
            error = result_error[1]
        }

        else if(node.op_tok.type == TT.TT_POW){
            let result_error = left.powed_by(right)
            result = result_error[0]
            error = result_error[1]
        }
        else if(node.op_tok.type == TT.TT_EE){
            let result_error = left.get_comparison_eq(right)
            result = result_error[0]
            error = result_error[1]
        }
        else if(node.op_tok.type == TT.TT_NE){
            let result_error = left.get_comparison_ne(right)
            result = result_error[0]
            error = result_error[1]
        }
        else if(node.op_tok.type == TT.TT_LT){
            let result_error = left.get_comparison_lt(right)
            result = result_error[0]
            error = result_error[1]
        }
        else if(node.op_tok.type == TT.TT_GT){
            let result_error = left.get_comparison_gt(right)
            result = result_error[0]
            error = result_error[1]
        }
        else if(node.op_tok.type == TT.TT_LTE){
            let result_error = left.get_comparison_lte(right)
            result = result_error[0]
            error = result_error[1]
        }
        else if(node.op_tok.type == TT.TT_GTE){
            let result_error = left.get_comparison_gte(right)
            result = result_error[0]
            error = result_error[1]
        }
        else if(node.op_tok.matches(TT.TT_KEYWORD, 'and')){
            let result_error = left.anded_by(right)
            result = result_error[0]
            error = result_error[1]
        }
        else if(node.op_tok.matches(TT.TT_KEYWORD, 'or')){
            let result_error = left.ored_by(right)
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
        if(node.op_token.type == TT.TT_MINUS){
            let number_error = number.multed_by(new Number(-1))
            number = number_error[0]
            let error = number_error[1]
        }
        else if(node.op_token.matches(TT.TT_KEYWORD, 'NOT')){
            let number_error = number.notted()
            number = number_error[0]
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

module.exports = Interpreter