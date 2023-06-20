const { SlashCommandBuilder } = require('discord.js');
const { TicTacToe } = require('discord-gamecord');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("tictactoe")
    .setDescription("Play a game of TicTacToe!")
    .addUserOption(option => option
      .setName('user')
      .setDescription('The user you want to 1v1')
      .setRequired(true)),
    async execute(interaction) {
      const Game = new TicTacToe({
        message: interaction,
        isSlashGame: true,
        opponent: interaction.options.getUser('user'),
        embed: {
          title: 'Tic Tac Toe',
          color: '#5865F2',
          statusTitle: 'Status',
          overTitle: 'Game Over'
        },
        emojis: {
          xButton: '❌',
          oButton: '🔵',
          blankButton: '➖'
        },
        mentionUser: true,
        timeoutTime: 60000,
        xButtonStyle: 'DANGER',
        oButtonStyle: 'PRIMARY',
        turnMessage: '{emoji} | Its turn of player **{player}**.',
        winMessage: '{emoji} | **{player}** won the TicTacToe Game.',
        tieMessage: 'The Game tied! No one won the Game!',
        timeoutMessage: 'The Game went unfinished! No one won the Game!',
        playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
      });
      
      Game.startGame();
    }
}
