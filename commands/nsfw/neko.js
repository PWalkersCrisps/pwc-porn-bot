const akaneko = require('akaneko');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'neko',
	aliases: [],
	category: 'nsfw',
	description: 'Get some wallpapers',
	data: new SlashCommandBuilder()
		.setName('neko')
		.setDescription('nsfw'),
	async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton) {

		if (!interaction.channel.nsfw) {
			return interaction.reply('This channel dosen\'t support nsfw content');

		}
		else {

			const akanekoSan = new MessageEmbed();
			akanekoSan.setColor('RANDOM');
			akanekoSan.setImage(await akaneko.lewdneko());
			return interaction.reply({ embeds: [akanekoSan] });

		}
	},
};