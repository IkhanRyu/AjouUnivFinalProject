var webpack = require('webpack');
module.exports = {
	context: __dirname + '/client/front',
	entry: {
		app: './app.js'
		// vendor: ['angular']
	},
	output: {
		path: __dirname + '/public/js',
		filename: 'app.bundle.js'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
	]
};