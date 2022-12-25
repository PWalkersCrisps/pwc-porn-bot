import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ColorResolvable } from 'discord.js';
import guildSchema from '../models/guildSchema';
import tagsList from '../data/tags.json';
import filters from '../data/filters.json';
import { search } from 'booru';

export = {
    autoPost: async function(client: any, loopDelay: number) {
        try {
            console.log('Posting to premium server...');
            // Get random item from tags.json
            const tag: string = tagsList[Math.floor(Math.random() * tagsList.length)];

            // Search for a post using the selected tag
            const posts: any = await this.searchPosts('rule34', tag, 5);

            if (!posts[0] || !posts[0].fileUrl || !posts) {
                // If no post is found, try again in 5 seconds
                delay(5).then(async () => { await this.autoPost(client, loopDelay); });
                return;
            }

            const post = posts[0];

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

            const guilds = await guildSchema.find({ premium: true });

            for (const guild of guilds) {
                const channel = client.channels.cache.get(guild.autoPostChannel);
                if (channel) {
                    channel.send({ embeds: [embed], components: [row] });
                }
            }
        }
        catch (error) {
            // Log any errors that occur
            console.log(error);
        }

        // Set a timeout to run the function again after the specified delay
        delay(loopDelay).then(() => { this.autoPost(client, loopDelay); });
    },
    searchPosts: async function(site: string, tags: string | string[], limit = 1, random = true, rating: string[] = ['e', 'q']) {
        try {
            const rawPosts = await search(site, tags, { limit, random });
            let posts: any;

            if (!rawPosts[0]) {
                return;
            }

            posts = rawPosts.filter((post: any) => rating.includes(post.rating));

            if (!posts[0]) {
                return;
            }

            // Filter out posts that are blacklisted with tags in filters.json
            posts = posts.filter((post: any) => !filters.some((filter: string) => post.tags.includes(filter)));

            return posts;
        }
        catch (error) {
            return console.error(error);
        }
    },
};

// Delay function
const delay = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));