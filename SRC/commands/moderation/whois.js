const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const blacklist = require("../../Models/Blacklist");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('whois')
    .setDescription('Bring up info on a user/bot')
    .addUserOption(option => option 
        .setName("user")
        .setDescription("The user you want info on.")
        .setRequired(false)),
     
     async execute(interaction) {
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
            const user = interaction.options.getUser("user") || interaction.user;
            const member = await interaction.guild.members.fetch(user.id);
            const icon = user.displayAvatarURL();
            const tag = user.tag;
    
            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setAuthor({ name: tag, iconURL: icon })
            .setThumbnail(icon)
            .addFields({ name: "Member", value: `${user}`, inline: true })
            .addFields({ name: "Roles", value: `${member.roles.cache.map(r => r).join(' ')}`, inline: false })
            .addFields({ name: "Joined Server", value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true})
            .addFields({ name: "Joined Discord", value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true})
            .setFooter({ text: `User ID: ${user.id}`})
            .setTimestamp()
    
            await interaction.reply({
                embeds: [embed]
            });
            interaction.setCooldown(10000)
        }
    }
}