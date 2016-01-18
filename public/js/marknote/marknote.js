"use strict";

var converter = new Remarkable();					//import remarkable markdown converter

var NoteList = React.createClass({

	render : function () {
		return (
			<div className="note-list" ref="noteList">
				{this.loadNotes}
			</div>
			);
	},

	loadNotes : function () {

		console.log(2333);

		_kit.ajax({
			type : "GET",
			url : "/api/showNote",
			success : function (data) {
				console.log(data);
			},
			error : function (error) {
				console.log("Error occured.");
			}
		});
	}

});

var ShowTheEditor = React.createClass({

	render : function () {
		return (<div className="show-editor" id="ShowTheEditor" onClick={this.show}> Editor </div>);
	},

	show : function () {
		var element = document.getElementById("marknote-editor");
		element.style.transform  = "translateY(0px)";
	}

});

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
				<textarea onKeyDown={this.responseTab} onChange={this.markItUp} spellCheck="false" ref="textareas" id="textarea" className="marknote-textarea" defaultValue="Write some text here and it will be converted to Markdown!">
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
	},

	/**
	 * handle keydown of Tab to resize
	 *
	 * @param  {object} event
	 * @return {void}
	 */
	responseTab : function (event) {
		event = event || window.event;
		var element = this.refs.textareas,
				keyCode = event.keyCode || event.which;

		if (keyCode == 9) {
			var start = element.selectionStart,
					end		= element.selectionEnd,
					value = element.value;

			var lineStart = value.lastIndexOf('\n', start),
					lineEnd		= value.indexOf('\n', end),
					offset		= 0;

			if (lineStart == -1)	lineStart = 0;
			if (lineEnd == -1)	lineEnd = value.length;

			if (lineStart == lineEnd);
			else if (lineStart != 0)		lineStart += 1;

			var lines = value.substring(lineStart, lineEnd).split('\n');
			if (lines.length > 1) {
				offset = lines.length;
				lines = "\t" + lines.join('\n\t');

				element.value = value.substring(0, lineStart) + lines
											+ value.substring(lineEnd);
				element.selectionStart = start + 1;
				element.selectionEnd 	 = end + offset;
			} else {
				offset = 1;
				lines = lines[0];

				element.value = value.substring(0, start) + '\t'
											+ value.substring(end);
				element.selectionStart = element.selectionEnd = start + offset;
			}

			event.preventDefault();
		}
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
				<textarea id="titleInput" className="input-text" placeholder="Title.." ref="titleInput"></textarea>
				<button id="fadeOut" className="fadeout-button" onClick={this.fadeOut}>Hide Editor</button>
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
			title : this.refs.titleInput.value,
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

	},

	fadeOut : function () {
		var containerRefs = document.getElementById("marknote-editor");

		containerRefs.style.transform = "translateY(100%)";
	}
});

ReactDOM.render(
	(<div style={{height: "100%"}} id="marknote-editor">
		<NoteList />
		<ShowTheEditor />
		<Markdown />
		<StatusBar />
		</div>),
	document.getElementById("marknote")
	);
