const { Client, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const accountSchema = require("../../Models/Account");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("pay")
    .setDescription("Pay a user some money.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addUserOption(option => option
        .setName("user")
        .setDescription("The user you want to pay money to.")
        .setRequired(true)
        )
    .addNumberOption(option => option
        .setName("amount")
        .setDescription("The amount that the user should get.")
        .setRequired(true)
        ),

    async execute(interaction, client) {
        const { user, options, guild } = interaction;

        const Member = options.getUser("user")
        let amount = options.getNumber("amount")
        const sender = user;

        let data = await accountSchema.findOne({
            Guild: interaction.guild.id,
            User: Member.id,
        }).catch(err => { })
        if (!data) return interaction.reply({
            content: "❌ Please create an account.",
            ephemeral: true
        })
        
        let Data = await accountSchema.findOne({
            Guild: interaction.guild.id,
            User: Member.id,
        }).catch(err => { })
        if (!Data) return interaction.reply({
            content: "❌ The user has no money. 🤪",
            ephemeral: true
        })

        const Sender = await accountSchema.findOne({
            Guild: interaction.guild.id,
            User: Member.id
        })

        const MoneyReceiver = await accountSchema.findOne({
            Guild: interaction.guild.id,
            User: Member.id
        })

        if (Sender.Wallet < amount) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor("Red")
                    .setTitle("Error!")
                    .setDescription(`❌ You don't have enough money. LOL \nYou Have: ${Sender.Wallet} \nAmount: ${amount}`)
                ], ephemeral: true
            })
        }
        
        if (sender === Member) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor("Red")
                    .setTitle("Error!")
                    .setDescription("❌ Sorry, the infinite money glitch doesn't exist.\n You can't send money to yourself. LOL")
                ], ephemeral: true
            })
        }

        const dataSend = await accountSchema.findOne({
            Guild: interaction.guild.id,
            User: sender.id
        })
        dataSend.Wallet -= amount
        dataSend.save()

        const dataReceived = await accountSchema.findOne({
            Guild: interaction.guild.id,
            User: Member.id
        })
        dataSend.Wallet += amount
        dataSend.save()

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("Green")
                .setTitle("Confirmed")
                .setDescription(`✅ You've sent $${amount} to ${Member}.`)
            ],
        })
    }
}