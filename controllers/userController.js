const login = (db, bcrypt, defaultUserInfo) => (req, res) => {
    const { email, password } = req.body

    return db('login')
        .select('email', 'password')
        .where({email})
        .then(user => {
            if(bcrypt.compareSync(password, user[0].password)){
                return db('users')
                .select(defaultUserInfo)
                .where({
                    email: user[0].email,
                })
                .then(data => res.json(data[0]))
                // eslint-disable-next-line no-unused-vars
                .catch(e => res.status(400).json('Unable to get user!'))
            }
        })
        // eslint-disable-next-line no-unused-vars
        .catch(e => res.status(400).json('User info are wrong'))
}

const create = (db, bcrypt, defaultUserInfo) => (req, res) => {
    const { username, email, password } = req.body
    
    const validation = (mail, pwd, user) => {
        // eslint-disable-next-line no-useless-escape
        const emailRegex = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
        // eslint-disable-next-line no-useless-escape
        const strongPasswordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
        return !mail || 
        !mail.length || 
        mail.length < 8 || 
        !emailRegex.test(mail) || 
        !pwd || 
        !pwd.length || 
        pwd.length < 8 ||
        !strongPasswordRegex.test(pwd) ||
        !user ||
        !user.length || 
        user.length < 4
    } 
        
    if(validation(email, password, username)){
        return res.status(422).json('Not valid input')
    }
    
    const now = new Date()
    const hash = bcrypt.hashSync(password)

    return db.transaction(trx => {
        return Promise.all([
            trx('users').insert({
                username,
                email,
                rank: 0,
                created_at: now,
                updated_at: now,
            })
            .returning(defaultUserInfo),
            trx('login').insert({
                email,
                password: hash,
            }),
        ])
        .then(user => res.json(user[0]))
        .then(trx.commit)
        .catch(trx.rollback)
    })
    // eslint-disable-next-line no-unused-vars
    .catch(e => res.status(400).json('Registration failed. A user with this email already exists.'))
}

const show = (db, defaultUserInfo) => (req, res) => {
    const id = parseInt(req.params.id)
    
    return db('users')
        .select(defaultUserInfo)
        .where({id})
        .then(user => {
            if(user.length){
                return res.json(user[0])
            }

            return res.status(404).json('User not found!')
        })
        // eslint-disable-next-line no-unused-vars
        .catch(e => res.status(400).json('Error getting user info. Try again later!'))
}

const updateRank = (db) => (req, res) => {
    const id = parseInt(req.body.id)
    
    return db('users')
        .where({id})
        .increment('rank', 1)
        .returning('rank')
        .then(rank => res.json({rank:rank[0]}))
        // eslint-disable-next-line no-unused-vars
        .catch(e => res.status(404).json('Unable to get the rank. User not found.'))
}

module.exports = {
    login, 
    create,
    show,
    updateRank,
}
