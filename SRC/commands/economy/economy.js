const { Client, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const accountSchema = require("../../Models/Account");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("economy")
    .setDescription("Create, Delete, or check you economy account/balance")
    .addStringOption(option => 
        option.setName("options")
        .setDescription("Choose Da Wae.")
        .setRequired(true)
        .addChoices(
            { name: "Create", value: "create"},
            { name: "Delete", value: "delete"},
            { name: "Balance", value: "balance"}
        )
        ),

        async execute (interaction) {
            const { options, user, guild } = interaction;

            let Data = await accountSchema.findOne(
                { Guild: interaction.guild.id, User: user.id}
                ).catch(err => { })

            switch(options.getString("options")) {
                case "create": {
                    if(Data) return interaction.reply({
                        content: "❌ You **already have** an account",
                        ephemeral: true
                    })

                    Data = new accountSchema({
                        Guild: interaction.guild.id,
                        User: user.id,
                        UserName: interaction.user.username,
                        Bank: 3500,
                        Wallet: 100
                    })

                    await Data.save()

                    interaction.reply({
                        content: `✅\n Your account has been **created!** You've got **$${Data.Wallet}** in your wallet\n and **$${Data.Bank}** in your bank.`
                    })
                }
                break;
                case "balance": {
                    if (!Data) return interaction.reply({
                        content: "❌ Please create an account first.",
                        ephemeral: true
                    })

                    const embed = new EmbedBuilder()
                    .setColor("Green")
                    .setTitle(`${interaction.user.tag}'s Account Balance`)
                    .setDescription(`**Bank:** :coin: $${Data.Bank}\n **Wallet:** :dollar: $${Data.Wallet}\n **Total:** :moneybag: $${Data.Bank + Data.Wallet}`)

                    await interaction.reply({
                        embeds: [embed]
                    })
                }
                break;
                case "delete": {
                    if (!Data) return interaction.reply({
                        content: "❌ Please **create** an account first"
                    })
                    
                    await Data.deleteOne()

                    interaction.reply({
                        content: "✅ Your account on this server has been **Deleted.**"
                    })
                }
                break;
            }
        }
}