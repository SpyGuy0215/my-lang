import * as readline from 'readline'
import {stdin as input, stdout as output} from 'process'
import Language from './language.js'

let rl = readline.createInterface({input, output})

console.log('Welcome to the shell! \n')

function shell(){
    rl.question('>> ', (text) => {
        if(text == 'exit'){
            return rl.close()
        }

        let language = new Language('shell', text)
        let result = language.run(text)

        if(result.error){
            console.log(error.as_string())
        }

        else{
            console.log(result.node)
            console.log('result ^')
        }

        shell()
    })
    
}

shell()