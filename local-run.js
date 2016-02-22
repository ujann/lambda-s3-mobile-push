var AWS = require('aws-sdk');
AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'private'});

var lambda = require('./index').handler;

var event = {
    "Records": [
        {
            "eventName": "ObjectCreated:Put",
            "s3": {
                "object": {
                    "key": "eil1.json",
                    "size": 3020
                }
            }
        }
    ]
};

var context = {
    succeed: function (msg) {
        console.log(msg);
    },
    fail: function (msg, err) {
        console.error(msg, err);
    }
};

lambda(event, context);




