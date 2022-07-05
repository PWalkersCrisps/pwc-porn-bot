const { readdirSync } = require('fs');

module.exports = {
	name: 'help',
	description: 'Help command',
	usage: 'help [command]',
	async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton) {
		const commandChosen = interaction.options.getString('command');
		if (!commandChosen) {
			const categories = [];
			readdirSync('./src/commands/').forEach((dir) => {
				const commands = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith('.js'));

				const cmds = commands.map((command) => {
					const file = require(`../../commands/${dir}/${command}`);
					if (!file.name) { return 'No file name'; }

					const name = file.name.replace('.js', '');

					return `\`${name}\``;

				});

				let data = new Object();
				data = {
					name: dir.toUpperCase(),
					value: cmds.length === 0 ? 'Incomplete' : cmds.join(' | '),
				};
				categories.push(data);

			});

			const embed = new MessageEmbed()
				.setTitle('Commands')
				.setDescription('Use `/help [command]` to get more info about a command')
				.addFields(categories)
				.setFooter({ text: `Requested by ${interaction.user.tag}`, url: interaction.user.avatarURL({ dynamic: true }) })
				.setColor('RANDOM');

			return interaction.reply({ embeds: [embed] });
		}
		else {
			const command = client.commands.get(commandChosen);
			const embed = new MessageEmbed()
				.setTitle('Command Details')
				.addField('COMMAND:', command.name ? `\`${command.name}\`` : 'No name for this command')
				.addField('DESCRIPTION', command.description ? command.description : 'No description for this command.')
				.addField('USAGE:', command.usage ? `\`/${command.name} ${command.usage}\`` : `\`/${command.name}\``)
				.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
				.setColor('RANDOM');
			return interaction.reply({ embeds: [embed] });
		}


	},
};