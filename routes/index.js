var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  var options = {
    url: 'https://my.api.mockaroo.com/mobilize_mock_data.json?key=5351df80'
  };
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);

      if (typeof req.query.offset !== 'undefined' && typeof req.query.limit !== 'undefined') {
        info = info.splice(req.query.offset,req.query.limit);
      } else if (typeof req.query.limit !== 'undefined') {
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
