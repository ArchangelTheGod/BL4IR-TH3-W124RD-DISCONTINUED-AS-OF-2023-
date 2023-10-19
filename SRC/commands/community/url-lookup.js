const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const blacklist = require("../../Models/Blacklist");
const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("url-lookup")
    .setDescription("What's this URL about?")
    .addStringOption(option => option
        .setName("url")
        .setDescription("The URL you'd like to get info on.")
        .setMaxLength(100)
        .setRequired(true)),
    async execute (interaction) {
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
            await interaction.deferReply({});

            const {options} = interaction;
            const url = options.getString("url")

            const input = {
                method: "GET",
                url: "https://url-lookup-by-api-ninjas.p.rapidapi.com/v1/urllookup",
                params: {
                    url: url
                },
                headers: {
                    'X-RapidAPI-Key': 'cb86c1cc27msh70234f84f90cfb3p18f3d7jsncdbb5bbbc6c3',
                    'X-RapidAPI-Host': 'url-lookup-by-api-ninjas.p.rapidapi.com'
                },
            };
            try {
                const output = await axios.request(input);

                const embed = new EmbedBuilder()
                .setColor("Blue")
                .setTitle("Info | Info on URL | Success")
                .setDescription(`> Valid: \`${output.data.is_valid}\` \n> Country: \`${output.data.country}\` \n> Region: \`${output.data.region}\` \n> City: \`${output.data.city}\` \n> Zip code: \`${output.data.zip}\` \n> Timezone: \`${output.data.timezone}\` \n> ISP: \`${output.data.isp}\` \n> URL: \`${output.data.url}\` \n`)

                await interaction.editReply({ embeds: [embed]})
            } catch (e) {
                return await interaction.editReply({content: "Something went wrong!"})
            }

            interaction.setCooldown(60000)
        }
    }
}