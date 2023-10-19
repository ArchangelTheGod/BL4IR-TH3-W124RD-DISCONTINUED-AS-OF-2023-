const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const blacklist = require("../../Models/Blacklist");

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
        //Blacklist
        let Data = await blacklist.findOne({
            UserID: interaction.user.id
        }).catch(err => { })

        if (Data) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor("Red")
                .setTitle("Info | Error")
                .setDescription("You cannot use this command, you are blacklisted.")
                .setFooter({ text: "Error Type: User is Blacklisted."})]
        })
        else {
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
        interaction.setCooldown(10000)
        }
    }
}