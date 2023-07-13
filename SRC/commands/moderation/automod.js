const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const accountSchema = require('../../Models/Account');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('automod')
    .setDescription('Setup the automod system')
    .addSubcommand(command => command
        .setName("flagged-words")
        .setDescription("Block profanity, NSFW, and slurs"))
    .addSubcommand(command => command
        .setName("spam-messages")
        .setDescription("Block messages that may be spam"))
    .addSubcommand(command => command
        .setName("mention-spam")
        .setDescription("Blocks messages with too many @ mentions")
        .addIntegerOption(option => option
            .setName("number")
            .setDescription("The amount of mentions required to block a message")
            .setRequired(true)))
    .addSubcommand(command => command
        .setName("keyword")
        .setDescription("Block a given keyword in the server")
        .addStringOption(option => option
            .setName("keyword")
            .setDescription("The keyword to block")
            .setRequired(true))),
     
     async execute(interaction) {
        const { options, guild } = interaction
        const sub = options.getSubcommand();

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild))
        return await interaction.reply({
            content: "You cannot setup the Automod system because you don't have permission!"
        })
        
        switch (sub) {
            case 'flagged-words':

            await interaction.reply({
                content: "⚙️ Loading automod rule...",
                ephemeral: true
            })

            const rule = await guild.autoModerationRules.create({
                name: `Block profanity, NSFW, and slurs by BL4IR`,
                creatorId: `1111728534059229355`,
                enabled: true,
                eventType: 1,
                triggerType: 4,
                triggerMetadata:
                    {
                        presets: [1, 2, 3]
                    },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: `Message was blocked by BL4iR's automod system`
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({ content: `${err}`});
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule) return;

                const embed = new EmbedBuilder()
                .setColor("Blue")
                .setDescription("Your automod rule has been created.")

                await interaction.editReply({
                    content: "",
                    embeds: [embed]
                })
            }, 3000)

            break;

            case 'keyword':

            await interaction.reply({
                content: "⚙️ Loading automod rule...",
                ephemeral: true
            })
            const word = interaction.options.getString("keyword")
            const rule2 = await guild.autoModerationRules.create({
                name: `Prevents ${word} from being used on the server`,
                creatorId: `1111728534059229355`,
                enabled: true,
                eventType: 1,
                triggerType: 1,
                triggerMetadata:
                    {
                        keywordFilter: [`${word}`]
                    },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: `Message was blocked by BL4iR's automod system`
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({ content: `${err}`});
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule2) return;

                const embed2 = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`Your automod rule has been created. Rule is set to block ${word}`)

                await interaction.editReply({
                    content: ``,
                    embeds: [embed2]
                })
            }, 3000)

            break;
            
            case "spam-messages":

            await interaction.reply({
                content: "⚙️ Loading automod rule...",
                ephemeral: true
            })


            const rule3 = await guild.autoModerationRules.create({
                name: `Prevents spam messages by BL4IR`,
                creatorId: `1111728534059229355`,
                enabled: true,
                eventType: 1,
                triggerType: 3,
                triggerMetadata:
                    {
                        // mentionsTotalLimit: number
                    },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: `Message was blocked by BL4iR's automod system`
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({ content: `${err}`});
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule3) return;

                const embed3 = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`Your automod rule has been created.`)

                await interaction.editReply({
                    content: ``,
                    embeds: [embed3]
                })
            }, 3000)

            break;

            case "mention-spam":

            await interaction.reply({
                content: "⚙️ Loading automod rule...",
                ephemeral: true
            })

            const number = options.getInteger("number")
            const rule4 = await guild.autoModerationRules.create({
                name: `Prevents spam mentions by BL4IR`,
                creatorId: `1111728534059229355`,
                enabled: true,
                eventType: 1,
                triggerType: 5,
                triggerMetadata:
                    {
                        mentionTotalLimit: number
                    },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: `Message was blocked by BL4iR's automod system`
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({ content: `${err}`});
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule4) return;

                const embed4 = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`Your automod rule has been created.`)

                await interaction.editReply({
                    content: '',
                    embeds: [embed4]
                })
            }, 3000)
            
        }
    }
}