const fs = require('fs');
const {Client} = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'tinder_events',
  password: 'pass2easy',
  port: 5432,
})
// create a write stream.

// format for timestamp: 1999-01-08 04:05:06

const genMatch = function() {
  // 2 mil matches = 4 mil swipes. = 6 mil rows total. then just do 2 mil of swipes for unrequited love and 2 mil user stuff.
  let uID = Math.floor(Math.random() * 10000000);
  let mUID = Math.floor(Math.random() * 10000000);
  let ts = '' + Date.now()
  // genSwipe() // put the stuff in here.
  return {uID, mUID, ts}
} // genMatch. insert into db. insert swipes right for each to the other.

const genSwipe = function(userA, userB, timeStamp) {
  // make userA swipe first. set the timeStamp back some random time.
  // then make userB swipe with the given timestamp.
}

// pools will use environment variables
// for connection information

const dbSetup = async function(client) {
  let matchQuery = `DROP TABLE IF EXISTS match_events; CREATE TABLE match_events (
    id SERIAL PRIMARY KEY,
    usera VARCHAR(8),
    userb VARCHAR(8),
    ts TIMESTAMP
  )`;
  let swipeQuery = `DROP TABLE IF EXISTS swipe_events; CREATE TABLE swipe_events (
    id SERIAL PRIMARY KEY,
    usera VARCHAR(8),
    userb VARCHAR(8),
    ts TIMESTAMP
  )`;

  await client.query(matchQuery);
  await client.query(swipeQuery);

  // let userQuery = 'DROP TABLE IF EXISTS user_events CREATE TABLE user_events';
}

async function generate(num) {
  await client.connect()
  //await dbSetup(client);
  let matchStream = fs.createWriteStream('matchData.txt', {'flags': 'a'});
  let swipeStream = fs.createWriteStream('swipeData.txt', {'flags': 'a'});

  for (let i = 1; i <= num; i++) {
    let match = genMatch();
    let matchString = `${match.uID}, ${match.mUID}, ${match.ts}\n`;
    matchStream.write(matchString);
    swipeStream.write(`${match.uID}, ${match.mUID}, ${match.ts}\n${match.mUID}, ${match.uID}, ${match.ts}\n`);
    if (i % 100000 === 0) console.log(i);
  }
  matchStream.end();
  await client.end();
}
generate(1000000);
