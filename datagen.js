/*
  insert into db with:
  mongoimport -d timder -c swipes --type csv --file ../swipes.csv -f usera,userb,swipe,match,ts --numInsertionWorkers 4
  where numInsertWorkers is the amount of threads in your cpu.
*/

//console.time('execution'); // program generates 10m entries in 21566ms.
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

const timestamp = function() {
  let year = '2017';
  let month = ['08', '09', '10'][Math.floor(Math.random() * 3)];
  let day = Math.floor(Math.random() * 30) + 1;
  if (day < 10) day = '0' + day;
  return `${year}-${month}-${day}`;
}

const swipe = function() {
  let swipe = Math.random() < 0.56 ? 1 : 0;
  let match = 0;
  if (swipe === 1) match = Math.random() < 0.34 ? 1 : 0;
  return `${Math.floor(Math.random() * 10000000)},${Math.floor(Math.random() * 10000000)},${swipe},${match},${timestamp()}\n`
}

const swipeStream = fs.createWriteStream('../swipes.csv');
let count = process.argv[2];
let ok = true;

let write = function(callback) {
  do {
    count--;
    if (count % 100000 === 0) console.log(count);
    if (count === 0) { //last write.
      swipeStream.write(swipe(), 'utf8');
    //  console.timeEnd('execution');
    }
    ok = swipeStream.write(swipe(), 'utf8');
  } while (count > 0 && ok)
  if (count > 0) {
    swipeStream.once('drain', write);
  }
}
write();