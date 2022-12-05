import guildSchema from '../models/guildSchema';
import profileSchema from '../models/profileSchema';

export = {
    createGuildDocument: async function(guildID: string): Promise<GuildDocument> {
        const guild: GuildDocument = await guildSchema.findOneAndUpdate(
            {
                guildID: guildID,
            },
            {},
            {
                upsert: true,
                new: true,
            }
        );
        return guild;
    },
    createProfileDocument: async function(userID: string): Promise<ProfileDocument> {
        const profile: ProfileDocument = await profileSchema.findOneAndUpdate(
            {
                userID: userID,
            },
            {},
            {
                upsert: true,
                new: true,
            }
        );
        return profile;
    },
};
