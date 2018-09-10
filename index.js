const fs = require('fs')
const dotenv = require('dotenv')
const PubSub = require(`@google-cloud/pubsub`)

dotenv.config()

const pubsub = new PubSub()
const subscription = pubsub.subscription('rdbs-stream')

subscription.on('message', event => {
    const dataObject = JSON.parse(event.data.toString())
    const contents = JSON.stringify(dataObject, null, 2)
    fs.writeFileSync('results/' + event.id + '.json', contents)
    event.ack()
    console.log('wrote file ', event.id + '.json')
})

console.log('running json streaming worker..')
console.log('press ctrl + c to stop')