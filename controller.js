const advertService = require('./service')
const request = require('request-promise')

exports.postAdvert = async function (req, res) {
  try {
    const advert = req.body

    const scoredAdvert = await scoreAdvert(advert)
    scoredAdvert.date = new Date()

    await advertService.postAdvert(scoredAdvert)

    return res.status(200).json({ status: 200, data: scoredAdvert, message: 'Succesfully advert saved' })
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message })
  }
}

async function scoreAdvert (advert) {
  const response = await request(process.env.SCORE_SERVICE_URI, { body: advert, json: true })
  return response.data
}
