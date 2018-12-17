# katana-alexa-utility
Generic functions used in Alexa skill development

## Description
This npm module is a module that collects values ​​such as user ID and application ID, and can find frequently used values of skill development. In addition, you can easily set display items for templates to be displayed on devices with screen.

## Installation
From npm

```
npm install --save katana-alexa-utility
```

## How to use

```sample.js
const Alexa = require('ask-sdk')
const Katana = require('katana-alexa-utility')

//Launch intent handler
const LaunchIntentHandler = {
    canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request
		return request.type === 'LaunchRequest'
	},
	async handle(handlerInput) {
        //Device data request
        //Get application id
        //Return type is String
        let appId = Katana.device.getApplicationId(handlerInput);
        //Get user id
        //Return type is String
        let userId = Katana.device.getUserId(handlerInput);
        //Get device id
        //Return type is String
        let deviceId = Katana.device.getDeviceId(handlerInput);
        //Check presence of screen
        //Return type is Bool
        let isDisplay = Katana.device.isDisplay(handlerInput);
        //Get Shape type
        //Return type is String
        let shapeType = Katana.device.getShapeType(handlerInput);
        //Get screen size
        //Return type is Int Array [w , h]
        let screenSize = Katana.device.getScreenSize(handlerInput);
        //Check presence of geolocation interface
        //Return type is Bool
        let isGeolocation = Katana.device.getGeolocation(handlerInput);
        //Get geolocation data
        //Return type is Dictionary of geolocation data
        let geolocData = Katana.device.getGeolocation(handlerInput);

        //Sync api request
        //Get request data
        //Return type is Dictionary
        //※Designation to 「await」
        let result = await Katana.syncAPI.request('request url');

        //Slot data
        //Get any slotkey value
        //Return type is String
        let value = Katana.slot.getSlotValue(handlerInput , 'slot name');

        //Dynamo DB data request
        //Get DynamoDB data
        //Return type is Dictionary
        //※Designation to 「await」
        let dynamoDBData = Katana.dynamodb.getData(handlerInput)

        //Save DynamoDB data
        //※Designation to 「await」
        await util.dynamodb.saveData(handlerInput , saveData)

		return handlerInput.responseBuilder
			.speak('Wellcome to katana alexa utility test skill')
			.withShouldEndSession(true)
        	.getResponse();
	}
}

//Help intent handler
const HelpIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		return (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent');
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder
            .withShouldEndSession(true)
			.getResponse();
	}
}

//Skill end handler
const SkillEndHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		return (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.CancelIntent')
			|| (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.StopIntent')
			|| (request.type === 'SessionEndedRequest' && request.type === 'USER_INITIATED');
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder
            .withShouldEndSession(true)
			.getResponse();
	}
}

//Error handler
const ErrorHandler = {
	canHandle(handlerInput) {
		return true;
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak("Error request Please retry")
			.withShouldEndSession(true)
			.getResponse();
	}
}

exports.handler = Alexa.SkillBuilders.standard()
	.addRequestHandlers(
		LaunchIntentHandler,
        HelpIntentHandler,
		SkillEndHandler,
		)
	.addErrorHandlers(ErrorHandler)
	.lambda();

```
