/**
 * MarkNote router / settings file
 */

app.set("views", "./view/");
app.set("view engine", "jade");

var bodyParser = require('body-parser');
app.use(bodyParser());

var path = require('path');

app.use(express.static('./public'));

/* Index Page */
app.get("/", function (requset, response) {

});
/* Markdown Editor */
app.get("/editor", function (request, response) {
	response.render("editor");
});

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
