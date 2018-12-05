exports.isDisplay = function (handlerInput) {
    return isDisplayDevice(handlerInput)
}

exports.getScreenType = function (handlerInput) {
	return getScreenType(handlerInput)
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

//ディスプレイ付きデバイスか判定します
function isDisplayDevice (handlerInput) {
    let context = handlerInput.requestEnvelope.context
	if (context) {
		let system = context.System
		if (system) {
			let device = system.device
			if (device) {
				let supportedInterfaces = device.supportedInterfaces
				if (supportedInterfaces) {
					let display = supportedInterfaces.Display
					if (display) {
						return true
					}
				}
			}
		}
	}
	return false
}

function getScreenType (handlerInput) {
	let viewSize = getScreenSize(handlerInput)
	let w = viewSize.w
	let h = viewSize.h
	if (w && h) {
		if (w <= 480 && h <= 480) {
			return "small"
		}else if (w <= 1024 && h <= 600) {
			return "medium"
		}else if (w <= 1280 && h <= 800) {
			return "large"
		}else if (w <= 1920 && h <= 1080) {
			return "extralarge"
		}else{
			return "unknownscreentype"
		}
	}
	return null
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
		let system = context.System
		if (system) {
			let device = system.device
			if (device) {
				let deviceId = device.userId
				if (deviceId) {
					return deviceId
				}
			}
		}
	}
	return null
}