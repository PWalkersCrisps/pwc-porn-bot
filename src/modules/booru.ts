import { search, SearchResults } from 'booru';
import filters from '../data/filters.json';
import guildSchema from '../models/guildSchema';
export = {
    search: async function(site: string, tags: string | string[], random = true): Promise<void | BooruPost> {
        try {
            const searchResults: SearchResults = await search(site, tags, { limit: 1, random });
            const post = this.tagFilter(searchResults[0] as BooruPost);

            if (!post) {
                return;
            }

            return post;
        }
        catch (error) {
            return console.error(error);
        }
    },
    tagFilter: function(post: BooruPost): BooruPost | undefined {

        const blacklistedTags: string[] = filters;

        if (!(post)) {
            return;
        }

        // check if post has any blacklisted tags
        let blacklisted = false;
        for (const tag of blacklistedTags) {
            if (post.tags.includes(tag)) {
                blacklisted = true;
            }
        }

        if (blacklisted) {
            return;
        }

        return post;
    },
    guildFilter: async function(guildID: string, post: BooruPost): Promise<BooruPost | undefined> {

        const guild: GuildDocument | null = await guildSchema.findOne({ guildID: guildID });

        if (!guild) {
            return;
        }

        // check if post has any blacklisted tags
        let blacklisted = false;
        for (const tag of guild.tagBlacklist) {
            if (post.tags.includes(tag)) {
                blacklisted = true;
            }
        }
        if (blacklisted) {
            return;
        }

        return post;
    },
    ratingFilter: function(post: BooruPost, rating: string): BooruPost | undefined {

        if (post.rating !== rating) {
            return;
        }

        return post;
    },
}