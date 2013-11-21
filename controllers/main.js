module.exports.controller = function(app) {

	// list all posts /

	app.get('/', function(req, res) {
		
		var model = require('../models/postModel');
		model.readAll(function(response) {
			
			var data = {};
			data.posts = response;
			
			res.render('main/index', data);
			
		});

	});

};
