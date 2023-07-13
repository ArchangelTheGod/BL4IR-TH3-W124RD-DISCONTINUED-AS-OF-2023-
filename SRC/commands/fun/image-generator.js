const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: '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'
})

const openai = new OpenAIApi(configuration)

module.exports = {
    data: new SlashCommandBuilder()
    .setName('generate')
    .setDescription('Generates an image from a prompt!')
    .addStringOption(option => option
        .setName("prompt")
        .setDescription("Describe the image to be generated.")
        .setRequired(true)),
     
     async execute(interaction) {
        

        // await interaction.reply({
        //     content: "Command Disabled by Dev."
        // });
        await interaction.deferReply()

        const prompt = interaction.options.getString('prompt')

        try{

            const response = await openai.createImage({
                prompt: `${prompt}`,
                n: 1,
                size: `1024x1024`,
            });
            const image = response.data.data[0].url;

            const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`\`\`\`${prompt}\`\`\``)
            .setImage(image)
            .setFooter({ text: "Image Generator "})

            await interaction.editReply({
                embeds: [embed]
            });    
        }catch(e) {
            if (e.response.status == 400)
            return await interaction.editReply({
                content: "Error! Image couldn't be generated! Status Code: **400**"
            });
            return await interaction.editReply({
                content: `Request failed with status code: **${e.response.status}**`
            });
        }
    }
}