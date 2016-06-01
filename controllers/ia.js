// var BrainJSClassifier = require('natural-brain');
// var classifier = new BrainJSClassifier();

exports.train = function(db){

  var collection = db.get('train');
  var data = collection.find({}, {sort: {_id: 1}}, function (e, doc) {
    console.log(e);
    console.log(doc);
    // sorted by name field
  });


  console.log("Realizando entrenamiento...");
  classifier.addDocument('its hurt me a lot', 'alarm1');
  classifier.addDocument('its pain', 'alarm2');
  classifier.train();
};
