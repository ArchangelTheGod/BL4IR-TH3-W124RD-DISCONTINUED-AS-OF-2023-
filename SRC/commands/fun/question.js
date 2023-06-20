const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } =  require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription(`What would you like to ask BL4IR?`)
        .addStringOption(option =>
        option.setName('question')
        .setDescription('What would you like to ask me?')
        .setRequired(true)
        ),
        async execute(interaction) {

            const { options } = interaction;

            const question = options.getString('question');
            const choice = ["Yes!", "No.", "Probably...", "Never!", "Im not sure...", "Try asking again?", "Error! I don't like that question!"]
            const ball = Math.floor(Math.random() * choice.length)

            const ask = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`${interaction.user.username}'s Question for BL4IR`)
            .setFields({ name: 'Question', value: `${question}`, inline: true })

            const answer = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`${interaction.user.username}'s Question for BLAIR`)
            .setFields({ name: 'Answer', value: `${choice[ball]}`, inline: true })

            const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('ask')
                .setLabel('Ask The Question!')
                .setStyle(ButtonStyle.Primary)
            )

            const msg = await interaction.reply({
                embeds: [ask],
                components: [button]
            });

            const collector = msg.createMessageComponentCollector()

            collector.on('collect', async i => {
                if (i.customId == 'ask') {
                    i.update({
                        embeds: [answer],
                        components: [],
                        content: `**Question: ${question}**`
                    });
                    }
                })
            }
}