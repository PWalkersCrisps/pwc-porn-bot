const { BOT_CLIENT_ID, TESTING_GUILD_ID } = require('../arrays/config.json'); // Import the client ID and guild ID from config.json
const { REST } = require('@discordjs/rest'); // Import the REST module from discord.js
const { Routes } = require('discord-api-types/v9'); // Import the Discord API types
const postPorn = require('../modules/postPorn'); // Import the postporn module

const commands = require('../arrays/interactionCommands.js'); // Import the commands array from arrays/commands.json

require('dotenv').config();

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		try {
			console.log(`${ client.user.tag } is online, hopefully it works`); // Log the bot's tag and status

			const rest = new REST({ // Create a new REST client
				version: '9', // Set the REST client's version to 9
			}).setToken(process.env.BOT_TOKEN); // Set the REST client's token to the bot's token

			console.log('Started refreshing application (/) commands.'); // Log that the application commands are being refreshed
			await rest.put(Routes.applicationCommands(BOT_CLIENT_ID), { body: commands }) // Push the commands to the application
				.then(() => console.log('Successfully registered application commands.')) // Log success
				.catch(err => console.log(err)); // Log the error

			postPorn.loadAll(client, 15);
		}
		catch (error) {
			console.error(error);
		}
	},
};