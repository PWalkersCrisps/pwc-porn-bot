const reddit = require('random-reddit');

const randomPornTopic = require('../arrays/randomTopic.js');
const { loliFilter } = require('../arrays/tagsFilter.js');

async function checkRedgif(post) {
	let newImageURL = post;
	const subreddit = randomPornTopic.irlPorn;
	while (newImageURL.url.includes('redgifs.com')) {
		newImageURL = await reddit.getPost(subreddit);
	}
	return newImageURL;
}

function checkForLoli(posts) {
	const allowedPosts = [];
	const disallowedPosts = [];
	for (let i = 0; i < posts.length; i++) {
		if (posts[i].tags.includes(loliFilter)) {
			disallowedPosts.push(posts[i]);
		}
		else {
			allowedPosts.push(posts[i]);
		}
	}
	return { allowedPosts, disallowedPosts };
}

function checkBooruRating(posts, intendedRating = ['q', 'e']) {
	const allowedPosts = [];
	const disallowedPosts = [];
	for (let i = 0; i < posts.length; i++) {
		if (intendedRating.includes(posts[i].rating)) {
			allowedPosts.push(posts[i]);
		}
		else {
			disallowedPosts.push(posts[i]);
		}
	}
	return { allowedPosts, disallowedPosts };
}

module.exports = { checkRedgif, checkForLoli, checkBooruRating };