const akaneko = require('akaneko');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'hentai',
	aliases: [],
	category: 'nsfw',
	description: 'Get some wallpapers',
	data: new SlashCommandBuilder()
		.setName('hentai')
		.setDescription('nsfw'),
	async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton) {

		if (!interaction.channel.nsfw) {
			return interaction.reply('This channel dosen\'t support nsfw content');

		}
		else {

			const akanekoSan = new MessageEmbed();
			akanekoSan.setColor('RANDOM');
			akanekoSan.setImage(await akaneko.nsfw.hentai());
			return interaction.reply({ embeds: [akanekoSan] });

		}
	},
};