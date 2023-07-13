const { Client, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('errors')
    .setDescription('View all the HTTP errors that the bot may encounter'),
     
     async execute(interaction) {

        //Error Codes
        const err400 = "400, Bad Request."
        const err401 = "401, Unauthorized."
        const err403 = "403, Forbidden."
        const err404 = "404, Not Found."
        const err408 = "408, Request Timeout."
        const err429 = "429, Too Many Requests."
        const err500 = "500, Internal Server Error."
        const err501 = "501, Not Implemented."
        const err502 = "502, Bad Gateway."
        const err503 = "503, Service Unavailable."
        const err504 = "504, Gateway Timeout"




        //Embeds
        const errembed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Errors and their codes 101")
        .addFields({ name: "400", value: `${err400}`})
        .addFields({ name: "401", value: `${err401}`})
        .addFields({ name: "403", value: `${err403}`})
        .addFields({ name: "404", value: `${err404}`})
        .addFields({ name: "408", value: `${err408}`})
        .addFields({ name: "429", value: `${err429}`})
        .addFields({ name: "500", value: `${err500}`})
        .addFields({ name: "501", value: `${err501}`})
        .addFields({ name: "502", value: `${err502}`})
        .addFields({ name: "503", value: `${err503}`})
        .addFields({ name: "504", value: `${err504}`})
        .setTimestamp()
        .setFooter({ text: "BL4IR's Error System"})

        await interaction.reply({
            embeds: [errembed]
        })
    }
}