const { Client, Collection, Intents } = require('discord.js'); // Import the Client, Collection, and Intents modules from discord.js
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js'); // Import the MessageEmbed, MessageActionRow, and MessageButton modules from discord.js

const { readdirSync } = require('fs'); // Import the readdirSync module from fs
const { resolve } = require('path'); // Import the resolve module from path
require('dotenv').config(); // Loads the .env file

const client = new Client({ // Create a new Discord client
	disableMentions: 'everyone', // Disable @everyone and @here mentions
	intents: [
		Intents.FLAGS.GUILDS,
	],
});

module.exports = { client }; // Exports the client
client.commands = new Collection(); // Creates a new collection to put all of the commands in
client.categories = readdirSync(resolve('commands')); // Makes the sub-directories in ./commands/* into their own categories
['command', 'event'].forEach((handler) => {
	require(resolve(`./handlers/${handler}`))(client); // For each of the two handlers, require the handler file and run it
});

client.on('interactionCreate', async (interaction) => { // When the client is ready
	try {
		if (!interaction.isCommand()) return; // If the interaction is not a command, return

		const command = client.commands.get(interaction.commandName); // Get the command from the client's commands collection

		if (!command) return; // If the command is not found, return

		try {
			await command.execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton); // Execute the command
		}
		catch (error) {
			console.error(error); // If there is an error, log it
			await interaction.reply({ // Reply to the interaction with an error message
				content: 'There was an error while executing this command!', // Set the content to the error message
				ephemeral: true,
			});
		}
	}
	catch (error) {
		console.error(error);
	}
});

client.login(process.env.BOT_TOKEN); // Discord Client Login