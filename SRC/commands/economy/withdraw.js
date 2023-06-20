const { Client, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const accountSchema = require("../../Models/Account");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("withdraw")
    .setDescription("Withdraws money from your bank account.")
    .addStringOption(option => 
        option.setName("amount")
        .setDescription("Enter your withdraw amount.")
        .setRequired(true)
        ),

        async execute(interaction) {
            const { options, user, guild } = interaction;

            const Amount = options.getString("amount")

            let Data = await accountSchema.findOne({
                Guild: interaction.guild.id,
                User: user.id
            }).catch(err => { })
            if (!Data) return interaction.reply({
                content: "❌ Please create an account first."
            })

            if (Amount.toLowerCase() === "all") {
                if (Data.Bank === 0) return interaction.reply({
                    content: "❌ You don't have any money to withdraw into your wallet. #Imaginebeingpoor"})

                    Data.Wallet += Data.Bank
                    Data.Bank = 0

                    await Data.save()

                    return interaction.reply({
                        content: "✅ All your money has been withdrawn"})
            } else {
                const Converted = Number(Amount)

                if (isNaN(Converted) === true) return interaction.reply({
                    content: `❌ The amount can only be a number or \`All\``
                })
                if (Data.Bank < parseInt(Converted) || Converted === Infinity) return interaction.reply({
                    content: "❌ You don't have any money to withdraw into your wallet. #Imaginebeingbroke"
                })

                Data.Wallet += parseInt(Converted)
                Data.Bank -= parseInt(Converted)
                Data.Bank = Math.abs(Data.Bank)

                await Data.save()

                const embed = new EmbedBuilder()
                .setColor("Gold")
                .setTitle("INFO")
                .setDescription(`:moneybag: $${parseInt(Converted)} has been withdrawn into your wallet.`)

                return interaction.reply({
                    embeds: [embed]
                })
            }
        }
}