//Dependencies
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const blacklist = require("../../Models/Blacklist");
const chalk = require('chalk');

//Exports
module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear-console')
    .setDescription('Clears the bot\'s console!'),
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
             //Owner Checker
        if (interaction.user.id != "782357589723578409") return await interaction.reply({
            content: "You can't use this command. Only a dev can.",
            ephemeral: true
        });
        else{
            //Create Confirmed Embed
            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setDescription("✅ BL4IR's console is now clear!")

            const embed2 = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle("Info")
            .setDescription("Console has been cleared.")

            //Send Message
            await interaction.reply({
                content: "🔃 Clearing BL4IR's console..."
            });

            //Timeout
            setTimeout(async () => {
                //Edit Reply
                await interaction.editReply({
                    content: ``,
                    embeds: [embed]
                });

                await interaction.followUp({
                    embeds: [embed2],
                    ephemeral: true
                })
                //Console Logging
                console.clear();
                console.log(chalk.green(`[Bot Client] Console has been cleared from ${interaction.guild.name}`))
            }, 2000);

            interaction.setCooldown(5000)

        }
        }
    }
}