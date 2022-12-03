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
const guildSchema = require("../../models/guildSchema");
module.exports = {
    name: 'autopost',
    description: 'Set a channel to automatically post a random image from a booru',
    execute(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const channelID = interaction.options.getChannel('channel');
            const guildID = interaction.guild.id;
            const guildData = yield guildSchema.findOneAndUpdate({ guildID }, { autoPostChannel: channelID }, { upsert: true, new: true });
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle('Success')
                .setDescription(`Channel set to automatically post a random image from a booru`)
                .setColor(0x00ff00);
            interaction.reply({ embeds: [embed] });
        });
    },
};
