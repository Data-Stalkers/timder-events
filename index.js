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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})