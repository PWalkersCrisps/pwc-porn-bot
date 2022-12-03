"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const booru_1 = require("booru");
module.exports = {
    name: "booru",
    description: "Searches for a random image depending on your choices",
    execute(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!interaction.channel.nsfw) {
                const embed = new discord_js_1.EmbedBuilder()
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
                posts = yield (0, booru_1.search)('e621.net', tags);
                post = posts[0];
            }
            catch (error) {
                const embed = new discord_js_1.EmbedBuilder()
                    .setTitle("Error")
                    .setDescription("No results found")
                    .setColor(0xff0000);
                return interaction.reply({ embeds: [embed] });
            }
            const embed = new discord_js_1.EmbedBuilder()
                .setImage(post.fileUrl);
            const row = new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setStyle(discord_js_1.ButtonStyle.Link)
                .setLabel("View Post")
                .setURL(post.postView), new discord_js_1.ButtonBuilder()
                .setStyle(discord_js_1.ButtonStyle.Danger)
                .setLabel("⚠️")
                .setCustomId("delete"));
            interaction.reply('Cock');
            yield interaction.deferReply();
            const filter = (i) => i.customId === "delete";
            const collector = interaction.channel.createMessageCollector(filter, { time: 10000 });
            collector.on("collect", (i) => __awaiter(this, void 0, void 0, function* () {
                if (i.customId === "delete") {
                    yield i.deferUpdate();
                    yield i.message.delete();
                }
            }));
        });
    },
};
