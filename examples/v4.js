/* Alors disons que je veut utiliser mon script directement, j'utiliserai le "path" du ficher... */

var monscript = require('./v3.js');
var monPortCustom = 8181;

/* 'listen', la fonction que nous avons exporte dans v3.js */

monscript.listen( monPortCustom );
