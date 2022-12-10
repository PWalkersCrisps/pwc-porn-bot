import { search, SearchResults } from 'booru';
import filters from '../data/filters.json';
import guildSchema from '../models/guildSchema';

export = {
    searchPosts: async function(site: string, tags: string | string[], limit = 1, random = true, rating: string[] = ['e', 'q']): Promise<void | BooruPost> {
        try {
            search(site, tags, { limit, random })
                .then((posts) => {
                    const filteredPosts = posts.filter((post) => { // Filter out any posts with the specified tags
                        return !filters.some((tag) => post.tags.includes(tag));
                    });

                    if (!filteredPosts) return; // If there are no posts left, return from the function

                    return filteredPosts; // Otherwise, return the filtered posts
                })
                .then((posts) => {

                    if (!posts) {// If there are no posts left, rerun the function

                        this.searchPosts(site, tags, limit, random, rating);
                        return;
                    }

                    const post = posts[0];
                    return post;
                })
                .catch((error) => {
                    // Handle any errors
                    console.error(error);
                });
        }
        catch (error) {
            return console.error(error);
        }
    },
}