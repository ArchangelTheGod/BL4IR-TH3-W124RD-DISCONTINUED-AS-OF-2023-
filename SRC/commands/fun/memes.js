const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const blacklist = require("../../Models/Blacklist");
const fetch = (...args) => import('node-fetch').then(({ default:fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
    .setName("memes")
    .setDescription("Fresh memes"),
    async execute (interaction) {
        const { options } = interaction;
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
            const embed = new EmbedBuilder()

            const platform = options.getString("platform");
    
            let randsubreddit = [`https://www.reddit.com/r/AdviceAnimals/random.json`, `https://www.reddit.com/r/memes/random/.json`]
            const chosensubreddit = randsubreddit[Math.floor(Math.random()* randsubreddit.length)]
    
            async function redditMeme() {
                await fetch(chosensubreddit)
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
            interaction.setCooldown(3000)
        }
    }
}