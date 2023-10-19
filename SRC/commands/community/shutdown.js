const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const blacklist = require("../../Models/Blacklist");

const chalk = require('chalk');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('shutdown')
    .setDescription('Turns off AZ3L')
    .addStringOption(option => option
        .setName('reason')
        .setDescription("Reason for shutting down AZ3L.")
        .setRequired(false)),

     async execute(interaction) {
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
            if (interaction.user.id != "782357589723578409") return await interaction.reply({
                content: "❌| You can't use this command. Only a dev can."
            });
            else{
    
                const reason = interaction.options.getString("reason");
    
                const embed = new EmbedBuilder()
                .setColor("Blue")
                .setDescription("✅ AZ3L is now **Offline**")
                .addFields({ name: "Reason", value: `${reason}`, inline: true})
    
                await interaction.reply({
                    content: "🔃 Shutting down AZ3L..."
                });
    
                setTimeout(async () => {
                    await interaction.editReply({
                        content: ``,
                        embeds: [embed]
                    });
    
                    await interaction.followUp({
                        embeds: [new EmbedBuilder()
                            .setColor("Yellow")
                            .setTitle("Info")
                            .setDescription("✅| Bot is now offline.")]
                    })
                    console.log(chalk.green(`[Bot Client] Bot has been shutdown from ${interaction.guild.name}`))
                    process.exit();
                }, 2000);
            }
            interaction.setCooldown(120000)
        }
    }
}