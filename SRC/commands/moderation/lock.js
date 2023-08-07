const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');


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

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({
            content: "You don't have sufficient permissions to use this command.",
            ephemeral: true
        })
        else {

            const areusure = new EmbedBuilder()
            .setColor("Red")
            .setTitle("⛔ ALERT ⛔")
            .setDescription("Would you also like to hide the channels?")

            const confirmbutton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId("confirm")
                .setLabel("Confirm")
                .setStyle(ButtonStyle.Danger),

                new ButtonBuilder()
                .setCustomId("cancel")
                .setLabel("No, Continue.")
                .setStyle(ButtonStyle.Success)
            )
            
            let channel = interaction.options.getChannel("channel");

            const embed = new EmbedBuilder()
            .setColor('Red')
            .setDescription(`🔐 Successfully Locked: ${channel}`)
            .setTimestamp()
            .setFooter({ text: "Locking System"})

            const embed2 = new EmbedBuilder()
            .setColor('Red')
            .setDescription(`🔐 Successfully Locked: ${channel}`)
            .addFields({ name: "Data:", value: "``HiddenChannels?: true`` "})
            .setTimestamp()
            .setFooter({ text: "Locking System"})

            const send = await interaction.reply({
                embeds: [areusure],
                components: [confirmbutton]
            })

            const collector = send.createMessageComponentCollector()

            collector.on('collect', async i => {
                if (i.customId == 'cancel') {
                    i.update({
                        embeds: [embed],
                        components: [],
                    });
                    channel.permissionOverwrites.create(interaction.guild.id, { SendMessages: false })
                }
            })
            
            collector.on('collect', async i => {
                if (i.customId == 'confirm') {
                    i.update({
                        embeds: [embed2],
                        components: [],
                    });
                    channel.permissionOverwrites.create(interaction.guild.id, { SendMessages: false }, { ViewMessageHistory: false})
                }
            })
        }
    }
}