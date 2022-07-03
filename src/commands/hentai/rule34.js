const rule34 = require('rule34js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'ass',
	aliases: [],
	category: 'nsfw',
	description: 'Get some wallpapers',
	data: new SlashCommandBuilder()
		.setName('ass')
		.setDescription('nsfw')
		.addStringOption(option => option.setName('tag').setDescription('Search with R34 tag').setRequired(true)),
	async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton) {

		if (!interaction.channel.nsfw) {
			return interaction.reply('This channel dosen\'t support nsfw content');
		}
		else {
			const r34 = new MessageEmbed();
			r34.setColor('RANDOM');
			r34.setImage(await rule34.posts(
				{
					limit: 1,
					tags: interaction.options.getString('tag'),
				},
			).then(posts => posts[0].fileUrl));
			return interaction.reply({ embeds: [r34] });

		}
	},
};