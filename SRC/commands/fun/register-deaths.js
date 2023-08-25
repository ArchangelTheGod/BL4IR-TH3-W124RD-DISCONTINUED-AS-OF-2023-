const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const deathlog = require('../../Models/KillLog');

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
            {name: "View Kills", value: "view-kills"}
        )),
     async execute(interaction) {
        const { options, user } = interaction;

        // if (interaction.user.id != "782357589723578409") return;
        // else {
            let Data = await deathlog.findOne({
                User: user.id 
            }).catch(err => { })
    
            switch(options.getString("options")) {
                case "register": {
                    if(Data) return interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setColor("Yellow")
                            .setTitle("Info")
                            .setDescription("❌| You already have a Kill-Counter.")],
                        ephemeral: true
                    })
    
                    Data = new deathlog({
                        User: user.id,
                        UserName: interaction.user.username,
                        Deaths: 0,
                        PlayerKills: 0
                    })
    
                    await Data.save()
    
                    interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setColor("Yellow")
                            .setTitle("Info")
                            .setDescription("✅| Kill-Counter Active")],
                        ephemeral: true
                    })
                }
                break;
                case "view-kills": {
                    if(!Data) return interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setColor("Yellow")
                            .setTitle("Info")
                            .setDescription("❌| Register a Kill-Counter first.")],
                        ephemeral: true

                    })
                    else {
                        const embed = new EmbedBuilder()
                        .setColor("Blue")
                        .setTitle(`${interaction.user.tag}'s Stats`)
                        .addFields({ name: "Kills:", value: `:crossed_swords: ${Data.PlayerKills}`})
                        .addFields({ name: "Deaths:", value: `:skull_crossbones: ${Data.Deaths}`})
        
                        await interaction.reply({
                            embeds: [embed]
                        })
                    }
                }
                break;
                case "delete": {
                    if(!Data) return interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setColor("Yellow")
                            .setTitle("Info")
                            .setDescription("❌| You need a Kill-Counter to delete one.")],
                        ephemeral: true
                    })
    
                    await Data.deleteOne()
    
                    interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setColor("Yellow")
                            .setTitle("Info")
                            .setDescription("✅| Kill-Counter has been terminated.")],
                        ephemeral: true
                    })
                }
                break;
            // }
        }

       
    }
}