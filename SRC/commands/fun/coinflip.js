const { SlashCommandBuilder} =  require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Flip a coin!"),
    async execute(interaction) {
        const num = Math.random() * 2

        if(num > 1)
        return interaction.reply('🪙 Heads!')
        else return interaction.reply('🪙 Tails!')
    }
}