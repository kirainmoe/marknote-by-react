"use strict";

var converter = new Remarkable();					//import remarkable markdown converter

/**
 * <Markdown /> Component
 * 
 * contains Editor and Displayer
 */
var Markdown = React.createClass({

	/**
	 * initial state
	 * 
	 * @return {object} 
	 */
	getInitialState: function () {
		return {
			text: ""
		};
	},

	/**
	 * render DOM node
	 * 
	 * @return {mixed} 
	 */
	render: function () {
		return (
			<div className="marknote-container">
			<textarea onChange={this.markItUp} spellCheck="false" ref="textareas" id="textarea" className="marknote-textarea" defaultValue="Write some text here and it will be converted to Markdown!">
			</textarea>
			<div className="marknote-displayer" id="displayer" dangerouslySetInnerHTML={{__html: this.state.text}}></div>
			</div>
			);
	},

	/**
	 * markdown convert
	 * 
	 * @return {void} 
	 */
	markItUp: function () {
		var text = this.refs.textareas.value;
		var rawMarkUp = converter.render(text);

		/** Code Highlight : using Prism.js */
		if (rawMarkUp.match(/<code .*?>/)) {

			var virtualDOM = document.createElement("div");			//create a virtual dom to use querySelectorAll
			virtualDOM.innerHTML = rawMarkUp;

			var codes = virtualDOM.querySelectorAll("code");

			for (var i = 0; i < codes.length; i ++)
			{
				if (codes[i].getAttribute("class") != null) {
					var single = this.htmlDecode(codes[i].innerHTML);
					var grammar = codes[i].getAttribute("class").replace("language-", "" );
					if (typeof Prism.languages[grammar] != 'undefined') {
						codes[i].innerHTML = Prism.highlight(single,  Prism.languages[grammar]);
					}
				}
			}

			rawMarkUp = virtualDOM.innerHTML;
		}

		this.setState({text: rawMarkUp});			//set React component state and let it rerender.
	},

	/**
	 * HTML decoder
	 * 
	 * @param  {string} str 
	 * @return {string}     
	 */
	htmlDecode: function(str) {
		var s = "";   
		if (str.length == 0) return "";   
		s = str.replace(/&amp;/g, "&");   
		s = s.replace(/&lt;/g, "<");   
		s = s.replace(/&gt;/g, ">");   
		s = s.replace(/&nbsp;/g, " ");   
		s = s.replace(/&#39;/g, "\'");   
		s = s.replace(/&quot;/g, "\"");   
		s = s.replace(/<br>/g, "\n");   
		return s;   
	}

});

/**
 * <StatusBar /> Component
 * 
 * contains save button and so on...
 */
var StatusBar = React.createClass({
	/**
	 * render DOM node
	 * 
	 * @return {mixed} 
	 */	
	render: function () {
		return (
			<div id="status-bar" className="status-bar">
			<button id="submiter" className="submit-button" onClick={this.save}>Save Note</button>
			</div>
			);
	},

	/**
	 * save notes
	 * 
	 * @return {void} 
	 */
	save: function () {
		document.getElementById("submiter").innerHTML = "Saving...";

		var textarea  = document.getElementById("textarea"),
		    rawText   = textarea.value,
		    timestamp = (new Date()).valueOf();

		var dataObj = {
			rawText: rawText,
			timestamp: timestamp
		};

		var dataJson = JSON.stringify(dataObj);

		_kit.ajax({
			type: "POST",
			url: "/api/addNote",
			data: dataObj,
			success: function (data) {
				document.getElementById("submiter").innerHTML = "Note has been Saved.";
			},
			error: function (error) {
				console.log("post failed.");
			}
		});

	}
});

ReactDOM.render(
	(<div style={{height: "100%"}} id="marknote-row">
		<Markdown />
		<StatusBar />
		</div>),
	document.getElementById("marknote")
	);
