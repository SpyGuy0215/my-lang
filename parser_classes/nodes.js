class NumberNode{
    constructor(token){
        this.token = token
        this.pos_start = this.token.pos_start
        this.pos_end = this.token.pos_end
    }

    repr(){
        return `${this.token}`
    }
}

class BinOpNode{
    constructor(left_node, op_tok, right_node){
        this.left_node = left_node
        this.op_tok = op_tok
        this.right_node = right_node
        this.pos_start = this.left_node.pos_start
        this.pos_end = this.right_node.pos_end
    }

    repr(){
        return `${this.left_node} ${this.op_tok} ${this.right_node}`
    }
}

class UnaryOpNode{
    constructor(op_token, node){
        this.op_token = op_token
        this.node = node
        this.pos_start = this.op_token.pos_start
        this.pos_end = this.node.pos_end
    }

    repr(){
        return `${this.op_token} ${this.node}`
    }
}

class VarAccessNode{
    constructor(var_name_tok){
        this.var_name_tok = var_name_tok
        this.pos_start = this.var_name_tok.pos_start
        this.pos_end = this.var_name_tok.pos_end
    }
}

class VarAssignNode{
    constructor(var_name_tok, value_node){
        this.var_name_tok = var_name_tok
        this.value_node = value_node
        this.pos_start = this.var_name_tok.pos_start
        this.pos_end = this.value_node.pos_end
    }
}

class IfNode{
    constructor(cases, else_case){
        this.cases = cases
        this.else_case = else_case
        this.pos_start = this.cases[0][0].pos_start
        this.pos_end = (this.else_case || this.cases[this.cases.length - 1][0]).pos_end
    }
}

module.exports = {
    NumberNode: NumberNode,
    BinOpNode: BinOpNode,
    UnaryOpNode: UnaryOpNode,
    VarAccessNode: VarAccessNode,
    VarAssignNode: VarAssignNode,
    IfNode: IfNode
}