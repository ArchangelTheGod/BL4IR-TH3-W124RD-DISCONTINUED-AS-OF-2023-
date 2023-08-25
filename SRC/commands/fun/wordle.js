const { Wordle } = require('discord-gamecord');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("wordle")
    .setDescription("Play a game of Wordle!"),
    async execute(interaction) {

        const Game = new Wordle({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: `Wordle`,
                color: `#5865F2`
            },
            customWord: null,
            timeoutTime: 60000,
            winMessage: `You Won! The word was **{word}**`,
            loseMessage: `You Lost! The word was **{word}**`,
            playerOnlyMessage: `Only {player} can use these buttons`
        });

        Game.startGame();
    }
}