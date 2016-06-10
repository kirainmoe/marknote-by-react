var ApiModule = require('../model/ApiModule');

var ApiController = {
	addNote : function (request, response) {
		var noteStr  = request.body.rawText,
				noteTime = request.body.timestamp;

		var dataObj = {
			content: noteStr,
			time: noteTime
		};

		ApiModule.addNote(dataObj);

		response.send(JSON.stringify({status:1, info:"JSON has been written in."}));
	},

	removeNote : function (request, response) {
		var toRemoveId = request.query.targetId;
		ApiModule.removeNote(toRemoveId);

		response.send(JSON.stringify({statue:1, info:"Changes has been applied."}));
	}
};

module.exports = ApiController;
