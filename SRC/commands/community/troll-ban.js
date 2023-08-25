const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban-hammer")
    .setDescription("Bans a user")
    .addUserOption(option => option
        .setName("target")
        .setDescription("The user you'd like to ban.")
        .setRequired(true)),
    async execute (interaction) {

        const target = interaction.options.getUser("target")
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`Banned: ${target}`)

        interaction.reply({
            embeds: [embed]
        })
    }
}