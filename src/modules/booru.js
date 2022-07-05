const Booru = require('booru');

async function booruSearch(site, tags, limit = 1, random = true) {
	let posts = [];
	try {
		posts = await Booru.search(site, tags, { limit, random });
	}
	catch (error) {
		return;
	}
	return posts;
}

module.exports = { booruSearch };