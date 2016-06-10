var fs = require('fs');

var ApiModel = {
	/**
	 * add Note to notes.json
	 *
	 * @param {[type]} dataObj [description]
	 */
	addNote : function (dataObj) {
		var noteFile = fs.readFileSync("./notes.json", "UTF-8");

		var currentId = nodeFile == "" ? 1 : noteFile.split("\n").length + 1;

		dataObj.id = currentId;
		var  json = JSON.stringify(dataObj);

		var dataToWrite = noteFile == "" ? json : noteFile + ",\n" + json;

		this.writeIn(dataToWrite);
	},

	/**
	 * remove Note from notes.json
	 *
	 * @param  {int} noteId
	 * @return {void}
	 */
	removeNote : function (noteId) {
		var notes   = fs.readFileSync("./notes.json", "UTF-8"),
		   notesArr = notes.split(",\n");
		/* Find proper id */
		for (var i = 0; i < notesArr.length; i ++)
		{
			var thisCid = JSON.parse(notesArr[i]).id;
			if (thisCid == noteId) {
				notesArr.splice(i, 1);
			}
		}
		var newStr = notesArr.join(",\n");
		this.writeIn(newStr);
	},

	/**
	 * show Note detail
	 * 
	 * @param  {mixed} noteId
	 * @return {string}
	 */
	showNote : function (noteId)
	{
		var noteStr = fs.readFileSync("./notes.json", "UTF-8");

		if (noteId == false) {
			return noteStr;
		} else {
				var seprater = noteStr.split(",\n");
				for (var i = 0; i < seprater.length; i ++ )
				{
					thisCid = JSON.parse(seprater[i]).id;
					if (thisCid == noteId)
						return seprater[i];
				}	//for
		}
	},

	/**
	 * apply edition
	 *
	 * @param  {string} str
	 * @return {void}
	 */
	writeIn : function (str) {
		fs.writeFile('./notes.json', str, function (err) {
			console.log("New JSON has been written in ./notes.json.");
		});
	}
};

module.exports = ApiModel;
