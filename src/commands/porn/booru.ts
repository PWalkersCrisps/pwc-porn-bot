import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } from 'discord.js';
// import booru from '../../modules/booru';
import { search } from 'booru';

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

        console.log(site);

        const post: any | void = (await search('danbooru', tags, { limit: 1, random: true }))[0] as BooruPost;

        console.log(post);

        if (!post) {
            const embed: EmbedBuilder = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('No results found')
                .setColor(0xff0000);

            return interaction.reply({ embeds: [embed] });
        }

        const embed: EmbedBuilder = new EmbedBuilder()
            .setColor(0x0000ff)
            .setImage(await post.fileUrl);

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

        interaction.reply({ embeds: [embed], components: [row] });

    },
};