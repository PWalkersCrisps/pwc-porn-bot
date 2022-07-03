const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = [
	new SlashCommandBuilder()
		.setName('ass')
		.setDescription('nsfw'),
	new SlashCommandBuilder()
		.setName('bdsm')
		.setDescription('nsfw'),
	new SlashCommandBuilder()
		.setName('cum')
		.setDescription('nsfw'),
	new SlashCommandBuilder()
		.setName('doujin')
		.setDescription('nsfw'),
	new SlashCommandBuilder()
		.setName('femdom')
		.setDescription('nsfw'),
	new SlashCommandBuilder()
		.setName('hentai')
		.setDescription('nsfw'),
	new SlashCommandBuilder()
		.setName('maid')
		.setDescription('nsfw'),
	new SlashCommandBuilder()
		.setName('neko')
		.setDescription('nsfw'),
	new SlashCommandBuilder()
		.setName('orgy')
		.setDescription('nsfw'),
	new SlashCommandBuilder()
		.setName('panty')
		.setDescription('nsfw'),
	new SlashCommandBuilder()
		.setName('ass')
		.setDescription('nsfw')
		.addStringOption(option => option.setName('tag').setDescription('Search with R34 tag').setRequired(true)),
	new SlashCommandBuilder()
		.setName('botinfo')
		.setDescription('Get information about the bot'),
	new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping the server the bot is being hosted on and see the delays that there is'),
	new SlashCommandBuilder()
		.setName('uptime')
		.setDescription('See how long the bot has been up for since startup'),
];