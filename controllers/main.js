module.exports.controller = function(app) {

	// list all posts /

	app.get('/', function(req, res) {

		var model = require('../models/postModel');
		model.readAll(function(err, results) {

			var data = {};
			data.posts = results;

			res.render('main/index', data);

		});

	});

};
