require('dotenv').config('.env')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

const AdvertSchema = new mongoose.Schema({
  type: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  height: { type: String },
  size: { type: Number },
  km: { type: String },
  color: { type: String },
  fabricant: { type: String },
  images: [{ 
    url: { type: String, required: true },
    quality: { type: String, required: true }
  }]
})

const Advert = mongoose.model('Advert', AdvertSchema)

module.exports = Advert
