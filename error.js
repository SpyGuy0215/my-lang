let RED = '\x1b[31m'
let WHITE = '\x1b[37m'

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
            result += `File ${this.start_pos.file_name}, line ${this.start_pos.line}`
        }
        result += `${WHITE} \n`
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
        console.log(start_pos)
        this.context = context
    }

    as_string(){
        let result = ''
        console.log(this.context)
        if(this.context != null){
            result += this.generate_traceback(this.context)
        }
        result += `${this.type}: ${RED} ${this.message} \n`
        result += `File ${this.start_pos.file_name}, line ${this.start_pos.line} ${WHITE} \n`
        return result
    }

    generate_traceback(context){
        let result = ''
        let pos = this.start_pos
        let ctx = context

        while(context){
            result = `File ${pos.fn}, line ${pos.line}, in ${ctx.display_name} \n` + result
            pos = ctx.parent_entry_pos
            ctx = ctx.parent
        }

        return 'Traceback (most recent call last): \n)' + result
    }
}

module.export = {
    IllegalCharError,
    InvalidSyntaxError,
    RTError
}
