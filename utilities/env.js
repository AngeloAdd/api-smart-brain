module.exports = (evnVar, fallback = '') => {
    if(!evnVar && !fallback){
        throw new Error('You must specify an env variable or its fallback value.')
    }

    return evnVar ?
        process.env[evnVar] :
        fallback
}
