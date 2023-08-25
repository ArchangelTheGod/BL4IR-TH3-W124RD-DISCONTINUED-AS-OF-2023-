//Dependencies
const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

//Exports
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
        
        //Obtain Options
        const amount = interaction.options.getInteger("amount");
        const channel = interaction.channel;

        //Permission Checker
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild || PermissionsBitField.Flags.ManageMessages))
        return await interaction.reply({
            embeds: [new EmbedBuilder()
            .setColor("Red")
            .setDescription("You don't have permission to use this command.")
            .setTimestamp()],
            ephemeral: true
        });

        //Clear Integer Checker (If = 0 || empty string/int)
        if (!amount) return await interaction.reply({
            embeds: [new EmbedBuilder()
            .setColor("Red")
            .setDescription("Please specify the amount of messages you'd like to delete.")
            .setTimestamp()],
            ephemeral: true
        });

        //Clear Integer Checker (If int > 100 || int < 1)
        if (amount > 100 || amount < 1) return await interaction.reply({
            embeds: [new EmbedBuilder()
            .setColor("Red")
            .setDescription("Please specify a number **between** 1-100")
            .setTimestamp()],
            ephemeral: true
        });

        //Deletion
        await interaction.channel.bulkDelete(amount).catch(err =>{
            return
        });

        //Create Confirmed Embed
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`Sucessfully Deleted **${amount}** message(s)`)
        .setTimestamp()

        const embed2 = new EmbedBuilder()
        .setColor("Yellow")
        .setTitle("Info")
        .setDescription("Cleared Channel.")

        //Send Confirmed Embed
        await interaction.reply({
            embeds: [embed]
        }).catch(err => {
            return;
        })

        await interaction.followUp({
            embeds: [embed2],
            ephemeral: true
        })

    }
}