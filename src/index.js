const { Client, Collection, Intents } = require('discord.js'); // Import the Client, Collection, and Intents modules from discord.js

const { readdirSync } = require('fs'); // Import the readdirSync module from fs
const { resolve } = require('path'); // Import the resolve module from path
require('dotenv').config(); // Loads the .env file

const client = new Client({ // Create a new Discord client
	disableMentions: 'everyone', // Disable @everyone and @here mentions
	intents: [
		Intents.FLAGS.GUILDS,
	],
});

module.exports = { client }; // Exports the client
client.commands = new Collection(); // Creates a new collection to put all of the commands in
client.categories = readdirSync(resolve('./src/commands')); // Makes the sub-directories in ./commands/* into their own categories
['command', 'event'].forEach((handler) => {
	require(resolve(`./src/handlers/${handler}`))(client); // For each of the two handlers, require the handler file and run it
});

client.login(process.env.BOT_TOKEN); // Discord Client Login