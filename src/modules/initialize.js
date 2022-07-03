require('dotenv').config();

module.exports = {
	initializeApplicationCommands : async function(BOT_CLIENT_ID, TESTING_GUILD_ID, commands, rest) {
		const { Routes } = require('discord-api-types/v9'); // Import the Discord API types
		console.log('Started refreshing application (/) commands.'); // Log that the application commands are being refreshed
		await rest.put( // This uploads onto discord's command cache, if there are no changes then nothing different should happen
			Routes.applicationGuildCommands(BOT_CLIENT_ID, TESTING_GUILD_ID), // The route to upload the commands to
			{ body: commands }, // The commands to upload
		).catch(err => console.log(err)); // Log the error
		console.log('Successfully reloaded application (/) commands.'); // Log that the application commands were successfully reloaded
	},

	initializeMongooseConnection : async function() {
		const mongoose = require('mongoose'); // Import the mongoose module
		console.log('Started connecting to MongoDB database.'); // Log that the database is being connected to
		if (!process.env.MONGO_URI) { return console.log('No MONGO_URI found in .env file.'); } // If the MONGO_URI is not found in the .env file, log an error
		await mongoose.connect(process.env.MONGO_URI, { // Connect to the database
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
			keepAlive: true,
		}).catch(err => console.log(err)); // Log the error
		console.log('Successfully connected to MongoDB database.'); // Log that the database was successfully connected to
	},
};
