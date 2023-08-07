const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`tmpbutton`)
    .setDescription(`Test Button Command`),
    async execute(interaction, client) {
        const buttons = new ButtonBuilder()
        .setCustomId('test')
        .setLabel(`Error! Click To See.`)
        .setStyle(ButtonStyle.Danger);

      await interaction.reply  ({
        components: [new ActionRowBuilder().addComponents(buttons)]
      }) 
    },
};