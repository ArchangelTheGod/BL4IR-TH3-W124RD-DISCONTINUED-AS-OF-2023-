const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const blacklist = require("../../Models/Blacklist");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Get the bot\'s uptime'),
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
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);

        totalSeconds %= 86400;

        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;

        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription("**Bot Uptime**")
        .addFields({ name: `Total Time (Days)`, value: `\`\`${days}\`\``, inline: true})
        .addFields({ name: `Total Time (Hours)`, value: `\`\`${hours}\`\``, inline: true})
        .addFields({ name: `Total Time (Minutes)`, value: `\`\`${minutes}\`\``, inline: true})
        .addFields({ name: `Total Time (Seconds)`, value: `\`\`${seconds}\`\``, inline: true})
        .setTimestamp();
    
        await interaction.reply({embeds: [embed]});
        interaction.setCooldown(5000)
        }
    },
};