#!/usr/bin/env node

var argv = require('minimist')( process.argv.slice(2) );
var port = argv.p || argv.port;

if( !port ){
   console.log( 'Missing port argument' );
   process.exit( 1 ); // ie: die()
}else{
   var server = require('../lib/server.js').create( port );
   server.listen();
}
