/**
 * MarkNote router / settings file
 */

app.set("views", "./view/");
app.set("view engine", "jade");

var bodyParser = require('body-parser');
app.use(bodyParser());

var path = require('path');

app.use(express.static('./public'));

/**
 * / --- IndexController
 */
var IndexController = require('./controller/IndexController');
/* Index Page */

app.get("/",  IndexController.index);

/**
 * /api --- ApiController
 */
var ApiController = require('./controller/ApiController');

/* Add Note Interface */
app.post("/api/addNote", ApiController.addNote);
/* Remove Note Interface */
app.get("/api/removeNote", ApiController.removeNote);
/* Show Note Interface */
app.get("/api/showNote", ApiController.showNote);
