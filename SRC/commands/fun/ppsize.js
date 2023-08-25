const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pp-size')
    .setDescription('How big?')
    .addUserOption(option => option
		.setName("user")
		.setDescription("View another user's pp size!")
		.setRequired(true)),
     
     async execute(interaction) {

        const member = interaction.options.getMember("user")

            let size = Math.floor(Math.random() * 21)

            let PP = "8"
    
            for (let i = 0; i < size; i++) {
                PP += "="
            }
        
            PP += "D"

            if (member.id === "782357589723578409") {
                //ownercheats
                PP = "Infinity. Always will be."
                
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
    }
}