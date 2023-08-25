const {
    SlashCommandBuilder,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName(`quote`)
      .setDescription(`Quotes whatever you want!`),
    async execute(interaction, client) {
      const modal = new ModalBuilder()
        .setCustomId(`quote`)
        .setTitle(`Your Quote!`);
  
      const textInput = new TextInputBuilder()
        .setCustomId(`quoteInput`)
        .setLabel(`What do you want BL4IR to quote?`)
        .setRequired(true)
        .setStyle(TextInputStyle.Short);
  
      modal.addComponents(new ActionRowBuilder().addComponents(textInput));
  
      await interaction.showModal(modal);
    },
  };
  