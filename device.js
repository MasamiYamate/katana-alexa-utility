exports.isDisplay = function (handlerInput) {
    return isDisplayDevice(handlerInput)
}

exports.isGeolocation = function (handlerInput) {
	return isGeolocation(handlerInput)
}

exports.getShapeType = function (handlerInput) {
	return getShapeType(handlerInput)
}

exports.getScreenSize = function (handlerInput) {
	return getScreenSize(handlerInput)
}

exports.getApplicationId = function (handlerInput) {
	return getApplicationId(handlerInput)
}

exports.getUserId = function (handlerInput) {
	return getUserId(handlerInput)
}

exports.getDeviceId = function (handlerInput) {
	return getDeviceId(handlerInput)
}

exports.getGeolocation = function (handlerInput) {
	return getGeolocation(handlerInput)
}

//ディスプレイ付きデバイスか判定します
function isDisplayDevice (handlerInput) {
    let device = handlerInput.requestEnvelope.context.System.device
	if (device) {
		let supportedInterfaces = device.supportedInterfaces
		if (supportedInterfaces) {
			let display = supportedInterfaces.Display
			if (display) {
				return true
			}
		}
	}
	return false
}

//位置情報の取得をサポートしているか判定します
function isGeolocation (handlerInput) {
	let device = handlerInput.requestEnvelope.context.System.device
	console.log(handlerInput.requestEnvelope.context.Geolocation)
	if (device) {
		let supportedInterfaces = device.supportedInterfaces
		if (supportedInterfaces) {
			let geolocation = supportedInterfaces.Geolocation
			if (geolocation) {
				return true
			}
		}
	}
	return false
}

function getShapeType (handlerInput) {
	let shape = handlerInput.requestEnvelope.context.Viewport.shape
	if (shape) {
		return shape
	}else{
		return null
	}
}

function getScreenSize (handlerInput) {
	var w = null
	var h = null
	let context = handlerInput.requestEnvelope.context
	if (context) {
		let viewport = context.Viewport
		if(viewport) {
			if (viewport.pixelWidth && viewport.pixelHeight) {
				w = viewport.pixelWidth
				h = viewport.pixelHeight
			}
		}
	}
	return [w , h]
}

function getApplicationId (handlerInput) {
	let context = handlerInput.requestEnvelope.context
	if (context) {
		let system = context.System
		if (system) {
			let app = system.application
			if (app) {
				let appId = app.applicationId
				if (appId) {
					return appId
				}
			}
		}
	}
	return null
}

function getUserId (handlerInput) {
	let context = handlerInput.requestEnvelope.context
	if (context) {
		let system = context.System
		if (system) {
			let user = system.user
			if (user) {
				let userId = user.userId
				if (userId) {
					return userId
				}
			}
		}
	}
	return null
}

function getDeviceId (handlerInput) {
	let context = handlerInput.requestEnvelope.context
	if (context) {
		let device = context.System.device
		if (device) {
			return device.deviceId
		}
	}
	return null
}

function getGeolocation (handlerInput) {
	if (isGeolocation(handlerInput)) {
		return handlerInput.requestEnvelope.context.Geolocation
	}else{
		return null
	}
} 