const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const blacklist = require("../../Models/Blacklist");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription('Locks a channel and prevents it from being used.')
    .addChannelOption(option => option
        .setName("channel")
        .setDescription("The channel you'd like to lock.")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)),
     
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
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({
                content: "You don't have sufficient permissions to use this command.",
                ephemeral: true
            })
            else {
                
                let channel = interaction.options.getChannel("channel");
    
                const embed = new EmbedBuilder()
                .setColor('Red')
                .setDescription(`🔐 Successfully Locked: ${channel}`)
                .setTimestamp()
                .setFooter({ text: "Locking System"})
    
                channel.permissionOverwrites.create(interaction.guild.id, { SendMessages: false })
    
                await interaction.reply({
                    embeds: [embed]
                })
            }
            interaction.setCooldown(5000)
        }
    }
}