/**
 * Marknote : a markdown notebook by react.js and express
 *
 * @author kirainmoe
 * @link https://kirainmoe.com
 */

global.config = require('./config');

global.express = require('express');
global.app  = express();

var router = require('./router.js');

var server = app.listen(config.serverPort, function () {

	console.log("Server running at http://localhost:" + config.serverPort + "/");

});
