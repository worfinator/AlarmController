# AlarmController

AlarmController is a Node.js based application to control PIFace_Alarm via a web interface.

## Status

This application is currently in development

## Configuration

All config options are located within the [./config/default.json](./config/default.json) file

The `AWS` object will need to contain your [certificate](#aws-messaging) information

The `Alarm` object is where you can setup the [inputs](#inputs) and [outputs](#outputs) you require for you Alarm system. 

## AWS Messaging

Alarm_monitor uses [AWS IOT Core](https://aws.amazon.com/iot-core/) MQTT/Device Shadows in order to communicate events, and allow for remote control. You will need to create an AWS account and set up an IOT device/thing with the name `alarm_app` and copy the certifcates into the [./certificates](.certificates) directory and update the `AWS` object in the [./config/default.json](./config/default.json) file with the certifcate filenames, host, and clientId. Make sure you use the same clientId as the `device/thing` you created `alarm_app`.

I recommend using a policy with iot:* and resources * for initial setup, and then locking it down once everything is running correctly.

`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "iot:*",
      "Resource": "*"
    }
  ]
}`

There are example messages, a device shadow, and policy within the [./samples/awsIOT]](./samples/awsIOT) directory. The default is configured to use the `piface_alarm` topic for status events and control. 

Within the AWS IOT Core console, select the "Test" option to open the MQTT client. Then subscribe to the correct topic, the default is `piface_alarm`, you should the be able to see messages sent from the piface_alarm service.

 ## Run

```bash
 cd AlarmController
 nodemon index.js
