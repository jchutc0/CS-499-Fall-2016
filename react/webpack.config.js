var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: [
	 'script!jquery/dist/jquery.min.js',
	 'script!foundation-sites/dist/foundation.min.js',
	 './app/app.jsx'],
	externals: {
		jquery: 'jQuery'
	},
	plugins: [
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery',
		})
	],
	output: {
		path: './public',
		filename: './bundle.js'
	},
	resolve: {
		root: __dirname,
		alias: {
			Main: 						'app/components/Main.jsx',
			GraphWave: 				'app/components/GraphWave.jsx',
			GraphFrequency: 	'app/components/GraphFrequency.jsx',
			FormMain: 				'app/components/FormMain.jsx',
			NotesToUser: 			'app/components/NotesToUser.jsx',
			FormFrequency: 		'app/components/FormFrequency.jsx',
			FormNumberPad: 		'app/components/FormNumberPad.jsx',
			FormNav:			 		'app/components/FormNav.jsx',
			AudioIn:					'app/components/AudioIn.jsx',
			AudioOut:					'app/components/AudioOut.jsx',
			AudioOutTone:			'app/components/AudioOutTone.jsx',
			AudioOutWhiteNoise:			'app/components/AudioOutWhiteNoise.jsx',
			GraphMain:				'app/components/GraphMain.jsx',
			KeyboardIn:				'app/components/KeyboardIn.jsx',
			FormWhiteNoise:		'app/components/FormWhiteNoise.jsx',
			ErrorModal:				'app/components/ErrorModal.jsx',
			applicationStyles: 'app/styles/app.scss'
		},
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0']
				},
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/
			}
		]
	},
	sassLoader: {
		includePaths: [
			path.resolve(__dirname, './node_modules/foundation-sites/scss')
		]
	},
	devtool: 'cheap-module-eval-source-map'
};
