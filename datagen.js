const fs = require('fs');
// const mongo = require('')
// format for timestamp: 1999-01-08 04:05:06

const genMatch = function() {
  let auserid = Math.floor(Math.random() * 10000000);
  let buserid = Math.floor(Math.random() * 10000000);
  let ts = '' + Date.now()
  return {auserid, buserid, ts}
}

const generate = function(num) {
  if (num > 1000000) {
    while (num > 1000000) {
      generate(1000000);
      num -= 1000000;
    }
    generate(num);
    return;
  }
  let matchStream = fs.createWriteStream('matchData.json', {'flags': 'a'});
  let swipeStream = fs.createWriteStream('swipeData.json', {'flags': 'a'});

  for (let i = 1; i <= num; i++) {
    let match = genMatch();
    matchStream.write(JSON.stringify(match) + '\n');
    let swipeA = {auserid: match.auserid, buserid: match.buserid, swipe: 1, ts: match.ts};
    let swipeB = {auserid: match.buserid, buserid: match.auserid, swipe: 1, ts: match.ts};
    swipeStream.write(JSON.stringify(swipeA) + '\n');
    swipeStream.write(JSON.stringify(swipeB) + '\n');
    if (i % 250000 === 0) console.log(i);
  }
  matchStream.end();
  swipeStream.end();
}

generate(process.argv[2]);
