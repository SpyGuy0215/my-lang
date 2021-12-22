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

module.exports.NumberNode = NumberNode
module.exports.BinOpNode = BinOpNode
module.exports.UnaryOpNode = UnaryOpNode