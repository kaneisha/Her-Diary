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
var BSON = mongodb.BSONPure;

var databaseName = 'mongodb://localhost:27017/adbblog';
var collectionName = 'posts';

exports.create = function(query, fn) {

	var post = {
		'title' : query.title,
		'author' : query.author,
		'category' : query.category,
		'text' : query.text
	};

	mongoClient.connect(databaseName, function(err, db) {

		db.collection(collectionName).insert(post, function(err, results) {
			fn(err, results);
			db.close();
		});

	});

};

//-----------------Listing all posts
exports.readAll = function(fn) {

	mongoClient.connect(databaseName, function(err, db) {

		db.collection(collectionName).find().toArray(function(err, results) {
			fn(err, results);
			db.close();
		});

	});
};

//--------------------Find post info
exports.readById = function(id, fn) {

	mongoClient.connect(databaseName, function(err, db) {

		db.collection(collectionName).findOne({
			'_id' : new BSON.ObjectID(id)
		}, function(err, results) {

			console.log(results);

			fn(err, results);
			db.close();
		});

	});
};

//---------------------Update a Post
exports.update = function(query, fn) {

	var update = {
		'title' : query.title,
		'author' : query.author,
		'category' : query.category,
		'text' : query.text
	};

	mongoClient.connect(databaseName, function(err, db) {

		db.collection(collectionName).update({
			'_id' : new BSON.ObjectID(query.id)
		}, {
			$set : update
		}, function(err, results) {
			fn(err, results);
			db.close();
		});

	});

};

//---------------------Delete a Post
exports.deleteById = function(id, fn) {

	mongoClient.connect(databaseName, function(err, db) {

		db.collection('posts').remove({
			'_id' : new BSON.ObjectID(id)
		}, function(err, results) {
			fn(err, results);
			db.close();
		});

	});

};

