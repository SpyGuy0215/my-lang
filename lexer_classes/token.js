class Token{
    constructor(type, value=null, pos_start=null, pos_end=null){
        this.type = type
        this.value = value
        this.pos_start = -69
        this.pos_end = -69

        if(pos_start){
            this.pos_start = pos_start.copy()
            this.pos_end = pos_start.copy()
            this.pos_end.advance()
        }

        if(pos_end){
            this.pos_end = pos_end
        }
    }

    repr(){
        if(this.value){
            return `${this.type}(${this.value})`
        }

        return `${this.type}`
    }
}

module.exports = Token