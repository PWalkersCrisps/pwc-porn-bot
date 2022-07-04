const { SlashCommandBuilder } = require('@discordjs/builders');

const { booruSearch } = require('../../modules/booru.js');
const { checkForLoli, checkBooruRating } = require('../../modules/filter.js');

const { validBoorus } = require('../../arrays/randomTopic.js');

module.exports = {
	name: 'booru',
	aliases: [],
	category: 'nsfw',
	description: 'Get some wallpapers',
	async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton) {
		if (!interaction.channel.nsfw) { return interaction.reply('This channel dosen\'t support nsfw content'); }

		const booruOptions = String(interaction.options.getString('boorus')).replace('booru_', '');
		const booruTags = interaction.options.getString('tags');

		const posts = await booruSearch(booruOptions, booruTags, 10, true);
		const { allowedPosts } = checkForLoli(checkBooruRating(posts, ['q', 'e']).allowedPosts);

		if (allowedPosts.length === 0) { return interaction.reply({ content: 'No allowed results found' }); }

		const post = allowedPosts[Math.floor(Math.random() * allowedPosts.length)];
		const embed = new MessageEmbed()
			.setImage(post.fileUrl);

		const actionRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('View')
					.setStyle('LINK')
					.setURL(post.fileUrl),
			);

		return interaction.reply({ embeds: [embed], components: [actionRow] });

	},
};