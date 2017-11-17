// My own Mongo 'Find' Solution
//My Own Solution
var url="mongodb://localhost:27017/learnyoumongo";
var mongo = require('mongodb').MongoClient
mongo.connect(url, function(err, db) {
// db gives access to the database
var collection=db.collection("parrots");
var age=parseInt(process.argv[2]);
//console.log("Age=="+age)
collection.find({
age:{$gt:age} 
}).toArray(function(err, documents) {
        console.log(documents);
});
db.close();
});


//Official Solution for 'Find'
var mongo = require('mongodb').MongoClient
    var age = process.argv[2]
    
    var url = 'mongodb://localhost:27017/learnyoumongo'
    
    mongo.connect(url, function(err, db) {
      if (err) throw err
      var parrots = db.collection('parrots')
      parrots.find({
        age: {
          $gt: +age
        }
      }).toArray(function(err, docs) {
        if (err) throw err
        console.log(docs)
        db.close()
      })
    })

//My Own Solution For 'FIND PROJECT'

var url="mongodb://localhost:27017/learnyoumongo";
var mongo = require('mongodb').MongoClient
mongo.connect(url, function(err, db) {
// db gives access to the database
var collection=db.collection("parrots");
var age=parseInt(process.argv[2]);
//console.log("Age=="+age)
collection.find({
age:{$gt:age}
}
,
{
      name: 1
    , age: 1
    , _id: 0
}).toArray(function(err, documents) {
        console.log(documents);
});
db.close();
});

//Official Solution for 'FIND PROJECT'
 var mongo = require('mongodb').MongoClient
    var age = process.argv[2]
    
    var url = 'mongodb://localhost:27017/learnyoumongo'
    
    mongo.connect(url, function(err, db) {
      if (err) throw err
      var parrots = db.collection('parrots')
      parrots.find({
        age: {
          $gt: +age
        }
      }, {
        name: 1
      , age: 1
      , _id: 0
      }).toArray(function(err, docs) {
        if (err) throw err
        console.log(docs)
        db.close()
      })
    }) 
//My Own Solution For 'insert'

var url="mongodb://localhost:27017/learnyoumongo";
var mongo = require('mongodb').MongoClient
mongo.connect(url, function(err, db) {
        //Is there an error?
        if(err) throw err
        // db gives access to the database
        var collection=db.collection("docs");
        var firstName=process.argv[2];
        var lastName=process.argv[3];
        var jsonFirstLastNames={
                firstName:firstName,
                lastName:lastName
        };
        collection.insert(jsonFirstLastNames,function(err, documents) {
                if(err) throw err;
                console.log(JSON.stringify(jsonFirstLastNames));
				db.close();
				})
			});


//Official Solution for 'INSERT'
var mongo = require('mongodb').MongoClient
    
    var firstName = process.argv[2]
    var lastName = process.argv[3]
    var doc = {
      firstName: firstName
    , lastName: lastName
    }
    
    var url = 'mongodb://localhost:27017/learnyoumongo'
    mongo.connect(url, function(err, db) {
      if (err) throw err
      var collection = db.collection('docs')
      collection.insert(doc, function(err, data) {
        if (err) throw err
        console.log(JSON.stringify(doc))
        db.close()
      })
    })

	//My Solution for 'UPDATE'
var mongo = require('mongodb').MongoClient
    
    var url = 'mongodb://localhost:27017/'
	var dbName = process.argv[2]
	url+=dbName;
    mongo.connect(url, function(err, db) {
      if (err) throw err
      var collection = db.collection('users')
      collection.update({username:"tinatime"},
	  {
		  $set:{
			  age:40
		  }
	  }, 
	  function(err, data) {
        if (err) throw err
        db.close()
      })
    })
	
//Official Solution for 'UPDATE'
 var mongo = require('mongodb').MongoClient
    
    var url = 'mongodb://localhost:27017/' + process.argv[2]
    mongo.connect(url, function(err, db) {
      if (err) throw err
      var collection = db.collection('users')
      collection.update({
        username: 'tinatime'
      }, {
        $set: {
          age: 40
        }
      }, function(err) {
        if (err) throw err
        db.close()
      })
    })

//My Solution for 'REMOVE'
var mongo = require('mongodb').MongoClient
    
    var url = 'mongodb://localhost:27017/' + process.argv[2]
    mongo.connect(url, function(err, db) {
      if (err) throw err
      var collection = db.collection(process.argv[3])
      collection.remove({_id:process.argv[4]},function(err, data){
		  if (err) throw err
          db.close()
      })
    })

//Official Solution for 'REMOVE'
var mongo = require('mongodb').MongoClient
    
    var url = 'mongodb://localhost:27017/' + process.argv[2]
    
    mongo.connect(url, function(err, db) {
      if (err) throw err
      var collection = db.collection(process.argv[3])
      collection.remove({
        _id: process.argv[4]
      }, function(err) {
        if (err) throw err
        db.close()
      })
    })
	
//My own Solution for 'COUNT'
var mongo = require('mongodb').MongoClient
    
    var url = 'mongodb://localhost:27017/learnyoumongo'
    
    mongo.connect(url, function(err, db) {
      if (err) throw err
      var collection = db.collection('parrots')
	  var age = process.argv[2]
      collection.count({
        age: {$gt:+age}
      }, function(err,count) {
        if (err) throw err
		console.log(count)
        db.close()
      })
    })

//Official Solution for 'COUNT'
 var mongo = require('mongodb').MongoClient
    var age = process.argv[2]
    
    var url = 'mongodb://localhost:27017/learnyoumongo'
    
    mongo.connect(url, function(err, db) {
      if (err) throw err
      var parrots = db.collection('parrots')
      parrots.count({
        age: {
          $gt: +age
        }
      }, function(err, count) {
        if (err) throw err
        console.log(count)
        db.close()
      })
    })

	
//My own Solution for 'AGGREGATE'
var mongo = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/learnyoumongo'
 mongo.connect(url, function(err, db) {
   if (err) throw err
   var collection = db.collection('prices')
	  var mysize = process.argv[2]
	  var match = { $match: { size:mysize } }
        //console.log("My Collection="+JSON.stringify(collection[0])+"while match price="+mysize);
      collection.aggregate([
      { $match: { size: mysize }}
    , { $group: {
        _id: 'average' // This can be an arbitrary string in this case
      , average: {
          // $sum can also be the operator used here
          $avg: '$price'
        }
      }}
    ]).toArray(function(err, results) {
        //console.log(JSON.stringify(results))
        var avKey="average"
        var jsonRes=results[0]
        var res=jsonRes[avKey];
        //console.log("Avearge=="+res)
      // handle error
            if (err) throw err
       console.log(Number(res).toFixed(2))
           db.close()
    })
    })
	
//Official Solution for 'AGGREGATE'
 var url = 'mongodb://localhost:27017/learnyoumongo'
 mongo.connect(url, function(err, db) {
      if (err) throw err
      var prices = db.collection('prices')
      prices.aggregate([
        { $match: {
          size: size
        }}
      , { $group: {
          _id: 'average'
        , average: {
            $avg: '$price'
          }
        }}
      ]).toArray(function(err, results) {
        if (err) throw err
        if (!results.length) {
          throw new Error('No results found')
        }
        var o = results[0]
        console.log(Number(o.average).toFixed(2))
        db.close()
      })
    })