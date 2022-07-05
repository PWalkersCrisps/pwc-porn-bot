const reddit = require('random-reddit');

const { checkRedgif } = require('../../modules/filter.js');

module.exports = {
	name: 'reddit',
	description: 'Search for a random image from a subreddit',
	usage: 'reddit <subreddit>',
	async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton) {
		const subreddit = interaction.options.getString('subreddit');

		const post = await checkRedgif(await reddit.getPost(subreddit), subreddit);

		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setImage(post.url)
			.setColor('RANDOM')
			.setTimestamp()
			.setFooter({ text: `${post.subreddit_name_prefixed}` });

		const actionRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('View')
					.setStyle('LINK')
					.setURL(`https://reddit.com/${post.permalink}`),
			);

		if (post.over_18 && !interaction.channel.nsfw) { return interaction.reply('This channel dosen\'t support nsfw content'); }

		return interaction.reply({ embeds: [embed], components: [actionRow] });

	},
};