const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/postExample')
.then(x => console.log(`Connected to Mongo! Database name: "${x.connection.name}"`))
.catch(err => console.log(err))

const app = express()
app.set('view engine',hbs)
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }))

const Cat = mongoose.model('Cat', {
    name: String
})

app.get('/', (req,res,next) => {
    console.log('yo the basic route works')
    res.render('index.hbs')
})

app.get('/test-query', (req,res,next) => {
    console.log('yo the test query route works')
    console.log(req.query)
    const myQueryObject= req.query
    res.send(myQueryObject)
})

app.get('/params-route/:username/examplespace/:food', (req,res,next) => {
    console.log(req.params)
    res.send(req.params)
})

app.get('/test-form', (req,res,next) => {
    res.render('getform.hbs')
})

app.get('/test-post-form', (req,res,next) => {
    res.render('postform.hbs')
})

app.post('/test-post-form', (req,res,next) => {
    console.log('Triggered the post route')
    console.log(req.body)
    res.send(req.body)
})

app.get('/my-final-form', (req,res,next) => {
    res.render('finalform.hbs')
})

app.post('/final-data', (req,res,next) => {
    const myCatName = req.body.finalText
    console.log(req.body)
    Cat.create({
        name: myCatName
    })
    .then(savedCat => {console.log(savedCat)
    res.send('cat was saved')
    })
    .catch(err => {
        console.log(err)
        res.send('sorry, cat was not saved')
    })
})

app.get('/see-all-cats', (req,res,next) => {
    
    Cat.find()
    .then(myCatsArray => {
        console.log(myCatsArray)
        res.send(myCatsArray)
    })
    .catch(err => {
        console.log(err)
        res.send('Sorry, cant get cats from database')
    })
})
const usersRoutes = require('./routes/users.routes.js')
app.use('/', usersRoutes)

app.listen(3000, () => console.log('Yo app is listening'))