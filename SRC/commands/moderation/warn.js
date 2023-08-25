const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn a user!")
    .addUserOption(option => option
        .setName("user")
        .setDescription("The target you want to warn")
        .setRequired(true))
    .addStringOption(option => option
        .setName("reason")
        .setDescription("Reason why you'd like to warn that user.")
        .setRequired(true)),
    async execute (interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild))
        return interaction.reply({
            embeds: [new EmbedBuilder()
            .setColor("Red")
            .setDescription("❌| You don't have permission to execute this command.")],
            ephemeral: true
        })
        else {

            const target = interaction.options.getUser("user")
            const reason = interaction.options.getString("reason")

            if (reason == ' ') return{
                reason: "None provided."
            }

            const privdm = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`${target}, you have been warned by: **${interaction.user}** \nReason: **${reason}**`)
    
            await interaction.reply({
                content: `${target}`,
                embeds: [privdm]
            })

            await interaction.followUp({
                embeds: [new EmbedBuilder()
                    .setColor("Yellow")
                    .setTitle("Info")
                    .setDescription(`${target} has been warned.`)],
                ephemeral: true
            })
        }
    }
}