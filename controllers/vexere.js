/**
 * Created by huudu on 5/10/2017.
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');
var swig = require('swig');
var fs = require('fs');

var counter = 0;
router.post('/', function (req, res, next) {
    var time = moment(parseInt(req.body.time_received)).format();
    console.log(req.body);
    setTimeout(function () {
        res.json({
            data: req.body,
            time: time,
            message: 'counter: ' + ++counter,
            code: 200
        })
    }, 1000);
});

module.exports = router;

(function test() {
    var filename = './controllers/vexere-sms.txt';
    fs.readFile(filename, 'utf8', function(err, t) {
        if (err) throw err;
        var data = {
            "booking": {
                "id": "1284294",
                "code": "P088JNN",
                "ticket_code": "ZE39H9",
                "status": 4,
                "tickets": [{
                    "is_deposit": true,
                    "discount": 0,
                    "discount_formatted": "0",
                    "surcharge": null,
                    "surcharge_formatted": "0",
                    "expired_time": "2017-05-24T16:00:00.000Z",
                    "id": "2767255",
                    "type": 2,
                    "code": "ZE39H9",
                    "pass_code": null,
                    "partner_code": null,
                    "trip_date": "2017-05-31T20:30:00.000Z",
                    "trip_name": "Sài Gòn - Nha Trang",
                    "trip_private_note": "857|tui dang test VMS adddddddd|Tui hong biet tieng anh, tui dang test VMS adddddd~1104|<span style=\"background-color:#FFD700\">aaaaaaaaaaaaaaaaaaaa&acirc;</span>|<span style=\"background-color:#FF0000\">sssssssssssssssssssssssssss</span>~1917|<u><strong>aaaaaaaaaaaaakkkkkkkkkkkkkkkkaaaaaaakkkkkkk<br />\nfwhfihừi ừniwf<br />\nn&ugrave;iw ột ưada fu&igrave;adauơgj&nbsp;<br />\ntui cũng hong biết đang ghi j nữa</strong></u>|english biết tui nhưng tui hem biết n&oacute;",
                    "from_area_info": "1~857|15|KPT|Khu phố Tây",
                    "to_area_info": "1~1917|16|NTG|Vp.Nha Trang",
                    "seat_code": "C2|2|1|5",
                    "transfer_info": null,
                    "pickup_info": "Phạm Ngũ Lão, Quận 1, Hồ Chí Minh",
                    "pickup_date": "2017-05-31T20:30:00.000Z",
                    "pickup_time": null,
                    "transfer_time": null,
                    "pickup_transfer_info": ["", "", "0", "", ""],
                    "customer_info": "1|1|841581|Thắng test|0942965061||minhthang.nguyen@vexere.com||0123456789|VN",
                    "fare": 80000,
                    "fare_formatted": "80.000",
                    "deposit": null,
                    "refund": null,
                    "deposit_formatted": "0",
                    "operator_payment_info": "7",
                    "operator_payment_method": "7:VeXeRe:",
                    "payment_info": "5:Online:2|||GM9M_P088JNN|||",
                    "status": 4,
                    "payment_type": null,
                    "cancel_fee": null,
                    "cancel_fee_formatted": "0",
                    "cancelled_user": null,
                    "chargeDate": "2017-05-24T15:26:23.000Z",
                    "user_charge": "fe.client.vxr",
                    "issue_date": null,
                    "last_moved_trip": null,
                    "last_moved_date": null,
                    "is_not_seat_code": 1,
                    "created_date": "2017-05-24T15:24:40.000Z",
                    "receive_ticket_date": "2017-05-24T16:00:00.000Z",
                    "refundable": 0,
                    "bus_operator_status": 0,
                    "customer": {
                        "id": "841581",
                        "name": "Thắng test",
                        "phone": "0942965061",
                        "email": "minhthang.nguyen@vexere.com"
                    },
                    "company": {
                        "id": "858",
                        "type": 1,
                        "name": "Phương Nam",
                        "fullname": "",
                        "phone_info": "08 3836 4086",
                        "address": "275E Phạm Ngũ Lão, P. Phạm Ngũ Lão"
                    },
                    "to_area": {
                        "id": "1917",
                        "type": 16,
                        "code": "NTG",
                        "name": "Vp.Nha Trang",
                        "address": "Số 3 Nguyễn Chánh",
                        "base": {
                            "id": "417",
                            "name": "Nha Trang"
                        },
                        "base_state": {
                            "id": null,
                            "type": null,
                            "code": null,
                            "name": null
                        }
                    },
                    "from_area": {
                        "id": "857",
                        "type": 15,
                        "code": "KPT",
                        "name": "Khu phố Tây",
                        "address": "Phạm Ngũ Lão",
                        "base": {
                            "type": 5,
                            "code": "",
                            "name": "Quận 1"
                        },
                        "base_state": {
                            "type": 3,
                            "code": "HCM",
                            "name": "Hồ Chí Minh"
                        }
                    }
                }
                ],
                "first": {
                    "is_deposit": true,
                    "discount": 0,
                    "discount_formatted": "0",
                    "surcharge": null,
                    "surcharge_formatted": "0",
                    "expired_time": "2017-05-24T16:00:00.000Z",
                    "id": "2767255",
                    "type": 2,
                    "code": "ZE39H9",
                    "pass_code": null,
                    "partner_code": null,
                    "trip_date": "2017-05-31T20:30:00.000Z",
                    "trip_name": "Sài Gòn - Nha Trang",
                    "trip_private_note": "857|tui dang test VMS adddddddd|Tui hong biet tieng anh, tui dang test VMS adddddd~1104|<span style=\"background-color:#FFD700\">aaaaaaaaaaaaaaaaaaaa&acirc;</span>|<span style=\"background-color:#FF0000\">sssssssssssssssssssssssssss</span>~1917|<u><strong>aaaaaaaaaaaaakkkkkkkkkkkkkkkkaaaaaaakkkkkkk<br />\nfwhfihừi ừniwf<br />\nn&ugrave;iw ột ưada fu&igrave;adauơgj&nbsp;<br />\ntui cũng hong biết đang ghi j nữa</strong></u>|english biết tui nhưng tui hem biết n&oacute;",
                    "from_area_info": "1~857|15|KPT|Khu phố Tây",
                    "to_area_info": "1~1917|16|NTG|Vp.Nha Trang",
                    "seat_code": "C2|2|1|5",
                    "transfer_info": null,
                    "pickup_info": "Phạm Ngũ Lão, Quận 1, Hồ Chí Minh",
                    "pickup_date": "2017-05-31T20:30:00.000Z",
                    "pickup_time": null,
                    "transfer_time": null,
                    "pickup_transfer_info": ["", "", "0", "", ""],
                    "customer_info": "1|1|841581|Thắng test|0942965061||minhthang.nguyen@vexere.com||0123456789|VN",
                    "fare": 80000,
                    "fare_formatted": "80.000",
                    "deposit": null,
                    "refund": null,
                    "deposit_formatted": "0",
                    "operator_payment_info": "7",
                    "operator_payment_method": "7:VeXeRe:",
                    "payment_info": "5:Online:2|||GM9M_P088JNN|||",
                    "status": 4,
                    "payment_type": null,
                    "cancel_fee": null,
                    "cancel_fee_formatted": "0",
                    "cancelled_user": null,
                    "chargeDate": "2017-05-24T15:26:23.000Z",
                    "user_charge": "fe.client.vxr",
                    "issue_date": null,
                    "last_moved_trip": null,
                    "last_moved_date": null,
                    "is_not_seat_code": 1,
                    "created_date": "2017-05-24T15:24:40.000Z",
                    "receive_ticket_date": "2017-05-24T16:00:00.000Z",
                    "refundable": 0,
                    "bus_operator_status": 0,
                    "customer": {
                        "id": "841581",
                        "name": "Thắng test",
                        "phone": "0942965061",
                        "email": "minhthang.nguyen@vexere.com"
                    },
                    "company": {
                        "id": "858",
                        "type": 1,
                        "name": "Phương Nam",
                        "fullname": "",
                        "phone_info": "08 3836 4086",
                        "address": "275E Phạm Ngũ Lão, P. Phạm Ngũ Lão"
                    },
                    "to_area": {
                        "id": "1917",
                        "type": 16,
                        "code": "NTG",
                        "name": "Vp.Nha Trang",
                        "address": "Số 3 Nguyễn Chánh",
                        "base": {
                            "id": "417",
                            "name": "Nha Trang"
                        },
                        "base_state": {
                            "id": null,
                            "type": null,
                            "code": null,
                            "name": null
                        }
                    },
                    "from_area": {
                        "id": "857",
                        "type": 15,
                        "code": "KPT",
                        "name": "Khu phố Tây",
                        "address": "Phạm Ngũ Lão",
                        "base": {
                            "type": 5,
                            "code": "",
                            "name": "Quận 1"
                        },
                        "base_state": {
                            "type": 3,
                            "code": "HCM",
                            "name": "Hồ Chí Minh"
                        }
                    }
                },
                "amount": 2,
                "seats": "C2, C4",
                "created_at": "11:23 26/05/2017",
                "coupon": {
                    "value": null,
                    "campaign": {},
                    "value_formatted": "0"
                },
                "delivery": {
                    "shop_address": null,
                    "shipping_fee": "",
                    "shipping_fee_formatted": "0"
                },
                "discount": 0,
                "surcharge": 0,
                "payment_type_id": 1,
                "payment_name": "Online",
                "bankcode": "Online",
                "total_price": 160000,
                "isCharged": true,
                "hotline": "1900 969681",
                "email": "cs@vexere.com",
                "is_show_banner": false,
                "discount_formatted": "0",
                "surcharge_formatted": "0",
                "payoo_discount": 0,
                "payoo_discount_formatted": "0",
                "transaction_info": {
                    "card_number": "",
                    "short_card_number": "",
                    "transaction_id": "P088JNN",
                    "card_type": "",
                    "request_id": "GM9M_P088JNN",
                    "auth_code": ""
                },
                "total_price_formatted": "160.000",
                "refund": "0",
                "cancel_fee": "0",
                "canceled_seats": "",
                "isAtStartPointOfTrip": true,
                "private_note": "tui dang test VMS adddddddd",
                "english_private_note": "Tui hong biet tieng anh, tui dang test VMS adddddd"
            },
            "vxr_bank": {}
        };
        var r = swig.compile(t)(data);
        console.log(r);
    });
})();
