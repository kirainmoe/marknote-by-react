(function (window) {
	"use strict";
	
	var PrintempsToolKit = {

		/* Asynchronous JavaScript and XML */

		/**
		 * Send a AJAX request
		 * Usage: _Kit.ajax({
		 * 	url : "request url",
		 * 	type : "POST" || "GET",
		 * 	data : {
		 * 		//a data object
		 * 	},
		 * 	dataType : "JSON", //doesn't required
		 * 	async : true,			//true is default
		 * 	success : function (data) {
		 * 		//some code there to be called back.
		 * 	},
		 * 	error : function (error) {
		 * 		//some code theme to be called back
		 * 	}
		 * });
		 * 
		 * @param  {object} ajaxObject 
		 * @return {void}
		 */
		 ajax : function (ajaxObject) {
			var xhr = this.createXMLHttpRequest(),			//create XMLHttpRequest object
			method = ajaxObject.method || ajaxObject.type || "GET";

			if (ajaxObject.url) {
				var url = ajaxObject.url;

				//Add timestamp for request url to prevent cache
				if (url.indexOf("?") == "-1") 
					url = url + "?ajax_request=" + (new Date()).valueOf();
				else
					url = url + "&ajax_request=" + (new Date()).valueOf();
			}

			var async = typeof ajaxObject.async == "undefined" ? true : ajaxObject.async;

			if (async == true) {
				xhr.onreadystatechange = function () {
					//If request is async, call the function back
					if (xhr.readyState == 4)
						PrintempsToolKit.ajaxCallBack(ajaxObject, xhr);
				}
			}

			var paramString = (ajaxObject.data && typeof(ajaxObject.data) == "object") ? 
			this.joinParam(ajaxObject.data) : "";

			switch (method.toLowerCase()) 
			{
				case "get" :
				url = url + "&" + paramString;
				xhr.open("get", url, async);
				xhr.send();
				break;

				case "post":
				xhr.open("post", url, async);

					//set post headers
					xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
					xhr.setRequestHeader("X-AJAX-Request", "true");
					xhr.setRequestHeader("X-AJAX-Timestamp", (new Date()).valueOf());
					xhr.send(paramString);
					break;
				}

				if (!async) {
					this.ajaxCallBack(ajaxObject, xhr);
				}

			},

		/**
		 * create a XMLHttpRequest Object
		 * 
		 * @return {object} 
		 */
		 createXMLHttpRequest : function () {
		 	return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		 },

		/**
		 * join all params for post / get data
		 * 
		 * @param  {object} data 
		 * @return {string}      
		 */
		 joinParam : function (data) {
		 	var array = [];
		 	if (data[0] && data[0].name && data[0].value) {
		 		for (var i in data) {
		 			array.push(data[i].name + "=" + data[i].value);
		 		}
		 		return array.join("&");
		 	} else {
		 		for (var i in data) {
		 			array.push(i + "=" + data[i]);
		 		}
		 		return array.join("&");
		 	}
		 },

		/**
		 * call function back when XMLHttpRequest is ready
		 * 
		 * @param  {object} ajaxObject 
		 * @param  {object} xhrObject  
		 * @return {void}            
		 */
		 ajaxCallBack : function (ajaxObject, xhrObject) {

		 	if (xhrObject.status == 200) {

		 		if (ajaxObject.dataType && ajaxObject.dataType.toLowerCase() == 'json') {
					//return before formating
					try {
						jsonObj = JSON.parse(xhrObject.responseText);
					} catch (e) {
						throw("Requested JSON is invalid. Will not return it back.");
					}

					if (ajaxObject.success)
						ajaxObject.success(xhrObject.responseText);
				} else {
					if(ajaxObject.success)
						ajaxObject.success(xhrObject.responseText);
				}

			} else {
				if (ajaxObject.error)
					ajaxObject.error(xhrObject.statusText);
				console.log("Error occuried while requesting. Server returned with " 
					+ xhrObject.status + " (" + xhrObject.statusText + ")");
			}
		},
	};

	window._kit = PrintempsToolKit;
})(window);
