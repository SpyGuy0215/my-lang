const {RTError} = require('../error.js')

class Number{
    constructor(value, boolean=false){
        this.value = value
        if(boolean){
            if(typeof(boolean) == 'boolean'){
                this.value == 1 ? this.boolean = 'true' : this.boolean = 'false'
            }
            else {
                this.boolean = boolean
            }
        }
        this.type = 'NUMBER'
        this.set_pos()
        this.set_context()
    }

    set_pos(pos_start=null, pos_end=null){
        this.pos_start = pos_start
        this.pos_end = pos_end
        return this
    }

    set_context(context='<shell>'){
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
                return [null, new RTError(other.pos_start, other.pos_end, "Don't try to break me, you can't divide by zero smh", this.context)]
            }
            return [new Number(this.value / other.value).set_context(this.context), null]
        } 
    }

    powed_by(other){
        if(other instanceof Number){
            return [new Number(Math.pow(this.value, other.value)).set_context(this.context), null]
        }
    }

    get_comparison_eq(other){
        if(other instanceof Number){
            return [new Number(this.value == other.value ? 1 : 0, true).set_context(this.context), null]
        }
    }

    get_comparison_ne(other){
        if(other instanceof Number){
            return [new Number(this.value != other.value ? 1 : 0, true).set_context(this.context), null]
        }
    }

    get_comparison_lt(other){
        if(other instanceof Number){
            return [new Number(this.value < other.value ? 1 : 0, true).set_context(this.context), null]
        }
    }

    get_comparison_gt(other){
        if(other instanceof Number){
            return [new Number(this.value > other.value ? 1 : 0, true).set_context(this.context), null]
        }
    }

    get_comparison_lte(other){
        if(other instanceof Number){
            return [new Number(this.value <= other.value ? 1 : 0, true).set_context(this.context), null]
        }
    }

    get_comparison_gte(other){
        if(other instanceof Number){
            return [new Number(this.value >= other.value ? 1 : 0, true).set_context(this.context), null]
        }
    }

    anded_by(other){
        if(other instanceof Number){
            return [new Number(this.value && other.value ? 1 : 0, true).set_context(this.context), null]
        }
    }

    ored_by(other){
        if(other instanceof Number){
            return [new Number(this.value || other.value ? 1 : 0, true).set_context(this.context), null]
        }
    }

    notted(){
        return [new Number(this.value ? 0 : 1, true).set_context(this.context), null]
    }

    is_true(){
        return this.value != 0
    }

    copy(){
        let copy = new Number(this.value, this.boolean)
        copy.set_pos(this.pos_start, this.pos_end)
        copy.set_context(this.context)
        return copy
    }
}

module.exports = Number