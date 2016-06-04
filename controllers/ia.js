// var BrainJSClassifier = require('natural-brain');
// var classifier = new BrainJSClassifier();

exports.train = function(db){

  var collection = db.get('train');
  var data = collection.find({}, {sort: {_id: 1}}, function (e, doc) {
    console.log("Realizando entrenamiento...");

    if(e == null){

      for(var conv in doc){
        console.log(doc[conv].userText);
        console.log(doc[conv].keyword);
        classifier.addDocument(doc[conv].userText, doc[conv].keyword);
      }
      classifier.train();
    }else{
      console.log("Error en el entrenamiento!!");
    }

    // sorted by name field
  });

  // classifier.addDocument('its hurt me a lot', 'alarm1');
  // classifier.addDocument('its pain', 'alarm2');
  // classifier.train();
};
