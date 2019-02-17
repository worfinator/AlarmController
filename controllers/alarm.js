const config = require('config');
const awsIOT = require('./awsIOT');

const commonConfig = config.get('Common');

var alarm = {};