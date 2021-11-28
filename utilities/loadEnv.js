module.exports = (environmentalVar, defaultValue = '') => {
    if(!environmentalVar && !defaultValue){
        throw new Error('You have to specify an environmental variable or a fallback value')
    }

    return environmentalVar ?
        process.env[environmentalVar] :
        defaultValue
}
