import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ColorResolvable } from 'discord.js';
import guildSchema from '../models/guildSchema';
import booru from './booru';
import tags from '../data/tags.json';


export = {
    postToPremiumServer: async function(client: any, loopDelay: number) {

        const post: BooruPost | void = await booru.search('danbooru', tags[Math.floor(Math.random() * tags.length)]);

        if (!post) {
            this.postToPremiumServer(client, loopDelay);
            return;
        }

        const embed: EmbedBuilder = new EmbedBuilder()
            .setColor('Random' as ColorResolvable)
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

        const guilds: GuildDocument[] = await guildSchema.find({ premium: true });

        try {
            guilds.forEach(async (guild: GuildDocument) => {
                // check if guild exists
                const guildExists: boolean = client.guilds.cache.has(guild.guildId);
                if (!guildExists) {
                    return;
                }

                const channel = await client.channels.fetch(guild.autoPostChannel);
                if (channel) {
                    channel.send({ embeds: [embed], components: [row] });
                }
            });
        }
        catch (error) {
            console.log(error);
        }

        setTimeout(() => {
            this.postToPremiumServer(client, loopDelay);
        }, loopDelay * 1000);
    },
};
