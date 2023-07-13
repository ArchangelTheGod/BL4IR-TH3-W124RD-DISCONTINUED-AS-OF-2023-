const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("hack")
    .setDescription("Hack a user!")
    .addUserOption(option => option
        .setName("user")
        .setDescription("The target you want to hack.")
        .setRequired(true)),
    async execute (interaction) {

        if (interaction.user.id != "782357589723578409")
        return interaction.reply({
            content: "Error! You aren't smart enough to use this command!"
        })
        else{
        const target = interaction.options.getUser("user")
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`Hacked ${target}`)

        //Hack Embed
        const ipaddress = ["64.96.187.84", "13.159.59.179", "188.148.117.226", "217.116.96.208", "247.88.179.37", "201.70.71.206", "153.69.1.78, 35.222.206.231", "200.183.58.228", "2.98.79.210", "189.172.168.238", "163.229.38.56", "252.43.245.196", "228.120.161.119", "155.4.141.6", "1.244.240.253", "247.121.120.219", "215.83.160.67", "216.230.201.241", "65.49.178.157"]
        const contacts = ["None", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"]
        const phonenumber = ["613-555-0121", "613-555-0142"," 613-555-0121", "613-555-0124", "613-555-0116", "613-555-0184"]

        //Random
        const contactsrand = Math.floor(Math.random() * contacts.length)
        const iprand = Math.floor(Math.random() * ipaddress.length)
        const phonenumberrand = Math.floor(Math.random() * phonenumber.length)

        //Embed Send
        const hackresult = interaction.options.getUser("user")
        const resultdm = new EmbedBuilder()
        .setColor("Red")
        .addFields({ name: "User:", value: `${target}`, inline: true})
        .addFields({ name: "IP Address:", value: `\`\`${ipaddress[iprand]}\`\``})
        .addFields({ name: "Contacts Found:", value: `\`\`${contacts[contactsrand]}\`\``})
        .addFields({ name: "Phone Number:", value: `\`\`${phonenumber[phonenumberrand]}\`\``})
        .addFields({ name: "||Hacker:||", value: `||${interaction.user.username}||`})
        .setTimestamp()

        interaction.reply({
            embeds: [embed, resultdm]
        })
    }
    
    }
}