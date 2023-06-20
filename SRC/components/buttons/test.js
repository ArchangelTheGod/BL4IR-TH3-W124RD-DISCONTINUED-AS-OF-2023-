module.exports = {
  data: {
    name: `test`,
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `If you see this message, the **"Button"** command works.`,
    });
  },
};
