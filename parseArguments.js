const argumentList = {
    help: '--help',
    h: '--help',
    version: '--version',
    v: '--version',
    about: '--about',
    a: '--about'
}

function parseArguments(args){
    let rawArgs = args.slice(2)
    let unrawArgs = rawArgs
    for(let i = 0; i < unrawArgs.length; i++){ //remove dashes from arguments
        unrawArgs[i] = unrawArgs[i].replace(/-/g, '')
    }
    let parsedArgs = {}
    for(let i = 0; i < unrawArgs.length; i++){ //put arguments into a dictionary
        if(unrawArgs[i] in argumentList){
            parsedArgs[unrawArgs[i]] = true
        }
    }
    return parsedArgs
}

module.exports = {
    parseArguments: parseArguments
}