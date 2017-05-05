/**
 * Created by huudu on 5/5/2017.
 */
var request = require('request');

function get_weather(location, callback) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(location) + '&mode=json&appid=8cc0cf33ff7c6ac14e22653a3f1eca9b&units=metric&lang=vi';
    request({url: url}, function (err, res, body) {
        if (err) {
            callback('Không thể lấy thông tin thời tiết', null);
            return;
        }
        var data = JSON.parse(body);
        var text = 'Thời tiết ở ' + location + ' có nhiệt đồ là ' + data.main.temp_min;
        callback(null, text);
    });
}
module.exports = {
    get_weather: get_weather
}