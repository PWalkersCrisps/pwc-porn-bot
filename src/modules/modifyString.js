module.exports = {
	capitalizeFirstLetter: function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1); // Capitalize the first letter of a string
	},

	formatBytes: function(a, b) {
		if (a == 0) return '0 Bytes'; // If the bytes is 0, return 0 Bytes
		const c = 1024, // The number of bytes in a kilobyte
			d = b || 2, // The number of decimal places to round to
			e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], // The suffixes for the bytes
			f = Math.floor(Math.log(a) / Math.log(c)); // The number of suffixes to use

		return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f]; // Return the bytes in the correct format
	},

	isValidHttpUrl: function(string) {
		let url;
		try {
			url = new URL(string);
		}
		catch (_) {
			return false;
		}
		return true;
	},
};