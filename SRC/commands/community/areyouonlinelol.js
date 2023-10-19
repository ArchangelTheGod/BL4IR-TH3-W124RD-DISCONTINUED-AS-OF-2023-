//Dependencies
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const blacklist = require("../../Models/Blacklist");

//Exports
module.exports = {
    data: new SlashCommandBuilder()
    .setName("areyouonlinelol")
    .setDescription("Checks if the bot is online. Pretty self-explanitory."),
    async execute (interaction) {
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
        //Interaction

        //Online Embed
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription("✅ Yes.")

        //Send Online Embed
        interaction.reply({
            embeds: [embed]
        })
        interaction.setCooldown(10000)
        }
       
    }
}