var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose');


app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);   
});

app.get('/', function(req, res) {
  res.send("API RESTFUL AlMUNDO");
});

routes = require('./routes/hotels')(app);

mongoose.connect('mongodb://localhost/hotels', function(err, res) {
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});

server.listen(3000, function() {
  console.log("Node server running on http://127.0.0.1:3000");
});

