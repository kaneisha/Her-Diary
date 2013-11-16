module.exports.controller = function(app) {

	app.get('/post/add', function(req, res) {
		var model = require('../models/postmodel.js');
		//var author = 'whippy';
		model.list_Posts(function(response){

			console.log(response[3]._id);

			var data = {};
			data.posts = response;
			res.render('post/add', data);
		})

      // any logic goes here
      
  });

  app.get('/post/*', function(req, res) {
      
      var data = {};
      data.something = "sdsads";

      res.render('post/index', data);
  });

};
