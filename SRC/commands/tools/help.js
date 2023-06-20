const {
  SlashCommandBuilder,
  SelectMenuBuilder,
  ActionRowBuilder,
  SelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`help`)
    .setDescription(`Stop it. Get Some Help.`),
  async execute(interaction, client) {
    const menu = new SelectMenuBuilder()
      .setCustomId(`help`)
      .setMinValues(1)
      .setMaxValues(1)
      .setOptions(
        new SelectMenuOptionBuilder({
          label: `Support Server`,
          value: `None Available. :(`,
        }),
        new SelectMenuOptionBuilder({
          label: `Command List`,
          value: `None Available :(`,
        }),
        new SelectMenuOptionBuilder({
          label: `Prefix`,
          value: `"Prefix" I don't have a prefix- I use Slash Commands`,
        }),
        new SelectMenuOptionBuilder({
          label: `Creator Info`,
          value: `"Creator Info" Axxl's Carrd: https://axxljgr.carrd.co/`,
        }),
        new SelectMenuOptionBuilder({
          label: `Github Repository/Soucrecode`,
          value: `"SRC" **"Coming Soon in: 0.03"**`,
        }),
        new SelectMenuOptionBuilder({
          label: `Ideas/Suggestions`,
          value: `"Ideas" **"Coming Soon in: 0.03"**`,
        }),
        new SelectMenuOptionBuilder({
          label: `Upcoming Updates`,
          value: `"SRC Function, Ideas Function, And 'FUN' functions planne for 0.03"`,
        })
      );

    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(menu)],
    });
  },
};
