const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('servercount')
    .setDescription('Counts the total servers the bot is in'),
     
     async execute(interaction, client) {

        const srvcount = client.guilds.cache.size
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("Total Servers")
        .addFields({ name: "Total:", value: `${srvcount}`})

        await interaction.reply({
            embeds: [embed]
        })

    }
}