import guildSchema = require('../models/guildSchema')

module.exports = {
    name: 'guildCreate',
    async execute(guild: any) {
        const guildID = guild.id;

        const guildData: GuildDocument | null = await guildSchema.findOneAndUpdate(
            {
                guildID: guildID,
            },
            {},
            {
                upsert: true,
                new: true,
            }
        );
    },
};
