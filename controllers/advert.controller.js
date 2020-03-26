require('dotenv').config('.env')
const scoreAdvert = require('../services/scoring.service')
const advertService = require('../services/advert.kafka-producer.service')

exports.postAdvert = async function (req, res) {
  try {
    const advert = req.body

    const scoredAdvert = await scoreAdvert(advert)
    scoredAdvert.date = new Date()

    await advertService.postAdvert(scoredAdvert)

    return res.status(201).json({ status: 201, data: scoredAdvert, message: 'Succesfully advert saved' })
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message })
  }
}
