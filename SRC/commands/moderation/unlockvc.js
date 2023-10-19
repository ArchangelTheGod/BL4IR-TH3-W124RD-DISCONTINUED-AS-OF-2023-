const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const blacklist = require("../../Models/Blacklist");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unlockvc')
    .setDescription('Unlocks a voice channel and allows it to be used.')
    .addChannelOption(option => option
        .setName("voice-channel")
        .setDescription("The voice channel you'd like to unlock.")
        .addChannelTypes(ChannelType.GuildVoice)
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
                
                let vc = interaction.options.getChannel("voice-channel");
    
                vc.permissionOverwrites.create(interaction.guild.id, { Connect: true })
    
                const embed = new EmbedBuilder()
                .setColor('Green')
                .setDescription(`🔓 Successfully Unlocked: ${vc}`)
                .setTimestamp()
                .setFooter({ text: "Unlocking System"})
    
                await interaction.reply({
                    embeds: [embed]
                })
            }
            interaction.setCooldown(5000)
        }
    }
}