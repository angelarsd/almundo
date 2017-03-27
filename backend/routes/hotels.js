module.exports = function(app) {

  var Hotels = require('../models/hotels.js');

  allowCrossDomain = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
  }  

  findAllHotels = function(req, res) {
    allowCrossDomain(req, res);
  	Hotels.find(function(err, hotels) {
  		if(!err) {
        console.log('GET /hotels')
  			res.send(hotels);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	})
  };

  paginateHotels = function(req, res) {
    allowCrossDomain(req, res);
    var page = req.param('page') === undefined ? 1 : req.param('page');
    //var stars = req.param('stars') === undefined ? 1 : req.param('stars');
    Hotels.paginate({}, { page: page, limit: 20 }, function(err, hotels) {
      if(!err) {
        console.log('GET /paginate page='+page);
        res.send(hotels);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  app.get('/hotels', findAllHotels);
  app.get('/paginate', paginateHotels);

}