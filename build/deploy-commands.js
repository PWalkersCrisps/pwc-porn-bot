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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const config_json_1 = require("./data/config.json"); // Import the client ID and guild ID from the config file
const fs_1 = require("fs"); // Import the file system module
const index_1 = __importDefault(require("./index")); // Import the client from the index file
const commands = index_1.default.client.data;
const dotenv = __importStar(require("dotenv"));
dotenv.config(); // Loads the .env file
const args = process.argv.slice(2);
const commandFiles = (0, fs_1.readdirSync)('./commands').filter(file => file.endsWith('')); // Get all files in commands folder
for (const file of commandFiles) { // Loop through all files in the commands folder
    const command = require(`./commands/${file}`); // Current file
    commands.push(command.data.toJSON()); // Add the command to the commands array
}
const rest = new rest_1.REST({ version: '9' }).setToken(process.env.BOT_TOKEN); // Set's rest client to use the bot's token
rest.put(v9_1.Routes.applicationGuildCommands(config_json_1.clientID, config_json_1.testingGuildID), { body: commands }) // Push the commands to the guild
    .then(() => console.log('Successfully registered application commands.')) // Log success
    .catch(console.error); // Log error
