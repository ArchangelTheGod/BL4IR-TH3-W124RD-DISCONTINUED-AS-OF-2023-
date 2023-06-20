const { Client, SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const accountSchema = require("../../Models/Account");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("deposit")
    .setDescription("Deposits money into your bank account.")
    .addStringOption(option => 
        option.setName("amount")
        .setDescription("Enter your deposit amount.")
        .setRequired(true)
        ),

        async execute(interaction) {
            const { options, user, guild } = interaction;

            const Amount = options.getString("amount")

            let Data = await accountSchema.findOne({
                Guild: interaction.guild.id,
                User: user.id,
                UserName: interaction.user.username
            }).catch(err => { })
            if (!Data) return interaction.reply({
                content: "❌ Please create an account first."
            })

            if (Amount.toLowerCase() === "all") {
                if (Data.Wallet === 0) return interaction.reply({
                    content: "❌ You don't have any money to deposit into your bank account. #Imaginebeingpoor"})

                    Data.Bank += Data.Wallet
                    Data.Wallet = 0

                    await Data.save()

                    return interaction.reply({
                        content: "✅ All your money has been deposited"})
            } else {
                const Converted = Number(Amount)

                if (isNaN(Converted) === true) return interaction.reply({
                    content: `❌ The amount can only be a number or \`All\``
                })
                if (Data.Wallet < parseInt(Converted) || Converted === Infinity) return interaction.reply({
                    content: "❌ You don't have any money to deposit into your bank account. #Imaginebeingbroke"
                })

                Data.Bank += parseInt(Converted)
                Data.Wallet -= parseInt(Converted)
                Data.Wallet = Math.abs(Data.Bank)

                await Data.save()

                const embed = new EmbedBuilder()
                .setColor("Gold")
                .setTitle("INFO")
                .setDescription(`:moneybag: $${parseInt(Converted)} has been deposited into your wallet.`)

                return interaction.reply({
                    embeds: [embed]
                })
            }
        }
}