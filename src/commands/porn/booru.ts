import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { search } from "booru";

module.exports = {
    name: "booru",
    description: "Searches for a random image depending on your choices",
    async execute(client: any, interaction: any) {
        if (!interaction.channel.nsfw) {
            const embed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("This command can only be used in NSFW channels")
                .setColor(0xff0000);

            return interaction.reply({ embeds: [embed] });
        }

        const site = interaction.options.getString("booru");
        const tags = interaction.options.getString("tags");

        let posts;
        let post;

        try {
            posts = await search('e621.net', tags);
            post = posts[0];      
        } 
        catch (error) {
            const embed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("No results found")
                .setColor(0xff0000);

            return interaction.reply({ embeds: [embed] });
        }

        
        const embed = new EmbedBuilder()
            .setImage(post.fileUrl);

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel("View Post")
                    .setURL(post.postView),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Danger)
                    .setLabel("⚠️")
                    .setCustomId("delete")
            );
        

        interaction.reply('Cock');

        const filter = (i: any) => i.customId === "delete";
        const collector = interaction.channel.createMessageCollector(filter, { time: 10000 });

        collector.on("collect", async (i: any) => {
            if (i.customId === "delete") {
                await i.deferUpdate();
                await i.message.delete();
            }
        });
        
    },
};