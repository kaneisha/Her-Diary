// // Bring Mongoose into the app
// var mongoose = require( 'mongoose' );

// // Build the connection string
// var dbURI = 'mongodb://localhost:27017/adbblog';

// // Create the database connection
// mongoose.connect(dbURI);

// // CONNECTION EVENTS
// // When successfully connected
// mongoose.connection.on('connected', function () {
//   console.log('Mongoose default connection open to ' + dbURI);
// });

// // If the connection throws an error
// mongoose.connection.on('error',function (err) {
//   console.log('Mongoose default connection error: ' + err);
// });

// // When the connection is disconnected
// mongoose.connection.on('disconnected', function () {
//   console.log('Mongoose default connection disconnected');
// });

// // If the Node process ends, close the Mongoose connection
// process.on('SIGINT', function() {
//   mongoose.connection.close(function () {
//     console.log('Mongoose default connection disconnected through app termination');
//     process.exit(0);
//   });
// });

// // BRING IN YOUR SCHEMAS & MODELS
// // For example
// //require('./../model/team');

// var Schema = mongoose.Schema;

// var post = new Schema({
// 	"author": String,
// 	"title": String,
// 	"datePosted": Date,
// 	"category": String,
// 	"text": String,
// 	"comments": String
// });

// var postModel = mongoose.model('post', post);

// //-----------------Listing all posts
// exports.list_Posts = function(fn){
// 	postModel.find().sort('datetime').exec(function(err,data){
// 		fn(data);
// 		//{"author" : query}
// 	});
// };

// //------------------Adding a post
// exports.add_post = function(query, fn){
// 	var post = new postModel({
// 		author: query.author,
// 		title: query.title,
// 		datePosted: query.datePosted,
// 		category: query.category,
// 		text: query.text,
// 		comments: query.comments
// 	});

// 	post.save(function(err){
// 		fn(err);
// 	});
// };

// //--------------------Fing post info
// exports.post_info = function(query, fn){
// 	postModel.findById({_id: query.id}, function(err, data){
// 		fn(data);
// 	});
// };

// //---------------------Update a Post
// exports.update = function(query, fn){
// 	postModel.findOneAndUpdate({"_id": query.id}, query, function(err, data){
// 		fn(data);
// 	});
// };

/*
 {
	 'title': String,
	 'author': String,
	 'category': String,
	 'text': String
 }
 */

var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var format = require('util').format;

exports.create = function(query, fn) {

	var post = {
		'title' : query.title,
		'author' : query.author,
		'category' : query.category,
		'text' : query.text
	};

	mongoClient.connect('mongodb://localhost:27017/adbblog', function(err, db) {

		db.collection('posts').insert(post, function(err, results) {
			fn(err, results);
			db.close();
		});
		
	});
	
};

//-----------------Listing all posts
exports.readAll = function(fn) {

	mongoClient.connect('mongodb://localhost:27017/adbblog', function(err, db) {

		db.collection('posts').find().toArray(function(err, results) {

			fn(results);
		});
	});
};

//--------------------Find post info
exports.readById = function(id, fn) {

	// var BSON = require('mongodb').BSONPure;
	// var obj_id = BSON.ObjectID.createFromHexString(info.id);

	mongoClient.connect('mongodb://localhost:27017/adbblog', function(err, db) {

		db.collection('posts').findOne({
			_id : id
		}, function(err, results) {
			fn(results);

		});
	});
};

//---------------------Update a Post
exports.update = function(query, fn) {

	var update = {
		'title': query.title,
		 'author': query.author,
		 'category': query.category,
		 'text': query.text
	};

	mongoClient.connect('mongodb://localhost:27017/adbblog', function(err, db) {

		db.collection('posts').update({
			_id : query.id
		}, {
			$set : update
		}, function(err, results) {
			fn(results);
		});
	});

};

//---------------------Delete a Post
exports.delete_post = function(query, fn) {

	mongoClient.connect('mongodb://localhost:27017/adbblog', function(err, db) {

		db.collection('posts').remove({
			_id : query.id
		}, function(err, results) {
			fn(results);
		});
	
	});
	
};

