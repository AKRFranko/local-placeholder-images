var parseURL = require('url').parse,
       http     = require('http'),
       canvas = require('./canvas.js'),
       _options, isHexColorString;

 _options = { 
    port: 8080,
    width: 512,
    height: 512,
    text: '#BADA55',
    background: '#B00B00'
  };

isHexColorString = /^#?([0-9a-f]{3}){1,2}$/i;
 
 function sanitizeOptions( options ){
     options.width  = ( options.width && !isNaN( options.width ) ? parseInt(options.width) : _options.width );
     options.height = ( options.height && !isNaN( options.height ) ? parseInt(options.height)  : _options.height );
     options.text = ( options.text && isHexColorString.test( options.text ) ? options.text : _options.text );
     options.background = ( options.background && isHexColorString.test( options.background ) ? options.background : _options.background );   
     if( !/^#/.test( options.text ) ){ options.text = '#' + options.text; }
      if( !/^#/.test( options.background ) ){ options.background = '#' + options.background; }
     return options;
 }

 function serveImageRequest( request, response ){
     var image, stream, options, queryOptions, url;
     url = parseURL( request.url, true ); // 'true' pour avoir le querystring en objet
     queryOptions = url.query;
     options = sanitizeOptions( queryOptions );
     image   = canvas.create( options );
     stream  = image.createPNGStream();
     response.writeHead(200, {'Content-Type': 'image/png'});
     stream.pipe( response );
 }

function onServerListening(){
   var address = this.address();
   var message = 'Server started on: http://' + [ address.address, address.port].join(':');
   console.log(  message );
}

function LocalPlaceholderImageServer( port,  requestHandler ){
    this.port = port || _options.port;
    this.requestHandler = typeof requestHandler === 'function' ? requestHandler : serveImageRequest;
    this.http = http.createServer( this.requestHandler );
    return this;
}

LocalPlaceholderImageServer.prototype.listen = function( port ) {
    this.http.listen( port || this.port,  onServerListening );
}

module.exports = {
   create: function ( port, requestHandler) {
       var server = new LocalPlaceholderImageServer( port, requestHandler );
       return server;
   }
}