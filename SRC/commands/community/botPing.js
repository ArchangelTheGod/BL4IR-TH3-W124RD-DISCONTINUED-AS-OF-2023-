//Dependencies
const { SlashCommandBuilder } = require('discord.js');
const blacklist = require("../../Models/Blacklist");

//Exports
module.exports = {
    data: new SlashCommandBuilder()
    .setName(`netping`)
    .setDescription(`Sends A Detailed PING report.`),
    async execute(interaction, client) {
        //Blacklist
        let Data = await blacklist.findOne({
            UserID: interaction.user.id
        }).catch(err => { })

        if (Data) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor("Red")
                .setTitle("Info | Error")
                .setDescription("You cannot use this command, you are blacklisted.")
                .setFooter({ text: "Error Type: User is Blacklisted."})]
        })
        else {
        //Defer Reply
        const message = await interaction.deferReply({
            fetchReply: true
        });

        //Fetch API+Client Latency
        const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}`

        //Send Reply
        await interaction.editReply({
            content: newMessage
        });
        interaction.setCooldown(5000)
        }
    }
}