const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const blacklist = require("../../Models/Blacklist");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pp-size')
    .setDescription('How big?')
    .addUserOption(option => option
		.setName("user")
		.setDescription("View another user's pp size!")
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
            const member = interaction.options.getMember("user")

            let size = Math.floor(Math.random() * 32)

            let PP = "8"
    
            for (let i = 0; i < size; i++) {
                PP += "="
            }
        
            PP += "D"

            if (member.id === "782357589723578409") {
                //ownercheats
                PP = "Infinity. Always will be."
                
            }
            if (member.id === "1080142210424647774") {
                //cheats
                PP = "What pp? :rofl:"
            }
    
        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(`${member.displayName}'s PP`)
            .setDescription(PP)
    
        await interaction
            .reply({
                embeds: [embed],
            })
            .catch((err) => {})

            interaction.setCooldown(3000)
        }
    }
}