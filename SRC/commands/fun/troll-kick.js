const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kicky")
    .setDescription("Kicks a user")
    .addUserOption(option => option
        .setName("target")
        .setDescription("The user you'd like to kick.")
        .setRequired(true)),
    async execute (interaction) {

        const target = interaction.options.getUser("target")
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`Kicked: ${target}`)

        interaction.reply({
            embeds: [embed]
        })
    }
}