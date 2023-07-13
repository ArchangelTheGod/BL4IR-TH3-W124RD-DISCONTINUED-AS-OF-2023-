const wiki = require('wikijs').default();
const { SlashCommandBuilder, EmbedBuilder } =  require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("wikipedia")
    .setDescription("Get answers for just about anything")
    .addStringOption(option => option 
        .setName("query")
        .setDescription("Look something up on Wikipedia")
        .setRequired(true)),
        async execute (interaction, client) {

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
            }
        }
}