module.exports.controller = function(app) {

	app.post('/action/post/create', function(req, res) {

		var postModel = require('../models/postModel');

		var post = {
			'title' : req.body.title,
			'author' : req.body.author,
			'category' : req.body.category,
			'text' : req.body.text
		};

		postModel.create(post, function(err, results) {
			res.redirect('/');
		});

	});

	app.post('/action/post/update', function(req, res) {

		var postModel = require('../models/postModel');

		var post = {
			'id' : req.body.id,
			'title' : req.body.title,
			'author' : req.body.author,
			'category' : req.body.category,
			'text' : req.body.text
		};

		postModel.update(post, function(err, results) {
			res.redirect('/');
		});

	});

};
