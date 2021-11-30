const show = (Clarifai, config) => (req, res) => {
    const clarifai = new Clarifai.App({
        apiKey: config('clarifai').token,
    })

    clarifai.models.predict(config('clarifai').model, req.body.input, {video: false})
    .then(data => res.json(data))
    // eslint-disable-next-line no-unused-vars
    .catch(e => res.status(400).json('Error retrieving model data'))
}

module.exports = {show}
