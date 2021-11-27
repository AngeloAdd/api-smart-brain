const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt-nodejs')
const app = express()
const port = '3000'

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

let users = [
    {
        id: 1,
        username: 'giangi',
        email: 'ci@ci.it',
        password: 'ciao',
        rank:0,
        creaed_at: new Date(),
    },
    {
        id: 2,
        username: 'pio',
        email: 'cp@ci.it',
        password: 'hey',
        rank: 0,
        created_at: new Date(),
    },
    {
        id: 3,
        username: 'ange',
        email: 'ange@it',
        password: 'ange',
        rank: 0,
        created_at: new Date(),
    }
]

app.get('/', (req, res) => {
    users.success = 'success'
    res.json(users)
})

app.post('/signin', (req, res) => {
    const { email, password } = req.body
    let found = false
    users.forEach( el => {
        if(el.email === email && el.password === password){
            found = true
            res.json({
                id: el.id,
                username: el.username,
                email: el.email,
                rank: el.rank,
                created_at: el.created_at,
                success: 'success'
            })
        }
    })
    if(!found){
        res.status(400).json('login error')
    }
})

app.post('/register', (req, res) => {
    const { username, email, password} = req.body
    const userExist = users.filter( el => {
        return el.email === email
                ? el
                : null
    })
    if(userExist.length){
        res.status(400).json('Email already present')
    } else {
    users.push({
        id: users.length + 1,
        username,
        email,
        password,
        rank: 0,
        created_at: new Date(),
    })
    res.json({
        username,
        email,
        rank: 0,
        created_at: new Date(),
        success: 'success'
    })
}

})

app.get('/profile/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.filter( el => el.id === id)
    if(user.length){
        res.json(user[0])
    } else {
    res.status(400).json('User does not exists')
    }
})

app.put('/image', (req, res) => {
    const id = parseInt(req.body.id)
    let found = false
    users.forEach( el => {
        if(el.id === id){
            el.rank++
            found = true
            return res.json({
                success: 'success',
                rank: el.rank
            })
        } 
    })
    if(!found) {
        res.status(400).json('User not found')
    }
})

app.listen(port, () => {
    console.log('up and running')
})