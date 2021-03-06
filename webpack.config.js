const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/phoenix.ts',
	output: {
		path: path.resolve(__dirname, 'out'),
		filename: 'phoenix.js',
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{ test: /\.ts$/, loader: 'ts-loader' },
		],
	},
};
