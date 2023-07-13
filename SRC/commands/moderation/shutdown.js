const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const chalk = require('chalk');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('shutdown')
    .setDescription('Turns off BL4IR')
    .addStringOption(option => option
        .setName('reason')
        .setDescription("Reason for shutting down BL4iR.")
        .setRequired(false)),

     async execute(interaction) {
        if (interaction.user.id != "782357589723578409") return;
        else{

            const reason = interaction.options.getString("reason");

            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setDescription("✅ BL4IR is now **Offline**")
            .addFields({ name: "Reason", value: `${reason}`, inline: true})

            await interaction.reply({
                content: "🔃 Shutting down BL4IR..."
            });

            setTimeout(async () => {
                await interaction.editReply({
                    content: ``,
                    embeds: [embed]
                });
                console.log(chalk.green("[Bot Client] Bot has been shutdown from a server!"))
                process.exit();
            }, 2000);
        }
    }
}