const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js'); // Import the MessageEmbed, MessageActionRow, and MessageButton modules from discord.js
const { client } = require('../../index.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
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
	},
};