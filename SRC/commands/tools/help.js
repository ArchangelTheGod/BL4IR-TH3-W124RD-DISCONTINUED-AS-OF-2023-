const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Troubleshoot any of your problems here!'),
     async execute(interaction) {
        //Buttons
        const row1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel("Cancel")
            .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
            .setCustomId('home')
            .setLabel("🏠")
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId('page1')
            .setLabel('Page 1')
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId('page2')
            .setLabel('Page 2')
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId('page3')
            .setLabel("Page 3")
            .setStyle(ButtonStyle.Success),
        )

        const row1cont = new ActionRowBuilder()
        .addComponents(
                new ButtonBuilder()
                .setCustomId("page4")
                .setLabel("Page 4")
                .setStyle(ButtonStyle.Success)
        )

        const row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('view-hidden')
            .setLabel('View Hidden Pages?')
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId('close-hidden')
            .setLabel('Collapse Hidden Pages?')
            .setStyle(ButtonStyle.Secondary)
        )
        //Embeds
        const helpembedhome = new EmbedBuilder()
        .setColor('Green')
        .setDescription('**Help Menu**')
        .addFields({ name: "Table of contents:", value: " "})
        .addFields({ name: "\n\nPage 1: Command List", value: "``List of commands available!``"})
        .addFields({ name: "Page 2: FAQ", value: "``Questions asked regarding the bot!``"})
        .addFields({ name: "Page 3: Credits", value: "``Credits!``"})
        .addFields({ name: "Page 4: Source Code", value: "``Source Code to the bot!``"})

        const helpembedpage1 = new EmbedBuilder()
        .setColor('Blue')
        .setDescription('**Commands List**')
        .addFields({ name: "**Moderation Commands**", value: " "})
        .addFields({ name: "``/automod``", value: "Sets up the automod system!"})
        .addFields({ name: "``/clear``", value: "Clears the chat"})
        .addFields({ name: "``/clear-console``", value: "Clears the bot's console"})
        .addFields({ name: "``/cooldown``", value: "Cooldown for commands"})
        .addFields({ name: "``/shutdown``", value: "Turns off the bot"})
        .addFields({ name: "``/warn``", value: "Warns a user"})
        .addFields({ name: "``/webhook``", value: "Creates a webhook in the server"})

        const helpembedpage1sec = new EmbedBuilder()
        .setColor('Blue')
        .setDescription(`**Commands List P2**`)
        .addFields({ name: "**Community Commands**", value: " "})
        .addFields({ name: "``/announce``", value: "Create Announcements"})
        .addFields({ name: "``/areyouonlinelol``", value: "Checks if the bot is online"})
        .addFields({ name: "``/ping``", value: "Return's the bot's API Latency and PING"})
        .addFields({ name: "``/button``", value: "A test command!"})
        .addFields({ name: "``/errors``", value: "View all the errors the bot could spit out"})
        .addFields({ name: "``/help``", value: "Solve your problems or troubleshoot your dilemma"})
        .addFields({ name: "``/pings``", value: "Pings the staff for help/support"})
        .addFields({ name: "``/quote``", value: "Quotes whatever you input!"})
        .addFields({ name: "``getAvatar``", value: "Fetches your target's avatar"})
        .addFields({ name: "``/whois``", value: "Obtain info about a user"})
        
        const helpembedpage1third = new EmbedBuilder()
        .setColor("Blue")
        .setDescription("**Commands List P3**")
        .addFields({ name: "**Fun Commands**", value: " "})
        .addFields({ name: "``/8ball``", value: "Ask the 8ball some questions!"})
        .addFields({ name: "``/calculator``", value: "Use a calculator"})
        .addFields({ name: "``/chatgpt``", value: "Use ChatGPT"})
        .addFields({ name: "``/coinflip``", value: "Land on heads or tails?"})
        .addFields({ name: "``/connect4``", value: "1v1 a player in connect 4"})
        .addFields({ name: "``/hack``", value: "Hacks a user! 100% unsafe guaranteed!"})
        .addFields({ name: "``/hangman``", value: "Play hangman"})
        .addFields({ name: "``/hug``", value: "Hug someone!"})
        .addFields({ name: "``/generate``", value: "Generates an image!"})
        .addFields({ name: "``/kill``", value: "Kills someone!"})
        .addFields({ name: "``/meme``", value: "Look at some fresh memez"})
        .addFields({ name: "``/minesweeper``", value: "Play minesweeper"})
        .addFields({ name: "``/pp-size``", value: "How big? :flushed:"})
        .addFields({ name: "``/question``", value: "Ask BL4IR Anything!"})
        .addFields({ name: "``/rate``", value: "Ask BL4IR to rate something!"})
        .addFields({ name: "``/rps``", value: "1v1 someone at Rock Paper Scissors!"})
        .addFields({ name: "``/tictactoe``", value: "1v1 someone at TicTacToe!"})
        .addFields({ name: "``/trivia``", value: "Play trivia!"})
        .addFields({ name: "``/ban-hammer``", value: "Bans someone"})
        .addFields({ name: "``/kicky``", value: "Kicks someone"})
        .addFields({ name: "``/weather``", value: "Disabled"})
        .addFields({ name: "``/wikipedia``", value: "*\"What does this mean?\"*"})
        .addFields({ name: "``/wordle``", value: "Play wordle!"})
        .addFields({ name: "``/deaths``", value: "View options for death system"})
        

        const helpembedpage2 = new EmbedBuilder()
        .setColor('Blue')
        .setDescription('**FAQ**')
        .addFields({ name: "``Is the bot publicly available?``", value: "Yes, click the profile to invite it to your server(s)!"})
        .addFields({ name: "``Will you ever have a premium system?``", value: "No, NEVER! This bot will remain 100% free- Forever. That's a promise!"})
        .addFields({ name: "``Is the bot open-source?``", value: "Yes! You can obtain the link to the source code on page 4!"})
        .addFields({ name: "``A command didn't run! What do I do?``", value: "You check the list of errors- ``/errors``."})
        .addFields({ name: "``Can I suggest ideas?``", value: "Yes! Your feedback and ideas are very valuable to us- It helps us further develop the bot."})
        .addFields({ name: "``Automod isn't working! Why?``", value: "You can't create duplicate rules- It returns an error!"})
        .addFields({ name: "``BL4IR is offline!?!? Why?``", value: "This may be because the bot has either; crashed, brought offline by the host, or is being updated."})

        const helpembedpage3 = new EmbedBuilder()
        .setColor("Blue")
        .setDescription("**Credits**")
        .addFields({ name: "Developer:", value: "Archangel (@archangelthegod)"})
        .addFields({ name: "Top contributor:", value: "Evancommitsmeme"})
        .addFields({ name: "Hosting Service:", value: "Self-Host"})
        .addFields({ name: " ", value: " "})
        .addFields({ name: "Special Thanks to:", value: "Shadow223 (@.shadow223), DreadKnought, Evancommitsmeme "})
        .addFields({ name: "Early Supporters:", value: "Shadow223, Evancommitsmeme, Maryonacross, Aiden"})

        const helpembedpage4 = new EmbedBuilder()
        .setColor("Blue")
        .setDescription("**Source Code**")
        .addFields({ name: "Link:", value: "__https://github.com/AxxlYT/BL4IR-TH3-W124RD/tree/main__"})

        const send = await interaction.reply({
            embeds: [helpembedhome],
            components: [row1, row1cont]
        })

        //Listeners/Update checkers
        const collector = send.createMessageComponentCollector()

        collector.on('collect', async i => {
            if (i.customId == 'page2') {
                i.update({
                    embeds: [helpembedpage2],
                    components: [row1, row1cont],
                });
            }
        })

        collector.on('collect', async i => {
            if (i.customId == 'page1') {
                i.update({
                    embeds: [helpembedpage1],
                    components: [row1, row1cont, row2],
                });
            }
        })

        collector.on('collect', async i => {
            if (i.customId == 'view-hidden') {
                i.update({
                    embeds: [helpembedpage1, helpembedpage1sec, helpembedpage1third],
                    components: [row1, row1cont, row2],
                });
            }
        })

        collector.on('collect', async i => {
            if (i.customId == 'close-hidden') {
                i.update({
                    embeds: [helpembedpage1],
                    components: [row1, row1cont, row2],
                });
            }
        })

        collector.on('collect', async i => {
            if (i.customId == 'cancel') {
                i.update({
                    embeds: [new EmbedBuilder()
                        .setColor("Green")
                        .setDescription("✅ Closed the help menu!")],
                    components: [],
                });
            }
        })

        collector.on('collect', async i => {
            if (i.customId == 'page3') {
                i.update({
                    embeds: [helpembedpage3],
                    components: [row1, row1cont],
                });
            }
        })

        collector.on('collect', async i => {
            if (i.customId == 'home') {
                i.update({
                    embeds: [helpembedhome],
                    components: [row1, row1cont],
                });
            }
        })

        collector.on('collect', async i => {
            if (i.customId == 'page4') {
                i.update({
                    embeds: [helpembedpage4],
                    components: [row1, row1cont],
                });
            }
        })
    }
}
