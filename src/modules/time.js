function parseDur(ms) {
	let seconds = ms / 1000; // Convert to seconds

	const days = parseInt(seconds / 86400); // Get the number of days
	seconds = seconds % 86400; // Get the remaining seconds

	const hours = parseInt(seconds / 3600); // Get the number of hours
	seconds = seconds % 3600; // Get the remaining seconds

	const minutes = parseInt(seconds / 60); // Get the number of minutes
	seconds = parseInt(seconds % 60); // Get the remaining seconds

	if (days) { // If there are days
		return `\`${days}\` day, \`${hours}\` hours, \`${minutes}\` minutes`; // Return the days, hours, and minutes
	}
	else if (hours) { // If there are hours
		return `\`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds`; // Return the hours, minutes, and seconds
	}
	else if (minutes) { // If there are minutes
		return `\`${minutes}\` minutes, \`${seconds}\` seconds`; // Return the minutes and seconds
	}
	return `\`${seconds}\` second(s)`; // Return the seconds
}

function currentTime() {
	const date = new Date().toLocaleDateString(); // Get the current date
	const time = new Date().toLocaleTimeString(); // Get the current time
	const currentDate = date + ' @ ' + time; // Combine the date and time
	return currentDate; // Return the current date and time
}

module.exports = { parseDur, currentTime };