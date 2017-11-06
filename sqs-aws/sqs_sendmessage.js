// // Load the AWS SDK for Node.js
// / var AWS = require('aws-sdk');
// // Load credentials and set the region from the JSON file
// / const config = require('./config.json');
// AWS.config.update(config);
//
// // Create an SQS service object
// const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
//

const sqsMessage = function (swipe) {
  // can refactor to object pool and note performance.
  return JSON.stringify({
   DelaySeconds: 0,
   MessageAttributes: {
    user_id: {
      DataType: "Number",
      Value: swipe.usera
     },
    swiped_id: {
      DataType: "Number",
      StringValue: swipe.userb
     },
    swipe: {
      DataType: "Number",
      StringValue: swipe.swipe
    },
    match: {
      DataType: "Number",
      StringValue: swipe.match
    },
    timestamp: {
      DataType: "String",
      StringValue: swipe.ts
    }
   },
   MessageBody: "",
   QueueUrl: awsConfig.queueUrl
 })
}


module.exports = sqs;