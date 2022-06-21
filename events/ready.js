/* eslint-disable no-inner-declarations */
const { CLIENT_ID, GUILD_ID } = require('../arrays/config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const commands = require('../arrays/interactionCommands.js');
require('dotenv').config();

const { MessageEmbed } = require('discord.js');
const { randomInt } = require('../modules/random.js');
const randomPornTopic = require('../arrays/randomTopic.js');
const akaneko = require('akaneko');
const reddit = require('random-reddit');

const hentaiChannelID = '988549632500039711';

async function imagePost(topic, options) {
	return await reddit.getImage(String(topic.subreddit), options) || await akaneko.nsfw.hentai();
}

async function postAkanekoHentai(client, loopDelay) {
	setTimeout(async function() {
		const topic = await randomPornTopic.hentaiAkanekoPorn[randomInt(0, randomPornTopic.hentaiAkanekoPorn.length)];

		const image = await topic.type || await akaneko.nsfw.hentai();
		const footerText = await String(topic.text) || 'Hentai';

		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setTimestamp()
			.setFooter({ text: `${await footerText}` })
			.setImage(String(await image));

		client.channels.fetch(hentaiChannelID).then(channel => channel.send({ embeds: [embed] }));
		postAkanekoHentai(client, loopDelay);
	}, loopDelay * 1000);
}
async function postRedditHentai(client, loopDelay) {
	setTimeout(async function() {
		const topic = await randomPornTopic.hentaiRedditPorn[randomInt(0, randomPornTopic.hentaiRedditPorn.length)] || await akaneko.nsfw.hentai();

		const options = {
			imageOnly: true,
			allowNSFW: true,
		};

		const image = await imagePost(topic, options);
		const footerText = await String(await topic.text) || 'Hentai';

		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setTimestamp()
			.setFooter({ text: `${await footerText}` })
			.setImage(await image);
		client.channels.fetch(hentaiChannelID).then(channel => channel.send({ embeds: [embed] }));
		postRedditHentai(client, loopDelay);
	}, loopDelay * 1000);
}

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		try {
			console.log(`${ client.user.tag } is online, hopefully it works`);

			const rest = new REST({
				version: '9',
			}).setToken(process.env.BOT_TOKEN);

			console.log('Started refreshing application (/) commands.');

			await rest.put( // This uploads onto discord's command cache, if there are no changes then nothing different should happen
				Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
				{ body: commands },
			);

			console.log('Successfully reloaded application (/) commands.');

			postAkanekoHentai(client, 14);
			// postRedditHentai(client, 19);

		}
		catch (error) {
			console.error(error);
		}
	},
};