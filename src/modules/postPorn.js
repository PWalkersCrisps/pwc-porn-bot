const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const reddit = require('random-reddit');

const { randomInt } = require('./random.js');
const { isValidHttpUrl } = require('./modifyString.js');
const { checkRedgif } = require('./filter.js');
const { booruSearch } = require('./booru.js');
const { checkForLoli, checkBooruRating } = require('./filter.js');

const { HENTAI_CHANNEL_ID, IRL_CHANNEL_ID } = require('../arrays/config.json');
const randomPornTopic = require('../arrays/randomTopic.js');

function loadAll(client, loopDelay) {
	postDanbooruHentai(client, loopDelay);
	postRedditNSFW(client, loopDelay);
}

async function postDanbooruHentai(client, loopDelay) {
	setTimeout(async function() {
		const topic = await randomPornTopic.danbooruPorn[randomInt(0, randomPornTopic.danbooruPorn.length)];
		const posts = await booruSearch('danbooru', topic, 15, true);

		const { allowedPosts } = checkForLoli(checkBooruRating(posts, ['q', 'e']).allowedPosts);

		if (allowedPosts.length === 0) { return postDanbooruHentai(client, loopDelay); }

		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setTimestamp()
			.setImage(allowedPosts[0].file_url);

		const actionRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('View')
					.setStyle('LINK')
					.setURL(allowedPosts[0].postView),
			);

		client.channels.fetch(HENTAI_CHANNEL_ID).then(channel => channel.send({ embeds: [embed], components: [actionRow] }));
		postDanbooruHentai(client, loopDelay);
	}, (loopDelay * 1000));
}

async function postRedditNSFW(client, loopDelay) {
	setTimeout(async function() {
		const subreddits = randomPornTopic.irlPorn;

		const post = await checkRedgif(await reddit.getPost(subreddits), subreddits);
		if (!isValidHttpUrl(post.url)) { return postRedditNSFW(client, loopDelay); }

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

		client.channels.fetch(IRL_CHANNEL_ID).then(channel => channel.send({ embeds: [embed], components: [actionRow] }));
		postRedditNSFW(client, loopDelay);
	}, loopDelay * 1000);
}


module.exports = { loadAll, postDanbooruHentai, postRedditNSFW };