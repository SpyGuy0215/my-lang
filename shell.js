const readline = require('readline')
const colors = require('colors')

const input = process.stdin
const output = process.stdout
const Language = require('./language')
const SymbolTable = require('./interpreter_classes/symbol_table.js')
const About_Lang = require('./about_lang')

const parseArguments = require('./parseArguments').parseArguments

let rl = readline.createInterface({input, output})

colors.setTheme({
    result: 'green',
})

 
function shell(){
    rl.question('>> ', (text) => {
        if(text == '.exit'){
            return rl.close()
            process.exit()
        }
        else if(text == '.help'){
            console.log('Interact with this console as if it was a mylang program, line by line.')
        }
        else if(text == '.clear'){
            console.clear()
        }

        else if(text == '.about'){
            About_Lang.about()
        }
        else if(text == '.version'){
            About_Lang.version()
        }
        else{
            let language = new Language('shell', text)
            let language_result = language.run(text)
            let result = language_result[0]
            let error = language_result[1]

            if(error){
                console.log(error.as_string())
            }

            else{
                if(result.type == 'NUMBER'){
                    if(result.boolean){
                        console.log(`${result.boolean}`.yellow)
                    }
                    else{
                        console.log(`${result.value}`.yellow)
                    }
                }
            }
        }

        shell()
    })
    
}

let parsedArgs = parseArguments(process.argv)

if(parsedArgs.run){
    console.log('Running files is not available yet, please use the shell for now')
    process.exit()
}
else{
    console.log('Welcome to the shell! Type .help for help\n')
    shell()
}
