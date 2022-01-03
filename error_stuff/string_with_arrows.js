const colors = require('colors')

colors.setTheme({
    arrow: 'brightBlue',
    clear: 'white',
    bold: 'bold',
})

string_with_arrows = (text, pos_start, pos_end) => {
    let result = ''

    // Calculate Indices
    let i = pos_start.index
    let index_start = Math.max(text.lastIndexOf('\n', 0), 0)
    let index_end = text.indexOf('\n', index_start+1)
    if(index_end < 0){
        index_end = text.length
    }

    //Generate each of the lines
    let line_count = pos_end.line - pos_start.line + 1

    for(let i = 0; i < line_count; i++){
        let line = text.slice(index_start, index_end)
        let col_start = pos_start.col - index_start
        let col_end = 0
        if(i == line_count-1){
            col_end = pos_end.col
        }
        else{
            col_end = line.length - 1
        }

        result += line + '\n'
        let empty_string = ' '
        let arrow = '^'.arrow.bold
        result += empty_string.repeat(col_start) + arrow.repeat(col_end - col_start)

        index_start = index_end
        index_end = text.indexOf('\n', index_start+1)
        if(index_end < 0){
            index_end = text.length
        }
    }
    return result


}

module.exports = { string_with_arrows }