//Dependencies
const { Hangman } = require('discord-gamecord');
const { SlashCommandBuilder } = require('discord.js');

//Exports
module.exports = {
    data: new SlashCommandBuilder()
    .setName("hangman")
    .setDescription("Play a game of Hangman!"),
    async execute (interaction) {
      //Gamecord API
        const Game = new Hangman({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Hangman',
              color: '#5865F2'
            },
            hangman: { hat: '🎩', head: '😟', shirt: '👕', pants: '🩳', boots: '👞👞' },
            customWord: null,
            timeoutTime: 60000,
            theme: 'nature',
            winMessage: 'You won! The word was **{word}**.',
            loseMessage: 'You lost! The word was **{word}**.',
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          Game.startGame();
    }
}