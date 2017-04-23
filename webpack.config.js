var webpack = require('webpack');

new webpack.ProvidePlugin({
	$: "jquery",
	jQuery: "jquery",
	"window.jQuery": "jquery"
})

module.exports = {
	entry: "./web/libs/index.js",
	output: {
		path: __dirname + '/web/dist',
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: "style-loader!css-loader" }
		]
	}
};