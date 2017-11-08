const awsConfig = require('./config.json');

const sqsMessage = function (swipe) {
  // can refactor to object pool and note performance.
  return {
    DelaySeconds: 0,
    MessageBody: JSON.stringify({
      user_id: swipe.usera,
      swiped_id: swipe.userb,
      swipe: swipe.swipe,
      match: swipe.match,
      timestamp: swipe.ts
    }),
    MessageAttributes: {
      'Swipes': {
        DataType: 'String',
        StringValue: 'Swipe Events'
      }
    },
    QueueUrl: awsConfig.queueUrl
  }
};


module.exports = sqsMessage;