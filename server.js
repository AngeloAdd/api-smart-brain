const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt-nodejs')
const knex = require('knex')
const app = express()
const port = '3000'
const defaultUserInfo = ['id','username','email', 'rank', 'created_at', 'updated_at']

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

const db = knex({
    client: 'postgres',
    connection: {
      host : 'localhost',
      port : 5432,
      user : 'Angelo',
      password : '',
      database : 'smart-brain'
    }
  })

app.get('/', (req, res) => {
    users.success = 'success'
    res.json(users)
})

app.post('/signin', (req, res) => {
    const { email, password } = req.body

    return db('login')
    .select('email','password')
    .where({email})
    .then(user => {
        if(bcrypt.compareSync(password, user[0].password)){
            return db('users')
            .select(defaultUserInfo)
            .where({
                email: user[0].email
            })
            .then(data => res.json(data[0]))
            .catch(e => res.status(400).json('Unable to get user!'))
        }
    })
    .catch(e => res.status(400).json('User info are wrong'))
})

app.post('/register', (req, res) => {
    const { username, email, password} = req.body
    const now = new Date()
    const hash = bcrypt.hashSync(password)

    return db.transaction(trx => {
        return trx.insert({
            email,
            password: hash
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning(defaultUserInfo)
                .insert({
                    username,
                    email: loginEmail[0],
                    rank: 0,
                    created_at: now,
                    updated_at: now,
                })
                .then(user => res.json(user[0]))
                .catch(e => {
                    return res.status(400).json('Impossible to register!')
                })
        })
    })
    .then(trx => trx.commit)
    .catch(trx => trx.rollback)
})

app.get('/profile/:id', (req, res) => {
    const id = parseInt(req.params.id)
    
    return db('users')
    .select(defaultUserInfo)
    .where({id})
    .then(user => {
        if(user.length){
            return res.json(user[0])
        }

        return res.status(404).json('Not Found')
    })
    .catch(e => 
        {
            console.log(e)
            res.status(400).json('Error getting user info. Try again later!')})
})

app.put('/image', (req, res) => {
    const id = parseInt(req.body.id)
    
    db('users')
    .where({id})
    .increment('rank', 1)
    .returning('rank')
    .then(rank => res.json({rank:rank[0]}))
    .catch(e => res.status(400).json('Unable to get the rank'))
})

app.listen(port, () => {
    console.log('up and running')
})