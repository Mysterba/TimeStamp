var url = require('url');
var express = require('express');
const app = express()
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


app.get('/:time', function (req, res) {
 	 
	var urlString = url.parse(req.url, true);
	
	var slicedUrl = urlString.pathname.split("/").slice(-1);
	var isUnix = /^\d+$/.test(slicedUrl);
	
	if (isUnix) {
		var d = new Date(parseInt(slicedUrl*1000));
	} else {
		var dateString = slicedUrl.toString();
		var d = new Date(dateString.replace(/%20/g," "));
	}
	
	
	var json;
	
	if ( Object.prototype.toString.call(d) === "[object Date]" ) {
  	if ( isNaN( d.getTime() ) ) {  
  		json = JSON.stringify( { unix: null, natural: null } );
  	}
  	else {
    json = JSON.stringify( { unix: d.getTime()/1000, natural: monthNames[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear()} );
  	}
	}
	else {
	  json = JSON.stringify( { unix: null, natural: null } );
	}
	
	res.send(json);
	
})

app.listen(8080, function () {
  console.log('Example app listening on port 3000!')
})
