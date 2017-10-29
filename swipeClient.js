
const request = require('request');

//
// generate a swipe. post it to the node server. maintain a pool of right swipes.
//

request({method: 'POST',
        uri: 'http://localhost:3000/swipe'}
        , function(err, res, body) {
          if (err) console.log('err posting swipe', err)
          else console.log('posted successfully.');
        })

const swipe = function() {
  // generate a swipe.
  // post to server.
  // 30% chance that this will match.
}

// setInterval(swipe, 10)