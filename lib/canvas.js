var Canvas = require( 'canvas');

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
    context.fillStyle  = options.background;
    context.fillRect( 0, 0, width, height );
    context.font          = fontSize + 'px sans-serif';
    context.textAlign = 'center';
    context.fillStyle    = options.text;
    context.fillText( text ,  x,  y - fontSize );
    return canvas;
 }

exports.create = function( options ){
    if( !options || options && !options.width || options && !options.height ){
       var error = new Error( "Missing options.");
       throw error;
    }else{
      return createCanvasImage( options );
    }
}
