const fs = require('fs');
const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// format for timestamp should be: 1999-01-08 04:05:06
const genTimestamp = function() {
  let year = '2017';
  let month = ['08', '09', '10'][Math.floor(Math.random() * 3)];
  let day = Math.floor(Math.random() * 30) + 1;
  if (day < 10) day = '0' + day;
  return `${year}-${month}-${day}`;
}
const genMatch = function() {
  let auserid = Math.floor(Math.random() * 10000000);
  let buserid = Math.floor(Math.random() * 10000000);
  let ts = genTimeStamp();
  return {auserid, buserid, ts}
}

const insertMatch = function(db, match, callback) {
  // Get the documents colllection
  let matches = db.collection('matches');
  let swipes = db.collection('swipes');
  let swipeA = {auserid: match.auserid, buserid: match.buserid, swipe: 1, ts: match.ts};
  let swipeB = {auserid: match.buserid, buserid: match.auserid, swipe: 1, ts: match.ts};
  // Insert some documents.
  matches.insert(match, function(err) {
    if (err) console.log(err)
  });
  swipes.insertMany([swipeA, swipeB], function(err) {
    if (err) console.log(err)
  });
}


const generate = function(num) {
  const matchurl = 'mongodb://localhost:27017/tinderevents';
  // Use connect method to connect to the Server
  MongoClient.connect(matchurl, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    for (let i = 1; i <= num; i++) {
      insertMatch(db, genMatch(), (result)=> console.log(i))
      if (i % 250000 === 0) console.log(i);
    }
  });
}

generate(process.argv[2]);
