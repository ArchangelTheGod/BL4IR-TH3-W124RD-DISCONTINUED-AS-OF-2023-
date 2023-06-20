const {
    SlashCommandBuilder,
    SelectMenuBuilder,
    ActionRowBuilder,
    SelectMenuOptionBuilder,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName(`info`)
      .setDescription(`Info About The Bot`),
    async execute(interaction, client) {
      const menu = new SelectMenuBuilder()
        .setCustomId(`info`)
        .setMinValues(1)
        .setMaxValues(1)
        .setOptions(
          new SelectMenuOptionBuilder({
            label: `Build Info`,
            value: `[Build Info] **Version 0.01a**`,
          }),
          new SelectMenuOptionBuilder({
            label: `Bot Info`,
            value: `[Bot Info] BL4IR is a "Troll bot" designed to bring fun to your server(s)!`,
          }),
          new SelectMenuOptionBuilder({
              label: `Dev Info`,
              value: `[Dev Info] Archangel, AKA: AxxlJGR, is my author.`,
          })
        );
  
      await interaction.reply({
        components: [new ActionRowBuilder().addComponents(menu)],
      });
    },
  };
  