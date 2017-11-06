const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');
const config = require('./config.json');
const app = Consumer.create({
  queueUrl: config.queueUrl,
  handleMessage: (message, done) => {
    console.log(message);
    done();
  },
  sqs: new AWS.SQS()
});

app.on('error', (err) => {
  console.log(err.message);
});

app.on('empty', () => {
  console.log('timder swipes queue empty.');
})

app.start();
