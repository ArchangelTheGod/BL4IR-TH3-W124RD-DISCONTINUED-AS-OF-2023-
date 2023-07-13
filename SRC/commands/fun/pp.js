const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pp-size')
    .setDescription('How big is your PP?'),
     
     async execute(interaction) {
        const ppsize = ["8=D", "8==============D", "8=====D", "8========D", "404, Not Found", "8================================D", "8================D"]
        const pprand = Math.floor(Math.random() * ppsize.length)

        await interaction.reply({
            embeds: [new EmbedBuilder()
            .setColor("Blue")
            .setDescription(`${ppsize[pprand]}`)
            .setFooter({ text: `Every "=" is 1 inch`})]
        })
    }
}