const { Client, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const accountSchema = require('../../Models/Account');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('beg')
    .setDescription('Beg for money! (Not 100% Reliable)'),
     
     async execute (interaction) {
        const { user, guild } = interaction

        let Data = await accountSchema.findOne({
            Guild: interaction.guild.id,
            User: interaction.user.id,
            UserName: interaction.user.tag
        })

        let negative = Math.round((Math.random() * -300) - 10)
        let positive = Math.round((Math.random() * 300) + 10)

        const posN = [negative, positive];

        const amount = Math.round((Math.random() * posN.length));
        const value = posN[amount]

        if (!value) return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor('Random')
                .setDescription("No money for you. LOL")
            ], ephemeral: true
        })

        if (Data) {
            Data.Wallet += value;
            await Data.save()
        }

        if (value > 0) {
            const positiveChoices = [
                "Jesus blessed you with",
                "Someone gifted you",
                "Archangel paused his coding and edited your account details adding:",
                "BL4IR malfunctioned and gave you:",
                "Someone mugged Aiden and gave you",
                `Database Error! Gave ${interaction.user.tag}`
            ]

            const posName = Math.round(Math.random() * positiveChoices.length);

            const embed1 = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Beg Command Results")
            .addFields({
                name: "Beg Result", 
                value: `${positiveChoices[[posName]]} $${value}`
            })

            await interaction.reply({
                embeds: [embed1]
            })
        } else {
            const negativeChoices = [
                "You left your wallet somewhere and lost",
                "A data breach occured and you lost",
                "You were mugged and lost",
                "Your bank account was hacked and the hackers took",
                "A piggy bank you met on the road, attcked you and swallowed",
                "You died in Minecraft due to fall damage and lost",
                "You died of cringe and lost"
            ]

            const negName = Math.round(Math.random() * negativeChoices.length);

            const stringV = `${value}`;

            const nonSymbol = await stringV.slice(1);

            const embed2 = new EmbedBuilder()
            .setColor("Random")
            .setTitle("Beg Command Results")
            .addFields({
                name: 'Beg Result',
                value: `${negativeChoices[[negName]]} $${value}`
            })

            await interaction.reply({
                embeds: [embed2]
            })
        }
    }
}