const readline = require('readline')
const input = process.stdin
const output = process.stdout
const Language = require('./language')
const About_Lang = require('./about_lang')

const parseArguments = require('./parseArguments').parseArguments

let rl = readline.createInterface({input, output})


function shell(){
    rl.question('>> ', (text) => {
        if(text == '.exit'){
            return rl.close()
            process.exit()
        }
        else if(text == '.help'){
            console.log('Interact with this console as if it was a mylang program, line by line. ')
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
                output.write(error.as_string() + '\n')
            }

            else{
                output.write(result.value + '\n')
            }
        }

        shell()
    })
    
}

let parsedArgs = parseArguments(process.argv)

if(parsedArgs.help){
    About_Lang.help()
    process.exit()
}
else if(parsedArgs.version){
    About_Lang.version()
    process.exit()
}
else if(parsedArgs.about){
    About_Lang.about()
    process.exit()
}
else {
    console.log('Welcome to the shell! Type .help for help\n')
    shell()
}