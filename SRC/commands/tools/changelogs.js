const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("changelogs")
    .setDescription("The current bot's build."),
    async execute (interaction) {
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Update 0.02")
        .setDescription("**Added:** ``calculator, chatgpt, connect4, hangman, memes, rpc, tictactoe, weather, wikipedia, wordle, unban, ban, clear, setAvatar, timeout, areyouonlinelol, changelogs``")
        .addFields({ name: 'Features', value: 'Added Features: ``anti-crash, shutdown, API updates.``', inline: true})
        interaction.reply({
            embeds: [embed]
        })
    }
}