/* eslint-disable @typescript-eslint/no-var-requires */
import { clientID, testingGuildID } from '../data/config.json';
import { REST, Routes } from 'discord.js';

import autoPostBooru from '../modules/autoPostBooru';

import commands = require('../data/interactionCommands');
import globalVariables from '../modules/globalVariables';
import * as dotenv from 'dotenv';
dotenv.config();

module.exports = {
    name: 'ready',
    once: true,
    async execute(client: any) {
        try {
            const readyMessage = `${ globalVariables.currentDate } ${ client.user.tag } is online, hopefully it works`;

            console.log(readyMessage);

            const rest = new REST({
                version: '9',
            }).setToken(process.env.BOT_TOKEN as string);

            console.log(`${ globalVariables.currentDate } Started refreshing application (/) commands.`);

            await rest.put(
                Routes.applicationGuildCommands(clientID, testingGuildID),
                { body: commands },
            );

            console.log(`${ globalVariables.currentDate } Successfully reloaded application (/) commands.`);

            autoPostBooru.postToPremiumServer(client, 15);
        }
        catch (error) {
            console.error(`${globalVariables.currentDate} ready error: ${error}`);
        }
    },
};