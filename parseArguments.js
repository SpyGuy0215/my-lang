const args = require('args')

args
    .option('run', 'Run a file')
    .option('docs', 'Show documentation')

function parseArguments() {
    const flags = args.parse(process.argv)
    return flags
}

module.exports = {
    parseArguments
}