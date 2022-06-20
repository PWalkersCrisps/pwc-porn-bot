const akaneko = require('akaneko');

const { randomInt } = require('./random.js');

module.exports = {
	autoPostPorn: async function(client, MessageEmbed) {
		const randomTopic = [
			akaneko.nsfw.ass(),
			akaneko.nsfw.bdsm(),
			akaneko.nsfw.blowjob(),
			akaneko.nsfw.cum(),
			akaneko.nsfw.doujin(),
			akaneko.nsfw.feet(),
			akaneko.nsfw.femdom(),
			akaneko.nsfw.foxgirl(),
			akaneko.nsfw.gifs(),
			akaneko.nsfw.glasses(),
			akaneko.nsfw.hentai(),
			akaneko.nsfw.maid(),
		];
		const akanekoSan = new MessageEmbed()
			.setColor('RANDOM')
			.setImage(await randomTopic[randomInt(0, randomTopic.length)]);
		client.channels.fetch('988549632500039711').then(channel => channel.send({ embeds: [akanekoSan] }));
		return console.log('Auto Porn invoked');
	},
};