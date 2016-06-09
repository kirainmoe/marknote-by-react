var fs = require('fs');

var ApiModule = {
	addNote : function (dataObj) {
		var json = JSON.stringify(dataObj),
				noteFile = fs.readFileSync('./notes.json', "UTF-8");

		if (noteFile != '') 
			var dataToWrite = noteFile + ",\n" + json;
		else
			var dataToWrite = json;
		
		fs.writeFile('./notes.json', dataToWrite, function (err) {
			console.log("JSON has been written in ./notes.json.");
		});
	}
};

module.exports = ApiModule;