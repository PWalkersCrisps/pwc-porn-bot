import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ColorResolvable } from 'discord.js';
import guildSchema from '../models/guildSchema';
import booru from './booru';
import tags from '../data/tags.json';
import random from './random';

export = {
    postToPremiumServer: async function(client: any, loopDelay: number) {
        try {
            // Select a random tag from the tags array
            const tag = tags[random.randomIntInRange(0, tags.length - 1)];

            // Search for a post using the selected tag
            const post: BooruPost | void = await booru.searchPosts('danbooru', tag);

            if (!post) {
                // If no post is found, try again in 5 seconds
                delay(5).then(() => { this.postToPremiumServer(client, loopDelay); });
                return;
            }

            const content = await messageContent(post);
            const embed = content.embed;
            const row = content.row;

            const guilds: GuildDocument[] = await guildSchema.find({ premium: true }); // Get the list of premium guilds from the database

            // Remove all guilds that don't have an autoPostChannel property or dont exist in the client
            guilds.filter((guild: GuildDocument) => {
                return guild.autoPostChannel && client.guilds.cache.has(guild.guildId);
            });

            console.log(`Posting to ${guilds.length} servers...`);

            // Iterate over the list of premium guilds
            guilds.forEach(async (guild: GuildDocument) => {
                // Fetch the channel specified in the guild's autoPostChannel property
                const channel = await client.channels.fetch(guild.autoPostChannel);
                channel.send({ embeds: [embed], components: [row] });
            });
        }
        catch (error) {
            // Log any errors that occur
            console.log(error);
        }

        // Set a timeout to run the function again after the specified delay
        delay(loopDelay).then(() => { this.postToPremiumServer(client, loopDelay); });
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

// Delay function
const delay = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));