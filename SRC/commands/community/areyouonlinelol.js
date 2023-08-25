//Dependencies
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

//Exports
module.exports = {
    data: new SlashCommandBuilder()
    .setName("areyouonlinelol")
    .setDescription("Checks if the bot is online. Pretty self-explanitory."),
    async execute (interaction) {
        //Interaction

        //Online Embed
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription("✅ Yes.")

        //Send Online Embed
        interaction.reply({
            embeds: [embed]
        })
    }
}