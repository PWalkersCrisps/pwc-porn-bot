import { EmbedBuilder } from 'discord.js';

const allowedRoles = [
    '811018391913627688',
    '816349466008748033',
];

module.exports = {
    name: 'echo',
    description: 'Echo your message',
    async execute(client: any, interaction: any) {
        if (!(interaction.member.roles.cache.some((role: any) => allowedRoles.includes(role.id)) || interaction.user.id === '426455031571677197')) {
            return interaction.reply({ content: `${interaction.user} actually have permissions to use the command next time`, ephemeral: false });
        }

        const string = interaction.options.getString('input');

        interaction.reply({ content: `${string}` });

    },
};