//Dependencies
const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require('discord.js');

//Exports
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

        //Permission Checker
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return await interaction.reply({
            content: "You don't have sufficient permissions to use this command.",
            ephemeral: true
        });
        else{
        
        //Require Inputs
        const title = interaction.options.getString("title")
        const msg = interaction.options.getString("message")
        const highlight = interaction.options.getString("highlights")
        const closing = interaction.options.getString("closing")
        const author = interaction.options.getString("author")

        //Announcement Embed
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setAuthor({ name: `${author}`})
        .setTitle(`${title}`)
        .setDescription(`\n\n***${highlight}***`)
        .addFields({ name: " ", value: `${msg}`})
        .addFields({ name: " ", value: `${closing}`})
        .setFooter({ text: `Announcement Sent By: ${author}`})
        .setTimestamp()

        //Send Announcement Embed
        await interaction.reply({
            content: `||@everyone||`,
            embeds: [embed]
        })

        //Follow-up Confirmation
        await interaction.followUp({
            embeds: [new EmbedBuilder()
            .setColor("Yellow")
            .setTitle("Info")
            .setDescription("Announcement Sent")
            .setTimestamp()
            .setFooter({ text: "Announcements! Brought to you by BL4IR"})],
            ephemeral: true
        })
        }
    }
}