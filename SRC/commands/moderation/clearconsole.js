const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const chalk = require('chalk');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear-console')
    .setDescription('Clears the bot\'s console!'),
     async execute(interaction) {
        if (interaction.user.id != "YOUR USER ID HERE") return;
        else{
            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setDescription("✅ BL4IR's console is now clear!")

            await interaction.reply({
                content: "🔃 Clearing BL4IR's console..."
            });

            setTimeout(async () => {
                await interaction.editReply({
                    content: ``,
                    embeds: [embed]
                });
                console.clear();
                console.log(chalk.green("[Bot Client] Console has been cleared"))
            }, 2000);

        }
    }
}
