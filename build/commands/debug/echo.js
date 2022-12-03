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
module.exports = {
    name: 'echo',
    description: 'Echo your message',
    execute(client, interaction, profileData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(interaction.user.id === '426455031571677197'))
                return interaction.reply({ content: `<@${interaction.user.id}> actually have permissions to use the command next time`, ephemeral: true });
            const string = interaction.options.getString('input');
            yield interaction.reply({ content: 'Message sent to the idiots', ephemeral: true });
            yield interaction.channel.send(`${string}`);
        });
    },
};
