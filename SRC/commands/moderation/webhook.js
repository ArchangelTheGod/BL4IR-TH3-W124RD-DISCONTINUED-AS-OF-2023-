const { Client, EmbedBuilder, SlashCommandBuilder, PermissionsBitField, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('webhook')
    .setDescription('Manage and edit webhooks on this guild')
    .addSubcommand(command => command
        .setName('create')
        .setDescription('Creates a webhook in a channel.')
        .addChannelOption(option => option
            .setName('channel')
            .setDescription('The channel you want to create a webhook in.')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true))
        .addStringOption(option => option
            .setName('name')
            .setDescription('The display name for the webhook')
            .setRequired(true)
            .setMinLength(1)
            .setMaxLength(80))
        .addStringOption(option => option
            .setName('icon-url')
            .setDescription('The icon for the webhook')
            .setRequired(false)
            .setMinLength(1)
            .setMaxLength(200)))
    .addSubcommand(command => command
        .setName('edit')
        .setDescription('Edits a webhook on this guild.')
        .addStringOption(option => option
            .setName('webhook-id')
            .setDescription('The ID of the webhook you\'d like to edit. ')
            .setRequired(true))
        .addStringOption(option => option
            .setName('webhook-token')
            .setDescription('The token of the webhook')
            .setMinLength(10)
            .setMaxLength(200)
            .setRequired(true))
        .addStringOption(option => option
                .setName('new-name')
                .setDescription('The new name of your webhook')
                .setRequired(true)
                .setMinLength(1)
                .setMaxLength(80))
                
        )
    .addSubcommand(command => command
        .setName('delete')
        .setDescription('Delete a webhook')
        .addStringOption(option => option
            .setName('webhook-id')
            .setDescription('The ID of the webhook you\'d like delete')
            .setMinLength(10)
            .setMaxLength(200)
            .setRequired(true))
        .addStringOption(option => option
            .setName('webhook-token')
            .setDescription('The token of the webhook')
            .setRequired(true)
            .setMinLength(10)
            .setMaxLength(200))),
     
     async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild))
        return await interaction.reply({
            embeds: [new EmbedBuilder()
            .setName("Error")
            .setDescription("❌ You do not have permission to use this command.")
        ],
        ephemeral: true
        })

        const sub = interaction.options.getSubcommand();

        switch (sub) {
            case 'create':

            await interaction.deferReply({ ephemeral: true });

            const name = await interaction.options.getString('name')
            const icon = await interaction.options.getString('icon-url')
            const channel = await interaction.options.getChannel('channel');

            const webhook = await channel.createWebhook({
                name: name,
                icon: icon,
                channel: channel
            }).catch(err => {
                return interaction.reply({
                    content: "Something went wrong. (Code 400)"
                })
            });

            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setDescription(":white_check_mark: Your webhook has been created!")
            .addFields({ name: "Webhook Name", value: `> ${name}`, inline:true })
            .addFields({ name: "Webhook Channel", value: `> ${channel}`, inline: true })
            .addFields({ name: "Webhook URL", value: `> https://discord.com/api/webhooks/${webhook.id}/${webhook.token}`, inline: true})
            .addFields({ name: "Webhook Icon", value: `>${icon}`, inline: true})

            await interaction.editReply({
                embeds: [embed],
                ephemeral: true
            })

            try {
                await webhook.send({ embeds: [new EmbedBuilder() 
                .setColor("Blue")
                .setDescription("Hello there!")]});
            } catch (err) {
                return;
            }

            break;
            case 'edit':
                
            await interaction.deferReply({ ephemeral: true });

            const token = await interaction.getString('webhook-token');
            const id = await interaction.getString('webhook-id');
            const newname = await interaction.getString('new-name');

            const editwebhook = await interaction.guild.fetchWebhooks();

            await Promise.all(editwebhook.map(async webhook => {

                if (webhook.token !== token || webhook.id !== id)
                await interaction.reply({
                    content: "❌| Error! Webhook with the specifications provided **doesn't exist.** (Code 404)"
                })
                else {

                    if (!newname) newname = webhook.name;
                    let oldname = webhook.name;

                    await webhook.edit({
                        name: newname
                    }).catch (err => {
                        return interaction.editReply({
                            content: "❌| Error! I may not have permission! (Code 401, 403, 400, 500, 504)",
                            ephemeral:true
                        });
                    })

                    const embed = new EmbedBuilder()
                    .setColor("Blue")
                    .setDescription(":white_check_mark: Your webhook has been edited!")
                    .addFields({ name: "Webhook Name", value: `> ${oldname} ==> ${newname}`, inline:true })

                    await interaction.editReply({
                        embeds: [embed],
                        content: ''
                    })
                }
            }))

            break;
            case 'delete':

            await interaction.deferReply({ ephemeral: true })

            const deltoken = await interaction.options.getString('webhook-token');
            const delid = await interaction.options.getString('webhook-id');

            const delwebhook = await interaction.guild.fetchWebhooks();

            await Promise.all(delwebhook.map(async webhook => {
                
                if (webhook.token !== deltoken || webhook.id !== delid)
                return await interaction.editReply({
                    content: "Error! Webhook with the specifications provided **doesn't exist.** (Code 404)"
                });
                else {

                    await webhook.delete().catch(err => {
                        return interaction.editReply({
                            content: "Error! I may not have permissions! (Code 401, 403, 400, 500, 504"
                        });
                    })

                    await interaction.editReply({ content: `✅ Webhook deleted!`})
                }
            }))
        }
    }
}