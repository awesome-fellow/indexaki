'use strict'
require("./main.css");
require("bootstrap-material-design");

$.material.init()

{
	output: {
		// export itself to a global var
		libraryTarget: "var",
			// name of the global var: "Foo"
			library: "Foo"
	},
	externals: {
		// require("jquery") is external and available
		//  on the global var jQuery
		"jquery": "jQuery"
	}
}