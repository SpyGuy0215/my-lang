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
        let result_error = language.run(text)

        let result = result_error[0]
        let error = result_error[1]

        if(error){
            console.log(error.as_string())
        }

        else{
            console.log(result.value)
        }

        shell()
    })
    
}

shell()