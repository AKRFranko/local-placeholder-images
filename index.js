var http = require('http');
var Canvas = require('canvas');

var port = 8080;
var server = http.createServer(function (request, response) {
   response.writeHead( 200, { 'Content-Type': 'text/plain' } );
   response.end( 'Hullo Wurld!' )
}
server.listen( port );

var canvas = new Canvas( 512, 512 );

// ... canvas manipulations

var stream = canvas.createPNGStream();
response.writeHead(200, {"Content-Type": "image/png"});
stream.pipe(response);

