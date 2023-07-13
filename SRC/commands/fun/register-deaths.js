const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const deathSchema = require('../../Models/Deaths');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('deaths')
    .setDescription('Register your death-streak!')
    .addStringOption(option => option
        .setName("options")
        .setDescription("Select your option")
        .setRequired(true)
        .addChoices(
            {name: "Register", value: "register"},
            {name: "Delete", value: "delete"},
            {name: "View Deaths", value: "view-deaths"}
        )),
     async execute(interaction) {
        const { options, user } = interaction;

        // if (interaction.user.id != "782357589723578409") return;
        // else {
            let Data = await deathSchema.findOne({
                User: user.id 
            }).catch(err => { })
    
            switch(options.getString("options")) {
                case "register": {
                    if(Data) return interaction.reply({
                        content: "You've already registered!",
                        ephemeral: true
                    })
    
                    Data = new deathSchema({
                        User: user.id,
                        UserName: interaction.user.username,
                        Deaths: 0
                    })
    
                    await Data.save()
    
                    interaction.reply({
                        content: "Your death counter has been registered."
                    })
                }
                break;
                case "view-deaths": {
                    if(!Data) return interaction.reply({
                        content: "Please register your death counter first."
                    })
    
                    const embed = new EmbedBuilder()
                    .setColor("Blue")
                    .setTitle(`${interaction.user.tag}'s Total Deaths`)
                    .setDescription(`**Total Deaths:** :skull: ${Data.Deaths}`)
    
                    await interaction.reply({
                        embeds: [embed]
                    })
                }
                break;
                case "delete": {
                    if(!Data) return interaction.reply({
                        content: "Please register a death counter before deleting."
                    })
    
                    await Data.deleteOne()
    
                    interaction.reply({
                        content: "Your death counter has been terminated"
                    })
                }
                break;
            // }
        }

       
    }
}