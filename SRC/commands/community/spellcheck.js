const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const blacklist = require("../../Models/Blacklist");
const spellcheck = require("simple-spellchecker");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("spellcheck")
    .setDescription("Allows you to check if you've spelt something correctly!")
    .addStringOption(option => option
        .setName("word")
        .setDescription("The word to spellcheck.")
        .setMaxLength(32)
        .setRequired(true)),
    async execute (interaction) {

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
            await interaction.deferReply({})

            const {options} = interaction;
            const query = options.getString("word");

            const embed = new EmbedBuilder()
            .setColor("Blue")

            spellcheck.getDictionary('en-us', async function (err, dictionary) {
                if (!err) {
                    const misspelled = ! dictionary.spellCheck(query)

                    if(misspelled){
                        let suggestions = dictionary.getSuggestions(query);
                        embed.setDescription(`➡ This is not how you spell \`"${query}".\` Are these what you were looking for? \n \n> ${suggestions.join(", ")|| `No Suggestions Found.`}`);
                    }else{
                    embed.setDescription(`➡ \`${query}\` is spelled correctly. Good Job!`)
                    }
                    
                }

                await interaction.editReply({
                    embeds: [embed]
                })
            })

            interaction.setCooldown(5000)
        }
    }
}