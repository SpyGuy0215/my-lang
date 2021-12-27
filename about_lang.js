const VERSION = 'v0.5.0 beta'
const ARCHITECTURE = process.arch
const PLATFORM = process.platform

about = () => {
    return console.log('MyLang Version: ' + VERSION + ' \nPlatform: ' + PLATFORM + '\nArchitecture: ' + ARCHITECTURE)
}

version = () => {
    return console.log(VERSION)
}

help = () => {
    return console.log('Usage: mylang [options] [script] [arguments]' + '\n' + 'Options:' + '\n' + '    --help' + '\n' + '  --version' + '\n' + '   --about')
}

module.exports = {
    VERSION,
    ARCHITECTURE,
    PLATFORM,
    about, 
    version, 
    help
}