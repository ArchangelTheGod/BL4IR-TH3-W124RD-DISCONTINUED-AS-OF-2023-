const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clears messages from the channel.')
    .addIntegerOption(option => option
        .setName("amount")
        .setDescription("The amount of messages you'd like to remove.")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)),
     
     async execute(interaction, client) {
        
        const amount = interaction.options.getInteger("amount");
        const channel = interaction.channel;

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild || PermissionsBitField.Flags.ManageMessages))
        return await interaction.reply({
            embeds: [new EmbedBuilder()
            .setColor("Red")
            .setDescription("You don't have permission to use this command.")
            .setTimestamp()],
            ephemeral: true
        });

        if (!amount) return await interaction.reply({
            embeds: [new EmbedBuilder()
            .setColor("Red")
            .setDescription("Please specify the amount of messages you'd like to delete.")
            .setTimestamp()],
            ephemeral: true
        });

        if (amount > 100 || amount < 1) return await interaction.reply({
            embeds: [new EmbedBuilder()
            .setColor("Red")
            .setDescription("Please specify a number **between** 1-100")
            .setTimestamp()],
            ephemeral: true
        });

        await interaction.channel.bulkDelete(amount).catch(err =>{
            return
        });

        const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`Sucessfully Deleted **${amount}** message(s)`)
        .setTimestamp()

        await interaction.reply({
            embeds: [embed]
        }).catch(err => {
            return;
        })

    }
}