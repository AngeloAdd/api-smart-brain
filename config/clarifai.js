const env = require('../utilities/env')

module.exports = {
    token: env('CLARIFAI_API_TOKEN'),
    model : env('CLARIFAI_FACE_RECOGNITION_MODEL'),
}
