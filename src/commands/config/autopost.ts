import { EmbedBuilder } from "discord.js";
import guildSchema = require("../../models/guildSchema");

module.exports = {
    name: 'autopost',
    description: 'Set a channel to automatically post a random image from a booru',
    async execute(client: any, interaction: any) {
        const channelID = interaction.options.getChannel('channel');
        const guildID = interaction.guild.id;

        const guildData = await guildSchema.findOneAndUpdate({ guildID }, { autoPostChannel: channelID }, { upsert: true, new: true });

        const embed = new EmbedBuilder()
            .setTitle('Success')
            .setDescription(`Channel set to automatically post a random image from a booru`)
            .setColor(0x00ff00);

        interaction.reply({ embeds: [embed] });
    },
};
