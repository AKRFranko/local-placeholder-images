
 var http = require('http'),
       Canvas = require('canvas'),
       _options, isHexColorString;
 
 /* Valeurs par default */
 _options = { port: 8080, width: 512, height: 512, text: '#BADA55', background: '#B00B00' };

 /* Tester si un string est une couleur Hexadecimale valide (avec ou sans le #) */
isHexColorString = /^#?([0-9a-f]{3}){1,2}$/i;

/* On separe les fonctionalites pour l'evolution du tutoriel */
function createCanvasImage( options ){ 
    var canvas, context, width, height, x, y;
    width = options.width;
    height = options.height;
    x = width / 2;
    y = height / 2;
    fontSize = 15;
    text = width + 'x' + height;
    canvas = new Canvas( width, height );
    context = canvas.getContext('2d');
    context.fillStyle = options.background;
    context.fillRect( 0, 0, width, height );
    context.font          = fontSize + 'px sans-serif';
    context.textAlign = 'center';
    context.fillStyle    = options.text;
    context.fillText( text ,  x,  y - fontSize );
    return canvas;
 }
 
 /* Assigner les valeurs par default ou netoyer les valeurs passees par l'utilisateur */
 function sanitizeOptions( options ){
     options.width  = ( options.width && !isNaN( options.width ) ? parseInt(options.width) : _options.width );
     options.height = ( options.height && !isNaN( options.height ) ? parseInt(options.height)  : _options.height );
     options.text = ( options.text && isHexColorString.test( options.text ) ? options.text : _options.text );
     options.background = ( options.background && isHexColorString.test( options.background ) ? options.background : _options.background );   
     if( !/^#/.test( options.text ) ){ options.text = '#' + options.text; }
      if( !/^#/.test( options.background ) ){ options.background = '#' + options.background; }
     return options;
 }

/* Repondre a la requete HTTP */
 function serveImageRequest( request, response ){
     var image, stream, options, queryOptions;
     queryOptions = {}; // TODO: lire les options dans le query string 
     options = sanitizeOptions( queryOptions );
     image   = createCanvasImage( options );
     stream  = image.createPNGStream();
     response.writeHead(200, {'Content-Type': 'image/png'});
     stream.pipe( response );
 }

function createServer( ){
    return http.createServer( serveImageRequest );
}

function onServerListening(){
  // 'this' est l'instance du HTTP server
  var address = this.address();
  var message = 'Server started on: http://' + [ address.address, address.port].join(':');
  // Dans node, console log dans ton terminal
   console.log(  message );
}

function startServer( port ){
    var server = createServer();
    server.listen( port,  onServerListening );
}

startServer( _options.port );