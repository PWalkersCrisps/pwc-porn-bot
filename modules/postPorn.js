const { MessageEmbed } = require('discord.js');
const akaneko = require('akaneko');
const randomPornTopic = require('../arrays/randomTopic.js');
const { randomInt } = require('./random.js');
const { isValidHttpUrl } = require('./modifyString.js');
const reddit = require('random-reddit');

const hentaiChannelID = '988549632500039711';
const irlChannelID = '988877445983797298';

function loadAll(client, loopDelay) {
	postAkanekoHentai(client, loopDelay);
	postRedditHentai(client, loopDelay);
	postRedditNSFW(client, loopDelay);
}
async function checkRedgif(checkURL) {
	let newImageURL = checkURL;
	const subreddit = randomPornTopic.irlPorn;
	while (newImageURL.includes('redgifs.com')) {
		newImageURL = await reddit.getImage(subreddit);
	}
	return newImageURL;
}
async function postAkanekoHentai(client, loopDelay) {
	setTimeout(async function() {
		const topic = await randomPornTopic.hentaiAkanekoPorn[randomInt(0, randomPornTopic.hentaiAkanekoPorn.length)];

		const imageURL = await topic || akaneko.nsfw.hentai();
		const footerText = 'Hentai';

		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setTimestamp()
			.setFooter({ text: `${await footerText}` })
			.setImage(String(await imageURL));

		client.channels.fetch(hentaiChannelID).then(channel => channel.send({ embeds: [embed] }));
		postAkanekoHentai(client, loopDelay);
	}, (loopDelay + randomInt(10, 50)) * 1000);
}
async function postRedditHentai(client, loopDelay) {
	setTimeout(async function() {
		const subreddit = randomPornTopic.hentaiRedditPorn;

		let imageURL = await reddit.getImage(subreddit);
		if (!isValidHttpUrl(imageURL)) { imageURL = await akaneko.nsfw.hentai(); }
		const footerText = 'Hentai';

		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setTimestamp()
			.setFooter({ text: `${await footerText}` })
			.setImage(await imageURL);
		client.channels.fetch(hentaiChannelID).then(channel => channel.send({ embeds: [embed] }));
		postRedditHentai(client, loopDelay);
	}, loopDelay * 1000);
}
async function postRedditNSFW(client, loopDelay) {
	setTimeout(async function() {
		const subreddit = randomPornTopic.irlPorn;

		const imageURL = await checkRedgif(await reddit.getImage(subreddit));
		if (!isValidHttpUrl(imageURL)) { return; }
		const footerText = 'Porn';

		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setTimestamp()
			.setFooter({ text: `${await footerText}` })
			.setImage(await imageURL);
		client.channels.fetch(irlChannelID).then(channel => channel.send({ embeds: [embed] }));
		postRedditNSFW(client, loopDelay);
	}, loopDelay * 1000);
}

module.exports = { loadAll, postAkanekoHentai, postRedditHentai, postRedditNSFW };