const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { BOT_CLIENT_ID, TESTING_GUILD_ID } = require('./arrays/config.json'); // Import the client ID and guild ID from the config file
const fs = require('fs'); // Import the file system module

const { client } = require('./index.js');
const commands = client.data;

require('dotenv').config(); // Loads the .env file

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Get all files in commands folder

for (const file of commandFiles) { // Loop through all files in the commands folder
	const command = require(`./commands/${file}`); // Current file
	commands.push(command.data.toJSON()); // Add the command to the commands array
}

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN); // Set's rest client to use the bot's token

rest.put(Routes.applicationGuildCommands(BOT_CLIENT_ID), { body: commands }) // Push the commands to the guild
	.then(() => console.log('Successfully registered application commands.')) // Log success
	.catch(console.error); // Log error
