const { SlashCommandBuilder } = require('discord.js');
const { RockPaperScissors } = require('discord-gamecord');
const blacklist = require("../../Models/Blacklist");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Play a game of Rock Paper Scissors!")
    .addUserOption(option => option
      .setName('user')
      .setDescription('The user you want to 1v1')
      .setRequired(true)),
    async execute(interaction) {
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
          const Game = new RockPaperScissors({
            message: interaction,
            isSlashGame: true,
            opponent: interaction.options.getUser('user'),
            embed: {
              title: 'Rock Paper Scissors',
              color: '#5865F2',
              description: 'Press a button below to make a choice.'
            },
            buttons: {
              rock: 'Rock',
              paper: 'Paper',
              scissors: 'Scissors'
            },
            emojis: {
              rock: '🌑',
              paper: '📰',
              scissors: '✂️'
            },
            mentionUser: true,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            pickMessage: 'You choose {emoji}.',
            winMessage: '**{player}** won the Game! Congratulations!',
            tieMessage: 'The Game tied! No one won the Game!',
            timeoutMessage: 'The Game went unfinished! No one won the Game!',
            playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
          });

          Game.startGame();
          interaction.setCooldown(10000)
        }
    }

}