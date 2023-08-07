const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('membercount')
    .setDescription('Counts the total members in a guild'),
     
     async execute(interaction) {
        const humans = interaction.guild.memberCount;
        const bots = interaction.guild.members.cache.filter(member => member.user.bot).size;
        const guildName = interaction.guild.name

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`${guildName}'s Member Count`)
        .addFields({ name: "💪 Humans:", value: `${humans - bots}`, inline: true})
        .addFields({ name: "🦾 Bots:", value: `${bots}`, inline: true})
        .addFields({ name: "Total:", value: `${humans}`, inline: true})
        await interaction.reply({
            embeds: [embed]
        })
    }
}