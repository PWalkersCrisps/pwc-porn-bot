require('dotenv').config();

module.exports = {
	'apps': [
		{
			'name': 'pwc-porn-bot',
			'script': './src/index.js',
			'watch': true,
			'env': {
				'NODE_ENV': 'production',

				'BOT_TOKEN': process.env.BOT_TOKEN,
			},
		},
	],
};

