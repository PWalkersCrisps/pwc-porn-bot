const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'ping',
	category: 'Info',
	description: 'Returns the bot\'s latency and API ping.',
	usage: 'ping',
	data: 	new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping the server the bot is being hosted on and see the delays that there is'),

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