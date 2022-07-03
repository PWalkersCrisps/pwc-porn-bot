const { BOT_CLIENT_ID, TESTING_GUILD_ID } = require('../arrays/config.json'); // Import the client ID and guild ID from config.json
const { REST } = require('@discordjs/rest'); // Import the REST module from discord.js
const initialize = require('../modules/initialize'); // Import the initialize module

const commands = require('../arrays/interactionCommands.js');
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

			initialize.initializeApplicationCommands(BOT_CLIENT_ID, TESTING_GUILD_ID, commands, rest); // Initialize the application commands

            postPorn.loadAll(client, 15);
		}
		catch (error) {
			console.error(error);
		}
	},
};