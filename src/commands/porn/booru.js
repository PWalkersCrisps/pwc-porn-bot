const { booruSearch } = require('../../modules/booru.js');
const { checkForLoli, checkBooruRating } = require('../../modules/filter.js');

const { validBoorus } = require('../../arrays/randomTopic.js');

module.exports = {
	name: 'booru',
	description: 'Search for a random image from a booru',
	usage: 'booru <booru> <tags>',
	async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton) {
		if (!interaction.channel.nsfw) { return interaction.reply('This channel dosen\'t support nsfw content'); }

		const booruOptions = String(interaction.options.getString('boorus'));
		const booruTags = interaction.options.getString('tags');

		const { allowedPosts } = checkForLoli(checkBooruRating(await booruSearch(booruOptions, booruTags, 15, true), ['q', 'e']).allowedPosts);

		if (allowedPosts.length === 0) { return interaction.reply({ content: 'No allowed results found' }); }

		const post = allowedPosts[Math.floor(Math.random() * allowedPosts.length)];
		const embed = new MessageEmbed()
			.setTitle(booruOptions)
			.setImage(post.fileUrl)
			.setTimestamp()
			.setColor('RANDOM');

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