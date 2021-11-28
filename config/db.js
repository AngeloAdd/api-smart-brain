const dbConfig = {
    local:{
        client: 'postgres',
        connection: {
            host : 'localhost',
            port : 5432,
            user : 'Angelo',
            password : '',
            database : 'smart-brain',
        },
    },
    prod:{
        client: 'postgres',
        connection: {
            host : 'localhost',
            port : 5432,
            user : '',
            password : '',
            database : 'smart-brain',
        },
    },
}

module.exports = function(mode){
    return dbConfig[mode || process.argv[2] || 'local'] || dbConfig.local
}
