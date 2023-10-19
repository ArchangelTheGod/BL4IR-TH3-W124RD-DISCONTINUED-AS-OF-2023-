//Dependencies
const { SlashCommandBuilder} =  require('discord.js');
const blacklist = require("../../Models/Blacklist");

//Exports
module.exports = {
    data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Flip a coin!"),
    async execute(interaction) {
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
        //Randomizer
        const num = Math.random() * 2

        interaction.setCooldown(5000)
        //Integer Value Checker
        if(num > 1)
        //Send Reply+Status
        return interaction.reply(':coin: Heads! :skull')
        else return interaction.reply(':coin: Tails! :beaver:')
        }
        
    }
}