
const request = require('request');

//
// generate a swipe. post it to the node server. maintain a pool of right swipes.
//
let x = 0;
const swipe = () => request(
        {method: 'POST',
        uri: 'http://localhost:3000/swipe',
        json: {num: x++}
        }
        , function(err, res, body) {
          if (err) console.log('err posting swipe', err)
          else console.log('response ', body);
        })
swipe();

while (true) {
  
}
// const swipe = function() {
//   // generate a swipe.
//   // post to server.
//   // 30% chance that this will match.
// }