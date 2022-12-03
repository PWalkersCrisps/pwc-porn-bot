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
    name: 'setpremium',
    description: 'Set a server as premium',
    execute(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(interaction.user.id === '426455031571677197')) {
                const embed = new discord_js_1.EmbedBuilder()
                    .setTitle('Error')
                    .setDescription('You are not allowed to use this command')
                    .setColor(0xff0000);
                return interaction.reply({ embeds: [embed] });
            }
            const guildID = interaction.guild.id;
            const guildData = yield guildSchema.findOneAndUpdate({ guildID }, { guildID, premium: true }, { upsert: true, new: true });
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle('Success')
                .setDescription(`Server set as premium`)
                .setColor(0x00ff00);
            interaction.reply({ embeds: [embed] });
        });
    },
};
