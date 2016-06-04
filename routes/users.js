var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  console.log("Recibida petición de login: " + req.body);
  var user = req.body;
  var db = req.db;
    var collection = db.get('usercollection');
    collection.find({username:user.username},{},function(e,docs){
      console.log(docs);
      if(docs.length > 0){
        if(docs[0].password == user.password){
          res.send(true);
        }else{
          res.send(false);
        }
      }else{
          res.send(false);
      }
        //res.send(docs);
    });
});
module.exports = router;
