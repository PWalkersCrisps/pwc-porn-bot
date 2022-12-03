"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-shadow */
const discord_js_1 = require("discord.js"); // Import the Client, Collection, and Intents modules from discord.js
const fs_1 = require("fs"); // Import the readdirSync module from fs
const path_1 = require("path"); // Import the resolve module from path
const mongoose_1 = require("mongoose");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const args = process.argv.slice(2); // node start ./index [production/or anything else]
(0, mongoose_1.connect)(process.env.MONGODB_SRV);
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
    ],
    shards: 'auto',
});
exports.default = { client };
client.commands = new discord_js_1.Collection(); // Create a new Collection for the commands
client.categories = (0, fs_1.readdirSync)((0, path_1.resolve)('./build/commands')); // Makes the sub-directories in ./commands/* into their own categories
['command', 'event'].forEach((handler) => {
    require((0, path_1.resolve)(`./build/handlers/${handler}`))(client); // For each of the two handlers, require the handler file and run it
});
client.login(process.env.BOT_TOKEN); // Discord Client Login
