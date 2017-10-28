const fs = require('fs');

// format for timestamp: 1999-01-08 04:05:06

const genMatch = function() {
  // 2 mil matches = 4 mil swipes. = 6 mil rows total. then just do 2 mil of swipes for unrequited love and 2 mil user stuff.
  let uID = Math.floor(Math.random() * 10000000);
  let mUID = Math.floor(Math.random() * 10000000);
  let ts = '' + Date.now()
  // genSwipe() // put the stuff in here.
  return {uID, mUID, ts}
} // genMatch. insert into db. insert swipes right for each to the other.

function generate(num) {
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
  swipeStream.end();
}
generate(10);
