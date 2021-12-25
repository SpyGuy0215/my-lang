let RED = '\x1b[91m'
let WHITE = '\x1b[37m'
let BLUE = '\x1b[94m'
let BOLD = '\x1b[1m'

const swa = require('./error_stuff/string_with_arrows.js')

class Error{
    constructor(type, start_pos, end_pos, message){
        this.type = type
        this.start_pos = start_pos
        this.end_pos = end_pos
        this.message = message
    }

    as_string(){
        let result = `${this.type}: ${RED} ${this.message} \n`
        if(this.start_pos){
            result += `File ${this.start_pos.file_name}, line ${this.start_pos.line} character ${this.start_pos.col + 1} ${WHITE}\n`
            result += '\n\n' + swa.string_with_arrows(this.start_pos.text, this.start_pos, this.end_pos)
        }
        return result
    }
}

class IllegalCharError extends Error{
    constructor(start_pos, end_pos, char, message){
        super('IllegalCharError', start_pos, end_pos, `Illegal character: '${char}'`)
    }
}

class InvalidSyntaxError extends Error{
    constructor(start_pos, end_pos, details=''){
        super('InvalidSyntaxError', start_pos, end_pos, `Invalid syntax: ${details}`)
    }
}

class RTError extends Error{
    constructor(start_pos, end_pos, details, context){
        super('Runtime Error', start_pos, end_pos, details)
        this.context = context
    }

    as_string(){
        let result = ''
        if(this.context != null){
            result += this.generate_traceback(this.context)
        }
        result += `${BLUE}${this.type}: ${RED} ${this.message} ${WHITE}\n`
        result += '\n\n' + swa.string_with_arrows(this.start_pos.text, this.start_pos, this.end_pos)
        return result
    }

    generate_traceback(context){
        let result = ''
        let pos = this.start_pos
        let ctx = context
        while(ctx){
            if(pos.file_name = 'shell'){
                result = `${BLUE}Line ${pos.line} character ${pos.col+1}, in ${ctx.display_name} ${WHITE} \n` + result
            }
            else{
                result = `${BLUE} File ${pos.file_name}, line ${pos.line}, character {TODO} ${WHITE} \n` + result
            }
            pos = ctx.parent_entry_pos
            ctx = ctx.parent
        }

        return `Traceback (most recent call last): \n` + result
    }
}

module.exports = {
    Error: Error,
    IllegalCharError: IllegalCharError,
    InvalidSyntaxError: InvalidSyntaxError,
    RTError: RTError
}
