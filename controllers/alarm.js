const config = require('config');
const awsIOT = require('./awsIOT');

const commonConfig = config.get('Common');

var alarm = {};

function updateAlarm(status) {
    alarm = status;
    console.log(alarm);
}

exports.updateAlarm = updateAlarm;