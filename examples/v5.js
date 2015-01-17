/* Comment lire des options a partir de la ligne de commandes terminal */

/* 
  On peut tout simplement dans node utiliser ceci:

   http://nodejs.org/docs/latest/api/process.html#process_process_argv

   'process' est un objet global dans node (comme ex: module, ou bien dans un browser: navigator ou window)

    Une chose qu'on peut y trouver est un array des arguments passes en ligne de commande.

    Mais pourquoi salir notre code, quand surement c'est un probleme courrant et quun a du 
    y faire une solution... essayes 

    npm seach argv
*/

/* Moi j'aime bien minimist https://www.npmjs.com/package/minimist */

var argv = require('minimist')( process.argv.slice(2) );

var port = argv.p || argv.port;

if( !port ){
  console.log( 'Missing port argument' );
  process.exit( 1 ); // ie: die()
}else{
  require('./v3.js').listen( port );
}
