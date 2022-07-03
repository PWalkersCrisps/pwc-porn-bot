const { parseDur } = require('../../modules/time.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'uptime',
	description: 'Check how long has the bot been online.',
	category: 'Info',
	usage: 'uptime',
	data: new SlashCommandBuilder()
		.setName('uptime')
		.setDescription('See how long the bot has been up for since startup'),
	async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton) {
		const duration = parseDur(client.uptime);
		const pEmbed = new MessageEmbed()
			.setTitle(':inbox_tray: Online for')
			.setColor('BLUE')
			.setDescription(
				`**${duration}**`,
			);
		interaction.reply({ embeds: [pEmbed] });
	},
};