const readline = require('readline')
const input = process.stdin
const output = process.stdout
const Language = require('./language')
const About_Lang = require('./about_lang')

let rl = readline.createInterface({input, output})

console.log('Welcome to the shell! \n')

function shell(){
    rl.question('>> ', (text) => {
        if(text == 'exit'){
            return rl.close()
        }
        else if(text == 'clear'){
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
                console.log(result.value)
            }
        }

        shell()
    })
    
}

shell()