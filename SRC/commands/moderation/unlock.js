const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField, ChannelType } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('Unlocks a channel and allows it to be used.')
    .addChannelOption(option => option
        .setName("channel")
        .setDescription("The channel you'd like to unlock.")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)),
     
     async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({
            content: "You don't have sufficient permissions to use this command.",
            ephemeral: true
        })
        else {
            
            let channel = interaction.options.getChannel("channel");

            channel.permissionOverwrites.create(interaction.guild.id, { SendMessages: true }, { ViewMessageHistory: true })

            const embed = new EmbedBuilder()
            .setColor('Green')
            .setDescription(`🔓 Successfully Unlocked: ${channel}`)
            .setTimestamp()
            .setFooter({ text: "Unlocking System"})

            await interaction.reply({
                embeds: [embed]
            })
        }
    }
}