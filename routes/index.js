var express = require('express');
var router = express.Router();
var request = require('request');

var data = {"data": { "events": {}}};

/**
id
name
image_url
timezone
tagline
description
location
  location_name
  address_line1
  addres_line2
  city
  state
  zipcode
  latitude
  longitue
organization
  id
  name
times[]
  id
  start
  end
*/

// var event1 = {
//   "id": "100",
//   "name": "Lorem Ipsum",
//   "image_url": 
//   "tagline": "Ipsum lorem",
//   "description": "Lorem ipsum dolor sit amet",
//   "locaton": {},
//   "organization" : {
//     "id": "1",
//     "name": "Lorem"
//   },
//   "times": [
//     {
//       "id": "1",
//       "start": ,
//       "end": 
//     }
//   ]
// };

/* GET home page. */
router.get('/', function(req, res, next) {
  var options = {
    url: 'https://my.api.mockaroo.com/mobilize_mock_data.json',
    headers: {
      'X-API-Key': '5351df80'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);

      if (typeof req.query.offset !== null && typeof req.query.limit !== null) {
        info = info.splice(req.query.offset,req.query.limit);
      } else if (req.query.limit !== null) {
        info = info.splice(0,req.query.limit);
      }
      
      res.header("Content-Type", "application/json");
      res.send(JSON.stringify(info));
    } else {
      res.send("Server error, my apologies");
    }
  }
  request(options,callback);


});

module.exports = router;
