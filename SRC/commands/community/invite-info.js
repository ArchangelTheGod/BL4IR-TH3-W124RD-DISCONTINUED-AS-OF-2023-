//Dependencies
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const blacklist = require("../../Models/Blacklist");

//Exports
module.exports = {
    data: new SlashCommandBuilder()
    .setName('invite-info')
    .setDescription('Get info on an server\'s invite')
   .addStringOption(option => option
      .setName('invite')
      .setDescription('The invite you\'d like to check.')),
     
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
            await interaction.deferReply({
                ephemeral: false
            })
    
            const { options } = interaction;
            const input = options.getString("invite");
    
            input.replace('discord.gg/', '');
            input.replace('https://discord.gg/', '');
            input.replace('http://discord.gg/', '');
    
            let invite;
            try {
                invite = await client.fetchInvite(input, { withCounts: true });
            } catch (e) {
                await interaction.editReply({
                    content: `I couldn't find an invite matching \`${input}\``
                })
            }
    
            if(!invite) return;
            let me = client.guilds.cache.get(invite.guild.id)
            if(!me) me = false;
            else me = true
    
            const embed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(invite.guild.name)
            .setThumbnail(invite.guild.iconURL())
            .addFields({ name: "📜 Server Features:", value: `>>> *${invite.guild.features.join('\n ')}*`})
            .addFields({ name: `💵 Boosts: \`${invite.guild.premiumSubscriptionCount}\``, value: " "})
            .addFields({ name: `📝 Member Count: \`${invite.memberCount}\``, value: " "})
            .addFields({ name: `🔍 Server ID: \`${invite.guild.id}\``, value: " "})
            .addFields({ name: `🗞️ Server Description:`, value: `\`${invite.guild.description??'none'}\`\n`})
            .addFields({ name: `🔐 Vanity Invite Code: \`${invite.guild.vanityURLCode??'none'}\``, value: " "})
            .addFields({ name: `🤖 Includes AZ3L: \`${me}\``, value: " "})
            .setImage(invite.guild.bannerURL({ size: 2048 }))
            .setTimestamp()
            .setFooter({ text: "Invite info"})
    
            await interaction.editReply({
                embeds: [embed],
                ephemeral: false
            })
            interaction.setCooldown(5000)
        }
    }
}