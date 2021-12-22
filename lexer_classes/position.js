class Position{
    constructor(idx, line, col, file_name, text){
        this.idx = idx  // index of the current character, regardless of line or column
        this.line = line
        this.col = col
        this.file_name = file_name
        this.text = text
    }

    advance(current_char=null){
        this.idx++
        this.col++

        if(current_char = '\n'){
            this.line++
            this.col = 0
        }
        return this
    }

    copy(){
        return new Position(this.idx, this.line, this.col, this.file_name, this.text)
    }

}

module.exports = Position