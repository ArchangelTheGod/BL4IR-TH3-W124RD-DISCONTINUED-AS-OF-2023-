//Dependencies
const { Client, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

//Exports
module.exports = {
    data: new SlashCommandBuilder()
    .setName('hug')
    .setDescription('Hug someone!')
    .addUserOption(option => option
        .setName("user")
        .setDescription("The user you'd like to hug")
        .setRequired(true))
    .addStringOption(option => option
        .setName("message")
        .setDescription("The message you'd like to send to the person")
        .setRequired(false)),
     
     async execute(interaction) {
        //Fetch Options
        const hugger = interaction.user.username
        const reciver = interaction.options.getUser("user")
        const msg = interaction.options.getString("message")
        const remarkrand = ["How cute!", "🥰🥰🥰", "Hug it out!", "Get a room lol", "Chill out, bud", "lol", "lmfao"]
        const remark = Math.floor(Math.random() * remarkrand.length)

        //Create Hug Embed
        const sendembed = new EmbedBuilder()
        .setColor("Random")
        .setDescription(`${hugger} hugs ${reciver}!!! ${remarkrand[remark]}`)
        .addFields({ name: "  ", value: `${msg}`})
        .setFooter({ text: "Hugs brought to you by BL4IR!"})
        .setTimestamp()

        const confirmembed = new EmbedBuilder()
        .setColor("Yellow")
        .setTitle("Info")
        .setDescription(`Hugged ${reciver}`)
        .setFooter({ text: `${hugger} hugged ${reciver} successfully!`})
        .setTimestamp()

        //Send Embeds
        await interaction.reply({
            content: `||${reciver}||`,
            embeds: [sendembed]
        })

        await interaction.followUp({
            embeds: [confirmembed],
            ephemeral: true
        })
    }
}