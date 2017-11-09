const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i += 1) {
      cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
  console.log(`worker ${worker.process.pid} died`);
});
}
else {
// bad indenting but there's a lot going on.
// let's start from the beginning.
console.log(`Worker ${process.pid} started`);
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const elasticsearch = require('elasticsearch');
const mongo = require('mongodb');

//AWS / SQS
var AWS = require('aws-sdk');
const awsConfig = require('./sqs-aws/config.json');
AWS.config.update(awsConfig);
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const sqsMessage = require('./sqs-aws/sqs_sendmessage.js');
// ----------------------------------------
// NOTE: Actual Express app begins here.
// ----------------------------------------

const client = new elasticsearch.Client({
   hosts: [ 'http://localhost:9200']
});

app.use(bodyParser());

app.get('/', function (req, res) {
  client.ping({
     requestTimeout: 3000,
 }, function(error) {
     if (error) {
         console.error('elasticsearch cluster is down!');
     } else {
         console.log('Everything is ok');
     }
 });
  res.send('Hello World!');
})

app.post('/swipe', function(req, res) {
  // swipe should contain other persons swipe info if available.
  // elasticsearch should be updating the days swipe count (only).
  // so i could set up elastic search to pull from mongo data.
  // then just setup a js thing that keeps posting to this route.
  // generating swipes and matches.
  mongo.connect('mongodb://localhost:27017/tinderevents',
  function(err, db) {
    if (err) {
      console.log('ERROR CONNECTING TO MONGODB.', err);
      return}

    let swipes = db.collection('swipes');
    swipes.insertOne(req.body.swipe, (err, result) => {
      db.close();
      if (err) {
        res.status(400).end('DB WRITE ERROR.');
      } else {
        // gotta use the req. body.swipe info. maybe send it to sqs message.
        sqs.sendMessage(sqsMessage(req.body.swipe), function(err, data) {
          if (err) {
            console.log("Error with Sending to SQS:", err);
          } else {
            console.log("Success sending to SQS with messageId:", data.MessageId);
          }
        });
        res.status(201).end('swipe recorded in db.');
      }
    });
  });
})

app.listen(3000, function () {
  console.log('Event service listening on port 3000!')
})

}