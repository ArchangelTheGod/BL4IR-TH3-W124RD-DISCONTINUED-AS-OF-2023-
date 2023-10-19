const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const blacklist = require("../../Models/Blacklist");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('servercount')
    .setDescription('Counts the total servers the bot is in'),
     
     async execute(interaction, client) {
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
            const srvcount = client.guilds.cache.size
            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Total Servers")
            .addFields({ name: "Total:", value: `${srvcount}`})
    
            await interaction.reply({
                embeds: [embed]
            })
            interaction.setCooldown(5000)
    
        }
    }
}