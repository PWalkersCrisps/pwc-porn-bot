const akaneko = require('akaneko');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'ass',
	aliases: [],
	category: 'nsfw',
	description: 'Get some wallpapers',
	data: new SlashCommandBuilder()
		.setName('ass')
		.setDescription('nsfw'),
	async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton) {

		if (!interaction.channel.nsfw) {
			return interaction.reply('This channel dosen\'t support nsfw content');

		}
		else {
			const akanekoSan = new MessageEmbed();
			akanekoSan.setColor('RANDOM');
			akanekoSan.setImage(await akaneko.nsfw.ass());
			return interaction.reply({ embeds: [akanekoSan] });

		}
	},
};