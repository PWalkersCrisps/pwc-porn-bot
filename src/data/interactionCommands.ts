import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

module.exports = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with server latinency'),

    new SlashCommandBuilder()
        .setName('help')
        .setDescription('Helps you with shit you didnt know'),

    new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Echo your message')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addStringOption(option =>
            option
                .setName('input')
                .setDescription('Enter a string')
                .setRequired(true)),

    new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Check how long has the bot been online.'),

    new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Invite the bot to your server'),

    new SlashCommandBuilder()
        .setName('about')
        .setDescription('About the bot'),

    new SlashCommandBuilder()
        .setName('autopost')
        .setDescription('Toggle auto posting to a channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .setDMPermission(false)
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('Enter a channel')
                .setRequired(true)),

    new SlashCommandBuilder()
        .setName('setpremium')
        .setDescription('Set a server as premium')
        .setDMPermission(false),

    new SlashCommandBuilder()
        .setName('booru')
        .setDescription('Search for images on any of the boorus')
        .addStringOption(option =>
            option.setName('booruchoice')
                .setDescription('Enter a booru')
                .setRequired(true)
                .addChoices(
                    { name: 'e621', value: 'e621.net' },
                    { name: 'e926', value: 'e926.net' },
                    { name: 'konachan', value: 'konachan.com' },
                    { name: 'yandere', value: 'yande.re' },
                    { name: 'gelbooru', value: 'gelbooru.com' },
                    { name: 'rule34', value: 'rule34.xxx' },
                    { name: 'safebooru', value: 'safebooru.org' },
                    { name: 'tbib', value: 'tbib.org' },
                    { name: 'xbooru', value: 'xbooru.com' },
                    { name: 'derpibooru', value: 'derpibooru.org' },
                    { name: 'realbooru', value: 'realbooru.com' },
                ))
        .addStringOption(option =>
            option.setName('tags')
                .setDescription('Enter tags')
                .setRequired(true)),

    new SlashCommandBuilder()
        .setName('blacklist')
        .setDescription('Blacklist a tag from this guild')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .setDMPermission(false)
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a tag to the blacklist')
                .addStringOption(option =>
                    option
                        .setName('tag')
                        .setDescription('Enter a tag')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove a tag from the blacklist')
                .addStringOption(option =>
                    option
                        .setName('tag')
                        .setDescription('Enter a tag')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('List all the tags in the blacklist'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('Clear the blacklist')),
];