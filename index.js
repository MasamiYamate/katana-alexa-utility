const device            = require('./device')
const template          = require('./displayTemplate')
const dynamodb          = require('./dynamodb')
const slot              = require('./slot')

module.exports = {
    device: device ,
    template: template,
    dynamodb: dynamodb,
    slot: slot
}