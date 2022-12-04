import { EmbedBuilder } from 'discord.js';
import guildSchema = require('../../models/guildSchema');
module.exports = {
    name: 'setpremium',
    description: 'Set a server as premium',
    async execute(client: any, interaction: any) {
        if (!(interaction.user.id === '426455031571677197')) {
            const embed: EmbedBuilder = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('You are not allowed to use this command')
                .setColor(0xff0000);

            return interaction.reply({ embeds: [embed] });
        }
        const guildID = interaction.guild.id;

        const guildData = await guildSchema.findOneAndUpdate({ guildID: guildID }, { premium: true }, { upsert: true, new: true });

        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Success')
            .setDescription('Server set as premium')
            .setColor(0x00ff00);

        interaction.reply({ embeds: [embed] });
    },
};