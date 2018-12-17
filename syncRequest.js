const request = require('request')

/*http同期処理を行う*/
exports.request = async function (url) {
    let response = function () {
        return new Promise(function (resolve , reject){
            request.get({
                url:url
            } , function (error , response , body) {
                if(!error) {
                    resolve(body)
                } else {
                    reject(error)
                }
            })
        })
    }
    try {
        let res = await response()
        var jsonData = JSON.parse(res)
        return jsonData
    }catch (e) {
        return null
    }
}