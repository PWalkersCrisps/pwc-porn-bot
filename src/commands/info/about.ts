import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export = {
    name: 'about',
    description: 'About the bot',
    async execute(interaction: any) {
        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle('About the bot')
            .addFields(
                { name: 'How do I use this bot?', value: 'You can use `/help` to get a list of commands.' },
                { name: 'Auto posting', value: 'You can use `/autopost` to toggle auto posting to a channel. However, the server requires \'premium\' status, you can request PWalkersCrisps#6969 for it.' },
                { name: 'Why do i need premium?', value: 'This is because looping through all of the servers that the bot is connected to can be very expensive in terms of computing power.' },
                { name: 'How much is premium?', value: 'Premium is free, but you need to request it from PWalkersCrisps#6969.' },
                { name: 'Why did you make this?', value: 'I honestly dont know...' },
                { name: 'There are literally porn websites, whats the point of this bot?', value: 'Yes, its true that there isnt really any point in this bot, but I made it for fun I guess.' },
                { name: 'How do I invite the bot to my server?', value: 'You can use `/invite` to get an invite link.' },
                { name: 'How do I report a bug?', value: 'You can report a bug by sending a DM to PWalkersCrisps#6969 or you can join https://discord.gg/dgGdUBUAGG' },
            )
            .setColor(0x00ff00);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Discord Server')
                    .setURL('https://discord.gg/dgGdUBUAGG'),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Invite')
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=988495890077589544&permissions=2147534848&scope=bot%20applications.commands'),
            );


        await interaction.reply({ embeds: [embed], components: [row] });
    },
};

