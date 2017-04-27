var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: "./web/libs/index.js",
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: "style-loader!css-loader" },
			{
				test: /index\.js$/,
				loader: 'webpack-replace',
				query: {
					search: '@@API_URL',
					replace: (process.env.NODE_ENV !== 'production') ? 'http://localhost:8080' : 'https://betaindexaki.herokuapp.com'
				}
			}
		]
	}
};