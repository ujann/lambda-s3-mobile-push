var async = require('async');
var request = require('request');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();


exports.handler = function (event, context) {
    console.log('Received event:', JSON.stringify(event.Records, null, 2));

    var record = event.Records[0];
    if (record.s3) {
        var srcKey = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));
        var article = null;
        console.log("KEY: " + record.s3.object.key);

        // Load S3 document:
        async.waterfall([
                function retrieveS3Object(callback) {
                    console.log("retreiving S3 Object: " + record.s3.object.key);
                    s3.getObject({
                            Bucket: 'agenturpush-poc',
                            Key: srcKey
                        },
                        callback);
                },
                function callEscenicImort(result, callback) {
                    article = JSON.parse(result.Body.toString());
                    console.log("Now I would call CMS.Import(aArticle)", article.title);
                    setTimeout(callback, 1000);
                },
                function triggerPush(callback) {
                    console.log("Now I am posting to GCM");

                    request({
                        url: 'https://gcm-http.googleapis.com/gcm/send',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'key=<REPLACE_WITH_GCM_AUTH_KEY>'
                        },
                        body: JSON.stringify({
                            "data": {
                                "message": "WN24 " + article.title
                            },
                            "to": "/topics/global"
                        })
                    }, callback);
                }
            ],
            function finish(err, response, body) {
                if (err || response.statusCode != 200) {
                    console.log('ERROR', err);
                    console.log('Error Response Code: ' + response.statusCode);
                    context.fail('Something went wrong', err);
                } else {
                    console.log("AgenturPoc Lambda finished successfully!");
                    context.succeed("OK"); // Echo back the first key value
                }
            });
    }else{
        context.fail('no s3 object in event');
    }

};
