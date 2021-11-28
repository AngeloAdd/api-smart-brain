const loadEnv = require('../utilities/loadEnv')

module.exports = {
    name : loadEnv('APP_NAME', 'express-app'),
    env: loadEnv('APP_ENV', 'production'),
    host: loadEnv('APP_HOST', 'localhost'),
    url: loadEnv('APP_URL', 'http://localhost'),
    port : loadEnv('APP_PORT', '3000'),
}
