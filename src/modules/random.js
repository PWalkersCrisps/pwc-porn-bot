module.exports = {
	randomHexColour : function() {
		const n = (Math.random() * 0xfffff * 1000000).toString(16); // Generate a random hex colour
		return '#' + n.slice(0, 6); // Return the hex colour
	},
	randomInt : function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min; // Generate a random integer
	},
};
