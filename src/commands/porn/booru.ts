import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ColorResolvable } from 'discord.js';
import booru from '../../modules/booru';

module.exports = {
    name: 'booru',
    description: 'Searches for a random image depending on your choices',
    async execute(client: any, interaction: any) {
        if (!interaction.channel.nsfw) {
            const embed: EmbedBuilder = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('This command can only be used in NSFW channels')
                .setColor(0xff0000);

            return interaction.reply({ embeds: [embed] });
        }
        const site: string = interaction.options.getString('booruchoice');
        const tags: string = interaction.options.getString('tags');

        const post: BooruPost | void = await booru.searchPosts(site, tags);

        if (!post) {
            const embed: EmbedBuilder = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('No results found')
                .setColor(0xff0000);

            return interaction.reply({ embeds: [embed] });
        }

        const content = await messageContent(post);
        const embed = content.embed;
        const row = content.row;

        interaction.reply({ embeds: [embed], components: [row] });

    },
};

async function messageContent(post: any) {
    // Create an embed with the post's image
    const embed: EmbedBuilder = new EmbedBuilder()
        .setColor('Random' as ColorResolvable)
        .setImage(await post.fileUrl);

    // Create a row of buttons with links to the post and a delete button
    const row: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>()
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
    return { embed, row };
}