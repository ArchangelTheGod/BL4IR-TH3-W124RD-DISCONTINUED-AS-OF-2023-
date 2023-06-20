module.exports = {
    data: {
      name: `info`,
    },
    async execute(interaction, client) {
      await interaction.reply({
        content: `\`\`Your Selection:\`\` ${interaction.values[0]}`,
      });
    },
  };
  