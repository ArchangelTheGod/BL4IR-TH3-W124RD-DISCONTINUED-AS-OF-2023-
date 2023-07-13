const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rate')
    .setDescription('Rate something/someone!')
    .addStringOption(option => option
        .setName("to-rate")
        .setDescription("The person/place/thing you'd like me to rate")
        .setRequired(true)),
     
     async execute(interaction) {
        const ratenum = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
        const raterand = Math.floor(Math.random() * ratenum.length)
        const inputrate = interaction.options.getString("to-rate")

        await interaction.reply({
            embeds: [new EmbedBuilder()
            .setColor("Blue")
            .addFields({ name: `My Rating of ${inputrate}:`, value: `${ratenum[raterand]}/10`})]
        })
    }
}