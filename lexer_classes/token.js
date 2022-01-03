class Token{
    constructor(type, value=null, pos_start=null, pos_end=null){
        this.type = type
        this.value = value
        this.pos_start = -123
        this.pos_end = -123

        if(pos_start){
            this.pos_start = pos_start.copy()
            this.pos_end = pos_start.copy()
            this.pos_end.advance()
        }

        if(pos_end){
            this.pos_end = pos_end.copy()
        }
    }

    matches(type, value){
        return this.type == type && this.value == value
    }

    repr(){
        if(this.value){
            return `${this.type}(${this.value})`
        }

        return `${this.type}`
    }
}

module.exports = Token