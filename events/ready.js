/* eslint-disable no-inner-declarations */
const { CLIENT_ID, GUILD_ID } = require('../arrays/config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const commands = require('../arrays/interactionCommands.js');
require('dotenv').config();

const loop = require('../modules/loop.js');

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

			loop.postAkanekoHentai(client, 17.5);
			loop.postRedditHentai(client, 15.5);
		}
		catch (error) {
			console.error(error);
		}
	},
};