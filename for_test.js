/**
 * Created by huudu on 5/19/2017.
 */
var moment = require("moment");

function test() {
    var date = '02-12-2017';
    var expire_time = moment(date, "DD-MM-YYYY").diff(moment(), 'seconds') + 1296000;//15 Ngày
    var expire_time_ = moment().diff(moment(date, "DD-MM-YYYY"), 'seconds') + 1296000;//15 Ngày
    console.log(expire_time);
    console.log(expire_time_);
    console.log(moment().diff(moment(date, "DD-MM-YYYY"), 'seconds'));
    console.log(moment(expire_time * 1000 + '', 'x').format('DD/MM/YYYY'));
}

// test();
var test = {};
module.exports = test;

function underscore(name) {
    var r = name.match(/[A-Z][a-z]+/g).map(function (word) {
        return word.toLowerCase();
    });
    return r.join('_');
}

function convertCamelToUnderScore(str) {
    var array = str.split("");
    array[0] = array[0].toLowerCase();
    for (var i = 1; i < array.length; i++) {
        if (array[i] == array[i].toUpperCase()) {
            array[i] = array[i].toLowerCase();
            array.splice(i, 0, "_");
        }
    }
    return array.join("");
}

//
// var data = ['ContractNumber', 'ContractNumber', 'ContractOwnerName', 'ContractOwnerComapany', 'ContractOwnerComapany', 'ContractNumber', 'ContractOwnerName', 'ContractOwnerComapany', 'ContractOwnerComapany', 'ContractNumber', 'ContractOwnerName', 'ContractOwnerComapany', 'ContractOwnerComapany', 'ContractNumber', 'ContractOwnerName', 'ContractOwnerComapany', 'ContractOwnerComapany'];
//
// console.time('timerName');
// data.map(function (item) {
//     return underscore(item);
// });
// console.timeEnd('timerName');
//
// console.time('timerName');
// data.map(function (item) {
//     return convertCamelToUnderScore(item);
// });
// console.timeEnd('timerName');