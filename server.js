var express = require('express');
var moment = require('moment');
var app = express();


app.get('/:time', function(req, res) {
    var dateReq = req.params.time;
    var api;
    if(!(isNaN(dateReq))) {
      var test = moment.unix(dateReq);
        if(test.isValid()) {
          var time = timeConverter(dateReq);
          api = {"unix": dateReq, "natural": time};
        }
        else {
          api = {"unix": null, "natural": null};
        }
    }
    else {
      var test = moment(dateReq);
      if(test.isValid()) {
        var unix = toUnix(dateReq);
        api = {"unix": unix, "natural": dateReq};
      }
      else {
        api = {"unix": null, "natural": null};
      }
    }
    res.send(api);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function toUnix (date) {
  var unix = (new Date(date + " 01:00").getTime())/1000;
  console.log(unix);
  return unix;
}

function timeConverter (UNIX_timestamp) {
  var date = new Date(UNIX_timestamp * 1000);
  var months = ['Januar', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var year = date.getFullYear();
  var month = months[date.getMonth()];
  var day = date.getDate();

  var time = month + " " + day + ", " + year;
  console.log(time);
  return time;
}
