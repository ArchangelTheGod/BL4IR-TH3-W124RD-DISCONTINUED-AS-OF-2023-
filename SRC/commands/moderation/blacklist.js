const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const blacklist = require("../../Models/Blacklist");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("blacklist")
    .setDescription("Blacklists a user from using the bot")
    .addStringOption(option => option
        .setName("username")
        .setDescription("The username of the user to add to the blacklist.")
        .setMinLength(2)
        .setMaxLength(32)
        .setRequired(true))
    .addStringOption(option => option 
        .setName("user-id")
        .setDescription("The ID of the user you'd like to blacklist.")
        .setMaxLength(18)
        .setRequired(true))
    .addStringOption(option => option
        .setName("reason")
        .setDescription("The reason why you'd like to blacklist the user.")
        .setRequired(true)),
    async execute (interaction) {
        if (interaction.user.id != "782357589723578409") return await interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor("Red")
                .setTitle("Info|Error")
                .setDescription("You can't do that, you're not a Dev.")
                .setFooter({ text: "Imagine thinking you're a dev LOL"})]
        })
        else {
            const userid = interaction.options.getString("user-id");
            const reasoning = interaction.options.getString("reason")
            const username = interaction.options.getString("username")

            let Data = await blacklist.findOne({
                UserID: userid
            }).catch(err => { })

            if (Data) return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor("Red")
                    .setTitle("Info|Error")
                    .setDescription("This user already exists in the Database and is already Blacklisted.")
                    .setFooter({ text: "Error Type: Already Exists."})]
            })
            else{
                let BlacklistData = await blacklist.findOne({
                    UserID: userid
                })

                BlacklistData = new blacklist({
                    User: username,
                    UserID: userid,
                    Reason: reasoning
                })
    
                await BlacklistData.save()
    
                interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setColor("Yellow")
                        .setTitle("Info|Success")
                        .setDescription(`${username} with the ID ${userid} is now banned from using the bot.`)
                        .addFields({ name: "Userame:", value: `${username}`})
                        .addFields({ name: "User ID:", value: `${userid}`})
                        .addFields({ name: "Reason:", value: `${reasoning}`})]
                })
            }
        }
    }
}