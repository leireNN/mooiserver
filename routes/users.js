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

router.post('/register', function(req, res, next) {
  console.log("Recibida petición de registro: " + JSON.stringify(req.body));
  var user = req.body;

  var db = req.db;
  var collection = db.get('usercollection');

  //Inserción en la base de datos

  //TO-DO Comprobación de previa existencia del username
  collection.insert({
    username: user.username,
    password: user.password,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    lastname2: user.lastname2
  }, {}, function(e,docs){
    console.log("Error en el insert");
    if(e){
      res.send(e);
    }else{
      res.send(docs);
    }
  });



});

router.post('/alarms', function(req, res, next) {
  //TO-DO Ordenar alarmas por tiempo
  console.log("Recibida petición de alarmas: " + JSON.stringify(req.body));
  var user = req.body;
  var db = req.db;
    var collection = db.get('alarms');
    collection.find({userId:user.userId},{limit: 5, sort: {time:-1}},function(e,docs){
      console.log(docs);
      res.send(docs);

    });
});

router.post('/getNotifications', function(req, res, next) {
  //TO-DO Ordenar alarmas por tiempo
  console.log("Recibida petición de notificaciones: " + JSON.stringify(req.body));
  var user = req.body;
  var db = req.db;
    var collection = db.get('usercollection');
    collection.find({username:user.username},{},function(e,docs){
      console.log(docs);
      res.send(docs);

    });
});

router.post('/updateAlarms', function(req, res, next) {
  //TO-DO Ordenar alarmas por tiempo
  console.log("Recibida petición de actualización de medicamentos: " + JSON.stringify(req.body));
  var user = req.body;
  var db = req.db;
  var collection = db.get('usercollection');
    collection.find({username:user.username},{},function(e,docs){
      console.log(docs);
      var medicamentos = docs[0].medicamentos;
      medicamentos.push({time:user.time, description: user.description})
      console.log("Recibida petición de actualización de medicamentos2: " + JSON.stringify(medicamentos));

        var collection = db.get('usercollection');
        collection.update(
          { "username" : user.username },
          { $set: { "medicamentos" : medicamentos } }, function(docs){
            res.send(docs);
          }
       );


    });


});

router.post('/getLastConversations', function(req, res, next) {
  console.log("Recibida petición de last conversations: " + JSON.stringify(req.body));
  var user = req.body;
  var db = req.db;
    var collection = db.get('conversation');
    collection.find({userId:user.userId},{limit:3, sort: {time: -1}},function(e,docs){
      console.log(docs);
      res.send(docs);
    });
});

module.exports = router;
