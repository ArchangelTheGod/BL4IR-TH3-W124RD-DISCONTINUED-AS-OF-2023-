const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("hack")
    .setDescription("Hack a user!")
    .addUserOption(option => option
        .setName("user")
        .setDescription("The target you want to hack.")
        .setRequired(true)),
    async execute (interaction) {

        const target = interaction.options.getUser("user")
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`Hacked ${target}`)

        const priv = interaction.options.getUser("user")
        const privdm = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`You were hacked by: ${interaction.user.tag}`)

        interaction.reply({
            embeds: [embed]
        })
    }
}