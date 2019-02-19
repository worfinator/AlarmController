const config = require('config');
const awsIOT = require('aws-iot-device-sdk');
const alarm = require('./alarm');
const commonConfig = config.get('Common');
const awsConfig = config.get('AWS');

const connection = {
    'keyPath': awsConfig.connection.keyPath,
    'certPath': awsConfig.connection.certPath,
    'caPath': awsConfig.connection.caPath,
    'clientId': awsConfig.connection.clientId,
    'host': awsConfig.connection.host
};

const shadowAccepted = `$aws/things/${awsConfig.device}/shadow/update/accepted`;

const device = awsIOT.device(connection);


device.on('connect', function () {
    console.log('awsIOT.device: connect');

    device.subscribe(awsConfig.topic);
    device.subscribe(shadowAccepted);

});

device.on('message', function (topic, payload) {
    const message = JSON.parse(payload);

    // only worry about message from other devices
    if (message.host != commonConfig.device && topic) {

        console.log('awsIOT.device:', topic, message);

        // Update alarm object if shadow update is received
        if (topic != awsConfig.topic && message.state.reported.status) {
            alarm.updateAlarm(message.state.reported.status);
        }

    }
});

device.notify = function (type, value) {
    const message = _createMessage(type, value);

    device.publish(awsConfig.topic, JSON.stringify(message));
}

function _createMessage(type, value) {
    const message = {
        "host": commonConfig.device,
        "type": type
    }

    message[type] = value;

    return message;
}

exports.device = device;