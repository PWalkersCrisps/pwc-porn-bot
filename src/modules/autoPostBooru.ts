import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } from 'discord.js';
import guildSchema from '../models/guildSchema';
import booru from './booru';
import tags from '../data/tags.json';


export = {
    postToPremiumServer: async function(client: any, loopDelay: number) {

        let post: any;
        try {
            post = await booru.search('danbooru', tags[Math.floor(Math.random() * tags.length)], 10);

            if (post === null || post === undefined) {
                this.postToPremiumServer(client, loopDelay);
                return;
            }
        }
        catch (error) {
            console.error(error);
        }


        const embed = new EmbedBuilder()
            .setColor(0x00ff00)
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

        guildSchema.find({ premium: true }, async (err: any, guilds: any) => {
            if (err) throw err;
            guilds.forEach(async (guild: any) => {
                if (guild.autoPostChannel) {

                    // dont post if the guild has the tags blacklisted
                    let blacklisted = false;
                    guild.autoPostBlacklist.forEach((tag: string) => {
                        if (post.tags.includes(tag)) {
                            blacklisted = true;
                        }
                    });
                    if (blacklisted) {
                        this.postToPremiumServer(client, loopDelay);
                        return;
                    }

                    const channel = await client.channels.fetch(guild.autoPostChannel);
                    if (!channel) this.postToPremiumServer(client, loopDelay);

                    try {
                        await channel.send({ embeds: [embed], components: [row] });
                    }
                    catch (_) {
                        console.log('Failed to post to channel');
                    }
                }
            });
        });
        setTimeout(() => {
            this.postToPremiumServer(client, loopDelay);
        }, loopDelay * 1000);
    },
};
