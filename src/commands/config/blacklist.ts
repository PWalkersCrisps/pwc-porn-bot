import guildSchema from '../../models/guildSchema';

module.exports = {
    name: 'blacklist',
    description: 'Blacklist a tag',
    async execute(client: any, interaction: any) {
        const tag = interaction.options.getString('tag');
        const subcommand = interaction.options.getSubcommand();

        let result: any;
        let blacklist;

        switch (subcommand) {
            case 'add':
                await updateGuildDocument(interaction.guild.id, {
                    $push: {
                        blacklist: tag,
                    },
                });

                interaction.reply(`Added \`${tag}\` to the blacklist`);
                break;
            case 'remove':
                await updateGuildDocument(interaction.guild.id, {
                    $pull: {
                        blacklist: tag,
                    },
                });

                interaction.reply(`Removed \`${tag}\` from the blacklist`);
                break;
            case 'list':
                result = await guildSchema.findOne({
                    guildId: interaction.guild.id,
                });

                blacklist = result?.blacklist.join(', ') || 'None';

                interaction.reply(`Blacklist: \`${blacklist}\``);
                break;
            case 'clear':
                await updateGuildDocument(interaction.guild.id, {
                    $set: {
                        blacklist: [],
                    },
                });

                interaction.reply('Cleared the blacklist');
                break;

        }
    },
};

async function updateGuildDocument(guildID: string, update: any) {
    return await guildSchema.findOneAndUpdate(
        {
            guildID: guildID,
        },
        update,
        {
            upsert: true,
            new: true,
        }
    );

}