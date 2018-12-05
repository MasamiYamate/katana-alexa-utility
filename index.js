const device            = require('./device')
const displayTemplate   = require('./displayTemplate')
const dynamodb          = require('./dynamodb')
const slot              = require('./slot')

module.exports = {
    isDisplay: function (handlerInput) {
        return device.isDisplay(handlerInput)
    },
    getScreenType: function (handlerInput) {
        return device.getScreenType(handlerInput)
    },
    getScreenSize: function (handlerInput) {
        return device.getScreenSize(handlerInput)
    },
    getApplicationId: function (handlerInput) {
        return device.getApplicationId(handlerInput)
    },
    getUserId: function (handlerInput) {
        return device.getUserId(handlerInput)
    },
    getDeviceId: function (handlerInput) {
        return device.getDeviceId(handlerInput)
    },

    addBodyTemplate: function (handlerInput , templateType , data) {
        return displayTemplate.addBodyTemplate(handlerInput , templateType , data)
    },

    saveDynamoDBData: async function (handlerInput , data) {
        await dynamodb.saveData(handlerInput , data)
    },
    getDynamoDBData: async function (handlerInput) {
        return await dynamodb.getData(handlerInput)
    },

    getSlotValue: function (handlerInput , slotName , isDebug) {
        return slot.getSlotValue(handlerInput , slotName , isDebug)
    }
}