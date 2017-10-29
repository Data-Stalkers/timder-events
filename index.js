const express = require('express')
const app = express()

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
   hosts: [ 'http://localhost:9200']
});

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
  res.send('Hello World!')
})

app.post('/swipe', function(req, res) {
  // swipe should contain other persons swipe info if available.
  // elasticsearch should be updating the days swipe count (only).
  // so i could set up elastic search to pull from mongo data.
  // then just setup a js thing that keeps posting to this route.
  // generating swipes and matches.
  console.log('someones attempting to post.');
  res.status(201).end('thanks for coming');
});

app.post('/match', function(req, res) {

});

app.listen(3000, function () {
  console.log('Event service listening on port 3000!')
})