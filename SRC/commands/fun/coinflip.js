//Dependencies
const { SlashCommandBuilder} =  require('discord.js');

//Exports
module.exports = {
    data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Flip a coin!"),
    async execute(interaction) {

        //Randomizer
        const num = Math.random() * 2

        //Integer Value Checker
        if(num > 1)
        //Send Reply+Status
        return interaction.reply('🪙 Heads!')
        else return interaction.reply('🪙 Tails!')
    }
}