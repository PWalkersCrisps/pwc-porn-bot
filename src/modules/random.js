function randomHexColour() {
	const n = (Math.random() * 0xfffff * 1000000).toString(16); // Generate a random hex colour
	return '#' + n.slice(0, 6); // Return the hex colour
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min; // Generate a random integer
}

module.exports = { randomHexColour, randomInt };