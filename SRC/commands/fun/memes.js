const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default:fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Sends memes")
    .addStringOption(option => 
        option.setName("platform")
        .setDescription("Meme Platform (Optional)")
        .addChoices(
            { name: "Reddit", value: "reddit" }
        )
    ),

    async execute (interaction) {
        const { guild, options, member } = interaction;

        const embed = new EmbedBuilder()

        const platform = options.getString("platform");

        async function redditMeme() {
            await fetch(`https://www.reddit.com/r/memes/random/.json`)
            .then (async res => {
                let meme = await res.json();

                let title = meme[0].data.children[0].data.title;
                let url = meme[0].data.children[0].data.url;
                let author = meme[0].data.children[0].data.author;

                return interaction.reply({
                    embeds: [embed.setTitle(title).setImage(url).setURL(url).setColor("Random").setFooter({ text: author })]
                })
            });
        }

        if (platform === "reddit") {
            redditMeme()
        }

        if (!platform) {
            let memes = [redditMeme];
            memes[Math.floor(Math.random() * memes.length)]();
        }
    }
}