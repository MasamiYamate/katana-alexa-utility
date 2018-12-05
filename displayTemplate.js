const Alexa = require('ask-sdk-core')

exports.addBodyTemplate = function (handlerInput , templateType , setData) {
    if (handlerInput && templateType && setData) {
        let addTemplate = createBodyTemplate(templateType , setData)
        //付与対象のテンプレートがある場合は、付与します
        if (addTemplate) {
            handlerInput.responseBuilder.addRenderTemplateDirective(addTemplate)
        }
        if (templateType == 'BodyTemplate3' && setData[hintMsg]) {
            handlerInput.responseBuilder.addHintDirective(setData[hintMsg])
        }
    }
}

function createBodyTemplate (typeName , setData) {
    var responseData = {type:typeName}
    //Tokenの付与
    if (setData['token']) {
        responseData['token'] = setData['token']
    }else{
        responseData['token'] = 'unknownToken'
    }
    //BackButtonの表示非表示
    if (setData['backButton']) {
        responseData['backButton'] = setData['backButton']
    }else{
        responseData['backButton'] = 'VISIBLE'
    }
    //Titleの付与
    if (setData['title']) {
        responseData['title'] = setData['title']
    }else{
        responseData['title'] = ''
    }
    //背景画像の付与
    if (setData['backgroundImage']) {
        responseData['backgroundImage'] = createImageContent(setData['backgroundImage']) 
    }
    //テンプレート内表示用画像の付与
    if (setData['image'] && (typeName == 'BodyTemplate2' || typeName == 'BodyTemplate3')) {
        responseData['image'] = createImageContent(setData['image'])
    }
    //テキストデータの付与
    var textContentDic = {}
    if (setData['textContent']) {
        textContentDic = setData['TextContent']
        responseData['textContent'] = setTextContentData
    }
    responseData['textContent'] = createTextContent(textContentDic)
    return responseData
}

function createImageContent(src) {
    return new Alexa.ImageHelper()
        .addImageInstance(src)
        .getImage
}

function createTextContent(textData) {
  var primaryTxt    = '';
  var secondaryTxt  = '';
  var tertiaryTxt   = '';
  if (textData['primaryText']) {
    primaryTxt = textData['primaryText']
  }
  if (textData['secondaryText']) {
    secondaryTxt = textData['secondaryText']
  }
  if (textData['tertiaryText']) {
    tertiaryTxt = textData['tertiaryText']
  }
  return new Alexa.RichTextContentHelper()
    .withPrimaryText(primaryTxt)
    .withSecondaryText(secondaryTxt)
    .withTertiaryText(tertiaryTxt)
    .getTextContent
}
