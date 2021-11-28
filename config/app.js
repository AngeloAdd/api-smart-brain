const env = require('../utilities/env')

module.exports = {
    name: env('APP_NAME', 'express-app'),
    env : env('APP_ENV', 'production'),
    port : env('APP_PORT', 3000),
    host : env('APP_HOST', 'localhost'),
    url : env('APP_URL', 'http://localhost'),
}
