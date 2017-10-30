const request = require('request');
const timestamp = require('time-stamp');

let swipeCount = 0;
let matchCount = 0;

const swipeGen = () => {
  console.log('swipes: ', swipeCount, 'matches:', matchCount);
  let swipe = Math.random() < 0.56 ? 1 : 0;
  swipeCount++;
  let match = 0;
  if (swipe === 1) match = Math.random() < 0.34 ? 1 : 0;
  if (match === 1) matchCount++;
  let swipejson = {usera: Math.floor(Math.random() * 10000000),
            userb: Math.floor(Math.random() * 10000000),
            swipe: swipe,
            match: match,
            ts: timestamp()};
  let options = {
    method: 'POST',
    uri: 'http://localhost:3000/swipe',
    json: {swipe: swipejson}
  }
  request(options,
    function(err, res, body) {
      if (err) console.log('err posting swipe', err)
      else swipeGen();
  })
};

swipeGen();