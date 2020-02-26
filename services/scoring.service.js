const request = require('request-promise')

module.exports = async function scoreAdvert (advert) {
  const response = await request(process.env.SCORE_SERVICE_URI, { body: advert, json: true })
  return response.data
}
