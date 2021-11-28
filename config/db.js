const loadEnv = require('../utilities/loadEnv')

module.exports = {
    client: loadEnv('DATABASE_CLIENT',  'postgres'),
    connection: {
        host : loadEnv('DATABASE_HOST', 'localhost'),
        port : loadEnv('DATABASE_PORT', 5432),
        user : loadEnv('DATABAS_USER', 'root'),
        password : loadEnv('DATABASE_PASSWORD', 'root'),
        database : loadEnv('DATABASE_NAME', 'rootdb'),
    },
}
