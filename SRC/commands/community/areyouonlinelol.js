const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("areyouonlinelol")
    .setDescription("Checks if the bot is online. Pretty self-explanitory."),
    async execute (interaction) {
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription("✅ Yes.")

        interaction.reply({
            embeds: [embed]
        })
    }
}