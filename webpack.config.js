var webpack = require('webpack');

module.exports = {
	entry: "./web/libs/index.js",
	output: {
		path: __dirname + '/public',
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: "style-loader!css-loader" }
		]
	},
	externals: {
		// require("jquery") is external and available
		//  on the global var jQuery
		"jquery": "jQuery"
	}
};