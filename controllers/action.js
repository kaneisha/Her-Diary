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
			res.redirect('/post/add');
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

		console.log(post);

		postModel.update(post, function(results) {
			var data = results;
			console.log('results are ' + results);
			res.redirect('/post/add');
		});

	});

};
