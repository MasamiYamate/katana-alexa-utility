const device            = require('./device')
const template          = require('./displayTemplate')
const dynamodb          = require('./dynamodb')
const slot              = require('./slot')
const syncAPIRequest    = require('./syncRequest') 

module.exports = {
    device: device ,
    template: template,
    dynamodb: dynamodb,
    slot: slot,
    syncAPI: syncAPIRequest
}