var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
  console.log("Recibida petición de login: " + req.body);
  var user = req.body;
  var db = req.db;
    var collection = db.get('usercollection');
    collection.find({username:user.username},{},function(e,docs){
      console.log(docs);
      if(docs.length > 0){
        if(docs[0].password == user.password){
          console.log(docs[0]["_id"]);
          var data = {
            result: true,
            userId: docs[0]["_id"]
          }
          res.send(data);
        }else{
          res.send(false);
        }
      }else{
          res.send(false);
      }
        //res.send(docs);
    });
});

router.post('/alarms', function(req, res, next) {
  //TO-DO Ordenar alarmas por tiempo 
  console.log("Recibida petición de alarmas: " + JSON.stringify(req.body));
  var user = req.body;
  var db = req.db;
    var collection = db.get('alarms');
    collection.find({userId:user.userId},{},function(e,docs){
      console.log(docs);
      res.send(docs);

    });
});

router.post('/getLastConversations', function(req, res, next) {
  console.log("Recibida petición de last conversations: " + JSON.stringify(req.body));
  var user = req.body;
  var db = req.db;
    var collection = db.get('conversation');
    collection.find({userId:user.userId},{sort: {time: -1}},function(e,docs){
      console.log(docs);
      res.send(docs);
    });
});

module.exports = router;
