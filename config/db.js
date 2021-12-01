const env = require('../utilities/env')

module.exports = {
    client: env('DATABASE_CLIENT', 'postgres'),
    connection: {
        host : env('DATABASE_URL', 'localhost'),
        port : env('DATABASE_PORT', 5432),
        user : env('DATABASE_USER', 'Angelo'),
        password : env('DATABASE_PASSWORD', ''),
        database : env('DATABASE_NAME', 'smart-brain'),
    },
}
