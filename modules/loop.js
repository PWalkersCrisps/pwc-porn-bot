const { MessageEmbed } = require('discord.js');
const { randomInt } = require('../modules/random.js');
const randomPornTopic = require('../arrays/randomTopic.js');
const akaneko = require('akaneko');
const loop = require('./loop.js');
const reddit = require('random-reddit');

const hentaiChannelID = '988549632500039711';

module.exports = {
	postAkanekoHentai : function(client, loopDelay) {
		setTimeout(async function() {
			const topic = await randomPornTopic.hentaiAkanekoPorn[randomInt(0, randomPornTopic.hentaiAkanekoPorn.length)] || await akaneko.nsfw.hentai();

			const embed = new MessageEmbed()
				.setColor('RANDOM')
				.setTimestamp()
				.setFooter({ text: `${String(topic.text)}` })
				.setImage(await topic.type);

			client.channels.fetch(hentaiChannelID).then(channel => channel.send({ embeds: [embed] }));
			loop.postAkanekoHentai();
		}, loopDelay * 1000);
	},

	postRedditHentai : function(client, loopDelay) {
		setTimeout(async function() {
			const topic = randomPornTopic.hentaiRedditPorn[randomInt(0, randomPornTopic.hentaiRedditPorn.length)] || await akaneko.nsfw.hentai();

			const options = {
				imageOnly: true,
				allowNSFW: true,
			};

			const image = await reddit.getImage(`${topic.subreddit}`, options);


			const embed = new MessageEmbed()
				.setColor('RANDOM')
				.setTimestamp()
				.setFooter({ text: `${String(topic.text)}` })
				.setImage(image);
			client.channels.fetch(hentaiChannelID).then(channel => channel.send({ embeds: [embed] }));
			loop.postRedditHentai();
		}, loopDelay * 1000);
	},
};
