//Dependencies
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

//Exports
module.exports = {
    data: new SlashCommandBuilder()
    .setName('create-changelogs')
    .setDescription('Documents new changes to the bot')
    .addStringOption(option => option
        .setName("title")
        .setDescription("The title of your announcement!")
        .setRequired(true))
    .addStringOption(option => option
        .setName("body")
        .setDescription("The body of the announcement")
        .setRequired(true))
    .addStringOption(option => option
        .setName("version")
        .setDescription("The new version of the bot")
        .setRequired(true))
    .addStringOption(option => option
        .setName("closing")
        .setDescription("The closing of the annoucement!")
        .setRequired(true))
    .addStringOption(option => option
        .setName("date-of-update")
        .setDescription("The date of when the bot as updated.")
        .setRequired(true))    
    .addStringOption(option => option
        .setName("author")
        .setDescription("The author of the annoucement!")
        .setRequired(true)),
     
     async execute(interaction) {

        //Owner Checker
        if (interaction.user.id != "782357589723578409") return await interaction.reply({
            content: "You can't use this command. Only a dev can."
        });
        else {
            
        //Fetch options
        const title = interaction.options.getString("title")
        const msgbody = interaction.options.getString("body")
        const closing = interaction.options.getString("closing")
        const author = interaction.options.getString("author")
        const updatedate = interaction.options.getString("date-of-update")
        const botversion = interaction.options.getString("version")

        //Create Announcement Embed
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setAuthor({ name: `${author}`})
        .setTitle(`${title}`)
        .setDescription(`\n\n**${botversion}**`)
        .addFields({ name: " ", value: `${msgbody}`})
        .addFields({ name: " ", value: `/${closing}`})
        .setFooter({ text: `Updated on: ${updatedate}`})
        .setTimestamp()

        //Send Announcement Embed
        await interaction.reply({
            content: `**UPDATE ALERT**`,
            embeds: [embed]
        })

        //Followup Reply
        await interaction.followUp({
            embeds: [new EmbedBuilder()
            .setColor("Yellow")
            .setDescription("Sent Changelog")
            .setTimestamp()
            .setFooter({ text: "Changlog system"})],
            ephemeral: true
        })
        }
    }
}