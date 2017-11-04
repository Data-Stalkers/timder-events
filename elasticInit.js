// go from day 1 to day 90. get a count of the days swipes.
// feed that into elasticsearch.

// NOTE: It's a good idea to create an index for ts and match before running this file.
const mongo = require('mongodb').MongoClient
var elasticsearch = require('elasticsearch');
const elasticClient = new elasticsearch.Client({
  host: '127.0.0.1:9200'
});

const mongourl = 'mongodb://localhost:27017/tinder'
const months = ['08', '09', '10'];
let days = []
for (let i = 1; i <= 30; i++) {
  if (i < 10) days.push('0'+ i);
  else days.push('' + i);
}
let dateCount = {}

mongo.connect(mongourl, (err, db) => {
  if (err) console.log('ERROR CONNECTING TO MONGO.', err);
  else {
    console.log('Successfully connected to MongoDB');
    const swipes = db.collection('swipes');
    let completed = 0;
    for (month of months) {
      for (day of days) {
        let date = `2017-${month}-${day}`;
        swipes.find({'ts': date}).count((err, count) => {
          dateCount[date] = count;
          if (++completed === 90) {
            db.close();
            elasticPost(dateCount);}
        });
      }
    }
  }
});

let elasticPost = function(dateCount) {
  // query for each item in dateCount. do a write.
  elasticClient.index({
    index: type: body: 
  })
}


 /**
 + * Clears the query logger
 + * @function
 + */
