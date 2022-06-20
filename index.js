const { Client, Collection, Intents, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const client = new Client({ disableMentions: 'everyone', intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

require('dotenv').config();
const fs = require('fs');
const path = require('path');

/* Command/Event Handlers */
client.commands = new Collection();
client.categories = fs.readdirSync(path.resolve('./commands'));
['command', 'event'].forEach((handler) => {
	require(path.resolve(`./handlers/${handler}`))(client);
});

client.on('interactionCreate', async (interaction) => {
	try {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	}
	catch (error) {
		console.error(error);
	}
});

/* Login */
client.login(process.env.BOT_TOKEN);