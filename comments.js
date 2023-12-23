// Create web server
var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/mean');
// Get all comments
router.get('/', function(req, res) {
    var collection = db.get('comments');
    collection.find({}, function(err, comments){
        if (err) throw err;
      	res.json(comments);
    });
});
// Get one comment
router.get('/:id', function(req, res) {
    var collection = db.get('comments');
    collection.findOne({ _id: req.params.id }, function(err, comment){
        if (err) throw err;
      	res.json(comment);
    });
});
// Create a comment
router.post('/', function(req, res){
    var collection = db.get('comments');
    collection.insert({
        title: req.body.title,
        content: req.body.content
    }, function(err, comment){
        if (err) throw err;
      	res.json(comment);
    });
});
// Update a comment
router.put('/:id', function(req, res){
    var collection = db.get('comments');
    collection.update({
        _id: req.params.id
    },
    {
        title: req.body.title,
        content: req.body.content
    }, function(err, comment){
        if (err) throw err;
      	res.json(comment);
    });
});
// Delete a comment
router.delete('/:id', function(req, res){
    var collection = db.get('comments');
    collection.remove({ _id: req.params.id }, function(err, comment){
        if (err) throw err;
      	res.json(comment);
    });
});
module.exports = router;