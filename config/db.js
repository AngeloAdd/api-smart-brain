const env = require('../utilities/env')

const db = {
    production : {
        client: env('DATABASE_CLIENT', 'postgres'),
        connection :{
            connectionString : env('DATABASE_URL', 'localhost') + '?sslmode=require',
            ssl : env('DATABASE_SSL', true),
        },
    },
    local : {
        client: env('DATABASE_CLIENT', 'postgres'),
        connection: {
            host : env('DATABASE_HOST', 'localhost'),
            port : env('DATABASE_PORT', 5432),
            user : env('DATABASE_USER', 'Angelo'),
            password : env('DATABASE_PASSWORD', ''),
            database : env('DATABASE_NAME', 'smart-brain'),
        },
    },
}

module.exports = (env) => db[env]
