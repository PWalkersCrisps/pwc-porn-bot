import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } from 'discord.js';
import booru from '../../modules/booru';
import guildSchema from '../../models/guildSchema';

module.exports = {
    name: 'booru',
    description: 'Searches for a random image depending on your choices',
    async execute(client: any, interaction: any) {
        if (!interaction.channel.nsfw) {
            const embed = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('This command can only be used in NSFW channels')
                .setColor(0xff0000);

            return interaction.reply({ embeds: [embed] });
        }

        const site = interaction.options.getString('booruchoice') ?? 'danbooru';
        const tags = interaction.options.getString('tags') ?? 'boobs';

        let post;
        const guildData = guildSchema.findOne({ guildID: interaction.guild.id });

        try {
            post = await booru.search(site, tags, 15);
            if (post === null) return;

            // Check if the post tags contain the guild blacklisted tags

        }
        catch (error) {
            const embed = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('No results found')
                .setColor(0xff0000);

            return interaction.reply({ embeds: [embed] });
        }

        const embed = new EmbedBuilder()
            .setImage(await post.fileUrl);

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('View Post')
                    .setURL(post.postView),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Danger)
                    .setLabel('⚠️')
                    .setCustomId('delete')
            );


        interaction.reply({ embeds: [embed], components: [row] });

        client.on(Events.InteractionCreate, async (button: any) => {
            if (!button.isButton()) return;
            if (button.customId === 'delete') {
                await button.deferUpdate();
                await button.message.delete();
            }
        });

    },
};