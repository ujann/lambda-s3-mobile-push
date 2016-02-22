# lambda-s3-mobile-push
Proof of Concept: Send a push message to Android whenever a new json file arrives in my bucket

## how get this running?
- you need an app on your Android phone to receive Push-Messages
  - I took mine from https://github.com/googlesamples/google-services/tree/master/android/gcm
  - register your app at GCM (Google Cloud Messaging) according to https://developers.google.com/cloud-messaging/android/client)
- replace the `key=<REPLACE_WITH_GCM_AUTH_KEY>` in `index.json` with real GCM credentials
- `npm install`
- `gulp deploy` creates the zipped lambda source code
- you have to upload it manually to the lambda as automatic deployment didnt work yet (uncommented it in gulpfile, that's what `lambda-config.js` is for - stay tuned...)
- you can test it locally with `local-run.js`

enjoy...
