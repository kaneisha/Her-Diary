module.exports.controller = function(app) {

global.resp = {};

	app.get('/post/add', function(req, res) {
		var model = require('../models/postModel');
		//var author = 'whippy';
		model.readAll(function(response){

			//console.log(response[3]._id);

			var data = {};
			data.posts = response;
			res.render('post/add', data);
		})

      // any logic goes here
      
  });

      app.get('/post/info', function(req, res) {
    
      var postId = req.query.id

      var postModel = require('../models/postmodel');
     
    postModel.readById(postId,function(results){
      var data = results;
      res.render('post/info', data);
    });

  });
//--------------------------------------- Create ----------------------------------------//

	app.get('/post/create', function(req, res){
  
			var data = {} 
      res.render('post/create')

  })

  app.post('/post/create', function(req, res){
    var postModel = require('../models/postmodel');

    //console.log(req.body);

    var post = {
    // 'id': req.body.add_id,
     'title': req.body.add_title,
     'author': req.body.add_author,
     'category': req.body.add_category,
     'text': req.body.add_text 
    };

    //console.log(post);

    postModel.create(post,function(results){
      var data = results;
      console.log('results are '+ results);
      res.redirect('/post/add');
    
    });

  })
//--------------------------------------- Update ----------------------------------------//

  app.post('/post/update', function(req, res){
  	var postModel = require('../models/postmodel');

  	console.log(req.body);

  	var post = {
  		'id': req.body.id,
  		'title': req.body.title,
  		'author': req.body.author,
  		'text': req.body.text 
  	};

  	console.log(post);

  	postModel.update(post,function(results){
			var data = results;
			console.log('results are '+ results);
			res.redirect('/post/add');
		});

  })

  app.get('/post/update', function(req, res){

  		var postId = req.query.id

    	var postModel = require('../models/postmodel');
     
		postModel.readById(postId,function(results){
			var data = results;
			res.render('post/update', data);
			console.log("results");
			console.log(results);
		});
  })

//--------------------------------------- Delete ----------------------------------------//
// app.get('/post/delete', function(req, res){

//       var postId = req.query.id

//       var postModel = require('../models/postmodel');
     
//     postModel.delete_post(postId,function(results){
//       var data = results;
//       //res.render('post/update', data);
//       console.log("results");
//       console.log(results);
//       res.redirect('/post/add');
//     });
//   })


};
