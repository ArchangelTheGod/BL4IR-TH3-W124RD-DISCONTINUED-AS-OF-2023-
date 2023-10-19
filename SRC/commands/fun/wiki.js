const wiki = require('wikijs').default();
const { SlashCommandBuilder, EmbedBuilder } =  require('discord.js');
const blacklist = require("../../Models/Blacklist");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("wiki")
    .setDescription("Get answers for just about anything")
    .addStringOption(option => option 
        .setName("query")
        .setDescription("Look something up on Wikipedia")
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
            const query = interaction.options.getString('query');

            await interaction.deferReply();

            const search = await wiki.search(query);
            if (!search.results.length)
            return await interaction.editReply({
                content: "Error! Wikipedia doesn't seem to know what you want.",
                ephemeral: true
            });

            const result = await wiki.page(search.results[0]);

            const summary = await result.summary();
            if (summary.length > 8192)
            return await interaction.editReply({
                content: `${summary.slice(0, 2048)}`,
                ephemeral: true
            });

            else {
                const embed = new EmbedBuilder()
                .setColor("Blue")
                .setTitle(`Wiki Search: ${result.raw.title}`)
                .setDescription(`\`\`\`${summary.slice(0, 2048)}\`\`\``)

                await interaction.editReply({
                    embeds: [embed]
                });

                await interaction.followUp({
                    embeds: [new EmbedBuilder()
                        .setColor("Yellow")
                        .setTitle("Info")
                        .setDescription("Obtained your query!")]
                })
            }
            interaction.setCooldown(600000)
        }
    }
}