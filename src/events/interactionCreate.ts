import index from '../index'; // Import the client from the index file

module.exports = {
    name: 'interactionCreate',
    async execute(interaction: any) {
        try {
            if (!interaction.isCommand()) return; // If the interaction is not a command, return

            const command = index.client.commands.get(interaction.commandName); // Get the command from the client's commands collection

            if (!command) return; // If the command is not found, return

            try {
                await command.execute(index.client, interaction); // Execute the command
            }
            catch (error) {
                console.error(error); // If there is an error, log it
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
        catch (error) {
            console.error(error);
        }
    },
};