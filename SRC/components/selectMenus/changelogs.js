module.exports = {
    data: {
      name: `changelogs`,
    },
    async execute(interaction, client) {
      await interaction.reply({
        content: `Your Selection Is: ${interaction.values[0]}`,
      });
    },
  };
  