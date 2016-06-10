var ApiModel = require('../model/ApiModel');

var ApiController = {
	addNote : function (request, response) {
		var noteStr  = request.body.rawText,
				noteTime = request.body.timestamp;

		var dataObj = {
			content: noteStr,
			time: noteTime
		};

		ApiModel.addNote(dataObj);

		response.send(JSON.stringify({status:1, info:"JSON has been written in."}));
	},

	removeNote : function (request, response) {
		var toRemoveId = request.query.targetId;
		ApiModel.removeNote(toRemoveId);

		response.send(JSON.stringify({statue:1, info:"Changes has been applied."}));
	},

	showNote : function (request, response) {
			var reqId		= request.query.nid ? request.query.nid : false;

			if (reqId == false) {
				var noteStr = ApiModel.showNote(false);
				response.send( noteStr );
			} else {
				var noteStr = ApiModel.showNote(reqId);
				response.send(noteStr);
			}
	}
};

module.exports = ApiController;
