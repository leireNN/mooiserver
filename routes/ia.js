var express = require('express');
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
  res.send(clasi);

});

module.exports = router;
