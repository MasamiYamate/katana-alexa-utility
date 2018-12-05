exports.getSlotValue = function (handlerInput , slotName , isDebugMode) {
    return getSlotValue(handlerInput , slotName , isDebugMode)
}

function getSlotValue (handlerInput , slotName , isDebugMode) {
    let request = handlerInput.requestEnvelope.request
    if (request && slotName) {
        let slots = request.intent.slots
        let item = slots[slotName];
        if (item) {
            let resolutions = item.resolutions
            if (resolutions) {
                for (var i in resolutions['resolutionsPerAuthority']) {
                    let resolutionsPerAuthority = resolutions['resolutionsPerAuthority'][i]
                    let status = resolutionsPerAuthority['status']
                    let code = status['code']

                    if (code == "ER_SUCCESS_MATCH") {
                        var responseValue = null
                        let values = resolutionsPerAuthority['values']
                        for (var j in values) {
                            let value = values[j]
                            let name = value['name']
                            if (name) {
                                responseValue = name
                            }
                        }
                        return responseValue
                    }else if (isDebugMode) {
                        return item.value
                    }
                }
            }
        }
    }
    return null
}