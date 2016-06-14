var express = require('express');
var moment = require('moment');
var router = express.Router();
// var BrainJSClassifier = require('natural-brain');
// var classifier = new BrainJSClassifier();

/* GET home page. */
router.post('/', function(req, res, next) {

  console.log("recibido post de text...");
  console.log(req.body.userText);

  var text = req.body.userText;
  var clasi = classifier.classify(text);
  console.log(clasi);
  // classifier.addDocument('its hurt me a lot', 'hurt');
  // classifier.addDocument('its pain', 'hurt');
  // classifier.addDocument('i fell', 'alarm');
  // classifier.addDocument('I have a headache', 'hurt');
  // classifier.addDocument('I can not stand up', 'alarm');
  //
  //
  // classifier.train();
  classifier.addDocument(text, clasi);
  var db = req.db;
  var collection = db.get('train');
  collection.insert({
    userText: text, keyword: clasi
  });

  //Update alarm DataBase

  var now = moment();
  now = now.format();

  //Si es red/orange se mete en alarmas

  if(clasi == "assertive" || clasi == "energized"){
    collection = db.get('alarms');
    collection.insert({
      userText: text, time: now, userId: req.body.userId, color: clasi
    });
  }

  //Update conversation DataBase

  collection = db.get('conversation');

  //Respuestas por nivel de gravedad

  var red = "He pedido ayuda, por favor dame más datos";
  var orange = "¿Estás bien?";
  var green = "Hola, dime";
  var presentation = "Hola soy moi un sistema de tele asistencia, desarrollado como T F G "

  //Envio de respuestas y guardado en collection conversation

  if(clasi == "assertive"){
    collection.insert({
      userText: text, keyword: clasi, iaText: red, time: now, userId: req.body.userId
    });
    res.send(red);
  }else if(clasi == "energized"){
    collection.insert({
      userText: text, keyword: clasi, iaText: orange, time: now, userId: req.body.userId
    });
    res.send(orange);
  }else if(clasi == "presentation"){
    res.send(presentation);
  }else{
    collection.insert({
      userText: text, keyword: clasi, iaText: green, time: now, userId: req.body.userId
    });
    res.send(green);
  }


});

module.exports = router;
