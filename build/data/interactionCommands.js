"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = [
    new discord_js_1.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with server latinency'),
    new discord_js_1.SlashCommandBuilder()
        .setName('help')
        .setDescription('Helps you with shit you didnt know'),
    new discord_js_1.SlashCommandBuilder()
        .setName('echo')
        .setDescription('Echo your message')
        .addStringOption(option => option.setName('input').setDescription('Enter a string').setRequired(true)),
    new discord_js_1.SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Check how long has the bot been online.'),
    new discord_js_1.SlashCommandBuilder()
        .setName('booru')
        .setDescription('Search for images on any of the boorus')
        .addStringOption(option => option
        .setName('booru')
        .setDescription('Enter a booru')
        .setRequired(true)
        .addChoices({ name: 'e621', value: 'e621' }, { name: 'e926', value: 'e926' }, { name: 'hypnohub', value: 'hypnohub' }, { name: 'danbooru', value: 'danbooru' }, { name: 'konachan', value: 'konac' }, { name: 'yandere', value: 'yandere' }, { name: 'gelbooru', value: 'gelbooru' }, { name: 'rule34', value: 'rule34' }, { name: 'safebooru', value: 'safebooru' }, { name: 'tbib', value: 'tbib' }, { name: 'xbooru', value: 'xbooru' }, { name: 'paheal', value: 'paheal' }, { name: 'derpibooru', value: 'derpibooru' }, { name: 'realbooru', value: 'realbooru' }))
        .addStringOption(option => option
        .setName('tags')
        .setDescription('Enter tags')
        .setRequired(true)),
];
