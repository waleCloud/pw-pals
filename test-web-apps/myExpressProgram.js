//My own 'HelloWorld' with ExpressJs
var express = require('express')
    var app = express()
    app.get('/home', function(req, res) {
      res.end('Hello World!')
    })
    app.listen(process.argv[2]);
	
// My Express Static file Server
 var path = require('path')
    var express = require('express')
    var app = express()
    
    app.use(express.static(process.argv[3]||path.join(__dirname, 'public')));
    
    app.listen(process.argv[2])
	
//My own 'Jade Solution' with ExpressJs
var express = require('express')
var app = express()
app.get('/home', function(req, res) {
// Set the view directory to /templates
app.set("views", __dirname + "/templates");
// Let's use the Jade templating language
app.set("view engine", "jade");
res.render("index", {date: new Date().toDateString()});
})
app.listen(process.argv[2]);

//Official Jade Solution
var express = require('express')
var app = express()
app.set('view engine', 'jade')
app.set('views', process.argv[3])
app.get('/home', function(req, res) {
  res.render('index', {date: new Date().toDateString()})
})
app.listen(process.argv[2])

//My own 'Good Old Form' Solution
var express = require('express')
var app= express()
var bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: false}));
app.post("/form",function(req,res){
	res.end(req.body.str.split('').reverse().join(''));
})
app.listen(process.argv[2])

// Official 'Good Old Form' Solution
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.post('/form', function(req, res) {
  res.send(req.body.str.split('').reverse().join(''))
})
app.listen(process.argv[2])

// My own 'Stylus' Solution
var path = require('path')
var express = require('express')
var app = express()
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(process.argv[3]||path.join(__dirname, 'public')));
app.listen(process.argv[2])

//Official 'Stylus' Solution
var express = require('express')
var app = express()
app.use(require('stylus').middleware(process.argv[3]));
app.use(express.static(process.argv[3]));
app.listen(process.argv[2])

// My own 'PARAM PAM PAM' Solution
var crypto=require('crypto')
var express = require('express')
var app = express()
app.put('/message/:id', function(req, res){
var id=req.params.id
var idSha=crypto.createHash('sha1').update(new Date().toDateString() + id).digest('hex')
res.end(idSha)
})
app.listen(process.argv[2])

// Official 'PARAM PAM PAM' Solution
var express = require('express')
var app = express()
app.put('/message/:id', function(req, res){
var id = req.params.id
var str = require('crypto')
	.createHash('sha1')
	.update(new Date().toDateString() + id)
	.digest('hex')
  res.send(str)
})
app.listen(process.argv[2])
// My own 'WHAT'S IN A QUERY' Solution
var express = require('express')
var app = express()
app.get('/search', function(req, res){
var results = req.query.results
var type = req.query.type
var page = req.query.page
var json={
	"results":results,
	"type":type,
	"page":page
}
res.send(json)
})
app.listen(process.argv[2])

// Official 'WHAT'S IN A QUERY'  Solution
var express = require('express')
var app = express()
app.get('/search', function(req, res){
var query = req.query
res.send(query)
})
app.listen(process.argv[2])

// My own 'JSON ME' Solution
var fs = require('fs');
var express = require('express')
var app = express()
app.use(function(req, res) {
 // res.writeHead(200, { "Content-Type": "application/json" });
  var bufferRead=fs.readFile(process.argv[3],function(err, bufferRead) {
if (err) return console.error("My Error Message==="+err);
var stringBuffer= bufferRead.toString();
object = JSON.parse(stringBuffer)
res.json(object)
});
});
app.listen(process.argv[2])

//Official 'JSON ME' Solution

var express = require('express')
    var app = express()
    var fs = require('fs')
    
    app.get('/books', function(req, res){
      var filename = process.argv[3]
      fs.readFile(filename, function(e, data) {
        if (e) return res.send(500)
        try {
          books = JSON.parse(data)
        } catch (e) {
          res.send(500)
        }
        res.json(books)
      })
    })
    
    app.listen(process.argv[2])
