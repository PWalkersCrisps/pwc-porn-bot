import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } from 'discord.js';
import { search } from 'booru';
import guildSchema from '../models/guildSchema';
import tags from '../data/tags.json';
import random from './random';

export = {
    postToPremiumServer: async function (client: any, loopDelay: number) {
        guildSchema.find({ premium: true }, async (err: any, guilds: any) => {
            if (err) throw err;
            guilds.forEach(async (guild: any) => {
                const guildData = await guildSchema.findOne({ guildID: guild.guildID });
                if (guildData?.autoPostChannel) {
                    const channel = client.channels.cache.get(guildData.autoPostChannel);
                    const posts = await search('danbooru', tags[random.randomInRange(0, tags.length)], { limit: 1, random: true });
                    const post = posts[0];

                    const embed = new EmbedBuilder()
                        .setImage(post.fileUrl)

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
                        )

                    channel.send({ embeds: [embed], components: [row] });

                    const filter = (i: any) => i.customId === 'delete';
                    const collector = channel.createMessageCollector(filter, { time: 10000 });

                    collector.on('collect', async (i: any) => {
                        if (i.customId === 'delete') {
                            await i.deferUpdate();
                            await i.message.delete();
                        }
                    });

                }
            });
        });
        setTimeout(() => {
            this.postToPremiumServer(client, loopDelay);
        }, loopDelay * 1000);
    },
};
