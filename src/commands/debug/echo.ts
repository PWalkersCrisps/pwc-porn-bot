import { EmbedBuilder } from 'discord.js';
module.exports = {
    name: 'echo',
    description: 'Echo your message',
    async execute(client: any, interaction: any) {
        if (!(interaction.user.id === '426455031571677197')) return interaction.reply({ content: `<@${interaction.user.id}> actually have permissions to use the command next time`, ephemeral: true });

        const string = interaction.options.getString('input');

        await interaction.reply({ content: `${string}` });

    },
};