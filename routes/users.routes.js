const Express = require('express')
const { default: mongoose } = require('mongoose')
const router = Express.Router()

router.get('/new-user', (req,res,next) => {
    res.render('userForm.hbs')
})

router.post('/new-user', (req,res,next) => {
    const username = req.body.username
    const password = req.body.password
    const myCat = req.body.myCat
    User.create({
        username: username,
        password: password,
        myCat: myCat
    })
    .then((savedUser) => {
        console.log(savedUser)
        res.send(savedUser)
    }).catch((err) => {
        console.log(err)
        res.send(err)
    });
})

router.get('/all-users', (req,res,next) => {
    User.find()
        .populate('myCat')
    .then(myUserArray => {
        res.send(myUserArray)
    })
})

module.exports = router