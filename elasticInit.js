// go from day 1 to day 90. get a count of the days swipes.
// feed that into elasticsearch.

// NOTE: It's a good idea to create an index for ts and match before running this file.
const mongo = require('mongodb').MongoClient
const elastic = require('elasticsearch');
const url = 'mongodb://localhost:27017/tinder'
const months = ['08', '09', '10'];
let days = []
for (let i = 1; i <= 30; i++) {
  if (i < 10) days.push('0'+ i);
  else days.push('' + i);
}

mongo.connect(url, (err, db) => {
  if (err) console.log('ERROR CONNECTING TO MONGO.', err);
  else {
    console.log('Successfully connected to MongoDB');
    const swipes = db.collection('swipes');
    let completed = 0;
    for (month of months) {
      for (day of days) {
        let date = `2017-${month}-${day}`;
        swipes.find({'ts': date}).count((err, count) => {
          console.log(`ts: ${date}, count: ${count}`)
          if (++completed === 90) db.close()
        })
      }
    }
  }
})







 /**
 + * Clears the query logger
 + * @function
 + */
