export class NumberNode{
    constructor(token){
        this.token = token
        console.log('number node')
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
        console.log('bin op node')
    }

    repr(){
        return `${this.left_node} ${this.op_tok} ${this.right_node}`
    }
}

export class UnaryOpNode{
    constructor(op_token, node){
        this.op_token = op_token
        this.node = node
        console.log('unary op node')
    }

    repr(){
        return `${this.op_token} ${this.node}`
    }
}