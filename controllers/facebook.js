/**
 * Created by HP on 15/12/2016.
 */
var express = require('express');
var request = require('request');
var router = express.Router();
var fs = require('fs');
var fb_chat = require('./facebook-chat');

var maps = require('../services/maps.googleapis'),
    weather = require('../services/openweathermap');

const SimsimiServices = require('../services/simsimi/index');
const FBServices = require('../services/facebook');
const TempsModel = require('../models/temp');

var code_verify = 'hulo005';
var mAccessToken = 'EAATnBNPBOEgBAAZBDnJg1dv3vbKvFal6Em5LLFP7mvGInJsHjUwcODngcVa15oIhTLO6wPOauq1cIeYiWYghvOBiVRWIscou2cigeFi3JiIe4WG8C206CqxprXKfblHRSoT52JBUxPczrasAUGkev7ZAxYD3D9PFOP5U3gQgZDZD';
mAccessToken = 'EAATnBNPBOEgBAGQokgFTb1Unjhmo1nQyMVF82W9DlaJU86P5MYVfZCZBIPUpDpsG0HeB5SLfmhmP0NBcmZAQQz8HvDY0vIoYI77szeZBGOgWFUobgv8Paq5GkJISXg72Sj20C2d4ZCBHCy3Foj5UcFituxooIYvKpkmMH0Sm4ZCseG40ZAIOAum';

//Facebook xác thực webhook
router.get('/', function (req, res) {
    if (req.query['hub.verify_token'] === code_verify) {
        res.send(req.query['hub.challenge']);
    } else
        res.send('Error, wrong validation token');
});

router.post('/test', function (req, res) {
    var senderId = ' tem';
    var lat = 10.819633,
        long = 106.6337246;
    maps.getCity(lat, long, function (err, city) {
        if (err) {
            console.log('Lấy tên thành phố bị lỗi')
            return;
        }
        weather.get_weather(city, function (err, result) {
            if (err) {
                console.log('Lấy thông tin thời tiết bị lỗi');
                return;
            }
            sendMessage(senderId, result);
        })
    });
});

async function handleFB(body) {
    try {
        let temp = new TempsModel({__source__: 'fb', ...body});
        await temp.save();
    } catch (e) {
        console.warn('>> FB: body ko phai object');
        let temp = new TempsModel({__source__: 'fb', __data__: JSON.stringify(body)});
        await temp.save();
    }
}

//Nhận tin nhắn từ facebook
router.post('/', function(req, res) {
    handleFB(req.body);
    let entries = req.body.entry;
  for (let entry of entries) {
    let {messaging} = entry;
    for (let objMess of messaging) {
      let {message, sender} = objMess;
      let senderId = sender.id;
      if (message) {
        // If user send text
        if (message.text) {
          let {text} = message;
          sendMessBySimi(senderId, text);
        }
        if (message.attachments) {
          handleAttachments(objMess);
        }
      }
    }
  }
  res.status(200).send('OK');
});

function handleAttachments({sender, message}) {
  let {attachments} = message;
  let senderId = sender.id;
  for (let attachment of attachments) {
    if (attachment.type === 'location') {
      let {lat, long} = attachment.payload.coordinates;
      console.log(lat + '-' + long);

      maps.getCity(lat, long, function(err, city) {
        if (err) {
          console.log('Lấy tên thành phố bị lỗi');
          return;
        }
        weather.get_weather(city, function(err, result) {
          if (err) {
            console.log('Lấy thông tin thời tiết bị lỗi');
            return;
          }
          console.error('SENDER', senderId);
          sendMessage(senderId, result);
        });
      });

      sendMessage(senderId, `Vị trí của bạn (${lat}, ${long})`);
      sendBusAround(senderId, lat, long);
    }
  }
}

var mCookies = request.jar();
var uid = '';
function getCookie() {
    request({
        url: 'http://simsimi.com/storygame/main',
        jar: mCookies
    }, function (err, res, body) {
        request({
            url: 'http://simsimi.com/getUUID',
            jar: mCookies
        }, function (err, res, body) {
            var data = JSON.parse(body);
            uid = data.uuid;
        });
    });
}

// getCookie();

function _old_sendMessBySimi(senderId, text) {
    var URI = 'http://simsimi.com/getRealtimeReq?uuid=' + uid + '&lc=vi&ft=1&reqText=' + text + '&status=W';
    URI = encodeURI(URI);
    request({
        url: URI,
        jar: mCookies
    }, function (err, res, body) {
        var data = JSON.parse(body);
        if (data.status === 200) {
            var mess = data.respSentence;
            sendMessage(senderId, mess);
        } else {
            sendMessage(senderId, 'Xin lỗi mình không hiểu câu nói của bạn!!! :)');
            getCookie();
        }
    });
}

async function sendMessBySimi(senderId, text) {
    let mess = await SimsimiServices.getTextRaw(text);
    if (!mess) mess = 'Xin lỗi câu nói của bạn phắc tạp quá :|';
    sendMessage(senderId, mess);
}

function sendMessage(senderId, message) {
  FBServices.sendMessage(senderId, message).catch(err => {
    console.error('>> FB: send mess fail', err);
  });
}

function sendBusAround(senderId, lat, long) {
    var URL = 'http://apicms.ebms.vn/businfo/getstopsinbounds/' + (long - 0.0025) + '/' + (lat - 0.0025 ) + '/' + (long + 0.0025) + '/' + (lat + 0.0025);
    URLBus.push(URL);
    console.log(URL);
    request({
        url: URL,
        json: true
    }, function (err, res, body) {
        if (body.length === 0) {
            sendMessage(senderId, 'Không tìm thấy trạm xe bus gần bạn!\nBot chỉ có thể tìm các tuyến trong TP.HCM');
        } else {
            var data = {
                recipient: {
                    id: senderId
                },
                message: {
                    attachment: {
                        type: "template",
                        payload: {
                            template_type: "generic"
                        }
                    }
                }
            };
            var ele = [];
            for (var stop of body) {
                var info = {
                    title: 'Trạm dừng ' + stop.Name,
                    item_url: 'https://sticket.herokuapp.com',
                    image_url: 'https://www.ticketdesign.com/wp-content/uploads/2014/05/ticket-logo-.003.jpg',
                    subtitle: 'Địa bàn: ' + stop.Zone
                    + '\nTuyến: ' + stop.Routes
                    + '\nCách bạn: ' + getDistanceFromLatLonInKm(lat, long, stop.Lat, stop.Lng).toFixed(2) + ' (Km)'
                    + '\nĐường: ' + stop.Street,
                    buttons: [
                        {
                            type: "web_url",
                            url: "https://sticket.herokuapp.com",
                            title: "Ghé website của Bot"
                        },
                        {
                            type: 'web_url',
                            url: 'https://www.google.com/maps/dir/' + lat + ',' + long + '/' + stop.Lat + ',' + stop.Lng,
                            title: 'Xem trên bản đồ'
                        }
                    ]
                };
                ele.push(info);
            }
            data.message.attachment.payload.elements = ele;
            console.log(data);
            fs.writeFile("./fb.json", JSON.stringify(data), function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
            //
            fb_chat.sendListTemplate(senderId, ele)
            //
            request({
                url: 'https://graph.facebook.com/v2.6/me/messages',
                qs: {
                    access_token: mAccessToken,
                },
                method: 'POST',
                json: data
            });
        }
    });
}

var URLBus = [];
router.get('/busURL', function (req, res) {
    res.send(URLBus);
});

router.get('/bus', function (req, res) {
    sendBusAround(123213, 10.756455759090029, 106.68196452856064);
    res.send('OK');
});

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

module.exports = router;
