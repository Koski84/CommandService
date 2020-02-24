const Advert = require('./model')

exports.postAdvert = async function (advert) {
  try {
    const adv = new Advert(advert)
    adv.save()
  } catch (e) {
    console.error(e)
    throw Error('Error saving advert')
  }
}
