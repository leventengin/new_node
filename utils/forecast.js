const request = require('request')







const forecast = (lat, lon, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=9b2eec5f10411e497667403ec148caba&query=' + lat + ',' + lon 

    request({url: url, json: true}, (error, response) => {
                if (error) {
                    callback('unable to connect to forecast', undefined)
                } 
                else if (response.body.error){
                    callback('unable to create forecast', undefined)
                }
                else {
                    callback(undefined, 
                        response.body.current
                     )                    
                }
        })
}




module.exports = forecast
