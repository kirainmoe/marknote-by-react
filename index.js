/**
 * Marknote : a markdown notebook by react.js and express
 *
 * @author kirainmoe
 * @link https://kirainmoe.com
 */

global.express = require('express');
global.app  = express();

var router = require('./router.js');

var server = app.listen(8888, function () {
	console.log("Server running at http://localhost:8888/");
});