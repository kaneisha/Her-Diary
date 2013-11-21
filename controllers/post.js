module.exports.controller = function(app) {

	// create post /post/create
	// read post /post/info?id=
	// edit post /post/edit?id=

	app.get('/post/create', function(req, res) {

		var data = {};
		res.render('post/create');

	});

	app.get('/post/info', function(req, res) {

		var postId = req.query.id;

		var postModel = require('../models/postModel');

		postModel.readById(postId, function(err, results) {
			var data = results;
			res.render('post/info', data);
		});

	});

	app.get('/post/update', function(req, res) {

		var postId = req.query.id;

		var postModel = require('../models/postModel');

		postModel.readById(postId, function(err, results) {
			var data = results;
			res.render('post/update', data);
		});

	});

};
