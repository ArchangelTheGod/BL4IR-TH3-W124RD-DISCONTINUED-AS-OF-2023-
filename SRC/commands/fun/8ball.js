//Dependencies
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } =  require('discord.js');
const blacklist = require("../../Models/Blacklist");

//Exports
module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription(`Ask the 8ball a question (Not polar [y/n])`)
        .addStringOption(option =>
        option.setName('question')
        .setDescription('What would you like to as me?')
        .setRequired(true)
        ),
        async execute(interaction) {
            //Blacklist checker
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
            //Interaction
            const { options } = interaction;

            //8ball randomizer
            const question = options.getString('question');
            const choice = ["It is Certain", "There is a possibility", "Without a doubt", "Impossible!", "Focus a bit harder. Try again.", "It is not for certain."]
            const ball = Math.floor(Math.random() * choice.length)

            //Asking Embed
            const ask = new EmbedBuilder()
            .setColor('Blue')
            .setTitle(`${interaction.user.username}'s 8ball game`)
            .setFields({ name: 'Question', value: `${question}`, inline: true })

            //Answering Embed
            const answer = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`${interaction.user.username}'s 8ball game`)
            .setFields({ name: 'Answer', value: `${choice[ball]}`, inline: true })

            //Confirm Asnwer? Button
            const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('8ball')
                .setLabel('Roll the ball')
                .setStyle(ButtonStyle.Primary)
            )

            //Send Ask Embed and Confirm Button
            const msg = await interaction.reply({
                embeds: [ask],
                components: [button]
            });
            
            //Button Click Update Listener
            const collector = msg.createMessageComponentCollector()

            //Button Update Event
            collector.on('collect', async i => {
                if (i.customId == '8ball') {
                    i.update({
                        embeds: [answer],
                        components: [],
                        content: `**Question: ${question}**`
                    });
                    }
                })
                
            interaction.setCooldown(5000)
            }
    }
}