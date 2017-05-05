/**
 * Created by huudu on 5/5/2017.
 */
var request = require('request');

function getCity(lat, long, callback) {
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&sensor=true';
    request({url: url}, function (err, res, body) {
        if (err) {
            callback('Không thể lấy thông tin thành phố', null);
            return;
        }
        var data = JSON.parse(body);
        var city = data.results[0].address_components[5].long_name;
        callback(null, city);
    });
}

module.exports = {
    getCity: getCity
};