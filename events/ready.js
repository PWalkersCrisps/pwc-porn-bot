/* eslint-disable no-inner-declarations */
const { CLIENT_ID, GUILD_ID } = require('../arrays/config.json');
const { MessageEmbed } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const commands = require('../arrays/interactionCommands.js');
require('dotenv').config();

const { randomInt } = require('../modules/random.js');
const randomPornTopic = require('../arrays/randomTopic.js');
const akaneko = require('akaneko');

const Reddit = require('reddit');
const reddit = new Reddit({
	username: String(process.env.REDDIT_USERNAME),
	password: String(process.env.REDDIT_PASSWORD),
	appId: String(process.env.REDDIT_APP_ID),
	appSecret: String(process.env.REDDIT_APP_SECRET),
	userAgent: 'MyApp/1.0.0 (http://example.com)',
});

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

			function post() {
				setTimeout(async function() {
					const topic = await randomPornTopic[randomInt(0, randomPornTopic.length)] || await akaneko.nsfw.hentai();

					const akanekoSan = new MessageEmbed()
						.setColor('RANDOM')
						.setTimestamp()
						.setDescription(String(topic.text))
						.setImage(await topic.image);
					try {
						client.channels.fetch('988549632500039711').then(channel => channel.send({ embeds: [akanekoSan] }));
					}
					catch (error) {
						console.error(error);
					}
					post();
				}, 30 * 1000);
			}
			post();
		}
		catch (error) {
			console.error(error);
		}
	},
};