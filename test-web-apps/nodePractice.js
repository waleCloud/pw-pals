
 var fs = require('fs');
 
 // My List Directory Solution
 ///**
   var dir=fs.readdir(process.argv[2],function (err, list) {
   for(var i=0;i<list.length;i++)
   {
   if (list[i].endsWith("."+process.argv[3]))
   {
     console.log(list[i]);
   }
   }
       });
//**/
 //My Sync Read Count Directory Files Solution
 /**
 var fileName=process.argv[2]
 var bufferRead=fs.readFileSync(fileName);
 var stringBuffer= bufferRead.toString().split("\n");
 var lent=stringBuffer.length-1;
 console.log("The number of the lines inside "+fileName+" is :"+lent);
 /**/
 //My ASync Read Count Directory Files Solution
 /**
 var bufferRead=fs.readFile(process.argv[2],function(err, bufferRead) {
      if (err) return console.error("My Error Message==="+err);
      var stringBuffer= bufferRead.toString().split("\n");
	  var lent=stringBuffer.length-1;
      console.log(lent);
});
 
 //**/
 

// My Make it Modular Solution
/**
var fileFilter = require('./fileFilter.js');
var folder = process.argv[2]
var ext =  process.argv[3]
var callBackAction= function (err, data) {
      if (err) return console.error('There was an error:', err);
	  data.forEach(function (file) {
      console.log(file);
        
      });
	  };
fileFilter(folder,ext,callBackAction);
**/

// Official 'Make it Modular' Solution
/**
var filterFn = require('./solution_filter.js')
    var dir = process.argv[2]
    var filterStr = process.argv[3]
    
    filterFn(dir, filterStr, function (err, list) {
      if (err) {
        return console.error('There was an error:', err)
      }
    
      list.forEach(function (file) {
        console.log(file)
      })
    })
	**/
// Print Contents from Different Url Asynchronously
/**
var mydata="";
var http = require('http');
http.get(process.argv[2],function callback (response) { 
		response.setEncoding("utf8");
		response.on("data", function (data) { 
		mydata+=data;
		});
		response.on("error", function (err) { 
		console.log("My Error is:::"+err);
		});
		response.on("end", function (data) { 
		//console.log("Length of "+process.argv[2]+"=="+mydata.length);
		console.log(mydata);
		//Has this url-guy finally returned content?
		http.get(process.argv[3],function callback (response) {
		mydata="";
		response.setEncoding("utf8");
		response.on("data", function (data) { 
		mydata+=data;
		});
		response.on("error", function (err) { 
		console.log("My Error is:::"+err);
		});
		response.on("end", function (data) { 
		//console.log("Length of "+process.argv[3]+"=="+mydata.length);
		console.log(mydata);
		//Has this url-guy finally returned content?
		http.get(process.argv[4],function callback (response) {
        mydata="";			
		response.setEncoding("utf8");
		response.on("data", function (data) { 
		mydata+=data;
		});
		response.on("error", function (err) { 
		console.log("My Error is:::"+err);
		});
		response.on("end", function (data) { 
		//console.log("Length of "+process.argv[4]+"=="+mydata.length);
		console.log(mydata);
		});
});//End the 3rd call
		});
});//End the second call
		});
});//End the first call

**/
/**
var mydata="";
var http = require('http');
http.get(process.argv[2],function callback (response) {
                response.setEncoding("utf8");
                response.on("data", function (data) {
                mydata+=data;
                });
                response.on("error", function (err) {
                console.log("My Error is:::"+err);
                });
                response.on("end", function (end) {
                console.log(mydata.length);
                console.log(mydata);
                });
});
**/
/**
//Official Solution for Time Server
var net = require('net')
    
    function zeroFill (i) {
      return (i < 10 ? '0' : '') + i
    }
    
    function now () {
      var d = new Date()
      return d.getFullYear() + '-' +
        zeroFill(d.getMonth() + 1) + '-' +
        zeroFill(d.getDate()) + ' ' +
        zeroFill(d.getHours()) + ':' +
        zeroFill(d.getMinutes())
    }
    
    var server = net.createServer(function (socket) {
      socket.end(now() + '\n')
    })
    
    server.listen(Number(process.argv[2]))
**/
//My TCP Time Server Solution

function getDate() {
  var date = new Date(),
    year = date.getFullYear(),
    month = (date.getMonth() + 1).toString(),
    formatedMonth = (month.length === 1) ? ("0" + month) : month,
    day = date.getDate().toString(),
    formatedDay = (day.length === 1) ? ("0" + day) : day,
    hour = date.getHours().toString(),
    formatedHour = (hour.length === 1) ? ("0" + hour) : hour,
    minute = date.getMinutes().toString(),
    formatedMinute = (minute.length === 1) ? ("0" + minute) : minute,
    second = date.getSeconds().toString(),
    formatedSecond = (second.length === 1) ? ("0" + second) : second;
  return year+ "-" + formatedMonth + "-" + formatedDay + " " + formatedHour + ':' + formatedMinute;
}
/**

var net = require('net') 
     var server = net.createServer(function (socket) {  
       // socket handling logic  
	   //console.log("The time=="+getDate());
	   socket.write(getDate());
	   socket.write("\n");
	   socket.end();
     })  
     server.listen(Number(process.argv[2])); 
**/
// My HTTP File Server Solution
/**
var fs = require('fs');
var http = require('http') 
     var server = http.createServer(function (req,res) {  
       // socket handling logic  
	  var data=fs.readFileSync(process.argv[3]);
	   //console.log("Data Read==="+data.toString());
	   res.write(data);
	   res.write("\n");
	   res.end();
	   
     })  
     server.listen(Number(process.argv[2]));
**/

//HTTP File Server Official Solution
/**
var http = require('http')
    var fs = require('fs')
    
    var server = http.createServer(function (req, res) {
      res.writeHead(200, { 'content-type': 'text/plain' })
	  console.log("Request Header==="+req.toString());
      //res.write(req.toString());
      fs.createReadStream(process.argv[3]).pipe(res)
    })
    
    server.listen(Number(process.argv[2]))
**/
// HTTP SERVER REQUEST PROCESSOR-POST/GET
/** 
http = require('http');
fs = require('fs');
server = http.createServer( function(req, res)
{
	if (req.method == 'POST') {
        console.log("POST");
        var body = '';
        req.on('data', function (data) {
            body += data;
            console.log("Partial body: " + body);
        });
        req.on('end', function () {
            console.log("Body: " + body);
			body=body.toString().toUpperCase();
			console.log("Reverse==="+body);
			res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(body);
        });
	}
	else
    {
        console.log("GET");
        var html = fs.readFileSync('index.html');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    }
});
port = 3000;
host = '127.0.0.1';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
**/

//Official HTTP UPPERCASERER Solution
/**
var http = require('http')
    var map = require('through2-map')
    
    var server = http.createServer(function (req, res) {
      if (req.method !== 'POST') {
        return res.end('send me a POST\n')
      }
	 req.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase()
      })).pipe(res)
    });
server.listen(Number(process.argv[2]))
**/
//My Own HTTP UPPERCASERER Solution
/**
var http = require('http') ; 
var map = require('through2-map');
    
    var server = http.createServer(function (inStream, outStream) {
      inStream.pipe(map(function (chunk) {  
       return chunk.toString().toUpperCase();
     })).pipe(outStream)  
    });
server.listen(Number(process.argv[2]));
**/

// My HTTP JSON API Server Solution
/**
var http = require('http')
var url=require('url');
    var server = http.createServer(function (req, res) {
	
      if (req.method !== 'GET') {
        return res.end('send me a GET\n')
      }
	 var parsedUrl=url.parse(req.url, true);
	//console.log(JSON.stringify(parsedUrl));
	if(parsedUrl.pathname==='/api/parsetime')
	{
		var date=new Date(parsedUrl.query.iso),
		hour = date.getHours().toString(),
		formatedHour = (hour.length === 1) ? ("0" + hour) : hour,
		minute = date.getMinutes().toString(),
		formatedMinute = (minute.length === 1) ? ("0" + minute) : minute,
		second = date.getSeconds().toString(),
		formatedSecond = (second.length === 1) ? ("0" + second) : second;
		var jsonTime= { 
		   "hour": Number(formatedHour),  
		   "minute":Number(formatedMinute),  
		   "second":Number(formatedSecond) 
		 };  
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(jsonTime));
		
	}
	else if(parsedUrl.pathname==='/api/unixtime')
	{
		var date=new Date(parsedUrl.query.iso).getTime();
		
		var unixTime= { 
		   "unixtime":date
		 };  
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(JSON.stringify(unixTime));
		
	}
	else
	{
	   res.end("Send me either the pathname '/api/parsetime' or '/api/unixtime'");	
	}

    });
server.listen(Number(process.argv[2]));
**/
// Official HTTP JSON API Server
/**
var http = require('http')
    var url = require('url')
    
    function parsetime (time) {
      return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
      }
    }
    
    function unixtime (time) {
      return { unixtime: time.getTime() }
    }
    
    var server = http.createServer(function (req, res) {
      var parsedUrl = url.parse(req.url, true)
      var time = new Date(parsedUrl.query.iso)
      var result
    
      if (/^\/api\/parsetime/.test(req.url)) {
        result = parsetime(time)
      } else if (/^\/api\/unixtime/.test(req.url)) {
        result = unixtime(time)
      }
    
      if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
      } else {
        res.writeHead(404)
        res.end()
      }
    })
    server.listen(Number(process.argv[2]))
**/