const path = require('path')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT  || 8080

console.log("main directory:"+__dirname)
console.log("main file:"+__filename)
// define paths for express config 
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory 
app.use(express.static(publicDirPath))







app.get('', (req, res) => {
    res.render('index', {
        title: 'main page',
        name: 'levent'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: 'levent'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        name: 'levent'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "you must provide address term !"})
    }
    console.log(req.query)
    geocode(req.query.address, (error,data) => {
        if (error) {
            return res.send({error: error})
        }
        const {latitude:longitude, longitude:latitude, location} = data
        forecast(latitude, longitude, (error,fData) => {
            if (error) {
                return res.send({error: error})
            }
            if (fData) {
                return res.send(fData)
            }
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: "you must provide search term !"})
    }
    console.log(req.query)
    return res.send({
        products: []
    })
})


app.get('*', (req, res) => {
    res.send('my 404 page')
})



app.listen(port, () => {  console.log(' server is up on port ' + port)})

