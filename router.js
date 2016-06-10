/**
 * MarkNote router / settings file
 */

app.set("views", "./view/");
app.set("view engine", "jade");

var bodyParser = require('body-parser');
app.use(bodyParser());

var path = require('path');

app.use(express.static('./public'));

app.get("/", function (request, response) {
	response.render("index");
});

var ApiController = require('./controller/ApiController');

app.post("/api/addNote", ApiController.addNote);
