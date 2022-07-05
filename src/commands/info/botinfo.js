const { version: djsversion, MessageEmbed } = require('discord.js');

const moment = require('moment');
const { platform, cpus } = require('os');

const { formatBytes } = require('../../modules/modifyString');
const { parseDur } = require('../../modules/time.js');
const { BOT_OWNER, BOT_DEV } = require('../../arrays/config.json');

const formatOS = {
	aix: 'IBM AIX',
	darwin: 'Darwin',
	freebsd: 'FreeBSD',
	linux: 'Linux',
	openbsd: 'OpenBSD',
	sunos: 'SunOS',
	win32: 'Windows',
};

module.exports = {
	name: 'botinfo',
	description: 'Displays indept information about the bot.',
	async execute(client, interaction, MessageActionRow, MessageButton) {

		const embed = new MessageEmbed()
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(interaction.guild.members.cache.get(client.user.id).displayHexColor)
			.setFooter({ text: `Requested by ${interaction.user.tag}` })
			.setTimestamp()
			.setTitle('Bot Information')
			.addFields(
				{
					name: '<:documents:773950876347793449> General ❯',
					inline: false,
					value: `>>> **<:card:773965449402646549> Bot Name: ${client.user.tag}**\n
							**📇 Bot ID: ${client.user.id}**\n
							**👑 Bot Owner: ${client.users.cache.get(BOT_OWNER).tag}**\n
							**💻 Bot Dev: ${client.users.cache.get(BOT_DEV).tag}**\n
							**🌐 Servers: ${client.guilds.cache.size.toLocaleString()} Servers**\n
							**👥 Users: ${client.users.cache.size.toLocaleString()} Users**\n
							**📺 Channels: ${client.channels.cache.size.toLocaleString()} Channels**\n
							**💬 Commands: ${client.commands.size} Commands**\n
							**📅 Created: ${moment(client.user.createdTimestamp).format('MMMM Do YYYY, h:mm:ss')} | ${Math.floor((Date.now() - client.user.createdTimestamp) / 86400000)} day(s) ago**\n`,
				},
				{
					name: '<:documents:773950876347793449> System ❯',
					inline: false,
					value: `>>> **<:online:745651877382717560> Uptime: ${parseDur(client.uptime)}**\n
							**<:nodejs:773599989724348448> Node.js: ${process.version}**\n
							**<:djs:773599989833400371> Discord.js: v${djsversion}**\n
							**🖥 Platform: ${formatOS[platform]}**\n
							**📊 Memory: ${formatBytes(process.memoryUsage().heapUsed)} / ${formatBytes(process.memoryUsage().heapTotal)}**\n
							**💻 CPU: ${cpus()[0].model.split('CPU')[0]}${cpus().length} Cores ${cpus()[0].model.split('CPU ')[1]}**`,
				},
			);
		interaction.reply({ embeds: [embed] });

	},
};