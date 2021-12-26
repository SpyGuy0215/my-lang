const VERSION = 'v0.3.0 beta'
const ARCHITECTURE = process.arch
const PLATFORM = process.platform

about = () => {
    return console.log('Version: ' + VERSION + ' \nPlatform: ' + PLATFORM + '\nArchitecture: ' + ARCHITECTURE)
}

version = () => {
    return console.log(VERSION)
}

module.exports = {
    VERSION,
    ARCHITECTURE,
    PLATFORM,
    about, 
    version
}