require('dotenv').config('.env')
const kafka = require('kafka-node')

exports.postAdvert = async function (advert) {
  const { KAFKA_HOST: host, KAFKA_PORT: port, KAFKA_TOPIC: topic } = process.env
  const kafkaOptions = { kafkaHost: `${host}:${port}` }

  const client = new kafka.KafkaClient(kafkaOptions)
  const producer = new kafka.Producer(client)

  console.log(advert)
  const payloads = [
    {
      topic: topic,
      messages: JSON.stringify(advert)
    }
  ]

  producer.send(payloads, (err, data) => {
    if (err) {
      console.error(err)
      console.error('[kafkaProducer -> ' + topic + ']: broker update failed')
    } else {
      console.log('[kafkaProducer -> ' + topic + ']: broker update success')
    }
  })

  producer.on('error', function (err) {
    console.error(err)
    console.error('[kafkaProducer -> ' + topic + ']: connection errored')
    throw err
  })
}
