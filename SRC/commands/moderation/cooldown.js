const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

var timeout = [];

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cooldown')
    .setDescription('Slow it down, bud'),
     
     async execute(interaction) {
        
        if (timeout.includes(interaction.user.id))
        return await interaction.reply({
            embeds: [new EmbedBuilder()
            .setDescription("Slow down, bud. Try again in 1 minute.")],
            ephemeral: true
        });

        await interaction.reply({
            content: `cooldown is active`
        });

        timeout.push(interaction.user.id);
        setTimeout(() => {
            timeout.shift();
        }, 10000)
    }
}