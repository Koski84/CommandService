require('dotenv').config('.env')
const express = require('express')
const bodyParser = require('body-parser')
const controller = require('./controllers/advert.controller')

const app = express()
app.use(bodyParser.json())

app.post('/advert', controller.postAdvert)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`)
})
