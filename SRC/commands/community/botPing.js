//Dependencies
const { SlashCommandBuilder } = require('discord.js');

//Exports
module.exports = {
    data: new SlashCommandBuilder()
    .setName(`netping`)
    .setDescription(`Sends A Detailed PING report.`),
    async execute(interaction, client) {

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
    }
}