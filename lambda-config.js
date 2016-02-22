module.exports = {
  profile: 'private',
  region: 'eu-west-1',
  handler: 'index.handler',
  role: 'arn:aws:iam::523551005302:role/agenturpush-lambda-execution-role',
  functionName: 'agenturpush-consumer',
  timeout: 50,
  memorySize: 128,
  runtime: 'nodejs',
  eventSource: {
    EventSourceArn: 'arn:aws:s3:::agenturpush-poc',
    BatchSize: 200,
    StartingPosition: "TRIM_HORIZON"
  }
}
