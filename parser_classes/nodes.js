export class NumberNode{
    constructor(token){
        this.token = token
    }

    repr(){
        return `${this.token}`
    }
}

export class BinOpNode{
    constructor(left_node, op_tok, right_node){
        this.left_node = left_node
        this.op_tok = op_tok
        this.right_node = right_node
    }

    repr(){
        return `${this.left_node} ${this.op_tok} ${this.right_node}`
    }
}

export class UnaryOpNode{
    constructor(op_token, node){
        this.op_token = op_token
        this.node = node
    }

    repr(){
        return `${this.op_token} ${this.node}`
    }
}