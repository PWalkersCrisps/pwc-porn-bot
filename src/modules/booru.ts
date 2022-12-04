import { search } from 'booru';
import filters from '../data/filters.json';
export = {
    search: async function(site: string, tags: string | string[], limit = 1, random = true) {
        let posts;
        try {
            posts = await Promise.race([
                await search(site, tags, { limit, random }),
                new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 10000)),
            ]);
        }
        catch (error) {
            this.shutTheFuckUpErrors(error);
            return;
        }

        try {
            return this.filter(posts);
        }
        catch (error) {
            console.error(error);
            return;
        }
    },
    filter: async function(rawPost: any | Array<any>) {

        const allowedPosts: Array<any> = [];
        const blacklistedTags = filters;

        if (rawPost === undefined) return null;
        if (rawPost === null) return null;
        if (rawPost.length === 0) return null;

        try {
            await rawPost.forEach((post: any) => {
                let blacklisted = false;
                blacklistedTags.forEach((tag: string) => {
                    if (post.tags.includes(tag)) {
                        blacklisted = true;
                    }
                });
                if (!blacklisted) {
                    allowedPosts.push(post);
                }
            });
        }
        catch (error) {
            console.error(error);
            return null;
        }

        if (allowedPosts.length === 0) {
            return null;
        }
        else {
            return allowedPosts[0];
        }
    },

    shutTheFuckUpErrors: async function(error: string) {
        const ignoreError = [
            'BooruError: Received HTTP 500 from booru: \'ActiveRecord::QueryCanceled\'',
        ];

        if (ignoreError.includes(error)) {
            return;
        }
        else {
            console.error(error);
        }
    },


}