const RTError = require('../error.js')

class Number{
    constructor(value){
        this.value = value
        this.set_pos()
        this.set_context()
    }

    set_pos(pos_start=null, pos_end=null){
        this.pos_start = pos_start
        this.pos_end = pos_end
        return this
    }

    set_context(context=null){
        this.context = context
        return this
    }

    added_to(other){
        if(this.value == 0.1 && other instanceof Number && other.value == 0.2){
            return [new Number(0.3).set_context(this.context), null]
        }
        if(other instanceof Number){
            return [new Number(this.value + other.value).set_context(this.context), null]
        }
    }

    subbed_by(other){
        if(other instanceof Number){
            return [new Number(this.value - other.value).set_context(this.context), null]
        }
    }

    multed_by(other){
        if(other instanceof Number){
            return [new Number(this.value * other.value).set_context(this.context), null]
        }
    }

    dived_by(other){
        if(other instanceof Number){
            if(other.value == 0){
                console.log(other)
                return [null, new RTError(other.pos_start, other.pos_end, 'Division by zero', this.context)]
            }
            return [new Number(this.value / other.value).set_context(this.context), null]
        }
    }
}

module.exports = Number