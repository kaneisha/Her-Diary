module.exports.controller = function(app) {

	app.post('/action/post/create', function(req, res) {
		
		var postModel = require('../models/postmodel');

		var post = {
			'title' : req.body.add_title,
			'author' : req.body.add_author,
			'category' : req.body.add_category,
			'text' : req.body.add_text
		};

		postModel.create(post, function(err, results) {
			res.redirect('/');
		});

	});
	
	app.post('/action/post/update', function(req, res) {
		
		var postModel = require('../models/postmodel');

		var post = {
			'id' : req.body.id,
			'title' : req.body.title,
			'author' : req.body.author,
			'text' : req.body.text
		};

		postModel.update(post, function(results) {
			res.redirect('/');
		});

	});

};
