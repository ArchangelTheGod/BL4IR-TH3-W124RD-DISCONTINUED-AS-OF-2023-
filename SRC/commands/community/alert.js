const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('alert')
    .setDescription('View alerts from the developers!'),
     
     async execute(interaction) {

        const alertrand = [
            "Do ``/help`` for tips and source code!",
            "Do ``/errors`` to view all the bot's possible errors!",
            "Killing yourself with the bot adds 1 death to your death counter. Be sure to do ``/deaths options: Register`` to register your counter!",
            "View the bot's uptime with ``/uptime``!",
            "Ping for help from mods (If the system is setup in the server) with ``/pings help``.",
            "Get info about a server with ``/invite-info``!",
            "Want to know more about a user? Do ``/whois`` to find out some juicy info!",
            "Feel like trolling? Go on a hacking spree with ``/hack``!",
            "Want to know more about a certain topic? Use ``/wikipedia`` or ``/chatgpt`` for help! Paired in tandem, they can help you cheat *almost* any test!",
            "Do you like fortune telling? Do ``/ask`` or ``/8ball`` for more!",
            "Feeling lonely? Do ``/hug`` to hug someone!",
            "Heads or Tails? You choose! Do ``/coinflip``!",
            "Are you bored? Play some games using ``/trivia``, ``/wordle``, ``/connect4``, ``/rps``, ``/tictactoe``, or ``/minesweeper``!",
            "Want to gamble your luck on how bit ***it*** is? Do ``/pp-size``!",
            "I fucking hate this list",
        ]
        const alerts = Math.floor(Math.random() * alertrand.length)

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription("**📫 Alert (1)**")
        .addFields({ name: `Alert:`, value: `${alertrand[alerts]}`})

        await interaction.reply({
            embeds: [embed]
        })
    }
}