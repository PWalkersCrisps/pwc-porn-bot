const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'ping',
	description: 'Returns the bot\'s latency and API ping.',
	async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton) {
		interaction.reply('🏓 Pinging....').then(() => {
			const pEmbed = new MessageEmbed()
				.setTitle('🏓 Pong!')
				.setColor('BLUE')
				.setDescription(
					`Latency: ${Math.floor(
						interaction.createdTimestamp - interaction.createdTimestamp,
					)}ms\nAPI Latency: ${client.ws.ping}ms`,
				);
			interaction.editReply({ embeds: [pEmbed] });
		});
	},
};