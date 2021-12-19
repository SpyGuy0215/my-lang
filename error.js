let RED = '\x1b[31m'
let WHITE = '\x1b[37m'

export class Error{
    constructor(type, start_pos, end_pos, message){
        this.type = type
        this.start_pos = start_pos
        this.end_pos = end_pos
        this.message = message
    }

    as_string(){
        let result = `${this.type}: ${RED} ${this.message} \n`
        result += `File ${this.start_pos.file_name}, line ${this.start_pos.line} ${WHITE} \n`
        return result
    }
}

export class IllegalCharError extends Error{
    constructor(start_pos, end_pos, char, message){
        super('IllegalCharError', start_pos, end_pos, `Illegal char: '${char}'`)
    }
}

export class InvalidSyntaxError extends Error{
    constructor(start_pos, end_pos, details=''){
        super('InvalidSyntaxError', start_pos, end_pos, `Invalid syntax: ${details}`)
    }
}
