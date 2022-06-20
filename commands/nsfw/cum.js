const akaneko = require('akaneko');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'cum',
	aliases: [],
	category: 'nsfw',
	description: 'Get some wallpapers',
	data: new SlashCommandBuilder()
		.setName('cum')
		.setDescription('nsfw'),

	async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton) {

		if (!interaction.channel.nsfw) {
			return interaction.reply('This channel dosen\'t support nsfw content');

		}
		else {

			const akanekoSan = new MessageEmbed();
			akanekoSan.setColor('RANDOM');
			akanekoSan.setImage(await akaneko.nsfw.cum());
			return interaction.reply({ embeds: [akanekoSan] });

		}
	},
};