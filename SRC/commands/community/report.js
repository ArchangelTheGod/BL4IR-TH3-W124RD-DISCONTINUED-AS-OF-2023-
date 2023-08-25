const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('report')
    .setDescription('Report someone or something!')
    .addSubcommand(command => command
        .setName("users")
        .setDescription("Report a user!")
        .addUserOption(option => option
            .setName('user')
            .setDescription('The user you\'d like to report')
            .setRequired(true))
        .addStringOption(option => option
           .setName('reason')
           .setDescription('The reason you\'d like to report this user.')
           .setRequired(true))
        .addAttachmentOption(option => option
            .setName("proof-of-report")
            .setDescription("We need supporting evidence!")
            .setRequired(true)))
    .addSubcommand(command => command
        .setName('other')
        .setDescription('Report an issue!')
        .addStringOption(option => option
            .setName('issue')
            .setDescription('The issue you\'d like to report')
            .setRequired(true))),
     
     async execute(interaction) {
        const { options } = interaction;
        const userReport = options.getUser("user");
        const userReportReason = options.getString("reason");
        const otherIssue = options.getString("issue");
        const sub = options.getSubcommand();
        const userprooffetch = options.getAttachment("proof-of-report");
        const userproof = userprooffetch.url;

        switch (sub) {
            case "users":

            const reportEmbed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("**USER REPORT**")
            .addFields({ name: "Reported User:", value: `${userReport}`})
            .addFields({ name: "Reason:", value: `\`${userReportReason}\``})
            .addFields({ name: "Reported By:", value: `${interaction.user}`})
            .addFields({ name: "Attached Images:", value: " "})
            .setImage(userproof)
            .setTimestamp()

            await interaction.reply({
                embeds: [reportEmbed]
            })

            await interaction.followUp({
                embeds: [new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`Successfully Reported ${userReport}`)
                    .addFields({ name: "Reason:", value: `\`${userReportReason}\``})
                    .setTimestamp()],
                ephemeral: true
            })
            break;
            case "other":

            const sendembed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("**ISSUE REPORT**")
            .addFields({ name: "Issue:", value: `\`${otherIssue}\``})
            .addFields({ name: "Reported By:", value: `${interaction.user}`})
            .addFields({ name: "Attached proof-of-issue:", value: " "})
            .setImage(issueproof)
            .setTimestamp()

            await interaction.reply({
                embeds: [sendembed]
            })

            await interaction.followUp({
                embeds: [new EmbedBuilder()
                    .setColor("Green")
                    .setDescription(`Successfully reported your issue!`)
                    .setTimestamp()],
                ephemeral: true
            })

            break;
        }
    }
}