/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-shadow */
import { Client, Collection, GatewayIntentBits } from 'discord.js'; // Import the Client, Collection, and Intents modules from discord.js
import { readdirSync } from 'fs'; // Import the readdirSync module from fs
import { resolve } from 'path'; // Import the resolve module from path
import { connect } from 'mongoose';


import * as dotenv from 'dotenv';
dotenv.config();

declare module 'discord.js' {
    export interface Client {
        commands: Collection<unknown, any>,
        categories: string[],
        data: any[]
    }
}

connect(process.env.MONGODB_SRV as string);

const client = new Client({ // Create a new Discord client
    intents: [
        GatewayIntentBits.Guilds,
    ],
    shards: 'auto',
});

export default { client };

client.commands = new Collection<string, any>(); // Create a new Collection for the commands
client.categories = readdirSync(resolve('./build/commands')); // Makes the sub-directories in ./commands/* into their own categories
['command', 'event'].forEach((handler) => {
    require(resolve(`./build/handlers/${handler}`))(client); // For each of the two handlers, require the handler file and run it
});

client.login(process.env.BOT_TOKEN); // Discord Client Login