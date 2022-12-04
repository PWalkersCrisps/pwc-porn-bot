import index from '../index'; // Import the client from the index file
import profileSchema from '../models/profileSchema';
import guildSchema from '../models/guildSchema';

module.exports = {
    name: 'interactionCreate',
    async execute(interaction: any) {
        try {
            if (interaction.isCommand()) {
                const command: any = index.client.commands.get(interaction.commandName); // Get the command from the client's commands collection

                if (!command) return; // If the command is not found, return

                // Check and create a profile for the user
                const profileData: ProfileDocument | null = await profileSchema.findOneAndUpdate(
                    {
                        userID: interaction.user.id,
                    },
                    {
                        $inc: {
                            interactionsCreated: 1,
                        },
                    },
                    {
                        upsert: true,
                        new: true,
                    }
                );

                // Check and create a profile for the guild
                const guildData: GuildDocument | null = await guildSchema.findOneAndUpdate(
                    {
                        guildID: interaction.guild.id,
                    },
                    {},
                    {
                        upsert: true,
                        new: true,
                    }
                );

                try {
                    await command.execute(index.client, interaction); // Execute the command
                }
                catch (error) {
                    console.error(error); // If there is an error, log it
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
            else if (interaction.isButton()) {
                try {
                    if (interaction.customId === 'delete') {
                        await interaction.deferUpdate();
                        await interaction.message.delete();
                    }
                }
                catch (error) {
                    console.log(error);
                }

            }
            else {
                return;
            }
        }
        catch (error) {
            console.error(error);
        }
    },
};