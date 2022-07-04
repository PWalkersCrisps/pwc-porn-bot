const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = [
	new SlashCommandBuilder()
		.setName('booru')
		.setDescription('nsfw')
		.addStringOption(option =>
			option.setName('boorus')
				.setDescription('Choose specific boorus')
				.setRequired(true)
				.addChoices(
					{ name: 'e621', value: 'e621' },
					{ name: 'e926', value: 'e926' },
					{ name: 'hypnohub', value: 'hypnohub' },
					{ name: 'danbooru', value: 'danbooru' },
					{ name: 'konachan', value: 'konachan' },
					{ name: 'yande.re', value: 'yandere' },
					{ name: 'gelbooru', value: 'gelbooru' },
					{ name: 'rule34', value: 'rule34' },
					{ name: 'safebooru', value: 'safebooru' },
					{ name: 'tbib', value: 'tbib' },
					{ name: 'xbooru', value: 'xbooru' },
					{ name: 'rule34paheal', value: 'rule34paheal' },
					{ name: 'derpibooru', value: 'derpibooru' },
					{ name: 'realbooru', value: 'realbooru' },
				))
		.addStringOption(option =>
			option.setName('tags')
				.setDescription('Tags to search for')
				.setRequired(true)),

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