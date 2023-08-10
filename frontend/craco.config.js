const fs = require('fs');

const CracoAlias = require('craco-alias');

module.exports = {
	devServer: {
		https: {
			key: fs.readFileSync('C:/Users/SSAFY/Desktop/localhost-key.pem'),
			cert: fs.readFileSync('C:/Users/SSAFY/Desktop/localhost.pem'),
		},
	},
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: 'tsconfig',
				baseUrl: './src',
				tsConfigPath: './tsconfig.paths.json',
			},
		},
	],
};
