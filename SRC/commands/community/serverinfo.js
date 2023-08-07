const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Info about the current server!'),

     async execute(interaction) {

        const serverinfoEmbed = new EmbedBuilder()
        .setColor("#0155b6")
        .setThumbnail(interaction.guild.iconURL())
        .setTitle(interaction.guild.name)
        .addFields(
          {
            name: "Server Created At",
            value: `${interaction.guild.createdAt.toLocaleString()}`,
            inline: true,
          },
          {
            name: "Server Name",
            value: `${interaction.guild.name}`,
            inline: true,
          },
          {
            name: "Server ID",
            value: `${interaction.guild.id}`,
            inline: true,
          },
          {
            name: "Owner ID",
            value: `${interaction.guild.ownerId}`,
            inline: true,
          },
          {
            name: "Member Count",
            value: `${interaction.guild.memberCount}`,
            inline: true,
          },
          {
            name: "Is Server Partnered",
            value: `${interaction.guild.partnered}`,
            inline: true,
          }
        )
        .setFooter({
          text: "This data gets changed according to the server",
        });
  
      await interaction.reply({
        embeds: [serverinfoEmbed],
      });
    }
}