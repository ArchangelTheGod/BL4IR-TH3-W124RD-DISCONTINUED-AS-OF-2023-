module.exports = {
    data: {
      name: `help`,
    },
    async execute(interaction, client) {
      await interaction.reply({
        content: `You Selected: ${interaction.values[0]}`,
      });
    },
  };
  