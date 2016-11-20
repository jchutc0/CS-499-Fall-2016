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
			AudioOut:					'app/components/AudioOut.jsx',
			AudioOutTone:			'app/components/AudioOutTone.jsx',
			AudioOutWhiteNoise:			'app/components/AudioOutWhiteNoise.jsx',
			ErrorModal:				'app/components/ErrorModal.jsx',
			Form: 						'app/components/Form.jsx',
			FormButton:				'app/components/FormButton.jsx',
			FormErrorTest:		'app/components/FormErrorTest.jsx',
			FormFrequency: 		'app/components/FormFrequency.jsx',
			FormKeyboard: 		'app/components/FormKeyboard.jsx',
			FormMicrophone: 	'app/components/FormMicrophone.jsx',
			FormNav:			 		'app/components/FormNav.jsx',
			FormNumberPad: 		'app/components/FormNumberPad.jsx',
			FormNumberPadButton: 		'app/components/FormNumberPadButton.jsx',
			FormShephards: 		'app/components/FormShephards.jsx',
			FormWavIn: 				'app/components/FormWavIn.jsx',
			FormWhiteNoise:		'app/components/FormWhiteNoise.jsx',
			Graph:		 				'app/components/Graph.jsx',
			GraphFrequency: 	'app/components/GraphFrequency.jsx',
			GraphWave: 				'app/components/GraphWave.jsx',
			Main: 						'app/components/Main.jsx',
			NotesToUser: 			'app/components/NotesToUser.jsx',
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
