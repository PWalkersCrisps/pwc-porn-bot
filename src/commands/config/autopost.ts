import { EmbedBuilder } from 'discord.js';
import guildSchema = require('../../models/guildSchema');

module.exports = {
    name: 'autopost',
    description: 'Set a channel to automatically post a random image from a booru',
    async execute(client: any, interaction: any) {
        const channel = interaction.options.getChannel('channel');

        // Check if channel is NSFW
        if (!channel.nsfw) {
            const embed: EmbedBuilder = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('This command can only be used for NSFW channels')
                .setColor(0xff0000);

            return interaction.reply({ embeds: [embed] });
        }

        const guildID = interaction.guild.id;

        const guildData = await guildSchema.findOneAndUpdate({ guildID }, { autoPostChannel: channel.id }, { upsert: true, new: true });

        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Success')
            .setDescription('Channel set to automatically post a random image from a booru')
            .setColor(0x00ff00);

        interaction.reply({ embeds: [embed] });
    },
};
