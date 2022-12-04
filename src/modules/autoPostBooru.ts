import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } from 'discord.js';
import guildSchema from '../models/guildSchema';
import booru from './booru';
import tags from '../data/tags.json';


export = {
    postToPremiumServer: async function(client: any, loopDelay: number) {

        const post: BooruPost | void = await booru.search('gelbooru', tags[Math.floor(Math.random() * tags.length)]);

        if (post === undefined) {
            this.postToPremiumServer(client, loopDelay);
            return;
        }


        const embed: EmbedBuilder = new EmbedBuilder()
            .setColor(0x00ff00)
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

        guilds.forEach(async (guild: GuildDocument) => {
            const channel = await client.channels.fetch(guild.autoPostChannel);
            if (channel) {
                channel.send({ embeds: [embed], components: [row] });
            }
        });

        setTimeout(() => {
            this.postToPremiumServer(client, loopDelay);
        }, loopDelay * 1000);
    },
};
