import { search, SearchResults } from 'booru';
import filters from '../data/filters.json';
import guildSchema from '../models/guildSchema';
export = {
    search: async function(site: string, tags: string | string[], random = true): Promise<void | BooruPost> {
        try {
            const searchResults: SearchResults = await search(site, tags, { limit: 1, random });
            const post = this.tagFilter(searchResults[0] as BooruPost, { site, tags, random });

            if (!post) {
                return this.search(site, tags, random);
            }

            return post;
        }
        catch (error) {
            return console.error(error);
        }
    },
    tagFilter: function(post: BooruPost, postOptions: { site: string, tags: string | string[], random: boolean }): BooruPost | undefined {

        const blacklistedTags: string[] = filters;

        if (!(post)) {
            this.search(postOptions.site, postOptions.tags, postOptions.random);
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
            this.search(postOptions.site, postOptions.tags, postOptions.random);
            return;
        }

        return post;
    },
    guildFilter: async function(guildID: string, post: BooruPost, postOptions: { site: string, tags: string | string[], random: boolean }): Promise<BooruPost | undefined> {

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
            this.search(postOptions.site, postOptions.tags, postOptions.random);
            return;
        }

        return post;
    },
    ratingFilter: function(post: BooruPost, rating: string, postOptions: { site: string, tags: string | string[], random: boolean }): BooruPost | undefined {

        if (post.rating !== rating) {
            this.search(postOptions.site, postOptions.tags, postOptions.random);
            return;
        }

        return post;
    },
}