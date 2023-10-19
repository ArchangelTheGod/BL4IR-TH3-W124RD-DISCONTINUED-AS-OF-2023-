const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const blacklist = require("../../Models/Blacklist");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban-hammer")
    .setDescription("Bans a user")
    .addUserOption(option => option
        .setName("target")
        .setDescription("The user you'd like to ban.")
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
        const target = interaction.options.getUser("target")
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`Banned: ${target}`)

        interaction.reply({
            embeds: [embed]
        })
        interaction.setCooldown(40000)
        }
    }
}