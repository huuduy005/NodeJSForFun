/**
 * Created by huudu on 5/19/2017.
 */
const moment = require("moment");

console.log(moment().utcOffset());

console.log(moment().utcOffset(420).format('HH:mm DD-MM-YY'));
console.log(moment().zone(-420).format('HH:mm DD-MM-YY'))