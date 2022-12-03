import guildSchema = require("../models/guildSchema")

module.exports = {
    name: 'guildCreate',
    async execute(guild: any) {
        const guildID = guild.id;

        let guildData = await guildSchema.findOne({ guildID: guildID });
        if (guildData) return;
        await guildSchema.create({ guildID }, { upsert: true});

    },
};
