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
			{
				test: /\.(js|jsx)$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015']
						}
					}
				]
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			},
			{
				test: /index\.js$/,
				loader: 'string-replace-loader',
				query: {
					search: '@@API_URL',
					replace: (process.env.NODE_ENV !== 'production') ? 'http://localhost:8080' : 'https://indexaki.herokuapp.com'
				}
			}
		]
	}
};