var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("recibido get");
  var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.send(docs);
    });
});

module.exports = router;
