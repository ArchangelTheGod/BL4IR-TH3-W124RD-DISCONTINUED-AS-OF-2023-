module.exports = {
    data: {
        name: `quote`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `${interaction.user.tag} says: ***"${interaction.fields.getTextInputValue("quoteInput")}"***`
        });
    }
}