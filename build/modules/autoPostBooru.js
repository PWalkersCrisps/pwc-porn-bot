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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = require("discord.js");
const booru_1 = require("booru");
const guildSchema_1 = __importDefault(require("../models/guildSchema"));
const tags_json_1 = __importDefault(require("../data/tags.json"));
const random_1 = __importDefault(require("./random"));
module.exports = {
    postToPremiumServer: function (client, loopDelay) {
        return __awaiter(this, void 0, void 0, function* () {
            guildSchema_1.default.find({ premium: true }, (err, guilds) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    throw err;
                guilds.forEach((guild) => __awaiter(this, void 0, void 0, function* () {
                    const guildData = yield guildSchema_1.default.findOne({ guildID: guild.guildID });
                    if (guildData === null || guildData === void 0 ? void 0 : guildData.autoPostChannel) {
                        const channel = client.channels.cache.get(guildData.autoPostChannel);
                        const posts = yield (0, booru_1.search)('danbooru', tags_json_1.default[random_1.default.randomInRange(0, tags_json_1.default.length)], { limit: 1, random: true });
                        const post = posts[0];
                        const embed = new discord_js_1.EmbedBuilder()
                            .setImage(post.fileUrl);
                        const row = new discord_js_1.ActionRowBuilder()
                            .addComponents(new discord_js_1.ButtonBuilder()
                            .setStyle(discord_js_1.ButtonStyle.Link)
                            .setLabel('View Post')
                            .setURL(post.postView), new discord_js_1.ButtonBuilder()
                            .setStyle(discord_js_1.ButtonStyle.Danger)
                            .setLabel('⚠️')
                            .setCustomId('delete'));
                        channel.send({ embeds: [embed], components: [row] });
                        const filter = (i) => i.customId === 'delete';
                        const collector = channel.createMessageCollector(filter, { time: 10000 });
                        collector.on('collect', (i) => __awaiter(this, void 0, void 0, function* () {
                            if (i.customId === 'delete') {
                                yield i.deferUpdate();
                                yield i.message.delete();
                            }
                        }));
                    }
                }));
            }));
            setTimeout(() => {
                this.postToPremiumServer(client, loopDelay);
            }, loopDelay * 1000);
        });
    },
};
