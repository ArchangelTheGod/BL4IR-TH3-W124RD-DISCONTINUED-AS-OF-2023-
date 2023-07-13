const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Tell everyone that you rule!')
    .addStringOption(option => option
        .setName("title")
        .setDescription("The title of your announcement!")
        .setRequired(true))
    .addStringOption(option => option
        .setName("message")
        .setDescription("The message you'd like to announce!")
        .setRequired(true))
    .addStringOption(option => option
        .setName("highlights")
        .setDescription("The highlighted message!")
        .setRequired(true))
    .addStringOption(option => option
        .setName("closing")
        .setDescription("The closing of the annoucement!")
        .setRequired(false))
    .addStringOption(option => option
        .setName("author")
        .setDescription("The author of the annoucement!")
        .setRequired(false)),
     
     async execute(interaction) {
        const title = interaction.options.getString("title")
        const msg = interaction.options.getString("message")
        const highlight = interaction.options.getString("highlights")
        const closing = interaction.options.getString("closing")
        const author = interaction.options.getString("author")

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setAuthor({ name: `${author}`})
        .setTitle(`${title}`)
        .setDescription(`\n\n***${highlight}***`)
        .addFields({ name: " ", value: `${msg}`})
        .addFields({ name: " ", value: `${closing}`})
        .setFooter({ text: `Announcement Sent By: ${author}`})
        .setTimestamp()

        await interaction.reply({
            content: `||@everyone||`,
            embeds: [embed]
        })

        await interaction.followUp({
            embeds: [new EmbedBuilder()
            .setColor("Green")
            .setDescription("Sent Announcement!")
            .setTimestamp()
            .setFooter({ text: "Announcements! Brought to you by BL4IR!"})],
            ephemeral: true
        })
    }
}