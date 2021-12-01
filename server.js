require('dotenv').config({path: './.env'})
const config = require('./config/config')
const userController = require('./controllers/userController')
const imageController = require('./controllers/imageController')

const express = require('express')
const cors = require('cors')
const app = express()
const bcrypt = require('bcrypt-nodejs')
const knex = require('knex')
const Clarifai = require('clarifai')

const defaultUserInfo = ['id', 'username', 'email', 'rank', 'created_at', 'updated_at']

// Middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

const db = knex(config('db'))

app.get('/', (req, res) => {
    return db('users').select(defaultUserInfo)
    .then(users => res.json(users))
    // eslint-disable-next-line no-unused-vars
    .catch(e => res.send('No user yet but it\'s working'))
})

app.post('/user/login', userController.login(db, bcrypt, defaultUserInfo))

app.post('/user/create', userController.create(db, bcrypt, defaultUserInfo))

app.get('/user/:id', userController.show(db, defaultUserInfo))

app.post('/image/show', imageController.show(Clarifai, config))

app.put('/user/update/rank', userController.updateRank(db))

app.listen(config('app').port)
